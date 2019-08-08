package tests

import (
	"context"
	"encoding/json"
	"testing"

	"go-kosu/abci/types"
	"go-kosu/rpc"

	tmtypes "github.com/tendermint/tendermint/types"

	. "github.com/smartystreets/goconvey/convey"
	"github.com/stretchr/testify/require"
)

func (s *Suite) TestOrderTx() {
	addr := "0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596"
	order := `{"subContract":"0xebe8fdf63db77e3b41b0aec8208c49fa46569606","maker":"0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596","arguments":{"maker":[{"datatype":"address","name":"signer"},{"datatype":"address","name":"signerToken"},{"datatype":"uint","name":"signerTokenCount"},{"datatype":"address","name":"buyerToken"},{"datatype":"uint","name":"buyerTokenCount"},{"datatype":"signature","name":"signature","signatureFields":[0,1,2,3,4]}],"taker":[{"datatype":"uint","name":"tokensToBuy"}]},"makerValues":{"signer":"0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596","signerToken":"0xbFB972996fd7658099a95E6290e8B0fa46b9BDd5","signerTokenCount":"1000","buyer":"0xbcd1c49f4e54cca1a0a59ac21b7eb90f07970a3a","buyerToken":"0x92cBc0Bec2121f55E84bC331f096b7dAAe5A5ddA","buyerTokenCount":"1000","signature":"0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300"},"makerSignature":"0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300","posterSignature":"0xc3550b7ceab610e638dfb1b33e5cf7aaf9490854197328eadbe8ac049adef7510a07a0ea046fa1d410c5cc1048828152b9368a8d8925f8f0072192ebfe1bbb3101"}` // nolint:lll

	tx := &types.TransactionOrder{}
	require.NoError(s.T(), json.Unmarshal([]byte(order), tx))

	GivenABCIServer(s.T(), s, func(t *testing.T) {
		Convey("And an existing poster with Limit > 0", func() {
			posterTx := &types.TransactionWitness{
				Subject: types.TransactionWitness_POSTER,
				Address: addr,
				Amount:  types.NewBigIntFromInt(10),
			}
			BroadcastTxCommit(t, s.client, posterTx)

			BroadcastNextRebalance(t, s.client)

			Convey("When sending an OrderTx", func() {
				poster, err := s.client.QueryPoster(addr)
				require.NoError(t, err)
				BroadcastTxCommit(t, s.client, tx)

				Convey("Limit should be decremented by 1", func() {
					found, err := s.client.QueryPoster(addr)
					require.NoError(t, err)

					So(poster.Limit, ShouldEqual, found.Limit+1)
				})
			})

			Convey("When a RPC subscription is active", func() {
				client := rpc.DialInProc(
					rpc.NewServer(s.client),
				)
				ctx, cancel := context.WithCancel(context.Background())
				defer cancel()

				ch := make(chan tmtypes.EventDataTx)
				defer close(ch)

				sub, err := client.Subscribe(ctx, "kosu", ch, "newOrders")
				require.NoError(t, err)
				defer sub.Unsubscribe()

				Convey("And a OrderTx is sent", func() {
					res := BroadcastTxSync(t, s.client, tx)

					Convey("Event should be sent and mathes the Broadcast response", func() {
						event := <-ch
						So(event.TxResult.Tx.Hash(), ShouldResemble, res.Hash.Bytes())
					})
				})
			})

			Convey("And a non existing poster", func() {
				tx.Maker = "0x404"

				Convey("When sending an OrderTx", func() {
					res, err := s.client.BroadcastTxSync(tx)
					require.NoError(t, err)

					Convey("Tx should be rejected", func() {
						So(res.Code, ShouldNotEqual, 0)
					})
				})
			})
		})
	})
}
