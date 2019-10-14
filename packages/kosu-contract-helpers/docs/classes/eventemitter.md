> **[kosu.js](../README.md)**

[Globals](../globals.md) / [EventEmitter](eventemitter.md) /

# Class: EventEmitter

The `EventEmitter` class simplifies interaction with the Kosu `EventEmitter`
contract. It provides methods to access historical decoded event logs, and
to subscribe to future events.

## Hierarchy

-   **EventEmitter**

## Index

### Constructors

-   [constructor](eventemitter.md#constructor)

### Methods

-   [getAddress](eventemitter.md#getaddress)
-   [getFutureDecodedLogs](eventemitter.md#getfuturedecodedlogs)
-   [getPastDecodedLogs](eventemitter.md#getpastdecodedlogs)

## Constructors

### constructor

\+ **new EventEmitter**(`options`: `KosuOptions`): _[EventEmitter](eventemitter.md)_

_Defined in [EventEmitter.ts:49](https://github.com/ParadigmFoundation/kosu-monorepo/blob/a7ce3d5b/packages/kosu-contract-helpers/src/EventEmitter.ts#L49)_

Create a new `EventEmitter` instance.

**Parameters:**

| Name      | Type          | Description                                                           |
| --------- | ------------- | --------------------------------------------------------------------- |
| `options` | `KosuOptions` | Options object with `web3Wrapper` and optional `eventEmitterAddress`. |

**Returns:** _[EventEmitter](eventemitter.md)_

## Methods

### getAddress

▸ **getAddress**(): _`Promise<string>`_

_Defined in [EventEmitter.ts:65](https://github.com/ParadigmFoundation/kosu-monorepo/blob/a7ce3d5b/packages/kosu-contract-helpers/src/EventEmitter.ts#L65)_

Return the address of the configured deployed contract. If not already cached,
will return the deployed address for the detected network ID (if available).

**Returns:** _`Promise<string>`_

---

### getFutureDecodedLogs

▸ **getFutureDecodedLogs**(`start`: number, `callback`: function): _`Timeout`_

_Defined in [EventEmitter.ts:111](https://github.com/ParadigmFoundation/kosu-monorepo/blob/a7ce3d5b/packages/kosu-contract-helpers/src/EventEmitter.ts#L111)_

**`todo`** document better (and confirm)

**Parameters:**

▪ **start**: _number_

The first block to process events with the `callback` for.

▪ **callback**: _function_

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

_Defined in [EventEmitter.ts:84](https://github.com/ParadigmFoundation/kosu-monorepo/blob/a7ce3d5b/packages/kosu-contract-helpers/src/EventEmitter.ts#L84)_

Get all past decoded logs from the Kosu `EventEmitter` contract, with the
oldest event at position 0.

**Parameters:**

| Name     | Type           | Description                                                         |
| -------- | -------------- | ------------------------------------------------------------------- |
| `config` | `FilterObject` | Configure logs query (see `options` for `web3wrapper.getLogsAsync`) |

**Returns:** _`Promise<Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>>`_

An array of event logs with decoded arguments from the EventEmitter.
