> ## [kosu-system-contracts](../README.md)

[Globals](../globals.md) / [PosterRegistryProxyContract](posterregistryproxycontract.md) /

# Class: PosterRegistryProxyContract

## Hierarchy

* `BaseContract`

  * **PosterRegistryProxyContract**

### Index

#### Constructors

* [constructor](posterregistryproxycontract.md#constructor)

#### Properties

* [abi](posterregistryproxycontract.md#abi)
* [address](posterregistryproxycontract.md#address)
* [constructorArgs](posterregistryproxycontract.md#constructorargs)
* [contractName](posterregistryproxycontract.md#contractname)
* [txReceipt](posterregistryproxycontract.md#optional-txreceipt)

#### Methods

* [deployAsync](posterregistryproxycontract.md#static-deployasync)
* [deployFrom0xArtifactAsync](posterregistryproxycontract.md#static-deployfrom0xartifactasync)
* [strictArgumentEncodingCheck](posterregistryproxycontract.md#static-strictargumentencodingcheck)

#### Object literals

* [registerTokens](posterregistryproxycontract.md#registertokens)
* [releaseTokens](posterregistryproxycontract.md#releasetokens)
* [setImplementation](posterregistryproxycontract.md#setimplementation)
* [token](posterregistryproxycontract.md#token)
* [tokensContributed](posterregistryproxycontract.md#tokenscontributed)
* [tokensRegisteredFor](posterregistryproxycontract.md#tokensregisteredfor)
* [treasury](posterregistryproxycontract.md#treasury)

## Constructors

###  constructor

\+ **new PosterRegistryProxyContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): *[PosterRegistryProxyContract](posterregistryproxycontract.md)*

*Overrides void*

Defined in generated-wrappers/poster_registry_proxy.ts:505

**Parameters:**

Name | Type |
------ | ------ |
`abi` | `ContractAbi` |
`address` | string |
`supportedProvider` | `SupportedProvider` |
`txDefaults?` | `Partial<TxData>` |

**Returns:** *[PosterRegistryProxyContract](posterregistryproxycontract.md)*

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

Defined in generated-wrappers/poster_registry_proxy.ts:29

___

## Methods

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `implementation`: string, `auth`: string): *`Promise<PosterRegistryProxyContract>`*

Defined in generated-wrappers/poster_registry_proxy.ts:465

**Parameters:**

Name | Type |
------ | ------ |
`bytecode` | string |
`abi` | `ContractAbi` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |
`implementation` | string |
`auth` | string |

**Returns:** *`Promise<PosterRegistryProxyContract>`*

___

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `implementation`: string, `auth`: string): *`Promise<PosterRegistryProxyContract>`*

Defined in generated-wrappers/poster_registry_proxy.ts:448

**Parameters:**

Name | Type |
------ | ------ |
`artifact` | `ContractArtifact` | `SimpleContractArtifact` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |
`implementation` | string |
`auth` | string |

**Returns:** *`Promise<PosterRegistryProxyContract>`*

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

Defined in generated-wrappers/poster_registry_proxy.ts:188

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/poster_registry_proxy.ts:211

**Parameters:**

Name | Type |
------ | ------ |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in generated-wrappers/poster_registry_proxy.ts:265

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/poster_registry_proxy.ts:239

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`amount`: `BigNumber`): *string*

Defined in generated-wrappers/poster_registry_proxy.ts:257

**Parameters:**

Name | Type |
------ | ------ |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/poster_registry_proxy.ts:189

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  releaseTokens

### ■ **releaseTokens**: *object*

Defined in generated-wrappers/poster_registry_proxy.ts:30

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/poster_registry_proxy.ts:53

**Parameters:**

Name | Type |
------ | ------ |
`amount` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in generated-wrappers/poster_registry_proxy.ts:107

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/poster_registry_proxy.ts:81

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`amount`: `BigNumber`): *string*

Defined in generated-wrappers/poster_registry_proxy.ts:99

**Parameters:**

Name | Type |
------ | ------ |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/poster_registry_proxy.ts:31

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  setImplementation

### ■ **setImplementation**: *object*

Defined in generated-wrappers/poster_registry_proxy.ts:318

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`implementation`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/poster_registry_proxy.ts:341

**Parameters:**

Name | Type |
------ | ------ |
`implementation` | string |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`implementation`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in generated-wrappers/poster_registry_proxy.ts:395

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`implementation` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`implementation`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/poster_registry_proxy.ts:369

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`implementation` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`implementation`: string): *string*

Defined in generated-wrappers/poster_registry_proxy.ts:387

**Parameters:**

Name | Type |
------ | ------ |
`implementation` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`implementation`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/poster_registry_proxy.ts:319

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`implementation` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  token

### ■ **token**: *object*

Defined in generated-wrappers/poster_registry_proxy.ts:422

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in generated-wrappers/poster_registry_proxy.ts:423

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___

###  tokensContributed

### ■ **tokensContributed**: *object*

Defined in generated-wrappers/poster_registry_proxy.ts:292

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in generated-wrappers/poster_registry_proxy.ts:293

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  tokensRegisteredFor

### ■ **tokensRegisteredFor**: *object*

Defined in generated-wrappers/poster_registry_proxy.ts:160

###  callAsync

▸ **callAsync**(`a`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in generated-wrappers/poster_registry_proxy.ts:161

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

Defined in generated-wrappers/poster_registry_proxy.ts:134

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in generated-wrappers/poster_registry_proxy.ts:135

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___