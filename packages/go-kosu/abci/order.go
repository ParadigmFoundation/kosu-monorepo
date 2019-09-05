package abci

import (
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/store"

	abci "github.com/tendermint/tendermint/abci/types"
)

func (app *App) checkOrderTx(tx *types.TransactionOrder) error {
	order, err := store.NewOrderFromProto(tx)
	if err != nil {
		return err
	}

	posterAddress, err := order.RecoverPoster()
	if err != nil {
		return err
	}

	poster := app.store.Poster(posterAddress.String())
	if poster == nil {
		return errOrderRejected
	}

	return nil
}

func (app *App) deliverOrderTx(tx *types.TransactionOrder) abci.ResponseDeliverTx {
	order, err := store.NewOrderFromProto(tx)
	if err != nil {
		return abci.ResponseDeliverTx{
			Code: 1,
			Log:  err.Error(),
		}
	}

	posterAddress, err := order.RecoverPoster()
	if err != nil {
		return abci.ResponseDeliverTx{
			Code: 1,
			Log:  err.Error(),
		}
	}

	poster := app.store.Poster(posterAddress.String())
	if poster == nil {
		return abci.ResponseDeliverTx{
			Code: 1,
			Log:  errOrderRejected.Error(),
		}
	}

	orderID, err := order.PosterHex()
	if err != nil {
		return abci.ResponseDeliverTx{
			Code: 1,
			Log:  err.Error(),
		}
	}

	// begin state modification
	poster.Limit--
	app.store.SetPoster(posterAddress.String(), *poster)

	total := app.store.TotalOrders()
	app.store.SetTotalOrders(total + 1)
	// end state modification

	return abci.ResponseDeliverTx{
		Code: 0,
		Events: []abci.Event{
			{Type: "tags", Attributes: NewKVPairFromOrderInfo(orderID, posterAddress, poster.Limit)},
		},
	}
}
