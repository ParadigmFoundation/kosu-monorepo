package rpc

import (
	"context"
	"io/ioutil"
	"os"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"go-kosu/abci"

	"github.com/tendermint/tendermint/libs/db"
	"github.com/tendermint/tendermint/libs/log"
)

// TODO use tests/support.go version of startServer
func startServer(t *testing.T, db db.DB) (*abci.App, func()) {
	// Create a temp dir and initialize tendermint there
	dir, err := ioutil.TempDir("/tmp", "/go-kosu-go-tests_")
	require.NoError(t, err)

	err = abci.InitTendermintWithLogger(dir, log.NewNopLogger())
	require.NoError(t, err)

	// Initialize the server
	app := abci.NewApp(db, dir)
	app.Config.LogFormat = "none"
	app.Config.LogLevel = "app:error"
	srv, err := abci.StartInProcessServer(app)
	require.NoError(t, err)

	// nolint
	return app, func() {
		srv.Stop()
		os.RemoveAll(dir)
	}
}

func TestRPCLatestHeight(t *testing.T) {
	_, closer := startServer(t, db.NewMemDB())
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
