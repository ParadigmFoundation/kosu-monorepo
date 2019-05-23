package tests

import (
	"context"
	"testing"
	"time"

	. "github.com/smartystreets/goconvey/convey"
	"github.com/stretchr/testify/require"

	"go-kosu/abci/types"
	"go-kosu/store"
	"go-kosu/witness"
)

func (s *Suite) TestWitnessTx() {
	GivenABCIServer(s.T(), s, func(t *testing.T) {
		s.state.LastEvent = 10

		tx := &types.TransactionWitness{
			Block:   s.state.LastEvent + 1,
			Address: "0xffff",
		}

		Convey("When Tx is commited", func() {
			res, err := s.client.BroadcastTxCommit(tx)
			require.NoError(t, err)
			require.True(t, res.CheckTx.IsOK())
			require.True(t, res.DeliverTx.IsOK())

			Convey("state should keep the last block number", func() {
				So(s.state.LastEvent, ShouldEqual, tx.Block)
			})
		})

		Convey("When Tx's Block Height is older than the one in state", func() {
			s.state.LastEvent = 30

			res, err := s.client.BroadcastTxSync(tx)
			require.NoError(t, err)

			Convey("Request should fail", func() {
				So(res.Code, ShouldEqual, 1)
			})
		})

		Convey("When Tx has not enough confirmations in State", func() {
			s.state.UpdateConfirmationThreshold(100)
			res, err := s.client.BroadcastTxCommit(tx)
			require.NoError(t, err)

			Convey("It should be added to State.events", func() {
				found := false
				err := s.state.IterateWitnessEventsForBlock(tx.Block, func(id []byte, ev *store.WitnessEvent) bool {
					found = true
					So(tx.Id, ShouldResemble, tx.Hash())
					return true
				})
				So(err, ShouldBeNil)
				So(found, ShouldBeTrue)
			})

			Convey("It should be accepted", func() {
				So(res.CheckTx.Code, ShouldEqual, 0)
				So(res.DeliverTx.Code, ShouldEqual, 0)
			})
		})
	})
}

func (s *Suite) TestWitnessRebalance() {
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
		ch := make(chan interface{})
		w := witness.New(s.client, witness.NewMockProvider(ch), witness.DefaultOptions)
		require.NoError(t, w.Start(ctx))

		Convey("When a set of Rebalance Tx are commited", func() {
			roundNumber := []uint64{1, 2, 3}
			for _, n := range roundNumber {
				tx.RoundInfo.Number = n

				res, err := s.client.BroadcastTxCommit(tx)
				require.NoError(t, err)
				require.Zero(t, res.DeliverTx.Code, res.DeliverTx.Log)
				require.True(t, res.CheckTx.IsOK(), res.CheckTx.Log)
				require.True(t, res.DeliverTx.IsOK(), res.DeliverTx.Log)

				tx.RoundInfo.StartsAt = tx.RoundInfo.EndsAt
				tx.RoundInfo.EndsAt += 10
			}
			time.Sleep(100 * time.Millisecond)
			// give TM some time to pass the tx to the witness's subscriber

			Convey("It should update the local witness state", func() {
				So(w.RoundInfo().Number, ShouldEqual, 3)
			})
		})
	})
}
