<a name="Create"></a>

## Create
Helper methods for building the Paradigm "Create" portal.

**Kind**: global class  

* [Create](#Create)
    * [.createAndSignOrder(options)](#Create+createAndSignOrder)
    * [.signAndPost(signedZeroExOrder)](#Create+signAndPost)
    * [.convertToWei(etherAmount)](#Create+convertToWei) ⇒ <code>string</code>
    * [.convertToWei(weiAmount)](#Create+convertToWei) ⇒ <code>string</code>
    * [.getUserWethBalance(userAddress)](#Create+getUserWethBalance)
    * [.getUserWethAllowance(userAddress)](#Create+getUserWethAllowance)
    * [.setProxyAllowanceWeth(userAddress)](#Create+setProxyAllowanceWeth)
    * [.getUserZrxBalance(userAddress)](#Create+getUserZrxBalance)
    * [.getUserZrxAllowance(userAddress)](#Create+getUserZrxAllowance)
    * [.setProxyAllowanceZrx(userAddress)](#Create+setProxyAllowanceZrx)
    * [.getUserDaiBalance(userAddress)](#Create+getUserDaiBalance)
    * [.getUserDaiAllowance(userAddress)](#Create+getUserDaiAllowance)
    * [.setProxyAllowanceDai(userAddress)](#Create+setProxyAllowanceDai)
    * [.getUserCustomBalance(tokenAddress, userAddress)](#Create+getUserCustomBalance)
    * [.getUserCustomAllowance(tokenAddress, userAddress)](#Create+getUserCustomAllowance)
    * [.setProxyAllowanceCustom(tokenAddress, userAddress)](#Create+setProxyAllowanceCustom)

<a name="Create+createAndSignOrder"></a>

### create.createAndSignOrder(options)
Generate and sign a 0x order. Will prompt user for a MetaMask signature.

**Kind**: instance method of [<code>Create</code>](#Create)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | object with the following properties: </br>   - makerAsset: either ("WETH/DAI/ZRX") or a full 42 char hex address</br>   - takerAsset: either ("WETH/DAI/ZRX") or a full 42 char hex address</br>   - makerAssetAmount: units are wei, value can be string/number or BigNumber</br>   - takerAssetAmount: units are wei, value can be string/number or BigNumber</br>    - orderDuration: the number of seconds the order should be valid for</br>   - makerAddress: *can* be provided to override `coinbase`, but shouldn't</br> |

<a name="Create+signAndPost"></a>

### create.signAndPost(signedZeroExOrder)
Signs a (already signed) 0x order as the Kosu poster, and posts and order
to the Kosu network. Requires the poster to have a bonded amount of KOSU
in the `PosterRegistry` contract.

**Kind**: instance method of [<code>Create</code>](#Create)  

| Param | Type | Description |
| --- | --- | --- |
| signedZeroExOrder | <code>object</code> | as outputted from `createAndSignOrder` |

<a name="Create+convertToWei"></a>

### create.convertToWei(etherAmount) ⇒ <code>string</code>
Converts a number (assumed to be number of tokens) as a string to 
units of wei, which must be used for generating 0x orders.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>string</code> - the same amount in wei  

| Param | Type | Description |
| --- | --- | --- |
| etherAmount | <code>string</code> | a number of tokens in full units (ether) |

<a name="Create+convertToWei"></a>

### create.convertToWei(weiAmount) ⇒ <code>string</code>
Converts a number (assumed to be number of tokens in wei) as a string to 
units of ether, which is more common to display to users.

**Kind**: instance method of [<code>Create</code>](#Create)  
**Returns**: <code>string</code> - the same amount in ether  

| Param | Type | Description |
| --- | --- | --- |
| weiAmount | <code>string</code> | a number of tokens in smallest units (wei) |

<a name="Create+getUserWethBalance"></a>

### create.getUserWethBalance(userAddress)
Returns a BigNumber representing the users WETH balance (in wei).

**Kind**: instance method of [<code>Create</code>](#Create)  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+getUserWethAllowance"></a>

### create.getUserWethAllowance(userAddress)
Returns a BigNumber representing the users WETH allowance for the 0x
contract system.

**Kind**: instance method of [<code>Create</code>](#Create)  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+setProxyAllowanceWeth"></a>

### create.setProxyAllowanceWeth(userAddress)
Sets an unlimited allowance for the 0x contract system for WETH.

**Kind**: instance method of [<code>Create</code>](#Create)  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+getUserZrxBalance"></a>

### create.getUserZrxBalance(userAddress)
Returns a BigNumber representing the users ZRX balance (in wei).

**Kind**: instance method of [<code>Create</code>](#Create)  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+getUserZrxAllowance"></a>

### create.getUserZrxAllowance(userAddress)
Returns a BigNumber representing the users ZRX allowance for the 0x
contract system.

**Kind**: instance method of [<code>Create</code>](#Create)  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+setProxyAllowanceZrx"></a>

### create.setProxyAllowanceZrx(userAddress)
Sets an unlimited allowance for the 0x contract system for ZRX.

**Kind**: instance method of [<code>Create</code>](#Create)  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+getUserDaiBalance"></a>

### create.getUserDaiBalance(userAddress)
Returns a BigNumber representing the users DAI balance (in wei).

**Kind**: instance method of [<code>Create</code>](#Create)  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+getUserDaiAllowance"></a>

### create.getUserDaiAllowance(userAddress)
Returns a BigNumber representing the users DAI allowance for the 0x
contract system.

**Kind**: instance method of [<code>Create</code>](#Create)  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+setProxyAllowanceDai"></a>

### create.setProxyAllowanceDai(userAddress)
Sets an unlimited allowance for the 0x contract system for DAI.

**Kind**: instance method of [<code>Create</code>](#Create)  

| Param | Type | Description |
| --- | --- | --- |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+getUserCustomBalance"></a>

### create.getUserCustomBalance(tokenAddress, userAddress)
Returns a BigNumber representing the users balance of a custom token, 
provided by token address.

**Kind**: instance method of [<code>Create</code>](#Create)  

| Param | Type | Description |
| --- | --- | --- |
| tokenAddress | <code>string</code> | 0x-prefixed address of the custom token |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+getUserCustomAllowance"></a>

### create.getUserCustomAllowance(tokenAddress, userAddress)
Returns a BigNumber representing the users allowance for the 0x
contract system of a custom token, provided by tokenAddress.

**Kind**: instance method of [<code>Create</code>](#Create)  

| Param | Type | Description |
| --- | --- | --- |
| tokenAddress | <code>string</code> | 0x-prefixed address of the custom token |
| userAddress | <code>string</code> | override user's detected coinbase address |

<a name="Create+setProxyAllowanceCustom"></a>

### create.setProxyAllowanceCustom(tokenAddress, userAddress)
Sets an unlimited allowance for the 0x contract system for the provided
custom token address (tokenAddress).

**Kind**: instance method of [<code>Create</code>](#Create)  

| Param | Type | Description |
| --- | --- | --- |
| tokenAddress | <code>string</code> | 0x-prefixed address of the custom token |
| userAddress | <code>string</code> | override user's detected coinbase address |

