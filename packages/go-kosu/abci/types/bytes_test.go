// nolint:lll
package types

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestHexBytes(t *testing.T) {
	var testCases = []struct {
		desc      string
		hexString string
		bytes     []byte
	}{
		{
			desc:      "Hex-encoded string #1 (address,non-checksummed)",
			hexString: "0x63b577d6cc0f39d329f7bf1a4bccc4a1eafc8292",
			bytes:     []byte{99, 181, 119, 214, 204, 15, 57, 211, 41, 247, 191, 26, 75, 204, 196, 161, 234, 252, 130, 146},
		},
		{
			desc:      "Hex-encoded string #2 (address, non-checksummed)",
			hexString: "0x23df63a15ab38ae44930931ad46307a264494c09",
			bytes:     []byte{35, 223, 99, 161, 90, 179, 138, 228, 73, 48, 147, 26, 212, 99, 7, 162, 100, 73, 76, 9},
		},
		{
			desc:      "Hex-encoded string #3 (address, checksummed)",
			hexString: "0x8b366a3d4e46aC5406F12766Ad33E6482Ce4F081",
			bytes:     []byte{139, 54, 106, 61, 78, 70, 172, 84, 6, 241, 39, 102, 173, 51, 230, 72, 44, 228, 240, 129},
		},
		{
			desc:      "Hex-encoded string #4 (address, non-checksummed)",
			hexString: "0x8b366a3d4e46ac5406f12766ad33e6482ce4f081",
			bytes:     []byte{139, 54, 106, 61, 78, 70, 172, 84, 6, 241, 39, 102, 173, 51, 230, 72, 44, 228, 240, 129},
		},
		{
			desc:      "Hex-encoded string #5 (address, non-checksummed, no prefix)",
			hexString: "8b366a3d4e46ac5406f12766ad33e6482ce4f081",
			bytes:     []byte{139, 54, 106, 61, 78, 70, 172, 84, 6, 241, 39, 102, 173, 51, 230, 72, 44, 228, 240, 129},
		},
		{
			desc:      "Hex-encoded string #6 (signature from kosu.js)",
			hexString: "0x88f5f4be74f5d8e2e9a5fc214b75c3526244bf6a4ed43d1cac333b9d889c7590271cb594c40b5aea11865d6c86a87775229d372779ebc4f0810cc4d1f989dc6101",
			bytes:     []byte{136, 245, 244, 190, 116, 245, 216, 226, 233, 165, 252, 33, 75, 117, 195, 82, 98, 68, 191, 106, 78, 212, 61, 28, 172, 51, 59, 157, 136, 156, 117, 144, 39, 28, 181, 148, 196, 11, 90, 234, 17, 134, 93, 108, 134, 168, 119, 117, 34, 157, 55, 39, 121, 235, 196, 240, 129, 12, 196, 209, 249, 137, 220, 97, 1},
		},
	}
	for _, tC := range testCases {
		t.Run(tC.desc, func(t *testing.T) {
			expectedBytes := tC.bytes

			hexBytes, err := NewHexBytesFromString(tC.hexString)
			require.NoError(t, err, "Should be no error creating hexBytes from string")
			require.EqualValues(t, expectedBytes, hexBytes.Bytes(), "Constructed bytes and provided should be equal")

			// test that we accept both prefixed and non-prefixed strings
			var expectedString string
			if strings.HasPrefix(tC.hexString, "0x") {
				expectedString = strings.ToLower(tC.hexString)
			} else {
				expectedString = strings.ToLower("0x" + tC.hexString)
			}

			hexString := hexBytes.String()
			require.EqualValues(t, expectedString, hexString, "Hex string from hexBytes should match test case")
		})
	}
}
