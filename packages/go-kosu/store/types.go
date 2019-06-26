package store

import "go-kosu/abci/types"

// TransactionWitness extends the TransactionWitness with Confirmations
type TransactionWitness struct {
	types.TransactionWitness
	Confirmations uint32
}
