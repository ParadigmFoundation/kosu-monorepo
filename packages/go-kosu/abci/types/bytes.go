package types

import (
	"encoding/hex"
	"errors"
	"strings"
)

var (
	// ErrBytesDecode returned when invalid bytes string is supplied
	ErrBytesDecode = errors.New("invalid hex string supplied")
	// ErrBytesNoPrefix returned when an input string does not have 0x prefix
	ErrBytesNoPrefix = errors.New("missing '0x' prefix on hex string")
)

// HexBytes represents a generic byte array, represented as a 0x-prefixed string
type HexBytes []byte

// NewHexBytesFromString allows manual construction of hex bytes, from a prefixed or un-prefixed hex string
func NewHexBytesFromString(input string) (*HexBytes, error) {
	var parsed string
	if strings.HasPrefix(input, "0x") {
		parsed = input[2:]
	} else {
		parsed = input
	}

	bytes, err := hex.DecodeString(parsed)
	if err != nil {
		return nil, err
	}

	hexBytes := HexBytes(bytes)
	return &hexBytes, nil
}

// Bytes returns the underlying bytes
func (hb HexBytes) Bytes() []byte {
	return hb
}

// String implements the stringer interface (returns 0x-prefixed string)
func (hb HexBytes) String() string {
	return "0x" + hex.EncodeToString(hb)
}

// UnmarshalJSON implements the json.Unmarshaler interface
func (hb *HexBytes) UnmarshalJSON(data []byte) error {
	if len(data) < 2 || data[0] != '"' || data[len(data)-1] != '"' {
		return ErrBytesDecode
	}
	if data[1] != '0' || data[2] != 'x' {
		return ErrBytesNoPrefix
	}

	bytes, err := hex.DecodeString(string(data)[3 : len(data)-1])
	if err != nil {
		return err
	}

	*hb = bytes
	return nil
}
