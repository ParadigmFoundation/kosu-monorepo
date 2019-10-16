> **[contract-helpers](../README.md)**

[Globals](../globals.md) / [Treasury](treasury.md) /

# Class: Treasury

Interact with the deployed Kosu Treasury contract.

Instances of the `Treasury` class provide methods to interact with deployed
Kosu Treasury contracts for functionality such as deposits/withdrawals and
allowance management.

If instantiated outside the `Kosu` class, the `web3Wrapper` provided to the
constructor must include the Treasury's ABI (from the compiled Solidity source).

## Hierarchy

-   **Treasury**

## Index

### Constructors

-   [constructor](treasury.md#constructor)

### Properties

-   [kosuToken](treasury.md#kosutoken)

### Methods

-   [approveTreasury](treasury.md#approvetreasury)
-   [currentBalance](treasury.md#currentbalance)
-   [deposit](treasury.md#deposit)
-   [pay](treasury.md#pay)
-   [systemBalance](treasury.md#systembalance)
-   [treasuryAllowance](treasury.md#treasuryallowance)
-   [withdraw](treasury.md#withdraw)

## Constructors

### constructor

\+ **new Treasury**(`options`: `KosuOptions`, `kosuToken`: [KosuToken](kosutoken.md)): _[Treasury](treasury.md)_

_Defined in [Treasury.ts:51](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/Treasury.ts#L51)_

Creates a new Treasury instance.

**Parameters:**

| Name        | Type                      | Description                                   |
| ----------- | ------------------------- | --------------------------------------------- |
| `options`   | `KosuOptions`             | Initialization options (see `KosuOptions`).   |
| `kosuToken` | [KosuToken](kosutoken.md) | Configured/instantiated `KosuToken` instance. |

**Returns:** _[Treasury](treasury.md)_

## Properties

### kosuToken

• **kosuToken**: _[KosuToken](kosutoken.md)_

_Defined in [Treasury.ts:35](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/Treasury.ts#L35)_

An instance of the `KosuToken` class to communicate with the KOSU ERC-20 token.

## Methods

### approveTreasury

▸ **approveTreasury**(`value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [Treasury.ts:212](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/Treasury.ts#L212)_

Approve the treasury to transfer KOSU on behalf of the user's `coinbase`
account.

**`example`**

```typescript
// approve the treasury for 1,000,000 KOSU

const value = new BigNumber(web3.utils.toWei("1000000"));
const receipt = await treasury.approveTreasury(value);
```

**Parameters:**

| Name    | Type        | Description                                              |
| ------- | ----------- | -------------------------------------------------------- |
| `value` | `BigNumber` | The amount of KOSU (in wei) to approve the treasury for. |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

The decoded transaction receipt, after the TX has been mined.

---

### currentBalance

▸ **currentBalance**(`address`: string): _`Promise<BigNumber>`_

_Defined in [Treasury.ts:174](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/Treasury.ts#L174)_

Read the available (current) treasury balance for a provided `address`.

**`example`**

```typescript
// view current balance of address

const address = "0x91c987bf62D25945dB517BDAa840A6c661374402";
const balanceWei = await treasury.currentBalance(address);

// convert to ether from wei
const balance = web3.utils.fromWei(balanceWei);
```

**Parameters:**

| Name      | Type   | Description                                       |
| --------- | ------ | ------------------------------------------------- |
| `address` | string | The Ethereum address to check current balance of. |

**Returns:** _`Promise<BigNumber>`_

The user's current treasury balance (in wei).

---

### deposit

▸ **deposit**(`value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [Treasury.ts:101](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/Treasury.ts#L101)_

Deposit tokens in the treasury, from the detected `coinbase` account.

**`example`**

```typescript
// deposit 10 KOSU

const value = new BigNumber(web3.utils.toWei("10"));
const receipt = await treasury.deposit(value);
```

**Parameters:**

| Name    | Type        | Description                                 |
| ------- | ----------- | ------------------------------------------- |
| `value` | `BigNumber` | The uint value of tokens to deposit in wei. |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

The decoded transaction receipt, after the TX has been included in a block.

---

### pay

▸ **pay**(`value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [Treasury.ts:223](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/Treasury.ts#L223)_

Sends ether to the contract to bond and deposit tokens.

**Parameters:**

| Name    | Type        | Description              |
| ------- | ----------- | ------------------------ |
| `value` | `BigNumber` | Amount of wei to deposit |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

Logs from the transaction block.

---

### systemBalance

▸ **systemBalance**(`address`: string): _`Promise<BigNumber>`_

_Defined in [Treasury.ts:153](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/Treasury.ts#L153)_

Read the total system balance of KOSU for a provided `address` string.

**`example`**

```typescript
// view system balance of address

const address = "0x91c987bf62D25945dB517BDAa840A6c661374402";
const balanceWei = await treasury.systemBalance(address);

// convert to ether from wei
const balance = web3.utils.fromWei(balanceWei);
```

**Parameters:**

| Name      | Type   | Description                                       |
| --------- | ------ | ------------------------------------------------- |
| `address` | string | The Ethereum address to check system balance for. |

**Returns:** _`Promise<BigNumber>`_

The user's total KOSU system balance, in wei.

---

### treasuryAllowance

▸ **treasuryAllowance**(): _`Promise<BigNumber>`_

_Defined in [Treasury.ts:193](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/Treasury.ts#L193)_

View the current treasury allowance for the detected `coinbase` account.

**`example`**

```typescript
// view current allowance for the treasury

const allowanceWei = await treasury.treasuryAllowance();

// convert to ether from wei
const allowance = web3.utils.fromWei(allowanceWei);
```

**Returns:** _`Promise<BigNumber>`_

The current KOSU approval for the Treasury for the current user, in wei.

---

### withdraw

▸ **withdraw**(`value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [Treasury.ts:132](https://github.com/ParadigmFoundation/kosu-monorepo/blob/515d6d59/packages/kosu-contract-helpers/src/Treasury.ts#L132)_

Withdraw tokens from treasury to the detected `coinbase` account.

**`example`**

```typescript
// withdraw 10 KOSU

const value = new BigNumber(web3.utils.toWei("10"));
const receipt = await treasury.withdraw(value);
```

**Parameters:**

| Name    | Type        | Description                                  |
| ------- | ----------- | -------------------------------------------- |
| `value` | `BigNumber` | The uint value of tokens to withdraw in wei. |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

The decoded transaction receipt, after the TX is mined in a block.
