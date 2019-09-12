package rpc

import (
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci"

	"github.com/ethereum/go-ethereum/rpc"
)

const (
	// Version indicates the RPC-API version
	Version = "1.0"
)

// ClientFactory is a function that returns a new abci.Client
// It is invoked by the Server each time we subscribe to an event.
type ClientFactory func() (*abci.Client, error)

// NewServer returns a new Server which holds the registered rpc service
func NewServer(fn ClientFactory) (*rpc.Server, error) {
	server := rpc.NewServer()
	service, err := NewService(fn)
	if err != nil {
		return nil, err
	}

	if err := server.RegisterName("kosu", service); err != nil {
		return nil, err
	}

	return server, nil
}

// DialInProc wraps rpc.DialInProc constructor
func DialInProc(s *rpc.Server) *rpc.Client {
	return rpc.DialInProc(s)
}
