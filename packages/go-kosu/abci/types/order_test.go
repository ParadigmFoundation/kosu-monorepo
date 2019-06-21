// nolint:lll
package types

import (
	"encoding/hex"
	"testing"

	"github.com/stretchr/testify/require"
)

var testCases = []struct {
	desc   string
	poster string
	order  string
	hex    string
	hash   string
}{
	{
		desc:   "Mock order #1",
		poster: "0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596",
		order:  `{"subContract":"0xebe8fdf63db77e3b41b0aec8208c49fa46569606","maker":"0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596","arguments":{"maker":[{"datatype":"address","name":"signer"},{"datatype":"address","name":"signerToken"},{"datatype":"uint","name":"signerTokenCount"},{"datatype":"address","name":"buyerToken"},{"datatype":"uint","name":"buyerTokenCount"},{"datatype":"signature","name":"signature","signatureFields":[0,1,2,3,4]}],"taker":[{"datatype":"uint","name":"tokensToBuy"}]},"makerValues":{"signer":"0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596","signerToken":"0xbFB972996fd7658099a95E6290e8B0fa46b9BDd5","signerTokenCount":1000,"buyer":"0xbcd1c49f4e54cca1a0a59ac21b7eb90f07970a3a","buyerToken":"0x92cBc0Bec2121f55E84bC331f096b7dAAe5A5ddA","buyerTokenCount":1000,"signature":"0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300"},"makerSignature":"0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300","posterSignature":"0xc3550b7ceab610e638dfb1b33e5cf7aaf9490854197328eadbe8ac049adef7510a07a0ea046fa1d410c5cc1048828152b9368a8d8925f8f0072192ebfe1bbb3101"}`,
		hex:    "0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596bFB972996fd7658099a95E6290e8B0fa46b9BDd500000000000000000000000000000000000000000000000000000000000003e892cBc0Bec2121f55E84bC331f096b7dAAe5A5ddA00000000000000000000000000000000000000000000000000000000000003e8ce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300",
		hash:   "0x7f57019fac8d46bfc12632ffe95d1a3a5189514d0e388acc7cba8e9287b38c61",
	},
}

func TestCreateOrder(t *testing.T) {
	for _, tC := range testCases {
		t.Run(tC.desc, func(t *testing.T) {
			order, err := NewOrder(tC.order)
			require.NoError(t, err, "Expected no error creating order")
			t.Logf("<%v>", order.String())
		})
	}
}

func TestPosterHex(t *testing.T) {
	for _, tC := range testCases {
		t.Run(tC.desc, func(t *testing.T) {
			hexBytes, _ := hex.DecodeString(tC.hex[2:])
			hashBytes, _ := hex.DecodeString(tC.hash[2:])

			// test order
			order, err := NewOrder(tC.order)
			require.NoError(t, err, "Expected no error creating order")

			orderBytes, err := order.Serialize()
			require.NoError(t, err, "Expected no error generating order bytes")
			require.EqualValues(t, hexBytes, orderBytes, "Expected order bytes to match test case")

			orderHash, err := order.PosterHex()
			require.NoError(t, err, "Expected no error generating poster hash")
			require.EqualValues(t, hashBytes, orderHash, "Expected hex bytes to match")
		})
	}
}

func TestRecoverSignature(t *testing.T) {
	for _, tC := range testCases {
		t.Run(tC.desc, func(t *testing.T) {
			expectedPoster, err := NewAddressFromString(tC.poster)
			require.NoError(t, err, "Should be no error creating address object")

			order, err := NewOrder(tC.order)
			require.NoError(t, err, "Should be no error creating order")

			recoveredPoster, err := order.RecoverPoster()
			require.NoError(t, err, "Should be no error recovering poster")
			require.EqualValues(t, expectedPoster, recoveredPoster, "Expected recovered address to match supplied address")
		})
	}
}
