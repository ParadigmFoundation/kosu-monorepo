package store

import (
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"math/big"
	"strings"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/crypto"
)

var (
	// ErrOrderParse returned when bad JSON orders are provided to constructor
	ErrOrderParse = errors.New("failed to parse JSON order")
	// ErrOrderSerialize returned when unable to serialize an Order object
	ErrOrderSerialize = errors.New("failed to serialize order")
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
func NewOrder(input string) (*Order, error) {
	order := &Order{}
	dec := json.NewDecoder(strings.NewReader(input))
	if err := dec.Decode(order); err != nil {
		return nil, err
	}
	return order, nil
}

// NewOrderFromProto creates a new Kosu Order object from a proto message
func NewOrderFromProto(order *types.TransactionOrder) (*Order, error) {
	marshalled, err := json.Marshal(order)
	if err != nil {
		return nil, err
	}

	orderJSON := string(marshalled)
	return NewOrder(orderJSON)
}

// PosterHex generates the hash used to sign the order
func (o *Order) PosterHex() ([]byte, error) {
	orderBytes, err := o.Serialize()
	if err != nil {
		return nil, err
	}

	posterHex := crypto.Keccak256(orderBytes)
	return posterHex, nil
}

// Serialize generates a byte array of the MakerValues as expected by Kosu contract system
func (o *Order) Serialize() ([]byte, error) {
	orderBytes := []byte{}
	for _, m := range o.Arguments.Maker {
		switch m.DataType {
		case "address":
			// strip '0x' prefix
			bytes, err := hex.DecodeString(o.MakerValues[m.Name].(string)[2:])
			if err != nil {
				return nil, err
			}
			orderBytes = append(orderBytes, bytes...)
		case "uint":
			bigInt := big.NewInt(0)
			stringVal := o.MakerValues[m.Name].(string)
			if _, ok := bigInt.SetString(stringVal, 10); !ok {
				return nil, ErrOrderSerialize
			}
			// pad as a 256 bit integer, as EVM does
			slice := abi.U256(bigInt)
			orderBytes = append(orderBytes, slice...)
		case "int":
			bigInt := big.NewInt(0)
			stringVal := o.MakerValues[m.Name].(string)
			if _, ok := bigInt.SetString(stringVal, 10); !ok {
				return nil, ErrOrderSerialize
			}
			// pad as a 256 bit integer, as EVM does
			slice := abi.U256(bigInt)
			orderBytes = append(orderBytes, slice...)
		case "bytes":
			// strip '0x' prefix
			bytes, err := hex.DecodeString(o.MakerValues[m.Name].(string)[2:])
			if err != nil {
				return nil, ErrOrderSerialize
			}
			orderBytes = append(orderBytes, bytes...)
		case "signature":
			// strip '0x' prefix
			bytes, err := hex.DecodeString(o.MakerValues[m.Name].(string)[2:])
			if err != nil {
				return nil, ErrOrderSerialize
			}
			orderBytes = append(orderBytes, bytes...)
		}
	}
	return orderBytes, nil
}

// RecoverPoster returns the address used to sign the Kosu order as a poster
func (o *Order) RecoverPoster() (Address, error) {
	hash, err := o.PosterHex()
	if err != nil {
		return Address{}, err
	}

	poster, err := o.PosterSignature.RecoverSigner(hash)
	if err != nil {
		return Address{}, err
	}

	return poster, nil
}

// String implements Stringer to represent Order as a string
func (o *Order) String() string {
	return fmt.Sprintf("Order{%v}", "@todo")
}

// Arguments defines the data types required for maker and taker values
type Arguments struct {
	Maker []Argument `json:"maker"`
	Taker []Argument `json:"taker"`
}

// Argument defines a maker or taker value with parameter name and data type
type Argument struct {
	DataType string `json:"datatype"`
	Name     string `json:"name"`
}

// Values represents an un-typed key-value map for the maker/taker values
type Values map[string]interface{}
