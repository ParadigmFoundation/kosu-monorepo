package abci

import (
	"go-kosu/abci/types"

	abci "github.com/tendermint/tendermint/abci/types"
)

func (app *App) checkRebalanceTx(tx *types.TransactionRebalance) error {
	// Next round should matches the next block number
	if (tx.RoundInfo.Number - app.store.RoundInfo().Number) != 1 {
		app.log.Error("round difference != 1",
			"tx", tx.RoundInfo.Number,
			"state", app.store.RoundInfo().Number,
		)
		return errProposalRejected
	}

	period := tx.RoundInfo.EndsAt - tx.RoundInfo.StartsAt
	if uint32(period) != app.store.ConsensusParams().PeriodLength {
		app.log.Error("invalid period", "round_info", tx.RoundInfo)
		return errProposalRejected
	}

	return nil
}

func (app *App) deliverRebalance(tx *types.TransactionRebalance) abci.ResponseDeliverTx {
	info := tx.RoundInfo
	app.store.SetRoundInfo(*info)

	if info.Number != 0 {
		limits := app.state.GenLimits()
		for addr, l := range limits {
			app.log.Debug("DeliverRebalance =>", "addr", addr, "limit", l)
		}
	}

	return abci.ResponseDeliverTx{
		Code: 0,
		Tags: NewTagsFromRoundInfo(info),
	}
}
