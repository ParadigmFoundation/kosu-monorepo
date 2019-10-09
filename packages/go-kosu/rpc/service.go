// Package rpc provides remote proceedural call functionality for go-kosu, serving
// a JSONRPC API over WebSockets and HTTP. It provides the primary means for interacting
// with a Kosu node.
//
// Generated and formatted API documentation is hosted at https://docs.kosu.io/go-kosu.
// It is rendered in godoc as well, but the mardown syntax is not parsed.
package rpc

import (
	"context"
	"encoding/hex"
	"log"
	"strings"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/store"

	"github.com/ethereum/go-ethereum/rpc"

	tmtypes "github.com/tendermint/tendermint/types"
)

// Service is a RPC service
type Service struct {
	abci      *abci.Client
	newClient ClientFactory
}

// NewService returns a new service given a abci client
func NewService(fn ClientFactory) (*Service, error) {
	c, err := fn()
	if err != nil {
		return nil, err
	}

	return &Service{
		abci:      c,
		newClient: fn,
	}, nil
}

func eventDecoder(event tmtypes.TMEventData) (interface{}, error) {
	switch t := event.(type) {
	case tmtypes.EventDataTx:
		// decode the signed Transaction and return `oneOf` the underlying Tx
		stx := &types.SignedTransaction{}
		if err := types.DecodeTx(t.Tx, stx); err != nil {
			return nil, err
		}

		tx := stx.Tx.GetOneOf()
		return tx, nil
	}
	return event, nil
}

func (s *Service) subscribeTM(ctx context.Context, query string) (*rpc.Subscription, error) {
	client, err := s.newClient()
	if err != nil {
		return nil, err
	}

	notifier, supported := rpc.NotifierFromContext(ctx)
	if !supported {
		return nil, rpc.ErrNotificationsUnsupported
	}

	events, closer, err := client.Subscribe(ctx, query)
	if err != nil {
		return nil, err
	}

	rpcSub := notifier.CreateSubscription()
	go func() {
		defer client.Stop() // nolint
		defer closer()

		for {
			select {
			case <-rpcSub.Err():
				return
			case <-notifier.Closed():
				return
			case e := <-events:
				dec, err := eventDecoder(e.Data)
				if err != nil {
					// as TM should return a valid transaction, this will never happen
					panic(err)
				}

				if err := notifier.Notify(rpcSub.ID, dec); err != nil {
					log.Printf("rpc: %+v", err)
				}
			}
		}
	}()

	return rpcSub, nil
}

/*
NewBlocks subscribes to new blocks on the Kosu blockchain.

_Method:_

-   `kosu_subscribe`

_Parameters:_

-   `newBlocks` - _string_

_Returns:_

-   `block` - _[`Block`](https://godoc.org/github.com/tendermint/tendermint/types#Block)_

#### Go example

```go
blocks := make(chan types.Block) // imported from github.com/tendermint/tendermint/types
ctx := context.Background()
sub, err := client.Subscribe(ctx, "kosu", blocks, "subscribe", "newBlocks")
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
	case blocks := <-ch:
		fmt.Printf("event: %+v", e)
	}
}
```

#### Example payload

```json
// request
{ "jsonrpc": "2.0", "method": "kosu_subscribe", "id": 123, "params": ["newBlocks"] }
```

```json
// response
{ "jsonrpc":"2.0","id":123,"result":"0x97cd66b222737445bc1695c0272619b6" }
{
  "jsonrpc": "2.0",
  "method": "kosu_subscription",
  "params": {
    "subscription": "0x97cd66b222737445bc1695c0272619b6",
    "result": {
      "block": {
        "header": {
          "version": {
            "block": 10,
            "app": 0
          },
          "chain_id": "kosu-chain-NwXIyG",
          "height": 13063,
          "time": "2019-08-06T19:02:57.903579795Z",
          "num_txs": 0,
          "total_txs": 394,
          "last_block_id": {
            "hash": "961E2ABA59C9C9C818A50D7ECC08F30E7ADEC57BBC0F9D03814A126489BF94C9",
            "parts": {
              "total": 1,
              "hash": "8451A4A410DC7FFA52B8F157AFC3444DDC8CF73020E655560D949E89AB1F68B6"
            }
          },
          "last_commit_hash": "3BAD2012CECD66D490E90344397690BB480347424321F663F6E38082CFE386DF",
          "data_hash": "",
          "validators_hash": "98224D5F42F0B541099BA4BE75CEFC0CDBF55B98F559C714629BFDC2CA5B8055",
          "next_validators_hash": "98224D5F42F0B541099BA4BE75CEFC0CDBF55B98F559C714629BFDC2CA5B8055",
          "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
          "app_hash": "8AF1D503866D3F93508B1F886E627DE77C253032A1C4E7ED8D57BA2AA8533B46",
          "last_results_hash": "",
          "evidence_hash": "",
          "proposer_address": "C8E9033B7C8DA8F309052DEC1CC1C8116C5781CB"
        },
        "data": {
          "txs": null
        },
        "evidence": {
          "evidence": null
        },
        "last_commit": {
          "block_id": {
            "hash": "961E2ABA59C9C9C818A50D7ECC08F30E7ADEC57BBC0F9D03814A126489BF94C9",
            "parts": {
              "total": 1,
              "hash": "8451A4A410DC7FFA52B8F157AFC3444DDC8CF73020E655560D949E89AB1F68B6"
            }
          },
          "precommits": [
            {
              "type": 2,
              "height": 13062,
              "round": 0,
              "block_id": {
                "hash": "961E2ABA59C9C9C818A50D7ECC08F30E7ADEC57BBC0F9D03814A126489BF94C9",
                "parts": {
                  "total": 1,
                  "hash": "8451A4A410DC7FFA52B8F157AFC3444DDC8CF73020E655560D949E89AB1F68B6"
                }
              },
              "timestamp": "2019-08-06T19:02:57.903579795Z",
              "validator_address": "C8E9033B7C8DA8F309052DEC1CC1C8116C5781CB",
              "validator_index": 0,
              "signature": "Hgp8s9zIJgPAFMUtXH38nz3c4WJi54tnzt7G5hB7CaP1i74HEKsKYePlcg4hx/M6GVBRz2GN9/iolD0CyLmJCA=="
            }
          ]
        }
      },
      "result_begin_block": {},
      "result_end_block": {
        "validator_updates": null
      }
    }
  }
}
```
*/
func (s *Service) NewBlocks(ctx context.Context) (*rpc.Subscription, error) {
	query := "tm.event='NewBlock'"
	return s.subscribeTM(ctx, query)
}

/*
NewOrders subscribes to new Order Transactions.

_Method:_

-   `kosu_subscribe`

_Parameters:_ None

_Returns:_

-   `Order Transaction` - _[`TransactionOrder`](https://godoc.org/github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types#TransactionOrder)_

#### Go Example

```go
orders := make(chan types.TransactionOrder) // imported from github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types
ctx := context.Background()
sub, err := client.Subscribe(ctx, "kosu", orders, "subscribe", "newOrders")
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
	case e := <-orders:
		fmt.Printf("event: %+v", e)
	}
}
```

#### Example payload

```json
// request
{ "jsonrpc": "2.0", "method": "kosu_subscribe", "id": 123, "params": ["newOrders"] }
```

```json
// response
{ "jsonrpc":"2.0","id":123,"result":"0x97cd66b222737445bc1695c0272619b6" }
{
  "jsonrpc": "2.0",
  "method": "kosu_subscription",
  "params": {
    "subscription": "0x97cd66b222737445bc1695c0272619b6",
    "result": {
	  "transaction_order": {
        "subContract": "0x38a4d7865b3f265093fcbf4d7bc5e7e00713c8e6",
        "maker": "0x7e8614e53cb79c7a5d95b957f1bcce291eab248d",
        "arguments": {
          "maker": [
            {
              "datatype": "address",
              "name": "signer"
            },
            {
              "datatype": "address",
              "name": "signerToken"
            },
            {
              "datatype": "uint",
              "name": "signerTokenCount"
            },
            {
              "datatype": "address",
              "name": "buyerToken"
            },
            {
              "datatype": "uint",
              "name": "buyerTokenCount"
            },
            {
              "datatype": "signature",
              "name": "signature",
              "signatureFields": [
                0,
                1,
                2,
                3,
                4
              ]
            }
          ],
          "taker": [
            {
              "datatype": "uint",
              "name": "tokensToBuy"
            }
          ]
        },
        "makerValues": {
          "signer": "0x7e8614e53cb79c7a5d95b957f1bcce291eab248d",
          "signerToken": "0x56613e252163DAd4276E8b4Cd34a4021eaA1B14B",
          "signerTokenCount": "1000",
          "buyer": "0xf72c35151f8c86a5ac73f213da8164df89b690b7",
          "buyerToken": "0x743102BD6fD1f9452cbF0512AA44041B52c81530",
          "buyerTokenCount": "1000",
          "signature": "0xbbc6600a2891b029d694027a6aed6a13e85e59ce4fcbed1210e66b5c1bbbb1ca19891490edf46877fb6a0ae548db3dc3dd83fa55a6f3c66596fe7f8740eb2c7e00"
        },
        "makerSignature": "0xbbc6600a2891b029d694027a6aed6a13e85e59ce4fcbed1210e66b5c1bbbb1ca19891490edf46877fb6a0ae548db3dc3dd83fa55a6f3c66596fe7f8740eb2c7e00",
        "posterSignature": "0x6c0684cb993dded088ea5e0bd9c5808c827a6bd2800beeaa9e1c4686049a16b30e2b0694e4c19647fb45c150e3b8e02ecd6f7a552099af98fec5c0c7d7ffb6d901"
      }
    }
  }
}
```
*/
func (s *Service) NewOrders(ctx context.Context) (*rpc.Subscription, error) {
	client, err := s.newClient()
	if err != nil {
		return nil, err
	}

	notifier, supported := rpc.NotifierFromContext(ctx)
	if !supported {
		return nil, rpc.ErrNotificationsUnsupported
	}

	query := "tm.event='NewBlock'"
	events, closer, err := client.Subscribe(ctx, query)
	if err != nil {
		return nil, err
	}

	rpcSub := notifier.CreateSubscription()
	blocks := make(chan *tmtypes.Block, 1024)
	go func() {
		defer client.Stop() // nolint
		defer close(blocks)
		defer closer()

		for {
			select {
			case <-ctx.Done():
				log.Printf("ctx.Err() = %+v\n", ctx.Err())
				return
			case <-rpcSub.Err():
				return
			case <-notifier.Closed():
				return
			case e := <-events:
				block := e.Data.(tmtypes.EventDataNewBlock).Block
				blocks <- block
			}
		}
	}()

	go func() {
		for block := range blocks {
			for _, tx := range block.Txs {
				stx := &types.SignedTransaction{}
				if err := types.DecodeTx(tx, stx); err != nil {
					continue
				}

				if order := stx.GetTx().GetOrder(); order != nil {
					if err := notifier.Notify(rpcSub.ID, order); err != nil {
						log.Printf("err = %+v\n", err)
					}
				}
			}
		}
	}()

	return rpcSub, nil
}

/*
NewRebalances subscribes to new Rebalance Transactions

_Method:_

-   `kosu_subscribe`

_Parameters:_

-   `newRebalances` - _string_

_Returns:_

-   `Rebalance Transaction` - _[`TransactionRebalance`](https://godoc.org/github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types#TransactionRebalance)_

#### Go Example

```go
rs := make(chan types.TransactionRebalance) // imported from github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types
ctx := context.Background()
sub, err := client.Subscribe(ctx, "kosu", orders, "subscribe", "newRebalances")
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
	case e := <- rs:
		fmt.Printf("event: %+v", e)
	}
}
```

#### Example payload

```json
// request
{ "jsonrpc": "2.0", "method": "kosu_subscribe", "id": 123, "params": ["newRebalances"] }
```

```json
// response
{ "jsonrpc": "2.0", "id": 123, "result": "0x579f7e1ede3d6af7b951cb28fd6779f0" }
{
  "jsonrpc": "2.0",
  "method": "kosu_subscription",
  "params": {
    "subscription":"0x579f7e1ede3d6af7b951cb28fd6779f0",
    "result": {
      "round_info": {
        "number": 5,
        "starts_at": 114,
        "ends_at": 124,
        "limit": 10
      }
    }
  }
}
{
  "jsonrpc": "2.0",
  "method": "kosu_subscription",
  "params": {
    "subscription":"0x579f7e1ede3d6af7b951cb28fd6779f0",
    "result": {
      "round_info": {
        "number": 6,
        "starts_at": 134,
        "ends_at": 144,
        "limit": 10
      }
    }
  }
}
```

*/
func (s *Service) NewRebalances(ctx context.Context) (*rpc.Subscription, error) {
	query := "tm.event='Tx' AND tags.tx.type='rebalance'"
	return s.subscribeTM(ctx, query)
}

/*
LatestHeight returns the height of the best known block.
The `latestHeight` method will return the integer height of the latest block committed to the blockchain.

_Method:_

-   `kosu_latestHeight`

_Parameters:_ None

_Returns:_

-   `latestHeight` - _int64_

#### cURL Example

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"kosu_latestHeight", "id": 1}' localhost:14341 --header 'Content-Type: application/json'
```

```json
{ "jsonrpc": "2.0", "id": 1, "result": 260 }
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

/*
AddOrders adds an array of Kosu orders to the network.

_Method:_

-   `kosu_addOrders`

_Parameters:_

-   `Order Transactions` - `Array`([TransactionOrder](https://godoc.org/github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types#TransactionOrder))

_Returns:_

-   `Orders Result` - [`AddOrdersResult`](https://godoc.org/github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/rpc#AddOrdersResult)

#### cURL example

```bash
curl -X POST localhost:14341 \
	--data '{"jsonrpc":"2.0", "id": 1, "method": "kosu_addOrders", "params": [[<PAYLOAD>]]}' \
	-H 'Content-Type: application/json'
```

```json
{
    "accepted": ["84977cca6134f03768494370cb6a7ba3884ddf3783e58f403dbf6a2ca50cea68"],
    "rejected": [
        {
            "order": "4cad310a0047a3d2dfec72a53d0cc13ea000ac674d76222a2b9334c833f2024b",
            "reason": "encoding/hex: odd length hex string"
        }
    ]
}
```

#### Payload example

```json
[
    {
        "subContract": "0xebe8fdf63db77e3b41b0aec8208c49fa46569606",
        "maker": "0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596",
        "arguments": {
            "maker": [
                { "datatype": "address", "name": "signer" },
                { "datatype": "address", "name": "signerToken" },
                { "datatype": "uint", "name": "signerTokenCount" },
                { "datatype": "address", "name": "buyerToken" },
                { "datatype": "uint", "name": "buyerTokenCount" },
                { "datatype": "signature", "name": "signature", "signatureFields": [0, 1, 2, 3, 4] }
            ],
            "taker": [{ "datatype": "uint", "name": "tokensToBuy" }]
        },
        "makerValues": {
            "signer": "0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596",
            "signerToken": "0xbFB972996fd7658099a95E6290e8B0fa46b9BDd5",
            "signerTokenCount": "1000",
            "buyer": "0xbcd1c49f4e54cca1a0a59ac21b7eb90f07970a3a",
            "buyerToken": "0x92cBc0Bec2121f55E84bC331f096b7dAAe5A5ddA",
            "buyerTokenCount": "1000",
            "signature": "0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300"
        },
        "makerSignature": "0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300",
        "posterSignature": "0xc3550b7ceab610e638dfb1b33e5cf7aaf9490854197328eadbe8ac049adef7510a07a0ea046fa1d410c5cc1048828152b9368a8d8925f8f0072192ebfe1bbb3101"
    }
]
```
*/
func (s *Service) AddOrders(orders []*types.TransactionOrder) (*AddOrdersResult, error) {
	result := &AddOrdersResult{}
	for _, order := range orders {
		res, err := s.abci.BroadcastTxSync(order)
		if err != nil {
			return result, err
		}

		hash := hex.EncodeToString(res.Hash)
		if res.Code != 0 {
			result.Rejected = append(result.Rejected, OrderRejection{
				Order:  hash,
				Reason: res.Log,
			})
		} else {
			result.Accepted = append(result.Accepted, hash)
		}
	}
	return result, nil
}

// OrderRejection represent an Order rejection where the Order field contains the hash of the Tx and Reason the error behind the rejection
type OrderRejection struct {
	Order  string `json:"order"`
	Reason string `json:"reason"`
}

// AddOrdersResult aggregates all the accepted and rejected Orders added by AddOrders method
type AddOrdersResult struct {
	Accepted []string         `json:"accepted"`
	Rejected []OrderRejection `json:"rejected"`
}

// newQueryError is used to mask ErrNotFound
func newQueryError(err error) error {
	if err != nil && err != abci.ErrNotFound {
		return err
	}
	return nil
}

/*
RoundInfo returns the current `RoundInfo`.
The `RoundInfo` object tracks rebalance round information.
It is used to maintain sync with the Ethereum chain,
which is used to mark the beginning and end of each rebalance round.

_Method:_

-   `kosu_roundInfo`

_Parameters:_ None

_Returns:_

-   `RoundInfo` - _[`RoundInfo`](https://godoc.org/github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types#RoundInfo)_

#### cURL example

```bash
curl -X POST localhost:14341 \
	--data '{"jsonrpc":"2.0", "id": 1, "method": "kosu_roundInfo"}' \
	-H 'Content-Type: application/json'
```

```json
{ "jsonrpc": "2.0", "id": 1, "result": { "number": 48, "starts_at": 2613, "ends_at": 2623, "limit": 10 } }
```

*/
func (s *Service) RoundInfo() (*types.RoundInfo, error) {
	v, err := s.abci.QueryRoundInfo()
	return v, newQueryError(err)
}

/*
QueryValidator returns a validator given its address.
Validator's address is case insensitive.

_Method:_

-   `kosu_queryValidator`

_Parameters:_

-   `address` - _string_

_Returns:_

-   `Validator` - _[`Validator`](https://godoc.org/github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types#Validator)_

#### cURL Example

```bash
curl -X POST localhost:14341 \
	--data '{"jsonrpc":"2.0", "id": 1, "method": "kosu_queryValidator", "params": ["e57a831e58cc03cf15f400c830a61fc1d53b3e03"]}' \
	-H 'Content-Type: application/json'
```

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "balance": "value: 0",
        "power": 10,
        "publicKey": "fcwoxUljKYF83A4ep6ZE7pMFSrLc/DFRkEjdUISg5Ys=",
        "firstVote": 2,
        "lastVoted": 1915,
        "lastProposed": 1916,
        "totalVotes": 1915,
        "active": true,
        "applied": true
    }
}
```
*/
func (s *Service) QueryValidator(addr string) (*types.Validator, error) {
	addr = strings.ToLower(addr)
	v, err := s.abci.QueryValidator(addr)
	return v, err
}

/*
Validators returns the full validator set

_Method:_

-   `kosu_validators`

_Parameters:_ None

_Returns:_

-   `Validator Set` - _`Array`([Validator](https://godoc.org/github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types#Validator))_

#### cURL example

```bash
curl -X POST localhost:14341 \
	--data '{"jsonrpc":"2.0", "id": 1, "method": "kosu_validators"}' \
	-H 'Content-Type: application/json'
```

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        {
            "balance": "value: 0",
            "power": 10,
            "publicKey": "fcwoxUljKYF83A4ep6ZE7pMFSrLc/DFRkEjdUISg5Ys=",
            "firstVote": 2,
            "lastVoted": 1931,
            "lastProposed": 1932,
            "totalVotes": 1931,
            "active": true,
            "applied": true
        }
    ]
}
```
*/
func (s *Service) Validators() ([]*types.Validator, error) {
	res, err := s.abci.Validators(nil)
	if err != nil {
		return nil, err
	}

	var vs []*types.Validator
	for _, r := range res.Validators {
		v, err := s.QueryValidator(r.Address.String())
		if err == nil && v != nil {
			vs = append(vs, v)
		}
	}
	return vs, nil
}

/*
QueryPoster returns a poster given its address.

_Method:_

-   `kosu_queryPoster`

_Parameters:_

-   `address` - _string_

_Returns:_

-   `Poster` - _[`Poster`](https://godoc.org/github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types#Poster)_

#### cURL Example

```bash
curl -X POST localhost:14341 \
	--data '{"jsonrpc":"2.0", "id": 1, "method": "kosu_queryPoster", "params": ["e57a831e58cc03cf15f400c830a61fc1d53b3e03"]}' \
	-H 'Content-Type: application/json'
```

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "balance": 10,
        "limit": 100
    }
}
```
*/
func (s *Service) QueryPoster(addr string) (*types.Poster, error) {
	v, err := s.abci.QueryPoster(addr)
	return v, newQueryError(err)
}

/*
TotalOrders returns the total number of orders in the system.
This number is incremented each time one submits a new valid order.

_Method:_

-   `kosu_totalOrders`

_Parameters:_ None

_Returns:_

-   `number` - _uint64_

*/
func (s *Service) TotalOrders() (uint64, error) {
	v, err := s.abci.QueryTotalOrders()
	return v, newQueryError(err)
}

/*
LatestOrders returns the latest orders in the store.
The maximum number of order returned is defined by the consensus parameter `OrdersLimit`.

_Method:_

-Parameters:_ None

_Returns:_

-   `Orders` - `Array`([Order](https://godoc.org/github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/store#Order))

*/
func (s *Service) LatestOrders() ([]*store.Order, error) {
	txs, err := s.abci.QueryLatestOrders()
	if err != nil {
		return nil, err
	}

	orders := make([]*store.Order, len(txs))
	for i, tx := range txs {
		order, err := store.NewOrderFromProto(&tx)
		if err != nil {
			return nil, err
		}
		orders[i] = order
	}
	return orders, nil
}

/*
NumberPosters returns the number of poster accounts

_Method:_

-   `kosu_numberPosters`

_Parameters:_ None

_Returns:_

-   `number` - _uint64_

*/
func (s *Service) NumberPosters() (uint64, error) {
	var num uint64

	if err := s.abci.Query("/store/poster/number", nil, &num); err != nil {
		return 0, newQueryError(err)
	}

	return num, nil
}

/*
RemainingLimit returns the sum of all the poster's limit.

_Method:_

-   `kosu_remainingLimit`

_Parameters:_ None

_Returns:_

-   `number` - _uint64_

*/
func (s *Service) RemainingLimit() (uint64, error) {
	var num uint64

	if err := s.abci.Query("/store/poster/remaininglimit", nil, &num); err != nil {
		return 0, newQueryError(err)
	}

	return num, nil
}
