package abci

import (
	"encoding/hex"
	"errors"
	"fmt"
	"math"
	"regexp"

	abci "github.com/tendermint/tendermint/abci/types"
	cfg "github.com/tendermint/tendermint/config"
	"github.com/tendermint/tendermint/libs/db"
	"github.com/tendermint/tendermint/libs/log"

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

	store *store.Store
	state *store.State
	tree  *store.StateTree

	handlers map[*regexp.Regexp]QueryHandler

	log log.Logger
}

// NewApp returns a new ABCI App
func NewApp(state *store.State, db db.DB, homedir string) *App {
	config, err := LoadConfig(homedir)
	if err != nil {
		panic(err)
	}

	logger, err := NewLogger(config)
	if err != nil {
		panic(err)
	}

	tree := store.NewStateTree(db, new(store.GobCodec))
	app := &App{
		store:    store.NewStore(db, new(store.ProtoCodec)),
		state:    state,
		tree:     tree,
		Config:   config,
		handlers: make(map[*regexp.Regexp]QueryHandler),
		log:      logger.With("module", "app"),
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

	app.log.Info("-- INFO --",
		"hash", hex.EncodeToString(res.LastBlockAppHash),
		"ver", res.LastBlockHeight,
	)

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
	currHeight := req.Header.Height
	proposer := hex.EncodeToString(req.Header.ProposerAddress)

	for _, vote := range req.LastCommitInfo.Votes {
		nodeID := hex.EncodeToString(vote.Validator.Address)

		v := app.state.Validators[nodeID]
		if v == nil {
			v = store.NewValidator()
			app.state.Validators[nodeID] = v
		}

		v.Active = vote.SignedLastBlock
		v.Power = vote.Validator.Power

		if vote.SignedLastBlock {
			v.TotalVotes++
			v.LastVoted = (currHeight - 1)
		}

		// record if they are proposer this round
		if proposer == nodeID {
			v.LastProposed = currHeight
		}

		// update (or skip) first vote
		if v.FirstVote == 0 {
			v.FirstVote = currHeight
		}
	}

	for _, v := range app.state.Validators {
		v.Active = (v.LastVoted+1 == currHeight)
	}

	// update confirmation threshold based on number of active validators
	// confirmation threshold is >=2/3 active validators, unless there is
	// only one active validator, in which case it MUST be 1 in order for
	// state.balances to remain accurate.
	votes := len(req.LastCommitInfo.Votes)
	app.state.UpdateConfirmationThreshold(uint32(votes))

	return abci.ResponseBeginBlock{}
}

// EndBlock .
func (app *App) EndBlock(req abci.RequestEndBlock) abci.ResponseEndBlock {
	updates := []abci.ValidatorUpdate{}

	for addr, v := range app.state.Validators {
		if v.Active {
			continue
		}

		key, err := hex.DecodeString(addr)
		if err != nil {
			app.log.Error("EndBlock: DecodeString", "err", err)
			continue
		}

		balance := v.Balance.BigInt().Uint64()
		power := math.Round(float64(balance) / math.Pow(10, 18))

		update := abci.Ed25519ValidatorUpdate(key, int64(power))
		updates = append(updates, update)
	}

	return abci.ResponseEndBlock{
		ValidatorUpdates: updates,
	}
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
