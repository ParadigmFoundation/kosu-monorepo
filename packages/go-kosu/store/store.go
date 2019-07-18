package store

import (
	abci "github.com/tendermint/tendermint/abci/types"

	"github.com/cosmos/cosmos-sdk/store"

	"go-kosu/abci/types"
)

// Store stores the application state
type Store interface {
	Commit() store.CommitID
	LastCommitID() store.CommitID
	Query(abci.RequestQuery) abci.ResponseQuery

	RoundInfo() types.RoundInfo
	SetRoundInfo(types.RoundInfo)

	ConsensusParams() types.ConsensusParams
	SetConsensusParams(v types.ConsensusParams)

	LastEvent() uint64
	SetLastEvent(uint64)

	WitnessTxExists([]byte) bool
	WitnessTx([]byte) TransactionWitness
	SetWitnessTx(TransactionWitness)

	Poster(string) *types.Poster
	SetPoster(string, types.Poster)
	DeletePoster(string)
	IteratePosters(func(string, *types.Poster))

	ValidatorExists([]byte) bool
	Validator([]byte) *types.Validator
	SetValidator([]byte, *types.Validator)
	DeleteValidator([]byte)
	IterateValidators(func([]byte, *types.Validator))
}
