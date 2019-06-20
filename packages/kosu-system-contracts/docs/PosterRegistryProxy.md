# PosterRegistryProxy


Proxy contract for interacting with the PosterRegisty implementation contract.

## Contents


 - [Methods](undefined)
    
     - [constructor](#constructor)
     - [registerTokens](#registerTokens)
     - [releaseTokens](#releaseTokens)
     - [setImplementation](#setImplementation)
     - [token](#token)
     - [tokensContributed](#tokensContributed)
     - [tokensRegisteredFor](#tokensRegisteredFor)
     - [treasury](#treasury)
    

## Methods

### constructor


Creates a Proxy for a PosterRegistry. Accepts an initial implementation that can be overwritten if a replacement is deployed.

#### Signature

```solidity
constructor(auth, implementation)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
auth | ? | AuthorizedAddresses deployed address.
implementation | ? | deployed implementation of PosterRegistry.

### registerTokens


Calls registerTokens on the current registry.

#### Signature

```solidity
function registerTokens(amount uint256)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
amount | uint256 | Desired amount of tokens to register.

### releaseTokens


Calls releaseTokens for the current registry.

#### Signature

```solidity
function releaseTokens(amount uint256)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
amount | uint256 | Desired amount of tokens to release.

### setImplementation


Set a new PosterRegistry implementation if a replacement is deployed.

#### Signature

```solidity
function setImplementation(implementation address)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
implementation | address | Deployed address for replacement PosterRegistry implementation.

### token


Reads the current registries token.

#### Signature

```solidity
function token()
```

#### Returns:


Address of configured ERC20 token.

### tokensContributed


Reads the current registries tokensContributed.

#### Signature

```solidity
function tokensContributed()
```

#### Returns:


Total number of tokens contributed the the current registry.

### tokensRegisteredFor


Reads the current registries tokens registered for the supplied address.

#### Signature

```solidity
function tokensRegisteredFor(a address)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
a | address | Address of user

#### Returns:


The current number of tokens contributed by the address.

### treasury


Reads the current registries Treasury address.

#### Signature

```solidity
function treasury()
```

#### Returns:


Address of configured treasury.
