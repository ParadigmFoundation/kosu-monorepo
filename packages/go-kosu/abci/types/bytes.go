package types

import (
	"encoding/hex"
	"errors"
	"fmt"
	"strconv"
	"strings"
)

var (
	// ErrInvalidLength represents an error for an invalid length
	ErrInvalidLength = errors.New("invalid length for input")
)

// HexBytes represents a generic byte array, represented as a 0x-prefixed string
type HexBytes []byte

// NewHexBytesFromString returns a new HexBytes provided string optionally prefixed with `0x`
func NewHexBytesFromString(s string) (HexBytes, error) {
	return hex.DecodeString(strings.TrimPrefix(s, "0x"))
}

func (b HexBytes) String() string { return "0x" + hex.EncodeToString(b) }

// UnmarshalJSON implements the json.Unmarshaler interface
func (b HexBytes) UnmarshalJSON(bytes []byte) error {
	str, err := strconv.Unquote(string(bytes))
	if err != nil {
		return err
	}

	h, err := NewHexBytesFromString(str)
	if err != nil {
		return err
	}

	copy(b, h)
	return nil
}

// MarshalJSON implements the json.Marshaler interface
func (b HexBytes) MarshalJSON() ([]byte, error) {
	return []byte(fmt.Sprintf(`"%s"`, b.String())), nil
}
