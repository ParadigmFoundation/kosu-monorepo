package tests

import (
	"io/ioutil"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/require"

	"github.com/tendermint/tendermint/libs/log"
	db "github.com/tendermint/tm-db"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci"
)

// StartServer starts a kosud test server.
// It will keep retrying to start the server until the port is free
func StartServer(t *testing.T, db db.DB) (*abci.App, func()) {
	for {
		app, closer, err := startServer(t, db)
		if err != nil {
			if strings.Contains(err.Error(), "address already in use") {
				t.Fatal(err)
			}

			closer()
			time.Sleep(100 * time.Millisecond)
			continue
		}

		return app, closer
	}
}
func startServer(t *testing.T, db db.DB) (*abci.App, func(), error) {
	// Create a temp dir and initialize tendermint there
	dir, err := ioutil.TempDir("/tmp", "/go-kosu-go-tests_")
	require.NoError(t, err)
	remover := func() {
		_ = os.RemoveAll(dir)
	}

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
	if err != nil {
		return nil, remover, err
	}

	stop := func() {
		require.NoError(t, srv.Stop())
		remover()
	}

	return app, stop, nil
}
