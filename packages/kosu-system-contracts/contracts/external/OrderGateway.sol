pragma solidity ^0.5.0;

import "@kosu/subcontract-sdk/contracts/SubContract.sol";

/** @title OrderGateway
    @author Freydal
    @dev Serves as a message router for SubContract implementations.  Passing SubContract method calls through the gateway allows for a single watch point for incoming participate transactions.
*/
contract OrderGateway {

    /** @dev Creates a new OrderGateway
        @notice Creates a new OrderGateway
    */
    constructor() public {
    }

    /** @dev Forwards function calls of participate to the provided subContract address.
        @notice Forwards function calls of participate to the provided subContract address.
        @param subContract Address of contract implementing the SubContract interface.
        @param data Encoded values for Order encoded in accordance to the arguments exposed by the provided subContract.
        @return Boolean representing result of transaction.
    */
    function participate(address subContract, bytes memory data) public returns (bool) {
        return SubContract(subContract).participate(data);
    }

    /** @dev Forwards function calls of isValid to the provided subContract address.
        @notice Forwards function calls of isValid to the provided subContract address.
        @param subContract Address of contract implementing the SubContract interface.
        @param data Encoded values for Order encoded in accordance to the arguments exposed by the provided subContract.
        @return Boolean representing the validity of data.
    */
    function isValid(address subContract, bytes memory data) public view returns (bool) {
        return SubContract(subContract).isValid(data);
    }

    /** @dev Forwards function calls of amountRemaining to the provided subContract address.
        @notice Forwards function calls of amountRemaining to the provided subContract address.
        @param subContract Address of contract implementing the SubContract interface.
        @param data Encoded values for Order encoded in accordance to the arguments exposed by the provided subContract.
        @return Quantity of available asset for Order encoded in data.
    */
    function amountRemaining(address subContract, bytes memory data) public view returns (uint) {
        return SubContract(subContract).amountRemaining(data);
    }

    /** @dev Forwards function calls of arguments to the provided subContract address.
        @notice Forwards function calls of arguments to the provided subContract address.
        @param subContract Address of contract implementing the SubContract interface.
        @return JSON string providing expected structure of subContract input data.
    */
    function arguments(address subContract) public view returns (string memory) {
        return SubContract(subContract).arguments();
    }
}
