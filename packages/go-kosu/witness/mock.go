// nolint
package witness

import (
	"context"

	"github.com/ethereum/go-ethereum/core/types"
)

type MockProvider struct {
	lastBlockNumber uint64
	events          chan (*EventEmitterKosuEvent)
	blocks          chan (*types.Header)
}

func NewMockProvider(lastBlockNumber uint64) *MockProvider {
	return &MockProvider{
		lastBlockNumber: lastBlockNumber,
		events:          make(chan *EventEmitterKosuEvent),
		blocks:          make(chan *types.Header),
	}
}

func (m *MockProvider) GetLastBlockNumber(_ context.Context) (uint64, error) {
	return m.lastBlockNumber, nil
}

func (m *MockProvider) WatchEvents(ctx context.Context, fn EventHandler) error {
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case e := <-m.events:
			fn(e)
		}
	}
}

func (m *MockProvider) WatchBlocks(ctx context.Context, fn BlockHandler) error {
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case e := <-m.blocks:
			fn(e)
		}
	}
}

func (m *MockProvider) EventsCh() chan<- (*EventEmitterKosuEvent) { return m.events }
func (m *MockProvider) BlocksCh() chan<- (*types.Header)          { return m.blocks }
