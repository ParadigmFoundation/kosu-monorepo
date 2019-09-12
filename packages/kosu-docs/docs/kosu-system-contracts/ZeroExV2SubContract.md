# ZeroExV2SubContract

Implementation of a SubContract that forwards kosu orders with 0x resolution to the 0x exchange contract.

## Contents

-   [Methods](undefined)
    -   [amountRemaining](#amountremaining)
    -   [constructor](#constructor)
    -   [isValid](#isvalid)
    -   [participate](#participate)

## Methods

### amountRemaining

De-serializes kosu order data to 0x order and checks remaining fillable tokens.

#### Signature

```solidity
function amountRemaining(data bytes) public view (uint256)
```

#### Parameters:

| Parameter | Type    | Description                                |
| --------- | ------- | ------------------------------------------ |
| `data`    | `bytes` | Kosu order data serialized with arguments. |

#### Returns:

Tokens remaining to fill.

### constructor

Initialize subContract with arguments json 0x Exchange address and the 0x erc20 proxy address.

#### Signature

```solidity
constructor(args string, exchangeAddress address, proxyAddress address) public
```

#### Parameters:

| Parameter         | Type      | Description                          |
| ----------------- | --------- | ------------------------------------ |
| `args`            | `string`  | The arguments json string.           |
| `exchangeAddress` | `address` | The 0x deployed exchange address.    |
| `proxyAddress`    | `address` | The 0x deployed erc20 proxy address. |

### isValid

De-serializes kosu order data to 0x order and checks validity.

#### Signature

```solidity
function isValid(data bytes) public view (bool)
```

#### Parameters:

| Parameter | Type    | Description                                |
| --------- | ------- | ------------------------------------------ |
| `data`    | `bytes` | Kosu order data serialized with arguments. |

#### Returns:

Validity of order.

### participate

De-serializes ksou order data to 0x order and submits to the 0x exchange for final resolution. Finalizes by forwarding along any successfully exchanged tokens.

#### Signature

```solidity
function participate(data bytes) public (bool)
```

#### Parameters:

| Parameter | Type    | Description                                |
| --------- | ------- | ------------------------------------------ |
| `data`    | `bytes` | Kosu order data serialized with arguments. |

#### Returns:

Fill success.
