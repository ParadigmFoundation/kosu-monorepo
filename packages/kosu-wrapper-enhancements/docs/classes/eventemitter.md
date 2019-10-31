[wrapper-enhancements](../README.md) › [Globals](../globals.md) › [EventEmitter](eventemitter.md)

# Class: EventEmitter

The `EventEmitter` class simplifies interaction with the Kosu `EventEmitter`
contract. It provides methods to access historical decoded event logs, and
to subscribe to future events.

## Hierarchy

-   **EventEmitter**

## Index

### Constructors

-   [constructor](eventemitter.md#constructor)

### Properties

-   [address](eventemitter.md#address)
-   [web3Wrapper](eventemitter.md#web3wrapper)

### Methods

-   [getAddress](eventemitter.md#getaddress)
-   [getFutureDecodedLogs](eventemitter.md#getfuturedecodedlogs)
-   [getPastDecodedLogs](eventemitter.md#getpastdecodedlogs)

## Constructors

### constructor

\+ **new EventEmitter**(`options`: KosuOptions): _[EventEmitter](eventemitter.md)_

_Defined in [EventEmitter.ts:50](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-wrapper-enhancements/src/EventEmitter.ts#L50)_

Create a new `EventEmitter` instance.

**Parameters:**

| Name      | Type        | Description                                                           |
| --------- | ----------- | --------------------------------------------------------------------- |
| `options` | KosuOptions | Options object with `web3Wrapper` and optional `eventEmitterAddress`. |

**Returns:** _[EventEmitter](eventemitter.md)_

## Properties

### address

• **address**: _string_

_Defined in [EventEmitter.ts:44](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-wrapper-enhancements/src/EventEmitter.ts#L44)_

The address of the deployed `EventEmitter` contract for the current Ethereum
network.

---

### web3Wrapper

• **web3Wrapper**: _Web3Wrapper_

_Defined in [EventEmitter.ts:38](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-wrapper-enhancements/src/EventEmitter.ts#L38)_

The `web3Wrapper` instance with the contract's ABI loaded.

## Methods

### getAddress

▸ **getAddress**(): _Promise‹string›_

_Defined in [EventEmitter.ts:69](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-wrapper-enhancements/src/EventEmitter.ts#L69)_

Return the address of the configured deployed contract. If not already cached,
will return the deployed address for the detected network ID (if available).

**Returns:** _Promise‹string›_

---

### getFutureDecodedLogs

▸ **getFutureDecodedLogs**(`start`: number, `callback`: function): _Timeout_

_Defined in [EventEmitter.ts:115](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-wrapper-enhancements/src/EventEmitter.ts#L115)_

**`todo`** document better (and confirm)

**Parameters:**

▪ **start**: _number_

The first block to process events with the `callback` for.

▪ **callback**: _function_

A callback function to be called on an array of each new event log.

▸ (`a`: Array‹LogWithDecodedKosuArgs‹DecodedLogArgs, DecodedKosuLogArgs››): _void_

**Parameters:**

| Name | Type                                                              |
| ---- | ----------------------------------------------------------------- |
| `a`  | Array‹LogWithDecodedKosuArgs‹DecodedLogArgs, DecodedKosuLogArgs›› |

**Returns:** _Timeout_

---

### getPastDecodedLogs

▸ **getPastDecodedLogs**(`config`: FilterObject): _Promise‹Array‹LogWithDecodedKosuArgs‹DecodedLogArgs, DecodedKosuLogArgs›››_

_Defined in [EventEmitter.ts:88](https://github.com/ParadigmFoundation/kosu-monorepo/blob/67119cd9/packages/kosu-wrapper-enhancements/src/EventEmitter.ts#L88)_

Get all past decoded logs from the Kosu `EventEmitter` contract, with the
oldest event at position 0.

**Parameters:**

| Name     | Type         | Description                                                         |
| -------- | ------------ | ------------------------------------------------------------------- |
| `config` | FilterObject | Configure logs query (see `options` for `web3wrapper.getLogsAsync`) |

**Returns:** _Promise‹Array‹LogWithDecodedKosuArgs‹DecodedLogArgs, DecodedKosuLogArgs›››_

An array of event logs with decoded arguments from the EventEmitter.
