# Tool: `order-server`

The `order-server` is a simple order indexer for 0x orders relayed through the Kosu network, or a standalone Kosu node (see [`go-kosu`](../go-kosu)).

## Overview

The server opens a connection to a Kosu JSONRPC/WebSocket API server and subscribes to new order messages, filtering out non-0x orders.

It adds all 0x orders to a MySQL database and provides a REST API (see below) for querying order's based on a currency pair, maker address, or a known order ID. 

## Usage

Build, run, and deploy the `order-server`.

### Testing

Run in development with `docker-compose` and the supplied `docker-compose.yaml` file. Fill in the missing environment variables, and start with the following.

```bash
docker-compose up --build -d
```

### Development

Build the TypeScript source:

```bash
yarn build
```

Start the API server and subscription connection (change environment variable as necessary):
```
KOSU_JSONRPC_URL=ws://localhost:14342 yarn start
```

### Production

Load a Docker image built from the supplied `Dockerfile`, configure remote MySQL (or MariaDB) server, and start with `docker run` (must supply necessary environment variables with the `-e` or `--env=` flag).

## API Reference

Reference for the available methods from the `order-server` indexer.

### GET `/search`

Load and paginate an order-book snapshot of quotes rom the Kosu network by supplying a `baseAsset` address, `quoteAsset` address, and a `side` (bid/ask).

The returned quote snapshots include `orderId` values which can be used to load the full executable order with the [`/order` method.](#order-by-id)

#### Request format
- **API Endpoint:** `/search`
- **Query Parameters:**

    | Name | Required | Default | Description |
    | :--: | :------: | :-----: | :---------- |
    |`baseAsset`|`true`|-|Base asset token address.|
    |`quoteAsset`|`true`|-|Quote asset token address.|
    |`side`|`true`|-|Specify to retrieve `bid` or `ask` orders for the pair.|
    |`page`|`false`|`1`| The page number to retrieve (based on `perPage`).| 
    |`perPage`|`false`|`10`|The number of order stubs to load per page.|
- **Example:**
    ```bash
    curl 'localhost:8000/search?baseAsset=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2&quoteAsset=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359&side=ask&perPage=2'
    ```
#### Response format
- **Headers:**
    - Content-Type: `application/json`
- **Body:**
    ```json
    {
        "side": "ask",
        "quoteAssetAddress": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
        "baseAssetAddress": "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359", 
        "page": 1,
        "perPage": 2,
        "quotes": [
            {
                "price": "0.00000421",
                "size": "534680005130000000",
                "expiration": "1561496835",
                "orderId": "0x012761a3ed31b43c8780e905a260a35faefcc527be7516aa11c0256729b5b351bc33"
            },
            {
                "price": "216249200000000000",
                "size": "53468000513000000000",
                "expiration": "1561497137",
                "orderId": "0x013842a3ed31b43c8780e905a260a35faefcc527be7516aa11c0256729b5b3518891"
            }
        ]
    }
    ```
- **Notes:**
    - Expiration times are UNIX timestamps (seconds).
    - Prices and sizes (`price` and `size`) are in base units (wei) of the quote asset.
    - Prices and order sizes should be converted to `BigNumbers` for storage/processing (for precision).
    - The `orderId` for an quote can be used in the [`/order`](#order-by-id) method to get the full order.

### GET `/order`
Load a full 0x order object from the Kosu network, provided an `orderId` string.

#### Request format
- **API Endpoint:** `/order`
- **HTTP Method:** `GET`
- **Query Parameters:**

    | Name | Required | Default | Description |
    |:---: | :------: | :-----: | :---------- |
    |`id`| `true` | - | The hex-encoded transaction ID of the order to fetch.|
- **Example:**
    ```bash
    curl 'https://search.zaidan.io/api/v1/order?id=0x3b5d97f1a8d0eb833fe1954f87ec3e8099a1d012f5aac397c987b414060546af'
    ```

#### Response format
- **Headers:**
    - Content-Type: `application/json`
- **Body:**
    ```json
    {
        "id": "0x3b5d97f1a8d0eb833fe1954f87ec3e8099a1d012f5aac397c987b414060546af",
        "order": {
            "makerAddress": "0xa916b82ff122591cc88aac0d64ce30a8e3e16081",
            "makerAssetAmount": "1000000000000000000",
            "takerAssetAmount": "1000000000000000000",
            "expirationTimeSeconds": "1559941224",
            "makerAssetData": "0xf47261b0000000000000000000000000e41d2489571d322189246dafa5ebde1f4699f498",
            "takerAssetData": "0xf47261b000000000000000000000000089d24a6b4ccb1b6faa2625fe562bdd9a23260359",
            "makerFee": "0",
            "takerFee": "0",
            "salt": "45038821417800674048750115101428369947416636882675537172847246510449321143785",
            "exchangeAddress": "0x4f833a24e1f95d70f028921e27040ca56e09ab0b",
            "takerAddress": "0x0000000000000000000000000000000000000000",
            "feeRecipientAddress": "0x0000000000000000000000000000000000000000",
            "senderAddress": "0x0000000000000000000000000000000000000000",
            "signature": "0x1cfab1d9c5df24fa0f74f274b4e0668735bfd9faf029448b6925b795f3a97ce75826bbdfdfaad7eb40692e239726dfc36d74e740e579cb561cd6a798ad92921c4202"
        }
    }
    ```

### GET `/orders`
Load all (or some) orders published by a given `makerAddress`.

#### Request format
- **API Endpoint:** `/orders`
- **HTTP Method:** `GET`
- **Query Parameters:**

    | Name | Required | Default | Description |
    |:---: | :------: | :-----: | :---------- |
    |`makerAddress`| `true` | - | The address of the 0x order's signing maker.|
    |`limit`| `false` | `10` | The number of recent orders to fetch.|
- **Example:**
    ```bash
    curl 'localhost:8000/orders?makerAddress=0x4f833a24e1f95d70f028921e27040ca56e09ab0b'
    ```

#### Response format
- **Headers:**
    - Content-Type: `application/json`
- **Body:**
    ```json
    [
        {
            "orderId": "0x8976d8e86f1500008976d8e86f15906a8976d8e86f15000040dc8b020190ab56",
            "expiration": 1560371215
        },
        {
            "orderId": "0x20610504010a2be428610504010000002861050401000000701231030100e3ca",
            "expiration": 1560356165
        },
        {
            "orderId": "0xb461050401000000701231030100000206e65d06205040100d46205040100e2b",
            "expiration": 1560332518
        },
        {
            "orderId": "0x0b3d075500bb7c51cfa6c746599a223b153d8379ff22ee95c338d8e5c02eff1a",
            "expiration": 1560359948
        }
    ]
    ```