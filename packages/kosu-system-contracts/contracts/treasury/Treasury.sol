pragma solidity ^0.5.0;

import "../base/Authorizable.sol";
import "../lib/KosuToken.sol";
import "../voting/IVoting.sol";

/** @title Treasury
    @author Freydal
    @dev The Kosu Treasury manages KosuToken balances to allow tokens in use within the contract system to be available for voting operations.
*/
contract Treasury is Authorizable {
    using SafeMath for uint;

    IVoting voting;
    KosuToken public kosuToken;

    struct TokenLock {
        uint value;
        uint pollId;
        uint tokenLockEnd;
        uint pollEarlyUnlock;
    }
    struct Account {
        uint currentBalance;
        uint systemBalance;
        TokenLock[] tokenLocks;
        mapping(address => bool) proxies;
    }

    mapping(address => Account) private accounts;


    /** @dev Initializes the treasury with the kosuToken and authorizedAddresses contracts.
        @notice Initializes the treasury with the kosuToken and authorizedAddresses contracts.
        @param kosuTokenAddress The deployed KosuToken contract address.
        @param auth AuthorizedAddresses deployed address.
    */
    constructor(address payable kosuTokenAddress, address auth) Authorizable(auth) public {
        kosuToken = KosuToken(kosuTokenAddress);
    }

    /** @dev Set the voting contract after post deployment of the Treasury contract.
        @notice Set the voting contract after post deployment of the Treasury contract.
        @param votingAddress address of the deployed Voting contract.
    */
    function setVoting(address votingAddress) isAuthorized public {
        voting = IVoting(votingAddress);
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
        require(getCurrentBalance(msg.sender).sub(amount) >= _getLockedTokens(msg.sender), "tokens are locked");

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
            uint currentBalance = getCurrentBalance(account);
            uint amountToDeposit = amount.sub(currentBalance);
            _deposit(account, amountToDeposit);
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
        require(getSystemBalance(account) >= getCurrentBalance(account), "system balance overburn");
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

    /** @dev Allows contracts to burn an accounts held tokens.
        @notice Allows contracts to burn an accounts held tokens.
        @param account Account to burn tokens for.
        @param amount Number of tokens to burn.
    */
    function burnFrom(address account, uint amount) isAuthorized public {
        require(getCurrentBalance(account) >= amount, "insufficient current balance");
        kosuToken.burn(amount);
        setCurrentBalance(account, getCurrentBalance(account).sub(amount));
        setSystemBalance(account, getSystemBalance(account).sub(amount));
    }

    /** @dev Allows voting contract to register a vote in a poll to ensure tokens aren't removed.
        @notice Allows voting contract to register a vote in a poll to ensure tokens aren't removed.
        @param account The account voting.
        @param pollId The poll the account is voting on.
        @param amount Number of tokens contributed.
        @param endBlock Block number vote token lock should expire.
        @param losingEndBlock Block number vote token lock should expire if vote was in support of a losing option.
    */
    function registerVote(address account, uint pollId, uint amount, uint endBlock, uint losingEndBlock) isAuthorized public returns (bool) {
        if(getSystemBalance(account) < amount) {
            return false;
        }

        accounts[account].tokenLocks.push(TokenLock(amount, pollId, endBlock, losingEndBlock));

        return true;
    }

    /** @dev Allows voting contract to register a vote in a poll from a proxy to ensure tokens aren't removed.
        @notice Allows voting contract to register a vote in a poll from a proxy to ensure tokens aren't removed.
        @param account The account voting.
        @param pollId The poll the account is voting on.
        @param amount Number of tokens contributed.
        @param endBlock Block number vote token lock should expire.
        @param losingEndBlock Block number vote token lock should expire if vote was in support of a losing option.
    */
    function registerProxyVote(address proxy, address account, uint pollId, uint amount, uint endBlock, uint losingEndBlock) isAuthorized public returns (bool) {
        if(getSystemBalance(account) < amount) {
            return false;
        }

        require(isProxyFor(account, proxy), "not valid proxy");

        accounts[account].tokenLocks.push(TokenLock(amount, pollId, endBlock, losingEndBlock));

        return true;
    }

    /** @dev Allows validator registry to lock tokens in treasury after an exit.
        @notice Allows validator registry to lock tokens in treasury after an exit.
        @param account The account validator is locking.
        @param amount Number of tokens to lock.
        @param endBlock The end of the lock.
    */
    function validatorLock(address account, uint amount, uint endBlock) isAuthorized public {
        accounts[account].tokenLocks.push(TokenLock(
            amount,
            0,
            endBlock,
            0
        ));
    }

    /** @dev Allows tokens to determine when all tokens are unlocked for a given account.
        @notice Allows tokens to determine when all tokens are unlocked for a given account.
        @param account The account to look at locks for.
        @return Final block of the last lock to expire.
    */
    function tokenLocksExpire(address account) public returns (uint lastBlock) {
        _removeInactiveTokenLocks(msg.sender);
        for(uint i = accounts[account].tokenLocks.length; i > 0; i--) {
            if(accounts[account].tokenLocks[i - 1].tokenLockEnd > lastBlock) {
                lastBlock = accounts[account].tokenLocks[i - 1].tokenLockEnd;
            }
        }
        return lastBlock;
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

    /** @dev Authorize voting proxy for treasury balances.
        @notice Authorize voting proxy for treasury balances.
        @param proxy Address to allow to vote in proxy.

    */
    function authorizeProxy(address proxy) public {
        accounts[msg.sender].proxies[proxy] = true;
    }

    /** @dev Remove authorization of voting proxy for treasury balance.
        @notice Remove authorization of voting proxy for treasury balance.
        @param proxy Address to remove permission to vote in proxy.

    */
    function deauthorizeProxy(address proxy) public {
        accounts[msg.sender].proxies[proxy] = false;
    }

    /** @dev Check proxy authorization for account and proxy addresses.
        @notice Check proxy authorization for account and proxy addresses.
        @param account User account with tokens.
        @param proxy Address to check proxy status.

    */
    function isProxyFor(address account, address proxy) public view returns (bool) {
        return accounts[account].proxies[proxy];
    }

    // INTERNAL
    /** @dev Bonds tokens by passing the transaction value to the bonding functions of the KosuToken then provides the added balance to the provided account address.
    */
    function _bond(address account) internal returns (uint) {
        uint initialBalance = kosuToken.balanceOf(address(this));
        uint minted = kosuToken.bondTokens.value(msg.value)(0);
        require(initialBalance + minted == kosuToken.balanceOf(address(this)), "tokens not minted");

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
        require(getCurrentBalance(account) >= amount, "insufficient tokens");
        require(kosuToken.transfer(account, amount));
        setSystemBalance(account, getSystemBalance(account).sub(amount));
        setCurrentBalance(account, getCurrentBalance(account).sub(amount));
    }

    /** @dev Removes expired locks.
    */
    function _removeInactiveTokenLocks(address account) internal {
        for(uint i = accounts[account].tokenLocks.length; i > 0; i--) {
            TokenLock storage v = accounts[account].tokenLocks[i - 1];
            (bool finished, uint winningTokens) = voting.userWinningTokens(v.pollId, msg.sender);
            if(v.pollId > 0 && finished && winningTokens == 0) {
                v.tokenLockEnd = v.pollEarlyUnlock;
            }
            if(v.tokenLockEnd < block.number) {
                if(i == accounts[account].tokenLocks.length) {
                    delete accounts[account].tokenLocks[i - 1];
                    accounts[account].tokenLocks.length = accounts[account].tokenLocks.length - 1;
                } else {
                    accounts[account].tokenLocks[i - 1] = accounts[account].tokenLocks[accounts[account].tokenLocks.length - 1];
                    delete accounts[account].tokenLocks[accounts[account].tokenLocks.length - 1];
                    accounts[account].tokenLocks.length = accounts[account].tokenLocks.length - 1;
                }
            }
        }
    }

    /** @dev Calculates addresses total locked tokens
    */
    function _getLockedTokens(address account) internal returns (uint) {
        //cleanup
        _removeInactiveTokenLocks(account);
        //Updates the systemBalance for the account
        uint totalLocked;
        uint maxVoteLock;
        for(uint i = 0; i < accounts[account].tokenLocks.length; i++) {
            TokenLock storage lock = accounts[account].tokenLocks[i];
            if(lock.pollId == 0) {
                totalLocked = totalLocked.add(accounts[account].tokenLocks[i].value);
            } else {
                if (lock.value > maxVoteLock) {
                    maxVoteLock = lock.value;
                }
            }
        }
        return totalLocked + maxVoteLock;
    }
    /** @dev Reads the account addresses system balance.
    */
    function getSystemBalance(address account) internal view returns (uint) {
        //Reports the systemBalance for the account
        return accounts[account].systemBalance;
    }

    /** @dev Sets the accounts system balance.
    */
    function setSystemBalance(address account, uint amount) internal {
        accounts[account].systemBalance = amount;
    }

    /** @dev Reads the accounts current balance.
    */
    function getCurrentBalance(address account) internal view returns (uint) {
        //Reports the held balance for the account
        return accounts[account].currentBalance;
    }

    /** @dev Sets the accounts current balance.
    */
    function setCurrentBalance(address account, uint amount) internal {
        //Updates the held balance for the account
        accounts[account].currentBalance = amount;
    }
}
