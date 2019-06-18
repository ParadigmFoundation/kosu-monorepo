> ## [kosu-system-contracts](../README.md)

[Globals](../globals.md) / [OrderGatewayContract](ordergatewaycontract.md) /

# Class: OrderGatewayContract

## Hierarchy

-   `BaseContract`

    -   **OrderGatewayContract**

### Index

#### Constructors

-   [constructor](ordergatewaycontract.md#constructor)

#### Properties

-   [abi](ordergatewaycontract.md#abi)
-   [address](ordergatewaycontract.md#address)
-   [constructorArgs](ordergatewaycontract.md#constructorargs)
-   [contractName](ordergatewaycontract.md#contractname)
-   [txReceipt](ordergatewaycontract.md#optional-txreceipt)

#### Methods

-   [deployAsync](ordergatewaycontract.md#static-deployasync)
-   [deployFrom0xArtifactAsync](ordergatewaycontract.md#static-deployfrom0xartifactasync)
-   [strictArgumentEncodingCheck](ordergatewaycontract.md#static-strictargumentencodingcheck)

#### Object literals

-   [amountRemaining](ordergatewaycontract.md#amountremaining)
-   [arguments](ordergatewaycontract.md#arguments)
-   [isValid](ordergatewaycontract.md#isvalid)
-   [participate](ordergatewaycontract.md#participate)

## Constructors

### constructor

\+ **new OrderGatewayContract**(`abi`: `ContractAbi`, `address`: string, `supportedProvider`: `SupportedProvider`, `txDefaults?`: `Partial<TxData>`): _[OrderGatewayContract](ordergatewaycontract.md)_

_Overrides void_

Defined in generated-wrappers/order_gateway.ts:276

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `abi`               | `ContractAbi`       |
| `address`           | string              |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults?`       | `Partial<TxData>`   |

**Returns:** _[OrderGatewayContract](ordergatewaycontract.md)_

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

Defined in generated-wrappers/order_gateway.ts:29

---

## Methods

### `Static` deployAsync

▸ **deployAsync**(`bytecode`: string, `abi`: `ContractAbi`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`): _`Promise<OrderGatewayContract>`_

Defined in generated-wrappers/order_gateway.ts:246

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `bytecode`          | string              |
| `abi`               | `ContractAbi`       |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |

**Returns:** _`Promise<OrderGatewayContract>`_

---

### `Static` deployFrom0xArtifactAsync

▸ **deployFrom0xArtifactAsync**(`artifact`: `ContractArtifact` | `SimpleContractArtifact`, `supportedProvider`: `SupportedProvider`, `txDefaults`: `Partial<TxData>`): _`Promise<OrderGatewayContract>`_

Defined in generated-wrappers/order_gateway.ts:233

**Parameters:**

| Name                | Type                |
| ------------------- | ------------------- |
| `artifact`          | `ContractArtifact`  | `SimpleContractArtifact` |
| `supportedProvider` | `SupportedProvider` |
| `txDefaults`        | `Partial<TxData>`   |

**Returns:** _`Promise<OrderGatewayContract>`_

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

### amountRemaining

### ■ **amountRemaining**: _object_

Defined in generated-wrappers/order_gateway.ts:173

### callAsync

▸ **callAsync**(`subContract`: string, `data`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<BigNumber>`_

Defined in generated-wrappers/order_gateway.ts:174

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `subContract`   | string              | -             |
| `data`          | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<BigNumber>`_

---

### arguments

### ■ **arguments**: _object_

Defined in generated-wrappers/order_gateway.ts:145

### callAsync

▸ **callAsync**(`subContract`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<string>`_

Defined in generated-wrappers/order_gateway.ts:146

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `subContract`   | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<string>`_

---

### isValid

### ■ **isValid**: _object_

Defined in generated-wrappers/order_gateway.ts:203

### callAsync

▸ **callAsync**(`subContract`: string, `data`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<boolean>`_

Defined in generated-wrappers/order_gateway.ts:204

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `subContract`   | string              | -             |
| `data`          | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<boolean>`_

---

### participate

### ■ **participate**: _object_

Defined in generated-wrappers/order_gateway.ts:30

### awaitTransactionSuccessAsync

▸ **awaitTransactionSuccessAsync**(`subContract`: string, `data`: string, `txData?`: `Partial<TxData>` | number, `pollingIntervalMs?`: number, `timeoutMs?`: number): _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

Defined in generated-wrappers/order_gateway.ts:56

**Parameters:**

| Name                 | Type              |
| -------------------- | ----------------- |
| `subContract`        | string            |
| `data`               | string            |
| `txData?`            | `Partial<TxData>` | number |
| `pollingIntervalMs?` | number            |
| `timeoutMs?`         | number            |

**Returns:** _`PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>`_

### callAsync

▸ **callAsync**(`subContract`: string, `data`: string, `callData`: `Partial<CallData>`, `defaultBlock?`: `BlockParam`): _`Promise<boolean>`_

Defined in generated-wrappers/order_gateway.ts:116

**Parameters:**

| Name            | Type                | Default value |
| --------------- | ------------------- | ------------- |
| `subContract`   | string              | -             |
| `data`          | string              | -             |
| `callData`      | `Partial<CallData>` | {}            |
| `defaultBlock?` | `BlockParam`        | -             |

**Returns:** _`Promise<boolean>`_

### estimateGasAsync

▸ **estimateGasAsync**(`subContract`: string, `data`: string, `txData`: `Partial<TxData>`): _`Promise<number>`_

Defined in generated-wrappers/order_gateway.ts:86

**Parameters:**

| Name          | Type              | Default value |
| ------------- | ----------------- | ------------- |
| `subContract` | string            | -             |
| `data`        | string            | -             |
| `txData`      | `Partial<TxData>` | {}            |

**Returns:** _`Promise<number>`_

### getABIEncodedTransactionData

▸ **getABIEncodedTransactionData**(`subContract`: string, `data`: string): _string_

Defined in generated-wrappers/order_gateway.ts:106

**Parameters:**

| Name          | Type   |
| ------------- | ------ |
| `subContract` | string |
| `data`        | string |

**Returns:** _string_

### sendTransactionAsync

▸ **sendTransactionAsync**(`subContract`: string, `data`: string, `txData`: `Partial<TxData>`): _`Promise<string>`_

Defined in generated-wrappers/order_gateway.ts:31

**Parameters:**

| Name          | Type              | Default value |
| ------------- | ----------------- | ------------- |
| `subContract` | string            | -             |
| `data`        | string            | -             |
| `txData`      | `Partial<TxData>` | {}            |

**Returns:** _`Promise<string>`_

---
