package abci

import (
	"github.com/gogo/protobuf/proto"
	abci "github.com/tendermint/tendermint/abci/types"
)

// Query .
func (app *App) Query(req abci.RequestQuery) abci.ResponseQuery {
	msg, key, err := app.state.Query(app.tree, req.GetPath())
	if err != nil {
		return abci.ResponseQuery{
			Code: 1,
			Info: err.Error(),
		}
	}

	value, err := proto.Marshal(msg)
	if err != nil {
		return abci.ResponseQuery{
			Code: 1,
			Info: err.Error(),
		}
	}

	return abci.ResponseQuery{
		Key:   key,
		Value: value,
	}
}
