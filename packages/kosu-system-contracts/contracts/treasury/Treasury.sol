pragma solidity ^0.5.0;

import "../base/Authorizable.sol";
import "../lib/KosuToken.sol";

/** @title Treasury
    @author Freydal
*/
contract Treasury is Authorizable {
    using SafeMath for uint;

    KosuToken public kosuToken;
    mapping(address => uint) private currentBalances;
    mapping(address => uint) private systemBalances;

    /** @dev Creates a new Treasury
        @notice Creates a new Treasury
        @param kosuTokenAddress The deployed KosuToken contract address
        @param auth AuthorizedAddresses deployed address.
    */
    constructor(address kosuTokenAddress, address auth) Authorizable(auth) public {
        kosuToken = KosuToken(kosuTokenAddress);
    }

    /** @dev Deposits tokens into the treasury
        @notice Deposits tokens into the treasury
        @param amount Number of tokens to deposit
    */
    function deposit(uint amount) public {
        _deposit(msg.sender, amount);
    }

    /** @dev Allows contracts to deposit
        @notice Allows contracts to deposit
        @param account User to deposit tokens for
        @param amount Number of tokens to deposit
    */
    function contractDeposit(address account, uint amount) isAuthorized public {
        _deposit(account, amount);
    }

    /** @dev Withdraw tokens from the treasury
        @notice Withdraw tokens from the treasury
        @param amount Number of tokens to withdraw
    */
    function withdraw(uint amount) public {
        _withdraw(msg.sender, amount);
    }

    /** @dev Allows contracts to withdraw
        @notice Allows contracts to withdraw
        @param account User to withdraw tokens for
        @param amount Number of tokens to withdraw
    */
    function contractWithdraw(address account, uint amount) isAuthorized public {
        _withdraw(account, amount);
    }

    /** @dev Allows contracts to claim tokens
        @notice Allows contracts to claim tokens
        @param account User to claim tokens from
        @param amount Number of tokens to claim
    */
    function claimTokens(address account, uint amount) isAuthorized public {
        //Attempt to get more balance if balance is insufficient
        if(getCurrentBalance(account) < amount) {
          updateBalance(account, amount);
        }

        //Transfer to requesting contract and update balance held in contract
        require(kosuToken.transfer(msg.sender, amount));
        setCurrentBalance(account, getCurrentBalance(account).sub(amount));
    }

    /** @dev Allows contracts to release tokens
        @notice Allows contracts to release tokens
        @param account User to release tokens to
        @param amount Number of tokens to release
    */
    function releaseTokens(address account, uint amount) isAuthorized public {
        //Transfer from requesting contract and update balance held in contract
        require(kosuToken.transferFrom(msg.sender, address(this), amount));
        setCurrentBalance(account, getCurrentBalance(account).add(amount));
    }

    /** @dev Allows contracts to confiscate tokens the user has lost access to
        @notice Allows contracts to confiscate tokens the user has lost access to
        @param account User to confiscate tokens from
        @param amount Number of tokens to confiscate
    */
    function confiscate(address account, uint amount) isAuthorized public {
        //Remove the system balance
        setSystemBalance(account, getSystemBalance(account).sub(amount));
        // Require the tokens being confiscated are only tokens already in kosu system contract control
        require(getSystemBalance(account) >= getCurrentBalance(account));
    }

    /** @dev Allows contracts to be rewarded with new tokens
        @notice Allows contracts to be rewarded with new tokens
        @param account User to award tokens to
        @param amount Number of tokens to award
    */
    function award(address account, uint amount) isAuthorized public {
        //Transfer from requesting contract and update balance held in contract
        require(kosuToken.transferFrom(msg.sender, address(this), amount));
        //Increase current balance
        setCurrentBalance(account, getCurrentBalance(account).add(amount));
        //Increase systemBalance these tokens are new to the user
        setSystemBalance(account, getSystemBalance(account).add(amount));
    }

    /** @dev Allows contracts to set balance
        @notice Allows contracts to set balance
        @param account User to modify tokens for
        @param amount Number of tokens to set to current balance
    */
    function updateBalance(address account, uint amount) isAuthorized public {
        //Adjust balance to requested value.  Increase or decrease based on current balance
        uint currentBalance = getCurrentBalance(account);
        if(currentBalance > amount) {
            uint amountToWithdraw = currentBalance.sub(amount);
            _withdraw(account, amountToWithdraw);
        } else if (currentBalance < amount) {
            uint amountToDeposit = amount.sub(currentBalance);
            _deposit(account, amountToDeposit);
        }
    }

    /** @dev Allows contracts to change balance
        @notice Allows contracts to change balance
        @param account User to modify tokens for
        @param amount Change to token balance
    */
    function adjustBalance(address account, int amount) isAuthorized public {
        //Changes balance by the provided amount
        if(amount < 0) {
            _withdraw(account, uint(amount * -1));
        } else if (amount > 0) {
            _deposit(account, uint(amount));
        }
    }

    function burnFrom(address account, uint amount) isAuthorized public {
        require(getCurrentBalance(account) >= amount);
        kosuToken.burn(amount);
        setCurrentBalance(account, getCurrentBalance(account).sub(amount));
        setSystemBalance(account, getSystemBalance(account).sub(amount));
    }


/** @dev Reports the balance within the contract system for a user
    @notice Reports the balance within the contract system for a user
    @param account Account to report balance on
    @return The number of tokens within the total contract system
*/
    function systemBalance(address account) public view returns (uint)  {
        return getSystemBalance(account);
    }

    /** @dev Reports the balance held within the contract for a user
        @notice Reports the balance held within the contract for a user
        @param account Account to report balance on
        @return Number of tokens this contract holds for the user
    */
    function currentBalance(address account) public view returns (uint)  {
        return getCurrentBalance(account);
    }

//  INTERNAL
    function _deposit(address account, uint amount) internal {
        //Pulls token from the user and increases both internal ans system balances by the value.
        require(kosuToken.transferFrom(account, address(this), amount));
        setSystemBalance(account, getSystemBalance(account).add(amount));
        setCurrentBalance(account, getCurrentBalance(account).add(amount));
    }

    function _withdraw(address account, uint amount) internal {
        //Sends tokens to the user reduce the values of internal and system balances by the value.
        require(getCurrentBalance(account) >= amount);
        require(kosuToken.transfer(account, amount));
        setSystemBalance(account, getSystemBalance(account).sub(amount));
        setCurrentBalance(account, getCurrentBalance(account).sub(amount));
    }

    function getSystemBalance(address account) internal view returns (uint) {
        //Reports the systemBalance for the user
        return systemBalances[account];
    }

    function setSystemBalance(address account, uint amount) internal {
        //Updates the systemBalance for the user
        systemBalances[account] = amount;
    }

    function getCurrentBalance(address account) internal view returns (uint) {
        //Reports the held balance for the user
        return currentBalances[account];
    }

    function setCurrentBalance(address account, uint amount) internal {
        //Updates the held balance for the user
        currentBalances[account] = amount;
    }
}
