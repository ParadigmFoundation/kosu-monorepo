[wrapper-enhancements](../README.md) › [Globals](../globals.md) › [OrderGateway](ordergateway.md)

# Class: OrderGateway

Integration with OrderGateway contract on an Ethereum blockchain.\

Instances of the `OrderGateway` class are able to communicate with the deployed
OrderGateway contract for the detected network. Can be used to participate in
trades (executing maker orders) or to call methods on deployed `SubContract`
implementations, such as checking the fillable amount remaining for an order,
or checking the validity of a maker order.

This class is also used to load the required `arguments` for maker order's
specified SubContract during serialization and signature generation.

## Hierarchy

-   **OrderGateway**

## Index

### Constructors

-   [constructor](ordergateway.md#constructor)

### Properties

-   [address](ordergateway.md#address)
-   [contract](ordergateway.md#contract)
-   [initializing](ordergateway.md#initializing)
-   [web3Wrapper](ordergateway.md#web3wrapper)

### Methods

-   [amountRemaining](ordergateway.md#amountremaining)
-   [arguments](ordergateway.md#arguments)
-   [isValid](ordergateway.md#isvalid)
-   [participate](ordergateway.md#participate)

## Constructors

### constructor

\+ **new OrderGateway**(`options`: KosuOptions): _[OrderGateway](ordergateway.md)_

_Defined in [OrderGateway.ts:40](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L40)_

Create a new OrderGateway instance.

**Parameters:**

| Name      | Type        | Description                                |
| --------- | ----------- | ------------------------------------------ |
| `options` | KosuOptions | Instantiation options (see `KosuOptions`). |

**Returns:** _[OrderGateway](ordergateway.md)_

## Properties

### address

• **address**: _string_

_Defined in [OrderGateway.ts:34](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L34)_

The address of the deployed OrderGateway contract for the detected network.

---

### contract

• **contract**: _OrderGatewayContract_

_Defined in [OrderGateway.ts:40](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L40)_

An instance of the lower-level contract wrapper for the Kosu OrderGateway,
auto-generated from the Solidity source code.

---

### initializing

• **initializing**: _Promise‹void›_

_Defined in [OrderGateway.ts:29](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L29)_

A promise that resolves when initialization has completed successfully.

---

### web3Wrapper

• **web3Wrapper**: _Web3Wrapper_

_Defined in [OrderGateway.ts:24](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L24)_

An instance of a 0x `Web3Wrapper` used for some RPC calls and for certain
methods.

## Methods

### amountRemaining

▸ **amountRemaining**(`subContract`: string, `bytes`: string): _Promise‹BigNumber›_

_Defined in [OrderGateway.ts:135](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L135)_

Checks amount of partial exchange tokens remaining, depending on the
implementation of the SubContract specified in the supplied order.

**Parameters:**

| Name          | Type   | Description                                                |
| ------------- | ------ | ---------------------------------------------------------- |
| `subContract` | string | The subContract address;                                   |
| `bytes`       | string | The Kosu order serialized into subContract specific bytes. |

**Returns:** _Promise‹BigNumber›_

A `BigNumber` representing the number returned by the SubContract's
implementation of the `amountRemaining` method.

---

### arguments

▸ **arguments**(`subContract`: string): _Promise‹any›_

_Defined in [OrderGateway.ts:102](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L102)_

Read the required arguments from a deployed SubContract.

**Parameters:**

| Name          | Type   | Description                                 |
| ------------- | ------ | ------------------------------------------- |
| `subContract` | string | Address of deployed contract implementation |

**Returns:** _Promise‹any›_

The JSON array that defines the arguments for the SubContract.

---

### isValid

▸ **isValid**(`subContract`: string, `bytes`: string): _Promise‹boolean›_

_Defined in [OrderGateway.ts:120](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L120)_

Checks validity of order data according the order's SubContract implementation.

**Parameters:**

| Name          | Type   | Description                                                |
| ------------- | ------ | ---------------------------------------------------------- |
| `subContract` | string | The subContract address;                                   |
| `bytes`       | string | The Kosu order serialized into subContract specific bytes. |

**Returns:** _Promise‹boolean›_

---

### participate

▸ **participate**(`subContract`: string, `bytes`: string, `taker`: string): _Promise‹any›_

_Defined in [OrderGateway.ts:86](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/OrderGateway.ts#L86)_

Participate in a trade as a taker (or on behalf of one), by submitting the
maker order, and the Ethereum address of the taker. The fill transaction
is passed to the deployed OrderGateway contract and to the underlying
SubContract settlement logic.

**Parameters:**

| Name          | Type   | Description                                                               |
| ------------- | ------ | ------------------------------------------------------------------------- |
| `subContract` | string | The subContract address;                                                  |
| `bytes`       | string | The Kosu order serialized into subContract specific bytes.                |
| `taker`       | string | The Ethereum address of the taker (should be available through provider). |

**Returns:** _Promise‹any›_

The boolean value indicating the status of the trade; `true` if the interaction was successful.
