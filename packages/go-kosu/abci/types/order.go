package types

import (
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"math/big"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/crypto"
)

// Order represents a Kosu order object for use with a SubContract
type Order struct {
	Maker           Address   `json:"maker"`
	SubContract     Address   `json:"subContract"`
	Arguments       Arguments `json:"arguments"`
	MakerValues     Values    `json:"makerValues"`
	MakerSignature  Signature `json:"makerSignature"`
	PosterSignature Signature `json:"posterSignature"`
}

// NewOrder creates a new Kosu Order object from a JSON string
func NewOrder(input string) (order *Order, e error) {
	dec := json.NewDecoder(strings.NewReader(input))
	dec.UseNumber()
	if err := dec.Decode(&order); err != nil {
		e = err
		return
	}
	return
}

// PosterHex generates the hash used to sign the order
func (o *Order) PosterHex() (posterHex []byte, e error) {
	orderBytes, err := o.Serialize()
	if err != nil {
		e = errors.New("failed to serialize order")
		return
	}

	posterHex = crypto.Keccak256(orderBytes)
	return
}

// Serialize generates a byte array of the MakerValues as expected by Kosu contract system
func (o *Order) Serialize() (orderBytes []byte, e error) {
	for _, m := range o.Arguments.Maker {
		switch m.DataType {
		case "address":
			// strip '0x' prefix
			bytes, err := hex.DecodeString(o.MakerValues[m.Name].(string)[2:])
			if err != nil {
				return orderBytes, err
			}
			orderBytes = append(orderBytes, bytes...)
		case "uint":
			bigInt := big.NewInt(0)
			stringVal := o.MakerValues[m.Name].(json.Number).String()
			if _, ok := bigInt.SetString(stringVal, 10); !ok {
				e = errors.New("unable to parse uint value")
				return
			}
			// pad as a 256 bit integer, as EVM does
			slice := abi.U256(bigInt)
			orderBytes = append(orderBytes, slice...)
		case "signature":
			// strip '0x' prefix
			slice := []byte(o.MakerValues[m.Name].(string)[2:])
			orderBytes = append(orderBytes, slice...)
		}
	}
	return
}

// String implements Stringer to represent Order as a string
func (o *Order) String() (order string) {
	return fmt.Sprintf("<%v>", "@todo")
}

// Arguments defines the data types required for maker and taker values
type Arguments struct {
	Maker []Argument `json:"maker"`
	Taker []Argument `json:"taler"`
}

// Argument defines a maker or taker value with parameter name and data type
type Argument struct {
	DataType string `json:"dataType"`
	Name     string `json:"name"`
}

type Values map[string]interface{}
