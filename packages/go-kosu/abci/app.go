package abci

import (
	"errors"
	"fmt"
	"regexp"

	abci "github.com/tendermint/tendermint/abci/types"
	cfg "github.com/tendermint/tendermint/config"
	"github.com/tendermint/tendermint/libs/db"

	"go-kosu/abci/types"
	"go-kosu/store"
)

var (
	errProposalRejected = errors.New("proposal rejected")
)

// App implements a tendermint ABCI.
type App struct {
	abci.BaseApplication
	Config *cfg.Config

	state *store.State
	tree  *store.StateTree

	handlers map[*regexp.Regexp]QueryHandler
}

// NewApp returns a new ABCI App
func NewApp(state *store.State, db db.DB, homedir string) *App {
	config, err := LoadConfig(homedir)
	if err != nil {
		panic(err)
	}

	tree := store.NewStateTree(db, new(store.GobCodec))
	app := &App{
		state:    state,
		tree:     tree,
		Config:   config,
		handlers: make(map[*regexp.Regexp]QueryHandler),
	}
	app.registerHandlers()

	return app
}

// Info loads the state from the db.
func (app *App) Info(req abci.RequestInfo) abci.ResponseInfo {
	res := abci.ResponseInfo{
		Data:             "go-kosu",
		Version:          req.GetVersion(),
		LastBlockHeight:  app.tree.CommitInfo.Version,
		LastBlockAppHash: app.tree.CommitInfo.Hash,
	}

	if err := app.state.UpdateFromTree(app.tree); err != nil {
		panic(err)
	}

	return res
}

// Commit saves the tree's version.
func (app *App) Commit() abci.ResponseCommit {
	if err := app.state.PersistToTree(app.tree); err != nil {
		panic(err)
	}
	if err := app.tree.Commit(); err != nil {
		// TODO: Handle with care
		panic(err)
	}
	return abci.ResponseCommit{Data: app.tree.CommitInfo.Hash}
}

// InitChain .
func (app *App) InitChain(req abci.RequestInitChain) abci.ResponseInitChain {
	_ = req.Validators
	return abci.ResponseInitChain{}
}

// BeginBlock .
func (app *App) BeginBlock(req abci.RequestBeginBlock) abci.ResponseBeginBlock {
	_ = req.LastCommitInfo.Votes
	return abci.ResponseBeginBlock{}
}

// CheckTx .
func (app *App) CheckTx(req []byte) abci.ResponseCheckTx {
	stx := &types.SignedTransaction{}
	if err := types.DecodeTx(req, stx); err != nil {
		return abci.ResponseCheckTx{Code: 1, Log: err.Error()}
	}
	tx := stx.Tx
	valid, err := stx.Verify()
	if err != nil {
		return abci.ResponseCheckTx{Code: 1, Log: err.Error()}
	}

	if !valid {
		return abci.ResponseCheckTx{Code: 1, Log: "Invalid signature"}
	}

	switch tx.GetData().(type) {
	case *types.Transaction_Rebalance:
		if err := app.checkRebalanceTx(tx.GetRebalance()); err != nil {
			return abci.ResponseCheckTx{Code: 1, Log: err.Error()}
		}
		return abci.ResponseCheckTx{}
	case *types.Transaction_Witness:
		if err := app.checkWitnessTx(tx.GetWitness()); err != nil {
			return abci.ResponseCheckTx{Code: 1, Log: err.Error()}
		}
		return abci.ResponseCheckTx{}
	default:
		fmt.Printf("Unknown Tx: %t", tx.GetData())
	}

	return abci.ResponseCheckTx{Code: 1, Info: "Unknown Transaction type"}
}

// DeliverTx .
func (app *App) DeliverTx(req []byte) abci.ResponseDeliverTx {
	stx := &types.SignedTransaction{}
	if err := types.DecodeTx(req, stx); err != nil {
		return abci.ResponseDeliverTx{Code: 1, Info: err.Error()}
	}
	tx := stx.Tx

	switch tx.GetData().(type) {
	case *types.Transaction_Rebalance:
		return app.deliverRebalance(tx.GetRebalance())
	case *types.Transaction_Witness:
		return app.deliverWitnessTx(tx.GetWitness())
	default:
		fmt.Printf("Unknown Tx: %t", tx.GetData())
	}

	return abci.ResponseDeliverTx{Code: 1, Info: "Unknown Transaction type"}
}

// EndBlock .
func (app *App) EndBlock(req abci.RequestEndBlock) abci.ResponseEndBlock {
	return abci.ResponseEndBlock{}
}
