> ## [kosu.js](../README.md)

[Globals](../globals.md) / [OrderHelper](orderhelper.md) /

# Class: OrderHelper

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

_Defined in [src/OrderHelper.ts:9](url)_

**Parameters:**

| Name           | Type                            |
| -------------- | ------------------------------- |
| `web3`         | `Web3`                          |
| `orderGateway` | [OrderGateway](ordergateway.md) |

**Returns:** _[OrderHelper](orderhelper.md)_

---

## Properties

### `Private` orderGateway

● **orderGateway**: _[OrderGateway](ordergateway.md)_

_Defined in [src/OrderHelper.ts:8](url)_

---

### `Private` web3

● **web3**: _`Web3`_

_Defined in [src/OrderHelper.ts:9](url)_

---

## Methods

### makeOrder

▸ **makeOrder**(`order`: `Order`): _`Promise<Order>`_

_Defined in [src/OrderHelper.ts:21](url)_

Make an order by ensuring a required signature is present

**Parameters:**

| Name    | Type    | Description   |
| ------- | ------- | ------------- |
| `order` | `Order` | Order to make |

**Returns:** _`Promise<Order>`_

---

### makerHex

▸ **makerHex**(`order`: `Order`): _`Promise<string>`_

_Defined in [src/OrderHelper.ts:60](url)_

Generate the maker hex

**Parameters:**

| Name    | Type    | Description                |
| ------- | ------- | -------------------------- |
| `order` | `Order` | Order to get maker hex for |

**Returns:** _`Promise<string>`_

---

### prepareForPost

▸ **prepareForPost**(`order`: `Order`, `poster`: string): _`Promise<PostableOrder>`_

_Defined in [src/OrderHelper.ts:41](url)_

Generate a poster signature for OrderStream submission

**Parameters:**

| Name     | Type    | Default value | Description                          |
| -------- | ------- | ------------- | ------------------------------------ |
| `order`  | `Order` | -             | Order to prepare                     |
| `poster` | string  | order.maker   | (Optional) Poster to sign order with |

**Returns:** _`Promise<PostableOrder>`_

---

### recoverMaker

▸ **recoverMaker**(`order`: `Order`): _`Promise<string>`_

_Defined in [src/OrderHelper.ts:70](url)_

Recover the maker

**Parameters:**

| Name    | Type    | Description                 |
| ------- | ------- | --------------------------- |
| `order` | `Order` | Order to recover maker from |

**Returns:** _`Promise<string>`_

---

### recoverPoster

▸ **recoverPoster**(`order`: `PostableOrder`): _`Promise<string>`_

_Defined in [src/OrderHelper.ts:80](url)_

Recover the poster

**Parameters:**

| Name    | Type            | Description                  |
| ------- | --------------- | ---------------------------- |
| `order` | `PostableOrder` | Order to recover poster from |

**Returns:** _`Promise<string>`_

---

### takeOrder

▸ **takeOrder**(`order`: `TakeableOrder`, `taker`: string): _`Promise<any>`_

_Defined in [src/OrderHelper.ts:31](url)_

Take a prepared order on the ethereum blockchain

**Parameters:**

| Name    | Type            |
| ------- | --------------- |
| `order` | `TakeableOrder` |
| `taker` | string          |

**Returns:** _`Promise<any>`_

---
