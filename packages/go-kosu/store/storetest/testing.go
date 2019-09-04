package storetest

import (
	"math"
	"testing"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/store"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// Factory is a function that returns a new store and a cleanup/closer function
type Factory func() (store.Store, func())

// TestSuite tests an entire store needed to implement a store.Store.
// Any implementation needs to pass this TestSuite
func TestSuite(t *testing.T, f Factory) {
	cases := []struct {
		name string
		test func(*testing.T, store.Store)
	}{
		{"RoundInfo", TestRoundInfo},
		{"ConsensusParams", TestConsensusParams},
		{"LastEvent", TestLastEvent},
		{"TotalOrders", TestTotalOrders},
		{"Witness", TestWitness},
		{"Poster", TestPoster},
		{"Validator", TestValidator},
	}

	for _, test := range cases {
		t.Run(test.name, func(t *testing.T) {
			s, clean := f()
			defer clean()

			test.test(t, s)
		})

	}

}

// TestRoundInfo verifies the RoundInfo storage behavior
func TestRoundInfo(t *testing.T, s store.Store) {
	info := types.RoundInfo{Number: 1, StartsAt: 10, EndsAt: 100, Limit: 1000}
	s.SetRoundInfo(info)

	assert.Equal(t, info, s.RoundInfo())
}

// TestConsensusParams verifies the ConsensusParams storage behavior
func TestConsensusParams(t *testing.T, s store.Store) {
	params := types.ConsensusParams{FinalityThreshold: 1, PeriodLimit: 10, PeriodLength: 100, MaxOrderBytes: 1000}
	s.SetConsensusParams(params)

	assert.Equal(t, params, s.ConsensusParams())
}

// TestLastEvent verifies the LastEvent storage behavior
func TestLastEvent(t *testing.T, s store.Store) {
	lastEvent := uint64(math.MaxUint64)
	s.SetLastEvent(lastEvent)

	assert.Equal(t, lastEvent, s.LastEvent())
}

// TestTotalOrders verifies the LastTotalOrders storage behavior
func TestTotalOrders(t *testing.T, s store.Store) {
	s.SetTotalOrders(1)
	s.SetTotalOrders(2)
	s.SetTotalOrders(3)
	s.SetTotalOrders(4)

	assert.Equal(t, uint64(4), s.TotalOrders())
}

// TestWitness verifies the Witness storage behavior
func TestWitness(t *testing.T, s store.Store) {
	witnessTx := &types.TransactionWitness{
		Address:       "0xaaaa",
		Amount:        types.NewBigIntFromInt(10),
		Confirmations: 99,
	}

	witnessTx.Id = witnessTx.Hash()
	s.SetWitnessTx(witnessTx)

	found := s.WitnessTx(witnessTx.Id)

	assert.True(t, s.WitnessTxExists(witnessTx.Id))
	assert.Equal(t, found.Confirmations, witnessTx.Confirmations)
	assert.Equal(t, found.Id, witnessTx.Id)
	assert.False(t, s.WitnessTxExists([]byte("xxx")))
}

// TestPoster verifies the Poster storage behavior
func TestPoster(t *testing.T, s store.Store) {
	t.Run("should return nil when not found/exists", func(t *testing.T) {
		addr := "0x404"
		v := s.Poster(addr)
		assert.Nil(t, v)
	})
}

// TestValidator verifies the Validator storage behavior
func TestValidator(t *testing.T, s store.Store) {
	addr := []byte{0, 1, 2, 3, 4}
	v := &types.Validator{
		PublicKey: []byte{0, 1, 2, 3, 4},
		Power:     10,
	}
	s.SetValidator(addr, v)

	t.Run("should be found", func(t *testing.T) {
		newV := s.Validator(addr)
		assert.Equal(t, v.String(), newV.String())
	})

	t.Run("should return nil when not found/exists", func(t *testing.T) {
		addr := []byte{4, 0, 4}
		require.False(t, s.ValidatorExists(addr))

		v := s.Validator(addr)
		assert.Nil(t, v)
	})

	t.Run("should return nil after deletion", func(t *testing.T) {
		s.DeleteValidator(addr)
		newV := s.Validator(addr)
		assert.Nil(t, newV)
	})
}
