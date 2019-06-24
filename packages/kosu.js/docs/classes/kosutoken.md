> ## [kosu.js](../README.md)

[Globals](../globals.md) / [KosuToken](kosutoken.md) /

# Class: KosuToken

The `KosuToken` class is a wrapper for the Kosu ERC-20 token contract, and
provides all necessary methods for interacting with the contract on any
Ethereum network for which the contract has been deployed.

If instantiated outside the `Kosu` class, an instance of `web3` and of the
`web3Wrapper` must be supplied in the options object.

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

\+ **new KosuToken**(`options`: [KosuOptions](../interfaces/kosuoptions.md)): _[KosuToken](kosutoken.md)_

_Defined in [KosuToken.ts:37](url)_

Creates a new KosuToken instance, supplied with an options object.

The KosuToken address _may_ be passed in as `options.kosuTokenAddress`, but
can also be loaded during each method call from the known deployed addresses.

**`example`**

```typescript
const options = { web3: new Web3(window.ethereum), web3Wrapper };
const kosuToken = new KosuToken(options);
```

**Parameters:**

| Name      | Type                                        | Description                                                    |
| --------- | ------------------------------------------- | -------------------------------------------------------------- |
| `options` | [KosuOptions](../interfaces/kosuoptions.md) | initialization options object (incl. `web3` and `web3wrapper`) |

**Returns:** _[KosuToken](kosutoken.md)_

---

## Properties

### `Private` address

● **address**: _string_

_Defined in [KosuToken.ts:37](url)_

The current KosuToken deployed address, loaded based on the detected
`networkId` from a mapping of known deployed addresses.

---

### `Private` contract

● **contract**: _`KosuTokenContract`_

_Defined in [KosuToken.ts:31](url)_

An instance of the lower-level contract wrapper for the Kosu token, auto-
generated from the Solidity source code.

---

### `Private` web3

● **web3**: _`Web3`_

_Defined in [KosuToken.ts:19](url)_

An instance of `web3` used to interact with the Ethereum blockchain.

---

### `Private` web3Wrapper

● **web3Wrapper**: _`Web3Wrapper`_

_Defined in [KosuToken.ts:25](url)_

An instance of a 0x `Web3Wrapper` used for some RPC calls and for certain
methods.

---

## Methods

### allowance

▸ **allowance**(`owner`: string, `spender`: string): _`Promise<BigNumber>`_

_Defined in [KosuToken.ts:156](url)_

Reads approved allowance for a given `owner` and `spender` account.

**Parameters:**

| Name      | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| `owner`   | string | Address of source tokens     |
| `spender` | string | Address of spender of tokens |

**Returns:** _`Promise<BigNumber>`_

The allowance granted to the `spender` in units of wei.

---

### approve

▸ **approve**(`spender`: string, `value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [KosuToken.ts:144](url)_

Sets approval for user to transfer tokens on `coinbase`'s behalf.

**Parameters:**

| Name      | Type        | Description                                       |
| --------- | ----------- | ------------------------------------------------- |
| `spender` | string      | Address allowed to spend `coinbase`'s tokens.     |
| `value`   | `BigNumber` | The uint value (in wei) to approve `spender` for. |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

The transaction receipt after it has been included in a block.

---

### balanceOf

▸ **balanceOf**(`owner`: string): _`Promise<BigNumber>`_

_Defined in [KosuToken.ts:107](url)_

Reads the balance for a user address, returned in wei.

**Parameters:**

| Name    | Type   | Description                             |
| ------- | ------ | --------------------------------------- |
| `owner` | string | The Ethereum address of a token holder. |

**Returns:** _`Promise<BigNumber>`_

The `owner`'s KOSU balance in wei.

---

### `Private` getContract

▸ **getContract**(): _`Promise<KosuTokenContract>`_

_Defined in [KosuToken.ts:63](url)_

Asynchronously initializes the contract instance or returns it from cache.

**Returns:** _`Promise<KosuTokenContract>`_

The low-level KosuToken contract wrapper instance.

---

### totalSupply

▸ **totalSupply**(): _`Promise<BigNumber>`_

_Defined in [KosuToken.ts:96](url)_

Reads the total supply of KOSU, resolves to a `BigNumber` of the amount of
tokens in units of wei.

**Returns:** _`Promise<BigNumber>`_

The total KOSU supply in wei.

---

### transfer

▸ **transfer**(`to`: string, `value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [KosuToken.ts:119](url)_

Transfers tokens to an address, from the current `coinbase` account.

**Parameters:**

| Name    | Type        | Description                                      |
| ------- | ----------- | ------------------------------------------------ |
| `to`    | string      | Ethereum Address of token receiver.              |
| `value` | `BigNumber` | The `uint` value of tokens to transfer (in wei). |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

The transaction's receipt after inclusion in a block.

---

### transferFrom

▸ **transferFrom**(`from`: string, `to`: string, `value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [KosuToken.ts:132](url)_

Transfers token from an address to a destination address.

**Parameters:**

| Name    | Type        | Description                                      |
| ------- | ----------- | ------------------------------------------------ |
| `from`  | string      | Address of token source.                         |
| `to`    | string      | Address of token destination.                    |
| `value` | `BigNumber` | The `uint` value of tokens to transfer (in wei). |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

The transaction receipt after it has been included in a block.

---
