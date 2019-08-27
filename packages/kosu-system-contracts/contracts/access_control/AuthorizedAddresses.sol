pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/** @title AuthorizedAddresses
    @author Freydal
    @dev Common registry of system contract addresses authorized to access internal methods.
*/
contract AuthorizedAddresses is Ownable {

    // Mapping storing address permissions
    mapping(address => bool) private authorizedAddresses;

    /** @dev Initializes contract with the creators permissions set to true.
        @notice Initializes contract with the creators permissions set to true.
    */
    constructor() Ownable() public {
        authorizedAddresses[owner()] = true;
    }

    /** @dev Authorizes the address by setting the mapping value to true.
        @notice Authorizes the address by setting the mapping value to true.
        @param a Address to authorize
    */
    function authorizeAddress(address a) public {
        require(authorizedAddresses[msg.sender]);
        authorizedAddresses[a] = true;
    }

    /** @dev Disables the address previous authorization by setting the mapping value to false.
        @notice Disables the address previous authorization by setting the mapping value to false
        @param a Address to unauthorize
    */
    function unauthorizeAddress(address a) public {
        require(authorizedAddresses[msg.sender]);
        authorizedAddresses[a] = false;
    }

    /** @dev Verify address authorization.
        @notice Verify address authorization.
        @param a Address to authorize.
        @return Address authorization
    */
    function isAddressAuthorized(address a) public view returns (bool) {
        return authorizedAddresses[a];
    }
}
