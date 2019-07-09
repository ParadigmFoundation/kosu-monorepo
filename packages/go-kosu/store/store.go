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
	IncWitnessTxConfirmations([]byte)

	Poster(string) *types.Poster
	SetPoster(string, types.Poster)
	DeletePoster(string)
	IteratePosters(func(string, *types.Poster))

	ValidatorExists(string) bool
	Validator(string) *types.Validator
	SetValidator(string, *types.Validator)
	IterateValidators(func(string, *types.Validator))
}
