package tests

import (
	"context"
	"testing"

	. "github.com/smartystreets/goconvey/convey"
	"github.com/stretchr/testify/require"

	"github.com/tendermint/tendermint/config"
	"github.com/tendermint/tendermint/privval"
	tmtypes "github.com/tendermint/tendermint/types"

	"go-kosu/abci"
	"go-kosu/abci/types"
)

func buildWitnessTx(cfg *config.Config, tx *types.TransactionWitness) *types.TransactionWitness {
	priv := privval.LoadFilePV(
		cfg.PrivValidatorKeyFile(),
		cfg.PrivValidatorStateFile(),
	).Key

	tx.Address = priv.Address.String()
	tx.PublicKey = priv.PubKey.Bytes()[5:]
	return tx
}

func (s *Suite) TestWitnessTxPoster() {
	GivenABCIServer(s.T(), s, func(t *testing.T) {
		tx := buildWitnessTx(s.config, &types.TransactionWitness{
			Subject: types.TransactionWitness_POSTER,
			Block:   10,
			Amount:  types.NewBigIntFromString("1000000000000000000", 10),
		})

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
		tx := buildWitnessTx(s.config, &types.TransactionWitness{
			Subject: types.TransactionWitness_VALIDATOR,
			Block:   10,
			Amount:  types.NewBigIntFromString("1000000000000000000", 10),
		})

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

func (s *Suite) TestWitnessTxPruning() {
	GivenABCIServer(s.T(), s, func(t *testing.T) {
		Convey("When a Tx#1 is broadcasted", func() {
			tx := buildWitnessTx(s.config, &types.TransactionWitness{
				Subject: types.TransactionWitness_VALIDATOR,
				Block:   10,
				Amount:  types.NewBigIntFromString("1000000000000000000", 10),
			})
			txID := tx.Hash()

			BroadcastTxCommit(t, s.client, tx)
			res, err := s.client.ABCIQuery("/witness/key", txID)
			require.NoError(t, err)
			require.Zero(t, res.Response.Code)
			require.NotNil(t, res.Response.Value)

			Convey("And Tx#2 is broadcasted `BlocksBeforePruning` Ethereum blocks later", func() {
				tx.Block += abci.GenesisAppState.ConsensusParams.BlocksBeforePruning
				BroadcastTxCommit(t, s.client, tx)

				Convey("Tx#1 should not exist", func() {
					res, err := s.client.ABCIQuery("/witness/key", txID)
					require.NoError(t, err)
					require.Zero(t, res.Response.Code)
				})
			})
		})
	})
}
