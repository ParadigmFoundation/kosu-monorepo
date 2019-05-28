<a name="Gov"></a>

## Gov

`Gov` is a helper library for interacting with the Kosu validator governance
system (primarily the Kosu `ValidatorRegistry` contract).

It is designed with the browser in mind, and is intended to be used in front-
end projects for simplifying interaction with the governance system.

**Kind**: global class

-   [Gov](#Gov)
    -   [new Gov()](#new_Gov_new)
    -   [.init()](#Gov+init)
    -   [.weiToEther(wei)](#Gov+weiToEther) ⇒ <code>string</code>
    -   [.etherToWei(ether)](#Gov+etherToWei) ⇒ <code>string</code>
    -   [.estimateFutureBlockTimestamp(block)](#Gov+estimateFutureBlockTimestamp) ⇒ <code>number</code>

<a name="new_Gov_new"></a>

### new Gov()

Create a new `Gov` instance (`gov`). Requires no arguments.

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

-   prompt user to connect MetaMask
-   load user's address (the "coinbase")
-   load the current Ethereum block height
-   load and process the latest ValidatorRegistry state

**Kind**: instance method of [<code>Gov</code>](#Gov)  
<a name="Gov+weiToEther"></a>

### gov.weiToEther(wei) ⇒ <code>string</code>

Convert a number of tokens, denominated in the smallest unit - "wei" - to
"full" units, called "ether". One ether = 1\*10^18 wei.

All contract calls require amounts in wei, but the user should be shown
amounts in ether.

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>string</code> - the same amount in ether, string used for precision

| Param | Type                                                                 | Description                        |
| ----- | -------------------------------------------------------------------- | ---------------------------------- |
| wei   | <code>BigNumber</code> \| <code>string</code> \| <code>number</code> | the token amount in wei to convert |

**Example**

```javascript
gov.weiToEther("100000000000000000000"); // > "100"
gov.weiToEther(100000000000000000000); // > "100"
```

<a name="Gov+etherToWei"></a>

### gov.etherToWei(ether) ⇒ <code>string</code>

Convert a number of tokens (full units, called "ether") to "wei", the
smallest denomination of most ERC-20 tokens with 18 decimals.

All contract calls require amounts in wei, but the user should be shown
amounts in ether.

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>string</code> - the same amount in wei, string used for precision

| Param | Type                                                                 | Description                 |
| ----- | -------------------------------------------------------------------- | --------------------------- |
| ether | <code>BigNumber</code> \| <code>string</code> \| <code>number</code> | the token amount to convert |

**Example**

```javascript
gov.etherToWei(10); // > "10000000000000000000"
gov.etherToWei("1"); // > "1000000000000000000"
```

<a name="Gov+estimateFutureBlockTimestamp"></a>

### gov.estimateFutureBlockTimestamp(block) ⇒ <code>number</code>

Estimate the UNIX timestamp (in seconds) at which a given `block` will be
mined.

**Kind**: instance method of [<code>Gov</code>](#Gov)  
**Returns**: <code>number</code> - the block's estimated UNIX timestamp (in seconds)

| Param | Type                | Description                                    |
| ----- | ------------------- | ---------------------------------------------- |
| block | <code>number</code> | the block number to estimate the timestamp for |

**Example**

```javascript
const block = 6102105;
const unixTs = gov.estimateFutureBlockTimestamp(block);

// use as a normal date object (multiply by 1000 to get ms)
const blockDate = new Date(ts * 1000);
```
