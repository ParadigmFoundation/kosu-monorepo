package tests

import (
	"io/ioutil"
	"os"
	"testing"
	"time"

	"github.com/stretchr/testify/require"

	"github.com/tendermint/tendermint/libs/db"
	"github.com/tendermint/tendermint/libs/log"

	"go-kosu/abci"
)

// StartServer starts a kosud test server
func StartServer(t *testing.T, db db.DB) (*abci.App, func()) {
	// Create a temp dir and initialize tendermint there
	dir, err := ioutil.TempDir("/tmp", "/go-kosu-go-tests_")
	require.NoError(t, err)

	// Update block generation time to 100ms to make tests run fast
	abci.DefaultConfig.Consensus.TimeoutCommit = 100 * time.Millisecond
	err = abci.InitTendermintWithLogger(dir, log.NewNopLogger())
	require.NoError(t, err)

	// Initialize the server
	cfg, err := abci.LoadConfig(dir)
	require.NoError(t, err)

	cfg.LogFormat = "plain"
	cfg.LogLevel = "app:error,*:none"
	app := abci.NewAppWithConfig(db, cfg)
	srv, err := abci.StartInProcessServer(app)
	require.NoError(t, err)

	// nolint
	return app, func() {
		srv.Stop()
		os.RemoveAll(dir)
	}
}
