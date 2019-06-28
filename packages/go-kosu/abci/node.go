package abci

import (
	"os"

	tmflags "github.com/tendermint/tendermint/libs/cli/flags"
	log "github.com/tendermint/tendermint/libs/log"
	"github.com/tendermint/tendermint/node"
	"github.com/tendermint/tendermint/p2p"
	pv "github.com/tendermint/tendermint/privval"
	"github.com/tendermint/tendermint/proxy"
)

// CreateNode creates an embedded tendermint node for standalone mode
func (app *App) CreateNode() (*node.Node, error) {
	// Assumes priv validator has been generated.  See setup()
	nodeKey, err := p2p.LoadOrGenNodeKey(app.Config.NodeKeyFile())
	if err != nil {
		return nil, err
	}

	var w log.Logger
	switch app.Config.LogFormat {
	case "json":
		w = log.NewTMJSONLogger(os.Stdout)
	case "", "plain":
		w = log.NewTMLogger(os.Stdout)
	case "none":
		w = log.NewNopLogger()
	default:
		w = log.NewNopLogger()
	}

	logger, err := tmflags.ParseLogLevel(app.Config.LogLevel, w, "error")
	if err != nil {
		return nil, err
	}
	node, err := node.NewNode(
		app.Config,
		pv.LoadOrGenFilePV(
			app.Config.PrivValidatorKeyFile(),
			app.Config.PrivValidatorStateFile(),
		),
		nodeKey,
		proxy.NewLocalClientCreator(app),
		node.DefaultGenesisDocProviderFunc(app.Config),
		node.DefaultDBProvider,
		node.DefaultMetricsProvider(app.Config.Instrumentation),
		logger,
	)
	return node, err
}
