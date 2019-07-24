package tests

import (
	"go-kosu/abci"
	"testing"

	. "github.com/smartystreets/goconvey/convey" //nolint
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"

	"github.com/tendermint/tendermint/libs/db"
	rpctypes "github.com/tendermint/tendermint/rpc/core/types"
)

type Suite struct {
	suite.Suite

	client *abci.Client
	app    *abci.App
}

// GivenABCIServer a ABCI Server inside a Convey block
func GivenABCIServer(t *testing.T, suite *Suite, fn func(*testing.T)) {
	Convey("Given an ABCI Server", t, func() {
		app, closer := StartServer(t, db.NewMemDB())
		defer closer()
		suite.app = app

		key, err := abci.LoadPrivateKey(app.Config.RootDir)
		require.NoError(t, err)

		suite.client = abci.NewHTTPClient("http://localhost:26657", key)
		fn(t)
	})
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
