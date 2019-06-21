package types

import (
	"encoding/json"
)

type makerValues interface{}

type Values map[string]interface{}

type Order struct {
	Maker           Address   `json:"maker"`
	SubContract     Address   `json:"subContract"`
	Arguments       Arguments `json:"arguments"`
	MakerValues     Values    `json:"makerValues"`
	MakerSignature  Signature `json:"makerSignature"`
	PosterSignature Signature `json:"posterSignature"`
}

func (o *Order) String() (order string) {
	return o.Maker.String()
}

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
