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

-   **NodeClient**

## Index

### Constructors

-   [constructor](nodeclient.md#constructor)

### Properties

-   [NODE_ID_HASH_OFFSET](nodeclient.md#static-node_id_hash_offset)
-   [PUBLIC_KEY_LENGTH](nodeclient.md#static-public_key_length)

### Methods

-   [addOrders](nodeclient.md#addorders)
-   [getBlocks](nodeclient.md#getblocks)
-   [latestHeight](nodeclient.md#latestheight)
-   [latestOrders](nodeclient.md#latestorders)
-   [numberPosters](nodeclient.md#numberposters)
-   [queryPoster](nodeclient.md#queryposter)
-   [queryValidator](nodeclient.md#queryvalidator)
-   [remainingLimit](nodeclient.md#remaininglimit)
-   [roundInfo](nodeclient.md#roundinfo)
-   [subscribeToBlocks](nodeclient.md#subscribetoblocks)
-   [subscribeToOrders](nodeclient.md#subscribetoorders)
-   [subscribeToRebalances](nodeclient.md#subscribetorebalances)
-   [totalOrders](nodeclient.md#totalorders)
-   [unsubscribe](nodeclient.md#unsubscribe)
-   [validators](nodeclient.md#validators)
-   [publicKeyToNodeId](nodeclient.md#static-publickeytonodeid)

### Object literals

-   [DEFAULT_OPTIONS](nodeclient.md#static-default_options)

## Constructors

### constructor

\+ **new NodeClient**(`url`: string, `options?`: WebsocketProviderOptions): _[NodeClient](nodeclient.md)_

_Defined in [node_client.ts:70](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L70)_

Create a new NodeClient (`node`) via a connection to a Kosu node serving
the Kosu JSONRPC/WebSocket.

**`example`**

```typescript
// create a node client (with a request/connection timeout of 1s)
const node = new NodeClient("wss://localhost:14342", { timeout: 1000 });
```

**Parameters:**

| Name       | Type                     | Description                                             |
| ---------- | ------------------------ | ------------------------------------------------------- |
| `url`      | string                   | Full URL to the Kosu node's WebSocket JSONRPC endpoint. |
| `options?` | WebsocketProviderOptions | Options to provide the underlying `WebSocketProvider`.  |

**Returns:** _[NodeClient](nodeclient.md)_

## Properties

### `Static` NODE_ID_HASH_OFFSET

▪ **NODE_ID_HASH_OFFSET**: _number_ = 20

_Defined in [node_client.ts:40](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L40)_

Kosu validator node IDs are the first 20 bytes of the SHA-256 hash of the
public key.

---

### `Static` PUBLIC_KEY_LENGTH

▪ **PUBLIC_KEY_LENGTH**: _number_ = 32

_Defined in [node_client.ts:34](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L34)_

Kosu validator public key's are 32 bytes long.

## Methods

### addOrders

▸ **addOrders**(...`orders`: PostableOrder[]): _Promise‹OrderValidationResult[]›_

_Defined in [node_client.ts:102](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L102)_

See [`kosu_addOrders`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#addorders)

Submit poster-signed orders to the Kosu node to be subsequently proposed
to the network. In order for them to be accepted, they must have signatures
from valid posters who have bonded Kosu tokens.

See the `posterRegistry.registerTokens()` method to bond KOSU.

**Parameters:**

| Name        | Type            | Description                                           |
| ----------- | --------------- | ----------------------------------------------------- |
| `...orders` | PostableOrder[] | Orders to submit to the node as subsequent arguments. |

**Returns:** _Promise‹OrderValidationResult[]›_

Validation results from the Kosu node, and/or the transaction
ID's of the accepted orders.

---

### getBlocks

▸ **getBlocks**(...`heights`: number[]): _Promise‹KosuBlock[]›_

_Defined in [node_client.ts:114](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L114)_

See [`kosu_getBlocks`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#getBlocks)

Fetch an array of raw Kosu (Tendermint-produced) blocks for a given set of heights.

**Parameters:**

| Name         | Type     | Description                                     |
| ------------ | -------- | ----------------------------------------------- |
| `...heights` | number[] | The array of heights to fetch (rest parameter). |

**Returns:** _Promise‹KosuBlock[]›_

An array of the raw blocks for the requested heights.

---

### latestHeight

▸ **latestHeight**(): _Promise‹number›_

_Defined in [node_client.ts:126](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L126)_

See [`kosu_latestHeight`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#latestheight)

Get the height of the most recently committed and finalized Kosu block.

**Returns:** _Promise‹number›_

The most recent Kosu block number.

---

### latestOrders

▸ **latestOrders**(`page`: number, `perPage`: number): _Promise‹PostableOrder[]›_

_Defined in [node_client.ts:141](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L141)_

See [`kosu_latestOrders`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#latestOrders)

Fetch a paginated portion of the current in-state order book snapshot (recent orders).

If perPage and page aren't set, the default is to fetch the full order book (may be large).

**Parameters:**

| Name      | Type   | Default | Description                                          |
| --------- | ------ | ------- | ---------------------------------------------------- |
| `page`    | number | 0       | The page number (where each page has perPage items). |
| `perPage` | number | 0       | The number of orders to include on each page.        |

**Returns:** _Promise‹PostableOrder[]›_

An array of recent order based on the page and perPage parameter.

---

### numberPosters

▸ **numberPosters**(): _Promise‹number›_

_Defined in [node_client.ts:152](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L152)_

See [`kosu_numberPosters`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#numberposters)

Get the total number registered posters from the Kosu node.

**Returns:** _Promise‹number›_

The total number of poster accounts the node is tracking.

---

### queryPoster

▸ **queryPoster**(`address`: string): _Promise‹Poster›_

_Defined in [node_client.ts:164](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L164)_

See [`kosu_queryPoster`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#queryposter)

Get finalized (committed into current state) balance and order limit data
about a specified poster account.

**Parameters:**

| Name      | Type   |
| --------- | ------ |
| `address` | string |

**Returns:** _Promise‹Poster›_

Balance and order limit data for the specified poster account.

---

### queryValidator

▸ **queryValidator**(`nodeId`: string): _Promise‹Validator›_

_Defined in [node_client.ts:183](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L183)_

See [`kosu_queryValidator`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#queryvalidator)

Get finalized (committed into current state) information about a Kosu
validator node, identified by their node ID (also called Tendermint
address).

See `NodeClient.publicKeyToNodeId()` to converting a validator's encoded
public key to it's node ID.

**Parameters:**

| Name     | Type   |
| -------- | ------ |
| `nodeId` | string |

**Returns:** _Promise‹Validator›_

Information about the requested validator (see `Validator`).

---

### remainingLimit

▸ **remainingLimit**(): _Promise‹number›_

_Defined in [node_client.ts:198](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L198)_

See [`kosu_remainingLimit`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#remaininglimit)

Get the total number of orders that _may_ be posted this period. It is
equal to the sum of the unutilized bandwidth allocation for each poster
account for the current rebalance period.

**Returns:** _Promise‹number›_

The unutilized order bandwidth for the current period.

---

### roundInfo

▸ **roundInfo**(): _Promise‹RoundInfo›_

_Defined in [node_client.ts:210](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L210)_

See [`kosu_roundInfo`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#roundinfo)

Get the current rebalance period number, starting Ethereum block, ending
Ethereum block, and the maximum number of orders for the period.

**Returns:** _Promise‹RoundInfo›_

Information about the current rebalance period.

---

### subscribeToBlocks

▸ **subscribeToBlocks**(`cb`: function): _Promise‹string›_

_Defined in [node_client.ts:266](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L266)_

Read about Kosu subscriptions [here](https://docs.kosu.io/go-kosu/kosu_rpc.html#subscriptions).

See [`kosu_subscribe` for topic `newBlocks`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#newblocks)

Subscribe to new block events, and be updated with the full Tendermint block
after each successful commit.

**Parameters:**

▪ **cb**: _function_

A callback function to handle new rebalance information.

▸ (`block`: any): _void_

**Parameters:**

| Name    | Type |
| ------- | ---- |
| `block` | any  |

**Returns:** _Promise‹string›_

A UUID that can be used to cancel the new subscription (see `node.unsubscribe()`).

---

### subscribeToOrders

▸ **subscribeToOrders**(`cb`: function): _Promise‹string›_

_Defined in [node_client.ts:251](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L251)_

Read about Kosu subscriptions [here](https://docs.kosu.io/go-kosu/kosu_rpc.html#subscriptions).

See [`kosu_subscribe` for topic `newOrders`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#neworders)

Subscribe to order transaction events, and be udpdated with an array of new
orders each time they are included in a Kosu block.

**Parameters:**

▪ **cb**: _function_

A callback function to handle each array of new orders.

▸ (`order`: PostableOrder): _void_

**Parameters:**

| Name    | Type          |
| ------- | ------------- |
| `order` | PostableOrder |

**Returns:** _Promise‹string›_

A UUID that can be used to cancel the new subscription (see `node.unsubscribe()`).

---

### subscribeToRebalances

▸ **subscribeToRebalances**(`cb`: function): _Promise‹string›_

_Defined in [node_client.ts:281](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L281)_

Read about Kosu subscriptions [here](https://docs.kosu.io/go-kosu/kosu_rpc.html#subscriptions).

See [`kosu_subscribe` for topic `newRebalances`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#newrebalances)

Subscribe to rebalance events, and be updated with each new rebalance round
information (starting block, ending block, etc.).

**Parameters:**

▪ **cb**: _function_

A callback function to handle new rebalance information.

▸ (`roundInfo`: RoundInfo): _void_

**Parameters:**

| Name        | Type      |
| ----------- | --------- |
| `roundInfo` | RoundInfo |

**Returns:** _Promise‹string›_

A UUID that can be used to cancel the new subscription (see `node.unsubscribe()`).

---

### totalOrders

▸ **totalOrders**(): _Promise‹number›_

_Defined in [node_client.ts:223](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L223)_

See [`kosu_totalOrders`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#totalorders)

Get the total number of orders that have been processed by the network
since genesis.

**Returns:** _Promise‹number›_

The total number of orders posted since network genesis.

---

### unsubscribe

▸ **unsubscribe**(`subscriptionId`: string): _Promise‹void›_

_Defined in [node_client.ts:290](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L290)_

Cancel an active subscription.

**Parameters:**

| Name             | Type   | Description                             |
| ---------------- | ------ | --------------------------------------- |
| `subscriptionId` | string | The UUID of the subscription to cancel. |

**Returns:** _Promise‹void›_

---

### validators

▸ **validators**(): _Promise‹Validator[]›_

_Defined in [node_client.ts:235](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L235)_

See [`kosu_validators`.](https://docs.kosu.io/go-kosu/kosu_rpc.html#validators)

Get finalized (committed into current state) information about the current
full validator set. Returns the full set (not paginated).

**Returns:** _Promise‹Validator[]›_

Information about all active Kosu validators (see `Validator`).

---

### `Static` publicKeyToNodeId

▸ **publicKeyToNodeId**(`publicKey`: string): _string_

_Defined in [node_client.ts:53](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L53)_

Convert a Kosu/Tendermint public key to the corresponding node ID.

The node ID is the first 20 bytes of the SHA-256 hash of the public key.

**Parameters:**

| Name        | Type   | Description                          |
| ----------- | ------ | ------------------------------------ |
| `publicKey` | string | Base64-encoded validator public key. |

**Returns:** _string_

The node ID (tendermint "address") for that public key.

## Object literals

### `Static` DEFAULT_OPTIONS

### ▪ **DEFAULT_OPTIONS**: _object_

_Defined in [node_client.ts:29](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L29)_

The default options specify a connection timeout of 3s, all other defaults
are inherited from `WebsocketProviderOptions`.

### timeout

• **timeout**: _number_ = 3000

_Defined in [node_client.ts:29](https://github.com/ParadigmFoundation/kosu-monorepo/blob/26639247/packages/kosu-node-client/src/node_client.ts#L29)_
