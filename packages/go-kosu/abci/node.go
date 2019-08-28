package abci

import (
	"encoding/hex"
	"fmt"
	"io"
	"io/ioutil"
	"os"

	"github.com/tendermint/tendermint/config"
	tmflags "github.com/tendermint/tendermint/libs/cli/flags"
	log "github.com/tendermint/tendermint/libs/log"
	"github.com/tendermint/tendermint/node"
	"github.com/tendermint/tendermint/p2p"
	"github.com/tendermint/tendermint/privval"
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

// NodeInfo holds relevant node information
type NodeInfo struct {
	PeerID    string
	NodeID    string
	PublicKey string
	Moniker   string
}

// ShowNodeInfo returns the node's information given its config
func ShowNodeInfo(cfg *config.Config) (*NodeInfo, error) {
	nodeKey, err := p2p.LoadNodeKey(cfg.NodeKeyFile())
	if err != nil {
		return nil, err
	}

	priv := privval.LoadFilePV(
		cfg.PrivValidatorKeyFile(),
		cfg.PrivValidatorStateFile(),
	).Key

	return &NodeInfo{
		PeerID:    string(nodeKey.ID()),
		NodeID:    priv.Address.String(),
		PublicKey: hex.EncodeToString(priv.PubKey.Bytes()),
		Moniker:   cfg.Moniker,
	}, nil
}

// ResetAll wipes the kosu home represented by cfg, keeping only the config and the genesis files
// ResetAll is idempotent, which means that running reset twice, should have no effect
// All the output will be written to w
func ResetAll(cfg *config.Config, w io.Writer) error {
	if w == nil {
		w = ioutil.Discard
	}

	files := []string{
		cfg.P2P.AddrBookFile(),
		cfg.PrivValidatorKeyFile(),
		cfg.PrivValidatorStateFile(),
	}

	if err := removeFiles(w, files...); err != nil {
		return err
	}

	fmt.Fprintf(w, "Deleting directory %s", cfg.DBDir())
	if err := os.RemoveAll(cfg.DBDir()); err != nil {
		return err
	}

	return nil
}

func removeFiles(w io.Writer, files ...string) error {
	for _, file := range files {
		fmt.Fprintf(w, "Deleting %s\n", file)
		if err := os.Remove(file); err != nil {
			if !os.IsNotExist(err) {
				return err
			}
		}
	}
	return nil
}
