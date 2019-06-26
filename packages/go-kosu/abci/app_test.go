package abci

import (
	"go-kosu/abci/types"
	"go-kosu/store"
	"io/ioutil"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/db"
)

func newTestApp(t *testing.T, db db.DB) (func(), *App) {
	dir, err := ioutil.TempDir("", ".kosu_tests_")
	require.NoError(t, err)

	err = InitTendermint(dir)
	require.NoError(t, err)

	fn := func() { _ = os.RemoveAll(dir) }
	return fn, NewApp(store.NewState(), db, dir)
}

func TestCheckTxSignature(t *testing.T) {
	db := db.NewMemDB()
	done, app := newTestApp(t, db)
	defer done()

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
	assert.Contains(t, res.Log, "signature")
}

func TestCommitAndInfo(t *testing.T) {
	db := db.NewMemDB()
	done, app := newTestApp(t, db)
	defer done()

	app.Commit()

	// Let's create a new App using the same DB to simulate a restart
	done, newApp := newTestApp(t, db)
	defer done()

	res := newApp.Info(abci.RequestInfo{})
	assert.Equal(t, int64(1), res.LastBlockHeight)
	assert.Equal(t, app.Store().LastCommitID().Hash, res.LastBlockAppHash)
}
