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

/*
Subscribe subscribes to the ABCI events.

To tell which events you want, you need to provide a query.
More information about query can be found here: https://tendermint.com/rpc/#subscribe
Subscriptions will only work over WS.
#### Parameters
`query` TM query string

#### Returns
`*rpc.Subscription`

#### Examples
```go
ch := make(chan interface{})
args := []interface{}{
	"subscribe",
	"tm.event='NewBlock'",
}
ctx := context.Background()
sub, err := client.Subscribe(ctx, "kosu", ch, args...)
if err != nil {
	panic(err)
}
defer sub.Unsubscribe()

for {
	select {
	case <-ctx.Done():
		return
	case <-sub.Err():
		return
	case e := <-ch:
		fmt.Printf("event: %+v", e)
	}
}
```
*/
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
				err := notifier.Notify(rpcSub.ID, e)
				if err != nil {
					log.Printf("rpc: %+v", err)
				}
			}
		}
	}()

	return rpcSub, nil
}

/*
LatestHeight returns the height of the best known block.
The `latestHeight` method will return the integer height of the latest block committed to the blockchain.

#### Parameters
None

#### Returns
`latestHeight` - _int64_ latest block height

#### Examples
```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"kosu_latestHeight", "id": 1}' localhost:14341 --header 'Content-Type: application/json'
{"jsonrpc":"2.0","id":1,"result":260}
```
*/
func (s *Service) LatestHeight() (int64, error) {
	res, err := s.abci.Block(nil)
	if err != nil {
		return 0, err
	}
	if res.Block == nil {
		return 0, nil
	}

	return res.Block.Height, nil
}
