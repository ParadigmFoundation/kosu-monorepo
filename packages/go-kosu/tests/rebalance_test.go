package tests

import (
	"go-kosu/abci/types"
	"go-kosu/store"
	"testing"

	"github.com/gogo/protobuf/proto"
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

				Convey("Query endpoint /roundinfo", func() {
					res, err := s.client.ABCIQuery("/roundinfo", nil)
					require.NoError(t, err)

					Convey("Response Code should be valid", func() {
						So(res.Response.Code, ShouldEqual, 0)
					})

					Convey("Response Data should be valid", func() {
						info := new(types.RoundInfo)
						require.NoError(t,
							proto.Unmarshal(res.Response.Value, info),
						)

						expected := tx.RoundInfo
						So(info.Number, ShouldEqual, expected.Number)
					})

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
					So(res.CheckTx.Log, ShouldEqual, "proposal rejected")
				})
			})
		})
	})
}
