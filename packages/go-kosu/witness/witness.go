package witness

import (
	"context"
	"encoding/hex"
	"fmt"
	"math/big"
	"os"
	"sync"

	"github.com/tendermint/tendermint/libs/log"

	"go-kosu/abci"
	"go-kosu/abci/types"
)

// Provider describes a block provider.
type Provider interface {
	GetLastBlockNumber(context.Context) (uint64, error)
	WatchBlocks(context.Context, chan *Block) error
	WatchEvents(context.Context, chan *Event) error
}

// Block is holds the basic block information.
type Block struct {
	Hash   []byte
	Number *big.Int
}

func (b *Block) String() string {
	return fmt.Sprintf("<number: %s, hash: %s>", b.Number.String(), hex.EncodeToString(b.Hash))
}

// Event contains the information of a EventEmitter contract
type Event struct {
	Block   Block
	Address string
	Amount  *big.Int
}

func (e *Event) String() string {
	return fmt.Sprintf("<block:%v addr:%s amount:+%s>", e.Block.Number, e.Address, e.Amount.String())
}

// WitnessTx builds TransactionWitness out of the event data
func (e *Event) WitnessTx() *types.TransactionWitness {
	tx := &types.TransactionWitness{
		Subject: types.TransactionWitness_POSTER,
		Amount:  types.NewBigInt(e.Amount.Bytes()),
		Block:   e.Block.Number.Uint64(),
		Address: e.Address,
	}
	return tx
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
	sub, _, err := w.client.Subscribe(ctx, "tm.event = 'Tx' AND tx.type = 'rebalance'")
	if err != nil {
		return err
	}

	go func() {
		for e := range sub {
			info, err := abci.NewRoundInfoFromTags(e.Tags)
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
	fn := func(e *Event) {
		args := []interface{}{
			"event", e.Block.Number.String(),
		}

		res, err := w.client.BroadcastTxSync(e.WitnessTx())
		if err != nil {
			args = append(args, "err", err)
			if res.Log != "" {
				args = append(args, "log", res.Log)
			}
			w.log.Error("BroadcastTxSync: WitnessTx", args...)
			return

		}
		w.log.Info("BroadcastTxSync: WitnessTx", append(args, "hash", res.Hash[0:4])...)
	}

	// Forward events from the provider (probably Ethereum) to the local node as TXs
	return ForwardEvents(ctx, w.provider, int64(w.opts.FinalityThreshold), fn)
}

func (w *Witness) handleBlocks(ctx context.Context) error {
	ch := make(chan *Block)
	errCh := make(chan error)
	go func() {
		err := w.provider.WatchBlocks(ctx, ch)
		w.log.Error("WatchBlocks", "err", err)
		errCh <- err
		close(ch)
	}()

	for block := range ch {
		if block == nil {
			break
		}

		num := w.roundInfo.Number
		cur := block.Number.Uint64()
		mat := cur - uint64(w.opts.FinalityThreshold)
		w.currentHeight = cur

		// If it's the first block || round has ended
		if (num == 0 && (cur > w.initHeight)) || mat >= w.roundInfo.EndsAt {
			if err := w.rebalance(num, cur); err != nil {
				w.log.Error("rebalance", "err", err)
			}
		}
	}

	return <-errCh
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
