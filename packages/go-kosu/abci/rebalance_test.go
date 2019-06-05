package abci

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/common"
	"github.com/tendermint/tendermint/libs/db"

	"go-kosu/abci/types"
)

func TestDeliverRebalanceTx(t *testing.T) {
	db := db.NewMemDB()
	done, app := newTestApp(t, db)
	defer done()

	_, priv, err := types.NewKeyPair()
	require.NoError(t, err)

	rtx := &types.TransactionRebalance{
		RoundInfo: &types.RoundInfo{
			Number:   1,
			StartsAt: 100,
			EndsAt:   110,
		},
		Limits: []*types.RateLimit{
			{Address: "0xcc", Limit: 20},
			{Address: "0xaa", Limit: 10},
		},
	}

	tx, err := types.WrapTx(rtx).SignedTransaction(priv)
	require.NoError(t, err)

	buf, err := types.EncodeTx(tx)
	require.NoError(t, err)

	res := app.DeliverTx(buf)

	t.Run("AssertCode", func(t *testing.T) {
		assert.Equal(t, abci.CodeTypeOK, res.Code,
			"Unexpected DeliveryTx Code, err=%v", res.Info)
	})

	t.Run("Assert Tags", func(t *testing.T) {
		expectedTags := []common.KVPair{
			{Key: []byte("tx.type"), Value: []byte("rebalance")},
			{Key: []byte("round.number"), Value: []byte("1")},
			{Key: []byte("round.start"), Value: []byte("100")},
			{Key: []byte("round.end"), Value: []byte("110")},
		}
		assert.Equal(t, expectedTags, res.Tags)
	})

	// TODO:
	/*
		t.Run("Store.RateLimit", func(t *testing.T) {
			var run = false
			err := tree.IterateRateLimits("", "0xbb", func(addr string, l uint64) {
				assert.Equal(t, "0xaa", addr)
				assert.EqualValues(t, 10, l)
				run = true
			})
			require.NoError(t, err)
			assert.True(t, run)
		})
	*/
}
