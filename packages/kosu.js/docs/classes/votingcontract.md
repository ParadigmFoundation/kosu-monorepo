> ## [kosu.js](../README.md)

[Globals](../globals.md) / [VotingContract](votingcontract.md) /

# Class: VotingContract

## Hierarchy

* `BaseContract`

  * **VotingContract**

### Index

#### Constructors

* [constructor](votingcontract.md#constructor)

#### Properties

* [_abiEncoderByFunctionSignature](votingcontract.md#protected-_abiencoderbyfunctionsignature)
* [_web3Wrapper](votingcontract.md#protected-_web3wrapper)
* [abi](votingcontract.md#abi)
* [address](votingcontract.md#address)
* [constructorArgs](votingcontract.md#constructorargs)
* [contractName](votingcontract.md#contractname)
* [txReceipt](votingcontract.md#optional-txreceipt)

#### Methods

* [_lookupAbi](votingcontract.md#protected-_lookupabi)
* [_lookupAbiEncoder](votingcontract.md#protected-_lookupabiencoder)
* [_strictEncodeArguments](votingcontract.md#protected-_strictencodearguments)
* [_applyDefaultsToTxDataAsync](votingcontract.md#static-protected-_applydefaultstotxdataasync)
* [_bigNumberToString](votingcontract.md#static-protected-_bignumbertostring)
* [_formatABIDataItemList](votingcontract.md#static-protected-_formatabidataitemlist)
* [_lookupConstructorAbi](votingcontract.md#static-protected-_lookupconstructorabi)
* [_lowercaseAddress](votingcontract.md#static-protected-_lowercaseaddress)
* [_throwIfRevertWithReasonCallResult](votingcontract.md#static-protected-_throwifrevertwithreasoncallresult)
* [deployAsync](votingcontract.md#static-deployasync)
* [deployFrom0xArtifactAsync](votingcontract.md#static-deployfrom0xartifactasync)
* [strictArgumentEncodingCheck](votingcontract.md#static-strictargumentencodingcheck)

#### Object literals

* [commitVote](votingcontract.md#commitvote)
* [createPoll](votingcontract.md#createpoll)
* [nextPollId](votingcontract.md#nextpollid)
* [revealVote](votingcontract.md#revealvote)
* [totalRevealedTokens](votingcontract.md#totalrevealedtokens)
* [totalWinningTokens](votingcontract.md#totalwinningtokens)
* [userWinningTokens](votingcontract.md#userwinningtokens)
* [winningOption](votingcontract.md#winningoption)

## Constructors

###  constructor

\+ **new VotingContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): *[VotingContract](votingcontract.md)*

*Overrides void*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:594

**Parameters:**

Name | Type |
------ | ------ |
`abi` | `ContractAbi` |
`address` | string |
`supportedProvider` | `SupportedProvider` |
`txDefaults?` | `Partial<TxData>` |

**Returns:** *[VotingContract](votingcontract.md)*

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

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:29

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

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `treasuryAddress`: string, `_emitterAddress`: string): *`Promise<VotingContract>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:554

**Parameters:**

Name | Type |
------ | ------ |
`bytecode` | string |
`abi` | `ContractAbi` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |
`treasuryAddress` | string |
`_emitterAddress` | string |

**Returns:** *`Promise<VotingContract>`*

___

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `treasuryAddress`: string, `_emitterAddress`: string): *`Promise<VotingContract>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:537

**Parameters:**

Name | Type |
------ | ------ |
`artifact` | `ContractArtifact` | `SimpleContractArtifact` |
`supportedProvider` | `SupportedProvider` |
`txDefaults` | `Partial<TxData>` |
`treasuryAddress` | string |
`_emitterAddress` | string |

**Returns:** *`Promise<VotingContract>`*

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

###  commitVote

### ■ **commitVote**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:411

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:440

**Parameters:**

Name | Type |
------ | ------ |
`_pollId` | `BigNumber` |
`_vote` | string |
`_tokensToCommit` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:506

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_pollId` | `BigNumber` | - |
`_vote` | string | - |
`_tokensToCommit` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:472

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_pollId` | `BigNumber` | - |
`_vote` | string | - |
`_tokensToCommit` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:494

**Parameters:**

Name | Type |
------ | ------ |
`_pollId` | `BigNumber` |
`_vote` | string |
`_tokensToCommit` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:412

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_pollId` | `BigNumber` | - |
`_vote` | string | - |
`_tokensToCommit` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  createPoll

### ■ **createPoll**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:266

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`_commitEndBlock`: `BigNumber`, `_revealEndBlock`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:292

**Parameters:**

Name | Type |
------ | ------ |
`_commitEndBlock` | `BigNumber` |
`_revealEndBlock` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`_commitEndBlock`: `BigNumber`, `_revealEndBlock`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:352

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_commitEndBlock` | `BigNumber` | - |
`_revealEndBlock` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`_commitEndBlock`: `BigNumber`, `_revealEndBlock`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:322

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_commitEndBlock` | `BigNumber` | - |
`_revealEndBlock` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`_commitEndBlock`: `BigNumber`, `_revealEndBlock`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:342

**Parameters:**

Name | Type |
------ | ------ |
`_commitEndBlock` | `BigNumber` |
`_revealEndBlock` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`_commitEndBlock`: `BigNumber`, `_revealEndBlock`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:267

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_commitEndBlock` | `BigNumber` | - |
`_revealEndBlock` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  nextPollId

### ■ **nextPollId**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:86

###  callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:87

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  revealVote

### ■ **revealVote**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:140

###  awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`_pollId`: `BigNumber`, `_voteOption`: `BigNumber`, `_voteSalt`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:169

**Parameters:**

Name | Type |
------ | ------ |
`_pollId` | `BigNumber` |
`_voteOption` | `BigNumber` |
`_voteSalt` | `BigNumber` |
`txData?` | `Partial<TxData>` | number |
`pollingIntervalMs?` | number |
`timeoutMs?` | number |

**Returns:** *`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`*

###  callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `_voteOption`: `BigNumber`, `_voteSalt`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<void>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:235

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_pollId` | `BigNumber` | - |
`_voteOption` | `BigNumber` | - |
`_voteSalt` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<void>`*

###  estimateGasAsync

▸ **estimateGasAsync**(`_pollId`: `BigNumber`, `_voteOption`: `BigNumber`, `_voteSalt`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<number>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:201

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_pollId` | `BigNumber` | - |
`_voteOption` | `BigNumber` | - |
`_voteSalt` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<number>`*

###  getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`_pollId`: `BigNumber`, `_voteOption`: `BigNumber`, `_voteSalt`: `BigNumber`): *string*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:223

**Parameters:**

Name | Type |
------ | ------ |
`_pollId` | `BigNumber` |
`_voteOption` | `BigNumber` |
`_voteSalt` | `BigNumber` |

**Returns:** *string*

###  sendTransactionAsync

▸ **sendTransactionAsync**(`_pollId`: `BigNumber`, `_voteOption`: `BigNumber`, `_voteSalt`: `BigNumber`, `txData`: `Partial<TxData>`): *`Promise<string>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:141

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_pollId` | `BigNumber` | - |
`_voteOption` | `BigNumber` | - |
`_voteSalt` | `BigNumber` | - |
`txData` | `Partial<TxData>` |  {} |

**Returns:** *`Promise<string>`*

___

###  totalRevealedTokens

### ■ **totalRevealedTokens**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:112

###  callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:113

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_pollId` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  totalWinningTokens

### ■ **totalWinningTokens**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:58

###  callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:59

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_pollId` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  userWinningTokens

### ■ **userWinningTokens**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:381

###  callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `_user`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:382

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_pollId` | `BigNumber` | - |
`_user` | string | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___

###  winningOption

### ■ **winningOption**: *object*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:30

###  callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): *`Promise<BigNumber>`*

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:31

**Parameters:**

Name | Type | Default value |
------ | ------ | ------ |
`_pollId` | `BigNumber` | - |
`callData` | `Partial<CallData>` |  {} |
`defaultBlock?` | `BlockParam` | - |

**Returns:** *`Promise<BigNumber>`*

___