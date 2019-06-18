> ## [kosu.js](../README.md)

[Globals](../globals.md) / [EventEmitter](eventemitter.md) /

# Class: EventEmitter

The `EventEmitter` class simplifies interaction with the Kosu `EventEmitter`
contract. It provides methods to access historical decoded event logs, and
to subscribe to future events.

## Hierarchy

* **EventEmitter**

### Index

#### Constructors

* [constructor](eventemitter.md#constructor)

#### Properties

* [address](eventemitter.md#private-address)
* [kosuWeb3Wrapper](eventemitter.md#private-kosuweb3wrapper)
* [web3Wrapper](eventemitter.md#private-web3wrapper)

#### Methods

* [_decodeLogs](eventemitter.md#private-_decodelogs)
* [getAddress](eventemitter.md#getaddress)
* [getFutureDecodedLogs](eventemitter.md#getfuturedecodedlogs)
* [getPastDecodedLogs](eventemitter.md#getpastdecodedlogs)
* [getPastLogsFromKosuEndpoint](eventemitter.md#private-getpastlogsfromkosuendpoint)

## Constructors

###  constructor

\+ **new EventEmitter**(`options`: `KosuOptions`): *[EventEmitter](eventemitter.md)*

*Defined in [src/EventEmitter.ts:43](url)*

Create a new `EventEmitter` instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | `KosuOptions` | Options object with `web3Wrapper` and optional `eventEmitterAddress`.  |

**Returns:** *[EventEmitter](eventemitter.md)*

___

## Properties

### `Private` address

● **address**: *string*

*Defined in [src/EventEmitter.ts:37](url)*

The address of the deployed `EventEmitter` contract for the current Ethereum
network.

___

### `Private` kosuWeb3Wrapper

● **kosuWeb3Wrapper**: *`Web3Wrapper`*

*Defined in [src/EventEmitter.ts:43](url)*

A separate `web3Wrapper` instance that can be configured with the Kosu
development proof-of-authority network for testing purposes.

___

### `Private` web3Wrapper

● **web3Wrapper**: *`Web3Wrapper`*

*Defined in [src/EventEmitter.ts:31](url)*

The `web3Wrapper` instance with the contract's ABI loaded.

___

## Methods

### `Private` _decodeLogs

▸ **_decodeLogs**(`logs`: `LogEntry`[]): *`Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>`*

*Defined in [src/EventEmitter.ts:135](url)*

**Parameters:**

Name | Type |
------ | ------ |
`logs` | `LogEntry`[] |

**Returns:** *`Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>`*

___

###  getAddress

▸ **getAddress**(): *`Promise<string>`*

*Defined in [src/EventEmitter.ts:59](url)*

Return the address of the configured deployed contract. If not already cached,
will return the deployed address for the detected network ID (if available).

**Returns:** *`Promise<string>`*

___

###  getFutureDecodedLogs

▸ **getFutureDecodedLogs**(`start`: number, `callback`: function): *`Timeout`*

*Defined in [src/EventEmitter.ts:102](url)*

**`todo`** document better (and confirm)

**Parameters:**

■` start`: *number*

The first block to process events with the `callback` for.

■` callback`: *function*

A callback function to be called on an array of each new event log.

▸ (`a`: `Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>`): *void*

**Parameters:**

Name | Type |
------ | ------ |
`a` | `Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>` |

**Returns:** *`Timeout`*

___

###  getPastDecodedLogs

▸ **getPastDecodedLogs**(`config`: `FilterObject`): *`Promise<Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>>`*

*Defined in [src/EventEmitter.ts:78](url)*

Get all past decoded logs from the Kosu `EventEmitter` contract, with the
oldest event at position 0.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config` | `FilterObject` | Configure logs query (see `options` for `web3wrapper.getLogsAsync`) |

**Returns:** *`Promise<Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>>`*

An array of event logs with decoded arguments from the EventEmitter.

___

### `Private` getPastLogsFromKosuEndpoint

▸ **getPastLogsFromKosuEndpoint**(`config`: `FilterObject`): *`Promise<any[]>`*

*Defined in [src/EventEmitter.ts:125](url)*

Load all historical even logs from the Kosu EventEmitter contract that is
deployed on the Kosu private test-network.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config` | `FilterObject` | Filter object for querying past logs (see `web3Wrapper.getLogsAsync`).  |

**Returns:** *`Promise<any[]>`*

___