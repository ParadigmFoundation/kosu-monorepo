pragma solidity ^0.5.0;

/** @title SubContract
    @author Freydal
*/
interface SubContract {

    /** @dev Defines interface for reporting maker argument json.
        @notice Defines interface for reporting maker argument json.
        @return JSON string representing maker arguments.
    */
    function makerArguments() external view returns (string memory);

    /** @dev Defines interface for reporting taker argument json.
        @notice Defines interface for reporting taker argument json.
        @return JSON string representing taker arguments.
    */
    function takerArguments() external view returns (string memory);

    /** @dev Defines interface for Kosu Order validation.
        @notice Defines interface for Kosu Order validation.
        @param makerData Kosu Order serialized based on makerArguments.
        @return boolean representing validity of order
    */
    function isValid(bytes32[] calldata makerData) external view returns (bool);

    /** @dev Defines interface for determining remaining amount available in Kosu order
        @notice Defines interface for determining remaining amount available in Kosu order
        @param makerData Kosu Order serialized based on makerArguments.

    */
    function amountRemaining(bytes32[] calldata makerData) external view returns (uint);

    /** @dev Defines interface to settlement of Kosu order
        @notice Defines interface to settlement of Kosu order
        @param makerData Kosu Order serialized based on makerArguments.
        @param takerData Arguments from taker of Kosu order serialized based on takerArguments.
        @return Number of asset successfully taken
    */
    function participate(bytes32[] calldata makerData, bytes32[] calldata takerData) external returns (bool);
}
