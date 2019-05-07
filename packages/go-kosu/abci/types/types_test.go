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

	assert.Equal(t, n, b.BigInt())
}

func TestProtoBigIntFromInt(t *testing.T) {
	// real number from ParadigmEvent 
	// source: https://ropsten.etherscan.io/tx/0x4098d3f5acc97e33452185f1b94f69b4e9c92399ad7f0ae5d1bd8b382b430151#eventlog (63)
	//
	// Amount:
	//   - bytes (hex):			0x070b30db1912aa5c0000
	//   - byte arr:			{ 7, 11, 48, 219, 25, 18, 170, 92, 0, 0 }
	//   - decimal (sci):		3.3263e+22
	//   - decimal (exact):		33263000000000000000000  
	numBytes := []byte{7, 11, 48, 219, 25, 18, 170, 92, 0, 0}

	// create big.Int from bytes (as in witness/eth.go)
	amountBig := big.NewInt(0).SetBytes(numBytes)
	assert.Equal(t, amountBig.Bytes(), numBytes)

	// create proto BigInt (as in witness/witness.go L37)
	// THIS IS WHERE OVERFLOW CAN HAPPEN
	amountInt := amountBig.Int64()
	amountProtoBig := NewBigInt(amountInt)

	// convert proto back into big.Int (as in state/state.go L192)
	amountBigFromProto := amountProtoBig.BigInt()
	assert.Equal(t, amountBig.Bytes(), amountBigFromProto.Bytes())

	// show decimal version of both
	t.Logf("ACTUAL: %v, RECEIVED: %v", amountBig.Text(10), amountBigFromProto.Text(10))
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
