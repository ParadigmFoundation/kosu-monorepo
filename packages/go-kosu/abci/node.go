package abci

import (
	"fmt"
	"io"
	"io/ioutil"

	"github.com/tendermint/tendermint/cmd/tendermint/commands"
	"github.com/tendermint/tendermint/config"
	"github.com/tendermint/tendermint/crypto/ed25519"
	log "github.com/tendermint/tendermint/libs/log"
	"github.com/tendermint/tendermint/node"
	"github.com/tendermint/tendermint/p2p"
	"github.com/tendermint/tendermint/privval"
	"github.com/tendermint/tendermint/proxy"
	"github.com/tendermint/tendermint/types"
)

// NodeOptions defines a set of options to create a node
type NodeOptions struct {
	PrivValidator types.PrivValidator
}

// CreateNode creates an embedded tendermint node for standalone mode
func (app *App) CreateNode(opts NodeOptions) (*node.Node, error) {
	// if the PrivValidator is not defined we fallback to the one defined in the config
	if opts.PrivValidator == nil {
		opts.PrivValidator = privval.LoadOrGenFilePV(
			app.Config.PrivValidatorKeyFile(),
			app.Config.PrivValidatorStateFile(),
		)
	}

	// Assumes priv validator has been generated.  See setup()
	nodeKey, err := p2p.LoadOrGenNodeKey(app.Config.NodeKeyFile())
	if err != nil {
		return nil, err
	}

	logger, err := NewLogger(app.Config)
	if err != nil {
		return nil, err
	}

	node, err := node.NewNode(
		app.Config,
		opts.PrivValidator,
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

	priv := privval.LoadFilePVEmptyState(
		cfg.PrivValidatorKeyFile(),
		cfg.PrivValidatorStateFile(),
	).Key

	key := priv.PubKey.(ed25519.PubKeyEd25519)
	return &NodeInfo{
		PeerID:    string(nodeKey.ID()),
		NodeID:    priv.Address.String(),
		PublicKey: fmt.Sprintf("%X", key[:]),
		Moniker:   cfg.Moniker,
	}, nil
}

// ResetAll wipes the kosu home represented by cfg, keeping only the config and the genesis files
// ResetAll is idempotent, which means that running reset twice, should have no effect
// All the output will be written to w
func ResetAll(cfg *config.Config, w io.Writer) {
	if w == nil {
		w = ioutil.Discard
	}

	logger := log.NewTMLogger(w)
	commands.ResetAll(cfg.DBDir(), cfg.P2P.AddrBookFile(), cfg.PrivValidatorKeyFile(),
		cfg.PrivValidatorStateFile(), logger)
}
