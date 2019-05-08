package tests

import (
	"context"
	"encoding/hex"
	"go-kosu/abci"
	"go-kosu/abci/types"
	"go-kosu/store"
	"go-kosu/witness"
	"testing"
	"time"

	. "github.com/smartystreets/goconvey/convey"
	"github.com/stretchr/testify/require"
)

func (s *Suite) TestWitnessTx() {
	GivenABCIServer(s.T(), s.state, func(t *testing.T) {
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
	GivenABCIServer(s.T(), s.state, func(t *testing.T) {
		tx := &types.TransactionRebalance{
			RoundInfo: &types.RoundInfo{},
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		w := startWitness(t)
		w.Start(ctx)

		Convey("When a set of Rebalance Tx are commited", func() {
			roundNumber := []uint64{1, 2, 3}
			for _, n := range roundNumber {
				tx.RoundInfo.Number = n
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

func startWitness(t *testing.T) *witness.Witness {
	key, _ := hex.DecodeString("0F8C50DC955DA31B617D5F0702511528F824027A30ED1CF33496D455D840EF1C9D3E50B8B5B1745747FEAFE6C43A11703FEE3F2B9D14E6234F03B60A6BB6ACD9")
	client := abci.NewHTTPClient("tcp://0.0.0.0:26657", key)
	p, err := witness.NewEthereumProvider("wss://ropsten.infura.io/ws")
	require.NoError(t, err)

	return witness.New(client, p)
}
