package tests

import (
	"context"
	"testing"
	"time"

	. "github.com/smartystreets/goconvey/convey"
	"github.com/stretchr/testify/require"

	"go-kosu/abci"
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
			RoundInfo: &types.RoundInfo{},
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		w := startWitness(t, s.client)
		err := w.Start(ctx)
		require.NoError(t, err)

		Convey("When a set of Rebalance Tx are commited", func() {
			roundNumber := []uint64{1, 2, 3}
			for _, n := range roundNumber {
				tx.RoundInfo.Number = n
				tx.RoundInfo.StartsAt = tx.RoundInfo.EndsAt
				tx.RoundInfo.EndsAt += 10

				res, err := s.client.BroadcastTxCommit(tx)
				require.NoError(t, err)
				require.Zero(t, res.DeliverTx.Code, res.DeliverTx.Log)
			}
			// give TM some time to pass the tx to the witness's subscriber
			time.Sleep(100 * time.Millisecond)

			Convey("It should update the local witness state", func() {
				So(w.RoundInfo().Number, ShouldEqual, 3)
			})
		})
	})
}

func startWitness(t *testing.T, c *abci.Client) *witness.Witness {
	p, err := witness.NewEthereumProvider("wss://ropsten.infura.io/ws")
	require.NoError(t, err)

	return witness.New(c, p, witness.DefaultOptions)
}
