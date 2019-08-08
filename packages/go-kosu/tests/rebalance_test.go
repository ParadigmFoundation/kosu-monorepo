package tests

import (
	"context"
	"go-kosu/abci/types"
	"go-kosu/witness"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
	"github.com/stretchr/testify/require"
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

func (s *Suite) TestRebalanceWitness() {
	GivenABCIServer(s.T(), s, func(t *testing.T) {
		tx := &types.TransactionRebalance{
			RoundInfo: &types.RoundInfo{
				StartsAt: 10,
				EndsAt:   20,
			},
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		// Create the witness
		w := witness.New(s.client, witness.NewMockProvider(0), witness.DefaultOptions)
		require.NoError(t, w.WithLogger(nil).Start(ctx))

		Convey("When a set of Rebalance Tx are committed", func() {
			roundNumber := []uint64{1, 2, 3}
			for _, n := range roundNumber {
				tx.RoundInfo.Number = n

				BroadcastTxCommit(t, s.client, tx)

				tx.RoundInfo.StartsAt = tx.RoundInfo.EndsAt
				tx.RoundInfo.EndsAt += 10
			}

			// Wait until the next block is minted
			sub, closer, err := s.client.Subscribe(ctx, "tm.event = 'NewBlock'")
			So(err, ShouldBeNil)
			defer closer()

			<-sub

			Convey("It should update the local witness state", func() {
				So(w.RoundInfo().Number, ShouldEqual, 3)
			})
		})
	})
}
