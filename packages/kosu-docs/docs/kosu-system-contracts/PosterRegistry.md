# PosterRegistry

The PosterRegistry allows accounts to manage tokens registered rewarding permission to post orders to the kosu network.

## Contents

-   [Methods](undefined)
    -   [constructor](#constructor)
    -   [registerTokens](#registertokens)
    -   [releaseTokens](#releasetokens)
    -   [tokensRegisteredFor](#tokensregisteredfor)

## Methods

### constructor

Initializes the PosterRegistry with the treasury and EventEmitter addresses.

#### Signature

```solidity
constructor(_treasuryAddress address, _events address) public
```

#### Parameters:

| Parameter          | Type      | Description                       |
| ------------------ | --------- | --------------------------------- |
| `_treasuryAddress` | `address` | Treasury contract address.        |
| `_events`          | `address` | Deployed Events contract address. |

### registerTokens

Register tokens for posting permissions.

#### Signature

```solidity
function registerTokens(amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `amount`  | `uint256` | Number of tokens to register. |

### releaseTokens

Release tokens from the registry.

#### Signature

```solidity
function releaseTokens(amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                  |
| --------- | --------- | ---------------------------- |
| `amount`  | `uint256` | Number of tokens to release. |

### tokensRegisteredFor

Tokens registered for an account.

#### Signature

```solidity
function tokensRegisteredFor(a address) public view (uint256)
```

#### Parameters:

| Parameter | Type      | Description               |
| --------- | --------- | ------------------------- |
| `a`       | `address` | Address to get value for. |

#### Returns:

Tokens registered for address.
