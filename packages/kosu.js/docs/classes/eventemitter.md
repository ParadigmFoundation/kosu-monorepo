> ## [kosu.js](../README.md)

[Globals](../globals.md) / [EventEmitter](eventemitter.md) /

# Class: EventEmitter

## Hierarchy

-   **EventEmitter**

### Index

#### Constructors

-   [constructor](eventemitter.md#constructor)

#### Properties

-   [address](eventemitter.md#private-address)
-   [kosuWeb3Wrapper](eventemitter.md#private-kosuweb3wrapper)
-   [web3Wrapper](eventemitter.md#private-web3wrapper)

#### Methods

-   [\_decodeLogs](eventemitter.md#private-_decodelogs)
-   [getAddress](eventemitter.md#getaddress)
-   [getFutureDecodedLogs](eventemitter.md#getfuturedecodedlogs)
-   [getPastDecodedLogs](eventemitter.md#getpastdecodedlogs)
-   [getPastLogsFromKosuEndpoint](eventemitter.md#private-getpastlogsfromkosuendpoint)

## Constructors

### constructor

\+ **new EventEmitter**(`options`: `KosuOptions`): _[EventEmitter](eventemitter.md)_

_Defined in [src/EventEmitter.ts:25](url)_

**Parameters:**

| Name      | Type          |
| --------- | ------------- |
| `options` | `KosuOptions` |

**Returns:** _[EventEmitter](eventemitter.md)_

---

## Properties

### `Private` address

● **address**: _string_

_Defined in [src/EventEmitter.ts:24](url)_

---

### `Private` kosuWeb3Wrapper

● **kosuWeb3Wrapper**: _`Web3Wrapper`_

_Defined in [src/EventEmitter.ts:25](url)_

---

### `Private` web3Wrapper

● **web3Wrapper**: _`Web3Wrapper`_

_Defined in [src/EventEmitter.ts:23](url)_

---

## Methods

### `Private` \_decodeLogs

▸ **\_decodeLogs**(`logs`: `LogEntry`[]): _`Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>`_

_Defined in [src/EventEmitter.ts:85](url)_

**Parameters:**

| Name   | Type         |
| ------ | ------------ |
| `logs` | `LogEntry`[] |

**Returns:** _`Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>`_

---

### getAddress

▸ **getAddress**(): _`Promise<string>`_

_Defined in [src/EventEmitter.ts:32](url)_

**Returns:** _`Promise<string>`_

---

### getFutureDecodedLogs

▸ **getFutureDecodedLogs**(`start`: number, `callback`: function): _`Timeout`_

_Defined in [src/EventEmitter.ts:58](url)_

**Parameters:**

■`start`: _number_

■`callback`: _function_

▸ (`a`: `Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>`): _void_

**Parameters:**

| Name | Type                                                                |
| ---- | ------------------------------------------------------------------- |
| `a`  | `Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>` |

**Returns:** _`Timeout`_

---

### getPastDecodedLogs

▸ **getPastDecodedLogs**(`config`: `FilterObject`): _`Promise<Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>>`_

_Defined in [src/EventEmitter.ts:40](url)_

**Parameters:**

| Name     | Type           |
| -------- | -------------- |
| `config` | `FilterObject` |

**Returns:** _`Promise<Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>>`_

---

### `Private` getPastLogsFromKosuEndpoint

▸ **getPastLogsFromKosuEndpoint**(`config`: `FilterObject`): _`Promise<any[]>`_

_Defined in [src/EventEmitter.ts:75](url)_

**Parameters:**

| Name     | Type           |
| -------- | -------------- |
| `config` | `FilterObject` |

**Returns:** _`Promise<any[]>`_

---
