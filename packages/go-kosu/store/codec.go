package store

import (
	"bytes"
	"encoding/gob"

	"github.com/golang/protobuf/proto"
)

// Codec defines a codec interface
type Codec interface {
	Encode(interface{}) ([]byte, error)
	Decode([]byte, interface{}) error
	String() string
}

// GobCodec implements a Codec using encoding/gob
type GobCodec struct{}

func (c *GobCodec) String() string { return "gob" }

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

type ProtoCodec struct{}

func (c *ProtoCodec) String() string { return "proto" }

func (c *ProtoCodec) Encode(s interface{}) ([]byte, error) {
	if s == nil {
		return nil, nil
	}

	buf := proto.NewBuffer(nil)
	buf.SetDeterministic(true)

	var err error
	switch t := s.(type) {
	case uint64:
		err = buf.EncodeFixed64(t)
	case int:
		err = buf.EncodeFixed32(uint64(t))
	case uint32:
		err = buf.EncodeFixed32(uint64(t))
	default:
		err = buf.Marshal(t.(proto.Message))
	}

	if err != nil {
		panic(err)
	}

	return buf.Bytes(), err
}

func (c *ProtoCodec) Decode(bs []byte, s interface{}) error {
	buf := proto.NewBuffer(bs)
	buf.SetDeterministic(true)

	switch t := s.(type) {
	case *uint64:
		l, err := buf.DecodeFixed64()
		if err != nil {
			return err
		}
		*t = l
		return nil
	case *int:
		l, err := buf.DecodeFixed32()
		if err != nil {
			return err
		}
		*t = int(l)
		return nil
	case *uint32:
		l, err := buf.DecodeFixed32()
		if err != nil {
			return err
		}
		*t = uint32(l)
		return nil
	}
	msg := s.(proto.Message)
	return buf.Unmarshal(msg)
}
