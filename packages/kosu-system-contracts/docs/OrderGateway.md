# OrderGateway




## Contents


 - [Methods](undefined)
    
     - [amountRemaining](#amountRemainingaddressbytes)
     - [arguments](#argumentsaddress)
     - [constructor](#constructo)
     - [isValid](#isValidaddressbytes)
     - [participate](#participateaddressbytes)
    

## Methods

### amountRemaining(address,bytes)


Calls amountRemaining on provided subContract.

Parameter | Type | Description
--- | --- | ---
data | address | Encoded maker values for Order encoded based on the makerArguments.
subContract | bytes | Address of contract implementing the SubContract interface.

### arguments(address)


Calls arguments on provided subContract.

Parameter | Type | Description
--- | --- | ---
subContract | address | Address of contract implementing the SubContract interface.

### constructor


Creates a new OrderGateway

### isValid(address,bytes)


Calls isValid on provided subContract.

Parameter | Type | Description
--- | --- | ---
data | address | Encoded maker values for Order encoded based on the makerArguments.
subContract | bytes | Address of contract implementing the SubContract interface.

### participate(address,bytes)


Calls participate on the provided subContract.

Parameter | Type | Description
--- | --- | ---
data | address | Encoded maker values for Order encoded based on the arguments.
subContract | bytes | Address of contract implementing the SubContract interface.
