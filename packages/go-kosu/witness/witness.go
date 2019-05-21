package witness

import (
	"context"
	"fmt"
	"log"
	"math/big"
	"strconv"
	"sync"

	"go-kosu/abci"
	"go-kosu/abci/types"
	"go-kosu/store"
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

// Event contains the information of a EventEmitter contract
type Event struct {
	Block   Block
	Address string
	Amount  *big.Int
}

func (e *Event) String() string {
	return fmt.Sprintf("<block:%d addr:%s amount:+%s>", e.Block.Number, e.Address, e.Amount.String())
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

	roundMutex sync.RWMutex
	roundInfo  store.RoundInfo

	initHeight    uint64
	currentHeight uint64
}

// New returns a new instance of the witness process
func New(client *abci.Client, p Provider, opts Options) *Witness {
	return &Witness{client: client, provider: p, opts: opts}
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
		return err
	}
	w.roundMutex.Lock()
	w.roundInfo.FromProto(info)
	w.roundMutex.Unlock()

	if err := w.subscribe(ctx); err != nil {
		return err
	}

	go w.forward(ctx)      // nolint
	go w.handleBlocks(ctx) // nolint

	return nil
}

func (w *Witness) subscribe(ctx context.Context) error {
	// Subscribe to rebalance events and synchronize
	sub, err := w.client.Subscribe(ctx, "tm.event = 'Tx' AND tx.type = 'rebalance'")
	if err != nil {
		return err
	}

	go func() {
		for e := range sub {
			n, _ := strconv.ParseUint(e.Tags["round.number"], 10, 64)
			w.roundMutex.Lock()
			w.roundInfo.Number = n
			w.roundMutex.Unlock()

			log.Printf("detected rebalance tx in block, now on round %d", n)
		}
	}()

	return nil
}

func (w *Witness) forward(ctx context.Context) error {
	// Forward events from the provider (probably Ethereum) to the local node as TXs
	return ForwardEvents(ctx, w.provider, 10, func(e *Event) {
		res, err := w.client.BroadcastTxSync(e.WitnessTx())
		if err != nil {
			log.Printf("BroadcastTxSync: %+v", err)
			return
		}
		log.Printf("witness event: %+v (%s)", e, res.Log)
	})
}

func (w *Witness) handleBlocks(ctx context.Context) error {
	ch := make(chan *Block)
	errCh := make(chan error)
	go func() {
		errCh <- w.provider.WatchBlocks(ctx, ch)
	}()

	for block := range ch {
		cur := block.Number.Uint64()
		mat := cur - uint64(w.opts.FinalityThreshold)
		w.currentHeight = cur

		// If it's the first block || round has ended
		if w.roundInfo.Number == 0 && (cur > w.initHeight) || mat >= w.roundInfo.EndsAt {
			if err := w.rebalance(cur); err != nil {
				log.Printf("rebalance: %+v", err)
			}
		}
	}

	return <-errCh
}

func (w *Witness) rebalance(round uint64) error {
	info := &types.RoundInfo{
		Number:   round + 1,
		Limit:    uint64(w.opts.PeriodLimit),
		StartsAt: w.roundInfo.StartsAt - 1,
		EndsAt:   w.roundInfo.StartsAt + uint64(w.opts.PeriodLength),
	}

	tx := &types.TransactionRebalance{RoundInfo: info}
	res, err := w.client.BroadcastTxAsync(tx)
	if err != nil {
		return err
	}

	log.Printf("res = %+v\n", res)
	return nil
}

// RoundInfo returns the current in-memory RoundInfo
func (w *Witness) RoundInfo() store.RoundInfo {
	w.roundMutex.RLock()
	defer w.roundMutex.RUnlock()

	return w.roundInfo
}
