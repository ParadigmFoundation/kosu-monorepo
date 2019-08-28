# Tool: `network-explorer`

The network summary API provides a simple WebSocket subscription for various statistics about the Paradigm OrderStream network and token system. It also provides a set of simple REST methods to assist the creation of a network summary front-end.

## Specification

The primary usage of this tool is the WebSocket API that push various blockchain and network data over a client <> server connection for each connected party. The schematic of the output object is shown and described below.

## Usage

_WebSocket API usage subject to change._

The `network-summary-api` server is designed to be as simple as possible. The application exposes a WebSocket server on a port defined by the `PORT` environment variable.

When a client connects to the server, **the server immediately starts pushing API data to the client with a format [described here](#api-schema)** (after sending a [one-tme connection message](#connection-message) with a `subscriptionId`). This is referred to as the **subscription** at points in this document.

The server also allows two types of request/response methods for accessing users token balances and rate limits. These requests ([described here](#request-format)) should be sent over the same WebSocket connection as the subscription, and should use a unique client-generated `id` string. The client-provided `id` will be returned with successful request responses (along with a 0 OK code) so the client listen for the correct response message, and filter it from the stream of subscription messages.

In the future, the subscription may need to be initiated with a client request.

### Connection message

Upon successful connection to the server, the server pushes a one-time "connection" message, with the subscription ID included in all future subscription messages. Keep in mind this subscription ID should be used to filter subscription messages from request-response messages.

```js
// => sent to client (immediately upon successful connect)
{
    "message": "18706ca5-a7d7-4781-b027-acf6c52c2cc6"
}
```

### Request format

The server accepts two query methods: `balance` and `limit`. These methods can be used by the browser client to request data about a users account via their Ethereum address (loaded via MetaMask on the front-end).

Use the same socket connection as the subscription to send messages of the following format:

```js
/* === BALANCE REQUEST/RESPONSE EXAMPLE ===*/

// <= sent to server
{
    "id": "any-client-provided-string",
    "method": "balance",
    "param": "0x8b366a3d4e46ac5406f12766ad33e6482ce4f081"
}

// => sent to client
{
    "id": "any-client-provided-string",
    "code": 0,
    "data": "108691111111111111111"
}

/* === LIMIT REQUEST/RESPONSE EXAMPLE ===*/

// <= sent to server
{
    "id": "myId",
    "method": "limit",
    "param": "0x8b366a3d4e46ac5406f12766ad33e6482ce4f081"
}

// => sent to client
{
    "id": "myId",
    "code": 0,
    "data": "74891"
}

/* === BAD REQUEST/RESPONSE EXAMPLE ===*/

// <= sent to server (malformed request)
{
    "id": "anyId",
    "method": "limit"
}

// => sent to client (error response example, no id)
{
    "id": null,
    "code": 1,
    "data": "missing required parameters"
}
```

For the user's `coinbase` (Ethereum address, pulled via MetaMask injection), two requests will need to be made, exactly like the `balance` and `limit` examples above.

The `limit` method returns an integer that will be rendered in the `"Your Bandwidth Limit"` box on the front-end (see [design mockup](./mockup.png)) representing the number of orders a user may post in a given period.

The `balance` method returns the number of DIGM tokens a user has (unlocked, un-staked) in their wallet (Ethereum address). It will return a value in the smallest unit of DIGM (a `wei` = 1*10^-18 DIGM) so a conversion will need to be made (multiply by `1*10^18`). For more info, Google "wei to ether conversion".

The balance should be rendered in the top-right corner of the screen (see mockup) if present, or show 0 for a user with no balance.

### Browser example

Very simple example that demonstrates connection and parsing various messages. Primarily useful to demonstrate boolean conditions for various parsed message structures.

```js
const ws = new WebSocket("wss://network-api.paradigm.market/");

// will be sent upon connect as `message`, and in each subscription as `id`
let subId;

ws.onopen = () => {
    ws.onmessage = msg => {
        const data = msg.data.toString();
        const parsed = JSON.parse(data);
        const { id, code, data, message } = parsed;

        /*
         in this case, this is the first message and the server is telling
         us our subscription id
        */
        if (message) {
            // store our subId for future use
            subId = message.toString();

            // in this case, `data` is subscription data (see below)
        } else if (subId && id === subId && data) {
            // handle subscription data here
            // in this case, the server has encountered an error processing a subscription
        } else if (subId && id === subId && !data) {
            // ignore this message and don't update displayed data
            // in this case `data` is an OK response to a client request
        } else if (subId && id !== subId && data && code === 0) {
            // handle server response message here
            // the `id` field will be the same `id` that was included in the request
            /*
         in this case, an error was encountered processing a client request
         and the method has failed.
        */
        } else if (subId && !id && data && code === 1) {
            // the `data` field may contain error information
            // unexpected unknown case
        } else {
            // ignore?
        }
    };
};
```

### API Schema

Structure of the stringified object streamed to each connection, updated upon each new block.

For each field there is a number and corresponding [description below](#annotations) that provides more information about each field.

The numbers in the code snippet below also match the [annotated mockup](./mockup.png) showing where each field rendered on the front-end should source data.

_**Note:** every value (except for parent objects) is sent as a string, so conversions must be made client-side. Keep in mind overflows/loss-of-precision when dealing with token balances._

```js
// js-flavored JSON with annotations (see below)

{
    /*
     A unique `ID` string is provided by the server when a client connection is
     initiated. It can be used to filter subscription messages (like these) from
     request/response messages used to query a users address (from MetaMask) for
     their token balances and OS rate limits.
    */

    "id": "18706ca5-a7d7-4781-b027-acf6c52c2cc6",

    /*
     The data object contains all API data. Mostly, each field is updated every
     block, even if the data does not change. If the server encounters an error
     with a particular query, it will omit that field, so the client should
     keep a cache and not over-write displayed values with `null` or `undefined`
     even if that is the value returned by the API. This will be fixed in future
     server versions.
    */
    "data": {
        "token": {
            "total_supply": "111111111",        // 1
            "price": "0"                        // 2
        },
        "bandwidth": {
            "total_limit": "75000",             // 3
            "total_orders": "1210351",          // 4
            "remaining_limit": "73125",         // 5
            "number_posters": "1514",           // 6
            "sec_to_next_period": "60",         // 7
            "current_eth_block": "5230840",     // 8
            "period_end_eth_block": "5230844",  // 9
            "rebalance_period_number": "27940"  // 10
        },
        "network": {
            "block_height": "1327413",                  // 11
            "last_block_time": "1551727994832",         // 12
            "avg_block_interval": "1492",               // 13
            "number_validators": "32",                  // 14
            "total_validator_stake": "65314806500000",  // 15
            "total_poster_stake": "421806500030"        // 16
        },
        "transactions": [                   // 17
            // ...
            {
                "order_id": "...",          // 17 (a)
                "poster_address": "0x....", // 17 (b)
                "maker_address": "0x...",   // 17 (c)
                "order_type": "0x"          // 17 (d)
            }
            // ...
        ],
        "validators": [                     // 18
            // ...
            {
                "public_key": "...",        // 18 (a)
                "stake": "1345600000000",   // 18 (b)
                "reward": "1200000000",     // 18 (c)
                "uptime_percent": "11",     // 18 (d)
                "first_block": "45102",     // 18 (e)
                "last_voted": "1327413",    // 18 (f)
                "power":"10"                // 18 (g)
            }
            // ...
        ]
    }
}
```

### Annotations

_*Note: All values are strings (double-quoted) in the JSON sent to the client with each new block.*_ Convert to JS `number` type in the browser where necessary.

1. **DIGM token supply** (`data.token.total_supply`): the total number of DIGM tokens in circulation. Keep in mind this number will be in units of `wei` (smallest divisible unit) so for the actual "quantity" of full DIGM tokens, this value will need to be multiplied by `1 * 10^18`.

1. **DIGM token price** (`data.token.price`): there is currently no concept of DIGM "price", so for now, this value can be ignored.

1. **Total limit** (`data.bandwidth.total_limit`): this value is the current network-agreed-upon value for the total number of `order` transactions that can be accepted per rebalance period. It is a consensus-critical parameter that is unlikely to change very often.

1. **Total orders** (`data.bandwidth.total_orders`): this incremental value simply counts the total number of `order` transactions accepted on the network since genesis. It is independent of any individual period.

1. **Remaining limit** (`data.bandwidth.remaining_limit`): the number of remaining (unused) allocated orders for the current period. It will count down during each period as orders are accepted, and will reset to the `total_limit` upon each rebalance event.

1. **Number of posters** (`data.bandwidth.number_posters`): the total number of `poster` accounts; the number of addresses with DIGM registered to post order's to the OS network.

1. **Seconds to next period** (`data.bandwidth.sec_to_next_period`): a (very) rough estimation of the number of seconds to the next rebalance period. Taken by counting the number of Ethereum blocks until the next period, multiplied by the average Ethereum block-time.

1. **Current Ethereum block** (`data.bandwidth.current_eth_block`): the best-known (highest) Ethereum block number. Updated each time an OrderStream block is committed.

1. **Period end Ethereum block** (`data.bandwidth.period_end_eth_block`): the Ethereum block number at which the current rebalance period ends.

1. **Rebalance period number** (`data.bandwidth.rebalance_period_number`): an incremental counter that tracks the number of rebalance periods that have occurred. Displays the number of the currently active period (not the last completed).

1. **Block height** (`data.network.block_height`): updates with each new committed block, the `block_height` increases by 1. It tracks the current height of the OrderStream blockchain.

1. **Last block time** (`data.network.last_block_time`): the UNIX timestamp (in milliseconds) of the most recently committed block.

1. **Average interval** (`data.network.avg_block_interval`): the `average_block_interval` tracks the arithmetic moving average (over a server-configurable number of blocks) of the interval in milliseconds between each block. Commonly referred to as the "block-time", it can be shown in seconds by dividing the number by 1000.

1. **Validator counter** (`data.network.number_validators`): simply tracks the number of validators in the active validator set. It will change only when a new validator is added, or a current one is removed via governance processes.

1. **Total validator stake** (`data.network.total_validator_stake`): the total number of DIGM (in `wei`) staked in the `ValidatorRegistry` contract by active validators. Also an important metric for determining network security and value.

1. **Total poster stake** (`data.network.total_poster_stake`): the total number of DIGM (in `wei`) staked in the `PosterRegistry` contract by poster accounts.

1. **Transactions** (`data.transactions`): an array of objects (defined below) with some data representing the most recent 20 order transactions from the network.

    a. **Order ID** (`data.transactions[N].order_id`): a hash of the Paradigm order object, used to identify orders.

    b. **Poster address** (`data.transactions[N].poster_address`): the Ethereum address of the `poster` entity who signed and submitted the order.

    c. **Maker address** (`data.transactions[N].maker_address`): the Ethereum address of the `maker` entity who originated the order message.

    d. **Order type** (`data.transactions[N].order_type`): if the `subContract` for a given order is known, the `order_type` field will be a short string of the name of the settlement logic (such as "0x", or "Dharma") and will be `null` if unknown.

1. **Validators** (`data.validators`): an array of objects (defined below) for each active validator on the network.

    a. **Public Key** (`data.validators[N].public_key`): the validators active tendermint public key, which corresponds to a current validating private key. Hashed in multiple ways to generate `node_id`, etc. Also used to query the `ValidatorRegistry` contract.

    b. **Stake** (`data.validators[N].stake`): a specific validators DIGM stake (in `wei`) currently held in the `ValidatorRegistry` contract.

    c. **Reward** (`data.validators[N].reward`): the number of DIGM tokens (in `wei`) the validator has specified to receive (or burn, if negative) for each reward period.

    d. **Uptime percent** (`data.validators[N].uptime_percent`): a number between 0 and 100 that represents that validators uptime: the percentage of time they have been online (voting on blocks) since they were added as a validator.

    e. **First block** (`data.validators[N].first_block`): the height of the first OrderStream block that a given validator voted on. Used as, or to calculate a validators "age" in the network.

    f. **Last voted** (`data.validators[N].last_voted`): the height of OrderStream network at which a given validator voted (or proposed) a block.

    g. **Vote power** (`data.validators[N].power`): the vote power the validator has on the Tendermint chain. Also affects how often a given validator is selected as block proposer.

# Develop

The actual `server` implementation is a WIP. To run for development purposes, set the following environment variables:

```bash
# tcp port to bind ws server to
PORT=

# order stream JSONRPC url to source data from
ORDERSTREAM_NODE_URL=""

# number of blocks to average block interval over
AVERAGE_OVER=50

# web3 provider URL (to support Ethereum queries)
WEB3_URL=""
```

1. Clone with `git clone git@github.com:ParadigmFoundation/network-explorer`

1. Set environment vars described above (or place in `.env` file)

1. Build with `yarn build`

1. Start with `yarn start`

_A hosted version of this server will be deployed soon, and its URL included here._

# Notes

-   Values should be cached by the client (or stored in the DOM) and only updated when necessary
-   Error messages will not have an `id` field
-   Error messages send as responses to requests will have a `code` set to `0`
-   Reach out to `henry@paradigm.market` with API difficulties
