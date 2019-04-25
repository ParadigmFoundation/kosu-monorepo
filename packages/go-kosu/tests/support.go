package tests

import (
	"io/ioutil"
	"os"
	"os/exec"
	"testing"

	"github.com/smartystreets/goconvey/convey"

	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/libs/db"

	"go-kosu/abci"
	"go-kosu/store"
)

// GivenABCIServer a ABCI Server inside a Convey block
func GivenABCIServer(t *testing.T, state *store.State, fn func(t *testing.T)) {
	convey.Convey("Given an ABCI Server", t, func() {
		closer := startServer(t, db.NewMemDB(), state)
		defer closer()
		fn(t)
	})
}

func startServer(t *testing.T, db db.DB, state *store.State) func() {
	// Create a temp dir and initialize tendermint there
	dir, err := ioutil.TempDir("/tmp", "/paradigmcore-go-tests_")
	require.NoError(t, err)

	/* #nosec G204 */
	cmd := exec.Command("tendermint", "init", "--home="+dir)
	require.NoError(t, cmd.Run())

	// Initialize the server
	app := abci.NewApp(state, db)

	srv, err := abci.StartInProcessServer(app, dir)
	require.NoError(t, err)

	// nolint
	return func() {
		srv.Stop()
		os.RemoveAll(dir)
	}
}
