package types

import (
	"bytes"
	"crypto/sha256"
	"errors"
	fmt "fmt"
	"math/big"
	"sort"

	"github.com/golang/protobuf/proto"
)

// SortRateLimits sort the limits collection in lexicographic order using the Address as key
func (t *TransactionRebalance) SortRateLimits() {
	sort.Sort(rateLimits(t.Limits))
}

type rateLimits []*RateLimit

func (p rateLimits) Len() int           { return len(p) }
func (p rateLimits) Less(i, j int) bool { return p[i].Address < p[j].Address }
func (p rateLimits) Swap(i, j int)      { p[i], p[j] = p[j], p[i] }

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

var (
	// ErrNoPubKeyExpected is returned when no public key was expected but it was defined
	ErrNoPubKeyExpected = errors.New("expected no publicKey for poster witnesses")
	// ErrPubKeyExpected is returned when public key was expected but it was not defined
	ErrPubKeyExpected = errors.New("expected publicKey for validator witnesses")
	// ErrInvalidID occurs when the tx.ID and the computed Hash does not match.
	ErrInvalidID = errors.New("invalid ID")
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

// NewValidator returns a new validator with zero balance
func NewValidator() *Validator {
	return &Validator{
		Balance: NewBigIntFromInt(0),
	}
}
