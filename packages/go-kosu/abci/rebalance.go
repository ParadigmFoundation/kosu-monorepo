package abci

import (
	"go-kosu/abci/types"
	"math"
	"math/big"

	abci "github.com/tendermint/tendermint/abci/types"
)

func (app *App) checkRebalanceTx(tx *types.TransactionRebalance) error {
	// Next round should matches the next block number
	if (tx.RoundInfo.Number - app.store.RoundInfo().Number) != 1 {
		app.log.Debug("round difference != 1",
			"tx", tx.RoundInfo.Number,
			"state", app.store.RoundInfo().Number,
		)
		return errProposalRejected
	}

	period := tx.RoundInfo.EndsAt - tx.RoundInfo.StartsAt
	if uint32(period) != app.store.ConsensusParams().PeriodLength {
		app.log.Debug("invalid period", "round_info", tx.RoundInfo)
		return errProposalRejected
	}

	return nil
}

func (app *App) deliverRebalance(tx *types.TransactionRebalance) abci.ResponseDeliverTx {
	if err := app.checkRebalanceTx(tx); err != nil {
		return abci.ResponseDeliverTx{Code: 1}
	}

	info := tx.RoundInfo
	app.store.SetRoundInfo(*info)
	app.rebalancePosterLimits()

	return abci.ResponseDeliverTx{
		Code: 0,
		Tags: NewTagsFromRoundInfo(info),
	}
}

func (app *App) totalPosterStake() *big.Int {
	total := big.NewInt(0)
	app.store.IteratePosters(func(address string, poster *types.Poster) {
		balance := &big.Int{}
		balance.SetBytes(poster.Balance.Value)

		total = total.Add(total, balance)
	})

	return total
}

func (app *App) rebalancePosterLimits() {
	total := app.totalPosterStake()
	app.store.IteratePosters(posterIterator(app, total))
}

// returns a closure that calculates and sets each poster limit based on current balance
func posterIterator(app *App, totalBalance *big.Int) func(string, *types.Poster) {
	return func(address string, poster *types.Poster) {
		posterBalance := poster.Balance.BigInt()
		periodLimit := app.store.ConsensusParams().PeriodLimit

		limit := posterLimit(periodLimit, posterBalance, totalBalance)

		app.store.SetPoster(address, types.Poster{
			Balance: types.NewBigInt(poster.Balance.Value),
			Limit:   limit,
		})
	}
}

// calculates a poster's period limit based on their balance and the total poster balance
func posterLimit(periodLimit uint64, posterBalance, totalBalance *big.Int) uint64 {
	// copy periodLimit (pl), posterBalance (pb), totalBalance (tb)
	pl, pb, tb := &big.Int{}, &big.Int{}, &big.Int{}
	pl.SetUint64(periodLimit)
	pb.Set(posterBalance)
	tb.Set(totalBalance)

	// limit = (posterBalance / totalBalance) * periodLimit
	limit := big.NewInt(0)
	limit.Mul(pl, pb)
	limit.Div(limit, tb)

	if !limit.IsUint64() {
		return math.MaxUint64
	}
	return limit.Uint64()
}
