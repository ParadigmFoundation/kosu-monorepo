[wrapper-enhancements](../README.md) › [Globals](../globals.md) › [Treasury](treasury.md)

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

-   [address](treasury.md#address)
-   [coinbase](treasury.md#coinbase)
-   [contract](treasury.md#contract)
-   [kosuToken](treasury.md#kosutoken)
-   [web3Wrapper](treasury.md#web3wrapper)

### Methods

-   [approveTreasury](treasury.md#approvetreasury)
-   [currentBalance](treasury.md#currentbalance)
-   [deposit](treasury.md#deposit)
-   [getContract](treasury.md#getcontract)
-   [pay](treasury.md#pay)
-   [systemBalance](treasury.md#systembalance)
-   [treasuryAllowance](treasury.md#treasuryallowance)
-   [withdraw](treasury.md#withdraw)

## Constructors

### constructor

\+ **new Treasury**(`options`: KosuOptions, `kosuToken?`: [KosuToken](kosutoken.md)): _[Treasury](treasury.md)_

_Defined in [Treasury.ts:45](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/Treasury.ts#L45)_

Creates a new Treasury instance.

**Parameters:**

| Name         | Type                      | Description                                   |
| ------------ | ------------------------- | --------------------------------------------- |
| `options`    | KosuOptions               | Initialization options (see `KosuOptions`).   |
| `kosuToken?` | [KosuToken](kosutoken.md) | Configured/instantiated `KosuToken` instance. |

**Returns:** _[Treasury](treasury.md)_

## Properties

### address

• **address**: _string_

_Defined in [Treasury.ts:40](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/Treasury.ts#L40)_

They deployed Treasury's address for the detected networkID.

---

### coinbase

• **coinbase**: _string_

_Defined in [Treasury.ts:45](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/Treasury.ts#L45)_

The user's coinbase address (if available via supplied provider).

---

### contract

• **contract**: _TreasuryContract_

_Defined in [Treasury.ts:35](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/Treasury.ts#L35)_

A lower-level, auto-generated contract wrapper for the Treasury contract,
generated from solidity source code.

---

### kosuToken

• **kosuToken**: _[KosuToken](kosutoken.md)_

_Defined in [Treasury.ts:29](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/Treasury.ts#L29)_

An instance of the `KosuToken` class to communicate with the KOSU ERC-20 token.

---

### web3Wrapper

• **web3Wrapper**: _Web3Wrapper_

_Defined in [Treasury.ts:24](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/Treasury.ts#L24)_

The `web3Wrapper` instance with the contract's ABI loaded.

## Methods

### approveTreasury

▸ **approveTreasury**(`value`: BigNumber | string | number): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [Treasury.ts:204](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/Treasury.ts#L204)_

Approve the treasury to transfer KOSU on behalf of the user's `coinbase`
account.

**`example`**

```typescript
// approve the treasury for 1,000,000 KOSU

const value = new BigNumber(web3 - utils.toWei("1000000"));
const receipt = await treasury.approveTreasury(value);
```

**Parameters:**

| Name    | Type                                  | Description                                              |
| ------- | ------------------------------------- | -------------------------------------------------------- |
| `value` | BigNumber &#124; string &#124; number | The amount of KOSU (in wei) to approve the treasury for. |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

The decoded transaction receipt, after the TX has been mined.

---

### currentBalance

▸ **currentBalance**(`address`: string): _Promise‹BigNumber›_

_Defined in [Treasury.ts:166](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/Treasury.ts#L166)_

Read the available (current) treasury balance for a provided `address`.

**`example`**

```typescript
// view current balance of address

const address = "0x91c987bf62D25945dB517BDAa840A6c661374402";
const balanceWei = await treasury.currentBalance(address);

// convert to ether from wei
const balance = web3 - utils.fromWei(balanceWei);
```

**Parameters:**

| Name      | Type   | Description                                       |
| --------- | ------ | ------------------------------------------------- |
| `address` | string | The Ethereum address to check current balance of. |

**Returns:** _Promise‹BigNumber›_

The user's current treasury balance (in wei).

---

### deposit

▸ **deposit**(`value`: BigNumber | string | number): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [Treasury.ts:94](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/Treasury.ts#L94)_

Deposit tokens in the treasury, from the detected `coinbase` account.

**`example`**

```typescript
// deposit 10 KOSU

const value = new BigNumber(web3 - utils.toWei("10"));
const receipt = await treasury.deposit(value);
```

**Parameters:**

| Name    | Type                                  | Description                                 |
| ------- | ------------------------------------- | ------------------------------------------- |
| `value` | BigNumber &#124; string &#124; number | The uint value of tokens to deposit in wei. |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

The decoded transaction receipt, after the TX has been included in a block.

---

### getContract

▸ **getContract**(): _Promise‹TreasuryContract›_

_Defined in [Treasury.ts:64](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/Treasury.ts#L64)_

Asynchronously initializes the contract instance, or returns it from cache.

**Returns:** _Promise‹TreasuryContract›_

The lower-level contract wrapper instance.

---

### pay

▸ **pay**(`value`: BigNumber | string | number): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [Treasury.ts:215](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/Treasury.ts#L215)_

Sends ether to the contract to bond and deposit tokens.

**Parameters:**

| Name    | Type                                  | Description              |
| ------- | ------------------------------------- | ------------------------ |
| `value` | BigNumber &#124; string &#124; number | Amount of wei to deposit |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

Logs from the transaction block.

---

### systemBalance

▸ **systemBalance**(`address`: string): _Promise‹BigNumber›_

_Defined in [Treasury.ts:145](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/Treasury.ts#L145)_

Read the total system balance of KOSU for a provided `address` string.

**`example`**

```typescript
// view system balance of address

const address = "0x91c987bf62D25945dB517BDAa840A6c661374402";
const balanceWei = await treasury.systemBalance(address);

// convert to ether from wei
const balance = web3 - utils.fromWei(balanceWei);
```

**Parameters:**

| Name      | Type   | Description                                       |
| --------- | ------ | ------------------------------------------------- |
| `address` | string | The Ethereum address to check system balance for. |

**Returns:** _Promise‹BigNumber›_

The user's total KOSU system balance, in wei.

---

### treasuryAllowance

▸ **treasuryAllowance**(): _Promise‹BigNumber›_

_Defined in [Treasury.ts:185](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/Treasury.ts#L185)_

View the current treasury allowance for the detected `coinbase` account.

**`example`**

```typescript
// view current allowance for the treasury

const allowanceWei = await treasury.treasuryAllowance();

// convert to ether from wei
const allowance = web3 - utils.fromWei(allowanceWei);
```

**Returns:** _Promise‹BigNumber›_

The current KOSU approval for the Treasury for the current user, in wei.

---

### withdraw

▸ **withdraw**(`value`: BigNumber | string | number): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [Treasury.ts:124](https://github.com/ParadigmFoundation/kosu-monorepo/blob/bc352f90/packages/kosu-wrapper-enhancements/src/Treasury.ts#L124)_

Withdraw tokens from treasury to the detected `coinbase` account.

**`example`**

```typescript
// withdraw 10 KOSU

const value = new BigNumber(web3 - utils.toWei("10"));
const receipt = await treasury.withdraw(value);
```

**Parameters:**

| Name    | Type                                  | Description                                  |
| ------- | ------------------------------------- | -------------------------------------------- |
| `value` | BigNumber &#124; string &#124; number | The uint value of tokens to withdraw in wei. |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

The decoded transaction receipt, after the TX is mined in a block.
