package tests

import (
	"io/ioutil"
	"os"
	"testing"

	. "github.com/smartystreets/goconvey/convey" //nolint
	"github.com/stretchr/testify/require"

	"github.com/tendermint/tendermint/libs/db"
	"github.com/tendermint/tendermint/libs/log"
	rpctypes "github.com/tendermint/tendermint/rpc/core/types"

	"go-kosu/abci"
	"go-kosu/store"
)

// GivenABCIServer a ABCI Server inside a Convey block
func GivenABCIServer(t *testing.T, suite *Suite, fn func(*testing.T)) {
	Convey("Given an ABCI Server", t, func() {
		suite.state = store.NewState()

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

	err = abci.InitTendermintWithLogger(dir, log.NewNopLogger())
	require.NoError(t, err)

	// Initialize the server
	app := abci.NewApp(state, db, dir)
	app.Config.LogFormat = "none"
	srv, err := abci.StartInProcessServer(app)
	require.NoError(t, err)

	// nolint
	return app, func() {
		srv.Stop()
		os.RemoveAll(dir)
	}
}

// BroadcastTxSync is a helper function to Broadcast a Tx under test
func BroadcastTxSync(t *testing.T, c *abci.Client, tx interface{}) *rpctypes.ResultBroadcastTx {
	res, err := c.BroadcastTxSync(tx)
	So(err, ShouldBeNil)
	require.Zero(t, res.Code, res.Log)
	return res
}

// BroadcastTxCommit is a helper function to Broadcast a Tx under test
func BroadcastTxCommit(t *testing.T, c *abci.Client, tx interface{}) *rpctypes.ResultBroadcastTxCommit {
	res, err := c.BroadcastTxCommit(tx)
	So(err, ShouldBeNil)
	require.True(t, res.CheckTx.IsOK(), res.CheckTx.Log)
	require.True(t, res.DeliverTx.IsOK(), res.DeliverTx.Log)
	return res
}
