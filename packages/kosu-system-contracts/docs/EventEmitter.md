# EventEmitter


A shared contract for all Kosu system contracts to trigger event logs through.

## Contents


 - [Methods](undefined)
    
     - [constructor](#constructor)
     - [emitEvent](#emitEvent)
    

## Methods

### constructor


 - **Signature:**
 - 
    ```solidity
    
    constructor(auth)
    
    ```
    
    
 - **Description:**
 - 
    Event emitter instantiated with Authorizable.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        auth | ? | AuthorizedAddresses deployed address.
        
    

### emitEvent


 - **Signature:**
 - 
    ```solidity
    
    function emitEvent(data string, eventType bytes32[])
    
    ```
    
    
 - **Description:**
 - 
    Emit generic events which can have decoding exposed though javascript library.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        data | string | Bytes32 encoded data to be emitted from a centralized location.
        eventType | bytes32[] | String name/type of event
        
    
