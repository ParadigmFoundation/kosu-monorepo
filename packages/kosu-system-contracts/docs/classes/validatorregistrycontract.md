> ## [kosu-system-contracts](../README.md)

[Globals](../globals.md) / [ValidatorRegistryContract](validatorregistrycontract.md) /

# Class: ValidatorRegistryContract

## Hierarchy

* `BaseContract`

  * **ValidatorRegistryContract**

### Index

#### Constructors

* [constructor](validatorregistrycontract.md#constructor)

#### Properties

* [_abiEncoderByFunctionSignature](validatorregistrycontract.md#protected-_abiencoderbyfunctionsignature)
* [_web3Wrapper](validatorregistrycontract.md#protected-_web3wrapper)
* [abi](validatorregistrycontract.md#abi)
* [address](validatorregistrycontract.md#address)
* [constructorArgs](validatorregistrycontract.md#constructorargs)
* [contractName](validatorregistrycontract.md#contractname)
* [txReceipt](validatorregistrycontract.md#optional-txreceipt)

#### Methods

* [_lookupAbi](validatorregistrycontract.md#protected-_lookupabi)
* [_lookupAbiEncoder](validatorregistrycontract.md#protected-_lookupabiencoder)
* [_strictEncodeArguments](validatorregistrycontract.md#protected-_strictencodearguments)
* [_applyDefaultsToTxDataAsync](validatorregistrycontract.md#static-protected-_applydefaultstotxdataasync)
* [_bigNumberToString](validatorregistrycontract.md#static-protected-_bignumbertostring)
* [_formatABIDataItemList](validatorregistrycontract.md#static-protected-_formatabidataitemlist)
* [_lookupConstructorAbi](validatorregistrycontract.md#static-protected-_lookupconstructorabi)
* [_lowercaseAddress](validatorregistrycontract.md#static-protected-_lowercaseaddress)
* [_throwIfRevertWithReasonCallResult](validatorregistrycontract.md#static-protected-_throwifrevertwithreasoncallresult)
* [deployAsync](validatorregistrycontract.md#static-deployasync)
* [deployFrom0xArtifactAsync](validatorregistrycontract.md#static-deployfrom0xartifactasync)
* [strictArgumentEncodingCheck](validatorregistrycontract.md#static-strictargumentencodingcheck)

#### Object literals

* [_listingKeys](validatorregistrycontract.md#_listingkeys)
* [applicationPeriod](validatorregistrycontract.md#applicationperiod)
* [challengeListing](validatorregistrycontract.md#challengelisting)
* [challengePeriod](validatorregistrycontract.md#challengeperiod)
* [claimRewards](validatorregistrycontract.md#claimrewards)
* [claimWinnings](validatorregistrycontract.md#claimwinnings)
* [commitPeriod](validatorregistrycontract.md#commitperiod)
* [confirmListing](validatorregistrycontract.md#confirmlisting)
* [exitPeriod](validatorregistrycontract.md#exitperiod)
* [finalizeExit](validatorregistrycontract.md#finalizeexit)
* [getAllChallenges](validatorregistrycontract.md#getallchallenges)
* [getAllListings](validatorregistrycontract.md#getalllistings)
* [getChallenge](validatorregistrycontract.md#getchallenge)
* [getChallenges](validatorregistrycontract.md#getchallenges)
* [getListing](validatorregistrycontract.md#getlisting)
* [getListings](validatorregistrycontract.md#getlistings)
* [initExit](validatorregistrycontract.md#initexit)
* [kosuToken](validatorregistrycontract.md#kosutoken)
* [listingKeys](validatorregistrycontract.md#listingkeys)
* [maxRewardRate](validatorregistrycontract.md#maxrewardrate)
* [minimumBalance](validatorregistrycontract.md#minimumbalance)
* [nextChallenge](validatorregistrycontract.md#nextchallenge)
* [registerListing](validatorregistrycontract.md#registerlisting)
* [resolveChallenge](validatorregistrycontract.md#resolvechallenge)
* [rewardPeriod](validatorregistrycontract.md#rewardperiod)
* [stakeholderCut](validatorregistrycontract.md#stakeholdercut)
* [treasury](validatorregistrycontract.md#treasury)
* [voting](validatorregistrycontract.md#voting)

## Constructors

###  constructor

\+ **new ValidatorRegistryContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): *[ValidatorRegistryContract](validatorregistrycontract.md)*

*Overrides void*

Defined in generated-wrappers/validator_registry.ts:1542

**Parameters:**

Name | Type |
------ | ------ |
`abi` | `ContractAbi` |
`address` | string |
`supportedProvider` | `SupportedProvider` |
`txDefaults?` | `Partial<TxData>` |

**Returns:** *[ValidatorRegistryContract](validatorregistrycontract.md)*

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

Defined in generated-wrappers/validator_registry.ts:29

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

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `_treasuryAddress`: string, `_votingAddress`: string, `auth`: string, `_events`: string, `_applicationPeriod`: `BigNumber`, `_commitPeriod`: `BigNumber`, `_challengePeriod`: `BigNumber`, `_exitPeriod`: `BigNumber`, `_rewardPeriod`: `BigNumber`): *`Promise<ValidatorRegistryContract>`*

Defined in generated-wrappers/validator_registry.ts:1467

**Parameters:**

Name | Type |
------ | ------ |
`bytecode` | string |
`abi` | `ContractAbi` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |
`_treasuryAddress` | string |
`_votingAddress` | string |
`auth` | string |
`_events` | string |
`_applicationPeriod` | `BigNumber` |
`_commitPeriod` | `BigNumber` |
`_challengePeriod` | `BigNumber` |
`_exitPeriod` | `BigNumber` |
`_rewardPeriod` | `BigNumber` |

**Returns:** *`Promise<ValidatorRegistryContract>`*

___

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `_treasuryAddress`: string, `_votingAddress`: string, `auth`: string, `_events`: string, `_applicationPeriod`: `BigNumber`, `_commitPeriod`: `BigNumber`, `_challengePeriod`: `BigNumber`, `_exitPeriod`: `BigNumber`, `_rewardPeriod`: `BigNumber`): *`Promise<ValidatorRegistryContract>`*

Defined in generated-wrappers/validator_registry.ts:1436

**Parameters:**

Name | Type |
------ | ------ |
`artifact` | `ContractArtifact` | `SimpleContractArtifact` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |
`_treasuryAddress` | string |
`_votingAddress` | string |
`auth` | string |
`_events` | string |
`_applicationPeriod` | `BigNumber` |
`_commitPeriod` | `BigNumber` |
`_challengePeriod` | `BigNumber` |
`_exitPeriod` | `BigNumber` |
`_rewardPeriod` | `BigNumber` |

**Returns:** *`Promise<ValidatorRegistryContract>`*

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

###  _listingKeys

### ■ **_listingKeys**: *object*

Defined in generated-wrappers/validator_registry.ts:1148

###  callAsync

▸ **callAsync**(`index_0`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in generated-wrappers/validator_registry.ts:1149

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`index_0` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___

###  applicationPeriod

### ■ **applicationPeriod**: *object*

Defined in generated-wrappers/validator_registry.ts:1176

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in generated-wrappers/validator_registry.ts:1177

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  challengeListing

### ■ **challengeListing**: *object*

Defined in generated-wrappers/validator_registry.ts:929

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`tendermintPublicKey`: string, `details`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/validator_registry.ts:955

**Parameters:**

Name | Type |
------ | ------ |
`tendermintPublicKey` | string |
`details` | string |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`tendermintPublicKey`: string, `details`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in generated-wrappers/validator_registry.ts:1015

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`tendermintPublicKey` | string | - |
`details` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`tendermintPublicKey`: string, `details`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/validator_registry.ts:985

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`tendermintPublicKey` | string | - |
`details` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`tendermintPublicKey`: string, `details`: string): *string*

Defined in generated-wrappers/validator_registry.ts:1005

**Parameters:**

Name | Type |
------ | ------ |
`tendermintPublicKey` | string |
`details` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`tendermintPublicKey`: string, `details`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/validator_registry.ts:930

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`tendermintPublicKey` | string | - |
`details` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  challengePeriod

### ■ **challengePeriod**: *object*

Defined in generated-wrappers/validator_registry.ts:1358

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in generated-wrappers/validator_registry.ts:1359

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  claimRewards

### ■ **claimRewards**: *object*

Defined in generated-wrappers/validator_registry.ts:771

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`pubKey`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/validator_registry.ts:794

**Parameters:**

Name | Type |
------ | ------ |
`pubKey` | string |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`pubKey`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in generated-wrappers/validator_registry.ts:848

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`pubKey` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`pubKey`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/validator_registry.ts:822

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`pubKey` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`pubKey`: string): *string*

Defined in generated-wrappers/validator_registry.ts:840

**Parameters:**

Name | Type |
------ | ------ |
`pubKey` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`pubKey`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/validator_registry.ts:772

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`pubKey` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  claimWinnings

### ■ **claimWinnings**: *object*

Defined in generated-wrappers/validator_registry.ts:641

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`challengeId`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/validator_registry.ts:664

**Parameters:**

Name | Type |
------ | ------ |
`challengeId` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`challengeId`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in generated-wrappers/validator_registry.ts:718

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`challengeId` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`challengeId`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/validator_registry.ts:692

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`challengeId` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`challengeId`: `BigNumber`): *string*

Defined in generated-wrappers/validator_registry.ts:710

**Parameters:**

Name | Type |
------ | ------ |
`challengeId` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`challengeId`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/validator_registry.ts:642

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`challengeId` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  commitPeriod

### ■ **commitPeriod**: *object*

Defined in generated-wrappers/validator_registry.ts:1384

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in generated-wrappers/validator_registry.ts:1385

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  confirmListing

### ■ **confirmListing**: *object*

Defined in generated-wrappers/validator_registry.ts:511

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`tendermintPublicKey`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/validator_registry.ts:534

**Parameters:**

Name | Type |
------ | ------ |
`tendermintPublicKey` | string |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`tendermintPublicKey`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in generated-wrappers/validator_registry.ts:588

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`tendermintPublicKey` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`tendermintPublicKey`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/validator_registry.ts:562

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`tendermintPublicKey` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`tendermintPublicKey`: string): *string*

Defined in generated-wrappers/validator_registry.ts:580

**Parameters:**

Name | Type |
------ | ------ |
`tendermintPublicKey` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`tendermintPublicKey`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/validator_registry.ts:512

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`tendermintPublicKey` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  exitPeriod

### ■ **exitPeriod**: *object*

Defined in generated-wrappers/validator_registry.ts:745

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in generated-wrappers/validator_registry.ts:746

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  finalizeExit

### ■ **finalizeExit**: *object*

Defined in generated-wrappers/validator_registry.ts:134

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`tendermintPublicKey`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/validator_registry.ts:157

**Parameters:**

Name | Type |
------ | ------ |
`tendermintPublicKey` | string |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`tendermintPublicKey`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in generated-wrappers/validator_registry.ts:211

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`tendermintPublicKey` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`tendermintPublicKey`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/validator_registry.ts:185

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`tendermintPublicKey` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`tendermintPublicKey`: string): *string*

Defined in generated-wrappers/validator_registry.ts:203

**Parameters:**

Name | Type |
------ | ------ |
`tendermintPublicKey` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`tendermintPublicKey`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/validator_registry.ts:135

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`tendermintPublicKey` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  getAllChallenges

### ■ **getAllChallenges**: *object*

Defined in generated-wrappers/validator_registry.ts:903

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<Array<object>>`*

Defined in generated-wrappers/validator_registry.ts:904

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<Array<object>>`*

___

###  getAllListings

### ■ **getAllListings**: *object*

Defined in generated-wrappers/validator_registry.ts:1096

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<Array<object>>`*

Defined in generated-wrappers/validator_registry.ts:1097

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<Array<object>>`*

___

###  getChallenge

### ■ **getChallenge**: *object*

Defined in generated-wrappers/validator_registry.ts:292

###  callAsync

▸ **callAsync**(`challengeId`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<object>`*

Defined in generated-wrappers/validator_registry.ts:293

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`challengeId` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<object>`*

___

###  getChallenges

### ■ **getChallenges**: *object*

Defined in generated-wrappers/validator_registry.ts:320

###  callAsync

▸ **callAsync**(`challengeIds`: `BigNumber`[], `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<Array<object>>`*

Defined in generated-wrappers/validator_registry.ts:321

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`challengeIds` | `BigNumber`[] | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<Array<object>>`*

___

###  getListing

### ■ **getListing**: *object*

Defined in generated-wrappers/validator_registry.ts:264

###  callAsync

▸ **callAsync**(`pubKey`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<object>`*

Defined in generated-wrappers/validator_registry.ts:265

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`pubKey` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<object>`*

___

###  getListings

### ■ **getListings**: *object*

Defined in generated-wrappers/validator_registry.ts:875

###  callAsync

▸ **callAsync**(`pubKeys`: string[], `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<Array<object>>`*

Defined in generated-wrappers/validator_registry.ts:876

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`pubKeys` | string[] | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<Array<object>>`*

___

###  initExit

### ■ **initExit**: *object*

Defined in generated-wrappers/validator_registry.ts:30

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`tendermintPublicKey`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/validator_registry.ts:53

**Parameters:**

Name | Type |
------ | ------ |
`tendermintPublicKey` | string |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`tendermintPublicKey`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in generated-wrappers/validator_registry.ts:107

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`tendermintPublicKey` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`tendermintPublicKey`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/validator_registry.ts:81

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`tendermintPublicKey` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`tendermintPublicKey`: string): *string*

Defined in generated-wrappers/validator_registry.ts:99

**Parameters:**

Name | Type |
------ | ------ |
`tendermintPublicKey` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`tendermintPublicKey`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/validator_registry.ts:31

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`tendermintPublicKey` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  kosuToken

### ■ **kosuToken**: *object*

Defined in generated-wrappers/validator_registry.ts:1306

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in generated-wrappers/validator_registry.ts:1307

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___

###  listingKeys

### ■ **listingKeys**: *object*

Defined in generated-wrappers/validator_registry.ts:1070

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string[]>`*

Defined in generated-wrappers/validator_registry.ts:1071

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string[]>`*

___

###  maxRewardRate

### ■ **maxRewardRate**: *object*

Defined in generated-wrappers/validator_registry.ts:238

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in generated-wrappers/validator_registry.ts:239

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  minimumBalance

### ■ **minimumBalance**: *object*

Defined in generated-wrappers/validator_registry.ts:1122

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in generated-wrappers/validator_registry.ts:1123

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  nextChallenge

### ■ **nextChallenge**: *object*

Defined in generated-wrappers/validator_registry.ts:348

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in generated-wrappers/validator_registry.ts:349

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  registerListing

### ■ **registerListing**: *object*

Defined in generated-wrappers/validator_registry.ts:374

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`tendermintPublicKey`: string, `tokensToStake`: `BigNumber`, `rewardRate`: `BigNumber`, `details`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/validator_registry.ts:406

**Parameters:**

Name | Type |
------ | ------ |
`tendermintPublicKey` | string |
`tokensToStake` | `BigNumber` |
`rewardRate` | `BigNumber` |
`details` | string |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`tendermintPublicKey`: string, `tokensToStake`: `BigNumber`, `rewardRate`: `BigNumber`, `details`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in generated-wrappers/validator_registry.ts:478

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`tendermintPublicKey` | string | - |
`tokensToStake` | `BigNumber` | - |
`rewardRate` | `BigNumber` | - |
`details` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`tendermintPublicKey`: string, `tokensToStake`: `BigNumber`, `rewardRate`: `BigNumber`, `details`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/validator_registry.ts:440

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`tendermintPublicKey` | string | - |
`tokensToStake` | `BigNumber` | - |
`rewardRate` | `BigNumber` | - |
`details` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`tendermintPublicKey`: string, `tokensToStake`: `BigNumber`, `rewardRate`: `BigNumber`, `details`: string): *string*

Defined in generated-wrappers/validator_registry.ts:464

**Parameters:**

Name | Type |
------ | ------ |
`tendermintPublicKey` | string |
`tokensToStake` | `BigNumber` |
`rewardRate` | `BigNumber` |
`details` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`tendermintPublicKey`: string, `tokensToStake`: `BigNumber`, `rewardRate`: `BigNumber`, `details`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/validator_registry.ts:375

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`tendermintPublicKey` | string | - |
`tokensToStake` | `BigNumber` | - |
`rewardRate` | `BigNumber` | - |
`details` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  resolveChallenge

### ■ **resolveChallenge**: *object*

Defined in generated-wrappers/validator_registry.ts:1202

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`pubKey`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in generated-wrappers/validator_registry.ts:1225

**Parameters:**

Name | Type |
------ | ------ |
`pubKey` | string |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`pubKey`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in generated-wrappers/validator_registry.ts:1279

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`pubKey` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`pubKey`: string, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in generated-wrappers/validator_registry.ts:1253

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`pubKey` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`pubKey`: string): *string*

Defined in generated-wrappers/validator_registry.ts:1271

**Parameters:**

Name | Type |
------ | ------ |
`pubKey` | string |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`pubKey`: string, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in generated-wrappers/validator_registry.ts:1203

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`pubKey` | string | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  rewardPeriod

### ■ **rewardPeriod**: *object*

Defined in generated-wrappers/validator_registry.ts:1332

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in generated-wrappers/validator_registry.ts:1333

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  stakeholderCut

### ■ **stakeholderCut**: *object*

Defined in generated-wrappers/validator_registry.ts:1044

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in generated-wrappers/validator_registry.ts:1045

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  treasury

### ■ **treasury**: *object*

Defined in generated-wrappers/validator_registry.ts:615

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in generated-wrappers/validator_registry.ts:616

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___

###  voting

### ■ **voting**: *object*

Defined in generated-wrappers/validator_registry.ts:1410

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<string>`*

Defined in generated-wrappers/validator_registry.ts:1411

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<string>`*

___