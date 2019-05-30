pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../event/EventEmitter.sol";
import "../treasury/Treasury.sol";
import "./IValidatorRegistry.sol";
import "../voting/Voting.sol";

/** @title ValidatorRegistry
    @author Freydal
*/
contract ValidatorRegistry is IValidatorRegistry, Authorizable {
    using SafeMath for uint;

    uint private _applicationPeriod;
    uint private _commitPeriod;
    uint private _challengePeriod;
    uint private _exitPeriod;
    uint private _rewardPeriod;
    uint private _minimumBalance = 1 ether;
    uint private _stakeholderCut = 30; //Will be used as a percent so must be sub 100
    Treasury private _treasury;
    Voting private _voting;
    KosuToken private _kosuToken;
    mapping(bytes32 => Listing) private _listings;
    mapping(uint => Challenge) private _challenges;
    uint private nextChallenge = 1;
    bytes32[] private _listingKeys;
    EventEmitter private e;
    uint _maxGenerationSum = 2 ether * 2 ether;

    /** @dev Create a new ValidatorRegistry implementation
        @notice Create a new ValidatorRegistry implementation
        @param _treasuryAddress Deployed Treasury address
        @param _votingAddress Deployed Voting address
        @param auth AuthorizedAddresses deployed address
        @param _events Deployed EventEmitter address
    */
    constructor(address _treasuryAddress, address _votingAddress, address auth, address _events, uint applicationPeriod, uint commitPeriod, uint challengePeriod, uint exitPeriod, uint rewardPeriod) Authorizable(auth) public {
        _treasury = Treasury(_treasuryAddress);
        _voting = Voting(_votingAddress);
        _kosuToken = _treasury.kosuToken();
        e = EventEmitter(_events);
        _applicationPeriod = applicationPeriod;
        _commitPeriod = commitPeriod;
        _challengePeriod = challengePeriod;
        _exitPeriod = exitPeriod;
        _rewardPeriod = rewardPeriod;
    }

    /** @dev Expose the configured applicationPeriod
        @notice Expose the configured applicationPeriod
        @return Application period length in blocks
    */
    function applicationPeriod() public view returns (uint) {
        return _applicationPeriod;
    }

    /** @dev Expose the configured commitPeriod
        @notice Expose the configured commitPeriod
        @return Commit period length in blocks
    */
    function commitPeriod() public view returns (uint) {
        return _commitPeriod;
    }

    /** @dev Expose the configured challengePeriod
        @notice Expose the configured challengePeriod
        @return Challenge period length in blocks
    */
    function challengePeriod() public view returns (uint) {
        return _challengePeriod;
    }

    /** @dev Expose the configured exitPeriod
        @notice Expose the configured exitPeriod
        @return Exit period length in blocks
    */
    function exitPeriod() public view returns (uint) {
        return _exitPeriod;
    }

    /** @dev Expose the configured rewardPeriod
        @notice Expose the configured rewardPeriod
        @return Reward period length in blocks
    */
    function rewardPeriod() public view returns (uint) {
        return _rewardPeriod;
    }

    /** @dev Expose the configured minimumBalance
        @notice Expose the configured minimumBalance
        @return Minimum token balance to list and challenge
    */
    function minimumBalance() public view returns (uint) {
        return _minimumBalance;
    }

    /** @dev Expose the configured stakeholderCut
        @notice Expose the configured stakeholderCut
        @return Number of tokens the stakeholder gets after a challenge
    */
    function stakeholderCut() public view returns (uint) {
        return _stakeholderCut;
    }

    /** @dev Expose the configured Voting contract address
        @notice Expose the configured Voting contract address
        @return Configured Voting contract address
    */
    function voting() public view returns (address) {
        return address(_voting);
    }

    /** @dev Expose the list of active listing keys
        @notice Expose the list of active listing keys
        @return An array of hex encoded tendermint keys
    */
    function listingKeys() public view returns (bytes32[] memory) {
        return _listingKeys;
    }

    /** @dev Expose the configured Treasury address
        @notice Expose the configured Treasury address
        @return Configured Treasury contract address
    */
    function treasury() public view returns (address) {
        return address(_treasury);
    }

    /** @dev Expose the configured KosuToken
        @notice Expose the configured KosuToken
        @return Configured KosuToken contract address
    */
    function kosuToken() public view returns (address) {
        return address(_kosuToken);
    }

    /** @dev Calculate the maximum KosuToken a validator can generate
        @notice Calculate the maximum KosuToken a validator can generate
        @return Maximum KosuToken a validator can generate
    */
    function maxRewardRate() public view returns (uint) {
        return (sqrt(_maxGenerationSum));
    }

    /** @dev Expose listing data
        @notice Expose listing data
        @param pubKey Hex encoded tendermint public key
    */
    function getListing(bytes32 pubKey) public view returns (Listing memory) {
        return _listings[pubKey];

    }

    /** @dev Expose all listings
        @notice Expose all listings
    */
    function getListings() public view returns (Listing[] memory) {
        Listing[] memory listings = new Listing[](_listingKeys.length);
        for(uint i = 0; i < _listingKeys.length; i++) {
            listings[i] = _listings[_listingKeys[i]];
        }
        return listings;
    }

    /** @dev Expose listing data
        @notice Expose listing data
        @param challengeId Hex encoded tendermint public key
    */
    function getChallenge(uint challengeId) public view returns (Challenge memory) {
        return _challenges[challengeId];

    }

    /** @dev Register a listing
        @notice Register a listing
        @param msgSender msg.sender from the proxy call
        @param tendermintPublicKey Hex encoded tendermint public key
        @param tokensToStake The number of tokes at stake if the order is challenged
        @param rewardRate The rate tokens are minted or destroyed over the active listings reward periods
        @param details A string value to represent support for claim (commonly an external link)
    */
    function registerListing(address msgSender, bytes32 tendermintPublicKey, uint tokensToStake, int rewardRate, string calldata details) external isAuthorized {
        //tokensToStake must be greater than or equal to _minimumBalance
        require(tokensToStake >= _minimumBalance);

        //Claim tokens from the treasury
        _treasury.claimTokens(msgSender, tokensToStake);

        //Load listing
        Listing storage listing = _listings[tendermintPublicKey];

        //Must not overwrite an existing listing
        require(listing.status == Status.NULL);
        if(rewardRate > 0) {
            require(uint(rewardRate) <= maxRewardRate());
        }

        //Set listing values
        listing.status = Status.PENDING;
        listing.stakedBalance = tokensToStake;
        listing.applicationBlock = block.number;
        listing.tendermintPublicKey = tendermintPublicKey;
        listing.owner = msgSender;
        listing.rewardRate = rewardRate;
        listing.details = details;

        //Add new listing public key to key list
        _listingKeys.push(tendermintPublicKey);

        //Emit event
        emitValidatorRegistered(listing.applicationBlock, listing.tendermintPublicKey, listing.owner, rewardRate, listing.details);
    }

    /** @dev Challenge a registered listing
        @notice Challenge a registered listing
        @param msgSender msg.sender from the proxy call
        @param tendermintPublicKey Hex encoded tendermint public key
        @param details A string value to represent support for claim (commonly an external link)
    */
    function challengeListing(address msgSender, bytes32 tendermintPublicKey, string memory details) public isAuthorized {
        //Load listing
        Listing storage listing = _listings[tendermintPublicKey];

        //Challenge pending and accepted listings.  -- More valid status may be added.
        require(listing.status == Status.PENDING || listing.status == Status.ACCEPTED || listing.status == Status.EXITING);

        //Ensure earns and burns are up to date  return if a touch and remove was executed
        processRewards(listing);
        if(listing.status == Status.NULL) return;

        if(listing.stakedBalance < _minimumBalance) {
            touchAndRemoveListing(listing);
            return;
        }

        //Update the listing
        listing.status = Status.CHALLENGED;
        listing.currentChallenge = nextChallenge;

        //Create challenge
        Challenge storage challenge = _challenges[nextChallenge];
        nextChallenge++;

        //Pull tokens out of the treasury
        _treasury.claimTokens(msgSender, listing.stakedBalance);

        //Initialize challenge.
        challenge.balance = listing.stakedBalance;
        challenge.challenger = msgSender;
        challenge.listingKey = listing.tendermintPublicKey;
        challenge.challengeEnd = block.number + _challengePeriod;
        challenge.pollId = _voting.createPoll(block.number + _commitPeriod, block.number + _challengePeriod);
        challenge.details = details;

        //Emit challenged event
        emitValidatorChallenged(listing.tendermintPublicKey, listing.owner, challenge.challenger, listing.currentChallenge, challenge.pollId, challenge.details);
    }

    /** @dev Resolve a challenge
        @notice Resolve a challenge
        @param pubKey Hex encoded tendermint public key
    */
    function resolveChallenge(bytes32 pubKey) public {
        //Load listing
        Listing storage listing = _listings[pubKey];
        Challenge storage challenge = _challenges[listing.currentChallenge];

        //Must be currently challenged and after the end block but not finalized
        require(listing.status == Status.CHALLENGED);
        require(block.number > challenge.challengeEnd);
        require(!challenge.finalized);
        require(challenge.balance == listing.stakedBalance);

        uint winningOption = _voting.winningOption(challenge.pollId);

        //calculate the holders cut
        uint holderCut = listing.stakedBalance.mul(_stakeholderCut).div(100);
        challenge.voterTotal = listing.stakedBalance.sub(holderCut);

        if(winningOption == 1) {
            challenge.passed = true;
            challenge.finalized = true;

            //Challenger won listing owner looses the tokens
            _treasury.confiscate(listing.owner, listing.stakedBalance);

            //Approve and release tokens to treasury for successful challenger
            //Challenger receives his tokens back and cut of the listing balance.  Tokens available for distribution will be tracked in the challenge.balance
            uint challengerTotalWinnings = challenge.balance.add(holderCut);
            _kosuToken.approve(address(_treasury), challengerTotalWinnings);

            // Release challenge stake, award new tokens then remove the award from the remaining reward.
            _treasury.releaseTokens(challenge.challenger, challenge.balance);
            _treasury.award(challenge.challenger, holderCut);
            challenge.balance = challenge.balance.sub(holderCut);

            //Emit event removing power
            emitValidatorRegistryUpdate(listing.tendermintPublicKey, listing.owner, 0);

            removeListing(listing);
        } else {
            challenge.passed = false;
            challenge.finalized = true;

            if (_voting.totalWinningTokens(challenge.pollId) == 0) {
                holderCut = challenge.balance;
                challenge.voterTotal = 0;
            }

            //Challenger lost and has lost the tokens.
            _treasury.confiscate(challenge.challenger, listing.stakedBalance);

            //Approve and release tokens to treasury for the listing holder Remaning tokens
            challenge.balance = challenge.balance.sub(holderCut);
            _kosuToken.approve(address(_treasury), holderCut);
            _treasury.award(listing.owner, holderCut);

            //Handle status transitions
            if(listing.exitBlock > 0) { //Exiting challenge exit is completed
                //listing was exiting and got challenged.  The listing will be removed by surviving the challenge.

                //Approve and release tokens to treasury
                _kosuToken.approve(address(_treasury), listing.stakedBalance);
                _treasury.releaseTokens(listing.owner, listing.stakedBalance);

                //Clear listing data and remove from tracking array
                removeListing(listing);
            } else if(listing.confirmationBlock > 0) { //Confirmed challenge is returned to accepted
                listing.status = Status.ACCEPTED;
                listing.currentChallenge = 0;
            } else { //Pending challege returned to pending
                listing.status = Status.PENDING;
                listing.currentChallenge = 0;
            }

            //ensure the ending state is correct
            require(challenge.balance == challenge.voterTotal);
        }
    }

    /** @dev Claims winnings from a challenge
        @notice Claims winnings from a challenge
        @param challengeId Challenge id to claim rewards from.
    */
    function claimWinnings(address msgSender, uint challengeId) public isAuthorized {
        Challenge storage challenge = _challenges[challengeId];

        //Must be after challenge period
        require(block.number > challenge.challengeEnd);

        //Finalize the challenge
        if(!challenge.finalized) {
            resolveChallenge(challenge.listingKey);
        }

        //Ensure finalize has been completed
        require(challenge.finalized);

        //Get vote info
        uint winningTokens = _voting.userWinningTokens(challenge.pollId, msgSender);
        uint totalWinningTokens = _voting.totalWinningTokens(challenge.pollId);

        //Approve and release tokens to treasury for the listing holder Remaning tokens
        uint voterCut = challenge.voterTotal.mul(winningTokens).div(totalWinningTokens);
        challenge.balance = challenge.balance.sub(voterCut);
        _kosuToken.approve(address(_treasury), voterCut);
        _treasury.award(msgSender, voterCut);
    }

    /** @dev Claims rewards for a listing
        @notice Claims rewards for a listing
        @param pubKey Public key for the listing to have rewards claimed
    */
    function claimRewards(bytes32 pubKey) public {
        //Load listing
        Listing storage listing = _listings[pubKey];

        //Call process rewards with loaded listing
        processRewards(listing);
    }

    /** @dev Confirm a listing registration
        @notice Confirm a listing registration
        @param msgSender msg.sender from the proxy call
        @param tendermintPublicKey Hex encoded tendermint public key
    */
    function confirmListing(address msgSender, bytes32 tendermintPublicKey) public isAuthorized {
        //Load listing
        Listing storage listing = _listings[tendermintPublicKey];

        //Must be called by owner after application period
        require(listing.owner == msgSender);
        require(listing.status == Status.PENDING && listing.applicationBlock.add(_applicationPeriod) <= block.number);

        //Listing is now accepted
        listing.status = Status.ACCEPTED;
        listing.confirmationBlock = block.number;
        if(listing.rewardRate < 0) {
            listing.lastRewardBlock = block.number - _rewardPeriod;
        } else {
            if(listing.rewardRate > 0) {
                uint rewardRate = uint(listing.rewardRate);
                _maxGenerationSum = _maxGenerationSum.add(rewardRate.mul(rewardRate));
            }

            listing.lastRewardBlock = block.number;
        }
        processRewards(listing);

        if (listing.status != Status.NULL) {
            //Emit update event if listing wasn't removed
            emitValidatorConfirmed(listing);
            emitValidatorRegistryUpdate(listing.tendermintPublicKey, listing.owner, listing.stakedBalance);
        }
    }

    /** @dev Initiate a listing exit
        @notice Initiate a listing exit
        @param msgSender msg.sender from the proxy call
        @param tendermintPublicKey Hex encoded tendermint public key
    */
    function initExit(address msgSender, bytes32 tendermintPublicKey) public isAuthorized {
        //Load the listing
        Listing storage listing = _listings[tendermintPublicKey];

        //Listing owner must call this method
        require(listing.owner == msgSender);

        //Exit immediately if the listing is still in pending status.
        if(listing.status == Status.PENDING) {
            //Approve and release tokens to treasury
            _kosuToken.approve(address(_treasury), listing.stakedBalance);
            _treasury.releaseTokens(msgSender, listing.stakedBalance);

            //Clear listing data and remove from tracking array
            removeListing(listing);

            return;
        }

        //Ensure listing is in accepted
        require(listing.status == Status.ACCEPTED);

        listing.status = Status.EXITING;
        listing.exitBlock = block.number + _exitPeriod;

        //Emit event
        emitValidatorRegistryUpdate(listing.tendermintPublicKey, listing.owner, 0);
    }

    /** @dev Complete a listing exit
        @notice Complete a listing exit
        @param msgSender msg.sender from the proxy call
        @param tendermintPublicKey Hex encoded tendermint public key
    */
    function finalizeExit(address msgSender, bytes32 tendermintPublicKey) public isAuthorized {
        //Load the listing
        Listing storage listing = _listings[tendermintPublicKey];

        //Listing owner must call this method
        require(listing.owner == msgSender);

        //The listing must be exiting and past the exit block challenge interrupts this process
        require(listing.status == Status.EXITING);
        require(listing.exitBlock <= block.number);

        //Approve and release tokens to treasury
        _kosuToken.approve(address(_treasury), listing.stakedBalance);
        _treasury.releaseTokens(msgSender, listing.stakedBalance);

        //Clear listing data and remove from tracking array
        removeListing(listing);
    }

    //INTERNAL
    function hasRewardPending(Listing storage l) internal view returns (bool) {
        return (l.status == Status.ACCEPTED && l.rewardRate != 0 && l.lastRewardBlock + _rewardPeriod <= block.number);
    }

    function processRewards(Listing storage l) internal {
        if(hasRewardPending(l)) {
            uint rewardPeriods = block.number.sub(l.lastRewardBlock).div(_rewardPeriod);
            if(l.rewardRate > 0) {
                _kosuToken.mintTo(l.owner, uint(l.rewardRate).mul(rewardPeriods));
            } else {
                //Tokens to pay up
                uint tokensToBurn = uint(l.rewardRate * -1).mul(rewardPeriods);

                //Tokens remaining in the treasury
                uint userTreasuryBalance = _treasury.currentBalance(l.owner);

                if(userTreasuryBalance < tokensToBurn) {
                    uint tokensRemaining = tokensToBurn.sub(userTreasuryBalance);
                    if(tokensRemaining >= l.stakedBalance) {  //If more tokens are needed than the listing's staked balance take them all.
                        tokensRemaining = l.stakedBalance;
                        l.stakedBalance = 0;
                    } else { //Take additional tokens from the stakedBalance before the touch and remove.
                        l.stakedBalance = l.stakedBalance.sub(tokensRemaining);
                    }

                    //Approve and release tokens to treasury to be burned by user
                    _kosuToken.approve(address(_treasury), tokensRemaining);
                    _treasury.releaseTokens(l.owner, tokensRemaining);

                    //Burn all the remaining tokens in treasury and burn into the listing stake.
                    uint totalTokensToBurn = userTreasuryBalance.add(tokensRemaining);
                    _treasury.burnFrom(l.owner, totalTokensToBurn);

                    touchAndRemoveListing(l);
                } else {
                _treasury.burnFrom(l.owner, tokensToBurn);
                }
            }
            l.lastRewardBlock = l.lastRewardBlock.add(_rewardPeriod.mul(rewardPeriods));
        }
    }

    function touchAndRemoveListing(Listing storage l) internal {
        //Emit events to signal listing was to and removed, and voting power has been lost
        emitValidatorTouchedAndRemoved(l);
        emitValidatorRegistryUpdate(l.tendermintPublicKey, l.owner, 0);

        //Approve and release tokens to treasury
        _kosuToken.approve(address(_treasury), l.stakedBalance);
        _treasury.releaseTokens(l.owner, l.stakedBalance);

        //Clear listing data and remove from tracking array
        removeListing(l);
    }

    function removeListingKey(bytes32 key) internal {
        //Removes the listing by key and shortens the array
        for (uint i = 0; i < _listingKeys.length; i++) {
            if (_listingKeys[i] == key) {
                _listingKeys[i] = _listingKeys[_listingKeys.length - 1];
                _listingKeys.length--;
                break;
            }
        }
    }

    function sqrt(uint x) internal pure returns (uint y) {
        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function removeListing(Listing storage l) internal {
        if(l.rewardRate > 0) {
            uint rewardRate = uint(l.rewardRate);
            _maxGenerationSum = _maxGenerationSum.sub(rewardRate.mul(rewardRate));
        }

        removeListingKey(l.tendermintPublicKey);
        delete _listings[l.tendermintPublicKey];
    }

    function emitValidatorRegistryUpdate(bytes32 tendermintPublicKey, address owner, uint stake) internal {
        bytes32[] memory data = new bytes32[](3);
        data[0] = tendermintPublicKey;
        data[1] = bytes32(uint(owner));
        data[2] = bytes32(stake);
        e.emitEvent("ValidatorRegistryUpdate", data, "");
    }

    function emitValidatorRegistered(uint applicationBlock, bytes32 tendermintPublicKey, address owner, int rewardRate, string storage details) internal {
        bytes32[] memory data = new bytes32[](4);
        data[0] = tendermintPublicKey;
        data[1] = bytes32(applicationBlock);
        data[2] = bytes32(uint(owner));
        data[3] = bytes32(rewardRate);
        e.emitEvent("ValidatorRegistered", data, details);
    }

    function emitValidatorConfirmed(Listing storage l) internal {
        bytes32[] memory data = new bytes32[](1);
        data[0] = l.tendermintPublicKey;
        e.emitEvent("ValidatorConfirmed", data, "");
    }

    function emitValidatorTouchedAndRemoved(Listing storage l) internal {
        bytes32[] memory data = new bytes32[](4);
        data[0] = l.tendermintPublicKey;
        data[2] = bytes32(uint(l.owner));
        e.emitEvent("ValidatorTouchedAndRemoved", data, "");
    }

    function emitValidatorChallenged(bytes32 tendermintPublicKey, address owner, address challenger, uint challengeId, uint pollId, string storage details) internal {
        bytes32[] memory data = new bytes32[](5);
        data[0] = tendermintPublicKey;
        data[1] = bytes32(uint(owner));
        data[2] = bytes32(uint(challenger));
        data[3] = bytes32(challengeId);
        data[4] = bytes32(pollId);
        e.emitEvent("ValidatorChallenged", data, details);
    }
}
