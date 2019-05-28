pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "../validator/IValidatorRegistry.sol";
import "../base/Authorizable.sol";

/** @title ValidatorRegistryProxy
    @author Freydal
*/
contract ValidatorRegistryProxy is Authorizable {

    IValidatorRegistry registry;

    /** @dev Creates a Proxy for a ValidatorRegistry. Accepts an initial implementation that can be overwritten if a replacement is deployed.
        @notice Creates a Proxy for a ValidatorRegistry. Accepts an initial implementation that can be overwritten if a replacement is deployed.
        @param _registry Current deployed address for ValidatorRegistry implementation.
        @param auth AuthorizedAddresses deployed address.
    */
    constructor(address _registry, address auth) Authorizable(auth) public {
        registry = IValidatorRegistry(_registry);
    }

    /** @dev Set a new ValidatorRegistry if a replacement is deployed.
        @notice Set a new ValidatorRegistry if a replacement is deployed.
        @param implementation Deployed address for replacement ValidatorRegistry implementation.
    */
    function setImplementation(address implementation) isAuthorized public {
        registry = IValidatorRegistry(implementation);
    }

    /** @dev Reads the current registries applicationPeriod.
        @notice Reads the current registries applicationPeriod.
        @return Length of applicationPeriod in blocks.
    */
    function applicationPeriod() public view returns (uint) {
        return registry.applicationPeriod();
    }

    /** @dev Reads the current registries commitPeriod.
        @notice Reads the current registries commitPeriod.
        @return Length of commitPeriod in blocks.
    */
    function commitPeriod() public view returns (uint) {
        return registry.commitPeriod();
    }

    /** @dev Reads the current registries challengePeriod.
        @notice Reads the current registries challengePeriod.
        @return Length of challengePeriod in blocks.
    */
    function challengePeriod() public view returns (uint) {
        return registry.challengePeriod();
    }

    /** @dev Reads the current registries exitPeriod.
        @notice Reads the current registries exitPeriod.
        @return Length of exitPeriod in blocks.
    */
    function exitPeriod() public view returns (uint) {
        return registry.exitPeriod();
    }

    /** @dev Reads the current registries rewardPeriod.
        @notice Reads the current registries rewardPeriod.
        @return Length of rewardPeriod in blocks.
    */
    function rewardPeriod() public view returns (uint) {
        return registry.rewardPeriod();
    }

    /** @dev Reads the current registries minimumBalance
        @notice Reads the current registries minimumBalance
        @return Minimum balance for listings and challenges.
    */
    function minimumBalance() public view returns (uint) {
        return registry.minimumBalance();
    }

    /** @dev Reads the current registries stakeholderCut
        @notice Reads the current registries stakeholderCut
        @return Number of tokens the stakeholder gets after a challenge
    */
    function stakeholderCut() public view returns (uint) {
        return registry.stakeholderCut();
    }

    /** @dev Reads the current registries treasury contract address.
        @notice Reads the current registries treasury contract address.
        @return Address of Treasury
    */
    function treasury() external view returns (address) {
        return registry.treasury();
    }

    /** @dev Reads the current registries voting contract address.
        @notice Reads the current registries voting contract address.
        @return Address of Voting.
    */
    function voting() external view returns (address) {
        return registry.voting();
    }

    /** @dev Reads the current registries token contract address.
        @notice Reads the current registries token contract address.
        @return Address of ERC20 token used.
    */
    function kosuToken() external view returns (address) {
        return registry.kosuToken();
    }

    /** @dev Calculate the maximum KosuToken a validator can generate for the current registry
        @notice Calculate the maximum KosuToken a validator can generate for the current registry
        @return Maximum KosuToken a validator can generate
    */
    function maxRewardRate() external view returns (uint) {
        return registry.maxRewardRate();
    }

    /** @dev Reads the current registries current validator keys.
        @notice Reads the current registries current validator keys.
        @return An array of bytes32 hex encoded tendermint public keys.
    */
    function listingKeys() external view returns (bytes32[] memory) {
        return registry.listingKeys();
    }

    /** @dev Reads the current registries listing entry for provided key.
        @notice Reads the current registries listing entry for provided key.
        @param _pubKey hex encoded tendermint public used as listing mapping key
        @return The listing
    */
    function getListing(bytes32 _pubKey) external view returns
    (IValidatorRegistry.Listing memory)
    {
        return registry.getListing(_pubKey);
    }

    /** @dev Reads the current registries listing entries
        @notice Reads the current registries listing entries
        @return The listings
    */
    function getListings() external view returns
    (IValidatorRegistry.Listing[] memory)
    {
        return registry.getListings();
    }

    /** @dev Reads the current registries listing entry for provided key.
        @notice Reads the current registries listing entry for provided key.
        @param challengeId hex encoded tendermint public used as listing mapping key
        @return The challenge
    */
    function getChallenge(uint challengeId) external view returns
    (IValidatorRegistry.Challenge memory)
    {
        return registry.getChallenge(challengeId);
    }

    /** @dev Executes registerListing on the current registry.
        @notice Executes registerListing on the current registry.
        @param _pubKey hex encoded tendermint public used as listing mapping key
        @param _tokensToStake The number of tokes at stake if the order is challenged
        @param _rewardRate The rate tokens are minted or destroyed over the active listings reward periods
        @param _details A string value to represent support for claim (commonly an external link)
    */
    function registerListing(bytes32 _pubKey, uint _tokensToStake, int _rewardRate, string calldata _details) external {
        registry.registerListing(msg.sender, _pubKey, _tokensToStake, _rewardRate, _details);
    }

    /** @dev Executes challenge on the current registry.
        @notice Executes challenge on the current registry.
        @param _pubKey hex encoded tendermint public used as listing mapping key
        @param _details A string value to represent support for claim (commonly an external link)
    */
    function challengeListing(bytes32 _pubKey, string calldata _details) external {
        registry.challengeListing(msg.sender, _pubKey, _details);
    }

    /** @dev Executes resolveChallenge on the current registry.
        @notice Executes resolveChallenge on the current registry.
        @param _pubKey hex encoded tendermint public used as listing mapping key
    */
    function resolveChallenge(bytes32 _pubKey) public {
        registry.resolveChallenge(_pubKey);
    }

    /** @dev Executes claimWinnings on the current registry.
        @notice Executes claimWinnings on the current registry.
        @param challengeId Id of challenge user may have tokens rewards in.
    */
    function claimWinnings(uint challengeId) public {
        registry.claimWinnings(msg.sender, challengeId);
    }

    /** @dev Executes claimRewards on the current registry.
        @notice Executes claimRewards on the current registry.
        @param _pubKey Public key of listing that rewards need to be processed for
    */
    function claimRewards(bytes32 _pubKey) public {
        registry.claimRewards(_pubKey);
    }

    /** @dev Executes confirmListing on the current registry.
        @notice Executes confirmListing on the current registry.
        @param _pubKey hex encoded tendermint public used as listing mapping key
    */
    function confirmListing(bytes32 _pubKey) external {
        registry.confirmListing(msg.sender, _pubKey);
    }

    /** @dev Executes initExit on the current registry.
        @notice Executes initExit on the current registry.
        @param _pubKey hex encoded tendermint public used as listing mapping key
    */
    function initExit(bytes32 _pubKey) external {
        registry.initExit(msg.sender, _pubKey);
    }

    /** @dev Executes finalizeExit on the current registry.
        @notice Executes finalizeExit on the current registry.
        @param _pubKey hex encoded tendermint public used as listing mapping key
    */
    function finalizeExit(bytes32 _pubKey) external {
        registry.finalizeExit(msg.sender, _pubKey);
    }
}
