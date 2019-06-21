package types

import (
	"encoding/hex"
	"errors"
)

// Address represents a 20 byte Ethereum address
type Address [20]byte

var (
	// ErrAddressDecode represents an error decoding a string address
	ErrAddressDecode = errors.New("unable to decode provided string")
	// ErrAddressLength represents an error for an address of invalid length
	ErrAddressLength = errors.New("invalid length for address")
)

// NewAddressFromString creates a new address, provided a 0x-prefixed hex string
func NewAddressFromString(input string) (address Address, e error) {
	decoded, err := hex.DecodeString(input[2:])
	if err != nil {
		e = ErrAddressDecode
		return
	}

	if len(decoded) != 20 {
		e = ErrAddressLength
		return
	}

	for i := 0; i < 20; i++ {
		address[i] = decoded[i]
	}
	return
}

// Bytes returns the underlying bytes of the address
func (a *Address) Bytes() (bytes []byte) {
	bytes = make([]byte, 20)
	for i := 0; i < 20; i++ {
		bytes[i] = a[i]
	}
	return
}

// String returns a 0x-prefixed hex-string representation of the address
func (a *Address) String() (address string) {
	decoded := hex.EncodeToString(a.Bytes())
	address = "0x" + decoded
	return
}

// UnmarshalJSON implements the json.Unmarshaler interface.
func (a *Address) UnmarshalJSON(bytes []byte) error {
	encoded, err := hex.DecodeString(string(bytes)[3 : len(bytes)-1])
	if err != nil {
		return err
	}
	if len(encoded) != 20 {
		return ErrAddressLength
	}
	for i := 0; i < 20; i++ {
		a[i] = encoded[i]
	}
	return nil
}
