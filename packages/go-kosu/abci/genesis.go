package abci

import (
	"encoding/json"
	"io/ioutil"

	abci "github.com/tendermint/tendermint/abci/types"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
)

// Genesis is the initial chain state
type Genesis struct {
	ConsensusParams types.ConsensusParams
}

// NewGenesisFromRequest returnsa a new Genesis object given a RequestInitChain
func NewGenesisFromRequest(req abci.RequestInitChain) (*Genesis, error) {
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
