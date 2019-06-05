package tests

import (
	"go-kosu/abci/types"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
)

func (s *Suite) TestRebalance() {
	GivenABCIServer(s.T(), s, func(t *testing.T) {
		Convey("And an initial Rebalance Tx", func() {
			tx := &types.TransactionRebalance{
				RoundInfo: &types.RoundInfo{
					Number:   1,
					StartsAt: 100,
					EndsAt:   110,
				},
			}
			BroadcastTxCommit(t, s.client, tx)

			Convey("RoundInfo should be updated", func() {
				info, err := s.client.QueryRoundInfo()
				So(err, ShouldBeNil)

				So(info.Number, ShouldEqual, tx.RoundInfo.Number)
				So(info.StartsAt, ShouldEqual, tx.RoundInfo.StartsAt)
				So(info.EndsAt, ShouldEqual, tx.RoundInfo.EndsAt)
			})
		})

		Convey("Next Tx's .RoundInfo.Number gap is > 1 ", func() {
			tx := &types.TransactionRebalance{
				RoundInfo: &types.RoundInfo{Number: 10},
			}

			res, err := s.client.BroadcastTxSync(tx)
			So(err, ShouldBeNil)

			Convey("Tx should be rejected", func() {
				So(res.Code, ShouldEqual, 1)
				So(res.Log, ShouldContainSubstring, "proposal rejected")
			})
		})
	})
}
