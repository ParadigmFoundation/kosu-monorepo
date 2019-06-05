<a name="Create"></a>

## Create
Helper methods for building the Paradigm "Create" portal.

**Kind**: global class  

* [Create](#Create)
    * [new Create()](#new_Create_new)
    * [.init()](#Create+init)
    * [.createAndSignOrder(options)](#Create+createAndSignOrder)
    * [.signAndPost(signedZeroExOrder)](#Create+signAndPost)
    * [.convertToWei(etherAmount)](#Create+convertToWei) ⇒ <code>BigNumber</code>
    * [.convertFromWei(weiAmount)](#Create+convertFromWei) ⇒ <code>BigNumber</code>
    * [.isValidAddress(address)](#Create+isValidAddress) ⇒ <code>boolean</code>
    * [.userHasBond(userAddress)](#Create+userHasBond) ⇒ <code>boolean</code>
    * [.awaitTransactionSuccessOrThrow(txID)](#Create+awaitTransactionSuccessOrThrow) ⇒
    * [.getUserWethBalance(userAddress)](#Create+getUserWethBalance) ⇒ <code>BigNumber</code>
    * [.getUserWethAllowance(userAddress)](#Create+getUserWethAllowance) ⇒ <code>BigNumber</code>
    * [.setProxyAllowanceWeth(userAddress)](#Create+setProxyAllowanceWeth) ⇒ <code>string</code>
    * [.getUserZrxBalance(userAddress)](#Create+getUserZrxBalance) ⇒ <code>BigNumber</code>
    * [.getUserZrxAllowance(userAddress)](#Create+getUserZrxAllowance) ⇒ <code>BigNumber</code>
    * [.setProxyAllowanceZrx(userAddress)](#Create+setProxyAllowanceZrx) ⇒ <code>string</code>
    * [.getUserDaiBalance(userAddress)](#Create+getUserDaiBalance) ⇒ <code>BigNumber</code>
    * [.getUserDaiAllowance(userAddress)](#Create+getUserDaiAllowance) ⇒ <code>BigNumber</code>
    * [.setProxyAllowanceDai(userAddress)](#Create+setProxyAllowanceDai) ⇒ <code>string</code>
    * [.getUserCustomBalance(tokenAddress, userAddress)](#Create+getUserCustomBalance) ⇒ <code>BigNumber</code>
    * [.getUserCustomAllowance(tokenAddress, userAddress)](#Create+getUserCustomAllowance) ⇒ <code>BigNumber</code>
    * [.setProxyAllowanceCustom(tokenAddress, userAddress)](#Create+setProxyAllowanceCustom) ⇒ <code>string</code>

<a name="new_Create_new"></a>

### new Create()
Construct a new `Create` instance. Accepts no arguments, and returns an
un-initialized instance.

Most instance methods require `init()` to be called prior to use.

<a name="Create+init"></a>

### create.init()
Must be called prior to using most library functionality. Calling `init`
will trigger a Metamask pop-up prompting the user to approve access to
the web page.

As such, `init()` should be the function call associated with the UX
"Connect to Metamask" button.

Catching promise rejections from `init()` is required, and indicates
some bad user configuration. Certain rejections can be used to update
front-end state.

Rejection cases:
- "wrong network": the user is not on the Ethereum main-network
- "user denied site access": the user clicked "deny" on Metamask pop-up
- "non-ethereum browser detected": user does not have a web3 browser

**Kind**: instance method of [<code>Create</code>](#Create)  
<a name="Create+createAndSignOrder"></a>

### create.createAndSignOrder(options)
Generate and sign a 0x order. Will prompt user for a MetaMask signature.

**Kind**: instance method of [<code>Create</code>](#Create)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | object with the following properties: </br>   - makerAssetAddress: either ("WETH/DAI/ZRX") or a full 42 char hex address</br>   - takerAssetAddress: either ("WETH/DAI/ZRX") or a full 42 char hex address</br>   - makerAssetAmount: units are wei, value can be string/number or BigNumber</br>   - takerAssetAmount: units are wei, value can be string/number or BigNumber</br>   - orderDuration: the number of seconds the order should be valid for</br>   - makerAddress: *can* be provided to override `coinbase`, but shouldn't</br> |

**Example**  
```javascript
// create an order for 0.5 WETH <> 80 custom token, valid for 10 minutes
let order = await create.createAndSignOrder({
  makerAssetAddress: "WETH",
  takerAssetAddress: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
  makerAssetAmount: create.convertToWei("0.5"),
  takerAssetAmount: create.convertToWei("80"),
  orderDuration: 600
});
```
<a name="Create+signAndPost"></a>

### create.signAndPost(signedZeroExOrder)
Signs a (already signed) 0x order as the Kosu poster, and posts and order
to the Kosu network. Requires the poster to have a bonded amount of KOSU
in the `PosterRegistry` contract.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Todo:**: - undo split-network ugly-ness
 - don't pull `makerArguments` from subcontract if provided
 - ability to use direct kosu.js to sign  

| Param | Type | Description |
| --- | --- | --- |
| signedZeroExOrder | <code>object</code> | as outputted from `createAndSignOrder` |

<a name="Create+convertToWei"></a>

### create.convertToWei(etherAmount) ⇒ <code>BigNumber</code>
Converts a number (assumed to be number of tokens) as a string to
units of wei, which must be used for generating 0x orders.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>BigNumber</code> - the same amount in wei  

| Param | Type | Description |
| --- | --- | --- |
| etherAmount | <code>string</code> \| <code>BigNumber</code> | a number of tokens in full units (ether) |

**Example**  
```javascript
// convert 100 tokens (as entered by user) to wei
create.convertToWei("100")  // > "100000000000000000000" (BigNumber)
create.convertToWei(100)    // > "100000000000000000000" (BigNumber)
```
<a name="Create+convertFromWei"></a>

### create.convertFromWei(weiAmount) ⇒ <code>BigNumber</code>
Converts a number (assumed to be number of tokens in wei) as a string to
units of ether, which is more common to display to users.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>BigNumber</code> - the same amount in ether  

| Param | Type | Description |
| --- | --- | --- |
| weiAmount | <code>string</code> \| <code>BigNumber</code> | a number of tokens in smallest units (wei) |

**Example**  
```javascript
// convert 100 tokens (as received as balance or allowance) to tokens
create.convertToWei("100000000000000000000")  // > "100" (BigNumber)
create.convertToWei(100000000000000000000)    // > "100" (BigNumber)
```
<a name="Create+isValidAddress"></a>

### create.isValidAddress(address) ⇒ <code>boolean</code>
Returns `true` if the inputted string is a valid Ethereum address, otherwise
returns `false`.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>boolean</code> - `true` if valid Ethereum address, otherwise `false`  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | a string to be validated as an Ethereum address |

**Example**  
```javascript
create.isValidAddress("0x4f833a24e1f95d70f028921e27040ca56e09ab0b")  // > true
create.isValidAddress("4f833a24e1f95d70f028921e27040ca56e09ab0b")    // > false
create.isValidAddress("0x4f833a24e1f95d70f028921e27040ca56e09ab0")   // > false
```
<a name="Create+userHasBond"></a>

### create.userHasBond(userAddress) ⇒ <code>boolean</code>
Check if the user (by their `coinbase` address) is allowed to post to the
Kosu network. Returns `true` if they are, and `false` if they are not.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>boolean</code> - `true` if user has active bond, `false` otherwise  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | can be provided to override coinbase, but shouldn't |

<a name="Create+awaitTransactionSuccessOrThrow"></a>

### create.awaitTransactionSuccessOrThrow(txID) ⇒
Async function that returns a promise that resolves when the supplied txID
is mined and executed successfully. If the transaction fails, the promise
will reject. The resolved object is a full receipt that can usually be 
ignored. The purpose of this method is to simply wait until a transaction
is successfully mined.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: the full decoded transaction receipt (usually will not need)  

| Param | Type | Description |
| --- | --- | --- |
| txID | <code>string</code> | 32 byte (64-char) 0x-prefixed transaction hash |

**Example**  
```javascript
const txId = await create.setProxyAllowanceWeth();

// wait for the transaction to be mined, show loading icon, etc.
await create.awaitTransactionSuccessOrThrow(txId);
```
<a name="Create+getUserWethBalance"></a>

### create.getUserWethBalance(userAddress) ⇒ <code>BigNumber</code>
Returns a BigNumber representing the users WETH balance (in wei).

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>BigNumber</code> - the user's WETH balance in `wei`  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+getUserWethAllowance"></a>

### create.getUserWethAllowance(userAddress) ⇒ <code>BigNumber</code>
Returns a BigNumber representing the users WETH allowance for the 0x
contract system.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>BigNumber</code> - the user's 0x proxy WETH allowance in `wei`  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+setProxyAllowanceWeth"></a>

### create.setProxyAllowanceWeth(userAddress) ⇒ <code>string</code>
Sets an unlimited allowance for the 0x contract system for WETH.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>string</code> - the transaction hash of the resulting tx  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+getUserZrxBalance"></a>

### create.getUserZrxBalance(userAddress) ⇒ <code>BigNumber</code>
Returns a BigNumber representing the users ZRX balance (in wei).

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>BigNumber</code> - the user's ZRX balance in `wei`  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+getUserZrxAllowance"></a>

### create.getUserZrxAllowance(userAddress) ⇒ <code>BigNumber</code>
Returns a BigNumber representing the users ZRX allowance for the 0x
contract system.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>BigNumber</code> - the user's 0x proxy ZRX allowance in `wei`  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+setProxyAllowanceZrx"></a>

### create.setProxyAllowanceZrx(userAddress) ⇒ <code>string</code>
Sets an unlimited allowance for the 0x contract system for ZRX.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>string</code> - the transaction hash of the resulting tx  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+getUserDaiBalance"></a>

### create.getUserDaiBalance(userAddress) ⇒ <code>BigNumber</code>
Returns a BigNumber representing the users DAI balance (in wei).

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>BigNumber</code> - the user's DAI balance in `wei`  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+getUserDaiAllowance"></a>

### create.getUserDaiAllowance(userAddress) ⇒ <code>BigNumber</code>
Returns a BigNumber representing the users DAI allowance for the 0x
contract system.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>BigNumber</code> - the user's 0x proxy DAI allowance in `wei`  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+setProxyAllowanceDai"></a>

### create.setProxyAllowanceDai(userAddress) ⇒ <code>string</code>
Sets an unlimited allowance for the 0x contract system for DAI.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>string</code> - the transaction hash of the resulting tx  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+getUserCustomBalance"></a>

### create.getUserCustomBalance(tokenAddress, userAddress) ⇒ <code>BigNumber</code>
Returns a BigNumber representing the users balance of a custom token,
provided by token address.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>BigNumber</code> - the user's balance in `wei` of custom token  

| Param | Type | Description |
| --- | --- | --- |
| tokenAddress | <code>string</code> | 0x-prefixed address of the custom token |
| userAddress | <code>string</code> | override user's detected coinbase address |

**Example**  
```javascript
const balance = await create.getUserCustomBalance(
  "0x4f833a24e1f95d70f028921e27040ca56e09ab0b"
);
```
<a name="Create+getUserCustomAllowance"></a>

### create.getUserCustomAllowance(tokenAddress, userAddress) ⇒ <code>BigNumber</code>
Returns a BigNumber representing the users allowance for the 0x
contract system of a custom token, provided by tokenAddress.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>BigNumber</code> - the user's 0x proxy allowance in `wei` for custom token  

| Param | Type | Description |
| --- | --- | --- |
| tokenAddress | <code>string</code> | 0x-prefixed address of the custom token |
| userAddress | <code>string</code> | override user's detected coinbase address |

**Example**  
```javascript
const allowance = await create.getUserCustomAllowance(
  "0x4f833a24e1f95d70f028921e27040ca56e09ab0b"
);
```
<a name="Create+setProxyAllowanceCustom"></a>

### create.setProxyAllowanceCustom(tokenAddress, userAddress) ⇒ <code>string</code>
Sets an unlimited allowance for the 0x contract system for the provided
custom token address (tokenAddress).

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>string</code> - the transaction hash of the resulting tx  

| Param | Type | Description |
| --- | --- | --- |
| tokenAddress | <code>string</code> | 0x-prefixed address of the custom token |
| userAddress | <code>string</code> | override user's detected coinbase address |

**Example**  
```javascript
await create.setProxyAllowanceCustom(
  "0x4f833a24e1f95d70f028921e27040ca56e09ab0b"
);
```
