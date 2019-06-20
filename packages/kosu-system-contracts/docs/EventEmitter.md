# EventEmitter


A shared contract for all Kosu system contracts to trigger event logs through.

## Contents


 - [Methods](undefined)
    
     - [constructor](#constructor)
     - [emitEvent](#emitEvent)
    

## Methods

### constructor


Event emitter instantiated with Authorizable.

#### Signature

```solidity
constructor(auth)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
`auth` | `undefined` | AuthorizedAddresses deployed address.

### emitEvent


Emit generic events which can have decoding exposed though javascript library.

#### Signature

```solidity
function emitEvent(data string, eventType bytes32[])
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
`data` | `string` | Bytes32 encoded data to be emitted from a centralized location.
`eventType` | `bytes32[]` | String name/type of event
