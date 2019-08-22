pragma solidity ^0.5.0;

import "../base/Authorizable.sol";

/** @title EventEmitter
    @author Freydal
    @dev A central event emitting contract supporting the Kosu contract system.
*/
contract EventEmitter is Authorizable {

    // Generic Kosu Event
    event KosuEvent(string eventType, bytes32[] data, string stringData);

    /** @dev Event emitter instantiated with Authorizable.
        @notice Event emitter instantiated with Authorizable.
        @param auth AuthorizedAddresses deployed address.
    */
    constructor(address auth) Authorizable(auth) public {
    }

    /** @dev Emits a standard event from the Kosu contract system.  The events can be decoded though the javascript library.
        @notice Emits a standard event from the Kosu contract system.  The events can be decoded though the javascript library.
        @param eventType String name/type of event.
        @param data Bytes32 encoded data to be emitted.
        @param stringData String containing optional additional information.
    */
    function emitEvent(string calldata eventType, bytes32[] calldata data, string calldata stringData) external isAuthorized {
        emit KosuEvent(eventType, data, stringData);
    }
}



