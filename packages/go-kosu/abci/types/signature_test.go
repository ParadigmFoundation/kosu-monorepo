// nolint:lll
package types

import (
	"encoding/json"
	"fmt"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestSignaturesFromKosuJS(t *testing.T) {
	cases := []struct {
		signer    string
		hash      string
		signature string
	}{
		{
			"0xaDec89552A02E7fa64BdCc56a4d1F79fF37f59E2",
			"0x4996017b62b11d1598d46e4a57a61db795e53f0f7b69958de455117a9ea623cb",
			"0x75719eaaf5adb0439d09aa315875f7914fc84ee7132cb9cd0dcf2a33a02f768140e1cb0c1d5e14d6170027620b8714616cae5b54451fae42c983a6dc046d048e01",
		},
		{
			"0xe66B7f926843BE6A0EA409EbDC41b4cE113E7262",
			"0x729ea5b89657ffedf80b7468617a1853de8a6f0e41f22c30a18fe8973cad0972",
			"0x88f5f4be74f5d8e2e9a5fc214b75c3526244bf6a4ed43d1cac333b9d889c7590271cb594c40b5aea11865d6c86a87775229d372779ebc4f0810cc4d1f989dc6101",
		},
		{
			"0xfb004Bb4E4c9583eD64429e907c1B8213170ff1C",
			"0xbb99476c41eefb09277c17034a10ff86a38a67eb184411e5792466f018c964d0",
			"0x597cb54abf5881460a5447337cbebd61ebad787a13ae60dde6e0342df901061f2d3ef881a6f0a68e578a513df9caf8f02ca712d8a98a275e50d4a716505431e301",
		},
	}

	for _, test := range cases {
		t.Run(test.signer, func(t *testing.T) {
			sig, err := NewSignatureFromString(test.signature)
			require.NoError(t, err)

			hash, err := NewHexBytesFromString(test.hash)
			require.NoError(t, err)

			addr, err := sig.RecoverSigner(hash)
			require.NoError(t, err)

			assert.Equal(t, strings.ToLower(test.signer), addr.String())
		})
	}
}

func TestSignatureErr(t *testing.T) {
	cases := []struct {
		name string
		sig  string
	}{
		{"too short", "0xff"},
		{"too long", "0x75719eaaf5adb0439d09aa315875f7914fc84ee7132cb9cd0dcf2a33a02f768140e1cb0c1d5e14d6170027620b8714616cae5b54451fae42c983a6dc046d048e01FFF"},
		{"no hex", "size is right but content is not valid fmt"},
	}

	for _, test := range cases {
		t.Run(test.name, func(t *testing.T) {
			_, err := NewSignatureFromString(test.sig)
			assert.Error(t, err)
		})
	}
}

func TestSignatureJSON(t *testing.T) {
	sig := "0x75719eaaf5adb0439d09aa315875f7914fc84ee7132cb9cd0dcf2a33a02f768140e1cb0c1d5e14d6170027620b8714616cae5b54451fae42c983a6dc046d048e01"
	jsonStr := fmt.Sprintf(`{"sig":"%s"}`, sig)
	obj := struct {
		Sig Signature `json:"sig"`
	}{}

	t.Run("Unmarshal", func(t *testing.T) {
		require.NoError(t,
			json.Unmarshal([]byte(jsonStr), &obj),
		)

		assert.Equal(t, sig, obj.Sig.String())
	})

	t.Run("Marshal", func(t *testing.T) {
		obj.Sig = MustNewSignatureString(sig)
		buf, err := json.Marshal(&obj)
		require.NoError(t, err)

		assert.Equal(t, jsonStr, string(buf))
	})
}
