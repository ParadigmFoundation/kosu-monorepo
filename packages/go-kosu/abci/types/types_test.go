// nolint:lll
package types

import (
	"encoding/json"
	"math"
	"math/big"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestTransactionRebalance(t *testing.T) {
	t.Run("Sort", func(t *testing.T) {
		tx := &TransactionRebalance{
			Limits: []*RateLimit{
				{Address: "z", Limit: 30},
				{Address: "x", Limit: 10},
				{Address: "y", Limit: 20},
			},
		}

		tx.SortRateLimits()

		expectedAddresses := []string{"x", "y", "z"}
		expectedLimits := []uint64{10, 20, 30}
		for i, l := range tx.Limits {
			assert.Equal(t, expectedAddresses[i], l.Address)
			assert.Equal(t, expectedLimits[i], l.Limit)
		}
	})
}

func TestBigInt(t *testing.T) {
	// Create a large number
	n := big.NewInt(0).Mul(
		big.NewInt(math.MaxUint32),
		big.NewInt(math.MaxUint32),
	)

	// Create a protobuf BigInt
	b := &BigInt{Value: n.Bytes()}

	t.Run("Equality", func(t *testing.T) {
		assert.Equal(t, n, b.BigInt())
	})

	t.Run("TextMarshaling", func(t *testing.T) {
		assert.Equal(t, "value: 18446744065119617025", b.String())
	})
}

func TestTransactionWitness(t *testing.T) {
	pub, _, err := NewKeyPair()
	require.NoError(t, err)

	t.Run("Validate", func(t *testing.T) {
		assert.Error(t, (&TransactionWitness{
			Subject: TransactionWitness_POSTER, PublicKey: pub,
		}).Validate())

		assert.NoError(t, (&TransactionWitness{
			Subject: TransactionWitness_POSTER, PublicKey: nil,
		}).Validate())

		assert.Error(t, (&TransactionWitness{
			Subject: TransactionWitness_VALIDATOR, PublicKey: nil,
		}).Validate())

		assert.NoError(t, (&TransactionWitness{
			Subject: TransactionWitness_VALIDATOR, PublicKey: pub,
		}).Validate())
	})

	t.Run("Hash", func(t *testing.T) {
		tx1 := &TransactionWitness{
			Subject: TransactionWitness_VALIDATOR, PublicKey: pub, Block: 100,
		}

		tx2 := &TransactionWitness{
			Subject: TransactionWitness_VALIDATOR, PublicKey: pub, Block: 101,
		}

		assert.NotEqual(t, tx1.Hash(), tx2.Hash())
	})
}

func TestTransactionOrder(t *testing.T) {
	var orderTestCases = []struct {
		desc   string
		poster string
		order  string
	}{
		{
			desc:   "Mock order #1",
			poster: "0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596",
			order:  `{"subContract":"0xebe8fdf63db77e3b41b0aec8208c49fa46569606","maker":"0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596","arguments":{"maker":[{"datatype":"address","name":"signer"},{"datatype":"address","name":"signerToken"},{"datatype":"uint","name":"signerTokenCount"},{"datatype":"address","name":"buyerToken"},{"datatype":"uint","name":"buyerTokenCount"},{"datatype":"signature","name":"signature","signatureFields":[0,1,2,3,4]}],"taker":[{"datatype":"uint","name":"tokensToBuy"}]},"makerValues":{"signer":"0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596","signerToken":"0xbFB972996fd7658099a95E6290e8B0fa46b9BDd5","signerTokenCount":"1000","buyer":"0xbcd1c49f4e54cca1a0a59ac21b7eb90f07970a3a","buyerToken":"0x92cBc0Bec2121f55E84bC331f096b7dAAe5A5ddA","buyerTokenCount":"1000","signature":"0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300"},"makerSignature":"0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300","posterSignature":"0xc3550b7ceab610e638dfb1b33e5cf7aaf9490854197328eadbe8ac049adef7510a07a0ea046fa1d410c5cc1048828152b9368a8d8925f8f0072192ebfe1bbb3101"}`,
		},
		{
			desc:   "Mock order #2",
			poster: "0x2b279207610cc9aAF5D9d120d5293De0Bb51F90e",
			order:  `{"subContract":"0x867cbd1db30567124204506d5c42b94fe6ee057f","maker":"0x07d6c112208fb02ffa0573ac6e77d806ec9afcf4","arguments":{"maker":[{"datatype":"address","name":"signer"},{"datatype":"address","name":"signerToken"},{"datatype":"uint","name":"signerTokenCount"},{"datatype":"address","name":"buyerToken"},{"datatype":"uint","name":"buyerTokenCount"},{"datatype":"signature","name":"signature","signatureFields":[0,1,2,3,4]}],"taker":[{"datatype":"uint","name":"tokensToBuy"}]},"makerValues":{"signer":"0x07d6c112208fb02ffa0573ac6e77d806ec9afcf4","signerToken":"0x4c15bB43988accb621e78955C3C39D61bF9b6829","signerTokenCount":"1000","buyer":"0xe7fb59fa3c134613a78056855655a6d7babb98f9","buyerToken":"0x34Eb8dC4D29C71B20A925D8ed78246De65d786cd","buyerTokenCount":"1000","signature":"0x895444bfe34155f1601c9a1b14705d4150e65a1f9b36a996ecb8315993c4acf572add35cd3cdba54051e6c9234004ecd52c73906fa161c17efd560196d371af201"},"makerSignature":"0x895444bfe34155f1601c9a1b14705d4150e65a1f9b36a996ecb8315993c4acf572add35cd3cdba54051e6c9234004ecd52c73906fa161c17efd560196d371af201","posterSignature":"0x025c06af0ee5d6ca3cb4de9e8b7d6af863e951c591e5fa4d854cee96c7eee8140eca92cc8eb4219f3f9331e1532d4d5a6602ba238247648f6b80e90b053c0cac01"}`,
		},
		{
			desc:   "Mock order #3",
			poster: "0x8B3FFFbA0560cFD16caC017cad7120E356CbB98a",
			order:  `{"subContract":"0x38a4d7865b3f265093fcbf4d7bc5e7e00713c8e6","maker":"0x7e8614e53cb79c7a5d95b957f1bcce291eab248d","arguments":{"maker":[{"datatype":"address","name":"signer"},{"datatype":"address","name":"signerToken"},{"datatype":"uint","name":"signerTokenCount"},{"datatype":"address","name":"buyerToken"},{"datatype":"uint","name":"buyerTokenCount"},{"datatype":"signature","name":"signature","signatureFields":[0,1,2,3,4]}],"taker":[{"datatype":"uint","name":"tokensToBuy"}]},"makerValues":{"signer":"0x7e8614e53cb79c7a5d95b957f1bcce291eab248d","signerToken":"0x56613e252163DAd4276E8b4Cd34a4021eaA1B14B","signerTokenCount":"1000","buyer":"0xf72c35151f8c86a5ac73f213da8164df89b690b7","buyerToken":"0x743102BD6fD1f9452cbF0512AA44041B52c81530","buyerTokenCount":"1000","signature":"0xbbc6600a2891b029d694027a6aed6a13e85e59ce4fcbed1210e66b5c1bbbb1ca19891490edf46877fb6a0ae548db3dc3dd83fa55a6f3c66596fe7f8740eb2c7e00"},"makerSignature":"0xbbc6600a2891b029d694027a6aed6a13e85e59ce4fcbed1210e66b5c1bbbb1ca19891490edf46877fb6a0ae548db3dc3dd83fa55a6f3c66596fe7f8740eb2c7e00","posterSignature":"0x6c0684cb993dded088ea5e0bd9c5808c827a6bd2800beeaa9e1c4686049a16b30e2b0694e4c19647fb45c150e3b8e02ecd6f7a552099af98fec5c0c7d7ffb6d901"}`,
		},
	}
	for _, tC := range orderTestCases {
		t.Run(tC.desc, func(t *testing.T) {
			orderTransaction := &TransactionOrder{}

			decoder := json.NewDecoder(strings.NewReader(tC.order))
			err := decoder.Decode(&orderTransaction)
			require.NoError(t, err, "Expected no error creating order transaction")

			wrappedTx := WrapTx(orderTransaction)
			encoded, err := EncodeTx(wrappedTx)
			require.NoError(t, err, "Expected no error encoding order transactions")

			decodedTx := &Transaction{}
			err = DecodeTx(encoded, decodedTx)
			require.NoError(t, err, "Expected no error decoding order transaction")
		})
	}
}
