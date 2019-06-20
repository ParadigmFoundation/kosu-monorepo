# PosterRegistry




## Contents


 - [Methods](undefined)
    
     - [constructor](#constructo)
     - [registerTokens](#registerTokensaddressuint256)
     - [releaseTokens](#releaseTokensaddressuint256)
     - [token](#token)
     - [tokensContributed](#tokensContributed)
     - [tokensRegisteredFor](#tokensRegisteredForaddress)
     - [treasury](#treasury)
    

## Methods

### constructor


Creates a new PosterRegistry

Parameter | Type | Description
--- | --- | ---
_auth | ? | Deployed AuthorizedAddresses contract address
_events | ? | Deployed Events contract address
_treasuryAddress | ? | Deployed Treasury contract address

### registerTokens(address,uint256)


Register tokens.

Parameter | Type | Description
--- | --- | ---
amount | address | Number of tokens to register
msgSender | uint256 | Address that called the proxy

### releaseTokens(address,uint256)


Release tokens

Parameter | Type | Description
--- | --- | ---
amount | address | Number of tokens to release
msgSender | uint256 | Address that called the proxy

### token()


The token address

### tokensContributed()


The number of tokens that have been contributed to the contract

### tokensRegisteredFor(address)


Tokens registered for a user

Parameter | Type | Description
--- | --- | ---
a | address | Address to get value for

### treasury()


The Treasury address
