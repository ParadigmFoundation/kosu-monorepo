> ## [kosu.js](../README.md)

[Globals](../globals.md) / [VotingContract](votingcontract.md) /

# Class: VotingContract

## Hierarchy

-   `BaseContract`

    -   **VotingContract**

### Index

#### Constructors

-   [constructor](votingcontract.md#constructor)

#### Properties

-   [\_abiEncoderByFunctionSignature](votingcontract.md#protected-_abiencoderbyfunctionsignature)
-   [\_web3Wrapper](votingcontract.md#protected-_web3wrapper)
-   [abi](votingcontract.md#abi)
-   [address](votingcontract.md#address)
-   [constructorArgs](votingcontract.md#constructorargs)
-   [contractName](votingcontract.md#contractname)
-   [txReceipt](votingcontract.md#optional-txreceipt)

#### Methods

-   [\_lookupAbi](votingcontract.md#protected-_lookupabi)
-   [\_lookupAbiEncoder](votingcontract.md#protected-_lookupabiencoder)
-   [\_strictEncodeArguments](votingcontract.md#protected-_strictencodearguments)
-   [\_applyDefaultsToTxDataAsync](votingcontract.md#static-protected-_applydefaultstotxdataasync)
-   [\_bigNumberToString](votingcontract.md#static-protected-_bignumbertostring)
-   [\_formatABIDataItemList](votingcontract.md#static-protected-_formatabidataitemlist)
-   [\_lookupConstructorAbi](votingcontract.md#static-protected-_lookupconstructorabi)
-   [\_lowercaseAddress](votingcontract.md#static-protected-_lowercaseaddress)
-   [\_throwIfRevertWithReasonCallResult](votingcontract.md#static-protected-_throwifrevertwithreasoncallresult)
-   [deployAsync](votingcontract.md#static-deployasync)
-   [deployFrom0xArtifactAsync](votingcontract.md#static-deployfrom0xartifactasync)
-   [strictArgumentEncodingCheck](votingcontract.md#static-strictargumentencodingcheck)

#### Object literals

-   [commitVote](votingcontract.md#commitvote)
-   [createPoll](votingcontract.md#createpoll)
-   [nextPollId](votingcontract.md#nextpollid)
-   [revealVote](votingcontract.md#revealvote)
-   [totalRevealedTokens](votingcontract.md#totalrevealedtokens)
-   [totalWinningTokens](votingcontract.md#totalwinningtokens)
-   [userWinningTokens](votingcontract.md#userwinningtokens)
-   [winningOption](votingcontract.md#winningoption)

## Constructors

### constructor

\+ **new VotingContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): _[VotingContract](votingcontract.md)_

_Overrides void_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:594

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `abi`               | `ContractAbi`       |
| `address`           | string              |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults?`       | `Partial<TxData>`   |

**Returns:** _[VotingContract](votingcontract.md)_

---

## Properties

### `Protected` \_abiEncoderByFunctionSignature

● **\_abiEncoderByFunctionSignature**: _`AbiEncoderByFunctionSignature`_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:20

---

### `Protected` \_web3Wrapper

● **\_web3Wrapper**: _`Web3Wrapper`_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:21

---

### abi

● **abi**: _`ContractAbi`_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:22

---

### address

● **address**: _string_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:23

---

### constructorArgs

● **constructorArgs**: _any[]_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:25

---

### contractName

● **contractName**: _string_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:24

---

### `Optional` txReceipt

● **txReceipt**? : _`TransactionReceiptWithDecodedLogs`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:29

---

## Methods

### `Protected` \_lookupAbi

▸ **\_lookupAbi**(`functionSignature`: string): _`MethodAbi`_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:34

**Parameters:**

| Name                | Type   |
| ------------------- | ------ |
| `functionSignature` | string |

**Returns:** _`MethodAbi`_

---

### `Protected` \_lookupAbiEncoder

▸ **\_lookupAbiEncoder**(`functionSignature`: string): _`Method`_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:33

**Parameters:**

| Name                | Type   |
| ------------------- | ------ |
| `functionSignature` | string |

**Returns:** _`Method`_

---

### `Protected` \_strictEncodeArguments

▸ **\_strictEncodeArguments**(`functionSignature`: string, `functionArguments`: any): _string_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:35

**Parameters:**

| Name                | Type   |
| ------------------- | ------ |
| `functionSignature` | string |
| `functionArguments` | any    |

**Returns:** _string_

---

### `Static` `Protected` \_applyDefaultsToTxDataAsync

▸ **\_applyDefaultsToTxDataAsync**<**T**>(`txData`: `T`, `txDefaults`: `Partial<TxData>`, `estimateGasAsync?`: function): _`Promise<TxData>`_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:30

**Type parameters:**

■`T`: _`Partial<TxData | TxDataPayable>`_

**Parameters:**

■`txData`: _`T`_

■`txDefaults`: _`Partial<TxData>`_

■`estimateGasAsync`: _function_

▸ (`txData`: `T`): _`Promise<number>`_

**Parameters:**

| Name     | Type |
| -------- | ---- |
| `txData` | `T`  |

**Returns:** _`Promise<TxData>`_

---

### `Static` `Protected` \_bigNumberToString

▸ **\_bigNumberToString**(`_type`: string, `value`: any): _any_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:28

**Parameters:**

| Name    | Type   |
| ------- | ------ |
| `_type` | string |
| `value` | any    |

**Returns:** _any_

---

### `Static` `Protected` \_formatABIDataItemList

▸ **\_formatABIDataItemList**(`abis`: `DataItem`[], `values`: any[], `formatter`: function): _any_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:26

**Parameters:**

■`abis`: _`DataItem`[]_

■`values`: _any[]_

■`formatter`: _function_

▸ (`type`: string, `value`: any): _any_

**Parameters:**

| Name    | Type   |
| ------- | ------ |
| `type`  | string |
| `value` | any    |

**Returns:** _any_

---

### `Static` `Protected` \_lookupConstructorAbi

▸ **\_lookupConstructorAbi**(`abi`: `ContractAbi`): _`ConstructorAbi`_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:29

**Parameters:**

| Name  | Type          |
| ----- | ------------- |
| `abi` | `ContractAbi` |

**Returns:** _`ConstructorAbi`_

---

### `Static` `Protected` \_lowercaseAddress

▸ **\_lowercaseAddress**(`type`: string, `value`: string): _string_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:27

**Parameters:**

| Name    | Type   |
| ------- | ------ |
| `type`  | string |
| `value` | string |

**Returns:** _string_

---

### `Static` `Protected` \_throwIfRevertWithReasonCallResult

▸ **\_throwIfRevertWithReasonCallResult**(`rawCallResult`: string): _void_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:31

**Parameters:**

| Name            | Type   |
| --------------- | ------ |
| `rawCallResult` | string |

**Returns:** _void_

---

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `treasuryAddress`: string, `_emitterAddress`: string): _`Promise<VotingContract>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:554

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `bytecode`          | string              |
| `abi`               | `ContractAbi`       |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |
| `treasuryAddress`   | string              |
| `_emitterAddress`   | string              |

**Returns:** _`Promise<VotingContract>`_

---

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `treasuryAddress`: string, `_emitterAddress`: string): _`Promise<VotingContract>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:537

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `artifact`          | `ContractArtifact`  | `SimpleContractArtifact` |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |
| `treasuryAddress`   | string              |
| `_emitterAddress`   | string              |

**Returns:** _`Promise<VotingContract>`_

---

### `Static` strictArgumentEncodingCheck

▸ **strictArgumentEncodingCheck**(`inputAbi`: `DataItem`[], `args`: any[]): _string_

_Inherited from void_

Defined in /Users/hen/GitHub/km/node_modules/@0x/base-contract/lib/src/index.d.ts:32

**Parameters:**

| Name       | Type         |
| ---------- | ------------ |
| `inputAbi` | `DataItem`[] |
| `args`     | any[]        |

**Returns:** _string_

---

## Object literals

### commitVote

### ■ **commitVote**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:411

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:440

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `_pollId`            | `BigNumber`       |
| `_vote`              | string            |
| `_tokensToCommit`    | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:506

**Parameters:**

| Name              | Type                | Default value |
| ----------------- | ------------------- | ------------- |
| `_pollId`         | `BigNumber`         | -             |
| `_vote`           | string              | -             |
| `_tokensToCommit` | `BigNumber`         | -             |
| `callData`        | `Partial<CallData>` | {}            |
| `defaultBlock?`   | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:472

**Parameters:**

| Name              | Type              | Default value |
| ----------------- | ----------------- | ------------- |
| `_pollId`         | `BigNumber`       | -             |
| `_vote`           | string            | -             |
| `_tokensToCommit` | `BigNumber`       | -             |
| `txData`          | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:494

**Parameters:**

| Name              | Type        |
| ----------------- | ----------- |
| `_pollId`         | `BigNumber` |
| `_vote`           | string      |
| `_tokensToCommit` | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:412

**Parameters:**

| Name              | Type              | Default value |
| ----------------- | ----------------- | ------------- |
| `_pollId`         | `BigNumber`       | -             |
| `_vote`           | string            | -             |
| `_tokensToCommit` | `BigNumber`       | -             |
| `txData`          | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### createPoll

### ■ **createPoll**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:266

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`_commitEndBlock`: `BigNumber`, `_revealEndBlock`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:292

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `_commitEndBlock`    | `BigNumber`       |
| `_revealEndBlock`    | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`_commitEndBlock`: `BigNumber`, `_revealEndBlock`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:352

**Parameters:**

| Name              | Type                | Default value |
| ----------------- | ------------------- | ------------- |
| `_commitEndBlock` | `BigNumber`         | -             |
| `_revealEndBlock` | `BigNumber`         | -             |
| `callData`        | `Partial<CallData>` | {}            |
| `defaultBlock?`   | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

### estimateGasAsync

▸ **estimateGasAsync**(`_commitEndBlock`: `BigNumber`, `_revealEndBlock`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:322

**Parameters:**

| Name              | Type              | Default value |
| ----------------- | ----------------- | ------------- |
| `_commitEndBlock` | `BigNumber`       | -             |
| `_revealEndBlock` | `BigNumber`       | -             |
| `txData`          | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`_commitEndBlock`: `BigNumber`, `_revealEndBlock`: `BigNumber`): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:342

**Parameters:**

| Name              | Type        |
| ----------------- | ----------- |
| `_commitEndBlock` | `BigNumber` |
| `_revealEndBlock` | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`_commitEndBlock`: `BigNumber`, `_revealEndBlock`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:267

**Parameters:**

| Name              | Type              | Default value |
| ----------------- | ----------------- | ------------- |
| `_commitEndBlock` | `BigNumber`       | -             |
| `_revealEndBlock` | `BigNumber`       | -             |
| `txData`          | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### nextPollId

### ■ **nextPollId**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:86

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:87

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### revealVote

### ■ **revealVote**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:140

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`_pollId`: `BigNumber`, `_voteOption`: `BigNumber`, `_voteSalt`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:169

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `_pollId`            | `BigNumber`       |
| `_voteOption`        | `BigNumber`       |
| `_voteSalt`          | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `_voteOption`: `BigNumber`, `_voteSalt`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:235

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `_pollId`       | `BigNumber`         | -             |
| `_voteOption`   | `BigNumber`         | -             |
| `_voteSalt`     | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`_pollId`: `BigNumber`, `_voteOption`: `BigNumber`, `_voteSalt`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:201

**Parameters:**

| Name          | Type              | Default value |
| ------------- | ----------------- | ------------- |
| `_pollId`     | `BigNumber`       | -             |
| `_voteOption` | `BigNumber`       | -             |
| `_voteSalt`   | `BigNumber`       | -             |
| `txData`      | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`_pollId`: `BigNumber`, `_voteOption`: `BigNumber`, `_voteSalt`: `BigNumber`): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:223

**Parameters:**

| Name          | Type        |
| ------------- | ----------- |
| `_pollId`     | `BigNumber` |
| `_voteOption` | `BigNumber` |
| `_voteSalt`   | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`_pollId`: `BigNumber`, `_voteOption`: `BigNumber`, `_voteSalt`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:141

**Parameters:**

| Name          | Type              | Default value |
| ------------- | ----------------- | ------------- |
| `_pollId`     | `BigNumber`       | -             |
| `_voteOption` | `BigNumber`       | -             |
| `_voteSalt`   | `BigNumber`       | -             |
| `txData`      | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### totalRevealedTokens

### ■ **totalRevealedTokens**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:112

### callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:113

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `_pollId`       | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### totalWinningTokens

### ■ **totalWinningTokens**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:58

### callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:59

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `_pollId`       | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### userWinningTokens

### ■ **userWinningTokens**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:381

### callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `_user`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:382

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `_pollId`       | `BigNumber`         | -             |
| `_user`         | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### winningOption

### ■ **winningOption**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:30

### callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/voting.ts:31

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `_pollId`       | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---
