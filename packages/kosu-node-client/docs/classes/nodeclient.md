[Kosu Node Client](../README.md) › [Globals](../globals.md) › [NodeClient](nodeclient.md)

# Class: NodeClient

A simple JSONRPC/WebSocket client for the `go-kosu` JSONRPC-API. Supports the
full Kosu JSONRPC, including subscriptions.

It is built on the [web3](https://www.npmjs.com/package/web3) `WebSocketProvider`
JSONRPC client, through a more desirable fork provided by [0x.](https://0x.org)
As such, it can be configured with the same options supported by the underlying
client.

It must be initialized with the URL of a `go-kosu` node serving the JSONRPC
over WebSocket.

View the Kosu RPC documentation [here.](https://docs.kosu.io/go-kosu/kosu_rpc.html)

## Hierarchy

* **NodeClient**

## Index

### Constructors

* [constructor](nodeclient.md#constructor)

### Properties

* [NODE_ID_HASH_OFFSET](nodeclient.md#static-node_id_hash_offset)
* [PUBLIC_KEY_LENGTH](nodeclient.md#static-public_key_length)

### Methods

* [addOrders](nodeclient.md#addorders)
* [latestHeight](nodeclient.md#latestheight)
* [numberPosters](nodeclient.md#numberposters)
* [queryPoster](nodeclient.md#queryposter)
* [queryValidator](nodeclient.md#queryvalidator)
* [remainingLimit](nodeclient.md#remaininglimit)
* [roundInfo](nodeclient.md#roundinfo)
* [subscribeToBlocks](nodeclient.md#subscribetoblocks)
* [subscribeToOrders](nodeclient.md#subscribetoorders)
* [subscribeToRebalances](nodeclient.md#subscribetorebalances)
* [totalOrders](nodeclient.md#totalorders)
* [unsubscribe](nodeclient.md#unsubscribe)
* [validators](nodeclient.md#validators)
* [publicKeyToNodeId](nodeclient.md#static-publickeytonodeid)

### Object literals

* [DEFAULT_OPTIONS](nodeclient.md#static-default_options)

## Constructors

###  constructor

\+ **new NodeClient**(`url`: string, `options?`: WebsocketProviderOptions): *[NodeClient](nodeclient.md)*

*Defined in [node_client.ts:69](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L69)*

Create a new NodeClient (`node`) via a connection to a Kosu node serving
the Kosu JSONRPC/WebSocket.

**`example`** 
```typescript
// create a node client (with a request/connection timeout of 1s)
const node = new NodeClient("wss://localhost:14342", { timeout: 1000 });
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`url` | string | Full URL to the Kosu node's WebSocket JSONRPC endpoint. |
`options?` | WebsocketProviderOptions | Options to provide the underlying `WebSocketProvider`. |

**Returns:** *[NodeClient](nodeclient.md)*

## Properties

### `Static` NODE_ID_HASH_OFFSET

▪ **NODE_ID_HASH_OFFSET**: *number* = 20

*Defined in [node_client.ts:39](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L39)*

Kosu validator node IDs are the first 20 bytes of the SHA-256 hash of the
public key.

___

### `Static` PUBLIC_KEY_LENGTH

▪ **PUBLIC_KEY_LENGTH**: *number* = 32

*Defined in [node_client.ts:33](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L33)*

Kosu validator public key's are 32 bytes long.

## Methods

###  addOrders

▸ **addOrders**(...`orders`: PostableOrder[]): *Promise‹OrderValidationResult[]›*

*Defined in [node_client.ts:101](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L101)*

See [`kosu_addOrders`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#addorders)

Submit poster-signed orders to the Kosu node to be subsequently proposed
to the network. In order for them to be accepted, they must have signatures
from valid posters who have bonded Kosu tokens.

See the `posterRegistry.registerTokens()` method to bond KOSU.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...orders` | PostableOrder[] | Orders to submit to the node as subsequent arguments. |

**Returns:** *Promise‹OrderValidationResult[]›*

Validation results from the Kosu node, and/or the transaction
ID's of the accepted orders.

___

###  latestHeight

▸ **latestHeight**(): *Promise‹number›*

*Defined in [node_client.ts:112](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L112)*

See [`kosu_latestHeight`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#latestheight)

Get the height of the most recently committed and finalized Kosu block.

**Returns:** *Promise‹number›*

The most recent Kosu block number.

___

###  numberPosters

▸ **numberPosters**(): *Promise‹number›*

*Defined in [node_client.ts:123](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L123)*

See [`kosu_numberPosters`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#numberposters)

Get the total number registered posters from the Kosu node.

**Returns:** *Promise‹number›*

The total number of poster accounts the node is tracking.

___

###  queryPoster

▸ **queryPoster**(`address`: string): *Promise‹Poster›*

*Defined in [node_client.ts:135](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L135)*

See [`kosu_queryPoster`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#queryposter)

Get finalized (committed into current state) balance and order limit data
about a specified poster account.

**Parameters:**

Name | Type |
------ | ------ |
`address` | string |

**Returns:** *Promise‹Poster›*

Balance and order limit data for the specified poster account.

___

###  queryValidator

▸ **queryValidator**(`nodeId`: string): *Promise‹Validator›*

*Defined in [node_client.ts:154](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L154)*

See [`kosu_queryValidator`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#queryvalidator)

Get finalized (committed into current state) information about a Kosu
validator node, identified by their node ID (also called Tendermint
address).

See `NodeClient.publicKeyToNodeId()` to converting a validator's encoded
public key to it's node ID.

**Parameters:**

Name | Type |
------ | ------ |
`nodeId` | string |

**Returns:** *Promise‹Validator›*

Information about the requested validator (see `Validator`).

___

###  remainingLimit

▸ **remainingLimit**(): *Promise‹number›*

*Defined in [node_client.ts:170](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L170)*

See [`kosu_remainingLimit`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#remaininglimit)

Get the total number of orders that _may_ be posted this period. It is
equal to the sum of the unutilized bandwidth allocation for each poster
account for the current rebalance period.

**Returns:** *Promise‹number›*

The unutilized order bandwidth for the current period.

___

###  roundInfo

▸ **roundInfo**(): *Promise‹RoundInfo›*

*Defined in [node_client.ts:182](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L182)*

See [`kosu_roundInfo`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#roundinfo)

Get the current rebalance period number, starting Ethereum block, ending
Ethereum block, and the maximum number of orders for the period.

**Returns:** *Promise‹RoundInfo›*

Information about the current rebalance period.

___

###  subscribeToBlocks

▸ **subscribeToBlocks**(`cb`: function): *Promise‹string›*

*Defined in [node_client.ts:238](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L238)*

Read about Kosu subscriptions [here](https://docs.kosu.io/go-kosu/kosu_rpc.html#subscriptions).

See [`kosu_subscribe` for topic `newBlocks`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#newblocks)

Subscribe to new block events, and be updated with the full Tendermint block
after each successful commit.

**Parameters:**

▪ **cb**: *function*

A callback function to handle new rebalance information.

▸ (`block`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`block` | any |

**Returns:** *Promise‹string›*

A UUID that can be used to cancel the new subscription (see `node.unsubscribe()`).

___

###  subscribeToOrders

▸ **subscribeToOrders**(`cb`: function): *Promise‹string›*

*Defined in [node_client.ts:223](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L223)*

Read about Kosu subscriptions [here](https://docs.kosu.io/go-kosu/kosu_rpc.html#subscriptions).

See [`kosu_subscribe` for topic `newOrders`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#neworders)

Subscribe to order transaction events, and be udpdated with an array of new
orders each time they are included in a Kosu block.

**Parameters:**

▪ **cb**: *function*

A callback function to handle each array of new orders.

▸ (`order`: PostableOrder): *void*

**Parameters:**

Name | Type |
------ | ------ |
`order` | PostableOrder |

**Returns:** *Promise‹string›*

A UUID that can be used to cancel the new subscription (see `node.unsubscribe()`).

___

###  subscribeToRebalances

▸ **subscribeToRebalances**(`cb`: function): *Promise‹string›*

*Defined in [node_client.ts:253](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L253)*

Read about Kosu subscriptions [here](https://docs.kosu.io/go-kosu/kosu_rpc.html#subscriptions).

See [`kosu_subscribe` for topic `newRebalances`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#newrebalances)

Subscribe to rebalance events, and be updated with each new rebalance round
information (starting block, ending block, etc.).

**Parameters:**

▪ **cb**: *function*

A callback function to handle new rebalance information.

▸ (`roundInfo`: RoundInfo): *void*

**Parameters:**

Name | Type |
------ | ------ |
`roundInfo` | RoundInfo |

**Returns:** *Promise‹string›*

A UUID that can be used to cancel the new subscription (see `node.unsubscribe()`).

___

###  totalOrders

▸ **totalOrders**(): *Promise‹number›*

*Defined in [node_client.ts:195](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L195)*

See [`kosu_totalOrders`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#totalorders)

Get the total number of orders that have been processed by the network
since genesis.

**Returns:** *Promise‹number›*

The total number of orders posted since network genesis.

___

###  unsubscribe

▸ **unsubscribe**(`subscriptionId`: string): *Promise‹void›*

*Defined in [node_client.ts:262](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L262)*

Cancel an active subscription.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`subscriptionId` | string | The UUID of the subscription to cancel.  |

**Returns:** *Promise‹void›*

___

###  validators

▸ **validators**(): *Promise‹Validator[]›*

*Defined in [node_client.ts:207](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L207)*

See [`kosu_validators`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#validators)

Get finalized (committed into current state) information about the current
full validator set. Returns the full set (not paginated).

**Returns:** *Promise‹Validator[]›*

Information about all active Kosu validators (see `Validator`).

___

### `Static` publicKeyToNodeId

▸ **publicKeyToNodeId**(`publicKey`: string): *string*

*Defined in [node_client.ts:52](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L52)*

Convert a Kosu/Tendermint public key to the corresponding node ID.

The node ID is the first 20 bytes of the SHA-256 hash of the public key.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | string | Base64-encoded validator public key. |

**Returns:** *string*

The node ID (tendermint "address") for that public key.

## Object literals

### `Static` DEFAULT_OPTIONS

### ▪ **DEFAULT_OPTIONS**: *object*

*Defined in [node_client.ts:28](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L28)*

The default options specify a connection timeout of 3s, all other defaults
are inherited from `WebsocketProviderOptions`.

###  timeout

• **timeout**: *number* = 3000

*Defined in [node_client.ts:28](https://github.com/ParadigmFoundation/kosu-monorepo/blob/75a4fa15/packages/kosu-node-client/src/node_client.ts#L28)*
