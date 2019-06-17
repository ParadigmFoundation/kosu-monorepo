> ## [@kosu/system-contracts](../README.md)

[Globals](../globals.md) / ["packages/kosu.js/src/EventEmitter"](../modules/_packages_kosu_js_src_eventemitter_.md) / [EventEmitter](_packages_kosu_js_src_eventemitter_.eventemitter.md) /

# Class: EventEmitter

## Hierarchy

* **EventEmitter**

### Index

#### Constructors

* [constructor](_packages_kosu_js_src_eventemitter_.eventemitter.md#constructor)

#### Properties

* [address](_packages_kosu_js_src_eventemitter_.eventemitter.md#private-address)
* [kosuWeb3Wrapper](_packages_kosu_js_src_eventemitter_.eventemitter.md#private-kosuweb3wrapper)
* [web3Wrapper](_packages_kosu_js_src_eventemitter_.eventemitter.md#private-web3wrapper)

#### Methods

* [_decodeLogs](_packages_kosu_js_src_eventemitter_.eventemitter.md#private-_decodelogs)
* [getAddress](_packages_kosu_js_src_eventemitter_.eventemitter.md#getaddress)
* [getFutureDecodedLogs](_packages_kosu_js_src_eventemitter_.eventemitter.md#getfuturedecodedlogs)
* [getPastDecodedLogs](_packages_kosu_js_src_eventemitter_.eventemitter.md#getpastdecodedlogs)
* [getPastLogsFromKosuEndpoint](_packages_kosu_js_src_eventemitter_.eventemitter.md#private-getpastlogsfromkosuendpoint)

## Constructors

###  constructor

\+ **new EventEmitter**(`options`: `KosuOptions`): *[EventEmitter](_packages_kosu_js_src_eventemitter_.eventemitter.md)*

*Defined in [packages/kosu.js/src/EventEmitter.ts:25](url)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | `KosuOptions` |

**Returns:** *[EventEmitter](_packages_kosu_js_src_eventemitter_.eventemitter.md)*

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