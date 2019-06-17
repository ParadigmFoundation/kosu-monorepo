> ## [@kosu/system-contracts](../README.md)

[Globals](../globals.md) / ["packages/kosu.js/src/OrderSerializer"](_packages_kosu_js_src_orderserializer_.md) /

# External module: "packages/kosu.js/src/OrderSerializer"

### Index

#### Functions

* [_serialize](_packages_kosu_js_src_orderserializer_.md#_serialize)

#### Object literals

* [OrderSerializer](_packages_kosu_js_src_orderserializer_.md#const-orderserializer)

## Functions

###  _serialize

▸ **_serialize**(`_arguments`: any, `values`: any): *string*

*Defined in [packages/kosu.js/src/OrderSerializer.ts:8](url)*

**Parameters:**

Name | Type |
------ | ------ |
`_arguments` | any |
`values` | any |

**Returns:** *string*

___

## Object literals

### `Const` OrderSerializer

### ■ **OrderSerializer**: *object*

*Defined in [packages/kosu.js/src/OrderSerializer.ts:42](url)*

could add to utils (or create order-utils pacakge)

###  makerHex

▸ **makerHex**(`order`: `Order`, `_arguments`: any): *string*

*Defined in [packages/kosu.js/src/OrderSerializer.ts:84](url)*

Generate the maker hex from order

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | to generate hex from |
`_arguments` | any | Argument json defined in the subContract  |

**Returns:** *string*

###  posterSignatureHex

▸ **posterSignatureHex**(`order`: `Order`, `_arguments`: any): *string*

*Defined in [packages/kosu.js/src/OrderSerializer.ts:64](url)*

Generates hex to be used for the poster signing process

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | Order to get data for |
`_arguments` | any | Argument json defined in the subContract  |

**Returns:** *string*

###  recoverMaker

▸ **recoverMaker**(`order`: `Order`, `_arguments`: any[]): *string*

*Defined in [packages/kosu.js/src/OrderSerializer.ts:105](url)*

Recovers the maker from the signed information

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `Order` | to recover address from |
`_arguments` | any[] | Argument json defined in the subContract  |

**Returns:** *string*

###  recoverPoster

▸ **recoverPoster**(`order`: `PostableOrder`, `_arguments`: any[]): *string*

*Defined in [packages/kosu.js/src/OrderSerializer.ts:74](url)*

Recovers the poster from the poster signature

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | `PostableOrder` | Order to recover address that signed |
`_arguments` | any[] | Argument json defined in the subContract  |

**Returns:** *string*

###  serialize

▸ **serialize**(`_arguments`: any, `order`: `Order`): *string*

*Defined in [packages/kosu.js/src/OrderSerializer.ts:49](url)*

Serializes the data into bytes

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`_arguments` | any | Argument json defined in the subContract |
`order` | `Order` | Order to serialize  |

**Returns:** *string*

___