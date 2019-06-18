> ## [kosu-system-contracts](../README.md)

[Globals](../globals.md) / [EventEmitterContract](eventemittercontract.md) /

# Class: EventEmitterContract

## Hierarchy

* `BaseContract`

  * **EventEmitterContract**

### Index

#### Constructors

* [constructor](eventemittercontract.md#constructor)

#### Properties

* [abi](eventemittercontract.md#abi)
* [address](eventemittercontract.md#address)
* [constructorArgs](eventemittercontract.md#constructorargs)
* [contractName](eventemittercontract.md#contractname)
* [txReceipt](eventemittercontract.md#optional-txreceipt)

#### Methods

* [deployAsync](eventemittercontract.md#static-deployasync)
* [deployFrom0xArtifactAsync](eventemittercontract.md#static-deployfrom0xartifactasync)
* [strictArgumentEncodingCheck](eventemittercontract.md#static-strictargumentencodingcheck)

#### Object literals

* [emitEvent](eventemittercontract.md#emitevent)

## Constructors

###  constructor

\+ **new EventEmitterContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): *[EventEmitterContract](eventemittercontract.md)*

*Overrides void*

Defined in generated-wrappers/event_emitter.ts:219

**Parameters:**

Name | Type |
------ | ------ |
`abi` | `ContractAbi` |
`address` | string |
`supportedProvider` | `SupportedProvider` |
`txDefaults?` | `Partial<TxData>` |

**Returns:** *[EventEmitterContract](eventemittercontract.md)*

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

Defined in generated-wrappers/event_emitter.ts:42

___

## Methods

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `auth`: string): *`Promise<EventEmitterContract>`*

Defined in generated-wrappers/event_emitter.ts:184

**Parameters:**

Name | Type |
------ | ------ |
`bytecode` | string |
`abi` | `ContractAbi` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |
`auth` | string |

**Returns:** *`Promise<EventEmitterContract>`*

___

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `auth`: string): *`Promise<EventEmitterContract>`*

Defined in generated-wrappers/event_emitter.ts:169

**Parameters:**

Name | Type |
------ | ------ |
`artifact` | `ContractArtifact` | `SimpleContractArtifact` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |
`auth` | string |

**Returns:** *`Promise<EventEmitterContract>`*

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

###  emitEvent

### ■ **emitEvent**: *object*

Defined in generated-wrappers/event_emitter.ts:43

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`eventType`: string, `data`: string[], `stringData`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/event_emitter.ts:72

**Parameters:**

Name | Type |
------ | ------ |
`eventType` | string |
`data` | string[] |
`stringData` | string |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`eventType`: string, `data`: string[], `stringData`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in generated-wrappers/event_emitter.ts:138

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`eventType` | string | - |
`data` | string[] | - |
`stringData` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`eventType`: string, `data`: string[], `stringData`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/event_emitter.ts:104

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`eventType` | string | - |
`data` | string[] | - |
`stringData` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`eventType`: string, `data`: string[], `stringData`: string): *string*

Defined in generated-wrappers/event_emitter.ts:126

**Parameters:**

Name | Type |
------ | ------ |
`eventType` | string |
`data` | string[] |
`stringData` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`eventType`: string, `data`: string[], `stringData`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/event_emitter.ts:44

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`eventType` | string | - |
`data` | string[] | - |
`stringData` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___