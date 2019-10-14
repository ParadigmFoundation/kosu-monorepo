> **[kosu.js](../README.md)**

[Globals](../globals.md) / [PosterRegistry](posterregistry.md) /

# Class: PosterRegistry

Interact with the Kosu PosterRegistry contract on the Ethereum blockchain.

Instances of the `PosterRegistry` class allow users to interact with the
deployed contract to bond and un-bond tokens (for access to the Kosu network)
and to view their balance, as well as the cumulative lockup.

## Hierarchy

-   **PosterRegistry**

## Index

### Constructors

-   [constructor](posterregistry.md#constructor)

### Methods

-   [pay](posterregistry.md#pay)
-   [registerTokens](posterregistry.md#registertokens)
-   [releaseTokens](posterregistry.md#releasetokens)
-   [tokensContributed](posterregistry.md#tokenscontributed)
-   [tokensRegisteredFor](posterregistry.md#tokensregisteredfor)

## Constructors

### constructor

\+ **new PosterRegistry**(`options`: `KosuOptions`, `treasury`: [Treasury](treasury.md)): _[PosterRegistry](posterregistry.md)_

_Defined in [PosterRegistry.ts:43](https://github.com/ParadigmFoundation/kosu-monorepo/blob/a7ce3d5b/packages/kosu-contract-helpers/src/PosterRegistry.ts#L43)_

Create a new PosterRegistry instance.

**Parameters:**

| Name       | Type                    | Description                                |
| ---------- | ----------------------- | ------------------------------------------ |
| `options`  | `KosuOptions`           | Instantiation options (see `KosuOptions`). |
| `treasury` | [Treasury](treasury.md) | Treasury integration instance.             |

**Returns:** _[PosterRegistry](posterregistry.md)_

## Methods

### pay

▸ **pay**(`value`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [PosterRegistry.ts:151](https://github.com/ParadigmFoundation/kosu-monorepo/blob/a7ce3d5b/packages/kosu-contract-helpers/src/PosterRegistry.ts#L151)_

Sends ether to the contract to bond and register tokens for posting.

**Parameters:**

| Name    | Type        | Description              |
| ------- | ----------- | ------------------------ |
| `value` | `BigNumber` | Amount of wei to deposit |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

Logs from the transaction block.

---

### registerTokens

▸ **registerTokens**(`amount`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [PosterRegistry.ts:109](https://github.com/ParadigmFoundation/kosu-monorepo/blob/a7ce3d5b/packages/kosu-contract-helpers/src/PosterRegistry.ts#L109)_

Register tokens into the PosterRegistry contract by bonding KOSU tokens.

**Parameters:**

| Name     | Type        | Description                                    |
| -------- | ----------- | ---------------------------------------------- |
| `amount` | `BigNumber` | The uint value of tokens to register (in wei). |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

A transaction receipt from the mined `register` transaction.

---

### releaseTokens

▸ **releaseTokens**(`amount`: `BigNumber`): _`Promise<TransactionReceiptWithDecodedLogs>`_

_Defined in [PosterRegistry.ts:140](https://github.com/ParadigmFoundation/kosu-monorepo/blob/a7ce3d5b/packages/kosu-contract-helpers/src/PosterRegistry.ts#L140)_

Release tokens from the PosterRegistry for the `coinbase` address (un-bond).

**Parameters:**

| Name     | Type        | Description                                                     |
| -------- | ----------- | --------------------------------------------------------------- |
| `amount` | `BigNumber` | The uint value of tokens to release from the registry (in wei). |

**Returns:** _`Promise<TransactionReceiptWithDecodedLogs>`_

A transaction receipt from the mined `register` transaction.

---

### tokensContributed

▸ **tokensContributed**(): _`Promise<BigNumber>`_

_Defined in [PosterRegistry.ts:87](https://github.com/ParadigmFoundation/kosu-monorepo/blob/a7ce3d5b/packages/kosu-contract-helpers/src/PosterRegistry.ts#L87)_

Reads total KOSU tokens contributed to registry.

**Returns:** _`Promise<BigNumber>`_

The total pool of locked KOSU tokens in units of wei.

---

### tokensRegisteredFor

▸ **tokensRegisteredFor**(`address`: string): _`Promise<BigNumber>`_

_Defined in [PosterRegistry.ts:98](https://github.com/ParadigmFoundation/kosu-monorepo/blob/a7ce3d5b/packages/kosu-contract-helpers/src/PosterRegistry.ts#L98)_

Reads number of tokens registered for a given address.

**Parameters:**

| Name      | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| `address` | string | Address of user to query the bonded balance of. |

**Returns:** _`Promise<BigNumber>`_

The number of tokens bonded by the supplied user's address in wei.
