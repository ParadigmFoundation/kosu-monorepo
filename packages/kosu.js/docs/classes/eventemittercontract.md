> ## [@kosu/system-contracts](../README.md)

[Globals](../globals.md) / [EventEmitterContract](eventemittercontract.md) /

# Class: EventEmitterContract

## Hierarchy

* `BaseContract`

  * **EventEmitterContract**

### Index

#### Constructors

* [constructor](eventemittercontract.md#constructor)

#### Properties

* [_abiEncoderByFunctionSignature](eventemittercontract.md#protected-_abiencoderbyfunctionsignature)
* [_web3Wrapper](eventemittercontract.md#protected-_web3wrapper)
* [abi](eventemittercontract.md#abi)
* [address](eventemittercontract.md#address)
* [constructorArgs](eventemittercontract.md#constructorargs)
* [contractName](eventemittercontract.md#contractname)
* [txReceipt](eventemittercontract.md#optional-txreceipt)

#### Methods

* [_lookupAbi](eventemittercontract.md#protected-_lookupabi)
* [_lookupAbiEncoder](eventemittercontract.md#protected-_lookupabiencoder)
* [_strictEncodeArguments](eventemittercontract.md#protected-_strictencodearguments)
* [_applyDefaultsToTxDataAsync](eventemittercontract.md#static-protected-_applydefaultstotxdataasync)
* [_bigNumberToString](eventemittercontract.md#static-protected-_bignumbertostring)
* [_formatABIDataItemList](eventemittercontract.md#static-protected-_formatabidataitemlist)
* [_lookupConstructorAbi](eventemittercontract.md#static-protected-_lookupconstructorabi)
* [_lowercaseAddress](eventemittercontract.md#static-protected-_lowercaseaddress)
* [_throwIfRevertWithReasonCallResult](eventemittercontract.md#static-protected-_throwifrevertwithreasoncallresult)
* [deployAsync](eventemittercontract.md#static-deployasync)
* [deployFrom0xArtifactAsync](eventemittercontract.md#static-deployfrom0xartifactasync)
* [strictArgumentEncodingCheck](eventemittercontract.md#static-strictargumentencodingcheck)

#### Object literals

* [emitEvent](eventemittercontract.md#emitevent)

## Constructors

###  constructor

\+ **new EventEmitterContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): *[EventEmitterContract](eventemittercontract.md)*

*Overrides void*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:219

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

### `Protected` _abiEncoderByFunctionSignature

● **_abiEncoderByFunctionSignature**: *`AbiEncoderByFunctionSignature`*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:20

___

### `Protected` _web3Wrapper

● **_web3Wrapper**: *`Web3Wrapper`*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:21

___

###  abi

● **abi**: *`ContractAbi`*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:22

___

###  address

● **address**: *string*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:23

___

###  constructorArgs

● **constructorArgs**: *any[]*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:25

___

###  contractName

● **contractName**: *string*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:24

___

### `Optional` txReceipt

● **txReceipt**? : *`TransactionReceiptWithDecodedLogs`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:42

___

## Methods

### `Protected` _lookupAbi

▸ **_lookupAbi**(`functionSignature`: string): *`MethodAbi`*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`functionSignature` | string |

**Returns:** *`MethodAbi`*

___

### `Protected` _lookupAbiEncoder

▸ **_lookupAbiEncoder**(`functionSignature`: string): *`Method`*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:33

**Parameters:**

Name | Type |
------ | ------ |
`functionSignature` | string |

**Returns:** *`Method`*

___

### `Protected` _strictEncodeArguments

▸ **_strictEncodeArguments**(`functionSignature`: string, `functionArguments`: any): *string*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:35

**Parameters:**

Name | Type |
------ | ------ |
`functionSignature` | string |
`functionArguments` | any |

**Returns:** *string*

___

### `Static` `Protected` _applyDefaultsToTxDataAsync

▸ **_applyDefaultsToTxDataAsync**<**T**>(`txData`: `T`, `txDefaults`: `Partial<TxData>`, `estimateGasAsync?`: function): *`Promise<TxData>`*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:30

**Type parameters:**

■` T`: *`Partial<TxData | TxDataPayable>`*

**Parameters:**

■` txData`: *`T`*

■` txDefaults`: *`Partial<TxData>`*

■` estimateGasAsync`: *function*

▸ (`txData`: `T`): *`Promise<number>`*

**Parameters:**

Name | Type |
------ | ------ |
`txData` | `T` |

**Returns:** *`Promise<TxData>`*

___

### `Static` `Protected` _bigNumberToString

▸ **_bigNumberToString**(`_type`: string, `value`: any): *any*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`_type` | string |
`value` | any |

**Returns:** *any*

___

### `Static` `Protected` _formatABIDataItemList

▸ **_formatABIDataItemList**(`abis`: `DataItem`[], `values`: any[], `formatter`: function): *any*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:26

**Parameters:**

■` abis`: *`DataItem`[]*

■` values`: *any[]*

■` formatter`: *function*

▸ (`type`: string, `value`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`value` | any |

**Returns:** *any*

___

### `Static` `Protected` _lookupConstructorAbi

▸ **_lookupConstructorAbi**(`abi`: `ContractAbi`): *`ConstructorAbi`*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:29

**Parameters:**

Name | Type |
------ | ------ |
`abi` | `ContractAbi` |

**Returns:** *`ConstructorAbi`*

___

### `Static` `Protected` _lowercaseAddress

▸ **_lowercaseAddress**(`type`: string, `value`: string): *string*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:27

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |
`value` | string |

**Returns:** *string*

___

### `Static` `Protected` _throwIfRevertWithReasonCallResult

▸ **_throwIfRevertWithReasonCallResult**(`rawCallResult`: string): *void*

*Inherited from void*

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:31

**Parameters:**

Name | Type |
------ | ------ |
`rawCallResult` | string |

**Returns:** *void*

___

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `auth`: string): *`Promise<EventEmitterContract>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:184

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:169

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:32

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:43

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`eventType`: string, `data`: string[], `stringData`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:72

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:138

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:104

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:126

**Parameters:**

Name | Type |
------ | ------ |
`eventType` | string |
`data` | string[] |
`stringData` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`eventType`: string, `data`: string[], `stringData`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/event_emitter.ts:44

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`eventType` | string | - |
`data` | string[] | - |
`stringData` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___