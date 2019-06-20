# PosterRegistry


Implementation contract for the PosterRegistry, allowing users to bond and un-bond tokens.

## Contents


 - [Methods](undefined)
    
     - [constructor](#constructor)
     - [registerTokens](#registerTokens)
     - [releaseTokens](#releaseTokens)
     - [token](#token)
     - [tokensContributed](#tokensContributed)
     - [tokensRegisteredFor](#tokensRegisteredFor)
     - [treasury](#treasury)
    

## Methods

### constructor


Creates a new PosterRegistry

#### Signature

```solidity
constructor(_auth, _events, _treasuryAddress)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
`_auth` | `undefined` | Deployed AuthorizedAddresses contract address
`_events` | `undefined` | Deployed Events contract address
`_treasuryAddress` | `undefined` | Deployed Treasury contract address

### registerTokens


Register tokens.

#### Signature

```solidity
function registerTokens(amount address, msgSender uint256)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
`amount` | `address` | Number of tokens to register
`msgSender` | `uint256` | Address that called the proxy

### releaseTokens


Release tokens from the registry.

#### Signature

```solidity
function releaseTokens(amount address, msgSender uint256)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
`amount` | `address` | Number of tokens to release
`msgSender` | `uint256` | Address that called the proxy

### token


The token address.

#### Signature

```solidity
function token()
```

#### Returns:


KosuToken address.

### tokensContributed


The number of tokens that have been contributed to the contract

#### Signature

```solidity
function tokensContributed()
```

#### Returns:


Total number of tokens contributed.

### tokensRegisteredFor


Tokens registered for a user.

#### Signature

```solidity
function tokensRegisteredFor(a address)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
`a` | `address` | Address to get value for

#### Returns:


Tokens registered for address.

### treasury


The Treasury address.

#### Signature

```solidity
function treasury()
```

#### Returns:


Deployed Treasury address.
