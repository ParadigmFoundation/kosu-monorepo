# Treasury




## Contents


 - [Methods](undefined)
    
     - [adjustBalance](#adjustBalanceaddressint256)
     - [award](#awardaddressuint256)
     - [claimTokens](#claimTokensaddressuint256)
     - [confiscate](#confiscateaddressuint256)
     - [constructor](#constructo)
     - [contractDeposit](#contractDepositaddressuint256)
     - [contractWithdraw](#contractWithdrawaddressuint256)
     - [currentBalance](#currentBalanceaddress)
     - [deposit](#deposituint256)
     - [releaseTokens](#releaseTokensaddressuint256)
     - [systemBalance](#systemBalanceaddress)
     - [updateBalance](#updateBalanceaddressuint256)
     - [withdraw](#withdrawuint256)
    

## Methods

### adjustBalance(address,int256)


Allows contracts to change balance

Parameter | Type | Description
--- | --- | ---
account | address | User to modify tokens for
amount | int256 | Change to token balance

### award(address,uint256)


Allows contracts to be rewarded with new tokens

Parameter | Type | Description
--- | --- | ---
account | address | User to award tokens to
amount | uint256 | Number of tokens to award

### claimTokens(address,uint256)


Allows contracts to claim tokens

Parameter | Type | Description
--- | --- | ---
account | address | User to claim tokens from
amount | uint256 | Number of tokens to claim

### confiscate(address,uint256)


Allows contracts to confiscate tokens the user has lost access to

Parameter | Type | Description
--- | --- | ---
account | address | User to confiscate tokens from
amount | uint256 | Number of tokens to confiscate

### constructor


Creates a new Treasury

Parameter | Type | Description
--- | --- | ---
auth | ? | AuthorizedAddresses deployed address.
kosuTokenAddress | ? | The deployed KosuToken contract address

### contractDeposit(address,uint256)


Allows contracts to deposit

Parameter | Type | Description
--- | --- | ---
account | address | User to deposit tokens for
amount | uint256 | Number of tokens to deposit

### contractWithdraw(address,uint256)


Allows contracts to withdraw

Parameter | Type | Description
--- | --- | ---
account | address | User to withdraw tokens for
amount | uint256 | Number of tokens to withdraw

### currentBalance(address)


Reports the balance held within the contract for a user

Parameter | Type | Description
--- | --- | ---
account | address | Account to report balance on

### deposit(uint256)


Deposits tokens into the treasury

Parameter | Type | Description
--- | --- | ---
amount | uint256 | Number of tokens to deposit

### releaseTokens(address,uint256)


Allows contracts to release tokens

Parameter | Type | Description
--- | --- | ---
account | address | User to release tokens to
amount | uint256 | Number of tokens to release

### systemBalance(address)


Reports the balance within the contract system for a user

Parameter | Type | Description
--- | --- | ---
account | address | Account to report balance on

### updateBalance(address,uint256)


Allows contracts to set balance

Parameter | Type | Description
--- | --- | ---
account | address | User to modify tokens for
amount | uint256 | Number of tokens to set to current balance

### withdraw(uint256)


Withdraw tokens from the treasury

Parameter | Type | Description
--- | --- | ---
amount | uint256 | Number of tokens to withdraw
