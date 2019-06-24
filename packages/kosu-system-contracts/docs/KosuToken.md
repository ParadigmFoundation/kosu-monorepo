# KosuToken

KosuToken (KOSU) is an implentation of the ERC-20 interface, supporting mints and burns.

## Contents

-   [Methods](undefined)
    -   [allowance](#allowance)
    -   [approve](#approve)
    -   [balanceOf](#balanceof)
    -   [burn](#burn)
    -   [constructor](#constructor)
    -   [decreaseAllowance](#decreaseallowance)
    -   [increaseAllowance](#increaseallowance)
    -   [mint](#mint)
    -   [mintTo](#mintto)
    -   [totalSupply](#totalsupply)
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

### burn

Burn tokens

#### Signature

```solidity
function burn(amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `amount`  | `uint256` | Number of tokens to destroy |

### constructor

Deploy a new ERC20 Token

#### Signature

```solidity
undefined
```

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

### mint

Mint tokens

#### Signature

```solidity
function mint(amount uint256) public
```

#### Parameters:

| Parameter | Type      | Description                |
| --------- | --------- | -------------------------- |
| `amount`  | `uint256` | Number of tokens to create |

### mintTo

Mint tokens to specified address

#### Signature

```solidity
function mintTo(_address address, amount uint256) public
```

#### Parameters:

| Parameter  | Type      | Description                 |
| ---------- | --------- | --------------------------- |
| `_address` | `address` | Address to receive tokens   |
| `amount`   | `uint256` | Number of tokens to create. |

### totalSupply

Total number of tokens in existence

#### Signature

```solidity
function totalSupply() public view (uint256)
```

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
