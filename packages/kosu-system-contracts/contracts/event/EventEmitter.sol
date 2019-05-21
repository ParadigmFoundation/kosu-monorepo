pragma solidity ^0.5.0;

import "../base/Authorizable.sol";

/** @title EventEmitter
    @author Freydal
*/
contract EventEmitter is Authorizable {

    //Generic event which can be decoded in Javascript via internal library.
    event KosuEvent(string eventType, bytes32[] data, string stringData);

    /** @dev Event emitter instantiated with Authorizable.
        @notice Event emitter instantiated with Authorizable.
        @param auth AuthorizedAddresses deployed address.
    */
    constructor(address auth) Authorizable(auth) public {
    }

    /** @dev Emit generic events which can have decoding exposed though javascript library.
        @notice Emit generic events which can have decoding exposed though javascript library.
        @param eventType String name/type of event
        @param data Bytes32 encoded data to be emitted from a centralized location.
    */
    function emitEvent(string calldata eventType, bytes32[] calldata data, string calldata stringData) external isAuthorized {
        emit KosuEvent(eventType, data, stringData);
    }
}



