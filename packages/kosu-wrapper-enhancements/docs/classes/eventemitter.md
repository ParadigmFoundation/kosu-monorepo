[wrapper-enhancements](../README.md) › [Globals](../globals.md) › [EventEmitter](eventemitter.md)

# Class: EventEmitter

The `EventEmitter` class simplifies interaction with the Kosu `EventEmitter`
contract. It provides methods to access historical decoded event logs, and
to subscribe to future events.

## Hierarchy

* **EventEmitter**

## Index

### Constructors

* [constructor](eventemitter.md#constructor)

### Properties

* [address](eventemitter.md#address)
* [web3Wrapper](eventemitter.md#web3wrapper)

### Methods

* [getAddress](eventemitter.md#getaddress)
* [getFutureDecodedLogs](eventemitter.md#getfuturedecodedlogs)
* [getPastDecodedLogs](eventemitter.md#getpastdecodedlogs)

## Constructors

###  constructor

\+ **new EventEmitter**(`options`: KosuOptions): *[EventEmitter](eventemitter.md)*

*Defined in [EventEmitter.ts:50](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/EventEmitter.ts#L50)*

Create a new `EventEmitter` instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | KosuOptions | Options object with `web3Wrapper` and optional `eventEmitterAddress`.  |

**Returns:** *[EventEmitter](eventemitter.md)*

## Properties

###  address

• **address**: *string*

*Defined in [EventEmitter.ts:44](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/EventEmitter.ts#L44)*

The address of the deployed `EventEmitter` contract for the current Ethereum
network.

___

###  web3Wrapper

• **web3Wrapper**: *Web3Wrapper*

*Defined in [EventEmitter.ts:38](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/EventEmitter.ts#L38)*

The `web3Wrapper` instance with the contract's ABI loaded.

## Methods

###  getAddress

▸ **getAddress**(): *Promise‹string›*

*Defined in [EventEmitter.ts:69](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/EventEmitter.ts#L69)*

Return the address of the configured deployed contract. If not already cached,
will return the deployed address for the detected network ID (if available).

**Returns:** *Promise‹string›*

___

###  getFutureDecodedLogs

▸ **getFutureDecodedLogs**(`start`: number, `callback`: function): *Timeout*

*Defined in [EventEmitter.ts:115](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/EventEmitter.ts#L115)*

**`todo`** document better (and confirm)

**Parameters:**

▪ **start**: *number*

The first block to process events with the `callback` for.

▪ **callback**: *function*

A callback function to be called on an array of each new event log.

▸ (`a`: Array‹LogWithDecodedKosuArgs‹DecodedLogArgs, DecodedKosuLogArgs››): *void*

**Parameters:**

Name | Type |
------ | ------ |
`a` | Array‹LogWithDecodedKosuArgs‹DecodedLogArgs, DecodedKosuLogArgs›› |

**Returns:** *Timeout*

___

###  getPastDecodedLogs

▸ **getPastDecodedLogs**(`config`: FilterObject): *Promise‹Array‹LogWithDecodedKosuArgs‹DecodedLogArgs, DecodedKosuLogArgs›››*

*Defined in [EventEmitter.ts:88](https://github.com/ParadigmFoundation/kosu-monorepo/blob/821f0d85/packages/kosu-wrapper-enhancements/src/EventEmitter.ts#L88)*

Get all past decoded logs from the Kosu `EventEmitter` contract, with the
oldest event at position 0.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`config` | FilterObject | Configure logs query (see `options` for `web3wrapper.getLogsAsync`) |

**Returns:** *Promise‹Array‹LogWithDecodedKosuArgs‹DecodedLogArgs, DecodedKosuLogArgs›››*

An array of event logs with decoded arguments from the EventEmitter.
