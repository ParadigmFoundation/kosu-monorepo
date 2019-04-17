package abci

import (
	"go-kuso/abci/types"
	"go-kuso/store"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/libs/db"
)

func TestDeliverWitnessTx(t *testing.T) {
	db := db.NewMemDB()
	state := store.NewState()
	app := NewApp(state, db)

	_, priv, err := types.NewKeyPair()
	require.NoError(t, err)

	wtx := &types.TransactionWitness{
		Block: 1,
	}

	tx, err := types.WrapTx(wtx).SignedTransaction(priv)
	require.NoError(t, err)

	buf, err := types.EncodeTx(tx)
	require.NoError(t, err)

	res := app.DeliverTx(buf)

	assert.EqualValues(t, 0, res.Code)
}
