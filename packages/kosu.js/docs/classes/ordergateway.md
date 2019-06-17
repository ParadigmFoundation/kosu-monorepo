> ## [kosu.js](../README.md)

[Globals](../globals.md) / [OrderGateway](ordergateway.md) /

# Class: OrderGateway

Integration with OrderGateway contract on an Ethereum blockchain.

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

_Defined in [packages/kosu.js/src/OrderGateway.ts:16](url)_

Create a new OrderGateway instance.

**Parameters:**

| Name      | Type          | Description           |
| --------- | ------------- | --------------------- |
| `options` | `KosuOptions` | instantiation options |

**Returns:** _[OrderGateway](ordergateway.md)_

---

## Properties

### `Private` address

● **address**: _string_

_Defined in [packages/kosu.js/src/OrderGateway.ts:15](url)_

---

### `Private` contract

● **contract**: _[OrderGatewayContract](ordergatewaycontract.md)_

_Defined in [packages/kosu.js/src/OrderGateway.ts:16](url)_

---

### `Private` initializing

● **initializing**: _`Promise<void>`_

_Defined in [packages/kosu.js/src/OrderGateway.ts:13](url)_

---

### `Private` web3

● **web3**: _`Web3`_

_Defined in [packages/kosu.js/src/OrderGateway.ts:12](url)_

---

### `Private` web3Wrapper

● **web3Wrapper**: _`Web3Wrapper`_

_Defined in [packages/kosu.js/src/OrderGateway.ts:14](url)_

---

## Methods

### amountRemaining

▸ **amountRemaining**(`order`: `Order`): _`Promise<BigNumber>`_

_Defined in [packages/kosu.js/src/OrderGateway.ts:98](url)_

Checks amount of partial exchange tokens remaining

**Parameters:**

| Name    | Type    | Description            |
| ------- | ------- | ---------------------- |
| `order` | `Order` | Kosu order to validate |

**Returns:** _`Promise<BigNumber>`_

---

### arguments

▸ **arguments**(`subContract`: string): _`Promise<any>`_

_Defined in [packages/kosu.js/src/OrderGateway.ts:75](url)_

Read maker arguments

**Parameters:**

| Name          | Type   | Description                                 |
| ------------- | ------ | ------------------------------------------- |
| `subContract` | string | Address of deployed contract implementation |

**Returns:** _`Promise<any>`_

---

### `Private` init

▸ **init**(`options`: `KosuOptions`): _`Promise<void>`_

_Defined in [packages/kosu.js/src/OrderGateway.ts:36](url)_

Asyncronously initializes the instance after construction

**Parameters:**

| Name      | Type          | Description           |
| --------- | ------------- | --------------------- |
| `options` | `KosuOptions` | instantiation options |

**Returns:** _`Promise<void>`_

A promise to await complete instantiation for further calls

---

### isValid

▸ **isValid**(`order`: `Order`): _`Promise<boolean>`_

_Defined in [packages/kosu.js/src/OrderGateway.ts:85](url)_

Checks validity of order data

**Parameters:**

| Name    | Type    | Description            |
| ------- | ------- | ---------------------- |
| `order` | `Order` | Kosu order to validate |

**Returns:** _`Promise<boolean>`_

---

### participate

▸ **participate**(`order`: `Order`, `taker`: string): _`Promise<any>`_

_Defined in [packages/kosu.js/src/OrderGateway.ts:59](url)_

Participate in the terms of an order

**Parameters:**

| Name    | Type    | Description          |
| ------- | ------- | -------------------- |
| `order` | `Order` | A Kosu order         |
| `taker` | string  | address of the taker |

**Returns:** _`Promise<any>`_

---
