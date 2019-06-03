pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

/** @title IValidatorRegistry
    @author Freydal
*/
interface IValidatorRegistry {

    //The possible statuses of a Validator Listing
    enum Status {
        NULL,
        PENDING,
        ACCEPTED,
        CHALLENGED,
        EXITING
    }

    //Listing structure
    struct Listing {
        Status status;
        uint stakedBalance;
        uint applicationBlock;
        uint confirmationBlock;
        uint exitBlock;
        int rewardRate;
        uint lastRewardBlock;
        bytes32 tendermintPublicKey;
        address owner;
        uint currentChallenge;
        string details;
    }

    struct Challenge {
        bytes32 listingKey;
        address challenger;
        uint voterTotal;
        uint balance;
        uint pollId;
        uint challengeEnd;
        bool finalized;
        bool passed;
        string details;
        Listing listingSnapshot;
    }

    /** @dev Interface method */
    function applicationPeriod() external view returns (uint);

    /** @dev Interface method */
    function commitPeriod() external view returns (uint);

    /** @dev Interface method */
    function challengePeriod() external view returns (uint);

    /** @dev Interface method */
    function exitPeriod() external view returns (uint);

    /** @dev Interface method */
    function rewardPeriod() external view returns (uint);

    /** @dev Interface method */
    function minimumBalance() external view returns (uint);

    /** @dev Interface method */
    function stakeholderCut() external view returns (uint);

    /** @dev Interface method */
    function treasury() external view returns (address);

    /** @dev Interface method */
    function voting() external view returns (address);

    /** @dev Interface method */
    function kosuToken() external view returns (address);

    /** @dev Interface method */
    function maxRewardRate() external view returns (uint);

    /** @dev Interface method */
    function listingKeys() external view returns (bytes32[] memory);

    /** @dev Interface method */
    function getListing(bytes32) external view returns (Listing memory);
//
//    /** @dev Interface method */
//    function getListings(bytes32[] calldata) external view returns (Listing[] memory);
//
//    /** @dev Interface method */
//    function getAllListings() external view returns (Listing[] memory);
//
    /** @dev Interface method */
    function getChallenge(uint) external view returns (Challenge memory);
//
//    /** @dev Interface method */
//    function getChallenges(uint[] calldata) external view returns (Challenge[] memory);
//
//    /** @dev Interface method */
//    function getAllChallenges() external view returns (Challenge[] memory);

    /** @dev Interface method */
    function registerListing(address, bytes32, uint, int, string calldata) external;

    /** @dev Interface method */
    function challengeListing(address, bytes32, string calldata) external;

    /** @dev Interface method */
    function claimWinnings(address, uint) external;

    /** @dev Interface method */
    function claimRewards(bytes32) external;

    /** @dev Interface method */
    function resolveChallenge(bytes32) external;

    /** @dev Interface method */
    function confirmListing(address, bytes32) external;

    /** @dev Interface method */
    function initExit(address, bytes32) external;

    /** @dev Interface method */
    function finalizeExit(address, bytes32) external;
}
