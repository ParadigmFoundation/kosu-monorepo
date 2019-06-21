package types

import (
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"math/big"

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
	b := []byte(input)
	if err := json.Unmarshal(b, &order); err != nil {
		e = err
		return
	}
	return
}

// PosterHex generates the hash used to sign the order
func (o *Order) PosterHex() (posterHex []byte, e error) {
	orderBytes, err := o.Serialize()
	if err != nil {
		e = errors.New("Failed to serialize order")
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
			bytes, err := hex.DecodeString(o.MakerValues[m.Name].(string)[2:])
			if err != nil {
				return orderBytes, err
			}
			orderBytes = append(orderBytes, bytes...)
		case "uint":
			bigFloat := big.NewFloat(o.MakerValues[m.Name].(float64))
			intVal, _ := bigFloat.Int64()
			slice := abi.U256(big.NewInt(intVal))
			orderBytes = append(orderBytes, slice...)
		case "signature":
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
