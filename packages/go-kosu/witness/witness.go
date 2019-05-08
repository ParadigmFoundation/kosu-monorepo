package witness

import (
	"context"
	"fmt"
	"go-kosu/abci"
	"go-kosu/abci/types"
	"go-kosu/store"
	"log"
	"math/big"
	"strconv"
	"sync/atomic"
)

// Provider describes a block provider.
type Provider interface {
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

// Witness implements a one-way (read only) peg to Ethereum,
// and adds a "finality gadget" via a block maturity requirement for events
type Witness struct {
	client   *abci.Client
	provider Provider

	roundInfo store.RoundInfo
}

// New returns a new instance of the witness process
func New(client *abci.Client, p Provider) *Witness {
	return &Witness{client: client, provider: p}
}

// Start starts the rebalancer and the event forwarder
func (w *Witness) Start(ctx context.Context) error {
	if err := w.subscribe(ctx); err != nil {
		return err
	}

	// nolint
	go w.forward(ctx)

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
			atomic.StoreUint64(&w.roundInfo.Number, n)
			log.Printf("detected rebalance tx in block, now on round %d", n)
			// TODO(gus): do synchronize
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

// RoundInfo returns the current in-memory RoundInfo
func (w *Witness) RoundInfo() store.RoundInfo {
	return w.roundInfo
}
