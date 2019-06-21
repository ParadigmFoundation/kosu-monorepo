pragma solidity ^0.5.0;

/** @title SubContract
    @author Freydal
*/
interface SubContract {

    /** @dev Defines interface for reporting argument json.
        @notice Defines interface for reporting argument json.
        @return JSON string representing arguments.
    */
    function arguments() external view returns (string memory);

    /** @dev Defines interface for Kosu Order validation.
        @notice Defines interface for Kosu Order validation.
        @param data Kosu Order serialized based on arguments.
        @return boolean representing validity of order
    */
    function isValid(bytes calldata data) external view returns (bool);

    /** @dev Defines interface for determining remaining amount available in Kosu order
        @notice Defines interface for determining remaining amount available in Kosu order
        @param data Kosu Order serialized based on arguments.
        @return Number of asset available to be taken
    */
    function amountRemaining(bytes calldata data) external view returns (uint);

    /** @dev Defines interface to settlement of Kosu order
        @notice Defines interface to settlement of Kosu order
        @param data Kosu Order serialized based on arguments.
        @return Number of asset successfully taken
    */
    function participate(bytes calldata data) external returns (bool);
}
