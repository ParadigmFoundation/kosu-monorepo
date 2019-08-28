package tests

import (
	"context"
	"encoding/json"
	"testing"

	"go-kosu/abci/types"
	"go-kosu/rpc"

	"github.com/stretchr/testify/require"
)

func NewOrderTx(t *testing.T) *types.TransactionOrder {
	// nolint:lll
	order := `{
		"subContract":"0xebe8fdf63db77e3b41b0aec8208c49fa46569606",
		"maker":"0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596",
		"arguments":{"maker":[{"datatype":"address","name":"signer"},{"datatype":"address","name":"signerToken"},{"datatype":"uint","name":"signerTokenCount"},{"datatype":"address","name":"buyerToken"},{"datatype":"uint","name":"buyerTokenCount"},{"datatype":"signature","name":"signature","signatureFields":[0,1,2,3,4]}],"taker":[{"datatype":"uint","name":"tokensToBuy"}]},
		"makerValues":{
			"signer":"0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596",
			"signerToken":"0xbFB972996fd7658099a95E6290e8B0fa46b9BDd5",
			"signerTokenCount":"1000",
			"buyer":"0xbcd1c49f4e54cca1a0a59ac21b7eb90f07970a3a",
			"buyerToken":"0x92cBc0Bec2121f55E84bC331f096b7dAAe5A5ddA",
			"buyerTokenCount":"1000",
			"signature":"0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300"
		},
		"makerSignature":"0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300","posterSignature":"0xc3550b7ceab610e638dfb1b33e5cf7aaf9490854197328eadbe8ac049adef7510a07a0ea046fa1d410c5cc1048828152b9368a8d8925f8f0072192ebfe1bbb3101"}
	`

	tx := &types.TransactionOrder{}
	err := json.Unmarshal([]byte(order), tx)
	require.NoError(t, err)

	// this is used to avoid TM complains about duplicated tx in cache
	tx.MakerValues["nonce"] = randomHex(128)
	return tx
}

func (suite *IntegrationTestSuite) TestOrders() {
	tx := NewOrderTx(suite.T())

	last, err := suite.Client().QueryLastEvent()
	suite.Require().NoError(err)

	// setup a poster with a balance
	posterTx := &types.TransactionWitness{
		Subject: types.TransactionWitness_POSTER,
		Address: tx.Maker,
		Amount:  types.NewBigIntFromInt(10),
		Block:   last + 1,
	}
	suite.WithConfirmations(posterTx)
	suite.WaitForNewBlock()
	suite.BroadcastNextRebalance()

	poster, err := suite.Client().QueryPoster(tx.Maker)
	suite.Require().NoError(err)

	suite.Run("LimitUpdate", func() {
		suite.BroadcastTxCommit(tx)

		found, err := suite.Client().QueryPoster(tx.Maker)
		suite.Require().NoError(err)

		suite.Equal(poster.Limit, found.Limit+1)
	})

	suite.Run("UnknownPoster", func() {
		tx := NewOrderTx(suite.T())
		tx.Maker = "0x404"
		res, err := suite.Client().BroadcastTxSync(tx)
		suite.Require().NoError(err)

		suite.NotEqual(0, res.Code)
	})

	suite.Run("RPCEvents", func() {
		tx := NewOrderTx(suite.T())
		rpcClient := rpc.DialInProc(
			rpc.NewServer(suite.Client()),
		)

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		ch := make(chan *types.TransactionOrder)
		sub, err := rpcClient.Subscribe(ctx, "kosu", ch, "newOrders")
		suite.Require().NoError(err)
		defer sub.Unsubscribe()

		suite.BroadcastTxSync(tx)

		event := <-ch
		suite.Equal(tx.String(), event.String())
	})

}
