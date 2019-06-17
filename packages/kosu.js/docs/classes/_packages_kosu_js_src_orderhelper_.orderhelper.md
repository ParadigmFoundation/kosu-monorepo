> ## [@kosu/system-contracts](../README.md)

[Globals](../globals.md) / ["packages/kosu.js/src/OrderHelper"](../modules/_packages_kosu_js_src_orderhelper_.md) / [OrderHelper](_packages_kosu_js_src_orderhelper_.orderhelper.md) /

# Class: OrderHelper

## Hierarchy

* **OrderHelper**

### Index

#### Constructors

* [constructor](_packages_kosu_js_src_orderhelper_.orderhelper.md#constructor)

#### Properties

* [orderGateway](_packages_kosu_js_src_orderhelper_.orderhelper.md#private-ordergateway)
* [web3](_packages_kosu_js_src_orderhelper_.orderhelper.md#private-web3)

#### Methods

* [makeOrder](_packages_kosu_js_src_orderhelper_.orderhelper.md#makeorder)
* [makerHex](_packages_kosu_js_src_orderhelper_.orderhelper.md#makerhex)
* [prepareForPost](_packages_kosu_js_src_orderhelper_.orderhelper.md#prepareforpost)
* [recoverMaker](_packages_kosu_js_src_orderhelper_.orderhelper.md#recovermaker)
* [recoverPoster](_packages_kosu_js_src_orderhelper_.orderhelper.md#recoverposter)
* [takeOrder](_packages_kosu_js_src_orderhelper_.orderhelper.md#takeorder)

## Constructors

###  constructor

\+ **new OrderHelper**(`web3`: `Web3`, `orderGateway`: [OrderGateway](_packages_kosu_js_src_ordergateway_.ordergateway.md)): *[OrderHelper](_packages_kosu_js_src_orderhelper_.orderhelper.md)*

*Defined in [packages/kosu.js/src/OrderHelper.ts:9](url)*

**Parameters:**

Name | Type |
------ | ------ |
`web3` | `Web3` |
`orderGateway` | [OrderGateway](_packages_kosu_js_src_ordergateway_.ordergateway.md) |

**Returns:** *[OrderHelper](_packages_kosu_js_src_orderhelper_.orderhelper.md)*

___

## Properties

### `Private` orderGateway

● **orderGateway**: *[OrderGateway](_packages_kosu_js_src_ordergateway_.ordergateway.md)*

*Defined in [packages/kosu.js/src/OrderHelper.ts:8](url)*

___

### `Private` web3

● **web3**: *`Web3`*

*Defined in [packages/kosu.js/src/OrderHelper.ts:9](url)*

___

## Methods

###  makeOrder

▸ **makeOrder**(`order`: `Order`): *`Promise<Order>`*

*Defined in [packages/kosu.js/src/OrderHelper.ts:21](url)*

Make an order by ensuring a required signature is  present

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | Order to make  |

**Returns:** *`Promise<Order>`*

___

###  makerHex

▸ **makerHex**(`order`: `Order`): *`Promise<string>`*

*Defined in [packages/kosu.js/src/OrderHelper.ts:60](url)*

Generate the maker hex

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | Order to get maker hex for  |

**Returns:** *`Promise<string>`*

___

###  prepareForPost

▸ **prepareForPost**(`order`: `Order`, `poster`: string): *`Promise<PostableOrder>`*

*Defined in [packages/kosu.js/src/OrderHelper.ts:41](url)*

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

*Defined in [packages/kosu.js/src/OrderHelper.ts:70](url)*

Recover the maker

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | Order to recover maker from  |

**Returns:** *`Promise<string>`*

___

###  recoverPoster

▸ **recoverPoster**(`order`: `PostableOrder`): *`Promise<string>`*

*Defined in [packages/kosu.js/src/OrderHelper.ts:80](url)*

Recover the poster

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `PostableOrder` | Order to recover poster from  |

**Returns:** *`Promise<string>`*

___

###  takeOrder

▸ **takeOrder**(`order`: `TakeableOrder`, `taker`: string): *`Promise<any>`*

*Defined in [packages/kosu.js/src/OrderHelper.ts:31](url)*

Take a prepared order on the ethereum blockchain

**Parameters:**

Name | Type |
------ | ------ |
`order` | `TakeableOrder` |
`taker` | string |

**Returns:** *`Promise<any>`*

___