pragma solidity ^0.5.0;

import "../access_control/AuthorizedAddresses.sol";

/** @title Authorizable
    @author Freydal
*/
contract Authorizable {

    //Contract storing system level permissions
    AuthorizedAddresses authorizedAddress;

    /** @dev Initializes contract with deployed AuthorizedAddresses contract.
        @notice Initializes contract with deployed AuthorizedAddresses contract.
        @param authorizedAddressesAddress Deployed AuthorizedAddresses address.
    */
    constructor(address authorizedAddressesAddress) public {
        authorizedAddress = AuthorizedAddresses(authorizedAddressesAddress);
    }

    /** @dev Ensures msg.sender is from an address enabled for system level access.
    */
    modifier isAuthorized() {
        require(authorizedAddress.isAddressAuthorized(msg.sender));
        _;
    }
}
