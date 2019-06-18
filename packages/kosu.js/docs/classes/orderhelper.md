> ## [kosu.js](../README.md)

[Globals](../globals.md) / [OrderHelper](orderhelper.md) /

# Class: OrderHelper

The `OrderHelper` provides methods for interacting with maker orders, such as
participating in trades (as a taker), signing maker order's for execution and
for submission to the Kosu relay network.

Requires a configured `web3` provider that allows signatures and the execution
of transactions.

## Hierarchy

-   **OrderHelper**

### Index

#### Constructors

-   [constructor](orderhelper.md#constructor)

#### Properties

-   [orderGateway](orderhelper.md#private-ordergateway)
-   [web3](orderhelper.md#private-web3)

#### Methods

-   [makeOrder](orderhelper.md#makeorder)
-   [makerHex](orderhelper.md#makerhex)
-   [prepareForPost](orderhelper.md#prepareforpost)
-   [recoverMaker](orderhelper.md#recovermaker)
-   [recoverPoster](orderhelper.md#recoverposter)
-   [takeOrder](orderhelper.md#takeorder)

## Constructors

### constructor

\+ **new OrderHelper**(`web3`: `Web3`, `orderGateway`: [OrderGateway](ordergateway.md)): _[OrderHelper](orderhelper.md)_

_Defined in [src/OrderHelper.ts:24](url)_

Create a new `OrderHelper` instance (requires a provider via supplied `web3`
instance).

**Parameters:**

| Name           | Type                            | Description                                         |
| -------------- | ------------------------------- | --------------------------------------------------- |
| `web3`         | `Web3`                          | An instance of `Web3` with an active node provider. |
| `orderGateway` | [OrderGateway](ordergateway.md) | An instantiated `OrderGateway` wrapper.             |

**Returns:** _[OrderHelper](orderhelper.md)_

---

## Properties

### `Private` orderGateway

● **orderGateway**: _[OrderGateway](ordergateway.md)_

_Defined in [src/OrderHelper.ts:24](url)_

Instance of the `OrderGateway` wrapper.

---

### `Private` web3

● **web3**: _`Web3`_

_Defined in [src/OrderHelper.ts:19](url)_

An instance of `web3` used to interact with the Ethereum blockchain.

---

## Methods

### makeOrder

▸ **makeOrder**(`order`: `Order`): _`Promise<Order>`_

_Defined in [src/OrderHelper.ts:44](url)_

Sign and complete a maker order (requires a pre-configured Order object).

**Parameters:**

| Name    | Type    | Description               |
| ------- | ------- | ------------------------- |
| `order` | `Order` | Order to sign as a maker. |

**Returns:** _`Promise<Order>`_

The supplied maker order with an appended `makerSignature`.

---

### makerHex

▸ **makerHex**(`order`: `Order`): _`Promise<string>`_

_Defined in [src/OrderHelper.ts:92](url)_

Generate the maker hex (serialized `makerValues`).

**Parameters:**

| Name    | Type    | Description                |
| ------- | ------- | -------------------------- |
| `order` | `Order` | Order to get maker hex for |

**Returns:** _`Promise<string>`_

---

### prepareForPost

▸ **prepareForPost**(`order`: `Order`, `poster`: string): _`Promise<PostableOrder>`_

_Defined in [src/OrderHelper.ts:73](url)_

Sign and order as a poster and append the poster signature to an order
prior to submission to the Kosu relay network.

**Parameters:**

| Name     | Type    | Default value | Description                                                       |
| -------- | ------- | ------------- | ----------------------------------------------------------------- |
| `order`  | `Order` | -             | Order to prepare (by appending a poster signature).               |
| `poster` | string  | order.maker   | Poster address to sign order with, defaults to the order's maker. |

**Returns:** _`Promise<PostableOrder>`_

The maker order now signed and prepared for post with an appended `posterSignature`.

---

### recoverMaker

▸ **recoverMaker**(`order`: `Order`): _`Promise<string>`_

_Defined in [src/OrderHelper.ts:102](url)_

Recover the maker address from a signed order.

**Parameters:**

| Name    | Type    | Description                                   |
| ------- | ------- | --------------------------------------------- |
| `order` | `Order` | A signed order to recover maker address from. |

**Returns:** _`Promise<string>`_

---

### recoverPoster

▸ **recoverPoster**(`order`: `PostableOrder`): _`Promise<string>`_

_Defined in [src/OrderHelper.ts:113](url)_

Recover the poster address from a maker order that has been signed from a
poster.

**Parameters:**

| Name    | Type            | Description                                                |
| ------- | --------------- | ---------------------------------------------------------- |
| `order` | `PostableOrder` | Order to recover poster from (must be signed by a poster). |

**Returns:** _`Promise<string>`_

---

### takeOrder

▸ **takeOrder**(`order`: `TakeableOrder`, `taker`: string): _`Promise<any>`_

_Defined in [src/OrderHelper.ts:61](url)_

Take a signed maker order on the Ethereum blockchain via the order's
specified SubContract, from the supplied taker address (should be available
via configured `web` provider).

**Parameters:**

| Name    | Type            | Description                                                                 |
| ------- | --------------- | --------------------------------------------------------------------------- |
| `order` | `TakeableOrder` | A signed and fillable maker order object.                                   |
| `taker` | string          | The Ethereum address of the taker (must be available to sign via provider). |

**Returns:** _`Promise<any>`_

The value defined by the order's SubContract implementation, usually `true`
for successfully filled orders, and `false` for failed fills.

---