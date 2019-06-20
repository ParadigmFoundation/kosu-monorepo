# AuthorizedAddresses




## Contents


 - [Methods](undefined)
    
     - [authorizeAddress](#authorizeAddressaddress)
     - [constructor](#constructo)
     - [isAddressAuthorized](#isAddressAuthorizedaddress)
     - [isOwner](#isOwner)
     - [owner](#owner)
     - [renounceOwnership](#renounceOwnership)
     - [transferOwnership](#transferOwnershipaddress)
     - [unauthorizeAddress](#unauthorizeAddressaddress)
    

## Methods

### authorizeAddress(address)


Authorizes the address by setting the mapping value to true

Parameter | Type | Description
--- | --- | ---
a | address | Address to authorize

### constructor


Constructor initializes with the creator permission set to true.

### isAddressAuthorized(address)


Verify if address is authorized by reading contract mapping

Parameter | Type | Description
--- | --- | ---
a | address | Address to get authorized value.

### isOwner()


?

### owner()


?

### renounceOwnership()


Allows the current owner to relinquish control of the contract.

### transferOwnership(address)


Allows the current owner to transfer control of the contract to a newOwner.

Parameter | Type | Description
--- | --- | ---
newOwner | address | The address to transfer ownership to.

### unauthorizeAddress(address)


Unauthorizes the address by setting the mapping value to false

Parameter | Type | Description
--- | --- | ---
a | address | Address to unauthorize
