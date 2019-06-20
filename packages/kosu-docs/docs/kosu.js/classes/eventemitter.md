> ## [kosu.js](../README.md)

[Globals](../globals.md) / [EventEmitter](eventemitter.md) /

# Class: EventEmitter

The `EventEmitter` class simplifies interaction with the Kosu `EventEmitter`
contract. It provides methods to access historical decoded event logs, and
to subscribe to future events.

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

\+ **new EventEmitter**(`options`: [KosuOptions](../interfaces/kosuoptions.md)): _[EventEmitter](eventemitter.md)_

Defined in EventEmitter.ts:43

Create a new `EventEmitter` instance.

**Parameters:**

| Name      | Type                                        | Description                                                           |
| --------- | ------------------------------------------- | --------------------------------------------------------------------- |
| `options` | [KosuOptions](../interfaces/kosuoptions.md) | Options object with `web3Wrapper` and optional `eventEmitterAddress`. |

**Returns:** _[EventEmitter](eventemitter.md)_

---

## Properties

### `Private` address

● **address**: _string_

Defined in EventEmitter.ts:37

The address of the deployed `EventEmitter` contract for the current Ethereum
network.

---

### `Private` kosuWeb3Wrapper

● **kosuWeb3Wrapper**: _`Web3Wrapper`_

Defined in EventEmitter.ts:43

A separate `web3Wrapper` instance that can be configured with the Kosu
development proof-of-authority network for testing purposes.

---

### `Private` web3Wrapper

● **web3Wrapper**: _`Web3Wrapper`_

Defined in EventEmitter.ts:31

The `web3Wrapper` instance with the contract's ABI loaded.

---

## Methods

### `Private` \_decodeLogs

▸ **\_decodeLogs**(`logs`: `LogEntry`[]): _`Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>`_

Defined in EventEmitter.ts:135

**Parameters:**

| Name   | Type         |
| ------ | ------------ |
| `logs` | `LogEntry`[] |

**Returns:** _`Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>`_

---

### getAddress

▸ **getAddress**(): _`Promise<string>`_

Defined in EventEmitter.ts:59

Return the address of the configured deployed contract. If not already cached,
will return the deployed address for the detected network ID (if available).

**Returns:** _`Promise<string>`_

---

### getFutureDecodedLogs

▸ **getFutureDecodedLogs**(`start`: number, `callback`: function): _`Timeout`_

Defined in EventEmitter.ts:102

**`todo`** document better (and confirm)

**Parameters:**

■`start`: _number_

The first block to process events with the `callback` for.

■`callback`: _function_

A callback function to be called on an array of each new event log.

▸ (`a`: `Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>`): _void_

**Parameters:**

| Name | Type                                                                |
| ---- | ------------------------------------------------------------------- |
| `a`  | `Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>` |

**Returns:** _`Timeout`_

---

### getPastDecodedLogs

▸ **getPastDecodedLogs**(`config`: `FilterObject`): _`Promise<Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>>`_

Defined in EventEmitter.ts:78

Get all past decoded logs from the Kosu `EventEmitter` contract, with the
oldest event at position 0.

**Parameters:**

| Name     | Type           | Description                                                         |
| -------- | -------------- | ------------------------------------------------------------------- |
| `config` | `FilterObject` | Configure logs query (see `options` for `web3wrapper.getLogsAsync`) |

**Returns:** _`Promise<Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>>`_

An array of event logs with decoded arguments from the EventEmitter.

---

### `Private` getPastLogsFromKosuEndpoint

▸ **getPastLogsFromKosuEndpoint**(`config`: `FilterObject`): _`Promise<any[]>`_

Defined in EventEmitter.ts:125

Load all historical even logs from the Kosu EventEmitter contract that is
deployed on the Kosu private test-network.

**Parameters:**

| Name     | Type           | Description                                                            |
| -------- | -------------- | ---------------------------------------------------------------------- |
| `config` | `FilterObject` | Filter object for querying past logs (see `web3Wrapper.getLogsAsync`). |

**Returns:** _`Promise<any[]>`_

---
