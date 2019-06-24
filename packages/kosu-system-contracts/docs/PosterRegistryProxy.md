# PosterRegistryProxy

Proxy contract for interacting with the PosterRegisty implementation contract.

## Contents

-   [Methods](undefined)
    -   [constructor](#constructor)
    -   [registerTokens](#registertokens)
    -   [releaseTokens](#releasetokens)
    -   [setImplementation](#setimplementation)
    -   [tokensRegisteredFor](#tokensregisteredfor)

## Methods

### constructor

Creates a Proxy for a PosterRegistry. Accepts an initial implementation that can be overwritten if a replacement is deployed.

#### Signature

```solidity
constructor(implementation address, auth address) public
```

#### Parameters:

| Parameter        | Type      | Description                                |
| ---------------- | --------- | ------------------------------------------ |
| `implementation` | `address` | deployed implementation of PosterRegistry. |
| `auth`           | `address` | AuthorizedAddresses deployed address.      |

### registerTokens

Calls registerTokens on the current registry.

#### Signature

```solidity
function registerTokens(amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                           |
| --------- | --------- | ------------------------------------- |
| `amount`  | `uint256` | Desired amount of tokens to register. |

### releaseTokens

Calls releaseTokens for the current registry.

#### Signature

```solidity
function releaseTokens(amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                          |
| --------- | --------- | ------------------------------------ |
| `amount`  | `uint256` | Desired amount of tokens to release. |

### setImplementation

Set a new PosterRegistry implementation if a replacement is deployed.

#### Signature

```solidity
function setImplementation(implementation address) public
```

#### Parameters:

| Parameter        | Type      | Description                                                     |
| ---------------- | --------- | --------------------------------------------------------------- |
| `implementation` | `address` | Deployed address for replacement PosterRegistry implementation. |

### tokensRegisteredFor

Reads the current registries tokens registered for the supplied address.

#### Signature

```solidity
function tokensRegisteredFor(a address) public view (uint256)
```

#### Parameters:

| Parameter | Type      | Description     |
| --------- | --------- | --------------- |
| `a`       | `address` | Address of user |

#### Returns:

The current number of tokens contributed by the address.
