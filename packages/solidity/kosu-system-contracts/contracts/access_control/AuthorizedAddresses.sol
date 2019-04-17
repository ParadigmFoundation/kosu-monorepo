pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/** @title AuthorizedAddresses
    @author Freydal
*/
contract AuthorizedAddresses is Ownable {

    // Mapping storing address permissions
    mapping(address => bool) private authorizedAddresses;

    /** @dev Constructor initializes with the creator permission set to true.
        @notice Constructor initializes with the creator permission set to true.
    */
    constructor() Ownable() public {
        authorizedAddresses[owner()] = true;
    }

    /** @dev Authorizes the address by setting the mapping value to true
        @notice Authorizes the address by setting the mapping value to true
        @param a Address to authorize
    */
    function authorizeAddress(address a) public {
        require(authorizedAddresses[msg.sender]);
        authorizedAddresses[a] = true;
    }

    /** @dev Unauthorizes the address by setting the mapping value to false
        @notice Unauthorizes the address by setting the mapping value to false
        @param a Address to unauthorize
    */
    function unauthorizeAddress(address a) public {
        require(authorizedAddresses[msg.sender]);
        authorizedAddresses[a] = false;
    }

    /** @dev Verify if address is authorized by reading contract mapping
        @notice Verify if address is authorized by reading contract mapping
        @param a Address to get authorized value.
        @return boolean
    */
    function isAddressAuthorized(address a) public view returns (bool) {
        return authorizedAddresses[a];
    }
}
