package abci

import (
	"errors"
	"math"
	"math/big"

	"go-kosu/abci/types"
	"go-kosu/store"

	abci "github.com/tendermint/tendermint/abci/types"
)

func (app *App) checkWitnessTx(tx *types.TransactionWitness) error {
	if app.store.LastEvent() >= tx.Block {
		return errors.New("transaction is older than the recorded state")
	}

	return nil
}

func (app *App) deliverWitnessTx(tx *types.TransactionWitness, nodeID []byte) abci.ResponseDeliverTx {
	if err := app.checkWitnessTx(tx); err != nil {
		return abci.ResponseDeliverTx{Code: 1, Info: err.Error()}
	}

	if err := app.pushTransactionWitness(tx, nodeID); err != nil {
		return abci.ResponseDeliverTx{Code: 1, Info: err.Error()}
	}

	return abci.ResponseDeliverTx{}
}

func (app *App) pushTransactionWitness(tx *types.TransactionWitness, nodeID []byte) error {
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

	// TODO(gchaincl): delete witness

	wTx := app.store.WitnessTx(tx.Id)

	v := app.store.Validator(nodeID)
	if v == nil {
		err := errors.New("validator does not exists")
		app.log.Error("store.Validator()", "err", err)
		return err
	}

	power := scaleBalance(tx.Amount.BigInt())
	app.log.Info("adding confirmations", "+power", power, "current", wTx.Confirmations)
	wTx.Confirmations += uint64(power)
	app.store.SetWitnessTx(wTx)

	app.log.Error("info", "threshold", app.confirmationThreshold, "conf", wTx.Confirmations)
	if app.confirmationThreshold > wTx.Confirmations {
		return nil
	}

	if tx.Amount.BigInt().Uint64() == 0 {
		switch tx.Subject {
		case types.TransactionWitness_POSTER:
			app.store.DeletePoster(tx.Address)
		case types.TransactionWitness_VALIDATOR:
			app.store.DeleteValidator(nodeID)
		}
		return nil
	}

	switch tx.Subject {
	case types.TransactionWitness_POSTER:
		app.store.SetPoster(tx.Address, types.Poster{
			Balance: tx.Amount,
		})
	case types.TransactionWitness_VALIDATOR:
		app.store.SetValidator(nodeID, &types.Validator{
			Balance:    tx.Amount,
			PublicKey:  tx.PublicKey,
			EthAccount: tx.Address,
			Active:     false,
			Power:      power,
		})
	}
	return nil
}

func scaleBalance(balance *big.Int) int64 {
	if balance.Cmp(big.NewInt(0)) == 0 {
		return int64(0)
	}

	scaled := &big.Rat{}
	divisor := &big.Int{}

	// scale balance by 10**18 (base units for KOSU)
	// nolint:gosec
	divisor = divisor.Exp(big.NewInt(10), big.NewInt(18), nil)
	scaled.SetFrac(balance, divisor)

	res, _ := scaled.Float64()
	power := math.Floor(res)
	return int64(power)
}
