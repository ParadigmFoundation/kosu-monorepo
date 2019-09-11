package abci

import (
	"bytes"
	"encoding/hex"
	"errors"
	"fmt"
	"math"
	"math/big"
	"strings"

	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/config"
	cfg "github.com/tendermint/tendermint/config"
	"github.com/tendermint/tendermint/crypto/tmhash"
	"github.com/tendermint/tendermint/libs/log"
	db "github.com/tendermint/tm-db"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/store"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/store/cosmos"
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
	store  store.Store

	confirmationThreshold uint64
}

// NewApp returns a new ABCI App, it will load the config from homedir
func NewApp(db db.DB, homedir string) *App {
	cfg, err := LoadConfig(homedir)
	if err != nil {
		panic(err)
	}

	return NewAppWithConfig(db, cfg)
}

// NewAppWithConfig returns a new ABCI App given a config
func NewAppWithConfig(db db.DB, cfg *config.Config) *App {
	logger, err := NewLogger(cfg)
	if err != nil {
		panic(err)
	}

	app := &App{
		store:  cosmos.NewStore(db, store.DefaultCodec),
		Config: cfg,
		log:    logger.With("module", "app"),
	}

	return app

}

// NewClient returns a new Cclient configured for this abci.App instance
func (app *App) NewClient() (*Client, error) {
	url := strings.Replace(app.Config.RPC.ListenAddress, "tcp://", "http://", 1)
	key, err := LoadPrivateKey(app.Config.RootDir)
	if err != nil {
		return nil, err
	}

	return NewHTTPClient(url, key)
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
	if gen == nil {
		gen = GenesisAppState
	}

	set, err := UnifyValidators(req.Validators, gen.InitialValidatorInfo)
	if err != nil {
		panic(err)
	}

	for _, v := range set {
		nodeID := tmhash.SumTruncated(v.PublicKey)
		app.store.SetValidator(nodeID, &v)
	}

	app.store.SetConsensusParams(gen.ConsensusParams)
	app.log.Info("Loaded Genesis State", "gen", gen)

	return abci.ResponseInitChain{}
}

// BeginBlock .
func (app *App) BeginBlock(req abci.RequestBeginBlock) abci.ResponseBeginBlock {
	currHeight := req.Header.Height
	proposer := req.Header.ProposerAddress
	votes := req.LastCommitInfo.Votes

	totalPower := big.NewInt(0)
	for _, vote := range votes {
		nodeID := vote.Validator.Address

		power := big.NewInt(vote.Validator.Power)
		totalPower = totalPower.Add(totalPower, power)

		var v *types.Validator
		if !app.store.ValidatorExists(nodeID) {
			v = types.NewValidator()
		} else {
			v = app.store.Validator(nodeID)
		}

		if vote.SignedLastBlock {
			v.Active = true
			v.TotalVotes++
			v.LastVoted = (currHeight - 1)
		}

		// record if they are proposer this round
		if bytes.Equal(proposer, nodeID) {
			v.LastProposed = currHeight
		}

		// update (or skip) first vote
		if v.FirstVote == 0 {
			v.FirstVote = currHeight
		}

		app.store.SetValidator(nodeID, v)
	}

	app.store.IterateValidators(func(nodeID []byte, v *types.Validator) {
		if v.LastVoted+1 == currHeight {
			v.Active = true
		} else { // TODO: check-me
			v.Active = false
		}
		app.store.SetValidator(nodeID, v)
	})

	app.updateConfirmationThreshold(totalPower)
	app.log.Info("Updated confirmation threshold", "threshold", app.confirmationThreshold)

	return abci.ResponseBeginBlock{}
}

func (app *App) updateConfirmationThreshold(activePower *big.Int) {
	threshold := big.NewInt(0).Mul(big.NewInt(2), activePower)
	threshold.Div(threshold, big.NewInt(3))

	var f uint64
	if threshold.IsUint64() {
		f = threshold.Uint64()
	} else {
		f = math.MaxUint64
	}
	app.confirmationThreshold = f
}

// EndBlock .
func (app *App) EndBlock(req abci.RequestEndBlock) abci.ResponseEndBlock {
	updates := []abci.ValidatorUpdate{}

	app.store.IterateValidators(func(nodeID []byte, v *types.Validator) {
		if v.Applied {
			return
		}

		//		balance := v.Balance.BigInt().Uint64()
		//		power := math.Round(float64(balance) / math.Pow(10, 18))

		// TODO(hharder): make sure this is correct
		if v.PublicKey != nil {
			update := abci.Ed25519ValidatorUpdate(v.PublicKey, v.Power)
			updates = append(updates, update)
		}

		if v.Power == 0 {
			app.store.DeleteValidator(nodeID)
		} else {
			v.Applied = true
			app.store.SetValidator(nodeID, v)
		}
	})

	return abci.ResponseEndBlock{
		ValidatorUpdates: updates,
	}
}

// CheckTx .
func (app *App) CheckTx(req abci.RequestCheckTx) abci.ResponseCheckTx {
	stx, err := types.NewSignedTransactionFromBytes(req.Tx)
	if err != nil {
		return abci.ResponseCheckTx{Code: 1, Log: err.Error()}
	}

	nodeID := tmhash.SumTruncated(stx.Proof.PublicKey)
	tx := stx.Tx
	// TODO(gchaincl) refactor the validator verification
	switch tx.GetData().(type) {
	case *types.Transaction_Rebalance:
		if !app.store.ValidatorExists(nodeID) {
			msg := fmt.Sprintf("NodeID %s does not belong to a validator", hex.EncodeToString(nodeID))
			return abci.ResponseCheckTx{Code: 1, Log: msg}
		}

		if err := app.checkRebalanceTx(tx.GetRebalance()); err != nil {
			return abci.ResponseCheckTx{Code: 1, Log: err.Error()}
		}
		return abci.ResponseCheckTx{}
	case *types.Transaction_Witness:
		if !app.store.ValidatorExists(nodeID) {
			msg := fmt.Sprintf("NodeID %s does not belong to a validator", hex.EncodeToString(nodeID))
			return abci.ResponseCheckTx{Code: 1, Log: msg}
		}

		w := tx.GetWitness()
		// .Confirmations should not be defined in the request
		w.Confirmations = 0
		if err := app.checkWitnessTx(w); err != nil {
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
func (app *App) DeliverTx(req abci.RequestDeliverTx) abci.ResponseDeliverTx {
	stx, err := types.NewSignedTransactionFromBytes(req.Tx)
	if err != nil {
		// If verification passes CheckTx it MUST pass here
		panic(err)
	}

	tx := stx.Tx
	switch tx.GetData().(type) {
	case *types.Transaction_Rebalance:
		return app.deliverRebalance(tx.GetRebalance())
	case *types.Transaction_Witness:
		nodeID := tmhash.SumTruncated(stx.Proof.PublicKey)
		return app.deliverWitnessTx(tx.GetWitness(), nodeID)
	case *types.Transaction_Order:
		return app.deliverOrderTx(tx.GetOrder())
	default:
		fmt.Printf("Unknown Tx: %t", tx.GetData())
	}

	return abci.ResponseDeliverTx{Code: 1, Log: "Unknown Transaction type"}
}
