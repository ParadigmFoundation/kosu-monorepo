package types

import (
	"encoding/hex"
	"errors"
	"strconv"

	"github.com/ethereum/go-ethereum/crypto"
)

var (
	// ErrSignatureLength returned when trying to load invalid length signatures
	ErrSignatureLength = errors.New("invalid length for signature")
)

// Signature represents a 65-byte Kosu order signature (from maker/poster)
type Signature struct {
	HexBytes
}

// NewSignatureFromString creates a new signature provided a 0x-prefixed hex string
func NewSignatureFromString(input string) (*Signature, error) {
	decoded, err := hex.DecodeString(input[2:])
	if err != nil {
		return nil, err
	}

	if len(decoded) != 65 {
		return nil, ErrSignatureLength
	}

	bytes := HexBytes(decoded)
	return &Signature{bytes}, nil
}

// RecoverSigner recovers the address that generated the signature, given a hash
func (s *Signature) RecoverSigner(hash []byte) (Address, error) {
	messageHash := hashEthereumMessage(hash)

	recoveredKey, err := crypto.Ecrecover(messageHash, s.Bytes())
	if err != nil {
		return Address{}, err
	}

	uncompressedKey, err := crypto.UnmarshalPubkey(recoveredKey)
	if err != nil {
		return Address{}, err
	}

	signerBytes := crypto.PubkeyToAddress(*uncompressedKey).Bytes()
	signer, err := NewAddressFromBytes(signerBytes)
	if err != nil {
		return Address{}, err
	}

	return signer, nil
}

// UnmarshalJSON implements the json.Unmarshaler interface
func (s *Signature) UnmarshalJSON(bytes []byte) error {
	// 65 byte signature + '0x' prefix + open/close quotes
	if len(bytes) != 134 {
		return ErrAddressLength
	}
	return s.HexBytes.UnmarshalJSON(bytes)
}

// hashEthereumMessage implements eth_sign style personal message hashing (used in ecrecover)
func hashEthereumMessage(hash []byte) (msgHash []byte) {
	prefix := "\u0019Ethereum Signed Message:\n" + strconv.Itoa(len(hash))
	msgHash = crypto.Keccak256([]byte(prefix), hash)
	return
}
