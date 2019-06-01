## Classes

<dl>
<dt><a href="#Gov">Gov</a></dt>
<dd><p><code>Gov</code> is a helper library for interacting with the Kosu validator governance
system (primarily the Kosu <code>ValidatorRegistry</code> contract).</p>
<p>It is designed with the browser in mind, and is intended to be used in front-
end projects for simplifying interaction with the governance system.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Listing">Listing</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Challenge">Challenge</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#HistoricalActivity">HistoricalActivity</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="Gov"></a>

## Gov
`Gov` is a helper library for interacting with the Kosu validator governance
system (primarily the Kosu `ValidatorRegistry` contract).

It is designed with the browser in mind, and is intended to be used in front-
end projects for simplifying interaction with the governance system.

**Kind**: global class  

* [Gov](#Gov)
    * [new Gov()](#new_Gov_new)
    * _instance_
        * [.init()](#Gov+init)
        * [.weiToEther(wei)](#Gov+weiToEther) ⇒ <code>string</code>
        * [.etherToWei(ether)](#Gov+etherToWei) ⇒ <code>string</code>
        * [.estimateFutureBlockTimestamp(blockNumber)](#Gov+estimateFutureBlockTimestamp) ⇒ <code>number</code>
        * [.getPastBlockTimestamp(blockNumber)](#Gov+getPastBlockTimestamp) ⇒ <code>number</code>
        * [.getHistoricalActivity()](#Gov+getHistoricalActivity) ⇒ [<code>HistoricalActivity</code>](#HistoricalActivity)
    * _static_
        * [.ZERO](#Gov.ZERO)
        * [.ONE](#Gov.ONE)
        * [.ONE_HUNDRED](#Gov.ONE_HUNDRED)
        * [.BLOCKS_PER_DAY](#Gov.BLOCKS_PER_DAY)
        * [.BigNumber(input)](#Gov.BigNumber) ⇒ <code>BigNumber</code>

<a name="new_Gov_new"></a>

### new Gov()
Create a new `Gov` instance (`gov`). Requires no arguments, but can be
set to "debug" mode by passing `true` or `1` (or another truthy object to
the constructor).

Prior to using most `gov` functionality, the async `gov.init()` method
must be called, which will initialize the module and load state from
the Kosu contract system.

<a name="Gov+init"></a>

### gov.init()
Main initialization function for the `gov` module. You must call `init`
prior to interacting with most module functionality, and `gov.init()` will
load the current registry status (validators, proposals, etc.) so it should
be called early-on in the page lifecycle.

Performs many functions, including:
- prompt user to connect MetaMask
- load user's address (the "coinbase")
- load the current Ethereum block height
- load and process the latest ValidatorRegistry state

**Kind**: instance method of [<code>Gov</code>](#Gov)  
<a name="Gov+weiToEther"></a>

### gov.weiToEther(wei) ⇒ <code>string</code>
Convert a number of tokens, denominated in the smallest unit - "wei" - to
"full" units, called "ether". One ether = 1*10^18 wei.

All contract calls require amounts in wei, but the user should be shown
amounts in ether.

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>string</code> - the same amount in ether, string used for precision  

| Param | Type | Description |
| --- | --- | --- |
| wei | <code>BigNumber</code> \| <code>string</code> \| <code>number</code> | the token amount in wei to convert |

**Example**  
```javascript
gov.weiToEther("100000000000000000000") // > "100"
gov.weiToEther(100000000000000000000)   // > "100"
```
<a name="Gov+etherToWei"></a>

### gov.etherToWei(ether) ⇒ <code>string</code>
Convert a number of tokens (full units, called "ether") to "wei", the
smallest denomination of most ERC-20 tokens with 18 decimals.

All contract calls require amounts in wei, but the user should be shown
amounts in ether.

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>string</code> - the same amount in wei, string used for precision  

| Param | Type | Description |
| --- | --- | --- |
| ether | <code>BigNumber</code> \| <code>string</code> \| <code>number</code> | the token amount to convert |

**Example**  
```javascript
gov.etherToWei(10)  // > "10000000000000000000"
gov.etherToWei("1") // > "1000000000000000000"
```
<a name="Gov+estimateFutureBlockTimestamp"></a>

### gov.estimateFutureBlockTimestamp(blockNumber) ⇒ <code>number</code>
Estimate the UNIX timestamp (in seconds) at which a given `block` will be
mined.

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>number</code> - the block's estimated UNIX timestamp (in seconds)  

| Param | Type | Description |
| --- | --- | --- |
| blockNumber | <code>number</code> | the block number to estimate the timestamp for |

**Example**  
```javascript
const block = 6102105;
const unixTs = gov.estimateFutureBlockTimestamp(block);

// use as a normal date object (multiply by 1000 to get ms)
const blockDate = new Date(ts * 1000);
```
<a name="Gov+getPastBlockTimestamp"></a>

### gov.getPastBlockTimestamp(blockNumber) ⇒ <code>number</code>
Retrieve the Unix timestamp of a block that has already been mined.
Should be used to display times of things that have happened (validator
confirmed, etc.).

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>number</code> - the Unix timestamp of the specified `blockNumber`  

| Param | Type | Description |
| --- | --- | --- |
| blockNumber | <code>number</code> | the block to get the unix timestamp for |

**Example**  
```javascript
await gov.getPastBlockTimestamp(515237) // > 1559346404
```
<a name="Gov+getHistoricalActivity"></a>

### gov.getHistoricalActivity() ⇒ [<code>HistoricalActivity</code>](#HistoricalActivity)
This method returns an object (described below) that contains all 
historical listings (proposals and validators, including current) listings
and information about all past challenges.

It will take a significant amount of time (~12s) to resolve, and the
return object can be large (on the order of 30 KB) depending on the number
of past governance activities.

Because it a) takes a long time to load and b) is network I/O intensive,
it should only be called when the user requests to load all historical
data.

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: [<code>HistoricalActivity</code>](#HistoricalActivity) - all historical `challenges` and `listings`.  
<a name="Gov.ZERO"></a>

### Gov.ZERO
The value `0` as an instance of`BigNumber`.

**Kind**: static property of [<code>Gov</code>](#Gov)  
<a name="Gov.ONE"></a>

### Gov.ONE
The value `1` as an instance of`BigNumber`.

**Kind**: static property of [<code>Gov</code>](#Gov)  
<a name="Gov.ONE_HUNDRED"></a>

### Gov.ONE\_HUNDRED
The value `100` as an instance of`BigNumber`.

**Kind**: static property of [<code>Gov</code>](#Gov)  
<a name="Gov.BLOCKS_PER_DAY"></a>

### Gov.BLOCKS\_PER\_DAY
Estimated blocks per day (mainnet only).

**Kind**: static property of [<code>Gov</code>](#Gov)  
<a name="Gov.BigNumber"></a>

### Gov.BigNumber(input) ⇒ <code>BigNumber</code>
Create new `BigNumber` instance. Identical to calling `BigNumber` constructor.

**Kind**: static method of [<code>Gov</code>](#Gov)  
**Returns**: <code>BigNumber</code> - the `BigNumber` version of `input`  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>number</code> \| <code>string</code> \| <code>BigNumber</code> | value to wrap as a BigNumber |

**Example**  
```javascript
const bn = new Gov.BigNumber(10); 
```
<a name="Listing"></a>

## Listing : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| owner | <code>string</code> | the Ethereum address of the listing holder |
| rewardRate | <code>BigNumber</code> | the number of KOSU (in wei) rewarded per period |
| applyBlock | <code>BigNumber</code> | the block number the listing was created at |
| pubKey | <code>string</code> | the hex-string Tendermint public key of the listing |
| confBlock | <code>string</code> \| <code>null</code> | the block the listing was confirmed to the registry at (`null` if they were never accepted). |
| status | <code>string</code> | the most recent listing state ("proposal", "validator", or "removed") |
| inChallenge | <code>boolean</code> | `true` if the listing has an open challenge against it |
| challenger | <code>string</code> \| <code>null</code> | the Ethereum address of the challenger, if the listing was challenged |
| challengeEnd | <code>number</code> | the Ethereum block at which the challenge ends (or ended) and `null` if they were never challenged |
| challengeId | <code>string</code> | the unique sequential ID number (as a string) that can be used to reference the challenge |
| pollId | <code>string</code> | the underlying `pollId` from the voting contract; usually but not always equal to `challengeId` |
| challengeResult | <code>string</code> | the result of the challenge, either "succeeded", "failed", or `null` (`null` if challenge is pending, or never happened). |

<a name="Challenge"></a>

## Challenge : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| listingKey | <code>string</code> | the public key of the challenged listing |
| challenger | <code>string</code> | the Ethereum address of the challenging entity |
| voterTotal | <code>BigNumber</code> | the total amount of KOSU (in wei) that participated in the vote |
|  | <code>BigNumber</code> |  |

<a name="HistoricalActivity"></a>

## HistoricalActivity : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| allListings | [<code>Array.&lt;Listing&gt;</code>](#Listing) | an array of all historical listings |
| allChallenges | [<code>Array.&lt;Challenge&gt;</code>](#Challenge) | an arry of all historical challenges, and their results |

