# OrderGateway

Serves as a message router for SubContract implementations. Passing SubContract method calls through the gateway allows for a single watch point for incoming participate transactions.

## Contents

-   [Methods](undefined)
    -   [amountRemaining](#amountremaining)
    -   [arguments](#arguments)
    -   [isValid](#isvalid)
    -   [participate](#participate)

## Methods

### amountRemaining

Forwards function calls of amountRemaining to the provided subContract address.

#### Signature

```solidity
function amountRemaining(subContract address, data bytes) public view (uint256)
```

#### Parameters:

| Parameter     | Type      | Description                                                                                          |
| ------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| `subContract` | `address` | Address of contract implementing the SubContract interface.                                          |
| `data`        | `bytes`   | Encoded values for Order encoded in accordance to the arguments exposed by the provided subContract. |

#### Returns:

Quantity of available asset for Order encoded in data.

### arguments

Forwards function calls of arguments to the provided subContract address.

#### Signature

```solidity
function arguments(subContract address) public view (string)
```

#### Parameters:

| Parameter     | Type      | Description                                                 |
| ------------- | --------- | ----------------------------------------------------------- |
| `subContract` | `address` | Address of contract implementing the SubContract interface. |

#### Returns:

JSON string providing expected structure of subContract input data.

### isValid

Forwards function calls of isValid to the provided subContract address.

#### Signature

```solidity
function isValid(subContract address, data bytes) public view (bool)
```

#### Parameters:

| Parameter     | Type      | Description                                                                                          |
| ------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| `subContract` | `address` | Address of contract implementing the SubContract interface.                                          |
| `data`        | `bytes`   | Encoded values for Order encoded in accordance to the arguments exposed by the provided subContract. |

#### Returns:

Boolean representing the validity of data.

### participate

Forwards function calls of participate to the provided subContract address.

#### Signature

```solidity
function participate(subContract address, data bytes) public (bool)
```

#### Parameters:

| Parameter     | Type      | Description                                                                                          |
| ------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| `subContract` | `address` | Address of contract implementing the SubContract interface.                                          |
| `data`        | `bytes`   | Encoded values for Order encoded in accordance to the arguments exposed by the provided subContract. |

#### Returns:

Boolean representing result of transaction.
