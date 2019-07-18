package rpc

import (
	"context"
	"fmt"
	"io/ioutil"
	"os"
	"testing"
	"time"

	"go-kosu/abci"

	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/libs/db"
	"github.com/tendermint/tendermint/libs/log"
)

func TestRPCCall(t *testing.T) {
	server := NewServer(nil)
	client := DialInProc(server)
	require.NoError(t, client.Call(nil, "kosu_foo"))
}

func TestRPCSubscription(t *testing.T) {
	_, closer := startServer(t, db.NewMemDB())
	defer closer()
	abciClient := abci.NewHTTPClient("http://localhost:26657", nil)

	server := NewServer(abciClient)
	client := DialInProc(server)

	fn := func(i interface{}) {
		fmt.Printf("i = %+v\n", i)
	}
	ctx, cancel := context.WithCancel(context.Background())

	err := client.Subscribe(ctx, fn, "tm.event = 'NewBlock'")
	require.NoError(t, err)

	time.Sleep(3 * time.Second)
	cancel()
}

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
