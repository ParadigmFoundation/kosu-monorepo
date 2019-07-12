pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../treasury/Treasury.sol";
import "../event/EventEmitter.sol";

/** @title PosterRegistry
    @author Freydal
    @dev Implementation contract for the PosterRegistry, allowing users to bond and un-bond tokens.
*/
contract PosterRegistry is Authorizable {
    using SafeMath for uint;

    mapping(address => uint) private _balances;
    uint private _tokensContributed = 0;
    KosuToken private _kosuToken;
    Treasury private _treasury;
    EventEmitter private e;

    /** @dev Creates a new PosterRegistry
        @notice Creates a new PosterRegistry
        @param _treasuryAddress Deployed Treasury contract address
        @param _events Deployed Events contract address
        @param _auth Deployed AuthorizedAddresses contract address
    */
    constructor(address payable _treasuryAddress, address _events, address _auth) Authorizable(_auth) public {
        _treasury = Treasury(_treasuryAddress);
        _kosuToken = _treasury.kosuToken();
        e = EventEmitter(_events);
    }

    /** @dev The number of tokens that have been contributed to the contract
        @notice The number of tokens that have been contributed to the contract
        @return Total number of tokens contributed.
    */
    function tokensContributed() external view returns (uint) {
        return _tokensContributed;
    }

    /** @dev The token address.
        @notice The token address.
        @return KosuToken address.
    */
    function token() external view returns (address) {
        return address(_kosuToken);
    }

    /** @dev The Treasury address.
        @notice The Treasury address.
        @return Deployed Treasury address.
    */
    function treasury() external view returns (address) {
        return address(_treasury);
    }

    /** @dev Tokens registered for a user.
        @notice Tokens registered for a user.
        @param a Address to get value for
        @return Tokens registered for address.
    */
    function tokensRegisteredFor(address a) external view returns (uint) {
        return tokensFor(a);
    }

    /** @dev Register tokens.
        @notice Register tokens.
        @param msgSender Address that called the proxy
        @param amount Number of tokens to register
    */
    function registerTokens(address msgSender, uint amount) external isAuthorized {
        //Claim tokens from the treasury, delivering them to this contract and accounting for the balances locally.
        _treasury.claimTokens(msgSender, amount);
        _tokensContributed = _tokensContributed.add(amount);
        _balances[msgSender] = _balances[msgSender].add(amount);
        emitEvent(msgSender);
    }

    /** @dev Release tokens from the registry.
        @notice Release tokens from the registry.
        @param msgSender Address that called the proxy
        @param amount Number of tokens to release
    */
    function releaseTokens(address msgSender, uint amount) external isAuthorized {
        //Approve treasury to take tokens from this contract, treasury takes tokens and updates accounting.
        _kosuToken.approve(address(_treasury), amount);
        _treasury.releaseTokens(msgSender, amount);
        _balances[msgSender] = _balances[msgSender].sub(amount);
        _tokensContributed = _tokensContributed.sub(amount);
        emitEvent(msgSender);
    }

    // Internal

    function emitEvent(address a) internal {
        //Emits an event for the address that made a change and the new current balance.
        bytes32[] memory data = new bytes32[](2);
        data[0] = bytes32(uint(a));
        data[1] = bytes32(tokensFor(a));
        e.emitEvent("PosterRegistryUpdate", data, "");
    }

    function tokensFor(address a) internal view returns (uint) {
        return _balances[a];
    }
}
