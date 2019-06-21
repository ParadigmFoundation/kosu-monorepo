package types

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

const knownPosterHex = "0x4811f841441b2d7e0516b46d4a7b77caa1a316a39b8358318848e3ef7c6db3ef"
const mockOrder = `{"subContract":"0x63b577d6cc0f39d329f7bf1a4bccc4a1eafc8292","maker":"0xcb518d697c99d0d243e3c73fb5dea8464bddd2da","arguments":{"maker":[{"datatype":"address","name":"signer"},{"datatype":"address","name":"signerToken"},{"datatype":"uint","name":"signerTokenCount"},{"datatype":"address","name":"buyerToken"},{"datatype":"uint","name":"buyerTokenCount"},{"datatype":"signature","name":"signature","signatureFields":[0,1,2,3,4]}],"taker":[{"datatype":"uint","name":"tokensToBuy"}]},"makerValues":{"signer":"0xcb518d697c99d0d243e3c73fb5dea8464bddd2da","signerToken":"0x56f34847BEDE8Ed728b38E68DDeB6758bEBBbBde","signerTokenCount":1000,"buyer":"0x4d81cb2e8dd024cae8a1ea86c0d50be681cb4e0e","buyerToken":"0x011ac35d0f3218058A155f3e21D005B6089d0Fa3","buyerTokenCount":1000,"signature":"0xdee0968e41b912d93f8ee5eb5a89f69b93c6c1fff88d3b1ccb452ae5a08342361dfbc5a4afa9829bfb64294321f8c8d0bacf60e5dda81f64a82d004d42570b4500"},"makerSignature":"0xdee0968e41b912d93f8ee5eb5a89f69b93c6c1fff88d3b1ccb452ae5a08342361dfbc5a4afa9829bfb64294321f8c8d0bacf60e5dda81f64a82d004d42570b4500","takerValues":{"tokensToBuy":100},"posterSignature":"0xf5c94d06b88c5a6341cf008b62593fdb322b2c750f49091d0fa5e4703127bbce3e3588f4b04c13881ee1bc9b28e18666252e8531f46e67201aa0b714601253ca00"}`

const mockHex1 = "0x8ffbd8b78588cea15d2f48de5018b9c6f634ba7df279efef4ecb2682e68b55f8"
const mockOrder1 = `{"subContract":"0x1a182389482c411f2149ae6b561c10bdb45566df","maker":"0x1c4518bc8dcd0824b7d1cd87112806d96fdc9e7a","arguments":{"maker":[{"datatype":"address","name":"signer"},{"datatype":"address","name":"signerToken"},{"datatype":"uint","name":"signerTokenCount"},{"datatype":"address","name":"buyerToken"},{"datatype":"uint","name":"buyerTokenCount"},{"datatype":"signature","name":"signature","signatureFields":[0,1,2,3,4]}],"taker":[{"datatype":"uint","name":"tokensToBuy"}]},"makerValues":{"signer":"0x1c4518bc8dcd0824b7d1cd87112806d96fdc9e7a","signerToken":"0x323d158Dd8903db645B378FeBfA8653B1912D6a1","signerTokenCount":1000,"buyer":"0x23e556b2ea0a696e533d92f0209b9460ffbc1c1a","buyerToken":"0x70A38470B7736962f4B6207D521c558B3261C426","buyerTokenCount":1000,"signature":"0xfc860d67b460c013b119c8ab8ae3095dead0b6c7d261f066bae76f3d591e43e87b098d492f8468fe8c22e10b700127d43593d6954ecdb96a5cd5f94df5b2943b00"},"makerSignature":"0xfc860d67b460c013b119c8ab8ae3095dead0b6c7d261f066bae76f3d591e43e87b098d492f8468fe8c22e10b700127d43593d6954ecdb96a5cd5f94df5b2943b00","takerValues":{"tokensToBuy":100}}`

const mockHex2 = "0x53abb1164b49f827453c63a577bfa70f34b4caf5a1bd03bb0d9990b55f46f668"
const mockOrder2 = `{"subContract":"0x23df63a15ab38ae44930931ad46307a264494c09","maker":"0x09b64c1eac150d4fb938a26ffdbdde4b9a91c2c5","arguments":{"maker":[{"datatype":"address","name":"signer"},{"datatype":"address","name":"signerToken"},{"datatype":"uint","name":"signerTokenCount"},{"datatype":"address","name":"buyerToken"},{"datatype":"uint","name":"buyerTokenCount"},{"datatype":"signature","name":"signature","signatureFields":[0,1,2,3,4]}],"taker":[{"datatype":"uint","name":"tokensToBuy"}]},"makerValues":{"signer":"0x09b64c1eac150d4fb938a26ffdbdde4b9a91c2c5","signerToken":"0x5EAAE17530F327261639c3e84A67Eb2992c2e7B0","signerTokenCount":1000,"buyer":"0xe6549d86624a3c371ad6910c159e1f79f8509fad","buyerToken":"0x662EfBf0E42bf2DB7FD2ae5245Dff12BC56498aF","buyerTokenCount":1000,"signature":"0x87831877e11d00a87508d4ff3c861a85aae2069a94de48e1956ac0f8ac150b1d5bef3d575f391e70110dfccbe40f6ba8c90b3695c6f29bdaf8b1f01c955344f600"},"makerSignature":"0x87831877e11d00a87508d4ff3c861a85aae2069a94de48e1956ac0f8ac150b1d5bef3d575f391e70110dfccbe40f6ba8c90b3695c6f29bdaf8b1f01c955344f600","takerValues":{"tokensToBuy":100}}`

func TestParseOrder(t *testing.T) {
	assert := assert.New(t)
	require := require.New(t)

	order, err := NewOrder(mockOrder)
	require.NoError(err, "Expected no error creating order")
	assert.NoError(err, "Expected no error creating order")
	t.Logf("<%v>", order.String())
}
