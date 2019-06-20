# EventEmitter


A shared contract for all Kosu system contracts to trigger event logs through.

## Contents


 - [Methods](undefined)
    
     - [constructor](#constructor)
     - [emitEvent](#emitEvent)
    

## Methods

### constructor

```solidity
constructor(auth)
```


Event emitter instantiated with Authorizable.

Parameter | Type | Description
--- | --- | ---
auth | ? | AuthorizedAddresses deployed address.

### emitEvent

```solidity
function emitEvent(data string, eventType bytes32[])
```


Emit generic events which can have decoding exposed though javascript library.

Parameter | Type | Description
--- | --- | ---
data | string | Bytes32 encoded data to be emitted from a centralized location.
eventType | bytes32[] | String name/type of event
