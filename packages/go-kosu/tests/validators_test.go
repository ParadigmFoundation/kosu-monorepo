package tests

import (
	"encoding/hex"
	"go-kosu/abci/types"
)

func (suite *IntegrationTestSuite) TestValidators() {
	initial, err := suite.Client().Validators(nil)
	suite.Require().NoError(err)

	last, err := suite.Client().QueryLastEvent()
	suite.Require().NoError(err)

	pubkey, err := hex.DecodeString(randomHex(64))
	suite.Require().NoError(err)

	tx := &types.TransactionWitness{
		Subject:   types.TransactionWitness_VALIDATOR,
		Address:   randomHex(40),
		PublicKey: pubkey,
		Block:     last,
	}

	suite.Run("AddValidator", func() {
		tx.Amount = types.NewBigIntFromString("1000000000000000000", 10)

		suite.WithConfirmations(tx)

		// wait for 2 blocks to make sure the validator set is updated
		suite.WaitForNewBlock()
		suite.WaitForNewBlock()

		res, err := suite.Client().Validators(nil)
		suite.Require().NoError(err)

		suite.Equal(
			len(initial.Validators)+1,
			len(res.Validators),
			"validator set should be updated with 1 new validator",
		)
	})

	suite.Run("RemoveValidator", func() {
		tx.Block++
		tx.Amount = types.NewBigIntFromInt(0)

		suite.WithConfirmations(tx)

		// wait for 2 blocks to make sure the validator set is updated
		suite.WaitForNewBlock()
		suite.WaitForNewBlock()

		res, err := suite.Client().Validators(nil)
		suite.Require().NoError(err)

		suite.Equal(
			len(initial.Validators),
			len(res.Validators),
			"validator set should be equal to the initial set",
		)
	})
}
