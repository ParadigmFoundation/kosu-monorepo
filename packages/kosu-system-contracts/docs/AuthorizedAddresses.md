# AuthorizedAddresses


Common registry of system contract addresses authrorized to access internal methods.

## Contents


 - [Methods](undefined)
    
     - [authorizeAddress](#authorizeAddress)
     - [constructor](#constructor)
     - [isAddressAuthorized](#isAddressAuthorized)
     - [isOwner](#isOwner)
     - [owner](#owner)
     - [renounceOwnership](#renounceOwnership)
     - [transferOwnership](#transferOwnership)
     - [unauthorizeAddress](#unauthorizeAddress)
    

## Methods

### authorizeAddress

```solidity
function authorizeAddress(a address)
```


Authorizes the address by setting the mapping value to true.

Parameter | Type | Description
--- | --- | ---
a | address | Address to authorize

### constructor

```solidity
constructor()
```


Constructor initializes with the creator permission set to true.

### isAddressAuthorized

```solidity
function isAddressAuthorized(a address)
```


Verify if address is authorized by reading contract mapping

Parameter | Type | Description
--- | --- | ---
a | address | Address to get authorized value.


**Returns:** True if the address is authorized, false otherwise.

### renounceOwnership

```solidity
function renounceOwnership()
```


Allows the current owner to relinquish control of the contract.

### transferOwnership

```solidity
function transferOwnership(newOwner address)
```


Allows the current owner to transfer control of the contract to a newOwner.

Parameter | Type | Description
--- | --- | ---
newOwner | address | The address to transfer ownership to.

### unauthorizeAddress

```solidity
function unauthorizeAddress(a address)
```


Unauthorizes the address by setting the mapping value to false.

Parameter | Type | Description
--- | --- | ---
a | address | Address to unauthorize
