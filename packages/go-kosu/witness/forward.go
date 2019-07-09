package witness

import (
	"context"
	"sort"

	"github.com/ethereum/go-ethereum/core/types"
)

// ForwardEvents reads events from the Witness provider and forwards them as BroadcastTransactions to the ABCI node
// using a abci.Client
func ForwardEvents(ctx context.Context, p Provider, mat int64, fn func(e *EventEmitterKosuEvent)) error {
	buffer := make(map[uint64][]*EventEmitterKosuEvent)
	errors := make(chan error)

	blocks := make(chan *types.Header)
	events := make(chan *EventEmitterKosuEvent)
	go func() { errors <- p.WatchEvents(ctx, func(evt *EventEmitterKosuEvent) { events <- evt }) }()
	go func() { errors <- p.WatchBlocks(ctx, func(blk *types.Header) { blocks <- blk }) }()

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case err := <-errors:
			return err
		case event := <-events:
			n := event.Raw.BlockNumber
			buffer[n] = append(buffer[n], event)
		case block := <-blocks:
			// We need to traverse the buffer in order
			keys := make([]uint64, 0)
			for key := range buffer {
				// this avoid overflow when calculating the diff
				b := block.Number.Uint64()
				if key > b {
					continue
				}

				diff := b - key
				if diff >= uint64(mat) {
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
		}
	}
}
