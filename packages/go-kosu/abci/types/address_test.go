package types

import (
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
			desc:    "Hex-encoded address #1",
			address: "0x63b577d6cc0f39d329f7bf1a4bccc4a1eafc8292",
			bytes:   []byte{99, 181, 119, 214, 204, 15, 57, 211, 41, 247, 191, 26, 75, 204, 196, 161, 234, 252, 130, 146},
		},
		{
			desc:    "Hex-encoded address #2",
			address: "0x23df63a15ab38ae44930931ad46307a264494c09",
			bytes:   []byte{35, 223, 99, 161, 90, 179, 138, 228, 73, 48, 147, 26, 212, 99, 7, 162, 100, 73, 76, 9},
		},
	}
	for _, tC := range testCases {
		t.Run(tC.desc, func(t *testing.T) {
			addr, err := NewAddressFromString(tC.address)
			require.NoError(t, err, "Expected no error creating address")

			require.EqualValues(t, tC.bytes, addr.Bytes(), "Expected bytes to be equal to provided")
			require.EqualValues(t, tC.address, addr.String(), "Expected input string and address string to be qqual")
		})
	}
}
