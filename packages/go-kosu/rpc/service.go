package rpc

import (
	"context"
	"errors"
	"go-kosu/abci"
	"go-kosu/abci/types"
	"log"

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

// AddOrders adds an array of Kosu orders to the network
/*
### Example payload
 ```json
 [{
	 "subContract":"0xebe8fdf63db77e3b41b0aec8208c49fa46569606",
	 "maker":"0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596",
	 "arguments":{
		 "maker":[
		 	{"datatype":"address","name":"signer"},
			{"datatype":"address","name":"signerToken"},
			{"datatype":"uint","name":"signerTokenCount"},
			{"datatype":"address","name":"buyerToken"},
			{"datatype":"uint","name":"buyerTokenCount"},
			{"datatype":"signature","name":"signature","signatureFields":[0,1,2,3,4]}
		],
		"taker":[
			{"datatype":"uint","name":"tokensToBuy"}
		]
	},
	"makerValues": {
		"signer":"0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596",
		"signerToken":"0xbFB972996fd7658099a95E6290e8B0fa46b9BDd5",
		"signerTokenCount":"1000",
		"buyer":"0xbcd1c49f4e54cca1a0a59ac21b7eb90f07970a3a",
		"buyerToken":"0x92cBc0Bec2121f55E84bC331f096b7dAAe5A5ddA",
		"buyerTokenCount":"1000",
		"signature":"0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300"
	},
	"makerSignature":"0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300",
	"posterSignature":"0xc3550b7ceab610e638dfb1b33e5cf7aaf9490854197328eadbe8ac049adef7510a07a0ea046fa1d410c5cc1048828152b9368a8d8925f8f0072192ebfe1bbb3101"
 }]`,
 ```

### cURL example
```bash
curl -X POST localhost:14341 \
	--data '{"jsonrpc":"2.0", "id": 1, "method": "kosu_addOrders", "params": [[<PAYLOAD>]]}' \
	-H 'Content-Type: application/json'
```
*/
func (s *Service) AddOrders(orders []*types.TransactionOrder) error {
	for _, order := range orders {
		res, err := s.abci.BroadcastTxSync(order)
		if err != nil {
			return err
		}
		if res.Code != 0 {
			return errors.New(res.Log)
		}
	}
	return nil
}
