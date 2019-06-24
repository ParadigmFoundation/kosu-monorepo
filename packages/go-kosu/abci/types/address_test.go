// nolint:lll
package types

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestAddress(t *testing.T) {
	testCases := []struct {
		desc    string
		address string
		bytes   []byte
	}{
		{
			desc:    "Hex-encoded address #1 (non-checksummed)",
			address: "0x63b577d6cc0f39d329f7bf1a4bccc4a1eafc8292",
			bytes:   []byte{99, 181, 119, 214, 204, 15, 57, 211, 41, 247, 191, 26, 75, 204, 196, 161, 234, 252, 130, 146},
		},
		{
			desc:    "Hex-encoded address #2 (non-checksummed)",
			address: "0x23df63a15ab38ae44930931ad46307a264494c09",
			bytes:   []byte{35, 223, 99, 161, 90, 179, 138, 228, 73, 48, 147, 26, 212, 99, 7, 162, 100, 73, 76, 9},
		},
		{
			desc:    "Hex-encoded address #3 (checksummed)",
			address: "0x8b366a3d4e46aC5406F12766Ad33E6482Ce4F081",
			bytes:   []byte{139, 54, 106, 61, 78, 70, 172, 84, 6, 241, 39, 102, 173, 51, 230, 72, 44, 228, 240, 129},
		},
		{
			desc:    "Hex-encoded address #3 (non-checksummed)",
			address: "0x8b366a3d4e46ac5406f12766ad33e6482ce4f081",
			bytes:   []byte{139, 54, 106, 61, 78, 70, 172, 84, 6, 241, 39, 102, 173, 51, 230, 72, 44, 228, 240, 129},
		},
	}
	for _, tC := range testCases {
		t.Run(tC.desc, func(t *testing.T) {
			addr, err := NewAddressFromString(tC.address)
			require.NoError(t, err, "Expected no error creating address")

			require.EqualValues(t, tC.bytes, addr.Bytes(), "Expected bytes to be equal to provided")
			require.EqualValues(t, strings.ToLower(tC.address), addr.String(), "Expected input string and address string to be equal")
		})
	}
}
