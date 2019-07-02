package abci

import (
	"encoding/json"

	abci "github.com/tendermint/tendermint/abci/types"

	"go-kosu/abci/types"
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

// JSON returns the json representation of the Genesis
func (g *Genesis) JSON() json.RawMessage {
	buf, err := json.Marshal(g)
	if err != nil {
		panic(err)
	}
	return json.RawMessage(buf)
}
