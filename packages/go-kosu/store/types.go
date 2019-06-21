package store

import "go-kosu/abci/types"

type TransactionWitness struct {
	types.TransactionWitness
	Confirmations int
}
