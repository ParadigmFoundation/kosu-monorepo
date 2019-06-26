package store

import (
	"go-kosu/abci/types"
	"math"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/tendermint/tendermint/libs/db"
)

func TestCosmosStoreSetGet(t *testing.T) {
	for _, cdc := range []Codec{
		&ProtoCodec{},
		&GobCodec{},
	} {
		t.Run(cdc.String(), func(t *testing.T) {
			testCosmosStoreSetGet(t, cdc)
		})
	}
}

func testCosmosStoreSetGet(t *testing.T, cdc Codec) {
	//	db := db.NewDebugDB("DB", db.NewMemDB())
	db := db.NewMemDB()
	s1 := NewStore(db, cdc)

	info := types.RoundInfo{Number: 1, StartsAt: 10, EndsAt: 100, Limit: 1000}
	s1.SetRoundInfo(info)

	params := types.ConsensusParams{FinalityThreshold: 1, PeriodLimit: 10, PeriodLength: 100, MaxOrderBytes: 1000}
	s1.SetConsensusParams(params)

	lastEvent := uint64(math.MaxUint64)
	s1.SetLastEvent(lastEvent)

	witnessTx := TransactionWitness{
		TransactionWitness: types.TransactionWitness{
			Address: "0xaaaa",
			Amount:  types.NewBigIntFromInt(10),
		},
		Confirmations: 99,
	}
	witnessTx.Id = witnessTx.Hash()
	s1.SetWitnessTx(witnessTx)
	s1.IncWitnessTxConfirmations(witnessTx.Id)

	commit1 := s1.Commit()

	s2 := NewStore(db, cdc)
	assert.Equal(t, info, s2.RoundInfo())
	assert.Equal(t, params, s2.ConsensusParams())
	assert.Equal(t, lastEvent, s2.LastEvent())
	assert.True(t, s2.WitnessTxExists(witnessTx.Id))
	assert.Equal(t, witnessTx.Confirmations+1, s2.WitnessTx(witnessTx.Id).Confirmations)
	assert.False(t, s2.WitnessTxExists([]byte("xxx")))

	commit2 := s2.LastCommitID()
	assert.Equal(t, commit1, commit2)
}
