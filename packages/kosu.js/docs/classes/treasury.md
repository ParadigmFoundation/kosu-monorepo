> ## [kosu.js](../README.md)

[Globals](../globals.md) / [Treasury](treasury.md) /

# Class: Treasury

Integration with Treasury contract on an Ethereum blockchain.

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

\+ **new Treasury**(`options`: `KosuOptions`, `kosuToken`: [KosuToken](kosutoken.md)): _[Treasury](treasury.md)_

_Defined in [src/Treasury.ts:19](url)_

Creates a new Treasury instance

**Parameters:**

| Name        | Type                      | Description            |
| ----------- | ------------------------- | ---------------------- |
| `options`   | `KosuOptions`             | initialization options |
| `kosuToken` | [KosuToken](kosutoken.md) | KosuToken instance     |

**Returns:** _[Treasury](treasury.md)_

---

## Properties

### `Private` address

● **address**: _string_

_Defined in [src/Treasury.ts:16](url)_

---

### `Private` coinbase

● **coinbase**: _string_

_Defined in [src/Treasury.ts:19](url)_

---

### `Private` contract

● **contract**: _[TreasuryContract](treasurycontract.md)_

_Defined in [src/Treasury.ts:17](url)_

---

### kosuToken

● **kosuToken**: _[KosuToken](kosutoken.md)_

_Defined in [src/Treasury.ts:13](url)_

---

### `Private` web3

● **web3**: _`Web3`_

_Defined in [src/Treasury.ts:15](url)_

---

### `Private` web3Wrapper

● **web3Wrapper**: _`Web3Wrapper`_

_Defined in [src/Treasury.ts:18](url)_

---

## Methods

### approveTreasury

▸ **approveTreasury**(`value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [src/Treasury.ts:119](url)_

**Parameters:**

| Name    | Type        |
| ------- | ----------- |
| `value` | `BigNumber` |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### currentBalance

▸ **currentBalance**(`address`: string): _`Promise<BigNumber>`_

_Defined in [src/Treasury.ts:109](url)_

Read addresses system balance

**Parameters:**

| Name      | Type   | Description      |
| --------- | ------ | ---------------- |
| `address` | string | Ethereum address |

**Returns:** _`Promise<BigNumber>`_

---

### deposit

▸ **deposit**(`value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [src/Treasury.ts:66](url)_

Deposit tokens in the treasury

**Parameters:**

| Name    | Type        | Description                     |
| ------- | ----------- | ------------------------------- |
| `value` | `BigNumber` | uint value of tokens to deposit |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### `Private` getContract

▸ **getContract**(): _`Promise<TreasuryContract>`_

_Defined in [src/Treasury.ts:39](url)_

Asynchronously initializes the contract instance or returns it from cache

**Returns:** _`Promise<TreasuryContract>`_

The contract

---

### systemBalance

▸ **systemBalance**(`address`: string): _`Promise<BigNumber>`_

_Defined in [src/Treasury.ts:99](url)_

Read addresses system balance

**Parameters:**

| Name      | Type   | Description      |
| --------- | ------ | ---------------- |
| `address` | string | Ethereum address |

**Returns:** _`Promise<BigNumber>`_

---

### treasuryAllowance

▸ **treasuryAllowance**(): _`Promise<BigNumber>`_

_Defined in [src/Treasury.ts:114](url)_

**Returns:** _`Promise<BigNumber>`_

---

### withdraw

▸ **withdraw**(`value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [src/Treasury.ts:89](url)_

Withdraw tokens from treasury

**Parameters:**

| Name    | Type        | Description                      |
| ------- | ----------- | -------------------------------- |
| `value` | `BigNumber` | uint value of tokens to withdraw |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---
