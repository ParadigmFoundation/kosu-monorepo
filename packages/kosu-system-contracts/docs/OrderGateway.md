# OrderGateway

Access SubContract implementation's methods to participate in trades and check order status.

## Contents

-   [Methods](undefined)
    -   [amountRemaining](#amountremaining)
    -   [arguments](#arguments)
    -   [constructor](#constructor)
    -   [isValid](#isvalid)
    -   [participate](#participate)

## Methods

### amountRemaining

Calls amountRemaining on provided subContract.

#### Signature

```solidity
function amountRemaining(subContract address, data bytes) public view (uint256)
```

#### Parameters:

| Parameter     | Type      | Description                                                         |
| ------------- | --------- | ------------------------------------------------------------------- |
| `subContract` | `address` | Address of contract implementing the SubContract interface.         |
| `data`        | `bytes`   | Encoded maker values for Order encoded based on the makerArguments. |

#### Returns:

Quantity of available asset for Order encoded in makerData.

### arguments

Calls arguments on provided subContract.

#### Signature

```solidity
function arguments(subContract address) public view (string)
```

#### Parameters:

| Parameter     | Type      | Description                                                 |
| ------------- | --------- | ----------------------------------------------------------- |
| `subContract` | `address` | Address of contract implementing the SubContract interface. |

#### Returns:

String encoded JSON representation of subContract maker arguments.

### constructor

Creates a new OrderGateway

#### Signature

```solidity
constructor() public
```

### isValid

Calls isValid on provided subContract.

#### Signature

```solidity
function isValid(subContract address, data bytes) public view (bool)
```

#### Parameters:

| Parameter     | Type      | Description                                                         |
| ------------- | --------- | ------------------------------------------------------------------- |
| `subContract` | `address` | Address of contract implementing the SubContract interface.         |
| `data`        | `bytes`   | Encoded maker values for Order encoded based on the makerArguments. |

#### Returns:

Boolean representing the validity of makerData.

### participate

Calls participate on the provided subContract.

#### Signature

```solidity
function participate(subContract address, data bytes) public (bool)
```

#### Parameters:

| Parameter     | Type      | Description                                                    |
| ------------- | --------- | -------------------------------------------------------------- |
| `subContract` | `address` | Address of contract implementing the SubContract interface.    |
| `data`        | `bytes`   | Encoded maker values for Order encoded based on the arguments. |

#### Returns:

Boolean representing success of transaction.
