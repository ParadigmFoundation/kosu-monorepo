package rpc

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"go-kosu/abci"
	"go-kosu/tests"

	"github.com/tendermint/tendermint/libs/db"
)

func TestRPCLatestHeight(t *testing.T) {
	_, closer := tests.StartServer(t, db.NewMemDB())
	defer closer()
	client := DialInProc(
		NewServer(
			abci.NewHTTPClient("http://localhost:26657", nil),
		),
	)

	// Get the initial (prior the first block is mined)
	latest, err := client.LatestHeight()
	require.NoError(t, err)
	assert.EqualValues(t, 0, latest)

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	fn := func(i interface{}) {
		// this is invoked when a block is mined
		latest, err := client.LatestHeight()
		require.NoError(t, err)
		assert.EqualValues(t, 1, latest)

		cancel()
	}

	err = client.Subscribe(ctx, fn, "tm.event = 'NewBlock'")
	require.NoError(t, err)

	<-ctx.Done()
}
