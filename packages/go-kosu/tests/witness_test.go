package tests

import (
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
)

func (suite *IntegrationTestSuite) TestWitness() {
	newTx := func() *types.TransactionWitness {
		last, err := suite.Client().QueryLastEvent()
		suite.Require().NoError(err)

		return &types.TransactionWitness{
			Subject: types.TransactionWitness_POSTER,
			Block:   last,
			Amount:  types.NewBigIntFromString("1000000000000000000", 10),
			Address: randomHex(40),
		}
	}

	suite.Run("WithEnoughConfirmations", func() {
		tx := newTx()
		suite.WithConfirmations(tx)
		suite.WaitForNewBlock()

		poster, err := suite.Client().QueryPoster(tx.Address)
		suite.Require().NoError(err)

		suite.NotNil(poster)
		suite.Equal(tx.Amount.String(), poster.Balance.String())
	})

	suite.Run("WithoutEnoughConfirmations", func() {
		tx := newTx()
		res, err := suite.Client().BroadcastTxCommit(tx)
		suite.Require().NoError(err)
		suite.Require().True(res.DeliverTx.IsOK(), res.DeliverTx.Log)

		poster, err := suite.Client().QueryPoster(tx.Address)
		suite.Require().Equal(abci.ErrNotFound, err, "got: %+v (%s)", poster, tx.Address)
		suite.Nil(poster)

	})

	suite.Run("WithSmallerBlock", func() {
		tx := newTx()
		tx.Block--

		res, err := suite.Client().BroadcastTxSync(tx)
		suite.Require().NoError(err)

		suite.NotEqual(0, res.Code)
	})

	suite.Run("Prunning", func() {
		tx1 := newTx()
		suite.BroadcastTxCommit(tx1)

		res, err := suite.Client().ABCIQuery("/witness/key", tx1.Hash())
		suite.Require().NoError(err)
		suite.Require().NotNil(res.Response.Value)
		suite.Require().NotEmpty(res.Response.Value)

		tx2 := newTx()
		tx2.Block = abci.GenesisAppState.ConsensusParams.BlocksBeforePruning + tx1.Block
		suite.BroadcastTxCommit(tx2)

		res, err = suite.Client().ABCIQuery("/witness/key", tx1.Hash())
		suite.Require().NoError(err)

		suite.Empty(res.Response.Value)
	})
}
