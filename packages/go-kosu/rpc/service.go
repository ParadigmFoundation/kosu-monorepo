package rpc

import (
	"context"
	"go-kosu/abci"

	"github.com/ethereum/go-ethereum/rpc"
)

// Service is a RPC service
type Service struct {
	abci *abci.Client
}

// NewService returns a new service given a abci client
func NewService(abci *abci.Client) *Service {
	return &Service{
		abci: abci,
	}
}

// Subscribe subscribes to the ABCI events
// To tell which events you want, you need to provide a query.
// More information about query can be found here: https://tendermint.com/rpc/#subscribe
func (s *Service) Subscribe(ctx context.Context, query string) (*rpc.Subscription, error) {
	notifier, supported := rpc.NotifierFromContext(ctx)
	if !supported {
		return nil, rpc.ErrNotificationsUnsupported
	}

	events, closer, err := s.abci.Subscribe(ctx, query)
	if err != nil {
		return nil, err
	}

	rpcSub := notifier.CreateSubscription()
	go func() {
		defer closer()

		for {
			select {
			case <-rpcSub.Err():
				return
			case <-notifier.Closed():
				return
			case e := <-events:
				notifier.Notify(rpcSub.ID, e)
			}
		}
	}()

	return rpcSub, nil
}

func (s *Service) Foo() error {
	return nil
}
