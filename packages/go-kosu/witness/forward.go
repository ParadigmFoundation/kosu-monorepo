package witness

import "context"

// ForwardEvents reads events from the Witness provider and forwards them as BroadcastTransactions to the ABCI node
// using a abci.Client
func ForwardEvents(ctx context.Context, p Provider, mat int64, fn func(e *Event)) error {
	buffer := make(map[int64][]*Event)
	errors := make(chan error)

	blocks := make(chan *Block)
	events := make(chan *Event)
	go func() { errors <- p.WatchBlocks(ctx, blocks) }()
	go func() { errors <- p.WatchEvents(ctx, events) }()

	for {
		select {
		case block := <-blocks:
			// TODO: We could use ordered maps so that we don't have to traverse it completely
			for num, b := range buffer {
				if block.Number.Int64()-num >= mat {
					for _, event := range b {
						fn(event)
					}
					delete(buffer, num)
				}
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
