package witness

import (
	"context"
	"log"
	"os"
	"testing"
	"time"

	"github.com/ethereum/go-ethereum/core/types"
	"github.com/stretchr/testify/require"
)

func TestEth(t *testing.T) {
	env := "ETHEREUM_TEST_ADDRESS"
	addr := os.Getenv(env)
	if addr == "" {
		t.Skipf("%s env not declared", env)
	}

	eth, err := NewEthereumProvider(addr)
	require.NoError(t, err)

	t.Run("Events", func(t *testing.T) {
		ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
		defer cancel()

		fn := func(e *EventEmitterKosuEvent) {
			log.Printf("type(%-30s) @#%d", e.EventType, e.Raw.BlockNumber)
		}
		err := eth.WatchEvents(ctx, fn)
		require.Equal(t, context.DeadlineExceeded, err)
	})

	t.Run("Blocks", func(t *testing.T) {
		ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
		defer cancel()

		fn := func(blk *types.Header) {
			log.Printf("blk#%s\n", blk.Number.String())
		}
		err := eth.WatchBlocks(ctx, fn)
		require.Equal(t, context.DeadlineExceeded, err)
	})
}
