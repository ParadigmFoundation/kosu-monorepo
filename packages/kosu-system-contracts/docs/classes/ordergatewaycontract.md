> ## [kosu-system-contracts](../README.md)

[Globals](../globals.md) / [OrderGatewayContract](ordergatewaycontract.md) /

# Class: OrderGatewayContract

## Hierarchy

* `BaseContract`

  * **OrderGatewayContract**

### Index

#### Constructors

* [constructor](ordergatewaycontract.md#constructor)

#### Properties

* [abi](ordergatewaycontract.md#abi)
* [address](ordergatewaycontract.md#address)
* [constructorArgs](ordergatewaycontract.md#constructorargs)
* [contractName](ordergatewaycontract.md#contractname)
* [txReceipt](ordergatewaycontract.md#optional-txreceipt)

#### Methods

* [deployAsync](ordergatewaycontract.md#static-deployasync)
* [deployFrom0xArtifactAsync](ordergatewaycontract.md#static-deployfrom0xartifactasync)
* [strictArgumentEncodingCheck](ordergatewaycontract.md#static-strictargumentencodingcheck)

#### Object literals

* [amountRemaining](ordergatewaycontract.md#amountremaining)
* [arguments](ordergatewaycontract.md#arguments)
* [isValid](ordergatewaycontract.md#isvalid)
* [participate](ordergatewaycontract.md#participate)

## Constructors

###  constructor

\+ **new OrderGatewayContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): *[OrderGatewayContract](ordergatewaycontract.md)*

*Overrides void*

Defined in generated-wrappers/order_gateway.ts:276

**Parameters:**

Name | Type |
------ | ------ |
`abi` | `ContractAbi` |
`address` | string |
`supportedProvider` | `SupportedProvider` |
`txDefaults?` | `Partial<TxData>` |

**Returns:** *[OrderGatewayContract](ordergatewaycontract.md)*

___

## Properties

###  abi

● **abi**: *`ContractAbi`*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:22

___

###  address

● **address**: *string*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:23

___

###  constructorArgs

● **constructorArgs**: *any[]*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:25

___

###  contractName

● **contractName**: *string*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:24

___

### `Optional` txReceipt

● **txReceipt**? : *`TransactionReceiptWithDecodedLogs`*

Defined in generated-wrappers/order_gateway.ts:29

___

## Methods

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`): *`Promise<OrderGatewayContract>`*

Defined in generated-wrappers/order_gateway.ts:246

**Parameters:**

Name | Type |
------ | ------ |
`bytecode` | string |
`abi` | `ContractAbi` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |

**Returns:** *`Promise<OrderGatewayContract>`*

___

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`): *`Promise<OrderGatewayContract>`*

Defined in generated-wrappers/order_gateway.ts:233

**Parameters:**

Name | Type |
------ | ------ |
`artifact` | `ContractArtifact` | `SimpleContractArtifact` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |

**Returns:** *`Promise<OrderGatewayContract>`*

___

### `Static` strictArgumentEncodingCheck

▸ **strictArgumentEncodingCheck**(`inputAbi`: `DataItem`[], `args`: any[]): *string*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:32

**Parameters:**

Name | Type |
------ | ------ |
`inputAbi` | `DataItem`[] |
`args` | any[] |

**Returns:** *string*

___

## Object literals

###  amountRemaining

### ■ **amountRemaining**: *object*

Defined in generated-wrappers/order_gateway.ts:173

###  callAsync

▸ **callAsync**(`subContract`: string, `data`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in generated-wrappers/order_gateway.ts:174

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`subContract` | string | - |
`data` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  arguments

### ■ **arguments**: *object*

Defined in generated-wrappers/order_gateway.ts:145

###  callAsync

▸ **callAsync**(`subContract`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in generated-wrappers/order_gateway.ts:146

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`subContract` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___

###  isValid

### ■ **isValid**: *object*

Defined in generated-wrappers/order_gateway.ts:203

###  callAsync

▸ **callAsync**(`subContract`: string, `data`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<boolean>`*

Defined in generated-wrappers/order_gateway.ts:204

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`subContract` | string | - |
`data` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<boolean>`*

___

###  participate

### ■ **participate**: *object*

Defined in generated-wrappers/order_gateway.ts:30

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`subContract`: string, `data`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/order_gateway.ts:56

**Parameters:**

Name | Type |
------ | ------ |
`subContract` | string |
`data` | string |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`subContract`: string, `data`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<boolean>`*

Defined in generated-wrappers/order_gateway.ts:116

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`subContract` | string | - |
`data` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<boolean>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`subContract`: string, `data`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/order_gateway.ts:86

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`subContract` | string | - |
`data` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`subContract`: string, `data`: string): *string*

Defined in generated-wrappers/order_gateway.ts:106

**Parameters:**

Name | Type |
------ | ------ |
`subContract` | string |
`data` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`subContract`: string, `data`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/order_gateway.ts:31

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`subContract` | string | - |
`data` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___