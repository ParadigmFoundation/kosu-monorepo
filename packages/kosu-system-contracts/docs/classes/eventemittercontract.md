> ## [kosu-system-contracts](../README.md)

[Globals](../globals.md) / [EventEmitterContract](eventemittercontract.md) /

# Class: EventEmitterContract

## Hierarchy

-   `BaseContract`

    -   **EventEmitterContract**

### Index

#### Constructors

-   [constructor](eventemittercontract.md#constructor)

#### Properties

-   [abi](eventemittercontract.md#abi)
-   [address](eventemittercontract.md#address)
-   [constructorArgs](eventemittercontract.md#constructorargs)
-   [contractName](eventemittercontract.md#contractname)
-   [txReceipt](eventemittercontract.md#optional-txreceipt)

#### Methods

-   [deployAsync](eventemittercontract.md#static-deployasync)
-   [deployFrom0xArtifactAsync](eventemittercontract.md#static-deployfrom0xartifactasync)
-   [strictArgumentEncodingCheck](eventemittercontract.md#static-strictargumentencodingcheck)

#### Object literals

-   [emitEvent](eventemittercontract.md#emitevent)

## Constructors

### constructor

\+ **new EventEmitterContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): _[EventEmitterContract](eventemittercontract.md)_

_Overrides void_

Defined in generated-wrappers/event_emitter.ts:219

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `abi`               | `ContractAbi`       |
| `address`           | string              |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults?`       | `Partial<TxData>`   |

**Returns:** _[EventEmitterContract](eventemittercontract.md)_

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

Defined in generated-wrappers/event_emitter.ts:42

---

## Methods

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `auth`: string): _`Promise<EventEmitterContract>`_

Defined in generated-wrappers/event_emitter.ts:184

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `bytecode`          | string              |
| `abi`               | `ContractAbi`       |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |
| `auth`              | string              |

**Returns:** _`Promise<EventEmitterContract>`_

---

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`, `auth`: string): _`Promise<EventEmitterContract>`_

Defined in generated-wrappers/event_emitter.ts:169

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `artifact`          | `ContractArtifact`  | `SimpleContractArtifact` |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |
| `auth`              | string              |

**Returns:** _`Promise<EventEmitterContract>`_

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

### emitEvent

### ■ **emitEvent**: _object_

Defined in generated-wrappers/event_emitter.ts:43

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`eventType`: string, `data`: string[], `stringData`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/event_emitter.ts:72

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `eventType`          | string            |
| `data`               | string[]          |
| `stringData`         | string            |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`eventType`: string, `data`: string[], `stringData`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<void>`_

Defined in generated-wrappers/event_emitter.ts:138

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `eventType`     | string              | -             |
| `data`          | string[]            | -             |
| `stringData`    | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<void>`_

### estimateGasAsync

▸ **estimateGasAsync**(`eventType`: string, `data`: string[], `stringData`: string, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/event_emitter.ts:104

**Parameters:**

| Name         | Type              | Default value |
| ------------ | ----------------- | ------------- |
| `eventType`  | string            | -             |
| `data`       | string[]          | -             |
| `stringData` | string            | -             |
| `txData`     | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`eventType`: string, `data`: string[], `stringData`: string): _string_

Defined in generated-wrappers/event_emitter.ts:126

**Parameters:**

| Name         | Type     |
| ------------ | -------- |
| `eventType`  | string   |
| `data`       | string[] |
| `stringData` | string   |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`eventType`: string, `data`: string[], `stringData`: string, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/event_emitter.ts:44

**Parameters:**

| Name         | Type              | Default value |
| ------------ | ----------------- | ------------- |
| `eventType`  | string            | -             |
| `data`       | string[]          | -             |
| `stringData` | string            | -             |
| `txData`     | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---
