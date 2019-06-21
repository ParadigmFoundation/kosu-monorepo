package types

import (
	"encoding/hex"
	"errors"
)

type Signature [65]byte

func NewSignatureFromString(input string) (signature Signature, e error) {
	decoded, err := hex.DecodeString(input[2:])
	if err != nil {
		e = errors.New("Unable to decode provided string")
		return
	}

	if len(decoded) != 65 {
		e = errors.New("Invalid length for signature")
		return
	}

	for i := 0; i < 65; i++ {
		signature[i] = decoded[i]
	}
	return
}

func (s *Signature) Bytes() (bytes []byte) {
	bytes = make([]byte, 65)
	for i := 0; i < 65; i++ {
		bytes[i] = s[i]
	}
	return
}

func (s *Signature) String() (signature string) {
	decoded := hex.EncodeToString(s.Bytes())
	signature = "0x" + decoded
	return
}

func (s *Signature) UnmarshalJSON(bytes []byte) error {
	encoded, err := hex.DecodeString(string(bytes)[3 : len(bytes)-1])
	if err != nil {
		return err
	}
	if len(encoded) != 65 {
		return errors.New("Invalid length for address")
	}
	for i := 0; i < 65; i++ {
		s[i] = encoded[i]
	}
	return nil
}
