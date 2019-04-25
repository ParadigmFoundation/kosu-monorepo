---
title: Reference
---

# KosuConnect API Reference

API reference for `@kosu/connect` and its various classes and utilities. Also see [usage and examples](./usage.md).

KosuConnect's source code can be found in [its GitHub repository](https://github.com/ParadigmFoundation/). <!-- TODO fix link -->

## KosuConnect

The `KosuConnect` class is the top-level module and default export of `@kosu/connect`. It used to interact with the classes and methods discussed below.

### Constructor

- **Description:** 

  Create a new `KosuConnect` instance. Also instantiates all sub-classes (`Order`, `OrderGateway`, and `OrderStream`).

- **Returns:** 

  - `KosuConnect.prototype` - new `KosuConnect` instance.

- **Arguments:**

  1. `options` (object - see below)
  
  All options are optional, if none are provided a default config (to Ropsten test-network) will be used.

  |Key|Value|Remarks/Description|Required|
  |-|-|-|-|
  |`networkId`|`number`| Any valid Ethereum network ID (1, 3, 42, etc.)|`false`|
  |`provider`|`string`|Any valid web3 provider URL, or provider object|`false`|
  |`endpoint`|`string`|OrderStream node URL (subject to change)|`false`|
  |`orderGatewayAddress`|`string`|Optional address for the OrderGateway|`false`|


- **Syntax:**

  ```js
  // require NPM module 
  const KosuConnect = require("@kosu/onnect");

  // set options
  const options = {
    provider: "wss://ropsten.infura.io/ws", 
    endpoint: "bs2.paradigm.market",
  };

  // create new kosuConnect
  const kosuConnect = new KosuConnect(options);

  // optionally, destructure sub-classes
  const { Order, OrderStream, OrderGateway } = kosuConnect;
  ```

- **Notes:**

  1. The `KosuConnect` class instantiates all other sub-classes.
  2. You should not need to, for example, instantiate `Order` by itself.

## Order

The Order class provides utilities for constructing a properly formatted order to be placed within the Kosu OrderStream network and to be taken via the OrderGateway smart contract on the Ethereum network.

Additionally, various methods are available to add cryptographic signatures to the order on behalf of different parties.

### Constructor

- **Description:** 

  Create a new `Order` instance.

- **Returns:** 

  `Order.prototype` - new `Order.prototype` instance.

- **Arguments:**

  1. `options` (object - see below)

  |Key|Value|Remarks/Description|Required|
  |-|-|-|-|
  |`subContract`|`string`|Ethereum address of the SubContract an order is for|`true`|
  |`maker`|`string`|Ethereum address of the maker for an order|`true`|
  |`makerArguments`|`array`|SubContract specific arguments for makers (relates to makerValues)|`false`|
  |`takerArguments`|`array`|SubContract specific arguments for takers|`false`|
  |`makerValues`|`object`|SubContract and order specific values for maker order|`true`|
  |`makerSignature`|`object`|Signature object from maker|`false`|
  |`posterSignature`|`object`|Signature object from poster entity|`false`|


- **Syntax:**

  ```js
  let options = { maker, subContract, makerValues };
  let order = new Order(options);
  ```

- **Notes:**

  1. The `makerArguments` and `takerArguments` fields can either be provided directly, or alternatively, they can automatically be pulled from the subContract if the subContract provides them.
  2. The output of `Order.prototype.toJSON` can be passed back into the `Order` constructor.

### `make()`

- **Description:** 

  Requests (and executes) a signature of a `Order` by the `maker` field, appended as `Order.prototype.makerSignature`.

- **Returns:** 

  `Promise<void>` - promise resolves to void. 

- **Arguments:** none.

- **Syntax:**

  ```js
  let order = new Order(options);
  await order.make();
  ```

- **Notes:**
  
  1. Will attempt to use the `Order.web3` provider to generate signature.
  2. Works with MetaMask, as well as local JSON-RPC.

### `isValid()`

- **Description:** 

  Checks order validity according to `SubContract.isValid()` implementation of the specified `Order.prototype.subContract`.

- **Returns:**

  `Promise<boolean>` - promise resolves to order validity.

- **Arguments:** none.

- **Syntax:**

  ```js
  let order = new Order(options);
  const valid = await order.isValid(); // => boolean
  ```

- **Notes:**

  1. Requires `isValid()` to be implemented on the specified `subContract`.

### `amountRemaining()`

- **Description:** 

  Checks for amount remaining of order according to `SubContract.amountRemaining()` implementation of the specified `Order.prototype.subContract`.

- **Returns:**

  `Promise<number>` - promise resolves to amount remaining.

- **Arguments:** none.

- **Syntax:**

  ```js
  let order = new Order(options);
  const remaining = await order.amountRemaining(); // => number
  ```

- **Notes:**

  1. Requires `amountRemaining()` to be implemented on the specified `subContract`.

### `take()`

- **Description:** 

  Fill a maker order as a taker. Executes settlement logic of specified `Order.prototype.subContract`. 

- **Returns:**

  `Promise<boolean>` - promise resolves to boolean status.

- **Arguments:**

  |No.|Name|Type|Description|
  |-|-|-|-|
  |1|`taker`|`string`|Address of taker attempting to fill maker order.|
  |2|`takerValues`|`object`|Object containing taker parameters, depends on SubContract impl.|

- **Syntax:**

  ```js
  let order = new Order(options);
  await order.take(); // => 'true' if successful
  ```

- **Notes:**

  1. Depends on `participate()` implementation of the specified `subContract`.
  2. May request signature from `taker` to execute settlement logic.

### `prepareForPost()`

- **Description:** 

  Sign a maker order as a `poster` to prepare the order for submission to the OrderStream.

- **Returns:**

  `Promise<void>` - promise resolved to void.

- **Arguments:**

  |No.|Name|Type|Description|
  |-|-|-|-|
  |1|`poster`|`string`|Address of poster entity signing maker order.|

- **Syntax:**

  ```js
  let order = new Order(options);

  // can be signed by maker or other address
  await order.prepareForPost(order.maker);
  ```

- **Notes:**

  1. If no `poster` is provided, a signature is requested from `Order.prototype.maker`.
  2. The `Order.prototype.posterSignature` is used to verify the poster has allocated throughput on the OrderStream.

### `estimateGasCost()`

- **Description:** 

  Uses Ethereum utilities to estimate gas cost associated filling order (as if calling `Order.prototype.take()`).

- **Returns:**

  `Promise<number>` - promise resolves to estimated gas cost.

- **Arguments:**

  |No.|Name|Type|Description|
  |-|-|-|-|
  |1|`taker`|`string`|Address of taker attempting to fill maker order.|
  |2|`takerValues`|`object`|Object containing taker parameters, depends on SubContract impl.|

- **Syntax:**

  ```js
  let order = new Order(options);
  const cost = await order.estimateGasCost(taker, takerValues); // => number
  ```

- **Notes:**

  1. Same call signature as `Order.prototype.take()`

### `recoverMaker()`

- **Description:** 

  Recovers the `maker` address of a signed `Order.prototype`. Requires order to have been signed, or will throw.

- **Returns:**

  `string` - recovered address from `Order.prototype.makerSignature`.

- **Arguments:** none.

- **Syntax:**

  ```js
  let order = new Order(options);
  const maker = order.recoverMaker();
  console.log(maker === order.maker) // => 'true' for valid orders
  ```

### `recoverPoster()`

- **Description:** 

  Recovers the `poster` address of a signed `Order.prototype`. Requires order to have been signed by a poster, or will throw.

- **Returns:**

  `string` - recovered address from `Order.prototype.posterSignature`.

- **Arguments:** none.

- **Syntax:**

  ```js
  let order = new Order(options);
  poster = order.recoverPoster(); // => string
  ```

- **Notes:**

  1. Used in KosuCore to check poster stake/allocation.

### `toJSON()`

- **Description:** 

  Allows serialization of `Order` instances into JSON.

- **Returns:**

  `object` - JSON `Order.prototype` representation with all values.

- **Arguments:** none.

- **Syntax:**

  ```js
  let order = new Order(options);
  const orderJSON = order.toJSON();

  // can be passed back into constructor
  let newOrder = new Order(orderJSON); // => void
  ```

- **Notes:**

  1. Helpful for transporting `Order.prototype` objects over networks, and enables reconstruction.
  2. Output of `Order.prototype.toJSON()` can be passed to `Order` to recreate original `Order.prototype`.

## OrderGateway

The OrderGateway class provides an API for communicating directly with the OrderGateway smart contract on the Ethereum network.

It is used internally by the [`Order` class](https://github.com/ParadigmFoundation/KosuConnect/blob/master/lib/docs/Order.md) to implement the `take()`, `isValid()` and `amountRemaining()` methods. It can also be used to find out what `maker` and `taker` arguments a particular subContract expects to receive in order to execute a transaction. 

The OrderGateway exposes the `Participation` event which can be leveraged as a [web3 event](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#contract-event) for tracking order status.

### Constructor

- **Description:** 

  Creates a new `OrderGateway` instance.

- **Returns:** 

  `OrderGateway.prototype` - new `OrderGateway` instance.

- **Arguments:**

  1. `options` - object, see below.

  |Key|Value|Description|
  |-|-|-|
  |`web3`|`object`|Instantiated `web3` instance (any provider).|

- **Syntax:**

  ```js
  const orderGateway = new OrderGateway({ web3 });
  ```

- **Notes:**
  
  1. You generally will not need to instantiate `OrderGateway` manually. Use `new KosuConnect(...)` instead.

### `init()`

- **Description:** 

  Initialize `OrderGateway.prototype` and create contract instance via `web3`.

- **Returns:** 

  `Promise<void>` - resolves upon successful initialization.

- **Arguments:**

  |No.|Name|Type|Description|
  |-|-|-|-|
  |1|`options`|`object`|Same as object passed to constructor.|

- **Syntax:**

  ```js
  // this function is called automatically by the constructor
  ```

- **Notes:**
  
  1. `OrderGateway.prototype.init()` is called during construction.
  2. There is no need to call this method manually.

### `participate()`

- **Description:** 

  Participate in a trade. Wrapper for the specific SubContract implementation the order is for.

- **Returns:** 

  `Promise<boolean>` - resolves to participation status (`true` for successful execution).

- **Arguments:**

  |No.|Name|Type|Description|
  |-|-|-|-|
  |1|`subContract`|`string`|Address of target SubContract.|
  |2|`id`|`string`|OrderID generated from OrderStream network (optional)|
  |3|`makerData`|`Buffer`|Serialized `makerValues` in SubContract specific format.|
  |4|`takerData`|`Buffer`|Serialized `takerValues` in SubContract specific format.|

- **Syntax:**

  ```js
  await orderGateway.participate(subContract, id, makerValuesBytes, takerValuesBytes, taker);
  ```

- **Notes:**
  
  1. Generally will be called internally by `Order` class.

### `participateEstimateGas()`

- **Description:** 

  Estimate gas required to participate in a trade.

- **Returns:** 

  `Promise<number>` - resolves to estimated gas cost.

- **Arguments:**

  |No.|Name|Type|Description|
  |-|-|-|-|
  |1|`subContract`|`string`|Address of target SubContract.|
  |2|`id`|`string`|OrderID generated from OrderStream network (optional)|
  |3|`makerData`|`Buffer`|Serialized `makerValues` in SubContract specific format.|
  |4|`takerData`|`Buffer`|Serialized `takerValues` in SubContract specific format.|

- **Syntax:**

  ```js
  await orderGateway.participateEstimateGas(subContract, id, makerValuesBytes, takerValuesBytes, taker);
  ```

- **Notes:**
  
  1. Generally will be called internally by `Order` class.
  1. Same call signature as `OrderGateway.prototype.participate()`.

### `makerArguments()`

- **Description:** 

  Check required `makerArguments` for a specific SubContract.

- **Returns:** 

  `Promise<array>` - resolves to `makerArguments` array.

- **Arguments:**

  |No.|Name|Type|Description|
  |-|-|-|-|
  |1|`subContract`|`string`|Address of target SubContract.|

- **Syntax:**

  ```js
  const makerArguments = await orderGateway.makerArguments(subContract); // => array
  ```

- **Notes:**
  
  1. Wrapper for specific SubContract implementation of `makerArguments()`.

### `takerArguments()`

- **Description:** 

  Check required `takerArguments` for a specific SubContract.

- **Returns:** 

  `Promise<array>` - resolves to `takerArguments` array.

- **Arguments:**

  |No.|Name|Type|Description|
  |-|-|-|-|
  |1|`subContract`|`string`|Address of target SubContract.|

- **Syntax:**

  ```js
  const takerArguments = await orderGateway.takerArguments(subContract); // => array
  ```

- **Notes:**
  
  1. Wrapper for specific SubContract implementation of `takerArguments()`.

### `isValid()`

- **Description:** 

  Check validity of a maker order for a specific SubContract.

- **Returns:** 

  `Promise<boolean>` - resolves to boolean order validity.

- **Arguments:**

  |No.|Name|Type|Description|
  |-|-|-|-|
  |1|`subContract`|`string`|Address of target SubContract.|
  |2|`makerData`|`Buffer`|Serialized `makerValues` for SubContract.|

- **Syntax:**

  ```js
  await orderGateway.isValid(subContract, makerData); // => array
  ```

- **Notes:**
  
  1. Wrapper for specific SubContract implementation of `isValid()`.

### `amountRemaining()`

- **Description:** 

  Check amount remaining of a maker order for a specific SubContract.

- **Returns:** 

  `Promise<number>` - resolves to number representing amount remaining.

- **Arguments:**

  |No.|Name|Type|Description|
  |-|-|-|-|
  |1|`subContract`|`string`|Address of target SubContract.|
  |2|`makerData`|`Buffer`|Serialized `makerValues` for SubContract.|

- **Syntax:**

  ```js
  const left = await orderGateway.amountRemaining(subContract, makerData);
  ```

- **Notes:**
  
  1. Wrapper for specific SubContract implementation of `amountRemaining()`.

### `oneEvent()`

- **Description:** 

  Allows a single (only called once) callback function to be attached to the `Participate` event.

- **Returns:** `void`.

- **Arguments:**

  |No.|Name|Type|Description|
  |-|-|-|-|
  |1|`callback`|`function`|Callback function to be executed once.|
  |2|`filter`|`object`|Optional event filter|

- **Syntax:**

  ```js
  orderGateway.oneEvent(() => {
    console.log("Received 'participate' event!");
  });
  ```

- **Notes:**
  
  1. [See `web3.eth.Contract.prototype.once()` documentation.](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#once)

## OrderStream

Simple class that provides basic wrappers for the OrderStream `post` and `stream` API's. Enables submission of signed maker orders, and subscription to output event stream of valid orders from the network.

### Constructor

- **Description:** 

  Creates a new `OrderStream` instance.

- **Returns:** 

  `OrderStream.prototype` - new `OrderStream` instance.

- **Arguments:**

  1. `options` - object, see below.

  |Key|Value|Description|
  |-|-|-|
  |`endpoint`|`string`|OrderStream node URL/URI (subject to change).|

- **Syntax:**

  ```js
  const orderStream = new OrderStream({ endpoint: "bs1.paradigm.market" });
  ```

- **Notes:**
  
  1. You generally will not need to instantiate `OrderStream` manually. Use `new KosuConnect(...)` instead.

### `add()`

- **Description:** 

  Submit a signed maker order to the mempool of a specified OrderStream node via RPC.

- **Returns:** 

  `Promise<object>` - promise resolves to JSON response object from RPC.

- **Arguments:**

  |No.|Name|Type|Description|
  |-|-|-|-|
  |1|`order`|`object`|Signed `Order.prototype` object to submit.|

- **Syntax:**

  ```js
  orderStream.add(order).then((res) =>  {
    console.log(`Got response from server: ${res}`);
  }).catch((err) => {
    console.log(`Failed to submit with: ${err}`);
  });
  ```

- **Notes:**
  
  1. For an `order` to be accepted by the network, it must be signed by a `poster` with valid stake.

### `listen()`

- **Description:** 

  Attach a handler to be called on every valid order from the OrderStream.

- **Returns:** `void`.

- **Arguments:**

  |No.|Name|Type|Description|
  |-|-|-|-|
  |1|`callback`|`function`|Callback to be executed on each `order`.|

- **Syntax:**

  ```js
  orderStream.listen((order) => {
    console.log(`Got a new order from OrderStream: ${JSON.stringify(order)}`);

    // do any additional processing, take order, etc...
  });
  ```

- **Notes:**
  
  1. The `callback` function should have signature: 
     ```js
     function callback(data) {
       const parsed = JSON.parse(data); // suggested

       // arbitrary logic...

       return; // return 'null' (a.k.a void)
     }
     ```