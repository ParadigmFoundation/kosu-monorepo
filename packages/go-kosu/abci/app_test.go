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
	tmtypes "github.com/tendermint/tendermint/types"
	db "github.com/tendermint/tm-db"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
)

func initTendermint(t *testing.T) string {
	dir, err := ioutil.TempDir("", ".kosu_tests_")
	require.NoError(t, err)

	err = InitTendermint(dir)
	require.NoError(t, err)

	return dir
}

func newTestApp(t *testing.T, db db.DB) (func(), *App) {
	dir := initTendermint(t)
	closer := func() { _ = os.RemoveAll(dir) }

	app := NewApp(db, dir)
	doc, err := tmtypes.GenesisDocFromFile(app.Config.GenesisFile())
	require.NoError(t, err)

	if app.Store().LastCommitID().Version == 0 {
		app.InitChain(abci.RequestInitChain{
			Validators: abci.ValidatorUpdates{
				abci.Ed25519ValidatorUpdate([]byte("some_pub_key"), 10),
			},
			AppStateBytes: doc.AppState,
		})
	}

	return closer, app
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

	res := app.CheckTx(abci.RequestCheckTx{Tx: buf})
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

// nolint:lll
func TestGenesisStateCorrectness(t *testing.T) {
	dir := initTendermint(t)
	closer := func() { _ = os.RemoveAll(dir) }
	defer closer()

	app := NewApp(db.NewMemDB(), dir)

	//	9339CD2572AB19E2A2E431EEF2E9FD2B1A91C472 is the Address of the update
	//	To retrieve it call GetUpdateAddress(&update)
	newTestReq := func(state []byte) abci.RequestInitChain {
		req := abci.RequestInitChain{
			Validators: abci.ValidatorUpdates{
				abci.Ed25519ValidatorUpdate([]byte("some_pub_key"), 10),
			},
			AppStateBytes: state,
		}
		return req
	}

	tests := []struct {
		name        string
		state       []byte
		shouldPanic bool
		assert      func(*abci.ResponseInitChain)
	}{
		{
			"InitialValidatorInfo_And_Snapshot_Zero", []byte(`{
				"initial_validator_info": [
					{"tendermint_address": "9339CD2572AB19E2A2E431EEF2E9FD2B1A91C472", "ethereum_address": "0xethereum", "initial_stake": "10000000000000000000"}
				],
				"snapshot_block": 0
			}`), true, nil,
		},
		{
			"Balances_Doesnt_Match", []byte(`{
				"initial_validator_info": [
					{"tendermint_address": "9339CD2572AB19E2A2E431EEF2E9FD2B1A91C472", "ethereum_address": "0xethereum", "initial_stake": "98760000000000000000"}
				],
				"snapshot_block": 999
			}`), true, nil,
		},
		{
			"PublicKeys_Doesnt_Match", []byte(`{
				"initial_validator_info": [
					{"tendermint_address": "0000000000000000000000000000000000000000", "ethereum_address": "0xethereum", "initial_stake": "10000000000000000000"}
				],
				"snapshot_block": 999
			}`), true, nil,
		},
		{
			"InitialPosters_Are_Stored", []byte(`{
				"initial_validator_info": [
					{"tendermint_address": "9339CD2572AB19E2A2E431EEF2E9FD2B1A91C472", "ethereum_address": "0xethereum", "initial_stake": "10000000000000000000"}
				],
				"snapshot_block": 999,
				"initial_posters": [
					{"ethereum_address": "some_address", "balance": "1234"}
				]
			}`),
			false,
			func(res *abci.ResponseInitChain) {
				p := app.store.Poster("some_address")
				require.NotNil(t, p)
				assert.EqualValues(t, 1234, p.Balance.BigInt().Int64())
				assert.EqualValues(t, 0, p.Limit, "Limit should not be set")
			},
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			req := newTestReq(test.state)
			if test.shouldPanic {
				assert.Panics(t, func() {
					app.InitChain(req)
				})
			}

			if fn := test.assert; fn != nil {
				res := app.InitChain(req)
				fn(&res)
			}
		})
	}

	t.Run("Sorted", func(t *testing.T) {
		app.InitChain(abci.RequestInitChain{
			Validators: abci.ValidatorUpdates{
				abci.Ed25519ValidatorUpdate([]byte("z"), 2000),
				abci.Ed25519ValidatorUpdate([]byte("y"), 2001),
				abci.Ed25519ValidatorUpdate([]byte("x"), 2002),
				abci.Ed25519ValidatorUpdate([]byte("w"), 2003),
			},
			AppStateBytes: []byte(`{
				"initial_validator_info": [
					  {"tendermint_address": "50E721E49C013F00C62CF59F2163542A9D8DF024", "ethereum_address": "0xethereum1", "initial_stake": "2003000000000000000000"}
					, {"tendermint_address": "2D711642B726B04401627CA9FBAC32F5C8530FB1", "ethereum_address": "0xethereum1", "initial_stake": "2002000000000000000000"}
					, {"tendermint_address": "A1FCE4363854FF888CFF4B8E7875D600C2682390", "ethereum_address": "0xethereum1", "initial_stake": "2001000000000000000000"}
					, {"tendermint_address": "594E519AE499312B29433B7DD8A97FF068DEFCBA", "ethereum_address": "0xethereum1", "initial_stake": "2000000000000000000000"}
				],
				"snapshot_block": 999
			}`),
		})
	})

	t.Run("ValidatorUpdates_Power_Is_0", func(t *testing.T) {
		updates := abci.ValidatorUpdates{
			abci.Ed25519ValidatorUpdate([]byte("z"), 0),
			abci.Ed25519ValidatorUpdate([]byte("y"), 0),
			abci.Ed25519ValidatorUpdate([]byte("x"), 0),
			abci.Ed25519ValidatorUpdate([]byte("w"), 0),
		}
		res := app.InitChain(abci.RequestInitChain{
			Validators: updates,
			AppStateBytes: []byte(`{
				"initial_validator_info": [
					  {"tendermint_address": "50E721E49C013F00C62CF59F2163542A9D8DF024", "ethereum_address": "0xethereum1", "initial_stake": "2003000000000000000000"}
					, {"tendermint_address": "2D711642B726B04401627CA9FBAC32F5C8530FB1", "ethereum_address": "0xethereum1", "initial_stake": "2002000000000000000000"}
					, {"tendermint_address": "A1FCE4363854FF888CFF4B8E7875D600C2682390", "ethereum_address": "0xethereum1", "initial_stake": "2001000000000000000000"}
					, {"tendermint_address": "594E519AE499312B29433B7DD8A97FF068DEFCBA", "ethereum_address": "0xethereum1", "initial_stake": "2000000000000000000000"}
				],
				"snapshot_block": 999
			}`),
		})

		require.Len(t, res.Validators, 4)
		for _, u := range res.Validators {
			assert.True(t, u.Power > 0)
		}
	})
}
