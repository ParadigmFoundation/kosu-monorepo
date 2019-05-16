package store

import (
	"go-kosu/abci/types"

	"github.com/gogo/protobuf/proto"
)

// QueryPath is used to demarcate the possible values within the Query function
type QueryPath string

const (
	// ConsensusParamsQuery path is used to query a ConsensusParams object
	ConsensusParamsQuery QueryPath = "/consensusparams"
	// PostersQuery path is used to query the posters list
	PostersQuery = "/posters"
	// RoundInfoQuery path is used to query a RoundInfo object
	RoundInfoQuery = "/roundinfo"
)

// Query queries for the tree state and transform the output into a proto.Message to be delivered to the client.
// Query also returns the key of the state.
func (s *State) Query(tree *StateTree, path QueryPath) (proto.Message, []byte, error) {
	switch path {
	case ConsensusParamsQuery:
		var param ConsensusParams
		if err := tree.Get(consensusParamsKey, &param); err != nil {
			return nil, nil, err
		}

		p := &types.ConsensusParams{
			FinalityThreshold:     param.FinalityThreshold,
			PeriodLimit:           param.PeriodLimit,
			PeriodLength:          param.PeriodLength,
			MaxOrderBytes:         param.MaxOrderBytes,
			ConfirmationThreshold: param.ConfirmationThreshold,
		}
		return p, []byte(roundInfoKey), nil
	case PostersQuery:
		return nil, nil, nil

	case RoundInfoQuery:
		var info RoundInfo
		if err := tree.Get(roundInfoKey, &info); err != nil {
			return nil, nil, err
		}

		p := new(types.RoundInfo)
		info.ToProto(p)
		return p, []byte(roundInfoKey), nil
	}

	return nil, nil, ErrQueryPathNotFound
}
