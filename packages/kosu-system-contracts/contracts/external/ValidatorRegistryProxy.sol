pragma solidity ^0.5.0;

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
    function validators() external view returns (bytes32[] memory) {
        return registry.validators();
    }

    /** @dev Reads the current registries listing entry for provided key.
        @notice Reads the current registries listing entry for provided key.
        @param _pubKey hex encoded tendermint public used as listing mapping key
        @return TODO currently returing some data that was used in the past.  will need a pass to update output
    */
    function getListing(bytes32 _pubKey) external view returns
        (IValidatorRegistry.Status status, uint applicationBlock, bytes32 tendermintPublicKey, address owner)
    {
        return registry.getListing(_pubKey);
    }

    /** @dev Executes registerListing on the current registry.
        @notice Executes registerListing on the current registry.
        @param _pubKey hex encoded tendermint public used as listing mapping key
        @param _tokensToStake The number of tokes at stake if the order is challenged
        @param _rewardRate The rate tokens are minted or destroyed over the active listings reward periods
    */
    function registerListing(bytes32 _pubKey, uint _tokensToStake, int _rewardRate) external {
        registry.registerListing(msg.sender, _pubKey, _tokensToStake, _rewardRate);
    }

    /** @dev Executes challenge on the current registry.
        @notice Executes challenge on the current registry.
        @param _pubKey hex encoded tendermint public used as listing mapping key
    */
    function challengeListing(bytes32 _pubKey) external {
        registry.challengeListing(msg.sender, _pubKey);
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
