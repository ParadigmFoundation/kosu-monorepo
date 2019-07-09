package cosmos

import (
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/db"

	cosmos "github.com/cosmos/cosmos-sdk/store"
	"github.com/cosmos/cosmos-sdk/store/rootmulti"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"go-kosu/abci/types"
	"go-kosu/store"
)

// Store stores the application state
type Store struct {
	codec Codec

	cms *rootmulti.Store

	chainKey     *sdk.KVStoreKey
	witnessKey   *sdk.KVStoreKey
	posterKey    *sdk.KVStoreKey
	validatorKey *sdk.KVStoreKey
}

// NewStore returns a new store
func NewStore(db db.DB, cdc Codec) *Store {
	s := &Store{codec: cdc,
		cms: rootmulti.NewStore(db),

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

// Get is a generic state getter, it returns false if the key does not exists
func (s *Store) Get(key string, kv *sdk.KVStoreKey, v interface{}) bool {
	buf := s.cms.GetCommitKVStore(kv).Get([]byte(key))
	if buf != nil {
		if err := s.codec.Decode(buf, v); err != nil {
			panic(err)
		}
		return true
	}
	return false
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
func (s *Store) Commit() cosmos.CommitID { return s.cms.Commit() }

// LastCommitID returns the last commit info
func (s *Store) LastCommitID() cosmos.CommitID { return s.cms.LastCommitID() }

// Query wrap the rootmulti.Query method
func (s *Store) Query(req abci.RequestQuery) abci.ResponseQuery {
	return s.cms.Query(req)
}

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
func (s *Store) WitnessTx(id []byte) store.TransactionWitness {
	v := store.TransactionWitness{}
	s.Get("proto:"+string(id), s.witnessKey, &v)
	s.Get("confs:"+string(id), s.witnessKey, &v.Confirmations)
	return v
}

// SetWitnessTx sets a WitnessTx
func (s *Store) SetWitnessTx(tx store.TransactionWitness) {
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
	if ok := s.Get(addr, s.posterKey, &v); !ok {
		return nil
	}
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
	if ok := s.Get(id, s.validatorKey, v); !ok {
		return nil
	}
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

// IteratePosters executes fn for each poster
func (s *Store) IteratePosters(fn func(address string, p *types.Poster)) {
	s.All(s.posterKey, func(key string, val []byte) {
		p := &types.Poster{}
		if err := s.codec.Decode(val, p); err != nil {
			panic(err)
		}

		fn(key, p)
	})
}
