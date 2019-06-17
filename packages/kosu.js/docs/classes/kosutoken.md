> ## [kosu.js](../README.md)

[Globals](../globals.md) / [KosuToken](kosutoken.md) /

# Class: KosuToken

Integration with KosuToken contract on an Ethereum blockchain.

## Hierarchy

-   **KosuToken**

### Index

#### Constructors

-   [constructor](kosutoken.md#constructor)

#### Properties

-   [address](kosutoken.md#private-address)
-   [contract](kosutoken.md#private-contract)
-   [web3](kosutoken.md#private-web3)
-   [web3Wrapper](kosutoken.md#private-web3wrapper)

#### Methods

-   [allowance](kosutoken.md#allowance)
-   [approve](kosutoken.md#approve)
-   [balanceOf](kosutoken.md#balanceof)
-   [getContract](kosutoken.md#private-getcontract)
-   [totalSupply](kosutoken.md#totalsupply)
-   [transfer](kosutoken.md#transfer)
-   [transferFrom](kosutoken.md#transferfrom)

## Constructors

### constructor

\+ **new KosuToken**(`options`: `KosuOptions`): _[KosuToken](kosutoken.md)_

_Defined in [packages/kosu.js/src/KosuToken.ts:15](url)_

Creates a new KosuToken instance

**Parameters:**

| Name      | Type          | Description            |
| --------- | ------------- | ---------------------- |
| `options` | `KosuOptions` | initialization options |

**Returns:** _[KosuToken](kosutoken.md)_

---

## Properties

### `Private` address

● **address**: _string_

_Defined in [packages/kosu.js/src/KosuToken.ts:15](url)_

---

### `Private` contract

● **contract**: _[KosuTokenContract](kosutokencontract.md)_

_Defined in [packages/kosu.js/src/KosuToken.ts:13](url)_

---

### `Private` web3

● **web3**: _`Web3`_

_Defined in [packages/kosu.js/src/KosuToken.ts:12](url)_

---

### `Private` web3Wrapper

● **web3Wrapper**: _`Web3Wrapper`_

_Defined in [packages/kosu.js/src/KosuToken.ts:14](url)_

---

## Methods

### allowance

▸ **allowance**(`owner`: string, `spender`: string): _`Promise<BigNumber>`_

_Defined in [packages/kosu.js/src/KosuToken.ts:113](url)_

Reads approved allowance for user pair

**Parameters:**

| Name      | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| `owner`   | string | Address of source tokens     |
| `spender` | string | Address of spender of tokens |

**Returns:** _`Promise<BigNumber>`_

---

### approve

▸ **approve**(`spender`: string, `value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [packages/kosu.js/src/KosuToken.ts:102](url)_

Sets approval for user to transfer tokens on coinbase's behalf

**Parameters:**

| Name      | Type        | Description                                |
| --------- | ----------- | ------------------------------------------ |
| `spender` | string      | Address allowed to spend coinbase's tokens |
| `value`   | `BigNumber` | uint value of tokens to transfer           |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### balanceOf

▸ **balanceOf**(`owner`: string): _`Promise<BigNumber>`_

_Defined in [packages/kosu.js/src/KosuToken.ts:68](url)_

Reads the balance for a user address

**Parameters:**

| Name    | Type   | Description             |
| ------- | ------ | ----------------------- |
| `owner` | string | Address of token holder |

**Returns:** _`Promise<BigNumber>`_

---

### `Private` getContract

▸ **getContract**(): _`Promise<KosuTokenContract>`_

_Defined in [packages/kosu.js/src/KosuToken.ts:33](url)_

Asynchronously initializes the contract instance or returns it from cache

**Returns:** _`Promise<KosuTokenContract>`_

The contract

---

### totalSupply

▸ **totalSupply**(): _`Promise<BigNumber>`_

_Defined in [packages/kosu.js/src/KosuToken.ts:58](url)_

Reads the total supply

**Returns:** _`Promise<BigNumber>`_

---

### transfer

▸ **transfer**(`to`: string, `value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [packages/kosu.js/src/KosuToken.ts:79](url)_

Transfers tokens to a user

**Parameters:**

| Name    | Type        | Description                      |
| ------- | ----------- | -------------------------------- |
| `to`    | string      | Address of token receiver        |
| `value` | `BigNumber` | uint value of tokens to transfer |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---

### transferFrom

▸ **transferFrom**(`from`: string, `to`: string, `value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [packages/kosu.js/src/KosuToken.ts:91](url)_

Transfers token from an address to a destination address

**Parameters:**

| Name    | Type        | Description                      |
| ------- | ----------- | -------------------------------- |
| `from`  | string      | Address of token source          |
| `to`    | string      | Address of token destination     |
| `value` | `BigNumber` | uint value of tokens to transfer |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

---
