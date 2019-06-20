# OrderGateway


Access SubContract implementation's methods to participate in trades and check order status.

## Contents


 - [Methods](undefined)
    
     - [amountRemaining](#amountRemaining)
     - [arguments](#arguments)
     - [constructor](#constructor)
     - [isValid](#isValid)
     - [participate](#participate)
    

## Methods

### amountRemaining

```solidity
function amountRemaining(data address, subContract bytes)
```


Calls amountRemaining on provided subContract.

Parameter | Type | Description
--- | --- | ---
data | address | Encoded maker values for Order encoded based on the makerArguments.
subContract | bytes | Address of contract implementing the SubContract interface.


**Returns:** Quantity of available asset for Order encoded in makerData.

### arguments

```solidity
function arguments(subContract address)
```


Calls arguments on provided subContract.

Parameter | Type | Description
--- | --- | ---
subContract | address | Address of contract implementing the SubContract interface.


**Returns:** String encoded JSON representation of subContract maker arguments

### constructor

```solidity
constructor()
```


Creates a new OrderGateway

### isValid

```solidity
function isValid(data address, subContract bytes)
```


Calls isValid on provided subContract.

Parameter | Type | Description
--- | --- | ---
data | address | Encoded maker values for Order encoded based on the makerArguments.
subContract | bytes | Address of contract implementing the SubContract interface.


**Returns:** Boolean representing the validity of makerData

### participate

```solidity
function participate(data address, subContract bytes)
```


Calls participate on the provided subContract.

Parameter | Type | Description
--- | --- | ---
data | address | Encoded maker values for Order encoded based on the arguments.
subContract | bytes | Address of contract implementing the SubContract interface.


**Returns:** Boolean representing success of transaction.
