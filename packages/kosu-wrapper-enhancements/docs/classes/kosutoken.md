[Wrapper Enhancements](../README.md) › [Globals](../globals.md) › [KosuToken](kosutoken.md)

# Class: KosuToken

The `KosuToken` class is a wrapper for the Kosu ERC-20 token contract, and
provides all necessary methods for interacting with the contract on any
Ethereum network for which the contract has been deployed.

If instantiated outside the `Kosu` class, an instance of `web3` and of the
`web3Wrapper` must be supplied in the options object.

## Hierarchy

-   **KosuToken**

## Index

### Constructors

-   [constructor](kosutoken.md#constructor)

### Properties

-   [address](kosutoken.md#address)
-   [coinbase](kosutoken.md#coinbase)
-   [contract](kosutoken.md#contract)
-   [web3Wrapper](kosutoken.md#web3wrapper)

### Methods

-   [allowance](kosutoken.md#allowance)
-   [approve](kosutoken.md#approve)
-   [balanceOf](kosutoken.md#balanceof)
-   [bondTokens](kosutoken.md#bondtokens)
-   [estimateEtherToToken](kosutoken.md#estimateethertotoken)
-   [estimateTokenToEther](kosutoken.md#estimatetokentoether)
-   [getContract](kosutoken.md#getcontract)
-   [pay](kosutoken.md#pay)
-   [releaseTokens](kosutoken.md#releasetokens)
-   [totalSupply](kosutoken.md#totalsupply)
-   [transfer](kosutoken.md#transfer)
-   [transferFrom](kosutoken.md#transferfrom)

## Constructors

### constructor

\+ **new KosuToken**(`options`: KosuOptions): _[KosuToken](kosutoken.md)_

_Defined in [KosuToken.ts:38](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L38)_

Creates a new KosuToken instance, supplied with an options object.

The KosuToken address _may_ be passed in as `options.kosuTokenAddress`, but
can also be loaded during each method call from the known deployed addresses.

**`example`**

```typescript
const options = { web3: new Web3(window.ethereum), web3Wrapper };
const kosuToken = new KosuToken(options);
```

**Parameters:**

| Name      | Type        | Description                                                    |
| --------- | ----------- | -------------------------------------------------------------- |
| `options` | KosuOptions | initialization options object (incl. `web3` and `web3wrapper`) |

**Returns:** _[KosuToken](kosutoken.md)_

## Properties

### address

• **address**: _string_

_Defined in [KosuToken.ts:33](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L33)_

The current KosuToken deployed address, loaded based on the detected
`networkId` from a mapping of known deployed addresses.

---

### coinbase

• **coinbase**: _string_

_Defined in [KosuToken.ts:38](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L38)_

The user's coinbase address (if available via supplied provider).

---

### contract

• **contract**: _KosuTokenContract_

_Defined in [KosuToken.ts:27](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L27)_

An instance of the lower-level contract wrapper for the Kosu token, auto-
generated from the Solidity source code.

---

### web3Wrapper

• **web3Wrapper**: _Web3Wrapper_

_Defined in [KosuToken.ts:21](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L21)_

An instance of a 0x `Web3Wrapper` used for some RPC calls and for certain
methods.

## Methods

### allowance

▸ **allowance**(`owner`: string, `spender`: string): _Promise‹BigNumber›_

_Defined in [KosuToken.ts:157](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L157)_

Reads approved allowance for a given `owner` and `spender` account.

**Parameters:**

| Name      | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| `owner`   | string | Address of source tokens     |
| `spender` | string | Address of spender of tokens |

**Returns:** _Promise‹BigNumber›_

The allowance granted to the `spender` in units of wei.

---

### approve

▸ **approve**(`spender`: string, `value`: BigNumber | string | number): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [KosuToken.ts:142](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L142)_

Sets approval for user to transfer tokens on `coinbase`'s behalf.

**Parameters:**

| Name      | Type                                  | Description                                       |
| --------- | ------------------------------------- | ------------------------------------------------- |
| `spender` | string                                | Address allowed to spend `coinbase`'s tokens.     |
| `value`   | BigNumber &#124; string &#124; number | The uint value (in wei) to approve `spender` for. |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

The transaction receipt after it has been included in a block.

---

### balanceOf

▸ **balanceOf**(`owner`: string): _Promise‹BigNumber›_

_Defined in [KosuToken.ts:101](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L101)_

Reads the balance for a user address, returned in wei.

**Parameters:**

| Name    | Type   | Description                             |
| ------- | ------ | --------------------------------------- |
| `owner` | string | The Ethereum address of a token holder. |

**Returns:** _Promise‹BigNumber›_

The `owner`'s KOSU balance in wei.

---

### bondTokens

▸ **bondTokens**(`value`: BigNumber, `minPayout`: BigNumber | string | number): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [KosuToken.ts:191](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L191)_

Sends ether to the contract to bond tokens.

**Parameters:**

| Name        | Type                                  | Description                                                                           |
| ----------- | ------------------------------------- | ------------------------------------------------------------------------------------- |
| `value`     | BigNumber                             | Amount of wei to deposit                                                              |
| `minPayout` | BigNumber &#124; string &#124; number | Minimum amount of tokens required to be minted to prevent transaction from reverting. |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

Logs from the transaction block.

---

### estimateEtherToToken

▸ **estimateEtherToToken**(`etherInput`: BigNumber | string | number): _Promise‹BigNumber›_

_Defined in [KosuToken.ts:168](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L168)_

Calculated tokens to be minted from deposited ether.

**Parameters:**

| Name         | Type                                  | Description                                         |
| ------------ | ------------------------------------- | --------------------------------------------------- |
| `etherInput` | BigNumber &#124; string &#124; number | Amount of ether to be submitted to generate tokens. |

**Returns:** _Promise‹BigNumber›_

Estimation of tokens to be minted.

---

### estimateTokenToEther

▸ **estimateTokenToEther**(`tokensToBurn`: BigNumber | string | number): _Promise‹BigNumber›_

_Defined in [KosuToken.ts:179](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L179)_

Calculates ether to be returned for burning tokens.

**Parameters:**

| Name           | Type                                  | Description                                  |
| -------------- | ------------------------------------- | -------------------------------------------- |
| `tokensToBurn` | BigNumber &#124; string &#124; number | Amount of tokens to burn for returned ether. |

**Returns:** _Promise‹BigNumber›_

Estimation of ether to be returned.

---

### getContract

▸ **getContract**(): _Promise‹KosuTokenContract›_

_Defined in [KosuToken.ts:63](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L63)_

Asynchronously initializes the contract instance or returns it from cache.

**Returns:** _Promise‹KosuTokenContract›_

The low-level KosuToken contract wrapper instance.

---

### pay

▸ **pay**(`value`: BigNumber | string | number): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [KosuToken.ts:218](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L218)_

Sends ether to the contract to bond tokens.

**Parameters:**

| Name    | Type                                  | Description              |
| ------- | ------------------------------------- | ------------------------ |
| `value` | BigNumber &#124; string &#124; number | Amount of wei to deposit |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

Logs from the transaction block.

---

### releaseTokens

▸ **releaseTokens**(`tokensToBurn`: BigNumber | string | number): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [KosuToken.ts:207](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L207)_

Releases tokens to be burned and return bonded ether.

**Parameters:**

| Name           | Type                                  | Description                                  |
| -------------- | ------------------------------------- | -------------------------------------------- |
| `tokensToBurn` | BigNumber &#124; string &#124; number | Amount of tokens to burn for returned ether. |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

Logs from the transaction block.

---

### totalSupply

▸ **totalSupply**(): _Promise‹BigNumber›_

_Defined in [KosuToken.ts:90](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L90)_

Reads the total supply of KOSU, resolves to a `BigNumber` of the amount of
tokens in units of wei.

**Returns:** _Promise‹BigNumber›_

The total KOSU supply in wei.

---

### transfer

▸ **transfer**(`to`: string, `value`: BigNumber | string | number): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [KosuToken.ts:113](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L113)_

Transfers tokens to an address, from the current `coinbase` account.

**Parameters:**

| Name    | Type                                  | Description                                      |
| ------- | ------------------------------------- | ------------------------------------------------ |
| `to`    | string                                | Ethereum Address of token receiver.              |
| `value` | BigNumber &#124; string &#124; number | The `uint` value of tokens to transfer (in wei). |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

The transaction's receipt after inclusion in a block.

---

### transferFrom

▸ **transferFrom**(`from`: string, `to`: string, `value`: BigNumber | string | number): _Promise‹TransactionReceiptWithDecodedLogs›_

_Defined in [KosuToken.ts:126](https://github.com/ParadigmFoundation/kosu-monorepo/blob/55c0be50/packages/kosu-wrapper-enhancements/src/KosuToken.ts#L126)_

Transfers token from an address to a destination address.

**Parameters:**

| Name    | Type                                  | Description                                      |
| ------- | ------------------------------------- | ------------------------------------------------ |
| `from`  | string                                | Address of token source.                         |
| `to`    | string                                | Address of token destination.                    |
| `value` | BigNumber &#124; string &#124; number | The `uint` value of tokens to transfer (in wei). |

**Returns:** _Promise‹TransactionReceiptWithDecodedLogs›_

The transaction receipt after it has been included in a block.
