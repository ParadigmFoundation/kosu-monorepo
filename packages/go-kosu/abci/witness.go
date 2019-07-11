package abci

import (
	"encoding/hex"
	"errors"
	"go-kosu/abci/types"
	"go-kosu/store"
	"strings"

	abci "github.com/tendermint/tendermint/abci/types"
)

func (app *App) checkWitnessTx(tx *types.TransactionWitness) error {
	if app.store.LastEvent() >= tx.Block {
		return errors.New("transaction is older than the recorded state")
	}

	return nil
}

func (app *App) deliverWitnessTx(tx *types.TransactionWitness) abci.ResponseDeliverTx {
	if err := app.checkWitnessTx(tx); err != nil {
		return abci.ResponseDeliverTx{Code: 1, Info: err.Error()}
	}

	if err := app.pushTransactionWitness(tx); err != nil {
		return abci.ResponseDeliverTx{Code: 1, Info: err.Error()}
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

	// calculate vote power for the current validator
	var v *abci.Validator
	for _, val := range app.currentValidators {
		x := hex.EncodeToString(val.Address)
		if strings.ToLower(x) == strings.ToLower(tx.Address) {
			v = &val
		}
	}

	if v == nil {
		return errors.New("validators set can't be blank")
	}

	if !app.store.WitnessTxExists(tx.Id) {
		app.store.SetWitnessTx(store.TransactionWitness{
			TransactionWitness: *tx,
		})
	}

	// TODO(gchaincl): delete witness

	wTx := app.store.WitnessTx(tx.Id)
	wTx.Confirmations += uint32(v.Power)

	if app.confirmationThreshold > int64(wTx.Confirmations) {
		return nil
	}

	if tx.Amount.BigInt().Uint64() == 0 {
		switch tx.Subject {
		case types.TransactionWitness_POSTER:
			app.store.DeletePoster(tx.Address)
		case types.TransactionWitness_VALIDATOR:
			app.store.DeleteValidator(tx.Address)
		}
		return nil
	}

	switch tx.Subject {
	case types.TransactionWitness_POSTER:
		app.store.SetPoster(tx.Address, types.Poster{
			Balance: tx.Amount,
		})
	case types.TransactionWitness_VALIDATOR:
		app.store.SetValidator(tx.Address, &types.Validator{
			Balance:   tx.Amount,
			PublicKey: tx.PublicKey,
		})
	}
	return nil
}
