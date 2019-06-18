> ## [kosu-system-contracts](../README.md)

[Globals](../globals.md) / [TreasuryContract](treasurycontract.md) /

# Class: TreasuryContract

## Hierarchy

-   `BaseContract`

    -   **TreasuryContract**

### Index

#### Constructors

-   [constructor](treasurycontract.md#constructor)

#### Properties

-   [abi](treasurycontract.md#abi)
-   [address](treasurycontract.md#address)
-   [constructorArgs](treasurycontract.md#constructorargs)
-   [contractName](treasurycontract.md#contractname)
-   [txReceipt](treasurycontract.md#optional-txreceipt)

#### Methods

-   [deployAsync](treasurycontract.md#static-deployasync)
-   [deployFrom0xArtifactAsync](treasurycontract.md#static-deployfrom0xartifactasync)
-   [strictArgumentEncodingCheck](treasurycontract.md#static-strictargumentencodingcheck)

#### Object literals

-   [adjustBalance](treasurycontract.md#adjustbalance)
-   [award](treasurycontract.md#award)
-   [burnFrom](treasurycontract.md#burnfrom)
-   [claimTokens](treasurycontract.md#claimtokens)
-   [confiscate](treasurycontract.md#confiscate)
-   [contractDeposit](treasurycontract.md#contractdeposit)
-   [contractWithdraw](treasurycontract.md#contractwithdraw)
-   [currentBalance](treasurycontract.md#currentbalance)
-   [deposit](treasurycontract.md#deposit)
-   [kosuToken](treasurycontract.md#kosutoken)
-   [releaseTokens](treasurycontract.md#releasetokens)
-   [systemBalance](treasurycontract.md#systembalance)
-   [updateBalance](treasurycontract.md#updatebalance)
-   [withdraw](treasurycontract.md#withdraw)

## Constructors

### constructor

\+ **new TreasuryContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): _[TreasuryContract](treasurycontract.md)_

_Overrides void_

Defined in generated-wrappers/treasury.ts:1412

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `abi`               | `ContractAbi`       |
| `address`           | string              |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults?`       | `Partial<TxData>`   |

**Returns:** _[TreasuryContract](treasurycontract.md)_

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

Defined in generated-wrappers/treasury.ts:29

---

## Methods

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `kosuTokenAddress`: string, `auth`: string): _`Promise<TreasuryContract>`_

Defined in generated-wrappers/treasury.ts:1372

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `bytecode`          | string              |
| `abi`               | `ContractAbi`       |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |
| `kosuTokenAddress`  | string              |
| `auth`              | string              |

**Returns:** _`Promise<TreasuryContract>`_

---

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `kosuTokenAddress`: string, `auth`: string): _`Promise<TreasuryContract>`_

Defined in generated-wrappers/treasury.ts:1355

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `artifact`          | `ContractArtifact`  | `SimpleContractArtifact` |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |
| `kosuTokenAddress`  | string              |
| `auth`              | string              |

**Returns:** _`Promise<TreasuryContract>`_

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

### adjustBalance

### ■ **adjustBalance**: _object_

Defined in generated-wrappers/treasury.ts:1010

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/treasury.ts:1036

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `account`            | string            |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/treasury.ts:1096

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `account`       | string              | -             |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/treasury.ts:1066

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): _string_

Defined in generated-wrappers/treasury.ts:1086

**Parameters:**

| Name      | Type        |
| --------- | ----------- |
| `account` | string      |
| `amount`  | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/treasury.ts:1011

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### award

### ■ **award**: _object_

Defined in generated-wrappers/treasury.ts:277

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/treasury.ts:303

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `account`            | string            |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/treasury.ts:363

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `account`       | string              | -             |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/treasury.ts:333

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): _string_

Defined in generated-wrappers/treasury.ts:353

**Parameters:**

| Name      | Type        |
| --------- | ----------- |
| `account` | string      |
| `amount`  | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/treasury.ts:278

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### burnFrom

### ■ **burnFrom**: _object_

Defined in generated-wrappers/treasury.ts:392

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/treasury.ts:418

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `account`            | string            |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/treasury.ts:478

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `account`       | string              | -             |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/treasury.ts:448

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): _string_

Defined in generated-wrappers/treasury.ts:468

**Parameters:**

| Name      | Type        |
| --------- | ----------- |
| `account` | string      |
| `amount`  | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/treasury.ts:393

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### claimTokens

### ■ **claimTokens**: _object_

Defined in generated-wrappers/treasury.ts:1240

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/treasury.ts:1266

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `account`            | string            |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/treasury.ts:1326

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `account`       | string              | -             |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/treasury.ts:1296

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): _string_

Defined in generated-wrappers/treasury.ts:1316

**Parameters:**

| Name      | Type        |
| --------- | ----------- |
| `account` | string      |
| `amount`  | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/treasury.ts:1241

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### confiscate

### ■ **confiscate**: _object_

Defined in generated-wrappers/treasury.ts:134

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/treasury.ts:160

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `account`            | string            |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/treasury.ts:220

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `account`       | string              | -             |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/treasury.ts:190

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): _string_

Defined in generated-wrappers/treasury.ts:210

**Parameters:**

| Name      | Type        |
| --------- | ----------- |
| `account` | string      |
| `amount`  | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/treasury.ts:135

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### contractDeposit

### ■ **contractDeposit**: _object_

Defined in generated-wrappers/treasury.ts:622

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/treasury.ts:648

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `account`            | string            |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/treasury.ts:708

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `account`       | string              | -             |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/treasury.ts:678

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): _string_

Defined in generated-wrappers/treasury.ts:698

**Parameters:**

| Name      | Type        |
| --------- | ----------- |
| `account` | string      |
| `amount`  | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/treasury.ts:623

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### contractWithdraw

### ■ **contractWithdraw**: _object_

Defined in generated-wrappers/treasury.ts:507

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/treasury.ts:533

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `account`            | string            |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/treasury.ts:593

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `account`       | string              | -             |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/treasury.ts:563

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): _string_

Defined in generated-wrappers/treasury.ts:583

**Parameters:**

| Name      | Type        |
| --------- | ----------- |
| `account` | string      |
| `amount`  | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/treasury.ts:508

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### currentBalance

### ■ **currentBalance**: _object_

Defined in generated-wrappers/treasury.ts:737

### callAsync

▸ **callAsync**(`account`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in generated-wrappers/treasury.ts:738

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `account`       | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### deposit

### ■ **deposit**: _object_

Defined in generated-wrappers/treasury.ts:765

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/treasury.ts:788

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/treasury.ts:842

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/treasury.ts:816

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `amount` | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`amount`: `BigNumber`): _string_

Defined in generated-wrappers/treasury.ts:834

**Parameters:**

| Name     | Type        |
| -------- | ----------- |
| `amount` | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/treasury.ts:766

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `amount` | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### kosuToken

### ■ **kosuToken**: _object_

Defined in generated-wrappers/treasury.ts:869

### callAsync

▸ **callAsync**(`callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in generated-wrappers/treasury.ts:870

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---

### releaseTokens

### ■ **releaseTokens**: _object_

Defined in generated-wrappers/treasury.ts:1125

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/treasury.ts:1151

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `account`            | string            |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/treasury.ts:1211

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `account`       | string              | -             |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/treasury.ts:1181

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): _string_

Defined in generated-wrappers/treasury.ts:1201

**Parameters:**

| Name      | Type        |
| --------- | ----------- |
| `account` | string      |
| `amount`  | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/treasury.ts:1126

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### systemBalance

### ■ **systemBalance**: _object_

Defined in generated-wrappers/treasury.ts:249

### callAsync

▸ **callAsync**(`account`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in generated-wrappers/treasury.ts:250

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `account`       | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### updateBalance

### ■ **updateBalance**: _object_

Defined in generated-wrappers/treasury.ts:895

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`account`: string, `amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/treasury.ts:921

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `account`            | string            |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`account`: string, `amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/treasury.ts:981

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `account`       | string              | -             |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/treasury.ts:951

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`account`: string, `amount`: `BigNumber`): _string_

Defined in generated-wrappers/treasury.ts:971

**Parameters:**

| Name      | Type        |
| --------- | ----------- |
| `account` | string      |
| `amount`  | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`account`: string, `amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/treasury.ts:896

**Parameters:**

| Name      | Type              | Default value |
| --------- | ----------------- | ------------- |
| `account` | string            | -             |
| `amount`  | `BigNumber`       | -             |
| `txData`  | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---

### withdraw

### ■ **withdraw**: _object_

Defined in generated-wrappers/treasury.ts:30

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`amount`: `BigNumber`, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/treasury.ts:53

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `amount`             | `BigNumber`       |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`amount`: `BigNumber`, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/treasury.ts:107

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `amount`        | `BigNumber`         | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/treasury.ts:81

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `amount` | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`amount`: `BigNumber`): _string_

Defined in generated-wrappers/treasury.ts:99

**Parameters:**

| Name     | Type        |
| -------- | ----------- |
| `amount` | `BigNumber` |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`amount`: `BigNumber`, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/treasury.ts:31

**Parameters:**

| Name     | Type              | Default value |
| -------- | ----------------- | ------------- |
| `amount` | `BigNumber`       | -             |
| `txData` | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---
