pragma solidity ^0.5.0;

import "@kosu/subcontract-sdk/contracts/SubContract.sol";

/** @title OrderGateway
    @author Freydal
*/
contract OrderGateway {

    event Participation(address indexed subContract, string id);

    /** @dev Creates a new OrderGateway
        @notice Creates a new OrderGateway
    */
    constructor() public {
    }

    /** @dev Calls participate on the provided subContract.
        @notice Calls participate on the provided subContract.
        @param subContract Address of contract implementing the SubContract interface.
        @param id Id of order assigned when passing though the OrderStream
        @param makerData Encoded maker values for Order encoded based on the makerArguments.
        @param takerData Encoded taker values for Order encoded based on the takerArguments.
        @return Boolean representing success of transaction.
    */
    function participate(address subContract, string memory id, bytes32[] memory makerData, bytes32[] memory takerData) public returns (bool) {
        emit Participation(subContract, id);
        return SubContract(subContract).participate(makerData, takerData);
    }

    /** @dev Calls isValid on provided subContract.
        @notice Calls isValid on provided subContract.
        @param subContract Address of contract implementing the SubContract interface.
        @param makerData Encoded maker values for Order encoded based on the makerArguments.
        @return Boolean representing the validity of makerData
    */
    function isValid(address subContract, bytes32[] memory makerData) public view returns (bool) {
        return SubContract(subContract).isValid(makerData);
    }

    /** @dev Calls amountRemaining on provided subContract.
        @notice Calls amountRemaining on provided subContract.
        @param subContract Address of contract implementing the SubContract interface.
        @param makerData Encoded maker values for Order encoded based on the makerArguments.
        @return Quantity of available asset for Order encoded in makerData.
    */
    function amountRemaining(address subContract, bytes32[] memory makerData) public view returns (uint) {
        return SubContract(subContract).amountRemaining(makerData);
    }

    /** @dev Calls makerArguments on provided subContract.
        @notice Calls makerArguments on provided subContract.
        @param subContract Address of contract implementing the SubContract interface.
        @return String encoded JSON representation of subContract maker arguments
    */
    function makerArguments(address subContract) public view returns (string memory) {
        return SubContract(subContract).makerArguments();
    }

    /** @dev Calls takerArguments on provided subContract.
        @notice Calls takerArguments on provided subContract.
        @param subContract Address of contract implementing the SubContract interface.
        @return String encoded JSON representation of subContract taker arguments
    */
    function takerArguments(address subContract) public view returns (string memory) {
        return SubContract(subContract).takerArguments();
    }
}
