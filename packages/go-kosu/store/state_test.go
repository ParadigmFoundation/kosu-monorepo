package store

import (
	"fmt"
	"go-kosu/abci/types"
	"math/big"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/libs/db"
)

func TestRoundInfoProto(t *testing.T) {
	t.Run("FromProto", func(t *testing.T) {
		proto := &types.RoundInfo{Number: 1, StartsAt: 2, EndsAt: 3, Limit: 4}
		state := &RoundInfo{}
		state.FromProto(proto)

		assert.Equal(t, proto.GetNumber(), state.Number)
		assert.Equal(t, proto.GetStartsAt(), state.StartsAt)
		assert.Equal(t, proto.GetEndsAt(), state.EndsAt)
		assert.Equal(t, proto.GetLimit(), state.Limit)
	})

	t.Run("ToProto", func(t *testing.T) {
		state := &RoundInfo{Number: 1, StartsAt: 2, EndsAt: 3, Limit: 4}
		proto := &types.RoundInfo{}
		state.ToProto(proto)

		assert.Equal(t, state.Number, proto.GetNumber())
		assert.Equal(t, state.StartsAt, proto.GetStartsAt())
		assert.Equal(t, state.EndsAt, proto.GetEndsAt())
		assert.Equal(t, state.Limit, proto.GetLimit())
	})
}

func TestPushTransactionWitness(t *testing.T) {
	tx := &types.TransactionWitness{
		Block:   10,
		Address: "0xff",
		Amount:  types.NewBigIntFromInt(128),
	}
	tx.Id = tx.Hash()

	t.Run("LastEvent >= tx.Block", func(t *testing.T) {
		state := NewState()
		state.LastEvent = 100

		require.Error(t,
			state.PushTransactionWitness(tx),
		)

		err := state.IterateWitnessEventsForBlock(tx.Block, func(id []byte, ev *WitnessEvent) bool {
			return false
		})
		require.Error(t, err)
		assert.EqualValues(t, 100, state.LastEvent)
	})

	t.Run("NotEnoughConfirmations", func(t *testing.T) {
		state := NewState()
		state.UpdateConfirmationThreshold(100)

		// push the event twice
		require.NoError(t,
			state.PushTransactionWitness(tx),
		)

		require.NoError(t,
			state.PushTransactionWitness(tx),
		)

		var seen = false
		err := state.IterateWitnessEventsForBlock(tx.Block, func(id []byte, ev *WitnessEvent) bool {
			seen = true
			assert.EqualValues(t, 2, ev.Conf)
			assert.EqualValues(t, 128, ev.Amount.Int64())
			assert.EqualValues(t, 0, state.LastEvent, "LastEvent should not be updated")
			assert.Equal(t, ev.Address, tx.Address)
			assert.Equal(t, id, tx.Hash())
			return false
		})
		require.NoError(t, err)

		assert.True(t, seen, "Event should be seen in the state.Events")
	})

	t.Run("EnoughConfirmations", func(t *testing.T) {
		state := NewState()
		state.UpdateConfirmationThreshold(0)

		require.NoError(t,
			state.PushTransactionWitness(tx),
		)

		err := state.IterateWitnessEventsForBlock(tx.Block, func(id []byte, ev *WitnessEvent) bool {
			return false
		})
		require.Error(t, err)

		poster, ok := state.posters[tx.Address]
		assert.True(t, ok, "Poster should exist")
		if ok {
			assert.EqualValues(t, 128, poster.Balance.Int64())
		}

		t.Run("WithZeroBalance", func(t *testing.T) {
			state.LastEvent = 0
			tx.Amount = types.NewBigIntFromInt(0)
			require.NoError(t,
				state.PushTransactionWitness(tx),
			)

			assert.Zero(t, len(state.posters))
		})
	})
}

func TestPersistAndUpdate(t *testing.T) {
	db1 := db.NewMemDB()
	t1 := NewStateTree(db1, new(GobCodec))
	s1 := NewState()

	// Add data to the state
	s1.LastEvent = 100
	s1.RoundInfo = RoundInfo{Number: 1}
	s1.ConsensusParams.FinalityThreshold = 99
	for i := 0; i < 1003; i++ {
		s1.posters[fmt.Sprintf("0x%d", i)] = &Poster{Balance: big.NewInt(int64(i)), Limit: uint64(i)}
		s1.events[uint64(i)] = WitnessEvents{
			"id1": &WitnessEvent{Address: "0xff"}, "id2": &WitnessEvent{Address: "0xff"},
		}
	}

	requireNoErrors(t,
		s1.PersistToTree(t1),
		t1.Commit(),
	)

	db2 := db.NewMemDB()
	t2 := NewStateTree(db2, new(GobCodec))
	s2 := NewState()

	err := s2.UpdateFromTree(t1)
	require.NoError(t, err)
	assert.Equal(t, s1, s2)

	requireNoErrors(t,
		s2.PersistToTree(t2),
		t2.Commit(),
	)

	for i := 0; i < 10; i++ {
		requireNoErrors(t, t1.Commit(), t2.Commit())
		require.Equal(t, t1.CommitInfo, t2.CommitInfo)

		s1.UpdateFromTree(t1)
		s2.UpdateFromTree(t2)

		require.Equal(t, s1, s2)

	}
}

func requireNoErrors(t *testing.T, errs ...error) {
	for _, err := range errs {
		require.NoError(t, err)
	}
}

func TestGenLimits(t *testing.T) {
	s := NewState()
	s.RoundInfo.Limit = 11

	for _, tx := range []*types.TransactionWitness{
		{Address: "a", Amount: types.NewBigIntFromInt(10), Block: 2},
		{Address: "b", Amount: types.NewBigIntFromInt(20), Block: 3},
		{Address: "c", Amount: types.NewBigIntFromInt(30), Block: 4},
	} {
		err := s.PushTransactionWitness(tx)
		require.NoError(t, err)
	}

	rls := s.GenLimits()
	assert.EqualValues(t, 1, rls["a"])
	assert.EqualValues(t, 3, rls["b"])
	assert.EqualValues(t, 5, rls["c"])
}
