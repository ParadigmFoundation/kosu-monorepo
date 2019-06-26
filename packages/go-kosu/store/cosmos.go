package store

import (
	"github.com/cosmos/cosmos-sdk/store"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tendermint/tendermint/libs/db"

	"go-kosu/abci/types"
)

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

func (s *Store) Commit() store.CommitID       { return s.cms.Commit() }
func (s *Store) LastCommitID() store.CommitID { return s.cms.LastCommitID() }

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

func (s *Store) Get(key string, kv sdk.KVStore, v interface{}) {
	buf := kv.Get([]byte(key))
	if buf != nil {
		s.codec.Decode(buf, v)
	}
}

func (s *Store) Delete(key string, kv sdk.KVStore) {
	kv.Delete([]byte(key))
}

func (s *Store) SetRoundInfo(v types.RoundInfo) {
	s.Set("roundinfo", s.cms.GetCommitKVStore(s.chainKey), &v)
}

func (s *Store) RoundInfo() types.RoundInfo {
	v := types.RoundInfo{}
	s.Get("roundinfo", s.cms.GetCommitKVStore(s.chainKey), &v)
	return v
}

func (s *Store) SetConsensusParams(v types.ConsensusParams) {
	s.Set("consensusparams", s.cms.GetCommitKVStore(s.chainKey), &v)
}

func (s *Store) ConsensusParams() types.ConsensusParams {
	v := types.ConsensusParams{}
	s.Get("consensusparams", s.cms.GetCommitKVStore(s.chainKey), &v)
	return v
}

func (s *Store) SetLastEvent(v uint64) {
	s.Set("lastevent", s.cms.GetCommitKVStore(s.chainKey), v)
}

func (s *Store) LastEvent() uint64 {
	var v uint64
	s.Get("lastevent", s.cms.GetCommitKVStore(s.chainKey), &v)
	return v
}

func (s *Store) WitnessTxExists(id []byte) bool {
	return s.cms.GetCommitKVStore(s.witnessKey).Has([]byte("proto:" + string(id)))
}

func (s *Store) WitnessTx(id []byte) TransactionWitness {
	v := TransactionWitness{}
	s.Get("proto:"+string(id), s.cms.GetCommitKVStore(s.witnessKey), &v)
	s.Get("confs:"+string(id), s.cms.GetCommitKVStore(s.witnessKey), &v.Confirmations)
	return v
}

func (s *Store) SetWitnessTx(tx TransactionWitness) {
	s.Set("proto:"+string(tx.Id), s.cms.GetCommitKVStore(s.witnessKey), &tx)
	s.Set("confs:"+string(tx.Id), s.cms.GetCommitKVStore(s.witnessKey), tx.Confirmations)
}

func (s *Store) IncWitnessTxConfirmations(id []byte) {
	tx := s.WitnessTx(id)
	s.Set("confs:"+string(tx.Id), s.cms.GetCommitKVStore(s.witnessKey), tx.Confirmations+1)
}

func (s *Store) Poster(addr string) *XPoster {
	var v XPoster
	s.Get(addr, s.cms.GetCommitKVStore(s.posterKey), &v)
	return &v
}

func (s *Store) SetPoster(addr string, v XPoster) {
	s.Set(addr, s.cms.GetCommitKVStore(s.posterKey), &v)
}

func (s *Store) DeletePoster(addr string) {
	s.Delete(addr, s.cms.GetCommitKVStore(s.posterKey))
}
