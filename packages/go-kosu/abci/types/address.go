package types

import (
	"encoding/hex"
	"errors"
)

// Address represents a 20 byte Ethereum address
type Address struct {
	HexBytes
}

var (
	// ErrAddressLength represents an error for an address of invalid length
	ErrAddressLength = errors.New("invalid length for address")
)

// NewAddressFromString creates a new Address, provided a 0x-prefixed hex string
func NewAddressFromString(input string) (Address, error) {
	decoded, err := hex.DecodeString(input[2:])
	if err != nil {
		return Address{}, err
	}
	return NewAddressFromBytes(decoded)
}

// NewAddressFromBytes creates a new Address, provided raw bytes
func NewAddressFromBytes(input []byte) (Address, error) {
	if len(input) != 20 {
		return Address{}, ErrAddressLength
	}

	bytes := HexBytes(input)
	return Address{bytes}, nil
}

// UnmarshalJSON implements the json.Unmarshaler interface.
func (a *Address) UnmarshalJSON(bytes []byte) error {
	// 20 byte address + '0x' prefix + open/close quotes
	if len(bytes) != 44 {
		return ErrAddressLength
	}

	return a.HexBytes.UnmarshalJSON(bytes)
}
