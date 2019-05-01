package witness

import (
	"context"
)

// MockProvider mocks a Provider, it's useful for testing
type MockProvider struct {
	blocks chan *Block
	events chan *Event
}

// NewMockProvider returns a new MockProvider, it receives events sent to channel ch
func NewMockProvider(ch <-chan interface{}) *MockProvider {
	m := &MockProvider{
		blocks: make(chan *Block),
		events: make(chan *Event),
	}
	go m.loop(ch)
	return m
}

func (m *MockProvider) loop(ch <-chan interface{}) {
	for {
		msg, ok := <-ch
		if !ok {
			m.close()
			return
		}

		switch t := msg.(type) {
		case Block:
			m.blocks <- &t
		case Event:
			m.events <- &t
		}
	}
}

func (m *MockProvider) close() {
	close(m.blocks)
	close(m.events)
}

// nolint
func (m *MockProvider) WatchBlocks(ctx context.Context, ch chan *Block) error {
	for {
		select {
		case block := <-m.blocks:
			ch <- block
		case <-ctx.Done():
			return ctx.Err()
		}
	}
}

// nolint
func (m *MockProvider) WatchEvents(ctx context.Context, ch chan *Event) error {
	for {
		select {
		case event := <-m.events:
			ch <- event
		case <-ctx.Done():
			return ctx.Err()
		}
	}
}
