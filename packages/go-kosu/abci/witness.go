package abci

import (
	"errors"
	"paradigmcore/abci/types"

	abci "github.com/tendermint/tendermint/abci/types"
)

func (app *App) checkWitnessTx(tx *types.TransactionWitness) error {
	if app.state.LastEvent >= tx.Block {
		return errors.New("transaction is older than the recorded state")
	}

	return nil
}

func (app *App) deliverWitnessTx(tx *types.TransactionWitness) abci.ResponseDeliverTx {
	if err := app.state.PushTransactionWitness(tx); err != nil {
		return abci.ResponseDeliverTx{Code: 1, Info: err.Error()}
	}
	return abci.ResponseDeliverTx{}
}
