package abci

import (
	"io/ioutil"
	"math"
	"math/big"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/db"
	tmtypes "github.com/tendermint/tendermint/types"

	"go-kosu/abci/types"
)

func newTestApp(t *testing.T, db db.DB) (func(), *App) {
	dir, err := ioutil.TempDir("", ".kosu_tests_")
	require.NoError(t, err)

	err = InitTendermint(dir)
	require.NoError(t, err)

	fn := func() { _ = os.RemoveAll(dir) }

	app := NewApp(db, dir)
	doc, err := tmtypes.GenesisDocFromFile(app.Config.GenesisFile())
	require.NoError(t, err)

	if app.Store().LastCommitID().Version == 0 {
		app.InitChain(abci.RequestInitChain{AppStateBytes: doc.AppState})
	}

	return fn, app
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

func TestUpdateConfirmationThreshold(t *testing.T) {
	tests := []struct {
		power    string
		expected uint64
	}{
		{"0", 0},
		{"1", 0},
		{"2", 1},
		{"3", 2},
		{"4", 2},
		{"5", 3},
		{"10", 6},
		{"100", 66},
		{"1000", 666},
		{"1001", 667},
		{"10000", 6666},
		{"100000", 66666},
		{"1000000", 666666},
		{"10000000", 6666666},
		{"100000000", 66666666},
		{"1000000000", 666666666},
		{"10000000000", 6666666666},
		{"100000000000", 66666666666},
		{"1000000000000", 666666666666},
		{"10000000000000", 6666666666666},
		{"100000000000000", 66666666666666},
		{"1000000000000000", 666666666666666},
		{"10000000000000000", 6666666666666666},
		{"100000000000000000", 66666666666666666},
		{"1000000000000000000", 666666666666666666},
		{"10000000000000000000", 6666666666666666666},
		{"100000000000000000000", math.MaxUint64},
		{"1000000000000000000000", math.MaxUint64},
	}

	for i, test := range tests {
		app := &App{}
		power, ok := big.NewInt(0).SetString(test.power, 10)
		require.True(t, ok)

		app.updateConfirmationThreshold(power)
		assert.Equal(t, test.expected, app.confirmationThreshold,
			"#%2d for power %s, got: %d, want: %d", i, power, app.confirmationThreshold, test.expected,
		)
	}
}
