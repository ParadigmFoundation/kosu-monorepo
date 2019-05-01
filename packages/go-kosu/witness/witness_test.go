package witness

import (
	"context"
	"math/big"
	"sync/atomic"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestEventForwarding(t *testing.T) {
	ch := make(chan interface{})
	mock := NewMockProvider(ch)

	ctx, cancel := context.WithCancel(context.Background())

	eventCount := int32(0)
	fn := func(e *Event) {
		atomic.AddInt32(&eventCount, 1)
		assert.NotContains(t, e.Address, "3.")
		assert.NotContains(t, e.Address, "4.")
	}

	done := make(chan error)
	go func() {
		done <- ForwardEvents(ctx, mock, 3, fn)
	}()

	block := Block{Number: big.NewInt(1)}
	ch <- block
	ch <- Event{Block: block, Address: "1.1"}
	ch <- Event{Block: block, Address: "1.2"}
	ch <- Event{Block: block, Address: "1.3"}

	block = Block{Number: big.NewInt(2)}
	ch <- block
	ch <- Event{Block: block, Address: "2.1"}
	ch <- Event{Block: block, Address: "2.2"}
	ch <- Event{Block: block, Address: "2.3"}

	block = Block{Number: big.NewInt(3)}
	time.Sleep(100 * time.Millisecond)
	assert.EqualValues(t, 0, atomic.LoadInt32(&eventCount))

	ch <- block
	ch <- Event{Block: block, Address: "3.1"}
	ch <- Event{Block: block, Address: "3.2"}
	ch <- Event{Block: block, Address: "3.3"}

	block = Block{Number: big.NewInt(4)}
	ch <- block
	time.Sleep(100 * time.Millisecond)
	assert.EqualValues(t, 3, atomic.LoadInt32(&eventCount))

	ch <- Event{Block: block, Address: "4.1"}
	ch <- Event{Block: block, Address: "4.2"}
	ch <- Event{Block: block, Address: "4.3"}

	block = Block{Number: big.NewInt(5)}
	ch <- block
	time.Sleep(101 * time.Millisecond)
	assert.EqualValues(t, 6, atomic.LoadInt32(&eventCount))

	cancel()
	err := <-done
	require.Equal(t, context.Canceled, err)

}
