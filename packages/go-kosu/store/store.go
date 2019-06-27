package store

import (
	"github.com/cosmos/cosmos-sdk/store"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tendermint/tendermint/libs/db"

	"go-kosu/abci/types"
)

// Store stores the application state
type Store struct {
	codec Codec

	cms store.CommitMultiStore

	chainKey     *sdk.KVStoreKey
	witnessKey   *sdk.KVStoreKey
	posterKey    *sdk.KVStoreKey
	validatorKey *sdk.KVStoreKey
}

// NewStore returns a new store
func NewStore(db db.DB, cdc Codec) *Store {
	s := &Store{codec: cdc,
		cms: store.NewCommitMultiStore(db),

		chainKey:     sdk.NewKVStoreKey("chain"),
		witnessKey:   sdk.NewKVStoreKey("witness"),
		posterKey:    sdk.NewKVStoreKey("poster"),
		validatorKey: sdk.NewKVStoreKey("validator"),
	}

	s.cms.MountStoreWithDB(s.chainKey, sdk.StoreTypeIAVL, nil)
	s.cms.MountStoreWithDB(s.witnessKey, sdk.StoreTypeIAVL, nil)
	s.cms.MountStoreWithDB(s.posterKey, sdk.StoreTypeIAVL, nil)
	s.cms.MountStoreWithDB(s.validatorKey, sdk.StoreTypeIAVL, nil)

	if err := s.cms.LoadLatestVersion(); err != nil {
		panic(err)
	}

	// TODO: this should comes from genesis block
	if s.cms.LastCommitID().IsZero() {
		s.SetConsensusParams(types.ConsensusParams{
			PeriodLength: 10,
		})

		s.SetRoundInfo(types.RoundInfo{
			Number: 0,
			StartsAt: 0,
			EndsAt: 0,
			Limit: 0,
		})
	}

	return s
}

// Set is a generic state setter
func (s *Store) Set(key string, kv *sdk.KVStoreKey, v interface{}) {
	buf, err := s.codec.Encode(v)
	if err != nil {
		panic(err)
	}

	if buf == nil {
		return
	}

	s.cms.GetCommitKVStore(kv).Set([]byte(key), buf)
}

// Get is a generic state getter
func (s *Store) Get(key string, kv *sdk.KVStoreKey, v interface{}) {
	buf := s.cms.GetCommitKVStore(kv).Get([]byte(key))
	if buf != nil {
		if err := s.codec.Decode(buf, v); err != nil {
			panic(err)
		}
	}
}

// Delete is a generic state deleter
func (s *Store) Delete(key string, kv *sdk.KVStoreKey) {
	s.cms.GetCommitKVStore(kv).Delete([]byte(key))
}

// Has checks if a key exists. Panics on nil key.
func (s *Store) Has(key string, kv *sdk.KVStoreKey) bool {
	return s.cms.GetCommitKVStore(kv).Has([]byte(key))
}

// All iterates over all the elements of a given store
func (s *Store) All(kv *sdk.KVStoreKey, fn func(key string, buf []byte)) {
	//	it := kv.Iterator([]byte(start), []byte(end))
	it := s.cms.GetCommitKVStore(kv).Iterator(nil, nil)
	for it.Valid() {
		key := it.Key()
		val := it.Value()
		fn(string(key), val)

		it.Next()
	}
}

// Commit persists the state to disk
func (s *Store) Commit() store.CommitID { return s.cms.Commit() }

// LastCommitID returns the last commit info
func (s *Store) LastCommitID() store.CommitID { return s.cms.LastCommitID() }

// SetRoundInfo sets the RoundInfo
func (s *Store) SetRoundInfo(v types.RoundInfo) {
	s.Set("roundinfo", s.chainKey, &v)
}

// RoundInfo gets the RoundInfo
func (s *Store) RoundInfo() types.RoundInfo {
	v := types.RoundInfo{}
	s.Get("roundinfo", s.chainKey, &v)
	return v
}

// SetConsensusParams sets the ConsensusParams
func (s *Store) SetConsensusParams(v types.ConsensusParams) {
	s.Set("consensusparams", s.chainKey, &v)
}

// ConsensusParams gets the ConsensusParams
func (s *Store) ConsensusParams() types.ConsensusParams {
	v := types.ConsensusParams{}
	s.Get("consensusparams", s.chainKey, &v)
	return v
}

// SetLastEvent sets the LastEvent
func (s *Store) SetLastEvent(v uint64) {
	s.Set("lastevent", s.chainKey, v)
}

// LastEvent gets the LastEvent
func (s *Store) LastEvent() uint64 {
	var v uint64
	s.Get("lastevent", s.chainKey, &v)
	return v
}

// WitnessTxExists checks if a given WitnessTx has been persisted
func (s *Store) WitnessTxExists(id []byte) bool {
	return s.Has("proto:"+string(id), s.witnessKey)
}

// WitnessTx gets a WitnessTx
func (s *Store) WitnessTx(id []byte) TransactionWitness {
	v := TransactionWitness{}
	s.Get("proto:"+string(id), s.witnessKey, &v)
	s.Get("confs:"+string(id), s.witnessKey, &v.Confirmations)
	return v
}

// SetWitnessTx sets a WitnessTx
func (s *Store) SetWitnessTx(tx TransactionWitness) {
	s.Set("proto:"+string(tx.Id), s.witnessKey, &tx)
	s.Set("confs:"+string(tx.Id), s.witnessKey, tx.Confirmations)
}

// IncWitnessTxConfirmations increases the confirmation by 1
func (s *Store) IncWitnessTxConfirmations(id []byte) {
	tx := s.WitnessTx(id)
	s.Set("confs:"+string(tx.Id), s.witnessKey, tx.Confirmations+1)
}

// Poster gets a Poster
func (s *Store) Poster(addr string) *types.Poster {
	var v types.Poster
	s.Get(addr, s.posterKey, &v)
	return &v
}

// SetPoster sets a Poster
func (s *Store) SetPoster(addr string, v types.Poster) {
	s.Set(addr, s.posterKey, &v)
}

// DeletePoster deletes a poster
func (s *Store) DeletePoster(addr string) {
	s.Delete(addr, s.posterKey)
}

// ValidatorExists checks if a given WitnessTx has been persisted
func (s *Store) ValidatorExists(addr string) bool {
	return s.Has(addr, s.validatorKey)
}

// Validator gets a validator
func (s *Store) Validator(id string) *types.Validator {
	v := &types.Validator{}
	s.Get(id, s.validatorKey, v)
	return v
}

// SetValidator sets a validator
func (s *Store) SetValidator(id string, v *types.Validator) {
	s.Set(id, s.validatorKey, v)
}

// IterateValidators executes fn for each validator
func (s *Store) IterateValidators(fn func(id string, v *types.Validator)) {
	s.All(s.validatorKey, func(key string, val []byte) {
		v := &types.Validator{}
		if err := s.codec.Decode(val, v); err != nil {
			panic(err)
		}

		fn(key, v)
	})
}
