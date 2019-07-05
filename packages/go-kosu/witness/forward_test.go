package witness

import (
	"context"
	"math/big"
	"testing"
	"time"

	"github.com/ethereum/go-ethereum/core/types"
	"github.com/stretchr/testify/assert"
)

func TestForwardIsCanceled(t *testing.T) {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()

	err := ForwardEvents(ctx, NewMockProvider(0), 99, nil)
	assert.Equal(t, context.DeadlineExceeded, err)
}

func TestForwardMaturity(t *testing.T) {
	mock := NewMockProvider(0)
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()

	count := 0
	fn := func(_ *EventEmitterKosuEvent) {
		count++
		if count == 3 {
			cancel()
		}
	}

	done := make(chan error)
	go func() { done <- ForwardEvents(ctx, mock, 5, fn) }()

	// these 3 events are mature
	mock.EventsCh() <- &EventEmitterKosuEvent{Raw: types.Log{BlockNumber: 1}}
	mock.EventsCh() <- &EventEmitterKosuEvent{Raw: types.Log{BlockNumber: 2}}
	mock.EventsCh() <- &EventEmitterKosuEvent{Raw: types.Log{BlockNumber: 3}}

	// these are not
	mock.EventsCh() <- &EventEmitterKosuEvent{Raw: types.Log{BlockNumber: 991}}
	mock.EventsCh() <- &EventEmitterKosuEvent{Raw: types.Log{BlockNumber: 992}}
	mock.EventsCh() <- &EventEmitterKosuEvent{Raw: types.Log{BlockNumber: 993}}

	// wait a bit to make sure all events has been processed and send the block
	time.Sleep(10 * time.Millisecond)
	mock.BlocksCh() <- &types.Header{Number: big.NewInt(99)}

	<-done
	assert.Equal(t, 3, count)
}
