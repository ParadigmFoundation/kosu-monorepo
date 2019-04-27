package types

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestSignedTransaction(t *testing.T) {
	pub, priv, err := NewKeyPair()
	require.NoError(t, err)

	tx := &Transaction{}
	stx, err := tx.SignedTransaction(priv)
	require.NoError(t, err)
	require.NotNil(t, stx)

	assert.Equal(t,
		pub,
		stx.Proof.PublicKey,
	)
	assert.NotEmpty(t, stx.Proof.Signature)

	valid, err := stx.Verify()
	require.NoError(t, err)
	assert.True(t, valid)

	t.Run("InvalidSignature", func(t *testing.T) {
		stx := &SignedTransaction{
			Tx: &Transaction{},
			Proof: &Proof{
				PublicKey: pub,
				Signature: []byte{0xde, 0xad, 0xbe, 0xef},
			},
		}

		valid, err := stx.Verify()
		require.NoError(t, err)
		assert.False(t, valid)
	})
}
