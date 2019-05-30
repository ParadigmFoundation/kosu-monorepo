package tests

import (
	"context"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
	"github.com/stretchr/testify/require"

	tmtypes "github.com/tendermint/tendermint/types"

	"go-kosu/abci/types"
	"go-kosu/witness"
)

func (s *Suite) TestWitnessTx() {
	GivenABCIServer(s.T(), s, func(t *testing.T) {
		tx := &types.TransactionWitness{
			Block:   10,
			Address: "0xffff",
			Amount:  types.NewBigIntFromInt(100),
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		ch, err := s.client.Subscribe(ctx, "tm.event = 'Tx'")
		So(err, ShouldBeNil)

		Convey("And a Witness Tx", func() {
			BroadcastTxSync(t, s.client, tx)

			Convey("Querying Poster by Tx.Address should be found after N confirmations", func() {
				<-ch

				p, err := s.client.QueryPoster(tx.Address)
				So(err, ShouldBeNil)
				require.EqualValues(t, p.Balance.BigInt(), tx.Amount.BigInt())
			})

			Convey("Broadcasting a Witness Tx with smaller block number should error", func() {
				tx.Block--

				BroadcastTxSync(t, s.client, tx)

				<-ch // discard the first tx
				e := <-ch
				txEvent := e.Data.(tmtypes.EventDataTx)
				So(txEvent.Result.IsErr(), ShouldBeTrue)
			})
		})

		Convey("Broadcasting a Witness Tx without required confirmations", func() {
			s.state.UpdateConfirmationThreshold(100)
			BroadcastTxSync(t, s.client, tx)

			Convey("Querying Poster by Tx.Address should NOT be found after N confirmations", func() {
				<-ch

				p, err := s.client.QueryPoster(tx.Address)
				So(err, ShouldNotBeNil)
				So(p, ShouldBeNil)
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

				BroadcastTxCommit(t, s.client, tx)

				tx.RoundInfo.StartsAt = tx.RoundInfo.EndsAt
				tx.RoundInfo.EndsAt += 10
			}

			// Wait until the next block is minted
			sub, err := s.client.Subscribe(ctx, "tm.event = 'NewBlock'")
			So(err, ShouldBeNil)
			<-sub

			Convey("It should update the local witness state", func() {
				So(w.RoundInfo().Number, ShouldEqual, 3)
			})
		})
	})
}
