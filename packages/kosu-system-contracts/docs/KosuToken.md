# KosuToken




## Contents


 - [Methods](undefined)
    
     - [allowance](#allowanceaddressaddress)
     - [approve](#approveaddressuint256)
     - [balanceOf](#balanceOfaddress)
     - [burn](#burnuint256)
     - [constructor](#constructo)
     - [decreaseAllowance](#decreaseAllowanceaddressuint256)
     - [increaseAllowance](#increaseAllowanceaddressuint256)
     - [mint](#mintuint256)
     - [mintTo](#mintToaddressuint256)
     - [totalSupply](#totalSupply)
     - [transfer](#transferaddressuint256)
     - [transferFrom](#transferFromaddressaddressuint256)
    

## Methods

### allowance(address,address)


Function to check the amount of tokens that an owner allowed to a spender.

Parameter | Type | Description
--- | --- | ---
owner | address | address The address which owns the funds.
spender | address | address The address which will spend the funds.

### approve(address,uint256)


Approve the passed address to spend the specified amount of tokens on behalf of msg.sender. Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729

Parameter | Type | Description
--- | --- | ---
spender | address | The address which will spend the funds.
value | uint256 | The amount of tokens to be spent.

### balanceOf(address)


Gets the balance of the specified address.

Parameter | Type | Description
--- | --- | ---
owner | address | The address to query the balance of.

### burn(uint256)


Burn tokens

Parameter | Type | Description
--- | --- | ---
amount | uint256 | Number of tokens to destroy.

### constructor


Deploy a new ERC20 Token

### decreaseAllowance(address,uint256)


Decrease the amount of tokens that an owner allowed to a spender. approve should be called when allowed_[_spender] == 0. To decrement allowed value is better to use this function to avoid 2 calls (and wait until the first transaction is mined) From MonolithDAO Token.sol Emits an Approval event.

Parameter | Type | Description
--- | --- | ---
spender | address | The address which will spend the funds.
subtractedValue | uint256 | The amount of tokens to decrease the allowance by.

### increaseAllowance(address,uint256)


Increase the amount of tokens that an owner allowed to a spender. approve should be called when allowed_[_spender] == 0. To increment allowed value is better to use this function to avoid 2 calls (and wait until the first transaction is mined) From MonolithDAO Token.sol Emits an Approval event.

Parameter | Type | Description
--- | --- | ---
addedValue | address | The amount of tokens to increase the allowance by.
spender | uint256 | The address which will spend the funds.

### mint(uint256)


Mint tokens

Parameter | Type | Description
--- | --- | ---
amount | uint256 | Number of tokens to create.

### mintTo(address,uint256)


Mint tokens to specified address

Parameter | Type | Description
--- | --- | ---
_address | address | Address to receive tokens.
amount | uint256 | Number of tokens to create.

### totalSupply()


Total number of tokens in existence

### transfer(address,uint256)


Transfer token for a specified address

Parameter | Type | Description
--- | --- | ---
to | address | The address to transfer to.
value | uint256 | The amount to be transferred.

### transferFrom(address,address,uint256)


Transfer tokens from one address to another. Note that while this function emits an Approval event, this is not required as per the specification, and other compliant implementations may not emit the event.

Parameter | Type | Description
--- | --- | ---
from | address | address The address which you want to send tokens from
to | address | address The address which you want to transfer to
value | uint256 | uint256 the amount of tokens to be transferred
