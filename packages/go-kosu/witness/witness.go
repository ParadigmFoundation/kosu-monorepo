package witness

import (
	"context"
	"fmt"
	"go-kosu/abci"
	"go-kosu/abci/types"
	"log"
	"math/big"
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

// Start starts the witness process
func Start(ctx context.Context, client *abci.Client, p Provider) error {
	// Subscribe to rebalance and synchronize
	sub, err := client.Subscribe(ctx, "tm.event = 'Tx' AND tx.type = 'rebalance'")
	if err != nil {
		return err
	}

	// TODO: do synchronize
	synchronize := func() {
		for e := range sub {
			log.Printf("detected rebalance tx in block, now on round %s", e.Tags["round.number"])
		}
	}
	go synchronize()

	// Forward events from the provider (probably Ethereum) as local TXs
	forward := func(e *Event) {
		res, err := client.BroadcastTxSync(e.WitnessTx())
		if err != nil {
			log.Printf("BroadcastTxSync: %+v", err)
		} else {
			log.Printf("witness event: %+v (%s)", e, res.Log)
		}
	}
	// nolint
	go ForwardEvents(ctx, p, 10, forward)

	return nil
}
