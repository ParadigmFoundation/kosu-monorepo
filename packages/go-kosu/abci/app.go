package abci

import (
	"encoding/hex"
	"errors"
	"fmt"
	"math"

	abci "github.com/tendermint/tendermint/abci/types"
	cfg "github.com/tendermint/tendermint/config"
	"github.com/tendermint/tendermint/libs/db"
	"github.com/tendermint/tendermint/libs/log"

	"go-kosu/abci/types"
	"go-kosu/store"
	"go-kosu/store/cosmos"
)

var (
	errProposalRejected = errors.New("proposal rejected")
	errOrderRejected    = errors.New("order rejected, no poster stake")
)

// App implements a tendermint ABCI.
type App struct {
	abci.BaseApplication
	Config *cfg.Config
	log    log.Logger

	store store.Store
}

// NewApp returns a new ABCI App
func NewApp(db db.DB, homedir string) *App {
	config, err := LoadConfig(homedir)
	if err != nil {
		panic(err)
	}

	logger, err := NewLogger(config)
	if err != nil {
		panic(err)
	}

	app := &App{
		store:  cosmos.NewStore(db, new(cosmos.ProtoCodec)),
		Config: config,
		log:    logger.With("module", "app"),
	}

	return app
}

// Query queries the application state using the store.Query method
func (app *App) Query(req abci.RequestQuery) abci.ResponseQuery {
	return app.store.Query(req)
}

// Store returns the underlying store
func (app *App) Store() store.Store { return app.store }

// Info loads the state from the db.
func (app *App) Info(req abci.RequestInfo) abci.ResponseInfo {
	cID := app.store.LastCommitID()

	res := abci.ResponseInfo{
		Data:             "go-kosu",
		Version:          req.GetVersion(),
		LastBlockHeight:  cID.Version,
		LastBlockAppHash: cID.Hash,
	}

	app.log.Info("-- INFO --",
		"hash", hex.EncodeToString(res.LastBlockAppHash),
		"ver", res.LastBlockHeight,
	)

	return res
}

// Commit saves the tree's version.
func (app *App) Commit() abci.ResponseCommit {
	app.store.Commit()
	return abci.ResponseCommit{Data: app.store.LastCommitID().Hash}
}

// InitChain .
func (app *App) InitChain(req abci.RequestInitChain) abci.ResponseInitChain {
	if !app.store.LastCommitID().IsZero() {
		panic("Using a non-zero state when initializing the chain")
	}

	gen, err := NewGenesisFromRequest(req)
	if err != nil {
		panic(err)
	}

	app.store.SetConsensusParams(gen.ConsensusParams)
	app.log.Info("Loaded Genesis State", "gen", gen)

	_ = req.Validators
	return abci.ResponseInitChain{}
}

// BeginBlock .
func (app *App) BeginBlock(req abci.RequestBeginBlock) abci.ResponseBeginBlock {
	currHeight := req.Header.Height
	proposer := hex.EncodeToString(req.Header.ProposerAddress)

	for _, vote := range req.LastCommitInfo.Votes {
		nodeID := hex.EncodeToString(vote.Validator.Address)

		var v *types.Validator
		if !app.store.ValidatorExists(nodeID) {
			v = types.NewValidator()
		} else {
			v = app.store.Validator(nodeID)
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

		app.store.SetValidator(nodeID, v)
	}

	app.store.IterateValidators(func(nodeID string, v *types.Validator) {
		if v.LastVoted+1 == currHeight {
			v.Active = true
			app.store.SetValidator(nodeID, v)
		} else { // TODO: check-me
			v.Active = false
		}
	})

	// update confirmation threshold based on number of active validators
	// confirmation threshold is >=2/3 active validators, unless there is
	// only one active validator, in which case it MUST be 1 in order for
	// state.balances to remain accurate.
	//votes := len(req.LastCommitInfo.Votes)
	//app.state.UpdateConfirmationThreshold(uint32(votes))

	return abci.ResponseBeginBlock{}
}

// EndBlock .
func (app *App) EndBlock(req abci.RequestEndBlock) abci.ResponseEndBlock {
	updates := []abci.ValidatorUpdate{}

	app.store.IterateValidators(func(id string, v *types.Validator) {
		if v.Active {
			return
		}

		balance := v.Balance.BigInt().Uint64()
		power := math.Round(float64(balance) / math.Pow(10, 18))

		// TODO(hharder): make sure this is correct
		if v.PublicKey != nil {
			update := abci.Ed25519ValidatorUpdate(v.PublicKey, int64(power))
			updates = append(updates, update)
		}
	})

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
	case *types.Transaction_Order:
		if err := app.checkOrderTx(tx.GetOrder()); err != nil {
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
	case *types.Transaction_Order:
		return app.deliverOrderTx(tx.GetOrder())
	default:
		fmt.Printf("Unknown Tx: %t", tx.GetData())
	}

	return abci.ResponseDeliverTx{Code: 1, Info: "Unknown Transaction type"}
}
