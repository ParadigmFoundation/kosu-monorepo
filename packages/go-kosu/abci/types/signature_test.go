// nolint:lll
package types

import (
	"encoding/hex"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestSignature(t *testing.T) {
	testCases := []struct {
		desc      string
		signer    string
		hash      string
		signature string
	}{
		{
			desc:      "Hex-encoded signature #1 (from kosu.js)",
			signer:    "0xaDec89552A02E7fa64BdCc56a4d1F79fF37f59E2",
			hash:      "0x4996017b62b11d1598d46e4a57a61db795e53f0f7b69958de455117a9ea623cb",
			signature: "0x75719eaaf5adb0439d09aa315875f7914fc84ee7132cb9cd0dcf2a33a02f768140e1cb0c1d5e14d6170027620b8714616cae5b54451fae42c983a6dc046d048e01",
		},
		{
			desc:      "Hex-encoded signature #2 (from kosu.js)",
			signer:    "0xe66B7f926843BE6A0EA409EbDC41b4cE113E7262",
			hash:      "0x729ea5b89657ffedf80b7468617a1853de8a6f0e41f22c30a18fe8973cad0972",
			signature: "0x88f5f4be74f5d8e2e9a5fc214b75c3526244bf6a4ed43d1cac333b9d889c7590271cb594c40b5aea11865d6c86a87775229d372779ebc4f0810cc4d1f989dc6101",
		},
		{
			desc:      "Hex-encoded signature #3 (from kosu.js)",
			signer:    "0xfb004Bb4E4c9583eD64429e907c1B8213170ff1C",
			hash:      "0xbb99476c41eefb09277c17034a10ff86a38a67eb184411e5792466f018c964d0",
			signature: "0x597cb54abf5881460a5447337cbebd61ebad787a13ae60dde6e0342df901061f2d3ef881a6f0a68e578a513df9caf8f02ca712d8a98a275e50d4a716505431e301",
		},
	}
	for _, tC := range testCases {
		t.Run(tC.desc, func(t *testing.T) {
			hashBytes, _ := hex.DecodeString(tC.hash[2:])
			signerBytes, _ := hex.DecodeString(tC.signer[2:])
			signatureBytes, _ := hex.DecodeString(tC.signature[2:])

			sig, err := NewSignatureFromString(tC.signature)
			require.NoError(t, err, "Expected no error creating signature")

			require.EqualValues(t, signatureBytes, sig.Bytes(), "Expected bytes to be equal to provided")
			require.EqualValues(t, tC.signature, sig.String(), "Expected input string and signature string to be equal")

			recoveredSigner, err := sig.RecoverSigner(hashBytes)
			require.NoError(t, err, "Expected no error recovering signer")
			require.EqualValues(t, signerBytes, recoveredSigner.Bytes(), "Expected recovered signer bytes to match")
		})
	}
}
