> ## [kosu.js](../README.md)

[Globals](../globals.md) / [PosterRegistryProxyContract](posterregistryproxycontract.md) /

# Class: PosterRegistryProxyContract

## Hierarchy

* `BaseContract`

  * **PosterRegistryProxyContract**

### Index

#### Constructors

* [constructor](posterregistryproxycontract.md#constructor)

#### Properties

* [_abiEncoderByFunctionSignature](posterregistryproxycontract.md#protected-_abiencoderbyfunctionsignature)
* [_web3Wrapper](posterregistryproxycontract.md#protected-_web3wrapper)
* [abi](posterregistryproxycontract.md#abi)
* [address](posterregistryproxycontract.md#address)
* [constructorArgs](posterregistryproxycontract.md#constructorargs)
* [contractName](posterregistryproxycontract.md#contractname)
* [txReceipt](posterregistryproxycontract.md#optional-txreceipt)

#### Methods

* [_lookupAbi](posterregistryproxycontract.md#protected-_lookupabi)
* [_lookupAbiEncoder](posterregistryproxycontract.md#protected-_lookupabiencoder)
* [_strictEncodeArguments](posterregistryproxycontract.md#protected-_strictencodearguments)
* [_applyDefaultsToTxDataAsync](posterregistryproxycontract.md#static-protected-_applydefaultstotxdataasync)
* [_bigNumberToString](posterregistryproxycontract.md#static-protected-_bignumbertostring)
* [_formatABIDataItemList](posterregistryproxycontract.md#static-protected-_formatabidataitemlist)
* [_lookupConstructorAbi](posterregistryproxycontract.md#static-protected-_lookupconstructorabi)
* [_lowercaseAddress](posterregistryproxycontract.md#static-protected-_lowercaseaddress)
* [_throwIfRevertWithReasonCallResult](posterregistryproxycontract.md#static-protected-_throwifrevertwithreasoncallresult)
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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:505

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:29

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

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `implementation`: string, `auth`: string): *`Promise<PosterRegistryProxyContract>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:465

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:448

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:188

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:211

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:265

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:239

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:257

**Parameters:**

Name | Type |
------ | ------ |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:189

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  releaseTokens

### ■ **releaseTokens**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:30

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:53

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:107

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:81

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`amount`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:99

**Parameters:**

Name | Type |
------ | ------ |
`amount` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:31

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`amount` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  setImplementation

### ■ **setImplementation**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:318

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`implementation`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:341

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:395

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`implementation` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`implementation`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:369

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`implementation` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`implementation`: string): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:387

**Parameters:**

Name | Type |
------ | ------ |
`implementation` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`implementation`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:319

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`implementation` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  token

### ■ **token**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:422

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:423

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___

###  tokensContributed

### ■ **tokensContributed**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:292

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:293

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  tokensRegisteredFor

### ■ **tokensRegisteredFor**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:160

###  callAsync

▸ **callAsync**(`a`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:161

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:134

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/poster_registry_proxy.ts:135

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___