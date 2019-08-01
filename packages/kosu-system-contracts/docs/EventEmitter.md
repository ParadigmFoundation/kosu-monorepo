# EventEmitter


A shared contract for all Kosu system contracts to trigger event logs through.

## Contents


 - [Methods](undefined)
    
     - [constructor](#constructor)
     - [emitEvent](#emitevent)
    

## Methods

### constructor


Event emitter instantiated with Authorizable.

#### Signature

```solidity
constructor(auth address) public
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
`auth` | `address` | AuthorizedAddresses deployed address.

### emitEvent


Emit generic events which can have decoding exposed though javascript library.

#### Signature

```solidity
function emitEvent(eventType string, data bytes32[], stringData string) public
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
`eventType` | `string` | String name/type of event
`data` | `bytes32[]` | Bytes32 encoded data to be emitted from a centralized location
`stringData` | `string` | String containing optional additonal information
