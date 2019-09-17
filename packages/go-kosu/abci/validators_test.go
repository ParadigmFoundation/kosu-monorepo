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
			GenesisValidator{TendermintAddress: string(pk2), EthereumAddress: "0x1", InitialStake: "1"},
		}

		_, err := UnifyValidators(updates, gen)
		require.Error(t, err)

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
		GenesisValidator{TendermintAddress: "key_foo"},
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
