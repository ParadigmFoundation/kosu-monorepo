## Ropsten Kosu Staking Process

### Obtain tokens
1. Send ether to DIGM token at `0x6e8e6aa644fd03ca0a99a05dff580a5cd8e29b85`. 
    * This token is a special test token on ropsten that will allow you to send ether to generate token balance with ether being returned immediately.

### To stake tokens
1. Obtain tokens if no tokens are available.
1. Send an approval to the DIGM token for the staking contract address.  
    1. Follow [this](https://ropsten.etherscan.io/address/0x6e8e6aa644fd03ca0a99a05dff580a5cd8e29b85#writeContract) link.  
    1. Connect Metamask
    1. Find the approve function
    1. Enter 0x67b2821031489750080ce33c86ba6ea97eec7763 as the spender
    1. Enter an amount you wish to stake (in wei)
    1. Click write
    1. Accept Metamask prompt
1. Send a stake transaction to the staking contract.
    1. Follow [this](https://ropsten.etherscan.io/address/0xfF4eA04f2d158b31BA75c4c4B72e9CF9b15fe8FF#writeContract) link
    1. Connect Metamask
    1. Find the stake function
    1. Enter an amount less than or equal to the amount you have approved
    1. Click write
    1. Accept Metamask prompt

### To stake tokens through token contract directly
1. Obtain tokens if no tokens are available.
1. Send an stake transaction to the token.
    1. Follow [this](https://ropsten.etherscan.io/address/0x6e8e6aa644fd03ca0a99a05dff580a5cd8e29b85#writeContract) link.  
    1. Connect Metamask
    1. Find the stake function
    1. Enter an amount less than or equal to the amount of token balance you have
    1. Click write
    1. Accept Metamask prompt

### To remove stake

1. Send an removeStake transaction to the staking contract.
    1. Follow [this](https://ropsten.etherscan.io/address/0xfF4eA04f2d158b31BA75c4c4B72e9CF9b15fe8FF#writeContract) link
    1. Connect Metamask
    1. Find the removeStake function
    1. Enter an amount less than or equal to the amount you currently have staked
    1. Click write
    1. Accept Metamask prompt


