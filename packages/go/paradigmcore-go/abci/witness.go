package abci

import (
	"paradigmcore/abci/types"

	abci "github.com/tendermint/tendermint/abci/types"
)

func (app *App) checkWitnessTx(tx *types.TransactionWitness) error {
	return nil
}

func (app *App) deliverWitnessTx(tx *types.TransactionWitness) abci.ResponseDeliverTx {
	if err := app.state.PushTransactionWitness(tx); err != nil {
		return abci.ResponseDeliverTx{Code: 1, Info: err.Error()}
	}
	return abci.ResponseDeliverTx{}
}
