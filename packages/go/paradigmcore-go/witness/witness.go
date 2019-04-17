package witness

import (
	"context"
	"fmt"
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
