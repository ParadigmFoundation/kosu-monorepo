## `@kosu/gov-portal-helper`

<p><code>Gov</code> is a helper library for interacting with the Kosu validator governance
system (primarily the Kosu <code>ValidatorRegistry</code> contract).</p>
<p>It is designed with the browser in mind, and is intended to be used in front-
end projects for simplifying interaction with the governance system.</p>

## Installation

Add `gov-portal-helper` to your project via `npm` or `yarn`.

```shell
# install with yarn
yarn add @kosu/gov-portal-helper

# install with npm
npm i @kosu/gov-portal-helper
```

## Typedefs

<dl>
<dt><a href="#Validator">Validator</a></dt>
<dd><p>Represents an active validator in the registry.</p></dd>
<dt><a href="#Proposal">Proposal</a></dt>
<dd><p>Represents a pending listing application for a spot on the <code>ValidatorRegistry</code>.</p></dd>
<dt><a href="#StoreChallenge">StoreChallenge</a></dt>
<dd><p>Represents a current challenge (in the <code>gov</code> state).</p></dd>
<dt><a href="#PastChallenge">PastChallenge</a></dt>
<dd><p>Represents a historical challenge, and its outcome.</p></dd>
<dt><a href="#ListingSnapshot">ListingSnapshot</a></dt>
<dd><p>Represents a listing at the time it was challenged.</p></dd>
<dt><a href="#Vote">Vote</a></dt>
<dd><p>Represents a stored vote in a challenge poll.</p></dd>
<dt><a href="#ChallengeInfo">ChallengeInfo</a></dt>
<dd><p>Contains block numbers for various state changes for a given challenge.</p></dd>
</dl>

<a name="Gov"></a>

## Gov

<p><code>Gov</code> is a helper library for interacting with the Kosu validator governance
system (primarily the Kosu <code>ValidatorRegistry</code> contract).</p>
<p>It is designed with the browser in mind, and is intended to be used in front-
end projects for simplifying interaction with the governance system.</p>
<p>Methods may be used to load the current <code>proposals</code>, <code>validators</code>, and
<code>challenges</code> from the prototype's state, or the <code>gov.ee</code> object (an EventEmitter)
may be used to detect updates to the state, emitted as <code>gov_update</code> events.</p>
<p>After a <code>gov_update</code> event, the read methods for <code>proposals</code>, <code>challenges</code>,
and <code>validators</code> must be called to load the current listings. Alternatively,
access the objects directly with <code>gov.listings</code>, etc.</p>

**Kind**: global class

-   [Gov](#Gov)
    -   [new Gov()](#new_Gov_new)
    -   _instance_
        -   [.init()](#Gov+init)
        -   [.currentProposals()](#Gov+currentProposals) ⇒ [<code>Map.&lt;Proposal&gt;</code>](#Proposal)
        -   [.currentValidators()](#Gov+currentValidators) ⇒ [<code>Map.&lt;Validator&gt;</code>](#Validator)
        -   [.currentChallenges()](#Gov+currentChallenges) ⇒ [<code>Map.&lt;StoreChallenge&gt;</code>](#StoreChallenge)
        -   [.weiToEther(wei)](#Gov+weiToEther) ⇒ <code>string</code>
        -   [.etherToWei(ether)](#Gov+etherToWei) ⇒ <code>string</code>
        -   [.commitVote(challengeId, value, amount)](#Gov+commitVote) ⇒ <code>Promise.&lt;string&gt;</code>
        -   [.revealVote(challengeId)](#Gov+revealVote) ⇒ <code>Promise.&lt;string&gt;</code>
        -   [.estimateFutureBlockTimestamp(blockNumber)](#Gov+estimateFutureBlockTimestamp) ⇒ <code>Promise.&lt;number&gt;</code>
        -   [.getPastBlockTimestamp(blockNumber)](#Gov+getPastBlockTimestamp) ⇒ <code>Promise.&lt;number&gt;</code>
        -   [.getHistoricalChallenges()](#Gov+getHistoricalChallenges) ⇒ <code>Promise.&lt;Array.&lt;PastChallenge&gt;&gt;</code>
        -   [.getChallengeInfo(challengeId)](#Gov+getChallengeInfo) ⇒ [<code>Promise.&lt;ChallengeInfo&gt;</code>](#ChallengeInfo)
        -   [.currentBlockNumber()](#Gov+currentBlockNumber) ⇒ <code>number</code>
    -   _static_
        -   [.ZERO](#Gov.ZERO)
        -   [.ONE](#Gov.ONE)
        -   [.ONE_HUNDRED](#Gov.ONE_HUNDRED)
        -   [.BLOCKS_PER_DAY](#Gov.BLOCKS_PER_DAY)

<a name="new_Gov_new"></a>

### new Gov()

<p>Create a new <code>Gov</code> instance (<code>gov</code>). Requires no arguments, but can be
set to &quot;debug&quot; mode by passing <code>true</code> or <code>1</code> (or another truthy object to
the constructor).</p>
<p>Prior to using most <code>gov</code> functionality, the async <code>gov.init()</code> method
must be called, which will initialize the module and load state from
the Kosu contract system.</p>

<a name="Gov+init"></a>

### gov.init()

<p>Main initialization function for the <code>gov</code> module. You must call <code>init</code>
prior to interacting with most module functionality, and <code>gov.init()</code> will
load the current registry status (validators, proposals, etc.) so it should
be called early-on in the page life-cycle.</p>
<p>Performs many functions, including:</p>
<ul>
<li>prompt user to connect MetaMask</li>
<li>load user's address (the &quot;coinbase&quot;)</li>
<li>load the current Ethereum block height</li>
<li>load and process the latest ValidatorRegistry state</li>
</ul>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
<a name="Gov+currentProposals"></a>

### gov.currentProposals() ⇒ [<code>Map.&lt;Proposal&gt;</code>](#Proposal)

<p>Load the current proposal map from state.</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: [<code>Map.&lt;Proposal&gt;</code>](#Proposal) - <p>a map where the key is the listing public key, and the value is a proposal object</p>  
**Example**

```javascript
const proposals = gov.currentProposals();
```

<a name="Gov+currentValidators"></a>

### gov.currentValidators() ⇒ [<code>Map.&lt;Validator&gt;</code>](#Validator)

<p>Load the current validators map from state.</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: [<code>Map.&lt;Validator&gt;</code>](#Validator) - <p>a map where the key is the listing public key, and the value is a validator object</p>  
**Example**

```javascript
const validators = gov.currentValidators();
```

<a name="Gov+currentChallenges"></a>

### gov.currentChallenges() ⇒ [<code>Map.&lt;StoreChallenge&gt;</code>](#StoreChallenge)

<p>Load the current challenges map from state.</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: [<code>Map.&lt;StoreChallenge&gt;</code>](#StoreChallenge) - <p>a map where the key is the listing public key, and the value is a challenge object</p>  
**Example**

```javascript
const challenges = gov.currentChallenges();
```

<a name="Gov+weiToEther"></a>

### gov.weiToEther(wei) ⇒ <code>string</code>

<p>Convert a number of tokens, denominated in the smallest unit - &quot;wei&quot; - to
&quot;full&quot; units, called &quot;ether&quot;. One ether = 1*10^18 wei.</p>
<p>All contract calls require amounts in wei, but the user should be shown
amounts in ether.</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>string</code> - <p>the same amount in ether, string used for precision</p>

| Param | Type                                          | Description                               |
| ----- | --------------------------------------------- | ----------------------------------------- |
| wei   | <code>BigNumber</code> \| <code>string</code> | <p>the token amount in wei to convert</p> |

**Example**

```javascript
gov.weiToEther("100000000000000000000"); // > "100"
gov.weiToEther(100000000000000000000); // > "100"
```

<a name="Gov+etherToWei"></a>

### gov.etherToWei(ether) ⇒ <code>string</code>

<p>Convert a number of tokens (full units, called &quot;ether&quot;) to &quot;wei&quot;, the
smallest denomination of most ERC-20 tokens with 18 decimals.</p>
<p>All contract calls require amounts in wei, but the user should be shown
amounts in ether.</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>string</code> - <p>the same amount in wei, string used for precision</p>

| Param | Type                                          | Description                        |
| ----- | --------------------------------------------- | ---------------------------------- |
| ether | <code>BigNumber</code> \| <code>string</code> | <p>the token amount to convert</p> |

**Example**

```javascript
gov.etherToWei(10); // > "10000000000000000000"
gov.etherToWei("1"); // > "1000000000000000000"
```

<a name="Gov+commitVote"></a>

### gov.commitVote(challengeId, value, amount) ⇒ <code>Promise.&lt;string&gt;</code>

<p>Commit a vote in an active a challenge poll.</p>
<p>This method creates a vote (with value and salt), encodes it, and submits
it as a transaction (requires MetaMask signature).</p>
<p>It stores the vote data in a browser cookie so it may be revealed later,
which means voters must reveal a vote with the same browser they used to
commit it.</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>Promise.&lt;string&gt;</code> - <p>the transaction hash of the commit tx</p>

| Param       | Type                   | Description                                                                                   |
| ----------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| challengeId | <code>BigNumber</code> | <p>the pollId of the challenge, as a string</p>                                               |
| value       | <code>string</code>    | <p>the vote value, &quot;1&quot; to vote for the challenge, &quot;0&quot; to vote against</p> |
| amount      | <code>BigNumber</code> | <p>the number of tokens (in wei) to commit in the vote</p>                                    |

**Example**

```javascript
// we are looking at challenge #13, and want to vote AGAINST it with 10 tokens
const pollId = new BigNumber(13);
const amount = new BigNumber(gov.etherToWei("10"));
const value = "0";

// will prompt for MetaMask signature
const commitVoteTxId = await gov.commitVote(pollId, value, amount);

// ... some time passes, we now want to reveal ...

// load vote from cookie and reveal
const revealTxId = await gov.revealVote(new BigNumber("13"));

// ... wait for Tx's to confirm or whatever, etc.
```

<a name="Gov+revealVote"></a>

### gov.revealVote(challengeId) ⇒ <code>Promise.&lt;string&gt;</code>

<p>Reveal a previously committed vote, by challengeId (as a BigNumber).</p>
<p>For this method to work, the user must have committed a vote during the
commit period for the given challenge.</p>
<p>This method must also be called during the reveal period in order for the
transaction not to fail.</p>
<p>Calling this method will trigger a MetaMask pop-up asking for the user's
signature and approval.</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>Promise.&lt;string&gt;</code> - <p>the transaction hash of the reveal tx.</p>

| Param       | Type                   | Description                                      |
| ----------- | ---------------------- | ------------------------------------------------ |
| challengeId | <code>BigNumber</code> | <p>the challenge to reveal a stored vote for</p> |

<a name="Gov+estimateFutureBlockTimestamp"></a>

### gov.estimateFutureBlockTimestamp(blockNumber) ⇒ <code>Promise.&lt;number&gt;</code>

<p>Estimate the UNIX timestamp (in seconds) at which a given <code>block</code> will be
mined.</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>Promise.&lt;number&gt;</code> - <p>the block's estimated UNIX timestamp (in seconds)</p>

| Param       | Type                | Description                                           |
| ----------- | ------------------- | ----------------------------------------------------- |
| blockNumber | <code>number</code> | <p>the block number to estimate the timestamp for</p> |

**Example**

```javascript
const block = 6102105;
const unixTs = gov.estimateFutureBlockTimestamp(block);

// use as a normal date object (multiply by 1000 to get ms)
const blockDate = new Date(ts * 1000);
```

<a name="Gov+getPastBlockTimestamp"></a>

### gov.getPastBlockTimestamp(blockNumber) ⇒ <code>Promise.&lt;number&gt;</code>

<p>Retrieve the Unix timestamp of a block that has already been mined.
Should be used to display times of things that have happened (validator
confirmed, etc.).</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>Promise.&lt;number&gt;</code> - <p>the Unix timestamp of the specified <code>blockNumber</code></p>

| Param       | Type                | Description                                    |
| ----------- | ------------------- | ---------------------------------------------- |
| blockNumber | <code>number</code> | <p>the block to get the unix timestamp for</p> |

**Example**

```javascript
await gov.getPastBlockTimestamp(515237); // > 1559346404
```

<a name="Gov+getHistoricalChallenges"></a>

### gov.getHistoricalChallenges() ⇒ <code>Promise.&lt;Array.&lt;PastChallenge&gt;&gt;</code>

<p>This method returns an array (described below) that contains information
about all past challenges. Intended to be used for the &quot;Past Challenges&quot;
section.</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>Promise.&lt;Array.&lt;PastChallenge&gt;&gt;</code> - <p>all historical <code>challenges</code>.</p>  
<a name="Gov+getChallengeInfo"></a>

### gov.getChallengeInfo(challengeId) ⇒ [<code>Promise.&lt;ChallengeInfo&gt;</code>](#ChallengeInfo)

<p>Returns an object with the block numbers of important times for a given
challenge. Between <code>challengeStart</code> and <code>endCommitPeriod</code>, votes may be
committed (submitted) to the challenge.</p>
<p>Between <code>endCommitPeriod</code> and <code>challengeEnd</code>, votes may be revealed with
the same salt and vote value.</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: [<code>Promise.&lt;ChallengeInfo&gt;</code>](#ChallengeInfo) - <p>the block numbers for this challenge</p>

| Param       | Type                                                                 | Description                             |
| ----------- | -------------------------------------------------------------------- | --------------------------------------- |
| challengeId | <code>string</code> \| <code>number</code> \| <code>BigNumber</code> | <p>the ID of the challenge to query</p> |

**Example**

```javascript
const info = await gov.getChallengeInfo(new BigNumber(1));
const currentBlock = await gov.currentBlockNumber();

if (currentBlock < endCommitPeriod && currentBlock >= challengeStart) {
    // in "commit" period; voters may submit votes
} else if (currentBlock >= endCommitPeriod && currentBlock <= challengeEnd) {
    // in "reveal" period; voters may reveal votes
} else {
    // challenge has ended (or issues with block numbers)
}
```

<a name="Gov+currentBlockNumber"></a>

### gov.currentBlockNumber() ⇒ <code>number</code>

<p>Returns the current block height (as a number).</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>number</code> - <p>The current (or most recent) Ethereum block height.</p>  
<a name="Gov.ZERO"></a>

### Gov.ZERO

<p>The value <code>0</code> as an instance of<code>BigNumber</code>.</p>

**Kind**: static property of [<code>Gov</code>](#Gov)  
<a name="Gov.ONE"></a>

### Gov.ONE

<p>The value <code>1</code> as an instance of<code>BigNumber</code>.</p>

**Kind**: static property of [<code>Gov</code>](#Gov)  
<a name="Gov.ONE_HUNDRED"></a>

### Gov.ONE_HUNDRED

<p>The value <code>100</code> as an instance of<code>BigNumber</code>.</p>

**Kind**: static property of [<code>Gov</code>](#Gov)  
<a name="Gov.BLOCKS_PER_DAY"></a>

### Gov.BLOCKS_PER_DAY

<p>Estimated blocks per day (mainnet only).</p>

**Kind**: static property of [<code>Gov</code>](#Gov)  
<a name="Validator"></a>

## Validator

<p>Represents an active validator in the registry.</p>

**Kind**: global typedef  
**Properties**

| Name             | Type                   | Description                                                              |
| ---------------- | ---------------------- | ------------------------------------------------------------------------ |
| owner            | <code>string</code>    | <p>the Ethereum address of the validator</p>                             |
| stakeSize        | <code>BigNumber</code> | <p>the staked balance (in wei) of the validator</p>                      |
| dailyReward      | <code>BigNumber</code> | <p>the approximate daily reward to the validator (in wei)</p>            |
| confirmationUnix | <code>number</code>    | <p>the unix timestamp of the block the validator was confirmed in</p>    |
| power            | <code>BigNumber</code> | <p>the validators approximate current vote power on the Kosu network</p> |
| details          | <code>string</code>    | <p>arbitrary details provided by the validator when they applied</p>     |

<a name="Proposal"></a>

## Proposal

<p>Represents a pending listing application for a spot on the <code>ValidatorRegistry</code>.</p>

**Kind**: global typedef  
**Properties**

| Name        | Type                   | Description                                                                           |
| ----------- | ---------------------- | ------------------------------------------------------------------------------------- |
| owner       | <code>string</code>    | <p>the Ethereum address of the applicant</p>                                          |
| stakeSize   | <code>BigNumber</code> | <p>the total stake the applicant is including with their proposal (in wei)</p>        |
| dailyReward | <code>BigNumber</code> | <p>the approximate daily reward (in wei) the applicant is requesting</p>              |
| power       | <code>BigNumber</code> | <p>the estimated vote power the listing would receive if accepted right now</p>       |
| details     | <code>string</code>    | <p>arbitrary details provided by the applicant with their proposal</p>                |
| acceptUnix  | <code>number</code>    | <p>the approximate unix timestamp the listing will be accepted, if not challenged</p> |

<a name="StoreChallenge"></a>

## StoreChallenge

<p>Represents a current challenge (in the <code>gov</code> state).</p>

**Kind**: global typedef  
**Properties**

| Name             | Type                   | Description                                                                                                             |
| ---------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| listingOwner     | <code>string</code>    | <p>the Ethereum address of the owner of the challenged listing</p>                                                      |
| listingStake     | <code>BigNumber</code> | <p>the total stake of the challenged listing</p>                                                                        |
| listingPower     | <code>BigNumber</code> | <p>the current vote power of the listing (if they are a validator)</p>                                                  |
| challenger       | <code>string</code>    | <p>the Ethereum address of the challenger</p>                                                                           |
| challengeId      | <code>BigNumber</code> | <p>the incremental ID of the current challenge</p>                                                                      |
| challengerStake  | <code>BigNumber</code> | <p>the staked balance of the challenger</p>                                                                             |
| challengeEndUnix | <code>number</code>    | <p>the estimated unix timestamp the challenge ends at</p>                                                               |
| challengeEnd     | <code>BigNumber</code> | <p>the block at which the challenge reveal period ends</p>                                                              |
| totalTokens      | <code>BigNumber</code> | <p>if finalized, the total number of tokens from participating voters</p>                                               |
| winningTokens    | <code>BigNumber</code> | <p>if finalized, the number of tokens that voted on the winning side</p>                                                |
| result           | <code>string</code>    | <p>the final result of the challenge; &quot;passed&quot;, &quot;failed&quot;, or <code>null</code> if not finalized</p> |
| challengeType    | <code>string</code>    | <p>the type of listing the challenge is against, either a &quot;validator&quot; or a &quot;proposal&quot;</p>           |
| listingDetails   | <code>string</code>    | <p>details provided by the listing holder</p>                                                                           |
| challengeDetails | <code>string</code>    | <p>details provided by the challenger</p>                                                                               |

<a name="PastChallenge"></a>

## PastChallenge

<p>Represents a historical challenge, and its outcome.</p>

**Kind**: global typedef  
**Properties**

| Name            | Type                                             | Description                                                                                    |
| --------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| balance         | <code>BigNumber</code>                           | <p>the number of tokens (in wei) staked in the challenge</p>                                   |
| challengeEnd    | <code>BigNumber</code>                           | <p>the block the challenge ends at</p>                                                         |
| challenger      | <code>string</code>                              | <p>the Ethereum address of the challenger</p>                                                  |
| details         | <code>string</code>                              | <p>additional details provided by the challenger</p>                                           |
| finalized       | <code>boolean</code>                             | <p><code>true</code> if the challenge result is final, <code>false</code> if it is ongoing</p> |
| listingKey      | <code>string</code>                              | <p>the key that corresponds to the challenged listing</p>                                      |
| listingSnapshot | [<code>ListingSnapshot</code>](#ListingSnapshot) | <p>an object representing the state of the challenged listing at the time of challenge</p>     |
| passed          | <code>boolean</code>                             | <p><code>true</code> if the challenge was successful, <code>false</code> otherwise</p>         |
| pollId          | <code>BigNumber</code>                           | <p>the incremental ID used to identify the poll</p>                                            |
| voterTotal      | <code>BigNumber</code>                           | <p>the total number of tokens participating in the vote</p>                                    |
| winningTokens   | <code>BigNumber</code>                           | <p>the total number of tokens voting for the winning option</p>                                |

<a name="ListingSnapshot"></a>

## ListingSnapshot

<p>Represents a listing at the time it was challenged.</p>

**Kind**: global typedef  
**Properties**

| Name                | Type                   | Description                                                                                                               |
| ------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| applicationBlock    | <code>BigNumber</code> | <p>the block the listing application was submitted</p>                                                                    |
| confirmationBlock   | <code>BigNumber</code> | <p>the block the listing was confirmed (0 if unconfirmed)</p>                                                             |
| currentChallenge    | <code>BigNumber</code> | <p>the ID of the current challenge against the listing</p>                                                                |
| details             | <code>string</code>    | <p>arbitrary details provided by the listing applicant</p>                                                                |
| exitBlock           | <code>BigNumber</code> | <p>the block (if any) the listing exited at</p>                                                                           |
| lastRewardBlock     | <code>BigNumber</code> | <p>the last block the listing owner claimed rewards for</p>                                                               |
| owner               | <code>string</code>    | <p>the Ethereum address of the listing owner</p>                                                                          |
| rewardRate          | <code>BigNumber</code> | <p>the number of tokens (in wei) rewarded to the listing per reward period</p>                                            |
| stakedBalance       | <code>BigNumber</code> | <p>the number of tokens staked by the listing owner (in wei)</p>                                                          |
| status              | <code>number</code>    | <p>the number representing the listing status (0: no listing, 1: proposal, 2: validator, 3: in-challenge, 4: exiting)</p> |
| tendermintPublicKey | <code>string</code>    | <p>the 32 byte Tendermint public key of the listing holder</p>                                                            |

<a name="Vote"></a>

## Vote

<p>Represents a stored vote in a challenge poll.</p>

**Kind**: global typedef  
**Properties**

| Name    | Type                   | Description                                                                          |
| ------- | ---------------------- | ------------------------------------------------------------------------------------ |
| id      | <code>BigNumber</code> | <p>the challengeId the vote is for</p>                                               |
| value   | <code>string</code>    | <p>the vote value (should be &quot;1&quot; or &quot;0&quot; for challenge votes)</p> |
| salt    | <code>string</code>    | <p>a secret string used to hash the vote; must use same salt in commit as reveal</p> |
| encoded | <code>string</code>    | <p>the encoded vote, as passed to the contract system</p>                            |

<a name="ChallengeInfo"></a>

## ChallengeInfo

<p>Contains block numbers for various state changes for a given challenge.</p>

**Kind**: global typedef  
**Properties**

| Name            | Type                | Description                                                                              |
| --------------- | ------------------- | ---------------------------------------------------------------------------------------- |
| challengeStart  | <code>number</code> | <p>the block at which the challenge was initiated, and when the commit period starts</p> |
| endCommitPeriod | <code>number</code> | <p>the block the commit period ends, and the reveal period starts</p>                    |
| challengeEnd    | <code>number</code> | <p>the block the reveal period ends, and the challenge finalizes</p>                     |
