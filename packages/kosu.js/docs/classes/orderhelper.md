> ## [kosu.js](../README.md)

[Globals](../globals.md) / [OrderHelper](orderhelper.md) /

# Class: OrderHelper

The `OrderHelper` provides methods for interacting with maker orders, such as
participating in trades (as a taker), signing maker order's for execution and
for submission to the Kosu relay network.

Requires a configured `web3` provider that allows signatures and the execution
of transactions.

## Hierarchy

* **OrderHelper**

### Index

#### Constructors

* [constructor](orderhelper.md#constructor)

#### Properties

* [orderGateway](orderhelper.md#private-ordergateway)
* [web3](orderhelper.md#private-web3)

#### Methods

* [makeOrder](orderhelper.md#makeorder)
* [makerHex](orderhelper.md#makerhex)
* [prepareForPost](orderhelper.md#prepareforpost)
* [recoverMaker](orderhelper.md#recovermaker)
* [recoverPoster](orderhelper.md#recoverposter)
* [takeOrder](orderhelper.md#takeorder)

## Constructors

###  constructor

\+ **new OrderHelper**(`web3`: `Web3`, `orderGateway`: [OrderGateway](ordergateway.md)): *[OrderHelper](orderhelper.md)*

*Defined in [OrderHelper.ts:24](url)*

Create a new `OrderHelper` instance (requires a provider via supplied `web3`
instance).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`web3` | `Web3` | An instance of `Web3` with an active node provider. |
`orderGateway` | [OrderGateway](ordergateway.md) | An instantiated `OrderGateway` wrapper.  |

**Returns:** *[OrderHelper](orderhelper.md)*

___

## Properties

### `Private` orderGateway

● **orderGateway**: *[OrderGateway](ordergateway.md)*

*Defined in [OrderHelper.ts:24](url)*

Instance of the `OrderGateway` wrapper.

___

### `Private` web3

● **web3**: *`Web3`*

*Defined in [OrderHelper.ts:19](url)*

An instance of `web3` used to interact with the Ethereum blockchain.

___

## Methods

###  makeOrder

▸ **makeOrder**(`order`: [Order](../interfaces/order.md)): *`Promise<Order>`*

*Defined in [OrderHelper.ts:44](url)*

Sign and complete a maker order (requires a pre-configured Order object).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](../interfaces/order.md) | Order to sign as a maker. |

**Returns:** *`Promise<Order>`*

The supplied maker order with an appended `makerSignature`.

___

###  makerHex

▸ **makerHex**(`order`: [Order](../interfaces/order.md)): *`Promise<string>`*

*Defined in [OrderHelper.ts:92](url)*

Generate the maker hex (serialized `makerValues`).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](../interfaces/order.md) | Order to get maker hex for  |

**Returns:** *`Promise<string>`*

___

###  prepareForPost

▸ **prepareForPost**(`order`: [Order](../interfaces/order.md), `poster`: string): *`Promise<PostableOrder>`*

*Defined in [OrderHelper.ts:73](url)*

Sign and order as a poster and append the poster signature to an order
prior to submission to the Kosu relay network.

**Parameters:**

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`order` | [Order](../interfaces/order.md) | - | Order to prepare (by appending a poster signature). |
`poster` | string |  order.maker | Poster address to sign order with, defaults to the order's maker. |

**Returns:** *`Promise<PostableOrder>`*

The maker order now signed and prepared for post with an appended `posterSignature`.

___

###  recoverMaker

▸ **recoverMaker**(`order`: [Order](../interfaces/order.md)): *`Promise<string>`*

*Defined in [OrderHelper.ts:102](url)*

Recover the maker address from a signed order.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [Order](../interfaces/order.md) | A signed order to recover maker address from.  |

**Returns:** *`Promise<string>`*

___

###  recoverPoster

▸ **recoverPoster**(`order`: [PostableOrder](../interfaces/postableorder.md)): *`Promise<string>`*

*Defined in [OrderHelper.ts:113](url)*

Recover the poster address from a maker order that has been signed from a
poster.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [PostableOrder](../interfaces/postableorder.md) | Order to recover poster from (must be signed by a poster).  |

**Returns:** *`Promise<string>`*

___

###  takeOrder

▸ **takeOrder**(`order`: [TakeableOrder](../interfaces/takeableorder.md), `taker`: string): *`Promise<any>`*

*Defined in [OrderHelper.ts:61](url)*

Take a signed maker order on the Ethereum blockchain via the order's
specified SubContract, from the supplied taker address (should be available
via configured `web` provider).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | [TakeableOrder](../interfaces/takeableorder.md) | A signed and fillable maker order object. |
`taker` | string | The Ethereum address of the taker (must be available to sign via provider). |

**Returns:** *`Promise<any>`*

The value defined by the order's SubContract implementation, usually `true`
for successfully filled orders, and `false` for failed fills.

___