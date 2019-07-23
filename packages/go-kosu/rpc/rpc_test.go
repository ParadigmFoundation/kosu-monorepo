package rpc

import (
	"context"
	"testing"
	"time"

	"github.com/ethereum/go-ethereum/rpc"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"go-kosu/abci"
	"go-kosu/tests"

	"github.com/tendermint/tendermint/libs/db"
)

func TestRPCLatestHeight(t *testing.T) {
	_, closer := tests.StartServer(t, db.NewMemDB())
	defer closer()
	client := rpc.DialInProc(
		NewServer(
			abci.NewHTTPClient("http://localhost:26657", nil),
		),
	)

	var latest uint64
	// Get the initial (prior the first block is mined)
	require.NoError(t, client.Call(&latest, "kosu_latestHeight"))
	assert.EqualValues(t, 0, latest)

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	fn := func(_ interface{}) {
		// this is invoked when a block is mined
		require.NoError(t, client.Call(&latest, "kosu_latestHeight"))
		assert.EqualValues(t, 1, latest)
		cancel()
	}

	ch := make(chan interface{})
	defer close(ch)

	sub, err := client.Subscribe(ctx, "kosu", ch, "subscribe", "tm.event = 'NewBlock'")
	defer sub.Unsubscribe()
	require.NoError(t, err)

	for {
		select {
		case <-ctx.Done():
			return
		case err := <-sub.Err():
			t.Error(err)
		case e := <-ch:
			fn(e)
		}
	}
}
