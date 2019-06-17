> ## [kosu.js](../README.md)

[Globals](../globals.md) / [OrderGateway](ordergateway.md) /

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

### Index

#### Constructors

-   [constructor](ordergateway.md#constructor)

#### Properties

-   [address](ordergateway.md#private-address)
-   [contract](ordergateway.md#private-contract)
-   [initializing](ordergateway.md#private-initializing)
-   [web3](ordergateway.md#private-web3)
-   [web3Wrapper](ordergateway.md#private-web3wrapper)

#### Methods

-   [amountRemaining](ordergateway.md#amountremaining)
-   [arguments](ordergateway.md#arguments)
-   [init](ordergateway.md#private-init)
-   [isValid](ordergateway.md#isvalid)
-   [participate](ordergateway.md#participate)

## Constructors

### constructor

\+ **new OrderGateway**(`options`: `KosuOptions`): _[OrderGateway](ordergateway.md)_

_Defined in [src/OrderGateway.ts:46](url)_

Create a new OrderGateway instance.

**Parameters:**

| Name      | Type          | Description                                |
| --------- | ------------- | ------------------------------------------ |
| `options` | `KosuOptions` | Instantiation options (see `KosuOptions`). |

**Returns:** _[OrderGateway](ordergateway.md)_

---

## Properties

### `Private` address

● **address**: _string_

_Defined in [src/OrderGateway.ts:40](url)_

The address of the deployed OrderGateway contract for the detected network.

---

### `Private` contract

● **contract**: _[OrderGatewayContract](ordergatewaycontract.md)_

_Defined in [src/OrderGateway.ts:46](url)_

An instance of the lower-level contract wrapper for the Kosu OrderGateway,
auto-generated from the Solidity source code.

---

### `Private` initializing

● **initializing**: _`Promise<void>`_

_Defined in [src/OrderGateway.ts:35](url)_

A promise that resolves when initialization has completed successfully.

---

### `Private` web3

● **web3**: _`Web3`_

_Defined in [src/OrderGateway.ts:24](url)_

An instance of `web3` used to interact with the Ethereum blockchain.

---

### `Private` web3Wrapper

● **web3Wrapper**: _`Web3Wrapper`_

_Defined in [src/OrderGateway.ts:30](url)_

An instance of a 0x `Web3Wrapper` used for some RPC calls and for certain
methods.

---

## Methods

### amountRemaining

▸ **amountRemaining**(`order`: `Order`): _`Promise<BigNumber>`_

_Defined in [src/OrderGateway.ts:148](url)_

Checks amount of partial exchange tokens remaining, depending on the
implementation of the SubContract specified in the supplied order.

**Parameters:**

| Name    | Type    | Description                                   |
| ------- | ------- | --------------------------------------------- |
| `order` | `Order` | The Kosu order to check amount remaining for. |

**Returns:** _`Promise<BigNumber>`_

A `BigNumber` representing the number returned by the SubContract's
implementation of the `amountRemaining` method.

---

### arguments

▸ **arguments**(`subContract`: string): _`Promise<any>`_

_Defined in [src/OrderGateway.ts:116](url)_

Read the required arguments from a deployed SubContract.

**Parameters:**

| Name          | Type   | Description                                 |
| ------------- | ------ | ------------------------------------------- |
| `subContract` | string | Address of deployed contract implementation |

**Returns:** _`Promise<any>`_

The JSON array that defines the arguments for the SubContract.

---

### `Private` init

▸ **init**(`options`: `KosuOptions`): _`Promise<void>`_

_Defined in [src/OrderGateway.ts:66](url)_

Asynchronously initializes the instance after construction.

**Parameters:**

| Name      | Type          | Description                                     |
| --------- | ------------- | ----------------------------------------------- |
| `options` | `KosuOptions` | Instantiation options (see `KosuOptions` type). |

**Returns:** _`Promise<void>`_

A promise to await complete instantiation for further calls

---

### isValid

▸ **isValid**(`order`: `Order`): _`Promise<boolean>`_

_Defined in [src/OrderGateway.ts:132](url)_

Checks validity of order data according the order's SubContract implementation.

**Parameters:**

| Name    | Type    | Description                                              |
| ------- | ------- | -------------------------------------------------------- |
| `order` | `Order` | Kosu order to validate against `isValid` implementation. |

**Returns:** _`Promise<boolean>`_

---

### participate

▸ **participate**(`order`: `Order`, `taker`: string): _`Promise<any>`_

_Defined in [src/OrderGateway.ts:93](url)_

Participate in a trade as a taker (or on behalf of one), by submitting the
maker order, and the Ethereum address of the taker. The fill transaction
is passed to the deployed OrderGateway contract and to the underlying
SubContract settlement logic.

**Parameters:**

| Name    | Type    | Description                                                               |
| ------- | ------- | ------------------------------------------------------------------------- |
| `order` | `Order` | A signed Kosu maker order object with a valid `subContract`.              |
| `taker` | string  | The Ethereum address of the taker (should be available through provider). |

**Returns:** _`Promise<any>`_

The boolean value indicating the status of the trade; `true` if the interaction was successful.

---
