// File: openzeppelin-solidity/contracts/ownership/Ownable.sol

pragma solidity ^0.5.0;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev The Ownable constructor sets the original `owner` of the contract to the sender
     * account.
     */
    constructor () internal {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }

    /**
     * @return the address of the owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(isOwner());
        _;
    }

    /**
     * @return true if `msg.sender` is the owner of the contract.
     */
    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }

    /**
     * @dev Allows the current owner to relinquish control of the contract.
     * @notice Renouncing to ownership will leave the contract without an owner.
     * It will not be possible to call the functions with the `onlyOwner`
     * modifier anymore.
     */
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0));
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

// File: contracts/access_control/AuthorizedAddresses.sol

pragma solidity ^0.5.0;


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

// File: contracts/base/Authorizable.sol

pragma solidity ^0.5.0;


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

// File: contracts/event/EventEmitter.sol

pragma solidity ^0.5.0;


/** @title EventEmitter
    @author Freydal
*/
contract EventEmitter is Authorizable {

    //Generic event which can be decoded in Javascript via internal library.
    event ParadigmEvent(string eventType, bytes32[] data);

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
    function emitEvent(string calldata eventType, bytes32[] calldata data) external isAuthorized {
        emit ParadigmEvent(eventType, data);
    }
}
