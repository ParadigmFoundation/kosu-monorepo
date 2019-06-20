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


 - **Signature:**
 - 
    ```solidity
    
    function amountRemaining(data address, subContract bytes)
    
    ```
    
    
 - **Description:**
 - 
    Calls amountRemaining on provided subContract.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        data | address | Encoded maker values for Order encoded based on the makerArguments.
        subContract | bytes | Address of contract implementing the SubContract interface.
        
    
 - 
    **Returns:** Quantity of available asset for Order encoded in makerData.
    

### arguments


 - **Signature:**
 - 
    ```solidity
    
    function arguments(subContract address)
    
    ```
    
    
 - **Description:**
 - 
    Calls arguments on provided subContract.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        subContract | address | Address of contract implementing the SubContract interface.
        
    
 - 
    **Returns:** String encoded JSON representation of subContract maker arguments
    

### constructor


 - **Signature:**
 - 
    ```solidity
    
    constructor()
    
    ```
    
    
 - **Description:**
 - 
    Creates a new OrderGateway
    

### isValid


 - **Signature:**
 - 
    ```solidity
    
    function isValid(data address, subContract bytes)
    
    ```
    
    
 - **Description:**
 - 
    Calls isValid on provided subContract.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        data | address | Encoded maker values for Order encoded based on the makerArguments.
        subContract | bytes | Address of contract implementing the SubContract interface.
        
    
 - 
    **Returns:** Boolean representing the validity of makerData
    

### participate


 - **Signature:**
 - 
    ```solidity
    
    function participate(data address, subContract bytes)
    
    ```
    
    
 - **Description:**
 - 
    Calls participate on the provided subContract.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        data | address | Encoded maker values for Order encoded based on the arguments.
        subContract | bytes | Address of contract implementing the SubContract interface.
        
    
 - 
    **Returns:** Boolean representing success of transaction.
    
