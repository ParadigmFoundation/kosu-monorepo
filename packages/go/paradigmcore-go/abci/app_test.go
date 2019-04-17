package abci

import (
	"paradigmcore/abci/types"
	"paradigmcore/store"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/db"
)

func TestCheckTxSignature(t *testing.T) {
	db := db.NewMemDB()
	app := NewApp(
		store.NewState(),
		db,
	)

	_, priv, err := types.NewKeyPair()
	require.NoError(t, err)

	tx, err := (&types.Transaction{}).SignedTransaction(priv)
	require.NoError(t, err)

	// Set an invalid signature
	tx.Proof.Signature = []byte{0xff, 0xff, 0xff}

	buf, err := types.EncodeTx(tx)
	require.NoError(t, err)

	res := app.CheckTx(buf)
	assert.True(t, res.IsErr())
	assert.Contains(t, res.Info, "signature")
}

func TestCommitAndInfo(t *testing.T) {
	db := db.NewMemDB()
	app := NewApp(store.NewState(), db)
	app.Commit()

	// App crashed, let's restart

	newApp := NewApp(store.NewState(), db)
	res := newApp.Info(abci.RequestInfo{})
	assert.Equal(t, int64(1), res.LastBlockHeight)
	assert.Equal(t, app.tree.CommitInfo.Hash, res.LastBlockAppHash)
}
