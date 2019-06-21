package types

import (
	"encoding/hex"
	"errors"
)

type Address [20]byte

func NewAddressFromString(input string) (address Address, e error) {
	decoded, err := hex.DecodeString(input[2:])
	if err != nil {
		e = errors.New("Unable to decode provided string")
		return
	}

	if len(decoded) != 20 {
		e = errors.New("Invalid length for address")
		return
	}

	for i := 0; i < 20; i++ {
		address[i] = decoded[i]
	}
	return
}

func (a *Address) Bytes() (bytes []byte) {
	bytes = make([]byte, 20)
	for i := 0; i < 20; i++ {
		bytes[i] = a[i]
	}
	return
}

func (a *Address) String() (address string) {
	decoded := hex.EncodeToString(a.Bytes())
	address = "0x" + decoded
	return
}

func (a *Address) UnmarshalJSON(bytes []byte) error {
	encoded, err := hex.DecodeString(string(bytes)[3 : len(bytes)-1])
	if err != nil {
		return err
	}
	if len(encoded) != 20 {
		return errors.New("Invalid length for address")
	}
	for i := 0; i < 20; i++ {
		a[i] = encoded[i]
	}
	return nil
}
