pragma solidity ^0.5.0;

import "@kosu/subcontract-sdk/contracts/SubContract.sol";

/** @title OrderGateway
    @author Freydal
    @dev Access SubContract implementation's methods to participate in trades and check order status.
*/
contract OrderGateway {

    /** @dev Creates a new OrderGateway
        @notice Creates a new OrderGateway
    */
    constructor() public {
    }

    /** @dev Calls participate on the provided subContract.
        @notice Calls participate on the provided subContract.
        @param subContract Address of contract implementing the SubContract interface.
        @param data Encoded maker values for Order encoded based on the arguments.
        @return Boolean representing success of transaction.
    */
    function participate(address subContract, bytes memory data) public returns (bool) {
        return SubContract(subContract).participate(data);
    }

    /** @dev Calls isValid on provided subContract.
        @notice Calls isValid on provided subContract.
        @param subContract Address of contract implementing the SubContract interface.
        @param data Encoded maker values for Order encoded based on the makerArguments.
        @return Boolean representing the validity of makerData
    */
    function isValid(address subContract, bytes memory data) public view returns (bool) {
        return SubContract(subContract).isValid(data);
    }

    /** @dev Calls amountRemaining on provided subContract.
        @notice Calls amountRemaining on provided subContract.
        @param subContract Address of contract implementing the SubContract interface.
        @param data Encoded maker values for Order encoded based on the makerArguments.
        @return Quantity of available asset for Order encoded in makerData.
    */
    function amountRemaining(address subContract, bytes memory data) public view returns (uint) {
        return SubContract(subContract).amountRemaining(data);
    }

    /** @dev Calls arguments on provided subContract.
        @notice Calls arguments on provided subContract.
        @param subContract Address of contract implementing the SubContract interface.
        @return String encoded JSON representation of subContract maker arguments
    */
    function arguments(address subContract) public view returns (string memory) {
        return SubContract(subContract).arguments();
    }
}
