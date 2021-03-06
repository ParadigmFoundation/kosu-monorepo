package types

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"math/big"

	"github.com/golang/protobuf/proto"
)

// Bytes returns the underlying bytes
func (b *BigInt) Bytes() []byte { return b.Value }

// BigInt returns the math.BigInt representation
func (b *BigInt) BigInt() *big.Int {
	return big.NewInt(0).SetBytes(b.Value)
}

// MarshalText overloads the default Marshaling in order to pretty the Value as a formatted String
func (b *BigInt) MarshalText() ([]byte, error) {
	n := big.NewInt(0).SetBytes(b.Value)
	str := fmt.Sprintf("value: %s", n.String())
	return []byte(str), nil
}

// UnmarshalJSON is defined to parse BigInt from JSON.
// The BigInt value MUST be encoded as string.
func (b *BigInt) UnmarshalJSON(data []byte) error {
	var str string
	if err := json.Unmarshal(data, &str); err != nil {
		return err
	}

	b.Value = NewBigIntFromString(str, 10).Bytes()
	return nil
}

// Zero returns true if the value is 0
func (b *BigInt) Zero() bool {
	return b.BigInt().Cmp(big.NewInt(0)) == 0
}

var (
	// ErrNoPubKeyExpected is returned when no public key was expected but it was defined
	ErrNoPubKeyExpected = errors.New("expected no publicKey for poster witnesses")
	// ErrPubKeyExpected is returned when public key was expected but it was not defined
	ErrPubKeyExpected = errors.New("expected publicKey for validator witnesses")
	// ErrInvalidID occurs when the tx.ID and the computed Hash does not match.
	ErrInvalidID = errors.New("invalid ID")
	// ErrInvalidSignature occurs when the SignedTransaction's validation fails
	ErrInvalidSignature = errors.New("invalid signature validation")
)

// Validate validates a TransactionWitness format and values
func (tx *TransactionWitness) Validate() error {
	switch tx.GetSubject() {
	case TransactionWitness_POSTER:
		if tx.PublicKey != nil {
			return ErrNoPubKeyExpected
		}
	case TransactionWitness_VALIDATOR:
		if tx.PublicKey == nil {
			return ErrPubKeyExpected
		}
		// TODO: validate pubKey
	}

	if tx.Id != nil && !bytes.Equal(tx.Id, tx.Hash()) {
		return ErrInvalidID
	}

	return nil
}

// Hash computes the Tx hash
func (tx *TransactionWitness) Hash() []byte {
	// Make a copy so that we can safely unset .ID to compute the hash correctly
	var clone = *tx
	clone.Id = nil

	buf := &proto.Buffer{}
	buf.SetDeterministic(true)

	if err := buf.Marshal(&clone); err != nil {
		return nil
	}

	hash := sha256.Sum256(buf.Bytes())
	return hash[:]
}

// NewBigInt returns a new BigInt with value set to the provided byte slice.
func NewBigInt(bytes []byte) *BigInt {
	return &BigInt{Value: bytes}
}

// NewBigIntFromInt returns a new BigInt with value set to n.
// If `n` comes from a *big.Int, make sure to call `.IsInt64() ` before invoking `Int64()`.
func NewBigIntFromInt(n int64) *BigInt {
	b := big.NewInt(n).Bytes()
	return NewBigInt(b)
}

// NewBigIntFromString returns a new BigInt given a number in string
// interpreted in the given base.
func NewBigIntFromString(s string, base int) *BigInt {
	b := big.NewInt(0)
	b.SetString(s, base)
	return NewBigInt(b.Bytes())
}

// MarshalJSON is implemented to delegate the serialization to b.BigInt()
// It will render the same JSON as big.Int
func (b *BigInt) MarshalJSON() ([]byte, error) { return json.Marshal(b.BigInt()) }

// NewValidator returns a new validator with zero balance
func NewValidator() *Validator {
	return &Validator{
		Balance: NewBigIntFromInt(0),
	}
}

// GetOneOf return the underlying `oneOf` Tx behind this tx
func (tx *Transaction) GetOneOf() interface{} {
	switch tx.GetData().(type) {
	case *Transaction_Order:
		return tx.GetOrder()
	case *Transaction_Rebalance:
		return tx.GetRebalance()
	case *Transaction_Witness:
		return tx.GetWitness()
	}

	return nil
}

// NodeID is the id of a node submitting transactions
type NodeID []byte

// String is the string representation
func (id NodeID) String() string { return hex.EncodeToString(id) }
