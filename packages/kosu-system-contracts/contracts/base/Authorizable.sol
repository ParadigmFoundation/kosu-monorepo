pragma solidity ^0.5.0;

import "../access_control/AuthorizedAddresses.sol";

/** @title Authorizable
    @author Freydal
    @dev Implements a modifier to verify authorization with the AuthorizedAddresses contract
*/
contract Authorizable {

    // Contract storing system level permissions
    AuthorizedAddresses authorizedAddress;

    /** @dev Initializes contract with deployed AuthorizedAddresses contract.
        @notice Initializes contract with deployed AuthorizedAddresses contract.
        @param authorizedAddressesAddress Deployed AuthorizedAddresses address.
    */
    constructor(address authorizedAddressesAddress) public {
        authorizedAddress = AuthorizedAddresses(authorizedAddressesAddress);
    }

    /** @dev Ensures msg.sender is authorized within the AuthorizedAddresses contract
        @notice Ensures msg.sender is authorized within the AuthorizedAddresses contract
    */
    modifier isAuthorized() {
        require(authorizedAddress.isAddressAuthorized(msg.sender), "unauthorized");
        _;
    }
}
