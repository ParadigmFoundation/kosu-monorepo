package witness

import (
	"context"
	"sort"
)

// ForwardEvents reads events from the Witness provider and forwards them as BroadcastTransactions to the ABCI node
// using a abci.Client
func ForwardEvents(ctx context.Context, p Provider, mat int64, fn func(e *Event)) error {
	buffer := make(map[int64][]*Event)
	errors := make(chan error)

	blocks := make(chan *Block)
	events := make(chan *Event)
	go func() { errors <- p.WatchEvents(ctx, events) }()
	go func() { errors <- p.WatchBlocks(ctx, blocks) }()

	for {
		select {
		case block := <-blocks:
			// We need to traverse the buffer in order
			keys := make([]int64, 0)
			for key := range buffer {
				if block.Number.Int64()-key >= mat {
					keys = append(keys, key)
				}
			}
			sort.Slice(keys, func(i, j int) bool { return keys[i] < keys[j] })

			for _, key := range keys {
				for _, event := range buffer[key] {
					fn(event)
				}
				delete(buffer, key)
			}
		case event := <-events:
			n := event.Block.Number.Int64()
			buffer[n] = append(buffer[n], event)
		case <-ctx.Done():
			return ctx.Err()
		case err := <-errors:
			return err
		}
	}
}
