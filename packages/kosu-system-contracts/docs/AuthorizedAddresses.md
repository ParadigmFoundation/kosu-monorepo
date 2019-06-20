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
    

### isAddressAuthorized


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
    

### transferOwnership


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
        
    
