# PosterRegistry


Implementation contract for the PosterRegistry, allowing users to bond and un-bond tokens.

## Contents


 - [Methods](undefined)
    
     - [constructor](#constructor)
     - [registerTokens](#registertokens)
     - [releaseTokens](#releasetokens)
     - [token](#token)
     - [tokensContributed](#tokenscontributed)
     - [tokensRegisteredFor](#tokensregisteredfor)
     - [treasury](#treasury)
    

## Methods

### constructor


Creates a new PosterRegistry

#### Signature

```solidity
constructor()
```

### registerTokens


Register tokens.

#### Signature

```solidity
function registerTokens(msgSender address, amount uint256)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
`msgSender` | `address` | Address that called the proxy
`amount` | `uint256` | Number of tokens to register

### releaseTokens


Release tokens from the registry.

#### Signature

```solidity
function releaseTokens(msgSender address, amount uint256)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
`msgSender` | `address` | Address that called the proxy
`amount` | `uint256` | Number of tokens to release

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
