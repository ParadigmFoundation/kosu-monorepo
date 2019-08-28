pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../treasury/Treasury.sol";
import "../event/EventEmitter.sol";

/** @title PosterRegistry
    @author Freydal
    @dev The PosterRegistry allows accounts to manage tokens registered rewarding permission to post orders to the kosu network.
*/
contract PosterRegistry {
    using SafeMath for uint;

    mapping(address => uint) private _balances;
    uint public tokensContributed = 0;
    KosuToken public kosuToken;
    Treasury public treasury;
    EventEmitter private e;

    /** @dev Initializes the PosterRegistry with the treasury and EventEmitter addresses.
        @notice Initializes the PosterRegistry with the treasury and EventEmitter addresses.
        @param _treasuryAddress Treasury contract address.
        @param _events Deployed Events contract address.
    */
    constructor(address payable _treasuryAddress, address _events) public {
        treasury = Treasury(_treasuryAddress);
        kosuToken = treasury.kosuToken();
        e = EventEmitter(_events);
    }

    /** @dev Fallback payable function allows for direct deposit of ether to generate tokens to be registered for Posting to Kosu network.
        @notice Fallback payable function allows for direct deposit of ether to generate tokens to be registered for Posting to Kosu network.
    */
    function () external payable {
        uint amount = treasury.contractBond.value(msg.value)(msg.sender);
        treasury.claimTokens(msg.sender, amount);
        tokensContributed = tokensContributed.add(amount);
        _balances[msg.sender] = _balances[msg.sender].add(amount);
        _emitEvent(msg.sender);
    }

    /** @dev Tokens registered for an account.
        @notice Tokens registered for an account.
        @param a Address to get value for.
        @return Tokens registered for address.
    */
    function tokensRegisteredFor(address a) external view returns (uint) {
        return _tokensFor(a);
    }

    /** @dev Register tokens for posting permissions.
        @notice Register tokens for posting permissions.
        @param amount Number of tokens to register.
    */
    function registerTokens(uint amount) external {
        //Claim tokens from the treasury, delivering them to this contract and accounting for the balances locally.
        treasury.claimTokens(msg.sender, amount);
        tokensContributed = tokensContributed.add(amount);
        _balances[msg.sender] = _balances[msg.sender].add(amount);
        _emitEvent(msg.sender);
    }

    /** @dev Release tokens from the registry.
        @notice Release tokens from the registry.
        @param amount Number of tokens to release.
    */
    function releaseTokens(uint amount) external {
        //Approve treasury to take tokens from this contract, treasury takes tokens and updates accounting.
        kosuToken.approve(address(treasury), amount);
        treasury.releaseTokens(msg.sender, amount);
        _balances[msg.sender] = _balances[msg.sender].sub(amount);
        tokensContributed = tokensContributed.sub(amount);
        _emitEvent(msg.sender);
    }

    // Internal

    function _emitEvent(address a) internal {
        //Emits an event for the address that made a change and the new current balance.
        bytes32[] memory data = new bytes32[](2);
        data[0] = bytes32(uint(a));
        data[1] = bytes32(_tokensFor(a));
        e.emitEvent("PosterRegistryUpdate", data, "");
    }

    function _tokensFor(address a) internal view returns (uint) {
        return _balances[a];
    }
}
