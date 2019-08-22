pragma solidity ^0.5.0;

import "../base/Authorizable.sol";
import "../lib/KosuToken.sol";

/** @title Treasury
    @author Freydal
    @dev The Kosu Treasury manages KosuToken balances to allow tokens in use within the contract system to be available for voting operations.
*/
contract Treasury is Authorizable {
    using SafeMath for uint;

    struct PollLock {
        uint value;
        uint pollId;
        bool invalidated;
    }

    KosuToken public kosuToken;
    mapping(address => uint) private currentBalances;
    mapping(address => uint) private systemBalances;
    mapping(address => PollLock[]) private userVotes;

    /** @dev Initializes the treasury with the kosuToken and authorizedAddresses contracts.
        @notice Initializes the treasury with the kosuToken and authorizedAddresses contracts.
        @param kosuTokenAddress The deployed KosuToken contract address.
        @param auth AuthorizedAddresses deployed address.
    */
    constructor(address payable kosuTokenAddress, address auth) Authorizable(auth) public {
        kosuToken = KosuToken(kosuTokenAddress);
    }

    /** @dev Fallback payable function to allow ether but be bonded and directly deposit tokens into the Treasury.
        @notice Fallback payable function to allow ether but be bonded and directly deposit tokens into the Treasury.
    */
    function () external payable {
        _bond(msg.sender);
    }

    /** @dev Allows Kosu contracts to bond ether on on the accounts behalf.
        @notice Allows Kosu contracts to bond ether on on the accounts behalf.
        @param account The address the calling contract is acting on behalf of.
    */
    function contractBond(address account) isAuthorized payable public returns (uint) {
        return _bond(account);
    }

    /** @dev Deposits tokens into the treasury.
        @notice Deposits tokens into the treasury.
        @param amount Number of tokens to deposit.
    */
    function deposit(uint amount) public {
        _deposit(msg.sender, amount);
    }

    /** @dev Allows contracts to deposit tokens from an accounts balance.
        @notice Allows contracts to deposit tokens from an accounts balance.
        @param account Account address the tokens will be deposited from.
        @param amount Number of tokens to deposit.
    */
    function contractDeposit(address account, uint amount) isAuthorized public {
        _deposit(account, amount);
    }

    /** @dev Withdraw tokens from the treasury.
        @notice Withdraw tokens from the treasury.
        @param amount Number of tokens to withdraw.
    */
    function withdraw(uint amount) public {
        _withdraw(msg.sender, amount);
    }

    /** @dev Allows contracts to withdraw tokens back to an account address.
        @notice Allows contracts to withdraw tokens back to an account address.
        @param account Address to withdraw tokens for.
        @param amount Number of tokens to withdraw.
    */
    function contractWithdraw(address account, uint amount) isAuthorized public {
        _withdraw(account, amount);
    }

    /** @dev Allows contracts to claim tokens. Claimed tokens are not available for other system contract and leave the treasury under control of the calling contract.  These tokens are still available for voting.
        @notice Allows contracts to claim tokens. Claimed tokens are not available for other system contract and leave the treasury under control of the calling contract.  These tokens are still available for voting.
        @param account Account to claim tokens from.
        @param amount Number of tokens to claim.
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

    /** @dev Allows contracts to release claimed tokens. Allowing them to be used elsewhere by the user again.
        @notice Allows contracts to release claimed tokens. Allowing them to be used elsewhere by the user again.
        @param account Account to release tokens to.
        @param amount Number of tokens to release.
    */
    function releaseTokens(address account, uint amount) isAuthorized public {
        //Transfer from requesting contract and update balance held in contract
        require(kosuToken.transferFrom(msg.sender, address(this), amount));
        setCurrentBalance(account, getCurrentBalance(account).add(amount));
    }

    /** @dev Allows contracts to confiscate tokens the account has lost access to. These previously claimed tokens are no longer owned by the account.
        @notice Allows contracts to confiscate tokens the account has lost access to. These previously claimed tokens are no longer owned by the account.
        @param account Account to confiscate tokens from.
        @param amount Number of tokens to confiscate.
    */
    function confiscate(address account, uint amount) isAuthorized public {
        //Remove the system balance
        setSystemBalance(account, getSystemBalance(account).sub(amount));
        // Require the tokens being confiscated are only tokens already in kosu system contract control
        require(getSystemBalance(account) >= getCurrentBalance(account));
    }

    /** @dev Allows accounts to be rewarded with tokens. These tokens were previously obtained by the calling contract and are now being redistributed to the provided account.
        @notice Allows accounts to be rewarded with tokens. These tokens were previously obtained by the calling contract and are now being redistributed to the provided account.
        @param account Account to award tokens to.
        @param amount Number of tokens to award.
    */
    function award(address account, uint amount) isAuthorized public {
        //Transfer from requesting contract and update balance held in contract
        require(kosuToken.transferFrom(msg.sender, address(this), amount));
        //Increase current balance
        setCurrentBalance(account, getCurrentBalance(account).add(amount));
        //Increase systemBalance these tokens are new to the account
        setSystemBalance(account, getSystemBalance(account).add(amount));
    }

    /** @dev Allows contracts to set balance.
        @notice Allows contracts to set balance.
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

    /** @dev Allows contracts to change balance.
        @notice Allows contracts to change balance.
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
    /** @dev Allows contracts to burn an accounts held tokens.
        @notice Allows contracts to burn an accounts held tokens.
        @param account Account to burn tokens for.
        @param amount Number of tokens to burn.
    */
    function burnFrom(address account, uint amount) isAuthorized public {
        require(getCurrentBalance(account) >= amount);
        kosuToken.burn(amount); //TODO: Consider event?
        setCurrentBalance(account, getCurrentBalance(account).sub(amount));
        setSystemBalance(account, getSystemBalance(account).sub(amount));
    }

    /** @dev Allows voting contract to register a poll to ensure tokens aren't removed.
        @notice Allows voting contract to register a poll to ensure tokens aren't removed.
        @param account The account voting.
        @param pollId The poll the account is voting on.
        @param amount Number of tokens contributed.
    */
    function registerVote(address account, uint pollId, uint amount) isAuthorized public returns (bool) {
        if(systemBalances[account] < amount) {
            return false;
        }

        userVotes[account].push(PollLock(amount, pollId, false));

        return true;
    }

    /** @dev Releases lock on tokens for account after vote is revealed.  No longer tracks the revealed poll.
        @notice Releases lock on tokens for account after vote is revealed.  No longer tracks the revealed poll.
        @param account The account voting.
        @param pollId The poll the account is voting on.
    */
    function completeVote(address account, uint pollId) isAuthorized public returns (bool) {
        for(uint i = 0; i < userVotes[account].length; i++) {
            PollLock storage v = userVotes[account][i];
            if(v.pollId == pollId) {
                bool notInvalidated = !v.invalidated;

                if(i == userVotes[account].length) {
                    delete userVotes[account][i];
                    userVotes[account].length = userVotes[account].length - 1;
                } else {
                    userVotes[account][i] = userVotes[account][userVotes[account].length - 1];
                    delete userVotes[account][userVotes[account].length - 1];
                    userVotes[account].length = userVotes[account].length - 1;
                }

                return notInvalidated;
            }
        }

        return false;
    }

    /** @dev Reports the total balance within the entire contract system for an account.
        @notice Reports the total balance within the entire contract system for an account.
        @param account Account to report balance on.
        @return The number of tokens within the entire contract system.
    */
    function systemBalance(address account) public view returns (uint)  {
        return getSystemBalance(account);
    }

    /** @dev Reports the available balance held within the treasury for an account.
        @notice Reports the available balance held within the treasury for an account.
        @param account Account to report balance on.
        @return Number of available tokens the treasury holds for the account.
    */
    function currentBalance(address account) public view returns (uint)  {
        return getCurrentBalance(account);
    }

    // INTERNAL
    /** @dev Bonds tokens by passing the transaction value to the bonding functions of the KosuToken then provides the added balance to the provided account address.
    */
    function _bond(address account) internal returns (uint) {
        uint initialBalance = kosuToken.balanceOf(address(this));
        uint minted = kosuToken.bondTokens.value(msg.value)(0);
        require(initialBalance+minted == kosuToken.balanceOf(address(this)));

        setSystemBalance(account, getSystemBalance(account).add(minted));
        setCurrentBalance(account, getCurrentBalance(account).add(minted));

        return minted;
    }

    /** @dev Transfers tokens from the account address to the treasury.  Increases the available and total system balance by the added amount.
    */
    function _deposit(address account, uint amount) internal {
        //Pulls token from the account and increases both internal ans system balances by the value.
        require(kosuToken.transferFrom(account, address(this), amount));
        setSystemBalance(account, getSystemBalance(account).add(amount));
        setCurrentBalance(account, getCurrentBalance(account).add(amount));
    }

    /** @dev Transfers tokens held within the treasury to the provided account address and removes the amount from the accounts available and system balances.
    */
    function _withdraw(address account, uint amount) internal {
        //Sends tokens to the account reduce the values of internal and system balances by the value.
        require(getCurrentBalance(account) >= amount);
        require(kosuToken.transfer(account, amount));
        setSystemBalance(account, getSystemBalance(account).sub(amount));
        setCurrentBalance(account, getCurrentBalance(account).sub(amount));
    }

    /** @dev Reads the account addresses system balance.
    */
    function getSystemBalance(address account) internal view returns (uint) {
        //Reports the systemBalance for the account
        return systemBalances[account];
    }

    /** @dev Sets the accounts system balance.
    */
    function setSystemBalance(address account, uint amount) internal {
        //Updates the systemBalance for the account
        if (systemBalances[account] > amount) {
            for(uint i = 0; i < userVotes[account].length; i++) {
                if(userVotes[account][i].value > amount) {
                    userVotes[account][i].invalidated = true;
                }
            }
        }

        systemBalances[account] = amount;
    }

    /** @dev Reads the accounts current balance.
    */
    function getCurrentBalance(address account) internal view returns (uint) {
        //Reports the held balance for the account
        return currentBalances[account];
    }

    /** @dev Sets the accounts current balance.
    */
    function setCurrentBalance(address account, uint amount) internal {
        //Updates the held balance for the account
        currentBalances[account] = amount;
    }
}
