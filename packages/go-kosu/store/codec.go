package store

import (
	"bytes"
	"encoding/gob"
)

// Codec defines a codec interface
type Codec interface {
	Encode(interface{}) ([]byte, error)
	Decode([]byte, interface{}) error
}

// GobCodec implements a Codec using encoding/gob
type GobCodec struct{}

// Encode uses gob.NewEncoder to encode.
func (c *GobCodec) Encode(s interface{}) ([]byte, error) {
	w := &bytes.Buffer{}
	if err := gob.NewEncoder(w).Encode(s); err != nil {
		return nil, err
	}
	return w.Bytes(), nil
}

// Decode uses gob.NewDecoder to decode.
func (c *GobCodec) Decode(buf []byte, s interface{}) error {
	r := bytes.NewReader(buf)
	return gob.NewDecoder(r).Decode(s)
}
