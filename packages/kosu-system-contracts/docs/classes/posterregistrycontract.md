> ## [kosu-system-contracts](../README.md)

[Globals](../globals.md) / [PosterRegistryContract](posterregistrycontract.md) /

# Class: PosterRegistryContract

## Hierarchy

* `BaseContract`

  * **PosterRegistryContract**

### Index

#### Constructors

* [constructor](posterregistrycontract.md#constructor)

#### Properties

* [_abiEncoderByFunctionSignature](posterregistrycontract.md#protected-_abiencoderbyfunctionsignature)
* [_web3Wrapper](posterregistrycontract.md#protected-_web3wrapper)
* [abi](posterregistrycontract.md#abi)
* [address](posterregistrycontract.md#address)
* [constructorArgs](posterregistrycontract.md#constructorargs)
* [contractName](posterregistrycontract.md#contractname)
* [txReceipt](posterregistrycontract.md#optional-txreceipt)

#### Methods

* [_lookupAbi](posterregistrycontract.md#protected-_lookupabi)
* [_lookupAbiEncoder](posterregistrycontract.md#protected-_lookupabiencoder)
* [_strictEncodeArguments](posterregistrycontract.md#protected-_strictencodearguments)
* [_applyDefaultsToTxDataAsync](posterregistrycontract.md#static-protected-_applydefaultstotxdataasync)
* [_bigNumberToString](posterregistrycontract.md#static-protected-_bignumbertostring)
* [_formatABIDataItemList](posterregistrycontract.md#static-protected-_formatabidataitemlist)
* [_lookupConstructorAbi](posterregistrycontract.md#static-protected-_lookupconstructorabi)
* [_lowercaseAddress](posterregistrycontract.md#static-protected-_lowercaseaddress)
* [_throwIfRevertWithReasonCallResult](posterregistrycontract.md#static-protected-_throwifrevertwithreasoncallresult)
* [deployAsync](posterregistrycontract.md#static-deployasync)
* [deployFrom0xArtifactAsync](posterregistrycontract.md#static-deployfrom0xartifactasync)
* [strictArgumentEncodingCheck](posterregistrycontract.md#static-strictargumentencodingcheck)

#### Object literals

* [registerTokens](posterregistrycontract.md#registertokens)
* [releaseTokens](posterregistrycontract.md#releasetokens)
* [token](posterregistrycontract.md#token)
* [tokensContributed](posterregistrycontract.md#tokenscontributed)
* [tokensRegisteredFor](posterregistrycontract.md#tokensregisteredfor)
* [treasury](posterregistrycontract.md#treasury)

## Constructors

###  constructor

\+ **new PosterRegistryContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): *[PosterRegistryContract](posterregistrycontract.md)*

*Overrides void*

Defined in generated-wrappers/poster_registry.ts:430

**Parameters:**

Name | Type |
------ | ------ |
`abi` | `ContractAbi` |
`address` | string |
`supportedProvider` | `SupportedProvider` |
`txDefaults?` | `Partial<TxData>` |

**Returns:** *[PosterRegistryContract](posterregistrycontract.md)*

___

## Properties

### `Protected` _abiEncoderByFunctionSignature

● **_abiEncoderByFunctionSignature**: *`AbiEncoderByFunctionSignature`*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:20

___

### `Protected` _web3Wrapper

● **_web3Wrapper**: *`Web3Wrapper`*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:21

___

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

Defined in generated-wrappers/poster_registry.ts:29

___

## Methods

### `Protected` _lookupAbi

▸ **_lookupAbi**(`functionSignature`: string): *`MethodAbi`*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`functionSignature` | string |

**Returns:** *`MethodAbi`*

___

### `Protected` _lookupAbiEncoder

▸ **_lookupAbiEncoder**(`functionSignature`: string): *`Method`*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:33

**Parameters:**

Name | Type |
------ | ------ |
`functionSignature` | string |

**Returns:** *`Method`*

___

### `Protected` _strictEncodeArguments

▸ **_strictEncodeArguments**(`functionSignature`: string, `functionArguments`: any): *string*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:35

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

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:30

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

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:28

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

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:26

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

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:29

**Parameters:**

Name | Type |
------ | ------ |
`abi` | `ContractAbi` |

**Returns:** *`ConstructorAbi`*

___

### `Static` `Protected` _lowercaseAddress

▸ **_lowercaseAddress**(`type`: string, `value`: string): *string*

*Inherited from void*

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:27

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

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:31

**Parameters:**

Name | Type |
------ | ------ |
`rawCallResult` | string |

**Returns:** *void*

___

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `_treasuryAddress`: string, `_events`: string, `_auth`: string): *`Promise<PosterRegistryContract>`*

Defined in generated-wrappers/poster_registry.ts:385

**Parameters:**

Name | Type |
------ | ------ |
`bytecode` | string |
`abi` | `ContractAbi` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |
`_treasuryAddress` | string |
`_events` | string |
`_auth` | string |

**Returns:** *`Promise<PosterRegistryContract>`*

___

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `_treasuryAddress`: string, `_events`: string, `_auth`: string): *`Promise<PosterRegistryContract>`*

Defined in generated-wrappers/poster_registry.ts:366

**Parameters:**

Name | Type |
------ | ------ |
`artifact` | `ContractArtifact` | `SimpleContractArtifact` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |
`_treasuryAddress` | string |
`_events` | string |
`_auth` | string |

**Returns:** *`Promise<PosterRegistryContract>`*

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

###  registerTokens

### ■ **registerTokens**: *object*

Defined in generated-wrappers/poster_registry.ts:56

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/poster_registry.ts:82

**Parameters:**

Name | Type |
------ | ------ |
`msgSender` | string |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`msgSender`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in generated-wrappers/poster_registry.ts:142

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`msgSender` | string | - |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/poster_registry.ts:112

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`msgSender` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`msgSender`: string, `amount`: `BigNumber`): *string*

Defined in generated-wrappers/poster_registry.ts:132

**Parameters:**

Name | Type |
------ | ------ |
`msgSender` | string |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/poster_registry.ts:57

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`msgSender` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  releaseTokens

### ■ **releaseTokens**: *object*

Defined in generated-wrappers/poster_registry.ts:225

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/poster_registry.ts:251

**Parameters:**

Name | Type |
------ | ------ |
`msgSender` | string |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`msgSender`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in generated-wrappers/poster_registry.ts:311

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`msgSender` | string | - |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/poster_registry.ts:281

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`msgSender` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`msgSender`: string, `amount`: `BigNumber`): *string*

Defined in generated-wrappers/poster_registry.ts:301

**Parameters:**

Name | Type |
------ | ------ |
`msgSender` | string |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`msgSender`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/poster_registry.ts:226

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`msgSender` | string | - |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  token

### ■ **token**: *object*

Defined in generated-wrappers/poster_registry.ts:340

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in generated-wrappers/poster_registry.ts:341

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___

###  tokensContributed

### ■ **tokensContributed**: *object*

Defined in generated-wrappers/poster_registry.ts:199

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in generated-wrappers/poster_registry.ts:200

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  tokensRegisteredFor

### ■ **tokensRegisteredFor**: *object*

Defined in generated-wrappers/poster_registry.ts:171

###  callAsync

▸ **callAsync**(`a`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in generated-wrappers/poster_registry.ts:172

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`a` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  treasury

### ■ **treasury**: *object*

Defined in generated-wrappers/poster_registry.ts:30

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in generated-wrappers/poster_registry.ts:31

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___