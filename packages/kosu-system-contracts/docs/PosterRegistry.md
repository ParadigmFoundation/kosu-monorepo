# PosterRegistry

Implementation contract for the PosterRegistry, allowing users to bond and un-bond tokens.

## Contents

-   [Methods](undefined)
    -   [constructor](#constructor)
    -   [registerTokens](#registertokens)
    -   [releaseTokens](#releasetokens)
    -   [tokensRegisteredFor](#tokensregisteredfor)

## Methods

### constructor

Creates a new PosterRegistry

#### Signature

```solidity
constructor(_treasuryAddress address, _events address, _auth address) public
```

#### Parameters:

| Parameter          | Type      | Description                                   |
| ------------------ | --------- | --------------------------------------------- |
| `_treasuryAddress` | `address` | Deployed Treasury contract address            |
| `_events`          | `address` | Deployed Events contract address              |
| `_auth`            | `address` | Deployed AuthorizedAddresses contract address |

### registerTokens

Register tokens.

#### Signature

```solidity
function registerTokens(msgSender address, amount uint256) public
```

#### Parameters:

| Parameter   | Type      | Description                   |
| ----------- | --------- | ----------------------------- |
| `msgSender` | `address` | Address that called the proxy |
| `amount`    | `uint256` | Number of tokens to register  |

### releaseTokens

Release tokens from the registry.

#### Signature

```solidity
function releaseTokens(msgSender address, amount uint256) public
```

#### Parameters:

| Parameter   | Type      | Description                   |
| ----------- | --------- | ----------------------------- |
| `msgSender` | `address` | Address that called the proxy |
| `amount`    | `uint256` | Number of tokens to release   |

### tokensRegisteredFor

Tokens registered for a user.

#### Signature

```solidity
function tokensRegisteredFor(a address) public view (uint256)
```

#### Parameters:

| Parameter | Type      | Description              |
| --------- | --------- | ------------------------ |
| `a`       | `address` | Address to get value for |

#### Returns:

Tokens registered for address.
