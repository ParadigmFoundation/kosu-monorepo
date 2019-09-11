package abci

import (
	"bytes"
	"encoding/json"
	"io/ioutil"

	abci "github.com/tendermint/tendermint/abci/types"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
)

// GenesisValidator is the data structure used to define a validator in the app_state section of the genesis file
// It links a Tendermint PublicKey with an Ethereum Address.
type GenesisValidator struct {
	PublicKey       []byte
	EthereumAddress string
	InitialStake    string
}

// GenesisValidatorSet is the initial set of validators
type GenesisValidatorSet []GenesisValidator

func (s GenesisValidatorSet) Len() int { return len(s) }
func (s GenesisValidatorSet) Less(i, j int) bool {
	return bytes.Compare(s[i].PublicKey, s[j].PublicKey) <= 0
}
func (s GenesisValidatorSet) Swap(i, j int) { s[i], s[j] = s[j], s[i] }

// Genesis is the initial chain state
type Genesis struct {
	ConsensusParams      types.ConsensusParams `json:"consensus_params"`
	InitialValidatorInfo GenesisValidatorSet   `json:"initial_validator_info"`
	// SnapshotBlock indicates the first Ethereum block we will subscribe to
	SnapshotBlock uint64 `json:"snapshot_block"`
}

// NewGenesisFromRequest returnsa a new Genesis object given a RequestInitChain
func NewGenesisFromRequest(req abci.RequestInitChain) (*Genesis, error) {
	if len(req.AppStateBytes) == 0 {
		return nil, nil
	}
	gen := &Genesis{}
	if err := json.Unmarshal(req.AppStateBytes, gen); err != nil {
		return nil, err
	}
	return gen, nil
}

// NewGenesisFromFile returns a new Genesis object given a path to the genesis gile
func NewGenesisFromFile(file string) (*Genesis, error) {
	gen := &struct {
		AppState *Genesis `json:"app_state"`
	}{}

	data, err := ioutil.ReadFile(file) // nolint:gosec
	if err != nil {
		return nil, err
	}

	if err := json.Unmarshal(data, gen); err != nil {
		return nil, err
	}
	return gen.AppState, nil
}

// JSON returns the json representation of the Genesis
func (g *Genesis) JSON() json.RawMessage {
	buf, err := json.Marshal(g)
	if err != nil {
		panic(err)
	}
	return json.RawMessage(buf)
}

// GenesisAppState is the initial (genesis) Application state
var GenesisAppState = &Genesis{
	ConsensusParams: types.ConsensusParams{
		PeriodLength:        10,
		PeriodLimit:         100000,
		BlocksBeforePruning: 10,
	},
	InitialValidatorInfo: nil,
	SnapshotBlock:        0,
}
