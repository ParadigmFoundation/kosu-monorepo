<a name="Create"></a>

## Create

<p>Helper methods for building the Paradigm &quot;Create&quot; portal.</p>

**Kind**: global class

-   [Create](#Create)
    -   [new Create()](#new_Create_new)
    -   [.init()](#Create+init)
    -   [.createAndSignOrder(options)](#Create+createAndSignOrder)
    -   [.signAndPost(signedZeroExOrder)](#Create+signAndPost)
    -   [.convertToWei(etherAmount)](#Create+convertToWei) ⇒ <code>Promise.&lt;string&gt;</code>
    -   [.convertFromWei(weiAmount)](#Create+convertFromWei) ⇒ <code>Promise.&lt;string&gt;</code>
    -   [.isValidAddress(address)](#Create+isValidAddress) ⇒ <code>boolean</code>
    -   [.userHasBond(userAddress)](#Create+userHasBond) ⇒ <code>Promise.&lt;boolean&gt;</code>
    -   [.awaitTransactionSuccessOrThrow(txID)](#Create+awaitTransactionSuccessOrThrow) ⇒
    -   [.getUserWethBalance(userAddress)](#Create+getUserWethBalance) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
    -   [.getUserWethAllowance(userAddress)](#Create+getUserWethAllowance) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
    -   [.setProxyAllowanceWeth(userAddress)](#Create+setProxyAllowanceWeth) ⇒ <code>string</code>
    -   [.getUserZrxBalance(userAddress)](#Create+getUserZrxBalance) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
    -   [.getUserZrxAllowance(userAddress)](#Create+getUserZrxAllowance) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
    -   [.setProxyAllowanceZrx(userAddress)](#Create+setProxyAllowanceZrx) ⇒ <code>Promise.&lt;string&gt;</code>
    -   [.getUserDaiBalance(userAddress)](#Create+getUserDaiBalance) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
    -   [.getUserDaiAllowance(userAddress)](#Create+getUserDaiAllowance) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
    -   [.setProxyAllowanceDai(userAddress)](#Create+setProxyAllowanceDai) ⇒ <code>Promise.&lt;string&gt;</code>
    -   [.getUserCustomBalance(tokenAddress, userAddress)](#Create+getUserCustomBalance) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
    -   [.getUserCustomAllowance(tokenAddress, userAddress)](#Create+getUserCustomAllowance) ⇒ <code>Promise.&lt;BigNumber&gt;</code>
    -   [.setProxyAllowanceCustom(tokenAddress, userAddress)](#Create+setProxyAllowanceCustom) ⇒ <code>Promise.&lt;string&gt;</code>

<a name="new_Create_new"></a>

### new Create()

<p>Construct a new <code>Create</code> instance. Accepts no arguments, and returns an
un-initialized instance.</p>
<p>Most instance methods require <code>init()</code> to be called prior to use.</p>

<a name="Create+init"></a>

### create.init()

<p>Must be called prior to using most library functionality. Calling <code>init</code>
will trigger a Metamask pop-up prompting the user to approve access to
the web page.</p>
<p>As such, <code>init()</code> should be the function call associated with the UX
&quot;Connect to Metamask&quot; button.</p>
<p>Catching promise rejections from <code>init()</code> is required, and indicates
some bad user configuration. Certain rejections can be used to update
front-end state.</p>
<p>Rejection cases:</p>
<ul>
<li>&quot;wrong network&quot;: the user is not on the Ethereum main-network</li>
<li>&quot;user denied site access&quot;: the user clicked &quot;deny&quot; on Metamask pop-up</li>
<li>&quot;non-ethereum browser detected&quot;: user does not have a web3 browser</li>
</ul>

**Kind**: instance method of [<code>Create</code>](#Create)  
<a name="Create+createAndSignOrder"></a>

### create.createAndSignOrder(options)

<p>Generate and sign a 0x order. Will prompt user for a MetaMask signature.</p>

**Kind**: instance method of [<code>Create</code>](#Create)

| Param   | Type                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| options | <code>object</code> | <p>object with the following properties: </br></p> <ul> <li>makerAssetAddress: either (&quot;WETH/DAI/ZRX&quot;) or a full 42 char hex address</br></li> <li>takerAssetAddress: either (&quot;WETH/DAI/ZRX&quot;) or a full 42 char hex address</br></li> <li>makerAssetAmount: units are wei, value can be string/number or BigNumber</br></li> <li>takerAssetAmount: units are wei, value can be string/number or BigNumber</br></li> <li>orderDuration: the number of seconds the order should be valid for</br></li> <li>makerAddress: <em>can</em> be provided to override <code>coinbase</code>, but shouldn't</br></li> </ul> |

**Example**

```javascript
// create an order for 0.5 WETH <> 80 custom token, valid for 10 minutes
let order = await create.createAndSignOrder({
    makerAssetAddress: "WETH",
    takerAssetAddress: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
    makerAssetAmount: create.convertToWei("0.5"),
    takerAssetAmount: create.convertToWei("80"),
    orderDuration: 600,
});
```

<a name="Create+signAndPost"></a>

### create.signAndPost(signedZeroExOrder)

<p>Signs a (already signed) 0x order as the Kosu poster, and posts and order
to the Kosu network. Requires the poster to have a bonded amount of KOSU
in the <code>PosterRegistry</code> contract.</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Todo:**: - undo split-network ugly-ness

-   don't pull `makerArguments` from subcontract if provided
-   ability to use direct kosu.js to sign

| Param             | Type                | Description                                              |
| ----------------- | ------------------- | -------------------------------------------------------- |
| signedZeroExOrder | <code>object</code> | <p>as outputted from <code>createAndSignOrder</code></p> |

<a name="Create+convertToWei"></a>

### create.convertToWei(etherAmount) ⇒ <code>Promise.&lt;string&gt;</code>

<p>Converts a number (assumed to be number of tokens) as a string to
units of wei, which must be used for generating 0x orders.</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>Promise.&lt;string&gt;</code> - <p>the same amount in wei</p>

| Param       | Type                                          | Description                                     |
| ----------- | --------------------------------------------- | ----------------------------------------------- |
| etherAmount | <code>string</code> \| <code>BigNumber</code> | <p>a number of tokens in full units (ether)</p> |

**Example**

```javascript
// convert 100 tokens (as entered by user) to wei
create.convertToWei("100"); // > "100000000000000000000" (BigNumber)
create.convertToWei(100); // > "100000000000000000000" (BigNumber)
```

<a name="Create+convertFromWei"></a>

### create.convertFromWei(weiAmount) ⇒ <code>Promise.&lt;string&gt;</code>

<p>Converts a number (assumed to be number of tokens in wei) as a string to
units of ether, which is more common to display to users.</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>Promise.&lt;string&gt;</code> - <p>the same amount in ether</p>

| Param     | Type                                          | Description                                       |
| --------- | --------------------------------------------- | ------------------------------------------------- |
| weiAmount | <code>string</code> \| <code>BigNumber</code> | <p>a number of tokens in smallest units (wei)</p> |

**Example**

```javascript
// convert 100 tokens (as received as balance or allowance) to tokens
create.convertToWei("100000000000000000000"); // > "100" (BigNumber)
create.convertToWei(100000000000000000000); // > "100" (BigNumber)
```

<a name="Create+isValidAddress"></a>

### create.isValidAddress(address) ⇒ <code>boolean</code>

<p>Returns <code>true</code> if the inputted string is a valid Ethereum address, otherwise
returns <code>false</code>.</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>boolean</code> - <p><code>true</code> if valid Ethereum address, otherwise <code>false</code></p>

| Param   | Type                | Description                                            |
| ------- | ------------------- | ------------------------------------------------------ |
| address | <code>string</code> | <p>a string to be validated as an Ethereum address</p> |

**Example**

```javascript
create.isValidAddress("0x4f833a24e1f95d70f028921e27040ca56e09ab0b"); // > true
create.isValidAddress("4f833a24e1f95d70f028921e27040ca56e09ab0b"); // > false
create.isValidAddress("0x4f833a24e1f95d70f028921e27040ca56e09ab0"); // > false
```

<a name="Create+userHasBond"></a>

### create.userHasBond(userAddress) ⇒ <code>Promise.&lt;boolean&gt;</code>

<p>Check if the user (by their <code>coinbase</code> address) is allowed to post to the
Kosu network. Returns <code>true</code> if they are, and <code>false</code> if they are not.</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - <p><code>true</code> if user has active bond, <code>false</code> otherwise</p>

| Param       | Type                | Description                                                |
| ----------- | ------------------- | ---------------------------------------------------------- |
| userAddress | <code>string</code> | <p>can be provided to override coinbase, but shouldn't</p> |

<a name="Create+awaitTransactionSuccessOrThrow"></a>

### create.awaitTransactionSuccessOrThrow(txID) ⇒

<p>Async function that returns a promise that resolves when the supplied txID
is mined and executed successfully. If the transaction fails, the promise
will reject. The resolved object is a full receipt that can usually be
ignored. The purpose of this method is to simply wait until a transaction
is successfully mined.</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <p>the full decoded transaction receipt (usually will not need)</p>

| Param | Type                | Description                                           |
| ----- | ------------------- | ----------------------------------------------------- |
| txID  | <code>string</code> | <p>32 byte (64-char) 0x-prefixed transaction hash</p> |

**Example**

```javascript
const txId = await create.setProxyAllowanceWeth();

// wait for the transaction to be mined, show loading icon, etc.
await create.awaitTransactionSuccessOrThrow(txId);
```

<a name="Create+getUserWethBalance"></a>

### create.getUserWethBalance(userAddress) ⇒ <code>Promise.&lt;BigNumber&gt;</code>

<p>Returns a BigNumber representing the users WETH balance (in wei).</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>Promise.&lt;BigNumber&gt;</code> - <p>the user's WETH balance in <code>wei</code></p>

| Param       | Type                | Description                                      |
| ----------- | ------------------- | ------------------------------------------------ |
| userAddress | <code>string</code> | <p>override user's detected coinbase address</p> |

<a name="Create+getUserWethAllowance"></a>

### create.getUserWethAllowance(userAddress) ⇒ <code>Promise.&lt;BigNumber&gt;</code>

<p>Returns a BigNumber representing the users WETH allowance for the 0x
contract system.</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>Promise.&lt;BigNumber&gt;</code> - <p>the user's 0x proxy WETH allowance in <code>wei</code></p>

| Param       | Type                | Description                                      |
| ----------- | ------------------- | ------------------------------------------------ |
| userAddress | <code>string</code> | <p>override user's detected coinbase address</p> |

<a name="Create+setProxyAllowanceWeth"></a>

### create.setProxyAllowanceWeth(userAddress) ⇒ <code>string</code>

<p>Sets an unlimited allowance for the 0x contract system for WETH.</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>string</code> - <p>the transaction hash of the resulting tx</p>

| Param       | Type                | Description                                      |
| ----------- | ------------------- | ------------------------------------------------ |
| userAddress | <code>string</code> | <p>override user's detected coinbase address</p> |

<a name="Create+getUserZrxBalance"></a>

### create.getUserZrxBalance(userAddress) ⇒ <code>Promise.&lt;BigNumber&gt;</code>

<p>Returns a BigNumber representing the users ZRX balance (in wei).</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>Promise.&lt;BigNumber&gt;</code> - <p>the user's ZRX balance in <code>wei</code></p>

| Param       | Type                | Description                                      |
| ----------- | ------------------- | ------------------------------------------------ |
| userAddress | <code>string</code> | <p>override user's detected coinbase address</p> |

<a name="Create+getUserZrxAllowance"></a>

### create.getUserZrxAllowance(userAddress) ⇒ <code>Promise.&lt;BigNumber&gt;</code>

<p>Returns a BigNumber representing the users ZRX allowance for the 0x
contract system.</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>Promise.&lt;BigNumber&gt;</code> - <p>the user's 0x proxy ZRX allowance in <code>wei</code></p>

| Param       | Type                | Description                                      |
| ----------- | ------------------- | ------------------------------------------------ |
| userAddress | <code>string</code> | <p>override user's detected coinbase address</p> |

<a name="Create+setProxyAllowanceZrx"></a>

### create.setProxyAllowanceZrx(userAddress) ⇒ <code>Promise.&lt;string&gt;</code>

<p>Sets an unlimited allowance for the 0x contract system for ZRX.</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>Promise.&lt;string&gt;</code> - <p>the transaction hash of the resulting tx</p>

| Param       | Type                | Description                                      |
| ----------- | ------------------- | ------------------------------------------------ |
| userAddress | <code>string</code> | <p>override user's detected coinbase address</p> |

<a name="Create+getUserDaiBalance"></a>

### create.getUserDaiBalance(userAddress) ⇒ <code>Promise.&lt;BigNumber&gt;</code>

<p>Returns a BigNumber representing the users DAI balance (in wei).</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>Promise.&lt;BigNumber&gt;</code> - <p>the user's DAI balance in <code>wei</code></p>

| Param       | Type                | Description                                      |
| ----------- | ------------------- | ------------------------------------------------ |
| userAddress | <code>string</code> | <p>override user's detected coinbase address</p> |

<a name="Create+getUserDaiAllowance"></a>

### create.getUserDaiAllowance(userAddress) ⇒ <code>Promise.&lt;BigNumber&gt;</code>

<p>Returns a BigNumber representing the users DAI allowance for the 0x
contract system.</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>Promise.&lt;BigNumber&gt;</code> - <p>the user's 0x proxy DAI allowance in <code>wei</code></p>

| Param       | Type                | Description                                      |
| ----------- | ------------------- | ------------------------------------------------ |
| userAddress | <code>string</code> | <p>override user's detected coinbase address</p> |

<a name="Create+setProxyAllowanceDai"></a>

### create.setProxyAllowanceDai(userAddress) ⇒ <code>Promise.&lt;string&gt;</code>

<p>Sets an unlimited allowance for the 0x contract system for DAI.</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>Promise.&lt;string&gt;</code> - <p>the transaction hash of the resulting tx</p>

| Param       | Type                | Description                                      |
| ----------- | ------------------- | ------------------------------------------------ |
| userAddress | <code>string</code> | <p>override user's detected coinbase address</p> |

<a name="Create+getUserCustomBalance"></a>

### create.getUserCustomBalance(tokenAddress, userAddress) ⇒ <code>Promise.&lt;BigNumber&gt;</code>

<p>Returns a BigNumber representing the users balance of a custom token,
provided by token address.</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>Promise.&lt;BigNumber&gt;</code> - <p>the user's balance in <code>wei</code> of custom token</p>

| Param        | Type                | Description                                      |
| ------------ | ------------------- | ------------------------------------------------ |
| tokenAddress | <code>string</code> | <p>0x-prefixed address of the custom token</p>   |
| userAddress  | <code>string</code> | <p>override user's detected coinbase address</p> |

**Example**

```javascript
const balance = await create.getUserCustomBalance("0x4f833a24e1f95d70f028921e27040ca56e09ab0b");
```

<a name="Create+getUserCustomAllowance"></a>

### create.getUserCustomAllowance(tokenAddress, userAddress) ⇒ <code>Promise.&lt;BigNumber&gt;</code>

<p>Returns a BigNumber representing the users allowance for the 0x
contract system of a custom token, provided by tokenAddress.</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>Promise.&lt;BigNumber&gt;</code> - <p>the user's 0x proxy allowance in <code>wei</code> for custom token</p>

| Param        | Type                | Description                                      |
| ------------ | ------------------- | ------------------------------------------------ |
| tokenAddress | <code>string</code> | <p>0x-prefixed address of the custom token</p>   |
| userAddress  | <code>string</code> | <p>override user's detected coinbase address</p> |

**Example**

```javascript
const allowance = await create.getUserCustomAllowance("0x4f833a24e1f95d70f028921e27040ca56e09ab0b");
```

<a name="Create+setProxyAllowanceCustom"></a>

### create.setProxyAllowanceCustom(tokenAddress, userAddress) ⇒ <code>Promise.&lt;string&gt;</code>

<p>Sets an unlimited allowance for the 0x contract system for the provided
custom token address (tokenAddress).</p>

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>Promise.&lt;string&gt;</code> - <p>the transaction hash of the resulting tx</p>

| Param        | Type                | Description                                      |
| ------------ | ------------------- | ------------------------------------------------ |
| tokenAddress | <code>string</code> | <p>0x-prefixed address of the custom token</p>   |
| userAddress  | <code>string</code> | <p>override user's detected coinbase address</p> |

**Example**

```javascript
await create.setProxyAllowanceCustom("0x4f833a24e1f95d70f028921e27040ca56e09ab0b");
```
