# EventEmitter

A central event emitting contract supporting the Kosu contract system.

## Contents

-   [Methods](undefined)
    -   [constructor](#constructor)
    -   [emitEvent](#emitevent)

## Methods

### constructor

Event emitter instantiated with Authorizable.

#### Signature

```solidity
constructor(auth address) public
```

#### Parameters:

| Parameter | Type      | Description                           |
| --------- | --------- | ------------------------------------- |
| `auth`    | `address` | AuthorizedAddresses deployed address. |

### emitEvent

Emits a standard event from the Kosu contract system. The events can be decoded though the javascript library.

#### Signature

```solidity
function emitEvent(eventType string, data bytes32[], stringData string) public
```

#### Parameters:

| Parameter    | Type        | Description                                        |
| ------------ | ----------- | -------------------------------------------------- |
| `eventType`  | `string`    | String name/type of event.                         |
| `data`       | `bytes32[]` | Bytes32 encoded data to be emitted.                |
| `stringData` | `string`    | String containing optional additional information. |
