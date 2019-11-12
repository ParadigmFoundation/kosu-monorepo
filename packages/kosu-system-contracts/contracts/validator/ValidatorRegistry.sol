pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../event/EventEmitter.sol";
import "../treasury/Treasury.sol";
import "../voting/Voting.sol";

/** @title ValidatorRegistry
    @author Freydal
    @dev Stores registry of validator listings and provides functionality to curate through proposals and challenges.
*/
contract ValidatorRegistry is Ownable {
    using SafeMath for uint;

    enum Status {
        NULL,
        PENDING,
        ACCEPTED,
        CHALLENGED,
        EXITING
    }

    // Listing structure
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

    struct MaxList {
        bytes32 next;
        int value;
        bytes32 self;
        bytes32 previous;
    }

    uint public applicationPeriod;
    uint public commitPeriod;
    uint public challengePeriod;
    uint public exitPeriod;
    uint public rewardPeriod;
    uint public exitLockPeriod;
    uint public winningVoteLockPeriod;
    uint public losingVoteLockPeriod;
    uint public minimumBalance = 500 ether;
    uint public stakeholderProportionPPM = 300000;
    uint public minMaxGenerator = 1 ether / 10;
    uint public maxGeneratorGrowth = 5 ether / 1000;
    uint public maxMaxGenerator = 2 ether / 10;
    Treasury public treasury;
    Voting public voting;
    KosuToken public kosuToken;
    mapping(bytes32 => Listing) private _listings;
    mapping(uint => Challenge) private _challenges;
    uint public nextChallenge = 1;
    bytes32[] public _listingKeys;
    EventEmitter private eventEmitter;
    bytes32 _maxGenerator;
    mapping(bytes32 => MaxList)_generators;

    uint private MILLION = 1000000;

    /** @dev Initializes the ValidatorRegistry with chain based configuration for pacing and deployed addresses.
        @notice Initializes the ValidatorRegistry with chain based configuration for pacing and deployed addresses.
        @param _treasuryAddress Deployed Treasury address.
        @param _votingAddress Deployed Voting address.
        @param _events Deployed EventEmitter address.
        @param _applicationPeriod Initial application period (in blocks) for pending listings.
        @param _commitPeriod Number of blocks after challenge initiated in which votes can be committed.
        @param _challengePeriod Number of blocks a challenge lasts before being finalized.
        @param _exitPeriod Number of blocks exiting listings must wait before claiming stake.
        @param _rewardPeriod The frequency (in blocks) with which validator rewards may be issued.
        @param _exitLockPeriod Number of blocks tokens will be locked after a successful exit.
        @param _winningVoteLockPeriod Number of blocks winning voters will have tokens locked after a challenge has been resolved.
        @param _losingVoteLockPeriod Number of blocks losing voters will have tokens locked after a challenge has been resolved.
    */
    constructor(address payable _treasuryAddress, address _votingAddress, address _events, uint _applicationPeriod, uint _commitPeriod, uint _challengePeriod, uint _exitPeriod, uint _rewardPeriod, uint _exitLockPeriod, uint _winningVoteLockPeriod, uint _losingVoteLockPeriod) public Ownable() {
        treasury = Treasury(_treasuryAddress);
        voting = Voting(_votingAddress);
        kosuToken = treasury.kosuToken();
        eventEmitter = EventEmitter(_events);
        applicationPeriod = _applicationPeriod;
        commitPeriod = _commitPeriod;
        challengePeriod = _challengePeriod;
        exitPeriod = _exitPeriod;
        rewardPeriod = _rewardPeriod;
        exitLockPeriod = _exitLockPeriod; //TODO initialize with this
        winningVoteLockPeriod = _winningVoteLockPeriod;
        losingVoteLockPeriod = _losingVoteLockPeriod;
    }

    /** @dev Expose the list of active listing keys.
        @notice Expose the list of active listing keys.
        @return An array of hex encoded tendermint keys.
    */
    function listingKeys() public view returns (bytes32[] memory) {
        return _listingKeys;
    }

    /** @dev Calculate the maximum KosuToken a validator can generate.
        @notice Calculate the maximum KosuToken a validator can generate.
        @return Maximum KosuToken a validator can generate per period.
    */
    function maxRewardRate() public view returns (uint) {
        uint currentMax = uint(_generators[_maxGenerator].value);
        if (currentMax == 0) {
            return minMaxGenerator;
        }
        uint max = currentMax.add(maxGeneratorGrowth);
        if (max < minMaxGenerator) {
            return minMaxGenerator;
        } else if (max > maxMaxGenerator) {
            return maxMaxGenerator;
        }
        return max;
    }

    /** @dev Expose listing data for given public key.
        @notice Expose listing data for given public key.
        @param pubKey Hex encoded tendermint public key.
        @return The listing structure corresponding to the provided key.
    */
    function getListing(bytes32 pubKey) public view returns (Listing memory) {
        return _listings[pubKey];

    }

    /** @dev Expose several listings provided multiple public keys.
        @notice Expose several listings provided multiple public keys.
        @param pubKeys Hex encoded Tendermint public keys to retrieve.
        @return The array of listing structures corresponding to the provided keys.
    */
    function getListings(bytes32[] memory pubKeys) public view returns (Listing[] memory) {
        Listing[] memory listings = new Listing[](pubKeys.length);
        for (uint i = 0; i < pubKeys.length; i++) {
            listings[i] = _listings[pubKeys[i]];
        }
        return listings;
    }

    /** @dev Expose all listings in the registry.
        @notice Expose all listings in the registry.
        @return An array of all listings in the registry.
    */
    function getAllListings() public view returns (Listing[] memory) {
        Listing[] memory listings = new Listing[](_listingKeys.length);
        for (uint i = 0; i < _listingKeys.length; i++) {
            listings[i] = _listings[_listingKeys[i]];
        }
        return listings;
    }

    /** @dev Expose challenge data for a given ID.
        @notice Expose challenge data for a given ID.
        @param challengeId The ID to retrieve challenge data for.
        @return The challenge indicated by the provided ID.
    */
    function getChallenge(uint challengeId) public view returns (Challenge memory) {
        return _challenges[challengeId];

    }

    /** @dev Expose multiple challenges by ids.
        @notice Expose multiple challenges by ids.
        @param challengeIds challenge ids to read.
        @return Array of requested challenges
    */
    function getChallenges(uint[] memory challengeIds) public view returns (Challenge[] memory) {
        Challenge[] memory challenges = new Challenge[](challengeIds.length);
        for (uint i = 0; i < challengeIds.length; i++) {
            challenges[i] = _challenges[challengeIds[i]];
        }
        return challenges;
    }

    /** @dev Expose all challenges
        @notice Expose all challenges
        @return Array of all challenges
    */
    function getAllChallenges() public view returns (Challenge[] memory) {
        uint challengeCount = nextChallenge - 1;
        Challenge[] memory challenges = new Challenge[](challengeCount);
        for (uint i = 0; i < challengeCount; i++) {
            challenges[i] = _challenges[i + 1];
        }
        return challenges;
    }

    /** @dev Register a listing.  The listing will require the deposit of the at least the minimum stake balance.  The tokens will now be vulnerable to be challenged but are not providing any valdator power.
        @notice Register a listing.  The listing will require the deposit of the at least the minimum stake balance.  The tokens will now be vulnerable to be challenged but are not providing any valdator power.
        @param tendermintPublicKey Hex encoded tendermint public key.
        @param tokensToStake The number of tokes at stake if the order is challenged.
        @param rewardRate The rate tokens are minted or destroyed over the active listings reward periods (ether/rewardPeriod).
        @param details A string value to represent support for claim (commonly an external link).
    */
    function registerListing(bytes32 tendermintPublicKey, uint tokensToStake, int rewardRate, string calldata details) external {
        //tokensToStake must be greater than or equal to _minimumBalance
        require(tokensToStake >= minimumBalance, "must register with at least minimum balance");

        //Claim tokens from the treasury
        treasury.claimTokens(msg.sender, tokensToStake);

        //Load listing
        Listing storage listing = _listings[tendermintPublicKey];

        //Must not overwrite an existing listing
        require(listing.status == Status.NULL, "listing with public key exists");

        if (rewardRate > 0) {
            require(uint(rewardRate) <= maxRewardRate(), "reward rate exceeds max");
        }

        //Set listing values
        listing.status = Status.PENDING;
        listing.stakedBalance = tokensToStake;
        listing.applicationBlock = block.number;
        listing.tendermintPublicKey = tendermintPublicKey;
        listing.owner = msg.sender;
        listing.rewardRate = rewardRate;
        listing.details = details;

        //Add new listing public key to key list
        _listingKeys.push(tendermintPublicKey);

        //Emit event
        _emitValidatorRegistered(listing.applicationBlock, listing.tendermintPublicKey, listing.owner, rewardRate, listing.details);
    }

    /** @dev Challenge a registered listing.  Stakes a balance of tokens matching the validator being challenged.  Creates a poll through the voting contract of tokens holders to determine a winner.
        @notice Challenge a registered listing.  Stakes a balance of tokens matching the validator being challenged.  Creates a poll through the voting contract of tokens holders to determine a winner.
        @param tendermintPublicKey Hex encoded tendermint public key.
        @param details A string value to represent support for claim (commonly an external link).
    */
    function challengeListing(bytes32 tendermintPublicKey, string memory details) public {
        //Load listing
        Listing storage listing = _listings[tendermintPublicKey];

        //Challenge pending and accepted listings.  -- More valid status may be added.
        require(listing.status == Status.PENDING || listing.status == Status.ACCEPTED || listing.status == Status.EXITING, "listing is not pending, accepted or exiting");

        //Ensure earns and burns are up to date  return if a touch and remove was executed
        _processRewards(listing);
        if (listing.status == Status.NULL) return;

        //Create challenge
        Challenge storage challenge = _challenges[nextChallenge];

        //Pull tokens out of the treasury
        treasury.claimTokens(msg.sender, listing.stakedBalance);

        //Initialize challenge.
        challenge.balance = listing.stakedBalance;
        challenge.challenger = msg.sender;
        challenge.listingKey = listing.tendermintPublicKey;
        challenge.challengeEnd = block.number + challengePeriod;
        challenge.pollId = voting.createPoll(block.number + commitPeriod, block.number + challengePeriod, winningVoteLockPeriod, losingVoteLockPeriod);
        challenge.details = details;
        challenge.listingSnapshot = listing;

        //Update the listing
        listing.status = Status.CHALLENGED;
        listing.currentChallenge = nextChallenge;

        //Increment challengeId
        nextChallenge++;

        //Emit challenged event
        _emitValidatorChallenged(listing.tendermintPublicKey, listing.owner, challenge.challenger, listing.currentChallenge, challenge.pollId, challenge.details);
    }

    /** @dev Resolve a challenge.  Pays out tokens to the winning staked party. Captures information to facilitate voter payout.
        @notice Resolve a challenge.  Pays out tokens to the winning staked party. Captures information to facilitate voter payout.
        @param tendermintPublicKey Hex encoded tendermint public key.
    */
    function resolveChallenge(bytes32 tendermintPublicKey) public {
        //Load listing
        Listing storage listing = _listings[tendermintPublicKey];
        Challenge storage challenge = _challenges[listing.currentChallenge];

        //Must be currently challenged and after the end block but not finalized
        require(listing.status == Status.CHALLENGED, "listing is not challenged");
        require(block.number > challenge.challengeEnd, "challenge has not ended");
        require(!challenge.finalized, "challenge has been finalized"); //TODO this would be a failure in the state machine and perhaps should be rmeoved
        require(challenge.balance == listing.stakedBalance, "challenge balance has changed"); //TODO this would be a failure in the state machine and perhaps should be rmeoved

        uint winningOption = voting.winningOption(challenge.pollId);

        //calculate the holders cut
        uint holderCut = challenge.balance.mul(stakeholderProportionPPM).div(MILLION);
        challenge.voterTotal = listing.stakedBalance.sub(holderCut);

        if (winningOption == 1) {
            challenge.passed = true;
            challenge.finalized = true;

            //Challenger won listing owner looses the tokens
            treasury.confiscate(listing.owner, listing.stakedBalance);

            //Approve and release tokens to treasury for successful challenger
            //Challenger receives his tokens back and cut of the listing balance.  Tokens available for distribution will be tracked in the challenge.balance
            uint challengerTotalWinnings = challenge.balance.add(holderCut);
            kosuToken.approve(address(treasury), challengerTotalWinnings);

            // Release challenge stake, award new tokens then remove the award from the remaining reward.
            treasury.releaseTokens(challenge.challenger, challenge.balance);
            treasury.award(challenge.challenger, holderCut);
            challenge.balance = challenge.balance.sub(holderCut);

            //Emit event removing power
            _emitValidatorRegistryUpdate(listing.tendermintPublicKey, listing.owner, 0);

            _removeListing(listing);
        } else {
            challenge.passed = false;
            challenge.finalized = true;

            if (voting.totalWinningTokens(challenge.pollId) == 0) {
                holderCut = challenge.balance;
                challenge.voterTotal = 0;
            }

            //Challenger lost and has lost the tokens.
            treasury.confiscate(challenge.challenger, listing.stakedBalance);

            //Approve and release tokens to treasury for the listing holder Remaning tokens
            challenge.balance = challenge.balance.sub(holderCut);
            kosuToken.approve(address(treasury), holderCut);
            treasury.award(listing.owner, holderCut);

            //Handle status transitions
            if (listing.exitBlock > 0) {//Exiting challenge exit is completed
                //listing was exiting and got challenged.  The listing will be removed by surviving the challenge.

                //Approve and release tokens to treasury
                kosuToken.approve(address(treasury), listing.stakedBalance);
                treasury.releaseTokens(listing.owner, listing.stakedBalance);

                //Clear listing data and remove from tracking array
                _removeListing(listing);
            } else if (listing.confirmationBlock > 0) {//Confirmed challenge is returned to accepted
                listing.status = Status.ACCEPTED;
                listing.currentChallenge = 0;
                _emitValidatorChallengeResolved(listing);
            } else {//Pending challege returned to pending
                listing.status = Status.PENDING;
                listing.currentChallenge = 0;
                _emitValidatorChallengeResolved(listing);
            }
        }
    }

    /** @dev Claims winnings from a challenge that has been completed.  Accounts are rewarded for voting in support of the winning resolution proportionally to their vote contribution.
        @notice Claims winnings from a challenge that has been completed.  Accounts are rewarded for voting in support of the winning resolution proportionally to their vote contribution.
        @param challengeId Challenge id to claim rewards from.
    */
    function claimWinnings(uint challengeId) public {
        Challenge storage challenge = _challenges[challengeId];

        //Must be after challenge period
        require(block.number > challenge.challengeEnd, "challenge hasn't ended");

        //Finalize the challenge
        if (!challenge.finalized) {
            resolveChallenge(challenge.listingKey);
        }

        //Get vote info
        (bool _x, uint winningTokens) = voting.userWinningTokens(challenge.pollId, msg.sender);
        uint totalWinningTokens = voting.totalWinningTokens(challenge.pollId);

        //Approve and release tokens to treasury for the listing holder Remaning tokens
        uint voterCut = challenge.voterTotal.mul(winningTokens).div(totalWinningTokens);
        challenge.balance = challenge.balance.sub(voterCut);
        kosuToken.approve(address(treasury), voterCut);
        treasury.award(msg.sender, voterCut);
    }

    /** @dev Claims rewards for a listing.  Positive reward rate will have new tokens minted.  Negative reward rates will burn tokens and have risk of being removed immediately through a TouchAndRemove when insufficient tokens are available.
        @notice Claims rewards for a listing.  Positive reward rate will have new tokens minted.  Negative reward rates will burn tokens and have risk of being removed immediately through a TouchAndRemove when insufficient tokens are available.
        @param tendermintPublicKey Public key for the listing to have rewards claimed.
    */
    function claimRewards(bytes32 tendermintPublicKey) public {
        //Load listing
        Listing storage listing = _listings[tendermintPublicKey];

        //Call process rewards with loaded listing
        _processRewards(listing);
    }

    /** @dev Confirm a listing registration after the confirmation period. Perform initial token burn for a burning listing.
        @notice Confirm a listing registration after the confirmation period. Perform initial token burn for a burning listing.
        @param tendermintPublicKey Hex encoded tendermint public key.
    */
    function confirmListing(bytes32 tendermintPublicKey) public {
        //Load listing
        Listing storage listing = _listings[tendermintPublicKey];

        //Must be called by owner after application period
        require(listing.owner == msg.sender, "not listing owner");
        require(listing.status == Status.PENDING, "listing not pending");
        require(listing.applicationBlock.add(applicationPeriod) <= block.number, "application period active");

        //Listing is now accepted
        listing.status = Status.ACCEPTED;
        listing.confirmationBlock = block.number;
        if (listing.rewardRate < 0) {
            listing.lastRewardBlock = block.number - rewardPeriod;
        } else {
            if (listing.rewardRate > 0) {
                _addGeneratorToList(listing.rewardRate, listing.tendermintPublicKey);
            }

            listing.lastRewardBlock = block.number;
        }
        _processRewards(listing);

        if (listing.status != Status.NULL) {
            //Emit update event if listing wasn't removed
            _emitValidatorConfirmed(listing);
            _emitValidatorRegistryUpdate(listing.tendermintPublicKey, listing.owner, listing.stakedBalance);
        }
    }

    /** @dev Initiate a listing exit. Immediately exit a pending listing or start the exit delay and remove validator power of the listing.
        @notice Initiate a listing exit. Immediately exit a pending listing or start the exit delay and remove validator power of the listing.
        @param tendermintPublicKey Hex encoded tendermint public key.
    */
    function initExit(bytes32 tendermintPublicKey) public {
        //Load the listing
        Listing storage listing = _listings[tendermintPublicKey];

        //Listing owner must call this method
        require(listing.owner == msg.sender, "not listing owner");

        //Exit immediately if the listing is still in pending status.
        if (listing.status == Status.PENDING) {
            //Approve and release tokens to treasury
            kosuToken.approve(address(treasury), listing.stakedBalance);
            treasury.releaseTokens(msg.sender, listing.stakedBalance);

            //Clear listing data and remove from tracking array
            _removeListing(listing);

            return;
        }

        //Ensure listing is in accepted
        require(listing.status == Status.ACCEPTED, "listing not accepted");

        listing.status = Status.EXITING;
        listing.exitBlock = block.number + exitPeriod;

        //Emit event
        _emitValidatorRegistryUpdate(listing.tendermintPublicKey, listing.owner, 0);
    }

    /** @dev Finalize a listings exit.  Allowing the account to safely remove the staked tokens and nullify the listing.
        @notice Finalize a listings exit.  Allowing the account to safely remove the staked tokens and nullify the listing.
        @param tendermintPublicKey Hex encoded tendermint public key.
    */
    function finalizeExit(bytes32 tendermintPublicKey) public {
        //Load the listing
        Listing storage listing = _listings[tendermintPublicKey];

        //Listing owner must call this method
        require(listing.owner == msg.sender, "not listing owner");

        //The listing must be exiting and past the exit block challenge interrupts this process
        require(listing.status == Status.EXITING, "listing not exiting");
        require(listing.exitBlock <= block.number, "exiting cool off period active");

        //Approve and release tokens to treasury
        kosuToken.approve(address(treasury), listing.stakedBalance);
        treasury.releaseTokens(msg.sender, listing.stakedBalance);
        treasury.validatorLock(msg.sender, listing.stakedBalance, block.number + exitLockPeriod);

        //Clear listing data and remove from tracking array
        _removeListing(listing);
    }

    /** @dev Reduces the generating reward rate of a listing.  This prevents the listing from needing to reapply when they amount of tokens they are generating is to high.
        @notice Reduces the generating reward rate of a listing.  This prevents the listing from needing to reapply when they amount of tokens they are generating is to high.
        @param tendermintPublicKey Hex encoded tendermint public key.
        @param newRate New reward rate in the units of ether/period.
    */
    function reduceReward(bytes32 tendermintPublicKey, int newRate) public {
        //Load the listing
        Listing storage listing = _listings[tendermintPublicKey];

        //Listing owner must call this method
        require(listing.owner == msg.sender, "not listing owner");
        //Can only modify listing generating tokens
        require(listing.rewardRate > 0, "listing is not generating tokens");
        //Can only reduce reward rate
        require(listing.rewardRate > newRate, "not reducing reward rate");
        //Must be below the maxRewardRate
        require(uint(newRate) < maxRewardRate(), "exceeds maximum reward rate");
        //Listing must be active and in good standing.
        require(listing.status == Status.ACCEPTED, "listing is not accepted");

        _processRewards(listing);
        listing.rewardRate = newRate;

        _emitValidatorReducedReward(listing);
    }

    /** @dev Updates the contract configuration.
        @notice Updates the contract configuration.
        @param index The index of the parameter you wish to update.
        @param value The new value for the parameter.
    */
    function updateConfigValue(uint index, uint value) public onlyOwner {
        if (index == 0) {
            applicationPeriod = value;
        } else if (index == 1) {
            commitPeriod = value;
        } else if (index == 2) {
            challengePeriod = value;
        } else if (index == 3) {
            exitPeriod = value;
        } else if (index == 4) {
            rewardPeriod = value;
        } else if (index == 5) {
            minimumBalance = value;
        } else if (index == 6) {
            stakeholderProportionPPM = value;
        } else if (index == 7) {
            minMaxGenerator = value;
        } else if (index == 8) {
            maxGeneratorGrowth = value;
        } else if (index == 9) {
            maxMaxGenerator = value;
        } else if (index == 10) {
            exitLockPeriod = value;
        } else if (index == 11) {
            winningVoteLockPeriod = value;
        } else if (index == 12) {
            losingVoteLockPeriod = value;
        } else {
            revert("Index does not match a value");
        }
    }

    //INTERNAL
    function _hasRewardPending(Listing storage l) internal view returns (bool) {
        return (l.status == Status.ACCEPTED && l.rewardRate != 0 && l.lastRewardBlock + rewardPeriod <= block.number);
    }

    function _processRewards(Listing storage l) internal {
        if (_hasRewardPending(l)) {
            uint rewardPeriods = block.number.sub(l.lastRewardBlock).div(rewardPeriod);
            if (l.rewardRate > 0) {
                //Converting reward rate from ether to tokens to mint
                kosuToken.mintTo(l.owner, kosuToken.estimateEtherToToken(uint(l.rewardRate).mul(rewardPeriods)));
            } else {
                //Converting reward rate from ether to tokens to burn
                uint tokensToBurn = kosuToken.estimateEtherToToken(uint(l.rewardRate * - 1).mul(rewardPeriods));

                //Tokens remaining in the treasury
                uint userTreasuryBalance = treasury.currentBalance(l.owner);

                if (userTreasuryBalance < tokensToBurn) {
                    uint tokensRemaining = tokensToBurn.sub(userTreasuryBalance);
                    if (tokensRemaining >= l.stakedBalance) {//If more tokens are needed than the listing's staked balance take them all.
                        tokensRemaining = l.stakedBalance;
                        l.stakedBalance = 0;
                    } else {//Take additional tokens from the stakedBalance before the touch and remove.
                        l.stakedBalance = l.stakedBalance.sub(tokensRemaining);
                    }

                    //Approve and release tokens to treasury to be burned by user
                    kosuToken.approve(address(treasury), tokensRemaining);
                    treasury.releaseTokens(l.owner, tokensRemaining);

                    //Burn all the remaining tokens in treasury and burn into the listing stake.
                    uint totalTokensToBurn = userTreasuryBalance.add(tokensRemaining);
                    treasury.burnFrom(l.owner, totalTokensToBurn);

                    _touchAndRemoveListing(l);
                } else {
                    treasury.burnFrom(l.owner, tokensToBurn);
                }
            }
            l.lastRewardBlock = l.lastRewardBlock.add(rewardPeriod.mul(rewardPeriods));
        }
    }

    function _touchAndRemoveListing(Listing storage l) internal {
        //Emit events to signal listing was to and removed, and voting power has been lost
        _emitValidatorTouchedAndRemoved(l);
        _emitValidatorRegistryUpdate(l.tendermintPublicKey, l.owner, 0);

        //Approve and release tokens to treasury
        kosuToken.approve(address(treasury), l.stakedBalance);
        treasury.releaseTokens(l.owner, l.stakedBalance);

        //Clear listing data and remove from tracking array
        _removeListing(l);
    }

    function _removeListingKey(bytes32 key) internal {
        //Removes the listing by key and shortens the array
        for (uint i = 0; i < _listingKeys.length; i++) {
            if (_listingKeys[i] == key) {
                _listingKeys[i] = _listingKeys[_listingKeys.length - 1];
                _listingKeys.length--;
                break;
            }
        }
    }

    function _removeListing(Listing storage l) internal {
        if (l.rewardRate > 0 && l.confirmationBlock > 0) {
            _removeEntryFromList(l.tendermintPublicKey);
        }

        bytes32[] memory data = new bytes32[](1);
        data[0] = l.tendermintPublicKey;
        eventEmitter.emitEvent("ValidatorRemoved", data, "");

        _removeListingKey(l.tendermintPublicKey);
        delete _listings[l.tendermintPublicKey];
    }

    function _emitValidatorRegistryUpdate(bytes32 tendermintPublicKey, address owner, uint stake) internal {
        bytes32[] memory data = new bytes32[](3);
        data[0] = tendermintPublicKey;
        data[1] = bytes32(uint(owner));
        data[2] = bytes32(stake);
        eventEmitter.emitEvent("ValidatorRegistryUpdate", data, "");
    }

    function _emitValidatorRegistered(uint applicationBlock, bytes32 tendermintPublicKey, address owner, int rewardRate, string storage details) internal {
        bytes32[] memory data = new bytes32[](4);
        data[0] = tendermintPublicKey;
        data[1] = bytes32(applicationBlock);
        data[2] = bytes32(uint(owner));
        data[3] = bytes32(rewardRate);
        eventEmitter.emitEvent("ValidatorRegistered", data, details);
    }

    function _emitValidatorConfirmed(Listing storage l) internal {
        bytes32[] memory data = new bytes32[](1);
        data[0] = l.tendermintPublicKey;
        eventEmitter.emitEvent("ValidatorConfirmed", data, "");
    }

    function _emitValidatorTouchedAndRemoved(Listing storage l) internal {
        bytes32[] memory data = new bytes32[](2);
        data[0] = l.tendermintPublicKey;
        data[1] = bytes32(uint(l.owner));
        eventEmitter.emitEvent("ValidatorTouchedAndRemoved", data, "");
    }

    function _emitValidatorReducedReward(Listing storage l) internal {
        bytes32[] memory data = new bytes32[](3);
        data[0] = l.tendermintPublicKey;
        data[1] = bytes32(uint(l.owner));
        data[2] = bytes32(l.rewardRate);
        eventEmitter.emitEvent("ValidatorReducedReward", data, "");
    }

    function _emitValidatorChallenged(bytes32 tendermintPublicKey, address owner, address challenger, uint challengeId, uint pollId, string storage details) internal {
        bytes32[] memory data = new bytes32[](5);
        data[0] = tendermintPublicKey;
        data[1] = bytes32(uint(owner));
        data[2] = bytes32(uint(challenger));
        data[3] = bytes32(challengeId);
        data[4] = bytes32(pollId);
        eventEmitter.emitEvent("ValidatorChallenged", data, details);
    }

    function _emitValidatorChallengeResolved(Listing storage l) internal {
        bytes32[] memory data = new bytes32[](1);
        data[0] = l.tendermintPublicKey;
        eventEmitter.emitEvent("ValidatorChallengeResolved", data, "");
    }

    function _findGeneratorPlaceInList(int value) internal view returns (bytes32, bytes32) {
        if (_maxGenerator == 0x0) {
            return (0x0, 0x0);
        }
        bytes32 nextGenerator = _maxGenerator;

        while (true) {
            MaxList memory gen = _generators[nextGenerator];
            if (gen.value > value) {
                if (gen.next != 0x0) {
                    nextGenerator = gen.next;
                    continue;
                } else {
                    return (gen.self, 0x0);
                }

            } else {
                return (gen.previous, gen.self);
            }
        }
        return (0x0, 0x0);
        // This case should be unreachable
    }

    function _addGeneratorToList(int rewardRate, bytes32 tendermintPublicKey) internal {
        MaxList storage newGenerator = _generators[tendermintPublicKey];
        newGenerator.value = rewardRate;
        newGenerator.self = tendermintPublicKey;

        (bytes32 previous, bytes32 next) = _findGeneratorPlaceInList(newGenerator.value);

        if (previous == 0x0 && next == 0x0) {
            _maxGenerator = newGenerator.self;
            return;
        } else if (previous == 0x0 && next == _maxGenerator) {
            _maxGenerator = newGenerator.self;
        }

        if (previous != 0x0) {
            MaxList storage entryBeforeNew = _generators[previous];
            entryBeforeNew.next = newGenerator.self;
            newGenerator.previous = entryBeforeNew.self;
        }

        if (next != 0x0) {
            MaxList storage entryAfterNew = _generators[next];
            entryAfterNew.previous = newGenerator.self;
            newGenerator.next = entryAfterNew.self;
        }
    }

    function _removeEntryFromList(bytes32 entryKey) internal {
        if (_maxGenerator == 0x0) {
            return;
        }

        MaxList storage currentEntry = _generators[entryKey];

        if (_maxGenerator == entryKey) {
            _maxGenerator = currentEntry.next;
            _generators[currentEntry.next].previous = 0x0;
            delete _generators[entryKey];
        }


        while (true) {
            if (currentEntry.self == 0x0) {
                return;
            } else if (currentEntry.self == entryKey) {
                if (currentEntry.next != 0x0) {
                    _generators[currentEntry.previous].next = currentEntry.next;
                    _generators[currentEntry.next].previous = currentEntry.previous;
                    delete _generators[currentEntry.self];
                } else {
                    _generators[currentEntry.previous].next = 0x0;
                    delete _generators[currentEntry.self];
                }


            } else {
                currentEntry = _generators[currentEntry.next];
            }
        }
    }
}
