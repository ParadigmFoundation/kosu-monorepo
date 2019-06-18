> ## [kosu-system-contracts](../README.md)

[Globals](../globals.md) / [VotingContract](votingcontract.md) /

# Class: VotingContract

## Hierarchy

-   `BaseContract`

    -   **VotingContract**

### Index

#### Constructors

-   [constructor](votingcontract.md#constructor)

#### Properties

-   [abi](votingcontract.md#abi)
-   [address](votingcontract.md#address)
-   [constructorArgs](votingcontract.md#constructorargs)
-   [contractName](votingcontract.md#contractname)
-   [txReceipt](votingcontract.md#optional-txreceipt)

#### Methods

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

Defined in generated-wrappers/voting.ts:594

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

Defined in generated-wrappers/voting.ts:29

---

## Methods

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `treasuryAddress`: string, `_emitterAddress`: string): _`Promise<VotingContract>`_

Defined in generated-wrappers/voting.ts:554

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

Defined in generated-wrappers/voting.ts:537

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

Defined in generated-wrappers/voting.ts:411

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/voting.ts:440

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

Defined in generated-wrappers/voting.ts:506

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

Defined in generated-wrappers/voting.ts:472

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

Defined in generated-wrappers/voting.ts:494

**Parameters:**

| Name              | Type        |
| ----------------- | ----------- |
| `_pollId`         | `BigNumber` |
| `_vote`           | string      |
| `_tokensToCommit` | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`_pollId`: `BigNumber`, `_vote`: string, `_tokensToCommit`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/voting.ts:412

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

Defined in generated-wrappers/voting.ts:266

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`_commitEndBlock`: `BigNumber`, `_revealEndBlock`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/voting.ts:292

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

Defined in generated-wrappers/voting.ts:352

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

Defined in generated-wrappers/voting.ts:322

**Parameters:**

| Name              | Type              | Default value |
| ----------------- | ----------------- | ------------- |
| `_commitEndBlock` | `BigNumber`       | -             |
| `_revealEndBlock` | `BigNumber`       | -             |
| `txData`          | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`_commitEndBlock`: `BigNumber`, `_revealEndBlock`: `BigNumber`): _string_

Defined in generated-wrappers/voting.ts:342

**Parameters:**

| Name              | Type        |
| ----------------- | ----------- |
| `_commitEndBlock` | `BigNumber` |
| `_revealEndBlock` | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`_commitEndBlock`: `BigNumber`, `_revealEndBlock`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/voting.ts:267

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

Defined in generated-wrappers/voting.ts:86

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in generated-wrappers/voting.ts:87

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### revealVote

### ■ **revealVote**: _object_

Defined in generated-wrappers/voting.ts:140

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`_pollId`: `BigNumber`, `_voteOption`: `BigNumber`, `_voteSalt`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/voting.ts:169

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

Defined in generated-wrappers/voting.ts:235

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

Defined in generated-wrappers/voting.ts:201

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

Defined in generated-wrappers/voting.ts:223

**Parameters:**

| Name          | Type        |
| ------------- | ----------- |
| `_pollId`     | `BigNumber` |
| `_voteOption` | `BigNumber` |
| `_voteSalt`   | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`_pollId`: `BigNumber`, `_voteOption`: `BigNumber`, `_voteSalt`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/voting.ts:141

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

Defined in generated-wrappers/voting.ts:112

### callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in generated-wrappers/voting.ts:113

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

Defined in generated-wrappers/voting.ts:58

### callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in generated-wrappers/voting.ts:59

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

Defined in generated-wrappers/voting.ts:381

### callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `_user`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in generated-wrappers/voting.ts:382

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

Defined in generated-wrappers/voting.ts:30

### callAsync

▸ **callAsync**(`_pollId`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in generated-wrappers/voting.ts:31

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `_pollId`       | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---
