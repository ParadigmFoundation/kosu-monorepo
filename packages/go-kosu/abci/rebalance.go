package abci

import (
	"fmt"
	"go-kosu/abci/types"

	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/common"
)

func (app *App) checkRebalanceTx(tx *types.TransactionRebalance) error {
	// If the gap is more than 1
	if (tx.RoundInfo.Number - app.state.RoundInfo.Number) > 1 {
		return errProposalRejected
	}
	return nil
}

func (app *App) deliverRebalance(tx *types.TransactionRebalance) abci.ResponseDeliverTx {
	if err := app.checkRebalanceTx(tx); err != nil {
		return abci.ResponseDeliverTx{Code: 1, Info: err.Error()}
	}

	info := &app.state.RoundInfo

	// Begin state update
	info.FromProto(tx.RoundInfo)
	info.Number++

	// Update RateLimits
	/* TODO: genLimits
	 * tx.SortRateLimits()
	 * rl := store.RateLimits{}
	 * rl.FromProto(tx.GetLimits()...)
	 */
	// End state update

	tags := []common.KVPair{
		{Key: []byte("tx.type"), Value: []byte("rebalance")},
		{Key: []byte("round.number"), Value: []byte(fmt.Sprintf("%d", info.Number))},
		{Key: []byte("round.start"), Value: []byte(fmt.Sprintf("%d", info.StartsAt))},
		{Key: []byte("round.end"), Value: []byte(fmt.Sprintf("%d", info.EndsAt))},
	}

	return abci.ResponseDeliverTx{
		Code: 0,
		Tags: tags,
	}
}
