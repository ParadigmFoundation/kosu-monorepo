package types

import (
	"encoding/json"
	"fmt"
)

type Values map[string]interface{}

func (v *Values) String() (values string) {
	return "< ... >"
}

type Order struct {
	Maker           Address   `json:"maker"`
	SubContract     Address   `json:"subContract"`
	Arguments       Arguments `json:"arguments"`
	MakerValues     Values    `json:"makerValues"`
	MakerSignature  Signature `json:"makerSignature"`
	PosterSignature Signature `json:"posterSignature"`
}

func (o *Order) String() (order string) {
	return fmt.Sprintf("<%v>", o.MakerValues)
}

func (o *Order) PosterHex() (hex [32]byte, e error) {
	return
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

type Arguments struct {
	Maker []Argument `json:"maker"`
	Taker []Argument `json:"taler"`
}

type Argument struct {
	DataType string `json:"dataType"`
	Name     string `json:"name"`
}
