package abci

import (
	"encoding/json"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	abci "github.com/tendermint/tendermint/abci/types"
	tmtypes "github.com/tendermint/tendermint/types"
	db "github.com/tendermint/tm-db"
)

func TestValidatorsVerification(t *testing.T) {
	t.Run("ValidatorsOnly", func(t *testing.T) {
		updates := abci.ValidatorUpdates{
			{PubKey: abci.PubKey{}},
		}
		gen := GenesisValidatorSet{}
		set, err := UnifyValidators(updates, gen)
		require.NoError(t, err)
		assert.Len(t, set, 1)
	})

	t.Run("Empty Sets", func(t *testing.T) {
		updates := abci.ValidatorUpdates{}
		gen := GenesisValidatorSet{}

		_, err := UnifyValidators(updates, gen)
		assert.Equal(t, ErrEmptyValidatorSet, err)
	})

	t.Run("Length Mismatch", func(t *testing.T) {
		updates := abci.ValidatorUpdates{
			{PubKey: abci.PubKey{}},
			{PubKey: abci.PubKey{}},
		}

		gen := GenesisValidatorSet{
			GenesisValidator{},
		}

		_, err := UnifyValidators(updates, gen)
		assert.Equal(t, ErrLengthMismatch, err)
	})

	t.Run("PubKey Mismatch", func(t *testing.T) {
		pk1 := []byte("pk_1")
		pk2 := []byte("pk_2")

		updates := abci.ValidatorUpdates{
			abci.Ed25519ValidatorUpdate(pk1, 1),
		}

		gen := GenesisValidatorSet{
			GenesisValidator{PublicKey: pk2, EthereumAddress: "0x1", InitialStake: "1"},
		}

		_, err := UnifyValidators(updates, gen)
		require.Equal(t, NewPublicKeyMismatchError(pk1, pk2), err)

	})

	t.Run("Balance Mismatch", func(t *testing.T) {
		pk := []byte("pk")

		updates := abci.ValidatorUpdates{
			abci.Ed25519ValidatorUpdate(pk, 1),
		}

		gen := GenesisValidatorSet{
			GenesisValidator{PublicKey: pk, EthereumAddress: "0x1", InitialStake: "20000000000000000000"},
		}

		_, err := UnifyValidators(updates, gen)
		require.Equal(t, NewBalanceMismatchError(1, 20), err)

	})

	t.Run("MatchingOK", func(t *testing.T) {
		pk1 := []byte("abc")
		pk2 := []byte("xxx")

		updates := abci.ValidatorUpdates{
			abci.Ed25519ValidatorUpdate(pk1, 1),
			abci.Ed25519ValidatorUpdate(pk2, 2),
		}

		gen := GenesisValidatorSet{
			GenesisValidator{PublicKey: pk2, EthereumAddress: "0x2", InitialStake: "2000000000000000000"},
			GenesisValidator{PublicKey: pk1, EthereumAddress: "0x1", InitialStake: "1000000000000000000"},
		}

		set, err := UnifyValidators(updates, gen)
		require.NoError(t, err)
		require.Len(t, set, len(updates))

		expectedValidators := []struct {
			EthAccount string
			Balance    string
			Power      int64
			PublicKey  []byte
		}{
			{"0x1", "1000000000000000000", 1, pk1},
			{"0x2", "2000000000000000000", 2, pk2},
		}

		for i, v := range expectedValidators {
			assert.Equal(t, v.EthAccount, set[i].EthAccount)
			assert.Equal(t, v.Balance, set[i].Balance.BigInt().String())
			assert.Equal(t, v.Power, set[i].Power)
			assert.Equal(t, v.PublicKey, set[i].PublicKey)
		}
	})
}

func TestValidatorsVerificationOnInitChain(t *testing.T) {
	dir := initTendermint(t)

	app := NewApp(db.NewMemDB(), dir)
	doc, err := tmtypes.GenesisDocFromFile(app.Config.GenesisFile())
	require.NoError(t, err)

	gen := &Genesis{}
	require.NoError(t, json.Unmarshal(doc.AppState, gen))

	gen.InitialValidatorInfo = GenesisValidatorSet{
		GenesisValidator{PublicKey: []byte("key_foo")},
	}

	assert.Panics(t, func() {
		app.InitChain(abci.RequestInitChain{
			Validators: abci.ValidatorUpdates{
				abci.Ed25519ValidatorUpdate([]byte("key_bar"), 10),
			},
			AppStateBytes: gen.JSON(),
		})
	})

}
