// nolint:lll
package store

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"go-kosu/abci/types"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
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
		order:  `{"subContract":"0xebe8fdf63db77e3b41b0aec8208c49fa46569606","maker":"0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596","arguments":{"maker":[{"datatype":"address","name":"signer"},{"datatype":"address","name":"signerToken"},{"datatype":"uint","name":"signerTokenCount"},{"datatype":"address","name":"buyerToken"},{"datatype":"uint","name":"buyerTokenCount"},{"datatype":"signature","name":"signature","signatureFields":[0,1,2,3,4]}],"taker":[{"datatype":"uint","name":"tokensToBuy"}]},"makerValues":{"signer":"0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596","signerToken":"0xbFB972996fd7658099a95E6290e8B0fa46b9BDd5","signerTokenCount":"1000","buyer":"0xbcd1c49f4e54cca1a0a59ac21b7eb90f07970a3a","buyerToken":"0x92cBc0Bec2121f55E84bC331f096b7dAAe5A5ddA","buyerTokenCount":"1000","signature":"0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300"},"makerSignature":"0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300","posterSignature":"0xc3550b7ceab610e638dfb1b33e5cf7aaf9490854197328eadbe8ac049adef7510a07a0ea046fa1d410c5cc1048828152b9368a8d8925f8f0072192ebfe1bbb3101"}`,
		hex:    "0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596bFB972996fd7658099a95E6290e8B0fa46b9BDd500000000000000000000000000000000000000000000000000000000000003e892cBc0Bec2121f55E84bC331f096b7dAAe5A5ddA00000000000000000000000000000000000000000000000000000000000003e8ce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300",
		hash:   "0x7f57019fac8d46bfc12632ffe95d1a3a5189514d0e388acc7cba8e9287b38c61",
	},
	{
		desc:   "Mock order #2",
		poster: "0x2b279207610cc9aAF5D9d120d5293De0Bb51F90e",
		order:  `{"subContract":"0x867cbd1db30567124204506d5c42b94fe6ee057f","maker":"0x07d6c112208fb02ffa0573ac6e77d806ec9afcf4","arguments":{"maker":[{"datatype":"address","name":"signer"},{"datatype":"address","name":"signerToken"},{"datatype":"uint","name":"signerTokenCount"},{"datatype":"address","name":"buyerToken"},{"datatype":"uint","name":"buyerTokenCount"},{"datatype":"signature","name":"signature","signatureFields":[0,1,2,3,4]}],"taker":[{"datatype":"uint","name":"tokensToBuy"}]},"makerValues":{"signer":"0x07d6c112208fb02ffa0573ac6e77d806ec9afcf4","signerToken":"0x4c15bB43988accb621e78955C3C39D61bF9b6829","signerTokenCount":"1000","buyer":"0xe7fb59fa3c134613a78056855655a6d7babb98f9","buyerToken":"0x34Eb8dC4D29C71B20A925D8ed78246De65d786cd","buyerTokenCount":"1000","signature":"0x895444bfe34155f1601c9a1b14705d4150e65a1f9b36a996ecb8315993c4acf572add35cd3cdba54051e6c9234004ecd52c73906fa161c17efd560196d371af201"},"makerSignature":"0x895444bfe34155f1601c9a1b14705d4150e65a1f9b36a996ecb8315993c4acf572add35cd3cdba54051e6c9234004ecd52c73906fa161c17efd560196d371af201","posterSignature":"0x025c06af0ee5d6ca3cb4de9e8b7d6af863e951c591e5fa4d854cee96c7eee8140eca92cc8eb4219f3f9331e1532d4d5a6602ba238247648f6b80e90b053c0cac01"}`,
		hex:    "0x07d6c112208fb02ffa0573ac6e77d806ec9afcf44c15bB43988accb621e78955C3C39D61bF9b682900000000000000000000000000000000000000000000000000000000000003e834Eb8dC4D29C71B20A925D8ed78246De65d786cd00000000000000000000000000000000000000000000000000000000000003e8895444bfe34155f1601c9a1b14705d4150e65a1f9b36a996ecb8315993c4acf572add35cd3cdba54051e6c9234004ecd52c73906fa161c17efd560196d371af201",
		hash:   "0x7949e3daf7b258de987e7571502ee2660caad54e07d371db49e0578dde515c48",
	},
	{
		desc:   "Mock order #3",
		poster: "0x8B3FFFbA0560cFD16caC017cad7120E356CbB98a",
		order:  `{"subContract":"0x38a4d7865b3f265093fcbf4d7bc5e7e00713c8e6","maker":"0x7e8614e53cb79c7a5d95b957f1bcce291eab248d","arguments":{"maker":[{"datatype":"address","name":"signer"},{"datatype":"address","name":"signerToken"},{"datatype":"uint","name":"signerTokenCount"},{"datatype":"address","name":"buyerToken"},{"datatype":"uint","name":"buyerTokenCount"},{"datatype":"signature","name":"signature","signatureFields":[0,1,2,3,4]}],"taker":[{"datatype":"uint","name":"tokensToBuy"}]},"makerValues":{"signer":"0x7e8614e53cb79c7a5d95b957f1bcce291eab248d","signerToken":"0x56613e252163DAd4276E8b4Cd34a4021eaA1B14B","signerTokenCount":"1000","buyer":"0xf72c35151f8c86a5ac73f213da8164df89b690b7","buyerToken":"0x743102BD6fD1f9452cbF0512AA44041B52c81530","buyerTokenCount":"1000","signature":"0xbbc6600a2891b029d694027a6aed6a13e85e59ce4fcbed1210e66b5c1bbbb1ca19891490edf46877fb6a0ae548db3dc3dd83fa55a6f3c66596fe7f8740eb2c7e00"},"makerSignature":"0xbbc6600a2891b029d694027a6aed6a13e85e59ce4fcbed1210e66b5c1bbbb1ca19891490edf46877fb6a0ae548db3dc3dd83fa55a6f3c66596fe7f8740eb2c7e00","posterSignature":"0x6c0684cb993dded088ea5e0bd9c5808c827a6bd2800beeaa9e1c4686049a16b30e2b0694e4c19647fb45c150e3b8e02ecd6f7a552099af98fec5c0c7d7ffb6d901"}`,
		hex:    "0x7e8614e53cb79c7a5d95b957f1bcce291eab248d56613e252163DAd4276E8b4Cd34a4021eaA1B14B00000000000000000000000000000000000000000000000000000000000003e8743102BD6fD1f9452cbF0512AA44041B52c8153000000000000000000000000000000000000000000000000000000000000003e8bbc6600a2891b029d694027a6aed6a13e85e59ce4fcbed1210e66b5c1bbbb1ca19891490edf46877fb6a0ae548db3dc3dd83fa55a6f3c66596fe7f8740eb2c7e00",
		hash:   "0x32a96ba931b5a20c807c1e8088d56000b8f04c53da89d1a059c779a050c74cb9",
	},
	{
		desc:   "Mock order #4",
		poster: "0xe0421e1bd84c6dabfc7601305a294e5d05001ee5",
		order:  `{"subContract":"0x38a4d7865b3f265093fcbf4d7bc5e7e00713c8e6","maker":"0xe0421e1bd84c6dabfc7601305a294e5d05001ee5","arguments":{"maker":[{"datatype":"address","name":"signer"},{"datatype":"address","name":"signerToken"},{"datatype":"uint","name":"signerTokenCount"},{"datatype":"address","name":"buyerToken"},{"datatype":"uint","name":"buyerTokenCount"},{"datatype":"signature","name":"signature","signatureFields":[0,1,2,3,4]}],"taker":[{"datatype":"uint","name":"tokensToBuy"}]},"makerValues":{"signer":"0x7e8614e53cb79c7a5d95b957f1bcce291eab248d","signerToken":"0x56613e252163DAd4276E8b4Cd34a4021eaA1B14B","signerTokenCount":"1000","buyer":"0xf72c35151f8c86a5ac73f213da8164df89b690b7","buyerToken":"0x743102BD6fD1f9452cbF0512AA44041B52c81530","buyerTokenCount":"1000","signature":"0xbbc6600a2891b029d694027a6aed6a13e85e59ce4fcbed1210e66b5c1bbbb1ca19891490edf46877fb6a0ae548db3dc3dd83fa55a6f3c66596fe7f8740eb2c7e00"},"makerSignature":"0xbbc6600a2891b029d694027a6aed6a13e85e59ce4fcbed1210e66b5c1bbbb1ca19891490edf46877fb6a0ae548db3dc3dd83fa55a6f3c66596fe7f8740eb2c7e00","posterSignature":"0x199a2837c72e0ec30f70977bf8ed18e2eb0df7fce7329a8476e2bd82626dd51260ccbfa79b52bad0d246d6bb5cc7848f86088c27188175a6b3d0b30bfafaa7121c"}`,
		hex:    "0x7e8614e53cb79c7a5d95b957f1bcce291eab248d56613e252163DAd4276E8b4Cd34a4021eaA1B14B00000000000000000000000000000000000000000000000000000000000003e8743102BD6fD1f9452cbF0512AA44041B52c8153000000000000000000000000000000000000000000000000000000000000003e8bbc6600a2891b029d694027a6aed6a13e85e59ce4fcbed1210e66b5c1bbbb1ca19891490edf46877fb6a0ae548db3dc3dd83fa55a6f3c66596fe7f8740eb2c7e00",
		hash:   "0x32a96ba931b5a20c807c1e8088d56000b8f04c53da89d1a059c779a050c74cb9",
	},
	{
		desc:   "Mock order #5",
		poster: "0xAA554D0c5ff879387Fc234dE5D22EC02983baA27",
		order:  `{"subContract":"0x0265e7d1b094787cb13174e18a1cefc41279a6c9","makerValues":{"makerAddress":"0xc521f483f607eb5ea4d6b2dfdbd540134753a865","takerAddress":"0x0000000000000000000000000000000000000000","feeRecipientAddress":"0x0000000000000000000000000000000000000000","senderAddress":"0x0000000000000000000000000000000000000000","makerAssetAmount":"100","takerAssetAmount":"100","makerFee":"0","takerFee":"0","expirationTimeSeconds":"1567534568801","salt":"93310513155794199724033638342581186517359470476472639856048654052558668651975","makerAssetData":"0xf47261b0000000000000000000000000cc868306d6188b2b12757a7c3926042b4d3c4e29","takerAssetData":"0xf47261b0000000000000000000000000cc868306d6188b2b12757a7c3926042b4d3c4e29","exchangeAddress":"0x48bacb9266a570d521063ef5dd96e61686dbe788","signature":"0x1cd7ffd6ad7b5812a28d37fcf25120d3c6c6b195674da509bd5b475e6e5a6602f0432a9e31c96bfbc8f829422900c635becd543191fa2ff0431d4728b427d9960d02"},"arguments":{"maker":[{"datatype":"address","name":"makerAddress"},{"datatype":"address","name":"takerAddress"},{"datatype":"address","name":"feeRecipientAddress"},{"datatype":"address","name":"senderAddress"},{"datatype":"uint","name":"makerAssetAmount"},{"datatype":"uint","name":"takerAssetAmount"},{"datatype":"uint","name":"makerFee"},{"datatype":"uint","name":"takerFee"},{"datatype":"uint","name":"expirationTimeSeconds"},{"datatype":"uint","name":"salt"},{"datatype":"bytes","name":"makerAssetData"},{"datatype":"bytes","name":"takerAssetData"},{"datatype":"bytes","name":"signature"}],"taker":[{"datatype":"address","name":"taker"},{"datatype":"uint","name":"takerAssetAmount"}]},"posterSignature":"0xe4be2af1f18d42b736b9c1a5a155d2dcdde6010553e6ee9210a3f35fc21d855765be4992c7c131b9f3e39b0e21a6be7a2523f78d5e24f89745dd12d7bb5935b11b"}`,
		hex:    "0xc521f483f607eb5ea4d6b2dfdbd540134753a86500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000640000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016cf8575561ce4be0fd36746c0dedf1822b277e6b1ff10a21ffe087f9a75776f9f1a0a15dc7f47261b0000000000000000000000000cc868306d6188b2b12757a7c3926042b4d3c4e29f47261b0000000000000000000000000cc868306d6188b2b12757a7c3926042b4d3c4e291cd7ffd6ad7b5812a28d37fcf25120d3c6c6b195674da509bd5b475e6e5a6602f0432a9e31c96bfbc8f829422900c635becd543191fa2ff0431d4728b427d9960d02",
		hash:   "0xf71ab4333d0693df3d562a9e814ecac3ed76e52f4139188676ad42e55b3488cd",
	},
	{
		desc:   "Mock order #6",
		poster: "0xAA554D0c5ff879387Fc234dE5D22EC02983baA27",
		order:  `{"subContract":"0x000000","makerValues":{"testAddress":"0xAA554D0c5ff879387Fc234dE5D22EC02983baA27","testUint":"1","testInt":"-1","twoBytes":"0x1122","fiveBytes":"0xaabbccddee","signature":"0xbdc0604188ad53ff03459f6597a7d6c08713fd97cd913c8f1c95997841306b8e61c92707cbd2ef47b732aadd372c94ed1b0a9344b001650f3e936e9cbfeeec5c1b"},"arguments":{"maker":[{"datatype":"address","name":"testAddress"},{"datatype":"uint","name":"testUint"},{"datatype":"int","name":"testInt"},{"datatype":"bytes","name":"twoBytes"},{"datatype":"bytes","name":"fiveBytes"},{"datatype":"signature","name":"signature","signatureFields":[0,1,2,3,4]}],"taker":[]},"maker":"0xaa554d0c5ff879387fc234de5d22ec02983baa27","makerSignature":"0xbdc0604188ad53ff03459f6597a7d6c08713fd97cd913c8f1c95997841306b8e61c92707cbd2ef47b732aadd372c94ed1b0a9344b001650f3e936e9cbfeeec5c1b","posterSignature":"0x9f0f9a6e3a81f1f175822a78c4fb16661576d3195d783109d2c9c6a2cb25fc5248fda663fd050ac01b394da5f2495ea673d18ea6bf2ce2e52ca1bf516e165ae51c"}`,
		hex:    "0xAA554D0c5ff879387Fc234dE5D22EC02983baA270000000000000000000000000000000000000000000000000000000000000001ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1122aabbccddeebdc0604188ad53ff03459f6597a7d6c08713fd97cd913c8f1c95997841306b8e61c92707cbd2ef47b732aadd372c94ed1b0a9344b001650f3e936e9cbfeeec5c1b",
		hash:   "0xe760c079c035f0ea17be1e36f0f49fbce25d0408cf0785c2c7b6e42196f785d9",
	},
}

func TestCreateOrder(t *testing.T) {
	for _, tC := range testCases {
		t.Run(tC.desc, func(t *testing.T) {
			_, err := NewOrder(tC.order)
			require.NoError(t, err, "Expected no error creating and decoding order")
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

func TestFromProto(t *testing.T) {
	for _, tC := range testCases {
		t.Run(tC.desc, func(t *testing.T) {
			orderTransaction := &types.TransactionOrder{}

			decoder := json.NewDecoder(strings.NewReader(tC.order))
			err := decoder.Decode(&orderTransaction)
			require.NoError(t, err, "Expected no error creating order transaction")

			// convert to type Order
			order, err := NewOrderFromProto(orderTransaction)
			require.NoError(t, err, "Expected no error converting to Order type")

			expectedPoster := MustNewAddressString(tC.poster)
			recoveredPoster, err := order.RecoverPoster()
			require.NoError(t, err, "Expected no error recovering poster")
			require.EqualValues(t, expectedPoster, recoveredPoster, "Expected recovered poster to match test case")
		})
	}
}

func TestManualOrder(t *testing.T) {
	tx := &types.TransactionOrder{
		SubContract:     "0xebe8fdf63db77e3b41b0aec8208c49fa46569606",
		Maker:           "0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596",
		MakerSignature:  "0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300",
		PosterSignature: "0xc3550b7ceab610e638dfb1b33e5cf7aaf9490854197328eadbe8ac049adef7510a07a0ea046fa1d410c5cc1048828152b9368a8d8925f8f0072192ebfe1bbb3101",
	}

	order, err := NewOrderFromProto(tx)
	assert.NoError(t, err, "should not be error creating order")

	hx, err := order.PosterHex()
	fmt.Println(hex.EncodeToString(hx))
	assert.NoError(t, err, "should not be error generating hex")
}
