---
title: Usage
---

# KosuConnect Usage/Examples

Code samples and documentation for the various classes exposed by `@kosu/connect`. See [the reference section](./reference.md) for more granular documentation of the various class interfaces.

## Creating and Signing Orders

### Initialization

The Order constructor accepts an options hash (Javascript Object) as an argument which accepts the following parameters:

-   subContract
-   maker
-   makerArguments
-   takerArguments
-   makerValues
-   makerSignature
-   posterSignature

`makerArguments` and `takerArguments` can either be provided directly, or alternatively, they can automatically be pulled from the subContract if the subContract provides them.

`takerArguments` are optional and can be provided in the event that the entire order is done off chain and added on-chain only as a way to complete the transaction.

A typical order looks like this:

```javascript
// NOTE: This is an example order. Actual structure of
// values will vary between different subContracts!

const Order = kosuConnect.Order;
let order = new Order({
    subContract: "0xE0183d68d292d617c1f10900C28dC9F280608d9A",
    maker: "0xD78d21C3E3CFB348C5ec5DF3Ad0De81d3d43b2C7",
    makerValues: [
        "0xD78d21C3E3CFB348C5ec5DF3Ad0De81d3d43b2C7", // Maker address
        7000, // Quantity to buy
        25, // Quantity to sell
        "0xe41d2489571d322189246dafa5ebde1f4699f498", // Address of token to buy
        "0x2956356cd2a2bf3202f771f50d3d14a367b48070", // Address of token to sell
    ],
});
```

Order objects which are created, signed and posted to the OrderStream network will have more data, but that data can also be directly passed into a new Order via the options hash to construct it.

### Signing Orders

#### `make()`

Once an order has been generated, it can be cryptographically signed by calling `order.make()`. The result of this function will be to push `v`, `r`, and `s` values (which represent the signature) to the end of the `makerValues` array.

When the order is taken, this allows subContracts to verify that the order was indeed created by the maker in the order.

Having the order signed by the maker is strictly optional. Some subContracts do not require a signature. For example, 0x orders are already signed before they come into contact with Kosu. Therefore, the same signature from the 0x order can be used and does not need to be duplicated.

```javascript
order.make();
console.log(order.makerValues);
// => [..., 28, '0x23...', '0x56...']
```

Calling `order.make()` will prompt the user to sign with a tool like MetaMask if they are using a web browser.

#### `prepareForPost()`

The Kosu OrderStream network requires that anyone posting to the network sign the order. This is in addition to the maker signature, and it is not optional if you want to use the OrderStream network.

It works essentially the same way as `make()`, except it accepts an address as an argument. If no address is provided, it will default to the `maker` address.

Also, it doesn't modify the same datastructure. Instead of updating `makerValues`, it directly sets an attribute called `posterSignature`.

```javascript
order.prepareForPost("0xF00123Fb59d85e63be29148C4aD582FCEC886B3E");
console.log(order.posterSignature);
// => Should render signature data structure
```

## Using Formatters

Kosu can be used with existing 3rd party projects like 0x and Dharma. Many 3rd party projects have their own formats for orders which differ from ours.

Formatters can be used to restructure orders into the streamlined format used by the Kosu Protocol. We provide a few for popular projects in the SubContractExamples project.

An example formatter is our 0x order formatter. It takes a 0x order and restructures it into our standard format:

```javascript
module.exports = signedZeroExOrder => {
    const makerAsset = signedZeroExOrder.makerAssetData.substr(2).match(/.{1,64}/g);
    const takerAsset = signedZeroExOrder.takerAssetData.substr(2).match(/.{1,64}/g);
    const signature = signedZeroExOrder.signature.substr(2).match(/.{1,64}/g);

    signedZeroExOrder.makerAssetData0 = `0x${makerAsset[0]}`;
    signedZeroExOrder.makerAssetData1 = `0x${makerAsset[1]}`;

    signedZeroExOrder.takerAssetData0 = `0x${takerAsset[0]}`;
    signedZeroExOrder.takerAssetData1 = `0x${takerAsset[1]}`;

    signedZeroExOrder.signature0 = `0x${signature[0]}`;
    signedZeroExOrder.signature1 = `0x${signature[1]}`;
    signedZeroExOrder.signature2 = `0x${signature[2]}`;

    return signedZeroExOrder;
};
```

This lets us do the following:

```javascript
const zeroExOrder = {
    makerAddress,
    takerAddress: kosuConnect.utils.NULL_ADDRESS,
    feeRecipientAddress: kosuConnect.utils.NULL_ADDRESS,
    senderAddress: kosuConnect.utils.NULL_ADDRESS,
    makerAssetAmount: new BigNumber(100),
    takerAssetAmount: new BigNumber(100),
    makerFee: new BigNumber(0),
    takerFee: new BigNumber(0),
    expirationTimeSeconds: new BigNumber(Date.now().toString()), //In ms so 1000 * now is plenty in the future
    salt: ZeroExImports.generatePseudoRandomSalt(),
    makerAssetData: assetDataUtils.encodeERC20AssetData(tokenA.address),
    takerAssetData: assetDataUtils.encodeERC20AssetData(tokenB.address),
    exchangeAddress: EXCHANGE_ADDRESS,
};

const signedZeroExOrder = {
    ...zeroExOrder,
    signature: await signatureUtils.ecSignHashAsync(
        web3.currentProvider,
        orderHashUtils.getOrderHashHex(zeroExOrder),
        makerAddress,
        "DEFAULT",
    ),
};

const order = new kosuConnect.Order({
    subContract: subContract,
    makerValues: zeroExFormatter(signedZeroExOrder),
    maker: makerAddress,
});
```

## Posting to the OrderStream

### Initialization

The OrderStream constructor accepts one argument: a Kosu OrderStream `endpoint`.

```javascript
let orderStream = new OrderStream("os1.paradigm.market");
```

The `KosuConnect` library actually instantiates a connection to the OrderStream on load. The standard way to set an OrderStream endpoint would be to pass it into the Kosu constructor.

```javascript
  let kosuConnect = new KosuConnect({ ..., orderStreamURL: 'os2.paradigm.market' });
  let orderStream = kosuConnect.orderStream;
```

This attaches an `orderStream` attribute to the `kosuConnect` object.

### Adding Orders to the Order Stream

#### `add()`

Once you have [prepared an order to be posted](https://github.com/ParadigmFoundation/ParadigmConnect/blob/master/lib/docs/Order.md#prepareforpost), you can add it to the Order Stream by calling:

```javascript
orderStream.add(order);
```

A simple, full example of making an order, preparing it to be posted, and adding to the OrderStream looks like:

```javascript
order.make().then(() => {
    order.prepareForPost(currentUser).then(() => {
        orderStream.add(order);
    });
});
```

If the request is successful, you will get back JSON which contains the OrderStream ID as well as the raw data for the order.

## Reading from the OrderStream

The `listen()` method will connect you to the OS via WebSocket to pick up incoming order events. Any middleware or filtering can be applied, based on the needs of your application.

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

Another example of a more complicated set of steps being applied (as "filters") to the `order-stream` API can be found, as a callback function, [here](https://github.com/ParadigmFoundation/OrderStream-SRA/blob/master/src/stream.ts) and it's caller [here](https://github.com/ParadigmFoundation/OrderStream-SRA/blob/master/src/server.ts#L140).

## Executing Trades

Similarly to how KosuConnect allows makers to create orders and push them to the OrderStream, the library also allows execution of trades as takers. For example, you can receive a maker order over the stream API, do some processing inside an application, then use the `take()` method (described below) to settle the trade through the OrderGateway, and the specified settlement logic.

### Taking Orders

Taking an order means submitting a transaction to the Ethereum blockchain that fulfills the order. In the case of something like 0x, this means that you are completing a trade. In the case of something like Dharma, this means you are funding a loan.

#### `take()`

The `take()` method requires two arguments: an address for the `taker` and an array of `takerValues`. The `takerValues` array will contain values required by the subContract. In a simple trade, this could just be the number of tokens the taker wishes to purchase.

```javascript
order.take("0x0988F52Cec741bDfB42aD8D80651005C6D221525", [500]);
```

If in a web browser, this will prompt the taker to submit the transaction with a tool like MetaMask.

#### `estimateGasCost()`

This is a utility method that will estimate the gas cost of `take()`. It requires exactly the same arguments.

```javascript
order.estimateGasCost("0x0988F52Cec741bDfB42aD8D80651005C6D221525", [500]);
```
