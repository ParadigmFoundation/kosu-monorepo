package tests

import (
	"context"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
	"github.com/stretchr/testify/require"

	tmtypes "github.com/tendermint/tendermint/types"

	"go-kosu/abci/types"
)

func (s *Suite) TestWitnessTxPoster() {
	GivenABCIServer(s.T(), s, func(t *testing.T) {
		tx := &types.TransactionWitness{
			Subject: types.TransactionWitness_POSTER,
			Block:   10,
			Address: "0xffff",
			Amount:  types.NewBigIntFromInt(100),
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		ch, closer, err := s.client.Subscribe(ctx, "tm.event = 'Tx'")
		So(err, ShouldBeNil)
		defer closer()

		Convey("Broadcasting a Witness Tx with enough confirmations", func() {
			// we make required confirmations 0, so that any will be enough
			s.app.Store().SetConsensusParams(types.ConsensusParams{
				ConfirmationThreshold: 0,
			})

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
			BroadcastTxSync(t, s.client, tx)

			Convey("Querying Poster by Tx.Address should NOT be found after N confirmations", func() {
				//	<-ch

				p, err := s.client.QueryPoster(tx.Address)
				So(err, ShouldNotBeNil)
				So(p, ShouldBeNil)
			})
		})
	})
}

func (s *Suite) TestWitnessValidator() {
	GivenABCIServer(s.T(), s, func(t *testing.T) {
		tx := &types.TransactionWitness{
			Subject:   types.TransactionWitness_VALIDATOR,
			Block:     10,
			Address:   "0xffff",
			PublicKey: []byte("123456789abcdef0123456789abcdef0"),
			// Amount needs to be >= 10**18
			Amount: types.NewBigInt([]byte{
				0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
			}),
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		ch, closer, err := s.client.Subscribe(ctx, "tm.event = 'NewBlock'")
		So(err, ShouldBeNil)
		defer closer()

		Convey("And an initial number of validators", func() {
			res, err := s.client.Validators(nil)
			require.NoError(t, err)
			validators := len(res.Validators)

			Convey("When a Tx is broadcasted", func() {
				BroadcastTxSync(t, s.client, tx)
				Convey("Validators should be updated", func() {
					// Wait for 2 blocks for validator set to be updated
					<-ch
					<-ch

					res, err := s.client.Validators(nil)
					require.NoError(t, err)

					So(len(res.Validators), ShouldEqual, validators+1)
				})
			})
		})
	})
}
