pragma solidity ^0.5.0;

/** @title IPosterRegistry
    @author Freydal
    @dev Defines methods for PosterRegistry to implement and to be accessed though the proxy.
*/
interface IPosterRegistry {
    /** @dev Interface method */
    function tokensContributed() external view returns (uint);
    /** @dev Interface method */
    function token() external view returns (address);
    /** @dev Interface method */
    function treasury() external view returns (address);
    /** @dev Interface method */
    function tokensRegisteredFor(address) external view returns (uint);
    /** @dev Interface method */
    function registerTokens(address, uint) external;
    /** @dev Interface method */
    function releaseTokens(address, uint) external;
}
