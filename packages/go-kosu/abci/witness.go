package abci

import (
	"errors"
	"go-kosu/abci/types"
	"go-kosu/store"

	abci "github.com/tendermint/tendermint/abci/types"
)

func (app *App) checkWitnessTx(tx *types.TransactionWitness) error {
	if app.state.LastEvent >= tx.Block {
		return errors.New("transaction is older than the recorded state")
	}

	return nil
}

func (app *App) deliverWitnessTx(tx *types.TransactionWitness) abci.ResponseDeliverTx {
	if err := app.checkWitnessTx(tx); err != nil {
		return abci.ResponseDeliverTx{Code: 1, Info: err.Error()}
	}

	if !true {
		if err := app.state.PushTransactionWitness(tx); err != nil {
			return abci.ResponseDeliverTx{Code: 1, Info: err.Error()}
		}
	} else {
		if err := app.pushTransactionWitness(tx); err != nil {
			return abci.ResponseDeliverTx{Code: 1, Info: err.Error()}
		}
	}
	return abci.ResponseDeliverTx{}
}

func (app *App) pushTransactionWitness(tx *types.TransactionWitness) error {
	if app.store.LastEvent() > tx.Block {
		return errors.New("transaction is older than the recorded state")
	}

	if tx.Amount == nil {
		tx.Amount = types.NewBigIntFromInt(0)
	}

	app.store.SetLastEvent(tx.Block)

	if !app.store.WitnessTxExists(tx.Id) {
		app.store.SetWitnessTx(store.TransactionWitness{
			TransactionWitness: *tx,
		})
	}

	// TODO: delete witness

	app.store.IncWitnessTxConfirmations(tx.Id)
	wTx := app.store.WitnessTx(tx.Id)
	if app.store.ConsensusParams().ConfirmationThreshold > wTx.Confirmations {
		return nil
	}

	if tx.Amount.BigInt().Uint64() == 0 {
		app.store.DeletePoster(tx.Address)
		return nil
	}

	poster := types.Poster{
		Balance: tx.Amount,
	}
	app.store.SetPoster(tx.Address, store.XPoster{
		Poster: poster,
	})

	return nil
}
