package rpc

import (
	"go-kosu/abci"

	"github.com/ethereum/go-ethereum/rpc"
)

// NewServer returns a new Server which holds the registered rpc service
func NewServer(abci *abci.Client) *rpc.Server {
	srv := rpc.NewServer()
	if err := srv.RegisterName("kosu", &Service{abci: abci}); err != nil {
		panic(err)
	}
	return srv
}
