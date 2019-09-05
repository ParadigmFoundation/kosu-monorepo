package tests

import (
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
)

func (suite *IntegrationTestSuite) TestRebalance() {
	suite.Run("ValidRoundInfo", func() {
		tx := &types.TransactionRebalance{
			RoundInfo: suite.NextRoundInfo(),
		}
		suite.BroadcastTxCommit(tx)

		round, err := suite.Client().QueryRoundInfo()
		suite.Require().NoError(err)

		suite.Equal(tx.RoundInfo.String(), round.String(), "RoundInfo should be updated")
	})

	suite.Run("InvalidRoundInfo", func() {
		tx := &types.TransactionRebalance{
			RoundInfo: suite.NextRoundInfo(),
		}
		tx.RoundInfo.Number += 10

		res, err := suite.Client().BroadcastTxSync(tx)
		suite.Require().NoError(err)

		suite.EqualValues(1, res.Code, "Proposal should be rejected")
		suite.Contains(res.Log, "proposal rejected")
	})
}
