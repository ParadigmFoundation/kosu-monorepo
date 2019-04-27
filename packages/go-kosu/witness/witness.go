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
	// GetBlockNumber returns the latest block number in the chain.
	GetBlockNumber(ctx context.Context) (*big.Int, error)
	// Handle handles a new block.
	HandleBlocks(context.Context, func(*Block)) error
	// HandleEvent
	HandleEvents(context.Context, func(*Event)) error
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
		Amount:  types.NewBigInt(e.Amount.Int64()),
		Block:   e.Block.Number.Uint64(),
		Address: e.Address,
	}
	return tx
}

// ForwardEvents reads events from the Witness provider and forwards them as BroadcastTransactions to the ABCI node
// using a abci.Client
func ForwardEvents(ctx context.Context, w Provider, c *abci.Client, key []byte) error {
	handler := func(e *Event) {
		res, err := c.BroadcastTxSync(e.WitnessTx())
		if err != nil {
			log.Printf("BroadcastTxSync: %+v", err)
			return
		}
		log.Printf("witness event: %+v (%s)", e, res.Log)
	}

	return w.HandleEvents(ctx, handler)
}
