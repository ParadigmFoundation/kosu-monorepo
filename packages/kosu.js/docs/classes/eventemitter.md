> ## [kosu.js](../README.md)

[Globals](../globals.md) / [EventEmitter](eventemitter.md) /

# Class: EventEmitter

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

*Defined in [packages/kosu.js/src/EventEmitter.ts:25](url)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | `KosuOptions` |

**Returns:** *[EventEmitter](eventemitter.md)*

___

## Properties

### `Private` address

● **address**: *string*

*Defined in [packages/kosu.js/src/EventEmitter.ts:24](url)*

___

### `Private` kosuWeb3Wrapper

● **kosuWeb3Wrapper**: *`Web3Wrapper`*

*Defined in [packages/kosu.js/src/EventEmitter.ts:25](url)*

___

### `Private` web3Wrapper

● **web3Wrapper**: *`Web3Wrapper`*

*Defined in [packages/kosu.js/src/EventEmitter.ts:23](url)*

___

## Methods

### `Private` _decodeLogs

▸ **_decodeLogs**(`logs`: `LogEntry`[]): *`Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>`*

*Defined in [packages/kosu.js/src/EventEmitter.ts:85](url)*

**Parameters:**

Name | Type |
------ | ------ |
`logs` | `LogEntry`[] |

**Returns:** *`Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>`*

___

###  getAddress

▸ **getAddress**(): *`Promise<string>`*

*Defined in [packages/kosu.js/src/EventEmitter.ts:32](url)*

**Returns:** *`Promise<string>`*

___

###  getFutureDecodedLogs

▸ **getFutureDecodedLogs**(`start`: number, `callback`: function): *`Timeout`*

*Defined in [packages/kosu.js/src/EventEmitter.ts:58](url)*

**Parameters:**

■` start`: *number*

■` callback`: *function*

▸ (`a`: `Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>`): *void*

**Parameters:**

Name | Type |
------ | ------ |
`a` | `Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>` |

**Returns:** *`Timeout`*

___

###  getPastDecodedLogs

▸ **getPastDecodedLogs**(`config`: `FilterObject`): *`Promise<Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>>`*

*Defined in [packages/kosu.js/src/EventEmitter.ts:40](url)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | `FilterObject` |

**Returns:** *`Promise<Array<LogWithDecodedKosuArgs<DecodedLogArgs, DecodedKosuLogArgs>>>`*

___

### `Private` getPastLogsFromKosuEndpoint

▸ **getPastLogsFromKosuEndpoint**(`config`: `FilterObject`): *`Promise<any[]>`*

*Defined in [packages/kosu.js/src/EventEmitter.ts:75](url)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | `FilterObject` |

**Returns:** *`Promise<any[]>`*

___