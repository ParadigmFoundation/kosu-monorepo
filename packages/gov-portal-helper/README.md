<a name="Gov"></a>

## Gov
<p><code>Gov</code> is a helper library for interacting with the Kosu validator governance
system (primarily the Kosu <code>ValidatorRegistry</code> contract).</p>
<p>It is designed with the browser in mind, and is intended to be used in front-
end projects for simplifying interaction with the governance system.</p>

**Kind**: global class  

* [Gov](#Gov)
    * [new Gov()](#new_Gov_new)
    * _instance_
        * [.init()](#Gov+init)
        * [.weiToEther(wei)](#Gov+weiToEther) ⇒ <code>string</code>
        * [.etherToWei(ether)](#Gov+etherToWei) ⇒ <code>string</code>
        * [.estimateFutureBlockTimestamp(blockNumber)](#Gov+estimateFutureBlockTimestamp) ⇒ <code>Promise.&lt;number&gt;</code>
        * [.getPastBlockTimestamp(blockNumber)](#Gov+getPastBlockTimestamp) ⇒ <code>Promise.&lt;number&gt;</code>
        * [.getHistoricalChallenges()](#Gov+getHistoricalChallenges) ⇒ <code>Promise.&lt;Array.&lt;PastChallenge&gt;&gt;</code>
    * _static_
        * [.ZERO](#Gov.ZERO)
        * [.ONE](#Gov.ONE)
        * [.ONE_HUNDRED](#Gov.ONE_HUNDRED)
        * [.BLOCKS_PER_DAY](#Gov.BLOCKS_PER_DAY)

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
<a name="Gov+weiToEther"></a>

### gov.weiToEther(wei) ⇒ <code>string</code>
<p>Convert a number of tokens, denominated in the smallest unit - &quot;wei&quot; - to
&quot;full&quot; units, called &quot;ether&quot;. One ether = 1*10^18 wei.</p>
<p>All contract calls require amounts in wei, but the user should be shown
amounts in ether.</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>string</code> - <p>the same amount in ether, string used for precision</p>  

| Param | Type | Description |
| --- | --- | --- |
| wei | <code>BigNumber</code> \| <code>string</code> | <p>the token amount in wei to convert</p> |

**Example**  
```javascript
gov.weiToEther("100000000000000000000") // > "100"
gov.weiToEther(100000000000000000000)   // > "100"
```
<a name="Gov+etherToWei"></a>

### gov.etherToWei(ether) ⇒ <code>string</code>
<p>Convert a number of tokens (full units, called &quot;ether&quot;) to &quot;wei&quot;, the
smallest denomination of most ERC-20 tokens with 18 decimals.</p>
<p>All contract calls require amounts in wei, but the user should be shown
amounts in ether.</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>string</code> - <p>the same amount in wei, string used for precision</p>  

| Param | Type | Description |
| --- | --- | --- |
| ether | <code>BigNumber</code> \| <code>string</code> | <p>the token amount to convert</p> |

**Example**  
```javascript
gov.etherToWei(10)  // > "10000000000000000000"
gov.etherToWei("1") // > "1000000000000000000"
```
<a name="Gov+estimateFutureBlockTimestamp"></a>

### gov.estimateFutureBlockTimestamp(blockNumber) ⇒ <code>Promise.&lt;number&gt;</code>
<p>Estimate the UNIX timestamp (in seconds) at which a given <code>block</code> will be
mined.</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>Promise.&lt;number&gt;</code> - <p>the block's estimated UNIX timestamp (in seconds)</p>  

| Param | Type | Description |
| --- | --- | --- |
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

| Param | Type | Description |
| --- | --- | --- |
| blockNumber | <code>number</code> | <p>the block to get the unix timestamp for</p> |

**Example**  
```javascript
await gov.getPastBlockTimestamp(515237) // > 1559346404
```
<a name="Gov+getHistoricalChallenges"></a>

### gov.getHistoricalChallenges() ⇒ <code>Promise.&lt;Array.&lt;PastChallenge&gt;&gt;</code>
<p>This method returns an array (described below) that contains information
about all past challenges. Intended to be used for the &quot;Past Challenges&quot;
section.</p>

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>Promise.&lt;Array.&lt;PastChallenge&gt;&gt;</code> - <p>all historical <code>challenges</code>.</p>  
<a name="Gov.ZERO"></a>

### Gov.ZERO
<p>The value <code>0</code> as an instance of<code>BigNumber</code>.</p>

**Kind**: static property of [<code>Gov</code>](#Gov)  
<a name="Gov.ONE"></a>

### Gov.ONE
<p>The value <code>1</code> as an instance of<code>BigNumber</code>.</p>

**Kind**: static property of [<code>Gov</code>](#Gov)  
<a name="Gov.ONE_HUNDRED"></a>

### Gov.ONE\_HUNDRED
<p>The value <code>100</code> as an instance of<code>BigNumber</code>.</p>

**Kind**: static property of [<code>Gov</code>](#Gov)  
<a name="Gov.BLOCKS_PER_DAY"></a>

### Gov.BLOCKS\_PER\_DAY
<p>Estimated blocks per day (mainnet only).</p>

**Kind**: static property of [<code>Gov</code>](#Gov)  
