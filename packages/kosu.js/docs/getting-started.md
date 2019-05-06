---
title: Getting Started
---

# Getting Started

Quick start and simple examples. Be sure to check out more detailed [usage examples](./usage.md) and the full [API reference here.](./reference.md)

## Install

KosuConnect is currently only available as a Node.js module. Install with `npm`:

```
npm install --save @kosu/connect
```

Kosu is dependent on a `web3` connection, and you will need to `require` it.

```javascript
const Web3 = require("web3");
const KosuConnect = require("@kosu/connect");

web3 = new Web3(web3.currentProvider);

web3.eth.net.getId().then(networkId => {
    // ... following code goes here.
});
```

## Quick Start

Quick start reference, full API reference can be [found here](./reference.md), and additional usage examples can be [found here.](./usage.md)

### KosuConnect

The `KosuConnect` class is the top level object through which you will interact with the library. It takes a variety of initialization parameters that you will need to provide.

```javascript
const kosuConnect = new KosuConnect({ provider: web3.currentProvider, networkId: networkId });
```

### Order

The `Order` class is what you will use to construct and sign orders which you'd like to post to the Kosu OrderStream to be broadcast to the network.

```javascript
  const Order = kosuConnect.Order;
  let order = new Order({ ... });
```

The `Order` constructor takes a javascript object that must contain the following things:

-   The subcontract address as `subContract`
-   The maker's address as `maker`
-   The "maker values" object as `makerValues`

Additionally, `makerArguments` and `takerArguments` can be provided or pulled from the SubContract.

An example can be seen [here](https://github.com/ParadigmFoundation/connect-demo).

`Order` has a method called `make()` which will sign the order on behalf of the maker.

```javascript
order.make();
```

This call will append three pieces of a cryptographic signature to the order's `makerValues` field:
`v`, `r`, and `s`, which will be passed to the smart contract layer when the order is eventually "taken".

Additionally, these will be added directly to the `order` object as a method `makerSignature()` for convenience purposes.

```javascript
order.makerSignature(); // => { v: '...', r: '...', s: '...' }
```

Once an order has been signed by the maker, you can recover their Ethereum address by calling:

```javascript
order.recoverMaker(); // => '0x40a...'
```

Similarly, the Kosu OrderStream requires that whomever is going to post the order (might be the maker, might be someone else) also signs the order. To that end, you can use the `prepareForPost()` method.

```javascript
  let poster = ... // get an Ethereum address
  order.prepareForPost(poster);
```

This will add a `posterSignature` to the `order` in a similar way that we added the `makerSignature`. One key difference is that this does not get added to the `makerValues` by default. The `poster` is primarily a concern of the OrderStream.

Finally, once an order is made, posted, and discovered by another party, it can be "taken", which posts the order to the on-chain OrderGateway with the taker's details.

```javascript
order.take(taker, takerValues);
```

When an order has been generated via the OrderStream or other sources and order status is unknown `isValid` and `amountRemaining` can be used to get status information from the subContract.

```javascript
if (order.isValid() && order.amountRemaining() > 0) {
    order.take(taker, takerValues);
}
```

For a more detailed explanation, check out the [Order docs](./reference.md#order).

### OrderStream

The `OrderStream` class provides convenient methods for interacting with the Kosu OrderStream (OS) Network.

There are two primary methods that you should be aware of: `add()` and `listen()`.

The `add()` method can be called once an order has been signed by the `poster`.

```javascript
const orderStream = kosuConnect.orderStream;
orderStream.add(order);
```

The `listen()` method will connect you to the OS via web sockets to pick up incoming order events.

```javascript
orderStream.listen(message => {
    console.log(message);
});
```

Here is an [example](https://github.com/ParadigmFoundation/connect-demo) of both in action for a front-end web application:

```javascript
order.make().then(() => {
    order.prepareForPost(currentUser).then(() => {
        orderStream.add(order);
    });
});

// ...

orderStream.listen(message => {
    console.log(message);
    $("#orders").append(`<div class='card'><div class='card-body'>${message.data}</div></div>`);
});
```

For a more detailed explanation, check out the [OrderStream docs](./reference.md#orderstream).
