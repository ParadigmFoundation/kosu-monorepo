package tests

import (
	"io/ioutil"
	"os"
	"testing"

	"github.com/smartystreets/goconvey/convey"

	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/libs/db"

	"go-kosu/abci"
	"go-kosu/store"
)

// GivenABCIServer a ABCI Server inside a Convey block
func GivenABCIServer(t *testing.T, suite *Suite, fn func(*testing.T)) {
	if suite.state == nil {
		suite.state = store.NewState()
	}

	convey.Convey("Given an ABCI Server", t, func() {
		app, closer := startServer(t, db.NewMemDB(), suite.state)
		defer closer()

		key, err := abci.LoadPrivateKey(app.Config.RootDir)
		require.NoError(t, err)

		suite.client = abci.NewHTTPClient("http://localhost:26657", key)
		fn(t)
	})
}

func startServer(t *testing.T, db db.DB, state *store.State) (*abci.App, func()) {
	// Create a temp dir and initialize tendermint there
	dir, err := ioutil.TempDir("/tmp", "/go-kosu-go-tests_")
	require.NoError(t, err)

	err = abci.InitTendermint(dir)
	require.NoError(t, err)

	// Initialize the server
	app := abci.NewApp(state, db, dir)
	srv, err := abci.StartInProcessServer(app)
	require.NoError(t, err)

	// nolint
	return app, func() {
		srv.Stop()
		os.RemoveAll(dir)
	}
}
