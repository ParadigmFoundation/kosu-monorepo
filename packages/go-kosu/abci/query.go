package abci

import (
	"go-kosu/store"

	"github.com/gogo/protobuf/proto"
	abci "github.com/tendermint/tendermint/abci/types"
)

// Query .
func (app *App) Query(req abci.RequestQuery) abci.ResponseQuery {
	path := store.QueryPath(req.GetPath())
	msg, key, err := app.state.Query(app.tree, path)
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
