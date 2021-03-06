package abci

import (
	"encoding/hex"
	"errors"
	"fmt"
	"math/big"
	"sort"
	"strings"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/crypto/tmhash"
)

var (
	// ErrEmptyValidatorSet means that both validators set are empty
	ErrEmptyValidatorSet = errors.New("validators set are empty")
	// ErrLengthMismatch means that the validators set sizes are not equal
	ErrLengthMismatch = errors.New("length mismatch")
)

// GetUpdateAddress returns the Tendermint's address of a Validator Update
func GetUpdateAddress(update *abci.ValidatorUpdate) string {
	key := tmhash.SumTruncated(update.PubKey.Data)
	enc := hex.EncodeToString(key)
	return strings.ToUpper(enc)
}

// UnifyValidators returns a new validator set built out of ValidatorUpdates and GenesisValidatorSet,
// both present in the genesis file.
// We use the ValidatorUpdates to get the validator node info,
// and GenesisValidatorSet to get the ethereum information as well as their initial stake.
// Before unifying these two sets, UnifyValidators performs the following sanity checks:
// - Size of the sets is equal and > 0.
// - Validators public keys are equal
// - Validators balances (power and initial stake) are equal
// This verifications only happen if the GenesisValidatorSet is not empty.
func UnifyValidators(updates abci.ValidatorUpdates, state GenesisValidatorSet) ([]types.Validator, error) {
	if len(updates) == 0 {
		return nil, ErrEmptyValidatorSet
	}

	// sort is needed because so that we can use the same iterator index for both
	// TM sorts by Pubkey, but we need to sort by Address
	sort.SliceStable(updates, func(i, j int) bool {
		return GetUpdateAddress(&updates[i]) < GetUpdateAddress(&updates[j])
	})
	sort.Sort(state)

	newSet := make([]types.Validator, len(updates))
	for i, u := range updates {
		newSet[i] = types.Validator{
			Power:     u.Power,
			PublicKey: u.PubKey.Data,
		}
	}
	// GenesisValidatorSet is empty, so there's nothing to unify
	if len(state) == 0 {
		return newSet, nil
	}

	if len(updates) != len(state) {
		return nil, ErrLengthMismatch
	}

	// create a map of validators addresses to verify if they exist
	addresses := make(map[string]struct{})
	for _, update := range updates {
		addr := GetUpdateAddress(&update)
		addresses[addr] = struct{}{}
	}

	for i := range newSet {
		v := &newSet[i]
		s := state[i]

		// key verification
		if _, ok := addresses[s.TendermintAddress]; !ok {
			err := fmt.Errorf("address from app_state.initial_validator_info[%s] was not found in []validators", s.TendermintAddress) // nolint
			return nil, err
		}

		bn := big.NewInt(0)
		if s.InitialStake != "" {
			bn, _ = bn.SetString(s.InitialStake, 10)
		}

		update := &updates[i]
		if update.Power != 1 {
			// nolint
			return nil, errors.New("The genesis file cannot contain validators with voting power other than '1' when the initial_validator_info is set")
		}
		update.Power = ScaleBalance(bn)
		v.Power = update.Power
		v.Balance = types.NewBigInt(bn.Bytes())
		v.EthAccount = s.EthereumAddress
	}

	return newSet, nil
}
