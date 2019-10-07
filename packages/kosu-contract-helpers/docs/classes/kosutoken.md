> **[kosu.js](../README.md)**

[Globals](../globals.md) / [KosuToken](kosutoken.md) /

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

### Methods

-   [allowance](kosutoken.md#allowance)
-   [approve](kosutoken.md#approve)
-   [balanceOf](kosutoken.md#balanceof)
-   [bondTokens](kosutoken.md#bondtokens)
-   [estimateEtherToToken](kosutoken.md#estimateethertotoken)
-   [estimateTokenToEther](kosutoken.md#estimatetokentoether)
-   [pay](kosutoken.md#pay)
-   [releaseTokens](kosutoken.md#releasetokens)
-   [totalSupply](kosutoken.md#totalsupply)
-   [transfer](kosutoken.md#transfer)
-   [transferFrom](kosutoken.md#transferfrom)

## Constructors

### constructor

\+ **new KosuToken**(`options`: [KosuOptions](../interfaces/kosuoptions.md)): _[KosuToken](kosutoken.md)_

_Defined in [KosuToken.ts:37](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/KosuToken.ts#L37)_

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

## Methods

### allowance

▸ **allowance**(`owner`: string, `spender`: string): _`Promise<BigNumber>`_

_Defined in [KosuToken.ts:151](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/KosuToken.ts#L151)_

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

_Defined in [KosuToken.ts:139](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/KosuToken.ts#L139)_

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

_Defined in [KosuToken.ts:102](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/KosuToken.ts#L102)_

Reads the balance for a user address, returned in wei.

**Parameters:**

| Name    | Type   | Description                             |
| ------- | ------ | --------------------------------------- |
| `owner` | string | The Ethereum address of a token holder. |

**Returns:** _`Promise<BigNumber>`_

The `owner`'s KOSU balance in wei.

---

### bondTokens

▸ **bondTokens**(`value`: `BigNumber`, `minPayout`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [KosuToken.ts:185](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/KosuToken.ts#L185)_

Sends ether to the contract to bond tokens.

**Parameters:**

| Name        | Type        | Description                                                                           |
| ----------- | ----------- | ------------------------------------------------------------------------------------- |
| `value`     | `BigNumber` | Amount of wei to deposit                                                              |
| `minPayout` | `BigNumber` | Minimum amount of tokens required to be minted to prevent transaction from reverting. |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

Logs from the transaction block.

---

### estimateEtherToToken

▸ **estimateEtherToToken**(`etherInput`: `BigNumber`): _`Promise<BigNumber>`_

_Defined in [KosuToken.ts:162](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/KosuToken.ts#L162)_

Calculated tokens to be minted from deposited ether.

**Parameters:**

| Name         | Type        | Description                                         |
| ------------ | ----------- | --------------------------------------------------- |
| `etherInput` | `BigNumber` | Amount of ether to be submitted to generate tokens. |

**Returns:** _`Promise<BigNumber>`_

Estimation of tokens to be minted.

---

### estimateTokenToEther

▸ **estimateTokenToEther**(`tokensToBurn`: `BigNumber`): _`Promise<BigNumber>`_

_Defined in [KosuToken.ts:173](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/KosuToken.ts#L173)_

Calculates ether to be returned for burning tokens.

**Parameters:**

| Name           | Type        | Description                                  |
| -------------- | ----------- | -------------------------------------------- |
| `tokensToBurn` | `BigNumber` | Amount of tokens to burn for returned ether. |

**Returns:** _`Promise<BigNumber>`_

Estimation of ether to be returned.

---

### pay

▸ **pay**(`value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [KosuToken.ts:209](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/KosuToken.ts#L209)_

Sends ether to the contract to bond tokens.

**Parameters:**

| Name    | Type        | Description              |
| ------- | ----------- | ------------------------ |
| `value` | `BigNumber` | Amount of wei to deposit |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

Logs from the transaction block.

---

### releaseTokens

▸ **releaseTokens**(`tokensToBurn`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [KosuToken.ts:198](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/KosuToken.ts#L198)_

Releases tokens to be burned and return bonded ether.

**Parameters:**

| Name           | Type        | Description                                  |
| -------------- | ----------- | -------------------------------------------- |
| `tokensToBurn` | `BigNumber` | Amount of tokens to burn for returned ether. |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

Logs from the transaction block.

---

### totalSupply

▸ **totalSupply**(): _`Promise<BigNumber>`_

_Defined in [KosuToken.ts:91](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/KosuToken.ts#L91)_

Reads the total supply of KOSU, resolves to a `BigNumber` of the amount of
tokens in units of wei.

**Returns:** _`Promise<BigNumber>`_

The total KOSU supply in wei.

---

### transfer

▸ **transfer**(`to`: string, `value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [KosuToken.ts:114](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/KosuToken.ts#L114)_

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

_Defined in [KosuToken.ts:127](https://github.com/ParadigmFoundation/kosu-monorepo/blob/2f37cabf/packages/kosu.js/src/KosuToken.ts#L127)_

Transfers token from an address to a destination address.

**Parameters:**

| Name    | Type        | Description                                      |
| ------- | ----------- | ------------------------------------------------ |
| `from`  | string      | Address of token source.                         |
| `to`    | string      | Address of token destination.                    |
| `value` | `BigNumber` | The `uint` value of tokens to transfer (in wei). |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

The transaction receipt after it has been included in a block.