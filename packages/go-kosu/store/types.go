package store

import "go-kosu/abci/types"

type TransactionWitness struct {
	types.TransactionWitness
	Confirmations uint32
}

type XPoster struct {
	types.Poster
}
