# Treasury

The Kosu Treasury manages KosuToken balances to allow tokens in use within the contract system to be available for voting operations.

## Contents

-   [Methods](undefined)
    -   [award](#award)
    -   [burnFrom](#burnfrom)
    -   [claimTokens](#claimtokens)
    -   [confiscate](#confiscate)
    -   [constructor](#constructor)
    -   [contractBond](#contractbond)
    -   [contractDeposit](#contractdeposit)
    -   [contractWithdraw](#contractwithdraw)
    -   [currentBalance](#currentbalance)
    -   [deposit](#deposit)
    -   [registerVote](#registervote)
    -   [releaseTokens](#releasetokens)
    -   [setVoting](#setvoting)
    -   [systemBalance](#systembalance)
    -   [tokenLocksExpire](#tokenlocksexpire)
    -   [validatorLock](#validatorlock)
    -   [withdraw](#withdraw)

## Methods

### award

Allows accounts to be rewarded with tokens. These tokens were previously obtained by the calling contract and are now being redistributed to the provided account.

#### Signature

```solidity
function award(account address, amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `account` | `address` | Account to award tokens to. |
| `amount`  | `uint256` | Number of tokens to award.  |

### burnFrom

Allows contracts to burn an accounts held tokens.

#### Signature

```solidity
function burnFrom(account address, amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `account` | `address` | Account to burn tokens for. |
| `amount`  | `uint256` | Number of tokens to burn.   |

### claimTokens

Allows contracts to claim tokens. Claimed tokens are not available for other system contract and leave the treasury under control of the calling contract. These tokens are still available for voting.

#### Signature

```solidity
function claimTokens(account address, amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `account` | `address` | Account to claim tokens from. |
| `amount`  | `uint256` | Number of tokens to claim.    |

### confiscate

Allows contracts to confiscate tokens the account has lost access to. These previously claimed tokens are no longer owned by the account.

#### Signature

```solidity
function confiscate(account address, amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                        |
| --------- | --------- | ---------------------------------- |
| `account` | `address` | Account to confiscate tokens from. |
| `amount`  | `uint256` | Number of tokens to confiscate.    |

### constructor

Initializes the treasury with the kosuToken and authorizedAddresses contracts.

#### Signature

```solidity
constructor(kosuTokenAddress address, auth address) public
```

#### Parameters:

| Parameter          | Type      | Description                              |
| ------------------ | --------- | ---------------------------------------- |
| `kosuTokenAddress` | `address` | The deployed KosuToken contract address. |
| `auth`             | `address` | AuthorizedAddresses deployed address.    |

### contractBond

Allows Kosu contracts to bond ether on on the accounts behalf.

#### Signature

```solidity
function contractBond(account address) public (uint256)
```

#### Parameters:

| Parameter | Type      | Description                                              |
| --------- | --------- | -------------------------------------------------------- |
| `account` | `address` | The address the calling contract is acting on behalf of. |

### contractDeposit

Allows contracts to deposit tokens from an accounts balance.

#### Signature

```solidity
function contractDeposit(account address, amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                                        |
| --------- | --------- | -------------------------------------------------- |
| `account` | `address` | Account address the tokens will be deposited from. |
| `amount`  | `uint256` | Number of tokens to deposit.                       |

### contractWithdraw

Allows contracts to withdraw tokens back to an account address.

#### Signature

```solidity
function contractWithdraw(account address, amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                     |
| --------- | --------- | ------------------------------- |
| `account` | `address` | Address to withdraw tokens for. |
| `amount`  | `uint256` | Number of tokens to withdraw.   |

### currentBalance

Reports the available balance held within the treasury for an account.

#### Signature

```solidity
function currentBalance(account address) public view (uint256)
```

#### Parameters:

| Parameter | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `account` | `address` | Account to report balance on. |

#### Returns:

Number of available tokens the treasury holds for the account.

### deposit

Deposits tokens into the treasury.

#### Signature

```solidity
function deposit(amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                  |
| --------- | --------- | ---------------------------- |
| `amount`  | `uint256` | Number of tokens to deposit. |

### registerVote

Allows voting contract to register a poll to ensure tokens aren't removed.

#### Signature

```solidity
function registerVote(account address, pollId uint256, amount uint256, endBlock uint256, losingEndBlock uint256) public (bool)
```

#### Parameters:

| Parameter        | Type      | Description                                                                           |
| ---------------- | --------- | ------------------------------------------------------------------------------------- |
| `account`        | `address` | The account voting.                                                                   |
| `pollId`         | `uint256` | The poll the account is voting on.                                                    |
| `amount`         | `uint256` | Number of tokens contributed.                                                         |
| `endBlock`       | `uint256` | Block number vote token lock should expire.                                           |
| `losingEndBlock` | `uint256` | Block number vote token lock should expire if vote was in support of a losing option. |

### releaseTokens

Allows contracts to release claimed tokens. Allowing them to be used elsewhere by the user again.

#### Signature

```solidity
function releaseTokens(account address, amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `account` | `address` | Account to release tokens to. |
| `amount`  | `uint256` | Number of tokens to release.  |

### setVoting

Set the voting contract after post deployment of the Treasury contract.

#### Signature

```solidity
function setVoting(votingAddress address) public
```

#### Parameters:

| Parameter       | Type      | Description                              |
| --------------- | --------- | ---------------------------------------- |
| `votingAddress` | `address` | address of the deployed Voting contract. |

### systemBalance

Reports the total balance within the entire contract system for an account.

#### Signature

```solidity
function systemBalance(account address) public view (uint256)
```

#### Parameters:

| Parameter | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `account` | `address` | Account to report balance on. |

#### Returns:

The number of tokens within the entire contract system.

### tokenLocksExpire

Allows tokens to determine when all tokens are unlocked for a given account.

#### Signature

```solidity
function tokenLocksExpire(account address) public (uint256)
```

#### Parameters:

| Parameter | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `account` | `address` | The account to look at locks for. |

#### Returns:

Final block of the last lock to expire.

### validatorLock

Allows validator registry to lock tokens in treasury after an exit.

#### Signature

```solidity
function validatorLock(account address, amount uint256, endBlock uint256) public
```

#### Parameters:

| Parameter  | Type      | Description                       |
| ---------- | --------- | --------------------------------- |
| `account`  | `address` | The account validator is locking. |
| `amount`   | `uint256` | Number of tokens to lock.         |
| `endBlock` | `uint256` | The end of the lock.              |

### withdraw

Withdraw tokens from the treasury.

#### Signature

```solidity
function withdraw(amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `amount`  | `uint256` | Number of tokens to withdraw. |
