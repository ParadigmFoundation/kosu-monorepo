> ## [kosu.js](../README.md)

[Globals](../globals.md) / [OrderHelper](orderhelper.md) /

# Class: OrderHelper

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

*Defined in [src/OrderHelper.ts:9](url)*

**Parameters:**

Name | Type |
------ | ------ |
`web3` | `Web3` |
`orderGateway` | [OrderGateway](ordergateway.md) |

**Returns:** *[OrderHelper](orderhelper.md)*

___

## Properties

### `Private` orderGateway

● **orderGateway**: *[OrderGateway](ordergateway.md)*

*Defined in [src/OrderHelper.ts:8](url)*

___

### `Private` web3

● **web3**: *`Web3`*

*Defined in [src/OrderHelper.ts:9](url)*

___

## Methods

###  makeOrder

▸ **makeOrder**(`order`: `Order`): *`Promise<Order>`*

*Defined in [src/OrderHelper.ts:21](url)*

Make an order by ensuring a required signature is  present

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | Order to make  |

**Returns:** *`Promise<Order>`*

___

###  makerHex

▸ **makerHex**(`order`: `Order`): *`Promise<string>`*

*Defined in [src/OrderHelper.ts:60](url)*

Generate the maker hex

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | Order to get maker hex for  |

**Returns:** *`Promise<string>`*

___

###  prepareForPost

▸ **prepareForPost**(`order`: `Order`, `poster`: string): *`Promise<PostableOrder>`*

*Defined in [src/OrderHelper.ts:41](url)*

Generate a poster signature for OrderStream submission

**Parameters:**

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`order` | `Order` | - | Order to prepare |
`poster` | string |  order.maker | (Optional) Poster to sign order with  |

**Returns:** *`Promise<PostableOrder>`*

___

###  recoverMaker

▸ **recoverMaker**(`order`: `Order`): *`Promise<string>`*

*Defined in [src/OrderHelper.ts:70](url)*

Recover the maker

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | Order to recover maker from  |

**Returns:** *`Promise<string>`*

___

###  recoverPoster

▸ **recoverPoster**(`order`: `PostableOrder`): *`Promise<string>`*

*Defined in [src/OrderHelper.ts:80](url)*

Recover the poster

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `PostableOrder` | Order to recover poster from  |

**Returns:** *`Promise<string>`*

___

###  takeOrder

▸ **takeOrder**(`order`: `TakeableOrder`, `taker`: string): *`Promise<any>`*

*Defined in [src/OrderHelper.ts:31](url)*

Take a prepared order on the ethereum blockchain

**Parameters:**

Name | Type |
------ | ------ |
`order` | `TakeableOrder` |
`taker` | string |

**Returns:** *`Promise<any>`*

___