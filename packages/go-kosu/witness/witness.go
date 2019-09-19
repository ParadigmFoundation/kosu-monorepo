package witness

import (
	"context"
	"encoding/hex"
	"os"
	"sync"

	eth "github.com/ethereum/go-ethereum/core/types"
	"github.com/tendermint/tendermint/libs/log"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
)

// EventHandler is a callback that handles EventEmitterKosuEvent
type EventHandler func(*EventEmitterKosuEvent)

// BlockHandler is a callback that handles new ethereum block headers
type BlockHandler func(blk *eth.Header)

// Provider describes a block provider.
type Provider interface {
	GetLastBlockNumber(context.Context) (uint64, error)
	WatchBlocks(context.Context, BlockHandler) error
	WatchEvents(context.Context, EventHandler) error
}

// Options are parameter to control Witness behavior
type Options struct {
	PeriodLimit       int
	PeriodLength      int
	FinalityThreshold int
}

// DefaultOptions are a sensible values
var DefaultOptions = Options{
	PeriodLimit:       10,
	PeriodLength:      10,
	FinalityThreshold: 10,
}

// Witness implements a one-way (read only) peg to Ethereum,
// and adds a "finality gadget" via a block maturity requirement for events
type Witness struct {
	client   *abci.Client
	provider Provider
	opts     Options
	log      log.Logger

	roundMutex sync.RWMutex
	roundInfo  types.RoundInfo

	initHeight    uint64
	currentHeight uint64
}

// New returns a new instance of the witness process
func New(client *abci.Client, p Provider, opts Options) *Witness {
	w := &Witness{client: client, provider: p, opts: opts}
	return w.WithLogger(log.NewTMLogger(os.Stdout))
}

// WithLogger .
func (w *Witness) WithLogger(logger log.Logger) *Witness {
	if logger == nil {
		logger = log.NewNopLogger()
	}
	w.log = logger.With("module", "witness")
	return w
}

// Start starts the rebalancer and the event forwarder
func (w *Witness) Start(ctx context.Context) error {
	num, err := w.provider.GetLastBlockNumber(ctx)
	if err != nil {
		return err
	}
	w.initHeight = num

	// Load the current RoundInfo and keep it local
	info, err := w.client.QueryRoundInfo()
	if err != nil {
		if err == abci.ErrNotFound {
			info = &types.RoundInfo{}
		} else {
			return err
		}
	}
	w.roundMutex.Lock()
	w.roundInfo = *info
	w.roundMutex.Unlock()

	w.log.Info("started", "initHeight", num, "RoundInfo", info)
	if err := w.subscribe(ctx); err != nil {
		return err
	}

	go w.forward(ctx)      // nolint
	go w.handleBlocks(ctx) // nolint

	return nil
}

func (w *Witness) subscribe(ctx context.Context) error {
	// Subscribe to rebalance events and synchronize
	sub, _, err := w.client.Subscribe(ctx, "tm.event = 'Tx' AND tags.tx.type = 'rebalance'")
	if err != nil {
		return err
	}

	go func() {
		for e := range sub {
			info, err := abci.NewRoundInfoFromEvents(e.Events)
			if err != nil {
				w.log.Error("subscribe: invalid tags", "err", err)
				continue
			}

			// TODO: validate that n == this.round + 1
			w.roundMutex.Lock()
			w.roundInfo.Number = info.Number
			w.roundInfo.StartsAt = info.StartsAt
			w.roundInfo.EndsAt = info.EndsAt
			w.roundMutex.Unlock()

			w.log.Info("detected rebalance tx in block", "round", info)
		}
	}()

	return nil
}

func (w *Witness) forward(ctx context.Context) error {
	fn := func(e *EventEmitterKosuEvent) {
		switch e.EventType {
		case "PosterRegistryUpdate":
			w.handlePosterRegistryUpdate(e)
		case "ValidatorRegistryUpdate":
			w.handleValidatorRegistryUpdate(e)
		}
	}

	// Forward events from the provider (probably Ethereum) to the local node as TXs
	return ForwardEvents(ctx, w.provider, int64(w.opts.FinalityThreshold), fn)
}

// broadcastTxSync broadcast and log a tx
func (w *Witness) broadcastTxSync(tx interface{}, args []interface{}) {
	res, err := w.client.BroadcastTxSync(tx)
	if err != nil {
		w.log.Error("BroadcastTxSync", "err", err)
		return
	}

	if res.Log != "" {
		args = append(args, "log", res.Log)
	}

	if res.Code != 0 {
		w.log.Error("BroadcastTxSync: WitnessTx", append(args, "code", res.Code))
	} else {
		w.log.Info("BroadcastTxSync: WitnessTx", append(args, "hash", res.Hash[0:4])...)
	}
}

func (w *Witness) handlePosterRegistryUpdate(e *EventEmitterKosuEvent) {
	event := &EventPosterRegistryUpdate{}
	if err := DecodeKosuEvent(e, event); err != nil {
		panic(err)
	}

	tx := &types.TransactionWitness{
		Subject: types.TransactionWitness_POSTER,
		Amount:  types.NewBigInt(event.Amount.Bytes()),
		Block:   e.Raw.BlockNumber,
		Address: event.Address.String(),
	}

	w.broadcastTxSync(tx, []interface{}{
		"subject", "poster",
		"block", e.Raw.BlockNumber,
	})
}

func (w *Witness) handleValidatorRegistryUpdate(e *EventEmitterKosuEvent) {
	w.log.Info("validator update event", "e", e)

	event := &EventValidatorRegistryUpdate{}
	if err := DecodeKosuEvent(e, event); err != nil {
		panic(err)
	}

	tx := &types.TransactionWitness{
		Subject:   types.TransactionWitness_VALIDATOR,
		Block:     e.Raw.BlockNumber,
		PublicKey: event.PublicKey,
		Address:   event.Address.String(),
		Amount:    types.NewBigInt(event.Amount.Bytes()),
	}

	w.broadcastTxSync(tx, []interface{}{
		"subject", "validator",
		"block", e.Raw.BlockNumber,
		"pubKey", hex.EncodeToString(tx.PublicKey),
	})
}

func (w *Witness) handleBlocks(ctx context.Context) error {
	fn := func(blk *eth.Header) {
		num := w.RoundInfo().Number
		cur := blk.Number.Uint64()
		mat := cur - uint64(w.opts.FinalityThreshold)
		w.currentHeight = cur

		// If it's the first block || round has ended
		if (num == 0 && (cur > w.initHeight)) || mat >= w.roundInfo.EndsAt {
			if err := w.rebalance(num, mat); err != nil {
				w.log.Error("rebalance", "err", err)
			}
		}
	}
	return w.provider.WatchBlocks(ctx, fn)
}

func (w *Witness) rebalance(round, start uint64) error {
	info := &types.RoundInfo{
		Number:   round + 1,
		Limit:    uint64(w.opts.PeriodLimit),
		StartsAt: start,
		EndsAt:   start + uint64(w.opts.PeriodLength),
	}

	tx := &types.TransactionRebalance{RoundInfo: info}
	res, err := w.client.BroadcastTxSync(tx)
	if err != nil {
		return err
	}

	w.log.Info("rebalance", "result", res)
	return nil
}

// RoundInfo returns the current in-memory RoundInfo
func (w *Witness) RoundInfo() types.RoundInfo {
	w.roundMutex.RLock()
	defer w.roundMutex.RUnlock()

	return w.roundInfo
}
