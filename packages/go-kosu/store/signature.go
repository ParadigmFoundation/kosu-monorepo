package store

import (
	"strconv"

	"github.com/ethereum/go-ethereum/crypto"
)

// Signature represents a Kosu order signature (from maker/poster)
type Signature [65]byte

// NewSignature returns a new Signature provided raw bytes
func NewSignature(bytes []byte) (Signature, error) {
	s := Signature{}
	if len(bytes) != len(s) {
		return s, ErrInvalidLength
	}

	copy(s[:], bytes)
	return s, nil
}

// MustNewSignature is analogue to NewSignature panicking on error
func MustNewSignature(bytes []byte) Signature {
	sig, err := NewSignature(bytes)
	if err != nil {
		panic(err)
	}

	return sig
}

// NewSignatureFromString returns a new Signature provided a string optionally prefixed with `0x`
func NewSignatureFromString(s string) (Signature, error) {
	bytes, err := NewHexBytesFromString(s)
	if err != nil {
		return Signature{}, err
	}

	return NewSignature(bytes)
}

// MustNewSignatureString is analogue to NewSignatureString panicking on error
func MustNewSignatureString(s string) Signature {
	sig, err := NewSignatureFromString(s)
	if err != nil {
		panic(err)
	}

	return sig
}

// Bytes returns the raw []byte representation of the Address
func (sig Signature) Bytes() []byte  { return HexBytes(sig[:]) }
func (sig Signature) String() string { return HexBytes(sig[:]).String() }

// UnmarshalJSON implements the json.Unmarshaler interface
func (sig *Signature) UnmarshalJSON(bytes []byte) error { return HexBytes(sig[:]).UnmarshalJSON(bytes) }

// MarshalJSON implements the json.Marshaler interface
func (sig *Signature) MarshalJSON() ([]byte, error) { return HexBytes(sig[:]).MarshalJSON() }

// RecoverSigner recovers the address that generated the signature, given a hash
func (sig *Signature) RecoverSigner(hash []byte) (Address, error) {
	messageHash := hashEthereumMessage(hash)

	// deals with differences in JS signing libraries
	cp := sig[:]
	if cp[64] > 27 {
		cp[64] -= 27
	}

	recoveredKey, err := crypto.Ecrecover(messageHash, cp)
	if err != nil {
		return Address{}, err

	}

	uncompressedKey, err := crypto.UnmarshalPubkey(recoveredKey)
	if err != nil {
		return Address{}, err

	}

	signerBytes := crypto.PubkeyToAddress(*uncompressedKey).Bytes()
	signer, err := NewAddress(signerBytes)
	if err != nil {
		return Address{}, err

	}

	return signer, nil
}

// hashEthereumMessage implements eth_sign style personal message hashing (used in ecrecover)
func hashEthereumMessage(hash []byte) (msgHash []byte) {
	prefix := "\u0019Ethereum Signed Message:\n" + strconv.Itoa(len(hash))
	msgHash = crypto.Keccak256([]byte(prefix), hash)
	return
}
