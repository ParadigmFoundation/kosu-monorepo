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

* [abi](posterregistrycontract.md#abi)
* [address](posterregistrycontract.md#address)
* [constructorArgs](posterregistrycontract.md#constructorargs)
* [contractName](posterregistrycontract.md#contractname)
* [txReceipt](posterregistrycontract.md#optional-txreceipt)

#### Methods

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