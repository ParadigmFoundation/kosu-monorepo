
Class: Gov
==========

`Gov` is a helper library for interacting with the Kosu validator governance system (primarily the Kosu `ValidatorRegistry` contract).

It is designed with the browser in mind, and is intended to be used in front- end projects for simplifying interaction with the governance system.

Hierarchy
---------

**Gov**

Index
-----

### Constructors

*   [constructor](_index_.gov.md#constructor)

### Properties

*   [challenges](_index_.gov.md#challenges)
*   [coinbase](_index_.gov.md#coinbase)
*   [debug](_index_.gov.md#debug)
*   [ee](_index_.gov.md#ee)
*   [initBlock](_index_.gov.md#initblock)
*   [initialized](_index_.gov.md#initialized)
*   [kosu](_index_.gov.md#kosu)
*   [networkId](_index_.gov.md#networkid)
*   [params](_index_.gov.md#params)
*   [proposals](_index_.gov.md#proposals)
*   [validators](_index_.gov.md#validators)
*   [web3](_index_.gov.md#web3)
*   [BLOCKS\_PER\_DAY](_index_.gov.md#blocks_per_day)
*   [BigNumber](_index_.gov.md#bignumber)
*   [ONE](_index_.gov.md#one)
*   [ONE\_HUNDRED](_index_.gov.md#one_hundred)
*   [ZERO](_index_.gov.md#zero)

### Methods

*   [\_addChallenge](_index_.gov.md#_addchallenge)
*   [\_addProposal](_index_.gov.md#_addproposal)
*   [\_addValidator](_index_.gov.md#_addvalidator)
*   [\_connectMetamask](_index_.gov.md#_connectmetamask)
*   [\_debugLog](_index_.gov.md#_debuglog)
*   [\_estimateDailyReward](_index_.gov.md#_estimatedailyreward)
*   [\_estimateProposalPower](_index_.gov.md#_estimateproposalpower)
*   [\_getListing](_index_.gov.md#_getlisting)
*   [\_getTotalStake](_index_.gov.md#_gettotalstake)
*   [\_getValidatorPower](_index_.gov.md#_getvalidatorpower)
*   [\_handleEvents](_index_.gov.md#_handleevents)
*   [\_processChallenge](_index_.gov.md#_processchallenge)
*   [\_processListing](_index_.gov.md#_processlisting)
*   [\_processProposal](_index_.gov.md#_processproposal)
*   [\_processResolvedChallenge](_index_.gov.md#_processresolvedchallenge)
*   [\_processValidator](_index_.gov.md#_processvalidator)
*   [\_removeValidator](_index_.gov.md#_removevalidator)
*   [\_updateVotePowers](_index_.gov.md#_updatevotepowers)
*   [estimateFutureBlockTimestamp](_index_.gov.md#estimatefutureblocktimestamp)
*   [etherToWei](_index_.gov.md#ethertowei)
*   [getHistoricalChallenges](_index_.gov.md#gethistoricalchallenges)
*   [getPastBlockTimestamp](_index_.gov.md#getpastblocktimestamp)
*   [init](_index_.gov.md#init)
*   [weiToEther](_index_.gov.md#weitoether)

* * *

Constructors
------------

### constructor

⊕ **new Gov**(debug: _`any`_): [Gov](_index_.gov.md)

_Defined in [index.ts:147](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L147)_

Create a new `Gov` instance (`gov`). Requires no arguments, but can be set to "debug" mode by passing `true` or `1` (or another truthy object to the constructor).

Prior to using most `gov` functionality, the async `gov.init()` method must be called, which will initialize the module and load state from the Kosu contract system.

**Parameters:**

Name

Type

debug

`any`

**Returns:** [Gov](_index_.gov.md)

* * *

Properties
----------

### challenges

**● challenges**: _\[Map\](../interfaces/\\_index\_.map.md)<[StoreChallenge](../interfaces/_index_.storechallenge.md)\>\_

_Defined in [index.ts:134](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L134)_

* * *

### coinbase

**● coinbase**: _`string`_

_Defined in [index.ts:138](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L138)_

* * *

### debug

**● debug**: _`boolean`_

_Defined in [index.ts:131](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L131)_

* * *

### ee

**● ee**: _`EventEmitter`_

_Defined in [index.ts:147](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L147)_

* * *

### initBlock

**● initBlock**: _`number`_

_Defined in [index.ts:145](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L145)_

* * *

### initialized

**● initialized**: _`boolean`_

_Defined in [index.ts:130](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L130)_

* * *

### kosu

**● kosu**: _`Kosu`_

_Defined in [index.ts:140](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L140)_

* * *

### networkId

**● networkId**: _`string`_

_Defined in [index.ts:137](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L137)_

* * *

### params

**● params**: _\[ContractParams\](../interfaces/\\_index\_.contractparams.md)\_

_Defined in [index.ts:143](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L143)_

* * *

### proposals

**● proposals**: _\[Map\](../interfaces/\\_index\_.map.md)<[Proposal](../interfaces/_index_.proposal.md)\>\_

_Defined in [index.ts:135](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L135)_

* * *

### validators

**● validators**: _\[Map\](../interfaces/\\_index\_.map.md)<[Validator](../interfaces/_index_.validator.md)\>\_

_Defined in [index.ts:133](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L133)_

* * *

### web3

**● web3**: _`Web3`_

_Defined in [index.ts:141](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L141)_

* * *

### `<Static>` BLOCKS\_PER\_DAY

**● BLOCKS\_PER\_DAY**: _`BigNumber`_

_Defined in [index.ts:128](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L128)_

Estimated blocks per day (mainnet only).

* * *

### `<Static>` BigNumber

**● BigNumber**: _`function`_

_Defined in [index.ts:116](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L116)_

Create new BigNumber (mimics constructor)

#### Type declaration

▸(num: _`string` \| `number`_): `BigNumber`

**Parameters:**

Name

Type

num

`string` \| `number`

**Returns:** `BigNumber`

* * *

### `<Static>` ONE

**● ONE**: _`BigNumber`_

_Defined in [index.ts:122](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L122)_

The value `1` as an instance of`BigNumber`.

* * *

### `<Static>` ONE\_HUNDRED

**● ONE\_HUNDRED**: _`BigNumber`_

_Defined in [index.ts:125](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L125)_

The value `100` as an instance of`BigNumber`.

* * *

### `<Static>` ZERO

**● ZERO**: _`BigNumber`_

_Defined in [index.ts:119](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L119)_

The value `0` as an instance of`BigNumber`.

* * *

Methods
-------

### \_addChallenge

▸ **\_addChallenge**(pubKey: _`any`_, challenge: _`any`_): `void`

_Defined in [index.ts:601](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L601)_

**Parameters:**

Name

Type

pubKey

`any`

challenge

`any`

**Returns:** `void`

* * *

### \_addProposal

▸ **\_addProposal**(pubKey: _`any`_, proposal: _`any`_): `void`

_Defined in [index.ts:578](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L578)_

**Parameters:**

Name

Type

pubKey

`any`

proposal

`any`

**Returns:** `void`

* * *

### \_addValidator

▸ **\_addValidator**(pubKey: _`any`_, validator: _`any`_): `void`

_Defined in [index.ts:585](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L585)_

**Parameters:**

Name

Type

pubKey

`any`

validator

`any`

**Returns:** `void`

* * *

### \_connectMetamask

▸ **\_connectMetamask**(): `Promise`<`void`\>

_Defined in [index.ts:657](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L657)_

**Returns:** `Promise`<`void`\>

* * *

### \_debugLog

▸ **\_debugLog**(message: _`any`_): `void`

_Defined in [index.ts:651](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L651)_

**Parameters:**

Name

Type

message

`any`

**Returns:** `void`

* * *

### \_estimateDailyReward

▸ **\_estimateDailyReward**(rewardRate: _`any`_): `BigNumber`

_Defined in [index.ts:616](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L616)_

**Parameters:**

Name

Type

rewardRate

`any`

**Returns:** `BigNumber`

* * *

### \_estimateProposalPower

▸ **\_estimateProposalPower**(stake: _`any`_): `BigNumber`

_Defined in [index.ts:608](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L608)_

**Parameters:**

Name

Type

stake

`any`

**Returns:** `BigNumber`

* * *

### \_getListing

▸ **\_getListing**(pubKey: _`any`_): `Promise`<`any`\>

_Defined in [index.ts:540](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L540)_

**Parameters:**

Name

Type

pubKey

`any`

**Returns:** `Promise`<`any`\>

* * *

### \_getTotalStake

▸ **\_getTotalStake**(): `BigNumber`

_Defined in [index.ts:634](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L634)_

**Returns:** `BigNumber`

* * *

### \_getValidatorPower

▸ **\_getValidatorPower**(pubKey: _`any`_): `Promise`<`any`\>

_Defined in [index.ts:544](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L544)_

**Parameters:**

Name

Type

pubKey

`any`

**Returns:** `Promise`<`any`\>

* * *

### \_handleEvents

▸ **\_handleEvents**(events: _`any`_): `Promise`<`void`\>

_Defined in [index.ts:489](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L489)_

**Parameters:**

Name

Type

events

`any`

**Returns:** `Promise`<`void`\>

* * *

### \_processChallenge

▸ **\_processChallenge**(listing: _`any`_): `Promise`<`void`\>

_Defined in [index.ts:426](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L426)_

**Parameters:**

Name

Type

listing

`any`

**Returns:** `Promise`<`void`\>

* * *

### \_processListing

▸ **\_processListing**(listing: _`any`_): `Promise`<`void`\>

_Defined in [index.ts:346](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L346)_

**Parameters:**

Name

Type

listing

`any`

**Returns:** `Promise`<`void`\>

* * *

### \_processProposal

▸ **\_processProposal**(listing: _`any`_): `Promise`<`void`\>

_Defined in [index.ts:372](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L372)_

**Parameters:**

Name

Type

listing

`any`

**Returns:** `Promise`<`void`\>

* * *

### \_processResolvedChallenge

▸ **\_processResolvedChallenge**(pubKey: _`any`_, listing: _`any`_): `Promise`<`void`\>

_Defined in [index.ts:480](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L480)_

**Parameters:**

Name

Type

pubKey

`any`

listing

`any`

**Returns:** `Promise`<`void`\>

* * *

### \_processValidator

▸ **\_processValidator**(listing: _`any`_): `Promise`<`void`\>

_Defined in [index.ts:398](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L398)_

**Parameters:**

Name

Type

listing

`any`

**Returns:** `Promise`<`void`\>

* * *

### \_removeValidator

▸ **\_removeValidator**(pubKey: _`any`_): `void`

_Defined in [index.ts:594](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L594)_

**Parameters:**

Name

Type

pubKey

`any`

**Returns:** `void`

* * *

### \_updateVotePowers

▸ **\_updateVotePowers**(): `void`

_Defined in [index.ts:624](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L624)_

**Returns:** `void`

* * *

### estimateFutureBlockTimestamp

▸ **estimateFutureBlockTimestamp**(blockNumber: _`number`_): `Promise`<`number`\>

_Defined in [index.ts:273](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L273)_

Estimate the UNIX timestamp (in seconds) at which a given `block` will be mined.

_**example**_:

```javascript
const block = 6102105;
const unixTs = gov.estimateFutureBlockTimestamp(block);

// use as a normal date object (multiply by 1000 to get ms)
const blockDate = new Date(ts * 1000);
```

**Parameters:**

Name

Type

Description

blockNumber

`number`

the block number to estimate the timestamp for

**Returns:** `Promise`<`number`\> the block's estimated UNIX timestamp (in seconds)

* * *

### etherToWei

▸ **etherToWei**(ether: _`string` \| `BigNumber`_): `string`

_Defined in [index.ts:254](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L254)_

Convert a number of tokens (full units, called "ether") to "wei", the smallest denomination of most ERC-20 tokens with 18 decimals.

All contract calls require amounts in wei, but the user should be shown amounts in ether.

_**example**_:

```javascript
gov.etherToWei(10); // > "10000000000000000000"
gov.etherToWei("1"); // > "1000000000000000000"
```

**Parameters:**

Name

Type

Description

ether

`string` \| `BigNumber`

the token amount to convert

**Returns:** `string` the same amount in wei, string used for precision

* * *

### getHistoricalChallenges

▸ **getHistoricalChallenges**(): `Promise`<`Array`<[PastChallenge](../interfaces/_index_.pastchallenge.md)\>>

_Defined in [index.ts:342](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L342)_

This method returns an array (described below) that contains information about all past challenges. Intended to be used for the "Past Challenges" section.

**Returns:** `Promise`<`Array`<[PastChallenge](../interfaces/_index_.pastchallenge.md)\>> all historical `challenges`.

* * *

### getPastBlockTimestamp

▸ **getPastBlockTimestamp**(blockNumber: _`number`_): `Promise`<`number`\>

_Defined in [index.ts:324](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L324)_

Retrieve the Unix timestamp of a block that has already been mined. Should be used to display times of things that have happened (validator confirmed, etc.).

_**example**_:

```javascript
await gov.getPastBlockTimestamp(515237); // > 1559346404
```

**Parameters:**

Name

Type

Description

blockNumber

`number`

the block to get the unix timestamp for

**Returns:** `Promise`<`number`\> the Unix timestamp of the specified `blockNumber`

* * *

### init

▸ **init**(): `Promise`<`void`\>

_Defined in [index.ts:191](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L191)_

Main initialization function for the `gov` module. You must call `init` prior to interacting with most module functionality, and `gov.init()` will load the current registry status (validators, proposals, etc.) so it should be called early-on in the page life-cycle.

Performs many functions, including:

*   prompt user to connect MetaMask
*   load user's address (the "coinbase")
*   load the current Ethereum block height
*   load and process the latest ValidatorRegistry state

**Returns:** `Promise`<`void`\>

* * *

### weiToEther

▸ **weiToEther**(wei: _`string` \| `BigNumber`_): `string`

_Defined in [index.ts:235](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L235)_

Convert a number of tokens, denominated in the smallest unit - "wei" - to "full" units, called "ether". One ether = 1\*10^18 wei.

All contract calls require amounts in wei, but the user should be shown amounts in ether.

_**example**_:

```javascript
gov.weiToEther("100000000000000000000"); // > "100"
gov.weiToEther(100000000000000000000); // > "100"
```

**Parameters:**

Name

Type

Description

wei

`string` \| `BigNumber`

the token amount in wei to convert

**Returns:** `string` the same amount in ether, string used for precision

* * *

[@kosu/gov-portal-helper](../README.md) > ["index"](../modules/_index_.md) > [ListingSnapshot](../interfaces/_index_.listingsnapshot.md)

Interface: ListingSnapshot
==========================

The state of the listing at the time of challenge.

Hierarchy
---------

**ListingSnapshot**

Index
-----

### Properties

*   [applicationBlock](_index_.listingsnapshot.md#applicationblock)
*   [confirmationBlock](_index_.listingsnapshot.md#confirmationblock)
*   [currentChallenge](_index_.listingsnapshot.md#currentchallenge)
*   [details](_index_.listingsnapshot.md#details)
*   [exitBlock](_index_.listingsnapshot.md#exitblock)
*   [lastRewardBlock](_index_.listingsnapshot.md#lastrewardblock)
*   [owner](_index_.listingsnapshot.md#owner)
*   [rewardRate](_index_.listingsnapshot.md#rewardrate)
*   [stakedBalance](_index_.listingsnapshot.md#stakedbalance)
*   [status](_index_.listingsnapshot.md#status)
*   [tendermintPublicKey](_index_.listingsnapshot.md#tendermintpublickey)

* * *

Properties
----------

### applicationBlock

**● applicationBlock**: _`BigNumber`_

_Defined in [index.ts:82](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L82)_

* * *

### confirmationBlock

**● confirmationBlock**: _`BigNumber`_

_Defined in [index.ts:83](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L83)_

* * *

### currentChallenge

**● currentChallenge**: _`BigNumber`_

_Defined in [index.ts:84](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L84)_

* * *

### details

**● details**: _`string`_

_Defined in [index.ts:85](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L85)_

* * *

### exitBlock

**● exitBlock**: _`BigNumber`_

_Defined in [index.ts:86](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L86)_

* * *

### lastRewardBlock

**● lastRewardBlock**: _`BigNumber`_

_Defined in [index.ts:87](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L87)_

* * *

### owner

**● owner**: _`string`_

_Defined in [index.ts:88](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L88)_

* * *

### rewardRate

**● rewardRate**: _`BigNumber`_

_Defined in [index.ts:89](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L89)_

* * *

### stakedBalance

**● stakedBalance**: _`BigNumber`_

_Defined in [index.ts:90](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L90)_

* * *

### status

**● status**: _`number`_

_Defined in [index.ts:91](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L91)_

* * *

### tendermintPublicKey

**● tendermintPublicKey**: _`string`_

_Defined in [index.ts:92](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L92)_

* * *

[@kosu/gov-portal-helper](../README.md) > ["index"](../modules/_index_.md) > [PastChallenge](../interfaces/_index_.pastchallenge.md)

Interface: PastChallenge
========================

A challenge as returned from the ValidatorRegistry contract (past challenges).

Hierarchy
---------

**PastChallenge**

Index
-----

### Properties

*   [balance](_index_.pastchallenge.md#balance)
*   [challengeEnd](_index_.pastchallenge.md#challengeend)
*   [challenger](_index_.pastchallenge.md#challenger)
*   [details](_index_.pastchallenge.md#details)
*   [finalized](_index_.pastchallenge.md#finalized)
*   [listingKey](_index_.pastchallenge.md#listingkey)
*   [listingSnapshot](_index_.pastchallenge.md#listingsnapshot)
*   [passed](_index_.pastchallenge.md#passed)
*   [pollId](_index_.pastchallenge.md#pollid)
*   [voterTotal](_index_.pastchallenge.md#votertotal)

* * *

Properties
----------

### balance

**● balance**: _`BigNumber`_

_Defined in [index.ts:66](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L66)_

* * *

### challengeEnd

**● challengeEnd**: _`BigNumber`_

_Defined in [index.ts:67](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L67)_

* * *

### challenger

**● challenger**: _`string`_

_Defined in [index.ts:68](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L68)_

* * *

### details

**● details**: _`string`_

_Defined in [index.ts:69](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L69)_

* * *

### finalized

**● finalized**: _`boolean`_

_Defined in [index.ts:70](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L70)_

* * *

### listingKey

**● listingKey**: _`string`_

_Defined in [index.ts:71](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L71)_

* * *

### listingSnapshot

**● listingSnapshot**: _\[ListingSnapshot\](\\_index\_.listingsnapshot.md)\_

_Defined in [index.ts:72](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L72)_

* * *

### passed

**● passed**: _`boolean`_

_Defined in [index.ts:73](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L73)_

* * *

### pollId

**● pollId**: _`BigNumber`_

_Defined in [index.ts:74](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L74)_

* * *

### voterTotal

**● voterTotal**: _`BigNumber`_

_Defined in [index.ts:75](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L75)_

* * *

[@kosu/gov-portal-helper](../README.md) > ["index"](../modules/_index_.md) > [Proposal](../interfaces/_index_.proposal.md)

Interface: Proposal
===================

Represents a listing proposal in the live-updating store.

Hierarchy
---------

**Proposal**

Index
-----

### Properties

*   [acceptUnix](_index_.proposal.md#acceptunix)
*   [dailyReward](_index_.proposal.md#dailyreward)
*   [details](_index_.proposal.md#details)
*   [owner](_index_.proposal.md#owner)
*   [power](_index_.proposal.md#power)
*   [stakeSize](_index_.proposal.md#stakesize)

* * *

Properties
----------

### acceptUnix

**● acceptUnix**: _`number`_

_Defined in [index.ts:40](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L40)_

* * *

### dailyReward

**● dailyReward**: _`BigNumber`_

_Defined in [index.ts:37](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L37)_

* * *

### details

**● details**: _`string`_

_Defined in [index.ts:39](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L39)_

* * *

### owner

**● owner**: _`string`_

_Defined in [index.ts:35](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L35)_

* * *

### power

**● power**: _`BigNumber`_

_Defined in [index.ts:38](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L38)_

* * *

### stakeSize

**● stakeSize**: _`BigNumber`_

_Defined in [index.ts:36](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L36)_

* * *

[@kosu/gov-portal-helper](../README.md) > ["index"](../modules/_index_.md) > [Validator](../interfaces/_index_.validator.md)

Interface: Validator
====================

Represents a current validator in the live-updating store.

Hierarchy
---------

**Validator**

Index
-----

### Properties

*   [confirmationUnix](_index_.validator.md#confirmationunix)
*   [dailyReward](_index_.validator.md#dailyreward)
*   [details](_index_.validator.md#details)
*   [owner](_index_.validator.md#owner)
*   [power](_index_.validator.md#power)
*   [stakeSize](_index_.validator.md#stakesize)

* * *

Properties
----------

### confirmationUnix

**● confirmationUnix**: _`number`_

_Defined in [index.ts:26](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L26)_

* * *

### dailyReward

**● dailyReward**: _`BigNumber`_

_Defined in [index.ts:25](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L25)_

* * *

### details

**● details**: _`string`_

_Defined in [index.ts:28](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L28)_

* * *

### owner

**● owner**: _`string`_

_Defined in [index.ts:23](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L23)_

* * *

### power

**● power**: _`BigNumber`_

_Defined in [index.ts:27](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L27)_

* * *

### stakeSize

**● stakeSize**: _`BigNumber`_

_Defined in [index.ts:24](https://github.com/paradigmfoundation/kosu-monorepo/blob/f80822a/packages/gov-portal-helper/src/index.ts#L24)_

* * *

## Index

### External modules

* ["index"](modules/_index_.md)

---

