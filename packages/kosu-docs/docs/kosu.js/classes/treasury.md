> ## [kosu.js](../README.md)

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

### Index

#### Constructors

-   [constructor](treasury.md#constructor)

#### Properties

-   [address](treasury.md#private-address)
-   [coinbase](treasury.md#private-coinbase)
-   [contract](treasury.md#private-contract)
-   [kosuToken](treasury.md#kosutoken)
-   [web3](treasury.md#private-web3)
-   [web3Wrapper](treasury.md#private-web3wrapper)

#### Methods

-   [approveTreasury](treasury.md#approvetreasury)
-   [currentBalance](treasury.md#currentbalance)
-   [deposit](treasury.md#deposit)
-   [getContract](treasury.md#private-getcontract)
-   [systemBalance](treasury.md#systembalance)
-   [treasuryAllowance](treasury.md#treasuryallowance)
-   [withdraw](treasury.md#withdraw)

## Constructors

### constructor

\+ **new Treasury**(`options`: [KosuOptions](../interfaces/kosuoptions.md), `kosuToken`: [KosuToken](kosutoken.md)): _[Treasury](treasury.md)_

Defined in Treasury.ts:49

Creates a new Treasury instance.

**Parameters:**

| Name        | Type                                        | Description                                   |
| ----------- | ------------------------------------------- | --------------------------------------------- |
| `options`   | [KosuOptions](../interfaces/kosuoptions.md) | Initialization options (see `KosuOptions`).   |
| `kosuToken` | [KosuToken](kosutoken.md)                   | Configured/instantiated `KosuToken` instance. |

**Returns:** _[Treasury](treasury.md)_

---

## Properties

### `Private` address

● **address**: _string_

Defined in Treasury.ts:44

They deployed Treasury's address for the detected networkID.

---

### `Private` coinbase

● **coinbase**: _string_

Defined in Treasury.ts:49

The user's coinbase address (if available via supplied provider).

---

### `Private` contract

● **contract**: _`TreasuryContract`_

Defined in Treasury.ts:39

A lower-level, auto-generated contract wrapper for the Treasury contract,
generated from solidity source code.

---

### kosuToken

● **kosuToken**: _[KosuToken](kosutoken.md)_

Defined in Treasury.ts:33

An instance of the `KosuToken` class to communicate with the KOSU ERC-20 token.

---

### `Private` web3

● **web3**: _`Web3`_

Defined in Treasury.ts:23

An instance of `web3` used to interact with the Ethereum blockchain.

---

### `Private` web3Wrapper

● **web3Wrapper**: _`Web3Wrapper`_

Defined in Treasury.ts:28

The `web3Wrapper` instance with the contract's ABI loaded.

---

## Methods

### approveTreasury

▸ **approveTreasury**(`value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

Defined in Treasury.ts:215

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

Defined in Treasury.ts:177

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

Defined in Treasury.ts:104

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

### `Private` getContract

▸ **getContract**(): _`Promise<TreasuryContract>`_

Defined in Treasury.ts:69

Asynchronously initializes the contract instance, or returns it from cache.

**Returns:** _`Promise<TreasuryContract>`_

The lower-level contract wrapper instance.

---

### systemBalance

▸ **systemBalance**(`address`: string): _`Promise<BigNumber>`_

Defined in Treasury.ts:156

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

Defined in Treasury.ts:196

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

Defined in Treasury.ts:135

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

---
