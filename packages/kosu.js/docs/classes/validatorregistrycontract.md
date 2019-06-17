> ## [kosu.js](../README.md)

[Globals](../globals.md) / [ValidatorRegistryContract](validatorregistrycontract.md) /

# Class: ValidatorRegistryContract

## Hierarchy

-   `BaseContract`

    -   **ValidatorRegistryContract**

### Index

#### Constructors

-   [constructor](validatorregistrycontract.md#constructor)

#### Properties

-   [\_abiEncoderByFunctionSignature](validatorregistrycontract.md#protected-_abiencoderbyfunctionsignature)
-   [\_web3Wrapper](validatorregistrycontract.md#protected-_web3wrapper)
-   [abi](validatorregistrycontract.md#abi)
-   [address](validatorregistrycontract.md#address)
-   [constructorArgs](validatorregistrycontract.md#constructorargs)
-   [contractName](validatorregistrycontract.md#contractname)
-   [txReceipt](validatorregistrycontract.md#optional-txreceipt)

#### Methods

-   [\_lookupAbi](validatorregistrycontract.md#protected-_lookupabi)
-   [\_lookupAbiEncoder](validatorregistrycontract.md#protected-_lookupabiencoder)
-   [\_strictEncodeArguments](validatorregistrycontract.md#protected-_strictencodearguments)
-   [\_applyDefaultsToTxDataAsync](validatorregistrycontract.md#static-protected-_applydefaultstotxdataasync)
-   [\_bigNumberToString](validatorregistrycontract.md#static-protected-_bignumbertostring)
-   [\_formatABIDataItemList](validatorregistrycontract.md#static-protected-_formatabidataitemlist)
-   [\_lookupConstructorAbi](validatorregistrycontract.md#static-protected-_lookupconstructorabi)
-   [\_lowercaseAddress](validatorregistrycontract.md#static-protected-_lowercaseaddress)
-   [\_throwIfRevertWithReasonCallResult](validatorregistrycontract.md#static-protected-_throwifrevertwithreasoncallresult)
-   [deployAsync](validatorregistrycontract.md#static-deployasync)
-   [deployFrom0xArtifactAsync](validatorregistrycontract.md#static-deployfrom0xartifactasync)
-   [strictArgumentEncodingCheck](validatorregistrycontract.md#static-strictargumentencodingcheck)

#### Object literals

-   [\_listingKeys](validatorregistrycontract.md#_listingkeys)
-   [applicationPeriod](validatorregistrycontract.md#applicationperiod)
-   [challengeListing](validatorregistrycontract.md#challengelisting)
-   [challengePeriod](validatorregistrycontract.md#challengeperiod)
-   [claimRewards](validatorregistrycontract.md#claimrewards)
-   [claimWinnings](validatorregistrycontract.md#claimwinnings)
-   [commitPeriod](validatorregistrycontract.md#commitperiod)
-   [confirmListing](validatorregistrycontract.md#confirmlisting)
-   [exitPeriod](validatorregistrycontract.md#exitperiod)
-   [finalizeExit](validatorregistrycontract.md#finalizeexit)
-   [getAllChallenges](validatorregistrycontract.md#getallchallenges)
-   [getAllListings](validatorregistrycontract.md#getalllistings)
-   [getChallenge](validatorregistrycontract.md#getchallenge)
-   [getChallenges](validatorregistrycontract.md#getchallenges)
-   [getListing](validatorregistrycontract.md#getlisting)
-   [getListings](validatorregistrycontract.md#getlistings)
-   [initExit](validatorregistrycontract.md#initexit)
-   [kosuToken](validatorregistrycontract.md#kosutoken)
-   [listingKeys](validatorregistrycontract.md#listingkeys)
-   [maxRewardRate](validatorregistrycontract.md#maxrewardrate)
-   [minimumBalance](validatorregistrycontract.md#minimumbalance)
-   [nextChallenge](validatorregistrycontract.md#nextchallenge)
-   [registerListing](validatorregistrycontract.md#registerlisting)
-   [resolveChallenge](validatorregistrycontract.md#resolvechallenge)
-   [rewardPeriod](validatorregistrycontract.md#rewardperiod)
-   [stakeholderCut](validatorregistrycontract.md#stakeholdercut)
-   [treasury](validatorregistrycontract.md#treasury)
-   [voting](validatorregistrycontract.md#voting)

## Constructors

### constructor

\+ **new ValidatorRegistryContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): _[ValidatorRegistryContract](validatorregistrycontract.md)_

_Overrides void_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1542

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `abi`               | `ContractAbi`       |
| `address`           | string              |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults?`       | `Partial<TxData>`   |

**Returns:** _[ValidatorRegistryContract](validatorregistrycontract.md)_

---

## Properties

### `Protected` \_abiEncoderByFunctionSignature

● **\_abiEncoderByFunctionSignature**: _`AbiEncoderByFunctionSignature`_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:20

---

### `Protected` \_web3Wrapper

● **\_web3Wrapper**: _`Web3Wrapper`_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:21

---

### abi

● **abi**: _`ContractAbi`_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:22

---

### address

● **address**: _string_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:23

---

### constructorArgs

● **constructorArgs**: _any[]_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:25

---

### contractName

● **contractName**: _string_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:24

---

### `Optional` txReceipt

● **txReceipt**? : _`TransactionReceiptWithDecodedLogs`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:29

---

## Methods

### `Protected` \_lookupAbi

▸ **\_lookupAbi**(`functionSignature`: string): _`MethodAbi`_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:34

**Parameters:**

| Name                | Type   |
| ------------------- | ------ |
| `functionSignature` | string |

**Returns:** _`MethodAbi`_

---

### `Protected` \_lookupAbiEncoder

▸ **\_lookupAbiEncoder**(`functionSignature`: string): _`Method`_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:33

**Parameters:**

| Name                | Type   |
| ------------------- | ------ |
| `functionSignature` | string |

**Returns:** _`Method`_

---

### `Protected` \_strictEncodeArguments

▸ **\_strictEncodeArguments**(`functionSignature`: string, `functionArguments`: any): _string_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:35

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:30

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:28

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:26

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:29

**Parameters:**

| Name  | Type          |
| ----- | ------------- |
| `abi` | `ContractAbi` |

**Returns:** _`ConstructorAbi`_

---

### `Static` `Protected` \_lowercaseAddress

▸ **\_lowercaseAddress**(`type`: string, `value`: string): _string_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:27

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

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:31

**Parameters:**

| Name            | Type   |
| --------------- | ------ |
| `rawCallResult` | string |

**Returns:** _void_

---

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `_treasuryAddress`: string, `_votingAddress`: string, `auth`: string, `_events`: string, `_applicationPeriod`: `BigNumber`, `_commitPeriod`: `BigNumber`, `_challengePeriod`: `BigNumber`, `_exitPeriod`: `BigNumber`, `_rewardPeriod`: `BigNumber`): _`Promise<ValidatorRegistryContract>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1467

**Parameters:**

| Name                 | Type                |
| -------------------- | ------------------- |
| `bytecode`           | string              |
| `abi`                | `ContractAbi`       |
| `supportedProvider`  | `SupportedProvider` |
| `txDefaults`         | `Partial<TxData>`   |
| `_treasuryAddress`   | string              |
| `_votingAddress`     | string              |
| `auth`               | string              |
| `_events`            | string              |
| `_applicationPeriod` | `BigNumber`         |
| `_commitPeriod`      | `BigNumber`         |
| `_challengePeriod`   | `BigNumber`         |
| `_exitPeriod`        | `BigNumber`         |
| `_rewardPeriod`      | `BigNumber`         |

**Returns:** _`Promise<ValidatorRegistryContract>`_

---

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `_treasuryAddress`: string, `_votingAddress`: string, `auth`: string, `_events`: string, `_applicationPeriod`: `BigNumber`, `_commitPeriod`: `BigNumber`, `_challengePeriod`: `BigNumber`, `_exitPeriod`: `BigNumber`, `_rewardPeriod`: `BigNumber`): _`Promise<ValidatorRegistryContract>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1436

**Parameters:**

| Name                 | Type                |
| -------------------- | ------------------- |
| `artifact`           | `ContractArtifact`  | `SimpleContractArtifact` |
| `supportedProvider`  | `SupportedProvider` |
| `txDefaults`         | `Partial<TxData>`   |
| `_treasuryAddress`   | string              |
| `_votingAddress`     | string              |
| `auth`               | string              |
| `_events`            | string              |
| `_applicationPeriod` | `BigNumber`         |
| `_commitPeriod`      | `BigNumber`         |
| `_challengePeriod`   | `BigNumber`         |
| `_exitPeriod`        | `BigNumber`         |
| `_rewardPeriod`      | `BigNumber`         |

**Returns:** _`Promise<ValidatorRegistryContract>`_

---

### `Static` strictArgumentEncodingCheck

▸ **strictArgumentEncodingCheck**(`inputAbi`: `DataItem`[], `args`: any[]): _string_

_Inherited from void_

Defined in node_modules/@0x/base-contract/lib/src/index.d.ts:32

**Parameters:**

| Name       | Type         |
| ---------- | ------------ |
| `inputAbi` | `DataItem`[] |
| `args`     | any[]        |

**Returns:** _string_

---

## Object literals

### \_listingKeys

### ■ **\_listingKeys**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1148

### callAsync

▸ **callAsync**(`index_0`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1149

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `index_0`       | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---

### applicationPeriod

### ■ **applicationPeriod**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1176

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1177

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### challengeListing

### ■ **challengeListing**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:929

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`tendermintPublicKey`: string, `details`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:955

**Parameters:**

| Name                  | Type              |
| --------------------- | ----------------- |
| `tendermintPublicKey` | string            |
| `details`             | string            |
| `txData?`             | `Partial<TxData>` | number |
| `pollingIntervalMs?`  | number            |
| `timeoutMs?`          | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`tendermintPublicKey`: string, `details`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1015

**Parameters:**

| Name                  | Type                | Default value |
| --------------------- | ------------------- | ------------- |
| `tendermintPublicKey` | string              | -             |
| `details`             | string              | -             |
| `callData`            | `Partial<CallData>` | {}            |
| `defaultBlock?`       | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`tendermintPublicKey`: string, `details`: string, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:985

**Parameters:**

| Name                  | Type              | Default value |
| --------------------- | ----------------- | ------------- |
| `tendermintPublicKey` | string            | -             |
| `details`             | string            | -             |
| `txData`              | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`tendermintPublicKey`: string, `details`: string): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1005

**Parameters:**

| Name                  | Type   |
| --------------------- | ------ |
| `tendermintPublicKey` | string |
| `details`             | string |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`tendermintPublicKey`: string, `details`: string, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:930

**Parameters:**

| Name                  | Type              | Default value |
| --------------------- | ----------------- | ------------- |
| `tendermintPublicKey` | string            | -             |
| `details`             | string            | -             |
| `txData`              | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### challengePeriod

### ■ **challengePeriod**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1358

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1359

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### claimRewards

### ■ **claimRewards**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:771

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`pubKey`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:794

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `pubKey`             | string            |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`pubKey`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:848

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `pubKey`        | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`pubKey`: string, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:822

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `pubKey` | string            | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`pubKey`: string): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:840

**Parameters:**

| Name     | Type   |
| -------- | ------ |
| `pubKey` | string |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`pubKey`: string, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:772

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `pubKey` | string            | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### claimWinnings

### ■ **claimWinnings**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:641

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`challengeId`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:664

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `challengeId`        | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`challengeId`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:718

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `challengeId`   | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`challengeId`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:692

**Parameters:**

| Name          | Type              | Default value |
| ------------- | ----------------- | ------------- |
| `challengeId` | `BigNumber`       | -             |
| `txData`      | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`challengeId`: `BigNumber`): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:710

**Parameters:**

| Name          | Type        |
| ------------- | ----------- |
| `challengeId` | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`challengeId`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:642

**Parameters:**

| Name          | Type              | Default value |
| ------------- | ----------------- | ------------- |
| `challengeId` | `BigNumber`       | -             |
| `txData`      | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### commitPeriod

### ■ **commitPeriod**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1384

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1385

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### confirmListing

### ■ **confirmListing**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:511

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`tendermintPublicKey`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:534

**Parameters:**

| Name                  | Type              |
| --------------------- | ----------------- |
| `tendermintPublicKey` | string            |
| `txData?`             | `Partial<TxData>` | number |
| `pollingIntervalMs?`  | number            |
| `timeoutMs?`          | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`tendermintPublicKey`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:588

**Parameters:**

| Name                  | Type                | Default value |
| --------------------- | ------------------- | ------------- |
| `tendermintPublicKey` | string              | -             |
| `callData`            | `Partial<CallData>` | {}            |
| `defaultBlock?`       | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`tendermintPublicKey`: string, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:562

**Parameters:**

| Name                  | Type              | Default value |
| --------------------- | ----------------- | ------------- |
| `tendermintPublicKey` | string            | -             |
| `txData`              | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`tendermintPublicKey`: string): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:580

**Parameters:**

| Name                  | Type   |
| --------------------- | ------ |
| `tendermintPublicKey` | string |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`tendermintPublicKey`: string, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:512

**Parameters:**

| Name                  | Type              | Default value |
| --------------------- | ----------------- | ------------- |
| `tendermintPublicKey` | string            | -             |
| `txData`              | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### exitPeriod

### ■ **exitPeriod**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:745

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:746

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### finalizeExit

### ■ **finalizeExit**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:134

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`tendermintPublicKey`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:157

**Parameters:**

| Name                  | Type              |
| --------------------- | ----------------- |
| `tendermintPublicKey` | string            |
| `txData?`             | `Partial<TxData>` | number |
| `pollingIntervalMs?`  | number            |
| `timeoutMs?`          | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`tendermintPublicKey`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:211

**Parameters:**

| Name                  | Type                | Default value |
| --------------------- | ------------------- | ------------- |
| `tendermintPublicKey` | string              | -             |
| `callData`            | `Partial<CallData>` | {}            |
| `defaultBlock?`       | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`tendermintPublicKey`: string, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:185

**Parameters:**

| Name                  | Type              | Default value |
| --------------------- | ----------------- | ------------- |
| `tendermintPublicKey` | string            | -             |
| `txData`              | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`tendermintPublicKey`: string): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:203

**Parameters:**

| Name                  | Type   |
| --------------------- | ------ |
| `tendermintPublicKey` | string |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`tendermintPublicKey`: string, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:135

**Parameters:**

| Name                  | Type              | Default value |
| --------------------- | ----------------- | ------------- |
| `tendermintPublicKey` | string            | -             |
| `txData`              | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### getAllChallenges

### ■ **getAllChallenges**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:903

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<Array<object>>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:904

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<Array<object>>`_

---

### getAllListings

### ■ **getAllListings**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1096

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<Array<object>>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1097

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<Array<object>>`_

---

### getChallenge

### ■ **getChallenge**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:292

### callAsync

▸ **callAsync**(`challengeId`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<object>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:293

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `challengeId`   | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<object>`_

---

### getChallenges

### ■ **getChallenges**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:320

### callAsync

▸ **callAsync**(`challengeIds`: `BigNumber`[], `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<Array<object>>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:321

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `challengeIds`  | `BigNumber`[]       | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<Array<object>>`_

---

### getListing

### ■ **getListing**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:264

### callAsync

▸ **callAsync**(`pubKey`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<object>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:265

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `pubKey`        | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<object>`_

---

### getListings

### ■ **getListings**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:875

### callAsync

▸ **callAsync**(`pubKeys`: string[], `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<Array<object>>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:876

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `pubKeys`       | string[]            | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<Array<object>>`_

---

### initExit

### ■ **initExit**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:30

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`tendermintPublicKey`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:53

**Parameters:**

| Name                  | Type              |
| --------------------- | ----------------- |
| `tendermintPublicKey` | string            |
| `txData?`             | `Partial<TxData>` | number |
| `pollingIntervalMs?`  | number            |
| `timeoutMs?`          | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`tendermintPublicKey`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:107

**Parameters:**

| Name                  | Type                | Default value |
| --------------------- | ------------------- | ------------- |
| `tendermintPublicKey` | string              | -             |
| `callData`            | `Partial<CallData>` | {}            |
| `defaultBlock?`       | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`tendermintPublicKey`: string, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:81

**Parameters:**

| Name                  | Type              | Default value |
| --------------------- | ----------------- | ------------- |
| `tendermintPublicKey` | string            | -             |
| `txData`              | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`tendermintPublicKey`: string): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:99

**Parameters:**

| Name                  | Type   |
| --------------------- | ------ |
| `tendermintPublicKey` | string |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`tendermintPublicKey`: string, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:31

**Parameters:**

| Name                  | Type              | Default value |
| --------------------- | ----------------- | ------------- |
| `tendermintPublicKey` | string            | -             |
| `txData`              | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### kosuToken

### ■ **kosuToken**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1306

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1307

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---

### listingKeys

### ■ **listingKeys**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1070

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string[]>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1071

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string[]>`_

---

### maxRewardRate

### ■ **maxRewardRate**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:238

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:239

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### minimumBalance

### ■ **minimumBalance**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1122

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1123

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### nextChallenge

### ■ **nextChallenge**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:348

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:349

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### registerListing

### ■ **registerListing**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:374

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`tendermintPublicKey`: string, `tokensToStake`: `BigNumber`, `rewardRate`: `BigNumber`, `details`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:406

**Parameters:**

| Name                  | Type              |
| --------------------- | ----------------- |
| `tendermintPublicKey` | string            |
| `tokensToStake`       | `BigNumber`       |
| `rewardRate`          | `BigNumber`       |
| `details`             | string            |
| `txData?`             | `Partial<TxData>` | number |
| `pollingIntervalMs?`  | number            |
| `timeoutMs?`          | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`tendermintPublicKey`: string, `tokensToStake`: `BigNumber`, `rewardRate`: `BigNumber`, `details`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:478

**Parameters:**

| Name                  | Type                | Default value |
| --------------------- | ------------------- | ------------- |
| `tendermintPublicKey` | string              | -             |
| `tokensToStake`       | `BigNumber`         | -             |
| `rewardRate`          | `BigNumber`         | -             |
| `details`             | string              | -             |
| `callData`            | `Partial<CallData>` | {}            |
| `defaultBlock?`       | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`tendermintPublicKey`: string, `tokensToStake`: `BigNumber`, `rewardRate`: `BigNumber`, `details`: string, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:440

**Parameters:**

| Name                  | Type              | Default value |
| --------------------- | ----------------- | ------------- |
| `tendermintPublicKey` | string            | -             |
| `tokensToStake`       | `BigNumber`       | -             |
| `rewardRate`          | `BigNumber`       | -             |
| `details`             | string            | -             |
| `txData`              | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`tendermintPublicKey`: string, `tokensToStake`: `BigNumber`, `rewardRate`: `BigNumber`, `details`: string): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:464

**Parameters:**

| Name                  | Type        |
| --------------------- | ----------- |
| `tendermintPublicKey` | string      |
| `tokensToStake`       | `BigNumber` |
| `rewardRate`          | `BigNumber` |
| `details`             | string      |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`tendermintPublicKey`: string, `tokensToStake`: `BigNumber`, `rewardRate`: `BigNumber`, `details`: string, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:375

**Parameters:**

| Name                  | Type              | Default value |
| --------------------- | ----------------- | ------------- |
| `tendermintPublicKey` | string            | -             |
| `tokensToStake`       | `BigNumber`       | -             |
| `rewardRate`          | `BigNumber`       | -             |
| `details`             | string            | -             |
| `txData`              | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### resolveChallenge

### ■ **resolveChallenge**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1202

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`pubKey`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1225

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `pubKey`             | string            |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`pubKey`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1279

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `pubKey`        | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`pubKey`: string, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1253

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `pubKey` | string            | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`pubKey`: string): _string_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1271

**Parameters:**

| Name     | Type   |
| -------- | ------ |
| `pubKey` | string |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`pubKey`: string, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1203

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `pubKey` | string            | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### rewardPeriod

### ■ **rewardPeriod**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1332

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1333

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### stakeholderCut

### ■ **stakeholderCut**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1044

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1045

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### treasury

### ■ **treasury**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:615

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:616

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---

### voting

### ■ **voting**: _object_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1410

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in node_modules/@kosu/system-contracts/generated-wrappers/validator_registry.ts:1411

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---
