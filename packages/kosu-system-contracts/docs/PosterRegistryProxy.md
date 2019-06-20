# PosterRegistryProxy




## Contents


 - [Methods](undefined)
    
     - [constructor](#constructo)
     - [registerTokens](#registerTokensuint256)
     - [releaseTokens](#releaseTokensuint256)
     - [setImplementation](#setImplementationaddress)
     - [token](#token)
     - [tokensContributed](#tokensContributed)
     - [tokensRegisteredFor](#tokensRegisteredForaddress)
     - [treasury](#treasury)
    

## Methods

### constructor


Creates a Proxy for a PosterRegistry. Accepts an initial implementation that can be overwritten if a replacement is deployed.

Parameter | Type | Description
--- | --- | ---
auth | ? | AuthorizedAddresses deployed address.
implementation | ? | deployed implementation of PosterRegistry.

### registerTokens(uint256)


Calls registerTokens on the current registry.

Parameter | Type | Description
--- | --- | ---
amount | uint256 | Desired amount of tokens to register.

### releaseTokens(uint256)


Calls releaseTokens for the current registry.

Parameter | Type | Description
--- | --- | ---
amount | uint256 | Desired amount of tokens to release.

### setImplementation(address)


Set a new PosterRegistry implementation if a replacement is deployed.

Parameter | Type | Description
--- | --- | ---
implementation | address | Deployed address for replacement PosterRegistry implementation.

### token()


Reads the current registries token.

### tokensContributed()


Reads the current registries tokensContributed.

### tokensRegisteredFor(address)


Reads the current registries tokens registered for the supplied address.

Parameter | Type | Description
--- | --- | ---
a | address | Address of user

### treasury()


Reads the current registries Treasury address.
