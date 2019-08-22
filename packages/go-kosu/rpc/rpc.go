package rpc

import (
	"go-kosu/abci"

	"github.com/ethereum/go-ethereum/rpc"
)

const (
	// Version indicates the RPC-API version
	Version = "1.0"
)

// NewServer returns a new Server which holds the registered rpc service
func NewServer(abci *abci.Client) *rpc.Server {
	srv := rpc.NewServer()
	if err := srv.RegisterName("kosu", &Service{abci: abci}); err != nil {
		panic(err)
	}
	return srv
}

// DialInProc wraps rpc.DialInProc constructor
func DialInProc(s *rpc.Server) *rpc.Client {
	return rpc.DialInProc(s)
}
