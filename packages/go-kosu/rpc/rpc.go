package rpc

import (
	"go-kosu/abci"

	"github.com/ethereum/go-ethereum/rpc"
)

func NewServer(abci *abci.Client) *rpc.Server {
	srv := rpc.NewServer()
	srv.RegisterName("kosu", &Service{abci: abci})
	return srv
}
