package witness

import (
	"context"
	"fmt"
	"go-kosu/abci/types"
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
