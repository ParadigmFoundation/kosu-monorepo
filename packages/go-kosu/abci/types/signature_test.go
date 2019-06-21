// nolint:lll
package types

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestSignature(t *testing.T) {
	testCases := []struct {
		desc      string
		signature string
		bytes     []byte
	}{
		{
			desc:      "Hex-encoded signature #1",
			signature: "0xfc860d67b460c013b119c8ab8ae3095dead0b6c7d261f066bae76f3d591e43e87b098d492f8468fe8c22e10b700127d43593d6954ecdb96a5cd5f94df5b2943b00",
			bytes:     []byte{252, 134, 13, 103, 180, 96, 192, 19, 177, 25, 200, 171, 138, 227, 9, 93, 234, 208, 182, 199, 210, 97, 240, 102, 186, 231, 111, 61, 89, 30, 67, 232, 123, 9, 141, 73, 47, 132, 104, 254, 140, 34, 225, 11, 112, 1, 39, 212, 53, 147, 214, 149, 78, 205, 185, 106, 92, 213, 249, 77, 245, 178, 148, 59, 0},
		},
		{
			desc:      "Hex-encoded signature #2",
			signature: "0x87831877e11d00a87508d4ff3c861a85aae2069a94de48e1956ac0f8ac150b1d5bef3d575f391e70110dfccbe40f6ba8c90b3695c6f29bdaf8b1f01c955344f600",
			bytes:     []byte{135, 131, 24, 119, 225, 29, 0, 168, 117, 8, 212, 255, 60, 134, 26, 133, 170, 226, 6, 154, 148, 222, 72, 225, 149, 106, 192, 248, 172, 21, 11, 29, 91, 239, 61, 87, 95, 57, 30, 112, 17, 13, 252, 203, 228, 15, 107, 168, 201, 11, 54, 149, 198, 242, 155, 218, 248, 177, 240, 28, 149, 83, 68, 246, 0},
		},
	}
	for _, tC := range testCases {
		t.Run(tC.desc, func(t *testing.T) {
			sig, err := NewSignatureFromString(tC.signature)
			require.NoError(t, err, "Expected no error creating signature")

			require.EqualValues(t, tC.bytes, sig.Bytes(), "Expected bytes to be equal to provided")
			require.EqualValues(t, tC.signature, sig.String(), "Expected input string and signature string to be equal")
		})
	}
}
