# KosuToken

KosuToken (KOSU) is an implementation of the ERC-20 interface and supporting bonding curve for mints and burns.

## Contents

-   [Methods](undefined)
    -   [allowance](#allowance)
    -   [approve](#approve)
    -   [balanceOf](#balanceof)
    -   [bondTokens](#bondtokens)
    -   [burn](#burn)
    -   [decreaseAllowance](#decreaseallowance)
    -   [estimateEtherToToken](#estimateethertotoken)
    -   [estimateTokenToEther](#estimatetokentoether)
    -   [increaseAllowance](#increaseallowance)
    -   [mintTo](#mintto)
    -   [releaseTokens](#releasetokens)
    -   [transfer](#transfer)
    -   [transferFrom](#transferfrom)

## Methods

### allowance

Function to check the amount of tokens that an owner allowed to a spender.

#### Signature

```solidity
function allowance(owner address, spender address) public view (uint256)
```

#### Parameters:

| Parameter | Type      | Description                                     |
| --------- | --------- | ----------------------------------------------- |
| `owner`   | `address` | address The address which owns the funds.       |
| `spender` | `address` | address The address which will spend the funds. |

#### Returns:

A uint256 specifying the amount of tokens still available for the spender.

### approve

Approve the passed address to spend the specified amount of tokens on behalf of msg.sender. Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729

#### Signature

```solidity
function approve(spender address, value uint256) public (bool)
```

#### Parameters:

| Parameter | Type      | Description                             |
| --------- | --------- | --------------------------------------- |
| `spender` | `address` | The address which will spend the funds. |
| `value`   | `uint256` | The amount of tokens to be spent.       |

### balanceOf

Gets the balance of the specified address.

#### Signature

```solidity
function balanceOf(owner address) public view (uint256)
```

#### Parameters:

| Parameter | Type      | Description                          |
| --------- | --------- | ------------------------------------ |
| `owner`   | `address` | The address to query the balance of. |

#### Returns:

An uint256 representing the amount owned by the passed address.

### bondTokens

Receives ether as a backing currency to be used against the bonding curve to mint tokens.

#### Signature

```solidity
function bondTokens(minPayout uint256) public (uint256)
```

#### Parameters:

| Parameter   | Type      | Description                                                                                                                          |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `minPayout` | `uint256` | The minimum number of tokens to mint otherwise the transaction is reverted. This should prevent a front runner modifying the output. |

### burn

Voluntarily burn tokens.

#### Signature

```solidity
function burn(amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description               |
| --------- | --------- | ------------------------- |
| `amount`  | `uint256` | Number of tokens to burn. |

### decreaseAllowance

Decrease the amount of tokens that an owner allowed to a spender. approve should be called when allowed\_[_spender] == 0. To decrement allowed value is better to use this function to avoid 2 calls (and wait until the first transaction is mined) From MonolithDAO Token.sol Emits an Approval event.

#### Signature

```solidity
function decreaseAllowance(spender address, subtractedValue uint256) public (bool)
```

#### Parameters:

| Parameter         | Type      | Description                                        |
| ----------------- | --------- | -------------------------------------------------- |
| `spender`         | `address` | The address which will spend the funds.            |
| `subtractedValue` | `uint256` | The amount of tokens to decrease the allowance by. |

### estimateEtherToToken

Estimates the number of tokens that would be minted with the input ether at the current ether and token balances.

#### Signature

```solidity
function estimateEtherToToken(input uint256) public view (uint256)
```

#### Parameters:

| Parameter | Type      | Description                        |
| --------- | --------- | ---------------------------------- |
| `input`   | `uint256` | The amount of ether to contribute. |

#### Returns:

Number of tokens that would be minted.

### estimateTokenToEther

Estimates the amount of ether to be released with the input number of tokens to burn.

#### Signature

```solidity
function estimateTokenToEther(input uint256) public view (uint256)
```

#### Parameters:

| Parameter | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `input`   | `uint256` | The number of tokens to burn. |

#### Returns:

Amount of ether to release.

### increaseAllowance

Increase the amount of tokens that an owner allowed to a spender. approve should be called when allowed\_[_spender] == 0. To increment allowed value is better to use this function to avoid 2 calls (and wait until the first transaction is mined) From MonolithDAO Token.sol Emits an Approval event.

#### Signature

```solidity
function increaseAllowance(spender address, addedValue uint256) public (bool)
```

#### Parameters:

| Parameter    | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `spender`    | `address` | The address which will spend the funds.            |
| `addedValue` | `uint256` | The amount of tokens to increase the allowance by. |

### mintTo

Authorized addresses (mostly contract systems) may manually mint new tokens to desired addresses.

#### Signature

```solidity
function mintTo(_address address, amount uint256) public
```

#### Parameters:

| Parameter  | Type      | Description                |
| ---------- | --------- | -------------------------- |
| `_address` | `address` | Address to mint tokens to. |
| `amount`   | `uint256` | Number of tokens to mint.  |

### releaseTokens

Burns the input tokens and releases the calculated amount of ether backing the tokens destroyed.

#### Signature

```solidity
function releaseTokens(tokensToBurn uint256) public
```

#### Parameters:

| Parameter      | Type      | Description                             |
| -------------- | --------- | --------------------------------------- |
| `tokensToBurn` | `uint256` | The number of the users tokens to burn. |

### transfer

Transfer token for a specified address

#### Signature

```solidity
function transfer(to address, value uint256) public (bool)
```

#### Parameters:

| Parameter | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `to`      | `address` | The address to transfer to.   |
| `value`   | `uint256` | The amount to be transferred. |

### transferFrom

Transfer tokens from one address to another. Note that while this function emits an Approval event, this is not required as per the specification, and other compliant implementations may not emit the event.

#### Signature

```solidity
function transferFrom(from address, to address, value uint256) public (bool)
```

#### Parameters:

| Parameter | Type      | Description                                            |
| --------- | --------- | ------------------------------------------------------ |
| `from`    | `address` | address The address which you want to send tokens from |
| `to`      | `address` | address The address which you want to transfer to      |
| `value`   | `uint256` | uint256 the amount of tokens to be transferred         |
