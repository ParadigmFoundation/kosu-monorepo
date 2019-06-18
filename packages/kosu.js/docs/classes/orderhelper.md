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

*Defined in [src/OrderHelper.ts:24](url)*

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

*Defined in [src/OrderHelper.ts:24](url)*

Instance of the `OrderGateway` wrapper.

___

### `Private` web3

● **web3**: *`Web3`*

*Defined in [src/OrderHelper.ts:19](url)*

An instance of `web3` used to interact with the Ethereum blockchain.

___

## Methods

###  makeOrder

▸ **makeOrder**(`order`: `Order`): *`Promise<Order>`*

*Defined in [src/OrderHelper.ts:44](url)*

Sign and complete a maker order (requires a pre-configured Order object).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | Order to sign as a maker. |

**Returns:** *`Promise<Order>`*

The supplied maker order with an appended `makerSignature`.

___

###  makerHex

▸ **makerHex**(`order`: `Order`): *`Promise<string>`*

*Defined in [src/OrderHelper.ts:92](url)*

Generate the maker hex (serialized `makerValues`).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | Order to get maker hex for  |

**Returns:** *`Promise<string>`*

___

###  prepareForPost

▸ **prepareForPost**(`order`: `Order`, `poster`: string): *`Promise<PostableOrder>`*

*Defined in [src/OrderHelper.ts:73](url)*

Sign and order as a poster and append the poster signature to an order
prior to submission to the Kosu relay network.

**Parameters:**

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`order` | `Order` | - | Order to prepare (by appending a poster signature). |
`poster` | string |  order.maker | Poster address to sign order with, defaults to the order's maker. |

**Returns:** *`Promise<PostableOrder>`*

The maker order now signed and prepared for post with an appended `posterSignature`.

___

###  recoverMaker

▸ **recoverMaker**(`order`: `Order`): *`Promise<string>`*

*Defined in [src/OrderHelper.ts:102](url)*

Recover the maker address from a signed order.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | A signed order to recover maker address from.  |

**Returns:** *`Promise<string>`*

___

###  recoverPoster

▸ **recoverPoster**(`order`: `PostableOrder`): *`Promise<string>`*

*Defined in [src/OrderHelper.ts:113](url)*

Recover the poster address from a maker order that has been signed from a
poster.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `PostableOrder` | Order to recover poster from (must be signed by a poster).  |

**Returns:** *`Promise<string>`*

___

###  takeOrder

▸ **takeOrder**(`order`: `TakeableOrder`, `taker`: string): *`Promise<any>`*

*Defined in [src/OrderHelper.ts:61](url)*

Take a signed maker order on the Ethereum blockchain via the order's
specified SubContract, from the supplied taker address (should be available
via configured `web` provider).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `TakeableOrder` | A signed and fillable maker order object. |
`taker` | string | The Ethereum address of the taker (must be available to sign via provider). |

**Returns:** *`Promise<any>`*

The value defined by the order's SubContract implementation, usually `true`
for successfully filled orders, and `false` for failed fills.

___