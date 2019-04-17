package tests

import (
	"paradigmcore/abci/types"
	"paradigmcore/store"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
	"github.com/stretchr/testify/require"
)

func (s *Suite) TestWitnessTx() {
	GivenABCIServer(s.T(), s.state, func(t *testing.T) {
		s.state.LastEvent = 10

		tx := &types.TransactionWitness{
			Block:   20,
			Address: "0xffff",
		}

		Convey("When Tx's Block Height is older than the one in state", func() {
			s.state.LastEvent = 30

			res, err := s.client.BroadcastTxCommit(tx)
			require.NoError(t, err)

			Convey("Request should be rejected by Delivery", func() {
				So(res.CheckTx.Code, ShouldEqual, 0)
				So(res.DeliverTx.Code, ShouldEqual, 1)
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
