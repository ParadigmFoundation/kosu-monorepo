package tests

import (
	"paradigmcore/abci/types"
	"paradigmcore/store"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
	"github.com/stretchr/testify/require"
)

func (s *Suite) TestRebalance() {
	GivenABCIServer(s.T(), s.state, func(t *testing.T) {
		Convey("And an 'Initial rebalance period = 0' state", func() {
			s.state.RoundInfo = store.RoundInfo{}

			Convey("When .round.Number == state.Number + 1", func() {
				tx := &types.TransactionRebalance{
					RoundInfo: &types.RoundInfo{Number: 1},
				}

				res, err := s.client.BroadcastTxCommit(tx)
				require.NoError(t, err)

				Convey("It should return a valid Response", func() {
					So(res.CheckTx.Code, ShouldEqual, 0)
					So(res.DeliverTx.Code, ShouldEqual, 0)
				})
			})

			Convey("When .round.Number > state.Number + 1", func() {
				tx := &types.TransactionRebalance{
					RoundInfo: &types.RoundInfo{Number: 10},
				}

				res, err := s.client.BroadcastTxCommit(tx)
				require.NoError(t, err)

				Convey("CheckTx should return an error", func() {
					So(res.CheckTx.Code, ShouldEqual, 1)
					So(res.CheckTx.Info, ShouldEqual, "proposal rejected")
				})
			})
		})
	})
}
