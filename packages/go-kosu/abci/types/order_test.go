package types

import (
	"encoding/hex"
	"testing"

	"github.com/stretchr/testify/require"
)

var testCases = []struct {
	desc      string
	order     string
	hex       string
	hash      string
	hexBytes  []byte
	hashBytes []byte
}{
	{
		desc:      "Mocker order #1",
		order:     `{"subContract":"0x0000000000000000000000000000000000000000","arguments":{"maker":[{"datatype":"address","name":"acc"},{"datatype":"uint","name":"num"}]},"makerValues":{"acc":"0xba71358156bbf446A9Ec3126b818fe8fA1Dcd580","num":4},"posterSignature":"0xafbb347be9abed3004d002eeafa7cac1eb9924b53627e0bc94068f0f304cef1806a9e0ce2187228baf2b06926caab3e130b22d5781878a08f2bc4b75e6db20b301"}`,
		hex:       "0xba71358156bbf446A9Ec3126b818fe8fA1Dcd5800000000000000000000000000000000000000000000000000000000000000004",
		hash:      "0xa5d262bb0c7d17f8f4b3d0fd12fc9845ee390b0f95a965a62a1a67b7db04e2be",
		hexBytes:  []byte{186, 113, 53, 129, 86, 187, 244, 70, 169, 236, 49, 38, 184, 24, 254, 143, 161, 220, 213, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4},
		hashBytes: []byte{165, 210, 98, 187, 12, 125, 23, 248, 244, 179, 208, 253, 18, 252, 152, 69, 238, 57, 11, 15, 149, 169, 101, 166, 42, 26, 103, 183, 219, 4, 226, 190},
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
			// sanity checks
			hexBytesComp, _ := hex.DecodeString(tC.hex[2:])
			require.EqualValues(t, tC.hexBytes, hexBytesComp)

			hashBytesComp, _ := hex.DecodeString(tC.hash[2:])
			require.EqualValues(t, tC.hashBytes, hashBytesComp)

			// test order
			order, err := NewOrder(tC.order)
			require.NoError(t, err, "Expected no error creating order")

			orderBytes, err := order.Serialize()
			require.NoError(t, err, "Expected no error generating order bytes")
			require.EqualValues(t, tC.hexBytes, orderBytes, "Expected order bytes to match test case")

			orderHash, err := order.PosterHex()
			require.NoError(t, err, "Expected no error generating poster hash")
			require.EqualValues(t, tC.hashBytes, orderHash, "Expected hex bytes to match")
		})
	}
}
