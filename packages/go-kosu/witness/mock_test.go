package witness

import (
	"context"
	"math/big"
	"testing"
)

func TestMock(t *testing.T) {
	ch := make(chan interface{})
	m := NewMockProvider(ch)

	ctx, cancel := context.WithCancel(context.Background())
	blocks := make(chan *Block)
	events := make(chan *Event)

	go m.WatchBlocks(ctx, blocks) // nolint
	go m.WatchEvents(ctx, events) // nolint

	for i := 0; i < 1000; i++ {
		ch <- Block{Number: big.NewInt(10)}
		<-blocks

		ch <- Event{}
		<-events
	}

	cancel()
}
