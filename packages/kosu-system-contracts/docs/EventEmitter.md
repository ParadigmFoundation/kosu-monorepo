# EventEmitter




## Contents


 - [Methods](undefined)
    
     - [constructor](#constructo)
     - [emitEvent](#emitEventstringbytes32string)
    

## Methods

### constructor


Event emitter instantiated with Authorizable.

Parameter | Type | Description
--- | --- | ---
auth | ? | AuthorizedAddresses deployed address.

### emitEvent(string,bytes32[],string)


Emit generic events which can have decoding exposed though javascript library.

Parameter | Type | Description
--- | --- | ---
data | string | Bytes32 encoded data to be emitted from a centralized location.
eventType | bytes32[] | String name/type of event
