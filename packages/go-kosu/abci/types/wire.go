package types

import (
	"bytes"
	"encoding/base64"

	proto "github.com/golang/protobuf/proto"
)

// WrapTx return a Transaction based on the Data transaction
func WrapTx(data interface{}) *Transaction {
	tx := &Transaction{}

	// Build the tx to be sent based on the input data type
	switch t := data.(type) {
	case *TransactionRebalance:
		tx.Data = &Transaction_Rebalance{Rebalance: t}
	case *TransactionWitness:
		tx.Data = &Transaction_Witness{Witness: t}
	case *TransactionOrder:
		tx.Data = &Transaction_Order{Order: t}
	}

	return tx
}

// EncodeTx encodes a Transaction
// Encoding process consist in base64(proto.Marshal())
func EncodeTx(tx proto.Message) ([]byte, error) {
	// Encode to binary
	buf := proto.NewBuffer(nil)
	buf.SetDeterministic(true)
	if err := buf.Marshal(tx); err != nil {
		return nil, err
	}

	w := bytes.NewBuffer(nil)
	enc := base64.NewEncoder(base64.StdEncoding, w)
	if _, err := enc.Write(buf.Bytes()); err != nil {
		return nil, err
	}

	if err := enc.Close(); err != nil {
		return nil, err
	}

	return w.Bytes(), nil
}

// DecodeTx decodes a Transaction
func DecodeTx(in []byte, tx proto.Message) error {
	buf, err := base64.StdEncoding.DecodeString(string(in))
	if err != nil {
		return err
	}

	return proto.Unmarshal(buf, tx)
}
