[@kosu/gov-portal-helper](../README.md) > ["index"](../modules/_index_.md) > [Gov](../classes/_index_.gov.md)

# Class: Gov

`Gov` is a helper library for interacting with the Kosu validator governance system (primarily the Kosu `ValidatorRegistry` contract).

It is designed with the browser in mind, and is intended to be used in front- end projects for simplifying interaction with the governance system.

## Hierarchy

**Gov**

## Index

### Constructors

* [constructor](_index_.gov.md#constructor)

### Properties

* [challenges](_index_.gov.md#challenges)
* [coinbase](_index_.gov.md#coinbase)
* [debug](_index_.gov.md#debug)
* [ee](_index_.gov.md#ee)
* [initBlock](_index_.gov.md#initblock)
* [initialized](_index_.gov.md#initialized)
* [kosu](_index_.gov.md#kosu)
* [networkId](_index_.gov.md#networkid)
* [params](_index_.gov.md#params)
* [proposals](_index_.gov.md#proposals)
* [validators](_index_.gov.md#validators)
* [web3](_index_.gov.md#web3)
* [BLOCKS_PER_DAY](_index_.gov.md#blocks_per_day)
* [BigNumber](_index_.gov.md#bignumber)
* [ONE](_index_.gov.md#one)
* [ONE_HUNDRED](_index_.gov.md#one_hundred)
* [ZERO](_index_.gov.md#zero)

### Methods

* [_addChallenge](_index_.gov.md#_addchallenge)
* [_addProposal](_index_.gov.md#_addproposal)
* [_addValidator](_index_.gov.md#_addvalidator)
* [_connectMetamask](_index_.gov.md#_connectmetamask)
* [_debugLog](_index_.gov.md#_debuglog)
* [_estimateDailyReward](_index_.gov.md#_estimatedailyreward)
* [_estimateProposalPower](_index_.gov.md#_estimateproposalpower)
* [_getListing](_index_.gov.md#_getlisting)
* [_getTotalStake](_index_.gov.md#_gettotalstake)
* [_getValidatorPower](_index_.gov.md#_getvalidatorpower)
* [_handleEvents](_index_.gov.md#_handleevents)
* [_processChallenge](_index_.gov.md#_processchallenge)
* [_processListing](_index_.gov.md#_processlisting)
* [_processProposal](_index_.gov.md#_processproposal)
* [_processResolvedChallenge](_index_.gov.md#_processresolvedchallenge)
* [_processValidator](_index_.gov.md#_processvalidator)
* [_removeValidator](_index_.gov.md#_removevalidator)
* [_updateVotePowers](_index_.gov.md#_updatevotepowers)
* [estimateFutureBlockTimestamp](_index_.gov.md#estimatefutureblocktimestamp)
* [etherToWei](_index_.gov.md#ethertowei)
* [getHistoricalChallenges](_index_.gov.md#gethistoricalchallenges)
* [getPastBlockTimestamp](_index_.gov.md#getpastblocktimestamp)
* [init](_index_.gov.md#init)
* [weiToEther](_index_.gov.md#weitoether)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Gov**(debug: *`any`*): [Gov](_index_.gov.md)

*Defined in [index.ts:147](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L147)*

Create a new `Gov` instance (`gov`). Requires no arguments, but can be set to "debug" mode by passing `true` or `1` (or another truthy object to the constructor).

Prior to using most `gov` functionality, the async `gov.init()` method must be called, which will initialize the module and load state from the Kosu contract system.

**Parameters:**

| Name | Type |
| ------ | ------ |
| debug | `any` |

**Returns:** [Gov](_index_.gov.md)

___

## Properties

<a id="challenges"></a>

###  challenges

**● challenges**: *[Map](../interfaces/_index_.map.md)<[StoreChallenge](../interfaces/_index_.storechallenge.md)>*

*Defined in [index.ts:134](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L134)*

___
<a id="coinbase"></a>

###  coinbase

**● coinbase**: *`string`*

*Defined in [index.ts:138](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L138)*

___
<a id="debug"></a>

###  debug

**● debug**: *`boolean`*

*Defined in [index.ts:131](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L131)*

___
<a id="ee"></a>

###  ee

**● ee**: *`EventEmitter`*

*Defined in [index.ts:147](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L147)*

___
<a id="initblock"></a>

###  initBlock

**● initBlock**: *`number`*

*Defined in [index.ts:145](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L145)*

___
<a id="initialized"></a>

###  initialized

**● initialized**: *`boolean`*

*Defined in [index.ts:130](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L130)*

___
<a id="kosu"></a>

###  kosu

**● kosu**: *`Kosu`*

*Defined in [index.ts:140](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L140)*

___
<a id="networkid"></a>

###  networkId

**● networkId**: *`string`*

*Defined in [index.ts:137](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L137)*

___
<a id="params"></a>

###  params

**● params**: *[ContractParams](../interfaces/_index_.contractparams.md)*

*Defined in [index.ts:143](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L143)*

___
<a id="proposals"></a>

###  proposals

**● proposals**: *[Map](../interfaces/_index_.map.md)<[Proposal](../interfaces/_index_.proposal.md)>*

*Defined in [index.ts:135](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L135)*

___
<a id="validators"></a>

###  validators

**● validators**: *[Map](../interfaces/_index_.map.md)<[Validator](../interfaces/_index_.validator.md)>*

*Defined in [index.ts:133](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L133)*

___
<a id="web3"></a>

###  web3

**● web3**: *`Web3`*

*Defined in [index.ts:141](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L141)*

___
<a id="blocks_per_day"></a>

### `<Static>` BLOCKS_PER_DAY

**● BLOCKS_PER_DAY**: *`BigNumber`*

*Defined in [index.ts:128](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L128)*

Estimated blocks per day (mainnet only).

___
<a id="bignumber"></a>

### `<Static>` BigNumber

**● BigNumber**: *`function`*

*Defined in [index.ts:116](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L116)*

Create new BigNumber (mimics constructor)

#### Type declaration
▸(num: *`string` \| `number`*): `BigNumber`

**Parameters:**

| Name | Type |
| ------ | ------ |
| num | `string` \| `number` |

**Returns:** `BigNumber`

___
<a id="one"></a>

### `<Static>` ONE

**● ONE**: *`BigNumber`*

*Defined in [index.ts:122](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L122)*

The value `1` as an instance of`BigNumber`.

___
<a id="one_hundred"></a>

### `<Static>` ONE_HUNDRED

**● ONE_HUNDRED**: *`BigNumber`*

*Defined in [index.ts:125](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L125)*

The value `100` as an instance of`BigNumber`.

___
<a id="zero"></a>

### `<Static>` ZERO

**● ZERO**: *`BigNumber`*

*Defined in [index.ts:119](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L119)*

The value `0` as an instance of`BigNumber`.

___

## Methods

<a id="_addchallenge"></a>

###  _addChallenge

▸ **_addChallenge**(pubKey: *`any`*, challenge: *`any`*): `void`

*Defined in [index.ts:601](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L601)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| pubKey | `any` |
| challenge | `any` |

**Returns:** `void`

___
<a id="_addproposal"></a>

###  _addProposal

▸ **_addProposal**(pubKey: *`any`*, proposal: *`any`*): `void`

*Defined in [index.ts:578](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L578)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| pubKey | `any` |
| proposal | `any` |

**Returns:** `void`

___
<a id="_addvalidator"></a>

###  _addValidator

▸ **_addValidator**(pubKey: *`any`*, validator: *`any`*): `void`

*Defined in [index.ts:585](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L585)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| pubKey | `any` |
| validator | `any` |

**Returns:** `void`

___
<a id="_connectmetamask"></a>

###  _connectMetamask

▸ **_connectMetamask**(): `Promise`<`void`>

*Defined in [index.ts:657](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L657)*

**Returns:** `Promise`<`void`>

___
<a id="_debuglog"></a>

###  _debugLog

▸ **_debugLog**(message: *`any`*): `void`

*Defined in [index.ts:651](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L651)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `any` |

**Returns:** `void`

___
<a id="_estimatedailyreward"></a>

###  _estimateDailyReward

▸ **_estimateDailyReward**(rewardRate: *`any`*): `BigNumber`

*Defined in [index.ts:616](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L616)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| rewardRate | `any` |

**Returns:** `BigNumber`

___
<a id="_estimateproposalpower"></a>

###  _estimateProposalPower

▸ **_estimateProposalPower**(stake: *`any`*): `BigNumber`

*Defined in [index.ts:608](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L608)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| stake | `any` |

**Returns:** `BigNumber`

___
<a id="_getlisting"></a>

###  _getListing

▸ **_getListing**(pubKey: *`any`*): `Promise`<`any`>

*Defined in [index.ts:540](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L540)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| pubKey | `any` |

**Returns:** `Promise`<`any`>

___
<a id="_gettotalstake"></a>

###  _getTotalStake

▸ **_getTotalStake**(): `BigNumber`

*Defined in [index.ts:634](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L634)*

**Returns:** `BigNumber`

___
<a id="_getvalidatorpower"></a>

###  _getValidatorPower

▸ **_getValidatorPower**(pubKey: *`any`*): `Promise`<`any`>

*Defined in [index.ts:544](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L544)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| pubKey | `any` |

**Returns:** `Promise`<`any`>

___
<a id="_handleevents"></a>

###  _handleEvents

▸ **_handleEvents**(events: *`any`*): `Promise`<`void`>

*Defined in [index.ts:489](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L489)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| events | `any` |

**Returns:** `Promise`<`void`>

___
<a id="_processchallenge"></a>

###  _processChallenge

▸ **_processChallenge**(listing: *`any`*): `Promise`<`void`>

*Defined in [index.ts:426](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L426)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| listing | `any` |

**Returns:** `Promise`<`void`>

___
<a id="_processlisting"></a>

###  _processListing

▸ **_processListing**(listing: *`any`*): `Promise`<`void`>

*Defined in [index.ts:346](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L346)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| listing | `any` |

**Returns:** `Promise`<`void`>

___
<a id="_processproposal"></a>

###  _processProposal

▸ **_processProposal**(listing: *`any`*): `Promise`<`void`>

*Defined in [index.ts:372](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L372)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| listing | `any` |

**Returns:** `Promise`<`void`>

___
<a id="_processresolvedchallenge"></a>

###  _processResolvedChallenge

▸ **_processResolvedChallenge**(pubKey: *`any`*, listing: *`any`*): `Promise`<`void`>

*Defined in [index.ts:480](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L480)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| pubKey | `any` |
| listing | `any` |

**Returns:** `Promise`<`void`>

___
<a id="_processvalidator"></a>

###  _processValidator

▸ **_processValidator**(listing: *`any`*): `Promise`<`void`>

*Defined in [index.ts:398](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L398)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| listing | `any` |

**Returns:** `Promise`<`void`>

___
<a id="_removevalidator"></a>

###  _removeValidator

▸ **_removeValidator**(pubKey: *`any`*): `void`

*Defined in [index.ts:594](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L594)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| pubKey | `any` |

**Returns:** `void`

___
<a id="_updatevotepowers"></a>

###  _updateVotePowers

▸ **_updateVotePowers**(): `void`

*Defined in [index.ts:624](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L624)*

**Returns:** `void`

___
<a id="estimatefutureblocktimestamp"></a>

###  estimateFutureBlockTimestamp

▸ **estimateFutureBlockTimestamp**(blockNumber: *`number`*): `Promise`<`number`>

*Defined in [index.ts:273](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L273)*

Estimate the UNIX timestamp (in seconds) at which a given `block` will be mined.

*__example__*:
 ```javascript
const block = 6102105;
const unixTs = gov.estimateFutureBlockTimestamp(block);

// use as a normal date object (multiply by 1000 to get ms)
const blockDate = new Date(ts * 1000);
```

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| blockNumber | `number` |  the block number to estimate the timestamp for |

**Returns:** `Promise`<`number`>
the block's estimated UNIX timestamp (in seconds)

___
<a id="ethertowei"></a>

###  etherToWei

▸ **etherToWei**(ether: *`string` \| `BigNumber`*): `string`

*Defined in [index.ts:254](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L254)*

Convert a number of tokens (full units, called "ether") to "wei", the smallest denomination of most ERC-20 tokens with 18 decimals.

All contract calls require amounts in wei, but the user should be shown amounts in ether.

*__example__*:
 ```javascript
gov.etherToWei(10)  // > "10000000000000000000"
gov.etherToWei("1") // > "1000000000000000000"
```

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| ether | `string` \| `BigNumber` |  the token amount to convert |

**Returns:** `string`
the same amount in wei, string used for precision

___
<a id="gethistoricalchallenges"></a>

###  getHistoricalChallenges

▸ **getHistoricalChallenges**(): `Promise`<`Array`<[PastChallenge](../interfaces/_index_.pastchallenge.md)>>

*Defined in [index.ts:342](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L342)*

This method returns an array (described below) that contains information about all past challenges. Intended to be used for the "Past Challenges" section.

**Returns:** `Promise`<`Array`<[PastChallenge](../interfaces/_index_.pastchallenge.md)>>
all historical `challenges`.

___
<a id="getpastblocktimestamp"></a>

###  getPastBlockTimestamp

▸ **getPastBlockTimestamp**(blockNumber: *`number`*): `Promise`<`number`>

*Defined in [index.ts:324](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L324)*

Retrieve the Unix timestamp of a block that has already been mined. Should be used to display times of things that have happened (validator confirmed, etc.).

*__example__*:
 ```javascript
await gov.getPastBlockTimestamp(515237) // > 1559346404
```

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| blockNumber | `number` |  the block to get the unix timestamp for |

**Returns:** `Promise`<`number`>
the Unix timestamp of the specified `blockNumber`

___
<a id="init"></a>

###  init

▸ **init**(): `Promise`<`void`>

*Defined in [index.ts:191](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L191)*

Main initialization function for the `gov` module. You must call `init` prior to interacting with most module functionality, and `gov.init()` will load the current registry status (validators, proposals, etc.) so it should be called early-on in the page life-cycle.

Performs many functions, including:

*   prompt user to connect MetaMask
*   load user's address (the "coinbase")
*   load the current Ethereum block height
*   load and process the latest ValidatorRegistry state

**Returns:** `Promise`<`void`>

___
<a id="weitoether"></a>

###  weiToEther

▸ **weiToEther**(wei: *`string` \| `BigNumber`*): `string`

*Defined in [index.ts:235](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L235)*

Convert a number of tokens, denominated in the smallest unit - "wei" - to "full" units, called "ether". One ether = 1\*10^18 wei.

All contract calls require amounts in wei, but the user should be shown amounts in ether.

*__example__*:
 ```javascript
gov.weiToEther("100000000000000000000") // > "100"
gov.weiToEther(100000000000000000000)   // > "100"
```

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| wei | `string` \| `BigNumber` |  the token amount in wei to convert |

**Returns:** `string`
the same amount in ether, string used for precision

___

