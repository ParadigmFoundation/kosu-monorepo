package types

import (
	"math"
	"math/big"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestTransactionRebalance(t *testing.T) {
	t.Run("Sort", func(t *testing.T) {
		tx := &TransactionRebalance{
			Limits: []*RateLimit{
				{Address: "z", Limit: 30},
				{Address: "x", Limit: 10},
				{Address: "y", Limit: 20},
			},
		}

		tx.SortRateLimits()

		expectedAddresses := []string{"x", "y", "z"}
		expectedLimits := []uint64{10, 20, 30}
		for i, l := range tx.Limits {
			assert.Equal(t, expectedAddresses[i], l.Address)
			assert.Equal(t, expectedLimits[i], l.Limit)
		}
	})
}

func TestBigInt(t *testing.T) {
	// Create a large number
	n := big.NewInt(0).Mul(
		big.NewInt(math.MaxUint32),
		big.NewInt(math.MaxUint32),
	)

	// Create a protobuf BigInt
	b := &BigInt{Value: n.Bytes()}

	t.Run("Equality", func(t *testing.T) {
		assert.Equal(t, n, b.BigInt())
	})

	t.Run("TextMarshaling", func(t *testing.T) {
		assert.Equal(t, "value: 18446744065119617025", b.String())
	})
}

func TestTransactionWitness(t *testing.T) {
	pub, _, err := NewKeyPair()
	require.NoError(t, err)

	t.Run("Validate", func(t *testing.T) {
		assert.Error(t, (&TransactionWitness{
			Subject: TransactionWitness_POSTER, PublicKey: pub,
		}).Validate())

		assert.NoError(t, (&TransactionWitness{
			Subject: TransactionWitness_POSTER, PublicKey: nil,
		}).Validate())

		assert.Error(t, (&TransactionWitness{
			Subject: TransactionWitness_VALIDATOR, PublicKey: nil,
		}).Validate())

		assert.NoError(t, (&TransactionWitness{
			Subject: TransactionWitness_VALIDATOR, PublicKey: pub,
		}).Validate())
	})

	t.Run("Hash", func(t *testing.T) {
		tx1 := &TransactionWitness{
			Subject: TransactionWitness_VALIDATOR, PublicKey: pub, Block: 100,
		}

		tx2 := &TransactionWitness{
			Subject: TransactionWitness_VALIDATOR, PublicKey: pub, Block: 101,
		}

		assert.NotEqual(t, tx1.Hash(), tx2.Hash())
	})
}
