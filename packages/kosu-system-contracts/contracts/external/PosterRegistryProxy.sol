pragma solidity ^0.5.0;

import "../poster/IPosterRegistry.sol";
import "../base/Authorizable.sol";

/** @title PosterRegistryProxy
    @author Freydal
*/
contract PosterRegistryProxy is Authorizable {

    IPosterRegistry registry;

    /** @dev Creates a Proxy for a PosterRegistry. Accepts an initial implementation that can be overwritten if a replacement is deployed.
        @notice Creates a Proxy for a PosterRegistry. Accepts an initial implementation that can be overwritten if a replacement is deployed.
        @param implementation deployed implementation of PosterRegistry.
        @param auth AuthorizedAddresses deployed address.
    */
    constructor(address implementation, address auth) Authorizable(auth) public {
        registry = IPosterRegistry(implementation);
    }

    /** @dev Set a new PosterRegistry implementation if a replacement is deployed.
        @notice Set a new PosterRegistry implementation if a replacement is deployed.
        @param implementation Deployed address for replacement PosterRegistry implementation.
    */
    function setImplementation(address implementation) isAuthorized public {
        registry = IPosterRegistry(implementation);
    }

    /** @dev Reads the current registries tokensContributed.
        @notice Reads the current registries tokensContributed.
        @return Total number of tokens contributed the the current registry.
    */
    function tokensContributed() public view returns (uint) {
        return registry.tokensContributed();
    }

    /** @dev Reads the current registries token.
        @notice Reads the current registries token.
        @return Address of configured ERC20 token.
    */
    function token() public view returns (address) {
        return registry.token();
    }

    /** @dev Reads the current registries Treasury address.
        @notice Reads the current registries Treasury address.
        @return Address of configured treasury.
    */
    function treasury() public view returns (address) {
        return registry.treasury();
    }

    /** @dev Reads the current registries tokens registered for the supplied address.
        @notice Reads the current registries tokens registered for the supplied address.
        @param a Address of user
        @return The current number of tokens contributed by the address.
    */
    function tokensRegisteredFor(address a) public view returns (uint) {
        return registry.tokensRegisteredFor(a);
    }

    /** @dev Calls registerTokens on the current registry.
        @notice Calls registerTokens on the current registry.
        @param amount Desired amount of tokens to register.
    */
    function registerTokens(uint amount) external {
        registry.registerTokens(msg.sender, amount);
    }

    /** @dev Calls releaseTokens for the current registry.
        @notice Calls releaseTokens for the current registry.
        @param amount Desired amount of tokens to release.
    */
    function releaseTokens(uint amount) external {
        registry.releaseTokens(msg.sender, amount);
    }
}



