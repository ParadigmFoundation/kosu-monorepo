[Kosu Contract Helpers](../README.md) › [Globals](../globals.md) › [OrderHelper](orderhelper.md)

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

\+ **new OrderHelper**(`web3`: Web3, `orderGateway`: OrderGateway): _[OrderHelper](orderhelper.md)_

_Defined in [OrderHelper.ts:25](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-contract-helpers/src/OrderHelper.ts#L25)_

Create a new `OrderHelper` instance (requires a provider via supplied `web3`
instance).

**Parameters:**

| Name           | Type         | Description                                         |
| -------------- | ------------ | --------------------------------------------------- |
| `web3`         | Web3         | An instance of `Web3` with an active node provider. |
| `orderGateway` | OrderGateway | An instantiated `OrderGateway` wrapper.             |

**Returns:** _[OrderHelper](orderhelper.md)_

## Methods

### makeOrder

▸ **makeOrder**(`order`: Order): _Promise‹Order›_

_Defined in [OrderHelper.ts:45](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-contract-helpers/src/OrderHelper.ts#L45)_

Sign and complete a maker order (requires a pre-configured Order object).

**Parameters:**

| Name    | Type  | Description               |
| ------- | ----- | ------------------------- |
| `order` | Order | Order to sign as a maker. |

**Returns:** _Promise‹Order›_

The supplied maker order with an appended `makerSignature`.

---

### makerHex

▸ **makerHex**(`order`: Order): _Promise‹string›_

_Defined in [OrderHelper.ts:107](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-contract-helpers/src/OrderHelper.ts#L107)_

Generate the maker hex (serialized `makerValues`).

**Parameters:**

| Name    | Type  | Description                |
| ------- | ----- | -------------------------- |
| `order` | Order | Order to get maker hex for |

**Returns:** _Promise‹string›_

---

### prepareForPost

▸ **prepareForPost**(`order`: Order, `poster`: string): _Promise‹PostableOrder›_

_Defined in [OrderHelper.ts:79](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-contract-helpers/src/OrderHelper.ts#L79)_

Sign and order as a poster and append the poster signature to an order
prior to submission to the Kosu relay network.

**Parameters:**

| Name     | Type   | Default     | Description                                                       |
| -------- | ------ | ----------- | ----------------------------------------------------------------- |
| `order`  | Order  | -           | Order to prepare (by appending a poster signature).               |
| `poster` | string | order.maker | Poster address to sign order with, defaults to the order's maker. |

**Returns:** _Promise‹PostableOrder›_

The maker order now signed and prepared for post with an appended `posterSignature`.

---

### recoverMaker

▸ **recoverMaker**(`order`: Order): _Promise‹string›_

_Defined in [OrderHelper.ts:117](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-contract-helpers/src/OrderHelper.ts#L117)_

Recover the maker address from a signed order.

**Parameters:**

| Name    | Type  | Description                                   |
| ------- | ----- | --------------------------------------------- |
| `order` | Order | A signed order to recover maker address from. |

**Returns:** _Promise‹string›_

---

### recoverPoster

▸ **recoverPoster**(`order`: PostableOrder): _Promise‹string›_

_Defined in [OrderHelper.ts:128](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-contract-helpers/src/OrderHelper.ts#L128)_

Recover the poster address from a maker order that has been signed from a
poster.

**Parameters:**

| Name    | Type          | Description                                                |
| ------- | ------------- | ---------------------------------------------------------- |
| `order` | PostableOrder | Order to recover poster from (must be signed by a poster). |

**Returns:** _Promise‹string›_

---

### serialize

▸ **serialize**(`order`: Order): _Promise‹string›_

_Defined in [OrderHelper.ts:138](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-contract-helpers/src/OrderHelper.ts#L138)_

Generates the contract submission bytes from the arguments of provided order.

**Parameters:**

| Name    | Type  | Description                                 |
| ------- | ----- | ------------------------------------------- |
| `order` | Order | Order to generate contract input bytes for. |

**Returns:** _Promise‹string›_

---

### takeOrder

▸ **takeOrder**(`order`: TakeableOrder, `taker`: string): _Promise‹any›_

_Defined in [OrderHelper.ts:65](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-contract-helpers/src/OrderHelper.ts#L65)_

Take a signed maker order on the Ethereum blockchain via the order's
specified SubContract, from the supplied taker address (should be available
via configured `web` provider).

**Parameters:**

| Name    | Type          | Description                                                                 |
| ------- | ------------- | --------------------------------------------------------------------------- |
| `order` | TakeableOrder | A signed and fillable maker order object.                                   |
| `taker` | string        | The Ethereum address of the taker (must be available to sign via provider). |

**Returns:** _Promise‹any›_

The value defined by the order's SubContract implementation, usually `true`
for successfully filled orders, and `false` for failed fills.
