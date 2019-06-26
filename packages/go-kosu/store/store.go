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

	chainKey   *sdk.KVStoreKey
	witnessKey *sdk.KVStoreKey
	posterKey  *sdk.KVStoreKey
}

// NewStore returns a new store
func NewStore(db db.DB, cdc Codec) *Store {
	s := &Store{codec: cdc,
		cms: store.NewCommitMultiStore(db),

		chainKey:   sdk.NewKVStoreKey("chain"),
		witnessKey: sdk.NewKVStoreKey("witness"),
		posterKey:  sdk.NewKVStoreKey("poster"),
	}

	s.cms.MountStoreWithDB(s.chainKey, sdk.StoreTypeIAVL, nil)
	s.cms.MountStoreWithDB(s.witnessKey, sdk.StoreTypeIAVL, nil)
	s.cms.MountStoreWithDB(s.posterKey, sdk.StoreTypeIAVL, nil)

	if err := s.cms.LoadLatestVersion(); err != nil {
		panic(err)
	}

	// TODO: this should comes from genesis block
	if s.cms.LastCommitID().IsZero() {
		s.SetConsensusParams(types.ConsensusParams{
			PeriodLength: 10,
		})
	}

	return s
}

// Commit persists the state to disk
func (s *Store) Commit() store.CommitID { return s.cms.Commit() }

// LastCommitID returns the last commit info
func (s *Store) LastCommitID() store.CommitID { return s.cms.LastCommitID() }

// Set is a generic state setter
func (s *Store) Set(key string, kv sdk.KVStore, v interface{}) {
	buf, err := s.codec.Encode(v)
	if err != nil {
		panic(err)
	}

	if buf == nil {
		return
	}

	kv.Set([]byte(key), buf)
}

// Get is a generic state getter
func (s *Store) Get(key string, kv sdk.KVStore, v interface{}) {
	buf := kv.Get([]byte(key))
	if buf != nil {
		if err := s.codec.Decode(buf, v); err != nil {
			panic(err)
		}
	}
}

// Delete is a generic state deleter
func (s *Store) Delete(key string, kv sdk.KVStore) {
	kv.Delete([]byte(key))
}

// SetRoundInfo sets the RoundInfo
func (s *Store) SetRoundInfo(v types.RoundInfo) {
	s.Set("roundinfo", s.cms.GetCommitKVStore(s.chainKey), &v)
}

// RoundInfo gets the RoundInfo
func (s *Store) RoundInfo() types.RoundInfo {
	v := types.RoundInfo{}
	s.Get("roundinfo", s.cms.GetCommitKVStore(s.chainKey), &v)
	return v
}

// SetConsensusParams sets the ConsensusParams
func (s *Store) SetConsensusParams(v types.ConsensusParams) {
	s.Set("consensusparams", s.cms.GetCommitKVStore(s.chainKey), &v)
}

// ConsensusParams gets the ConsensusParams
func (s *Store) ConsensusParams() types.ConsensusParams {
	v := types.ConsensusParams{}
	s.Get("consensusparams", s.cms.GetCommitKVStore(s.chainKey), &v)
	return v
}

// SetLastEvent sets the LastEvent
func (s *Store) SetLastEvent(v uint64) {
	s.Set("lastevent", s.cms.GetCommitKVStore(s.chainKey), v)
}

// LastEvent gets the LastEvent
func (s *Store) LastEvent() uint64 {
	var v uint64
	s.Get("lastevent", s.cms.GetCommitKVStore(s.chainKey), &v)
	return v
}

// WitnessTxExists checks if a given WitnessTx has been persisted
func (s *Store) WitnessTxExists(id []byte) bool {
	return s.cms.GetCommitKVStore(s.witnessKey).Has([]byte("proto:" + string(id)))
}

// WitnessTx gets a WitnessTx
func (s *Store) WitnessTx(id []byte) TransactionWitness {
	v := TransactionWitness{}
	s.Get("proto:"+string(id), s.cms.GetCommitKVStore(s.witnessKey), &v)
	s.Get("confs:"+string(id), s.cms.GetCommitKVStore(s.witnessKey), &v.Confirmations)
	return v
}

// SetWitnessTx sets a WitnessTx
func (s *Store) SetWitnessTx(tx TransactionWitness) {
	s.Set("proto:"+string(tx.Id), s.cms.GetCommitKVStore(s.witnessKey), &tx)
	s.Set("confs:"+string(tx.Id), s.cms.GetCommitKVStore(s.witnessKey), tx.Confirmations)
}

// IncWitnessTxConfirmations increases the confirmation by 1
func (s *Store) IncWitnessTxConfirmations(id []byte) {
	tx := s.WitnessTx(id)
	s.Set("confs:"+string(tx.Id), s.cms.GetCommitKVStore(s.witnessKey), tx.Confirmations+1)
}

// Poster gets a Poster
func (s *Store) Poster(addr string) *types.Poster {
	var v types.Poster
	s.Get(addr, s.cms.GetCommitKVStore(s.posterKey), &v)
	return &v
}

// SetPoster sets a Poster
func (s *Store) SetPoster(addr string, v types.Poster) {
	s.Set(addr, s.cms.GetCommitKVStore(s.posterKey), &v)
}

// DeletePoster deletes a poster
func (s *Store) DeletePoster(addr string) {
	s.Delete(addr, s.cms.GetCommitKVStore(s.posterKey))
}
