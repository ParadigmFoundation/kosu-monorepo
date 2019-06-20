# EventEmitter


A shared contract for all Kosu system contracts to trigger event logs through.

## Contents


 - [Methods](undefined)
    
     - [constructor](#constructor)
     - [emitEvent](#emitEvent)
    

## Methods

### constructor

<<<<<<< HEAD

Event emitter instantiated with Authorizable.

#### Signature

```solidity
constructor(auth)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
auth | ? | AuthorizedAddresses deployed address.

### emitEvent


Emit generic events which can have decoding exposed though javascript library.

#### Signature

```solidity
function emitEvent(data string, eventType bytes32[])
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
data | string | Bytes32 encoded data to be emitted from a centralized location.
eventType | bytes32[] | String name/type of event
=======

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
        
    
>>>>>>> eaf23b3d8732d3b3bcc500c6c71aad6ec3200335
