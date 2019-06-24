# Treasury

The Kosu Treasury is the central balance management contract with the Kosu system.

## Contents

-   [Methods](undefined)
    -   [adjustBalance](#adjustbalance)
    -   [award](#award)
    -   [burnFrom](#burnfrom)
    -   [claimTokens](#claimtokens)
    -   [confiscate](#confiscate)
    -   [constructor](#constructor)
    -   [contractDeposit](#contractdeposit)
    -   [contractWithdraw](#contractwithdraw)
    -   [currentBalance](#currentbalance)
    -   [deposit](#deposit)
    -   [releaseTokens](#releasetokens)
    -   [systemBalance](#systembalance)
    -   [updateBalance](#updatebalance)
    -   [withdraw](#withdraw)

## Methods

### adjustBalance

Allows contracts to change balance.

#### Signature

```solidity
function adjustBalance(account address, amount int256) public
```

#### Parameters:

| Parameter | Type      | Description               |
| --------- | --------- | ------------------------- |
| `account` | `address` | User to modify tokens for |
| `amount`  | `int256`  | Change to token balance   |

### award

Allows contracts to be rewarded with new tokens.

#### Signature

```solidity
function award(account address, amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description               |
| --------- | --------- | ------------------------- |
| `account` | `address` | User to award tokens to   |
| `amount`  | `uint256` | Number of tokens to award |

### burnFrom

Allows contracts to burn tokens.

#### Signature

```solidity
function burnFrom(account address, amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                          |
| --------- | --------- | ------------------------------------ |
| `account` | `address` | User to modify tokens for by burning |
| `amount`  | `uint256` | Number of tokens to burn             |

### claimTokens

Allows contracts to claim tokens.

#### Signature

```solidity
function claimTokens(account address, amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description               |
| --------- | --------- | ------------------------- |
| `account` | `address` | User to claim tokens from |
| `amount`  | `uint256` | Number of tokens to claim |

### confiscate

Allows contracts to confiscate tokens the user has lost access to.

#### Signature

```solidity
function confiscate(account address, amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `account` | `address` | User to confiscate tokens from |
| `amount`  | `uint256` | Number of tokens to confiscate |

### constructor

Creates a new Treasury.

#### Signature

```solidity
constructor(kosuTokenAddress address, auth address) public
```

#### Parameters:

| Parameter          | Type      | Description                             |
| ------------------ | --------- | --------------------------------------- |
| `kosuTokenAddress` | `address` | The deployed KosuToken contract address |
| `auth`             | `address` | AuthorizedAddresses deployed address.   |

### contractDeposit

Allows contracts to deposit.

#### Signature

```solidity
function contractDeposit(account address, amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `account` | `address` | User to deposit tokens for  |
| `amount`  | `uint256` | Number of tokens to deposit |

### contractWithdraw

Allows contracts to withdraw.

#### Signature

```solidity
function contractWithdraw(account address, amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                  |
| --------- | --------- | ---------------------------- |
| `account` | `address` | User to withdraw tokens for  |
| `amount`  | `uint256` | Number of tokens to withdraw |

### currentBalance

Reports the balance held within the contract for a user.

#### Signature

```solidity
function currentBalance(account address) public view (uint256)
```

#### Parameters:

| Parameter | Type      | Description                  |
| --------- | --------- | ---------------------------- |
| `account` | `address` | Account to report balance on |

#### Returns:

Number of tokens this contract holds for the user.

### deposit

Deposits tokens into the treasury.

#### Signature

```solidity
function deposit(amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `amount`  | `uint256` | Number of tokens to deposit |

### releaseTokens

Allows contracts to release tokens.

#### Signature

```solidity
function releaseTokens(account address, amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `account` | `address` | User to release tokens to   |
| `amount`  | `uint256` | Number of tokens to release |

### systemBalance

Reports the balance within the contract system for a user.

#### Signature

```solidity
function systemBalance(account address) public view (uint256)
```

#### Parameters:

| Parameter | Type      | Description                  |
| --------- | --------- | ---------------------------- |
| `account` | `address` | Account to report balance on |

#### Returns:

The number of tokens within the total contract system.

### updateBalance

Allows contracts to set balance.

#### Signature

```solidity
function updateBalance(account address, amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                                |
| --------- | --------- | ------------------------------------------ |
| `account` | `address` | User to modify tokens for                  |
| `amount`  | `uint256` | Number of tokens to set to current balance |

### withdraw

Withdraw tokens from the treasury.

#### Signature

```solidity
function withdraw(amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                  |
| --------- | --------- | ---------------------------- |
| `amount`  | `uint256` | Number of tokens to withdraw |
