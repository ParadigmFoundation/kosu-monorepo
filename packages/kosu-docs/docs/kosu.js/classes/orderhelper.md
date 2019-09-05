> **[kosu.js](../README.md)**

[Globals](../globals.md) / [OrderHelper](orderhelper.md) /

# Class: OrderHelper

The `OrderHelper` provides methods for interacting with maker orders, such as
participating in trades (as a taker), signing maker order's for execution and
for submission to the Kosu relay network.

Requires a configured `web3` provider that allows signatures and the execution
of transactions.

## Hierarchy

-   **OrderHelper**

## Index

### Constructors

-   [constructor](orderhelper.md#constructor)

### Methods

-   [makeOrder](orderhelper.md#makeorder)
-   [makerHex](orderhelper.md#makerhex)
-   [prepareForPost](orderhelper.md#prepareforpost)
-   [recoverMaker](orderhelper.md#recovermaker)
-   [recoverPoster](orderhelper.md#recoverposter)
-   [serialize](orderhelper.md#serialize)
-   [takeOrder](orderhelper.md#takeorder)

## Constructors

### constructor

\+ **new OrderHelper**(`web3`: `Web3`, `orderGateway`: [OrderGateway](ordergateway.md)): _[OrderHelper](orderhelper.md)_

Defined in OrderHelper.ts:24

Create a new `OrderHelper` instance (requires a provider via supplied `web3`
instance).

**Parameters:**

| Name           | Type                            | Description                                         |
| -------------- | ------------------------------- | --------------------------------------------------- |
| `web3`         | `Web3`                          | An instance of `Web3` with an active node provider. |
| `orderGateway` | [OrderGateway](ordergateway.md) | An instantiated `OrderGateway` wrapper.             |

**Returns:** _[OrderHelper](orderhelper.md)_

## Methods

### makeOrder

▸ **makeOrder**(`order`: [Order](../interfaces/order.md)): _`Promise<Order>`_

Defined in OrderHelper.ts:44

Sign and complete a maker order (requires a pre-configured Order object).

**Parameters:**

| Name    | Type                            | Description               |
| ------- | ------------------------------- | ------------------------- |
| `order` | [Order](../interfaces/order.md) | Order to sign as a maker. |

**Returns:** _`Promise<Order>`_

The supplied maker order with an appended `makerSignature`.

---

### makerHex

▸ **makerHex**(`order`: [Order](../interfaces/order.md)): _`Promise<string>`_

Defined in OrderHelper.ts:104

Generate the maker hex (serialized `makerValues`).

**Parameters:**

| Name    | Type                            | Description                |
| ------- | ------------------------------- | -------------------------- |
| `order` | [Order](../interfaces/order.md) | Order to get maker hex for |

**Returns:** _`Promise<string>`_

---

### prepareForPost

▸ **prepareForPost**(`order`: [Order](../interfaces/order.md), `poster`: string): _`Promise<PostableOrder>`_

Defined in OrderHelper.ts:76

Sign and order as a poster and append the poster signature to an order
prior to submission to the Kosu relay network.

**Parameters:**

| Name     | Type                            | Default     | Description                                                       |
| -------- | ------------------------------- | ----------- | ----------------------------------------------------------------- |
| `order`  | [Order](../interfaces/order.md) | -           | Order to prepare (by appending a poster signature).               |
| `poster` | string                          | order.maker | Poster address to sign order with, defaults to the order's maker. |

**Returns:** _`Promise<PostableOrder>`_

The maker order now signed and prepared for post with an appended `posterSignature`.

---

### recoverMaker

▸ **recoverMaker**(`order`: [Order](../interfaces/order.md)): _`Promise<string>`_

Defined in OrderHelper.ts:114

Recover the maker address from a signed order.

**Parameters:**

| Name    | Type                            | Description                                   |
| ------- | ------------------------------- | --------------------------------------------- |
| `order` | [Order](../interfaces/order.md) | A signed order to recover maker address from. |

**Returns:** _`Promise<string>`_

---

### recoverPoster

▸ **recoverPoster**(`order`: [PostableOrder](../interfaces/postableorder.md)): _`Promise<string>`_

Defined in OrderHelper.ts:125

Recover the poster address from a maker order that has been signed from a
poster.

**Parameters:**

| Name    | Type                                            | Description                                                |
| ------- | ----------------------------------------------- | ---------------------------------------------------------- |
| `order` | [PostableOrder](../interfaces/postableorder.md) | Order to recover poster from (must be signed by a poster). |

**Returns:** _`Promise<string>`_

---

### serialize

▸ **serialize**(`order`: [Order](../interfaces/order.md)): _`Promise<string>`_

Defined in OrderHelper.ts:135

Generates the contract submission bytes from the arguments of provided order.

**Parameters:**

| Name    | Type                            | Description                                 |
| ------- | ------------------------------- | ------------------------------------------- |
| `order` | [Order](../interfaces/order.md) | Order to generate contract input bytes for. |

**Returns:** _`Promise<string>`_

---

### takeOrder

▸ **takeOrder**(`order`: [TakeableOrder](../interfaces/takeableorder.md), `taker`: string): _`Promise<any>`_

Defined in OrderHelper.ts:64

Take a signed maker order on the Ethereum blockchain via the order's
specified SubContract, from the supplied taker address (should be available
via configured `web` provider).

**Parameters:**

| Name    | Type                                            | Description                                                                 |
| ------- | ----------------------------------------------- | --------------------------------------------------------------------------- |
| `order` | [TakeableOrder](../interfaces/takeableorder.md) | A signed and fillable maker order object.                                   |
| `taker` | string                                          | The Ethereum address of the taker (must be available to sign via provider). |

**Returns:** _`Promise<any>`_

The value defined by the order's SubContract implementation, usually `true`
for successfully filled orders, and `false` for failed fills.
