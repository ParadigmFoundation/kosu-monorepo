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

<<<<<<< HEAD

Authorizes the address by setting the mapping value to true.

#### Signature

```solidity
function authorizeAddress(a address)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
a | address | Address to authorize

### constructor


Constructor initializes with the creator permission set to true.

#### Signature

```solidity
constructor()
```

### isAddressAuthorized

=======

 - **Signature:**
 - 
    ```solidity
    
    function authorizeAddress(a address)
    
    ```
    
    
 - **Description:**
 - 
    Authorizes the address by setting the mapping value to true.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        a | address | Address to authorize
        
    

### constructor


 - **Signature:**
 - 
    ```solidity
    
    constructor()
    
    ```
    
    
 - **Description:**
 - 
    Constructor initializes with the creator permission set to true.
    
>>>>>>> eaf23b3d8732d3b3bcc500c6c71aad6ec3200335

Verify if address is authorized by reading contract mapping

#### Signature

<<<<<<< HEAD
```solidity
function isAddressAuthorized(a address)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
a | address | Address to get authorized value.

#### Returns:


True if the address is authorized, false otherwise.

### renounceOwnership


Allows the current owner to relinquish control of the contract.

#### Signature

```solidity
function renounceOwnership()
```

### transferOwnership

=======

 - **Signature:**
 - 
    ```solidity
    
    function isAddressAuthorized(a address)
    
    ```
    
    
 - **Description:**
 - 
    Verify if address is authorized by reading contract mapping
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        a | address | Address to get authorized value.
        
    
 - 
    **Returns:** True if the address is authorized, false otherwise.
    

### renounceOwnership


 - **Signature:**
 - 
    ```solidity
    
    function renounceOwnership()
    
    ```
    
    
 - **Description:**
 - 
    Allows the current owner to relinquish control of the contract.
    
>>>>>>> eaf23b3d8732d3b3bcc500c6c71aad6ec3200335

Allows the current owner to transfer control of the contract to a newOwner.

#### Signature

<<<<<<< HEAD
```solidity
function transferOwnership(newOwner address)
```

#### Parameters:
=======
>>>>>>> eaf23b3d8732d3b3bcc500c6c71aad6ec3200335

 - **Signature:**
 - 
    ```solidity
    
    function transferOwnership(newOwner address)
    
    ```
    
    
 - **Description:**
 - 
    Allows the current owner to transfer control of the contract to a newOwner.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        newOwner | address | The address to transfer ownership to.
        
    

### unauthorizeAddress

<<<<<<< HEAD

Unauthorizes the address by setting the mapping value to false.

#### Signature

```solidity
function unauthorizeAddress(a address)
```

#### Parameters:

Parameter | Type | Description
--- | --- | ---
a | address | Address to unauthorize
=======

 - **Signature:**
 - 
    ```solidity
    
    function unauthorizeAddress(a address)
    
    ```
    
    
 - **Description:**
 - 
    Unauthorizes the address by setting the mapping value to false.
    
 - **Parameters:**
     - Parameter | Type | Description
        --- | --- | ---
        a | address | Address to unauthorize
        
    
>>>>>>> eaf23b3d8732d3b3bcc500c6c71aad6ec3200335
