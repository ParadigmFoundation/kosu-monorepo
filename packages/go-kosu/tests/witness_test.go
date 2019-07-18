package tests

import (
	"context"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
	"github.com/stretchr/testify/require"

	"github.com/tendermint/tendermint/privval"
	tmtypes "github.com/tendermint/tendermint/types"

	"go-kosu/abci/types"
)

func (s *Suite) TestWitnessTxPoster() {
	GivenABCIServer(s.T(), s, func(t *testing.T) {
		priv := privval.LoadFilePV(
			s.app.Config.PrivValidatorKeyFile(),
			s.app.Config.PrivValidatorStateFile(),
		).Key

		tx := &types.TransactionWitness{
			Subject: types.TransactionWitness_POSTER,
			Block:   10,
			Address: priv.Address.String(),
			Amount:  types.NewBigIntFromString("1000000000000000000", 10),
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		ch, closer, err := s.client.Subscribe(ctx, "tm.event = 'Tx'")
		So(err, ShouldBeNil)
		defer closer()

		Convey("Broadcasting a Witness Tx with enough confirmations", func() {
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
		priv := privval.LoadFilePV(
			s.app.Config.PrivValidatorKeyFile(),
			s.app.Config.PrivValidatorStateFile(),
		).Key

		tx := &types.TransactionWitness{
			Subject: types.TransactionWitness_VALIDATOR,
			Block:   10,
			Address: priv.Address.String(),

			// we need to skip the fingerprint (5 bytes), not sure why is this.
			// I think it's related to amino
			PublicKey: priv.PubKey.Bytes()[5:],

			// we will set an amount to 10**18, which will translate into power:1.
			// is the minimum voting power
			Amount: types.NewBigIntFromString("1000000000000000000", 10),
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		ch, closer, err := s.client.Subscribe(ctx, "tm.event = 'NewBlock'")
		So(err, ShouldBeNil)
		defer closer()

		Convey("And an initial number of validators", func() {
			res, err := s.client.Validators(nil)
			require.NoError(t, err)
			So(res.Validators[0].VotingPower, ShouldEqual, 10)

			Convey("When a Tx is broadcasted", func() {
				BroadcastTxSync(t, s.client, tx)
				Convey("Validator's voting power should be updated", func() {
					// Wait for 2 blocks for validator set to be updated
					<-ch
					<-ch

					res, err := s.client.Validators(nil)
					require.NoError(t, err)

					So(res.Validators[0].VotingPower, ShouldEqual, 1)

				})
			})
		})
	})
}
