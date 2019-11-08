pragma solidity ^0.5.0;

import "../treasury/Treasury.sol";
import "../event/EventEmitter.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./IVoting.sol";

/** @title Voting
    @author Freydal
    @dev Voting manages polls and votes on governance matters within the Kosu system.  Poll resolution logic will be the responsibility of the contract utilizing this service.
*/
contract Voting is IVoting {
    using SafeMath for uint;

    Treasury private treasury;
    EventEmitter private emitter;
    uint public nextPollId = 1;
    mapping(uint => Poll) polls;

    struct Poll {
        uint id;
        address creator;
        uint commitEndBlock;
        uint revealEndBlock;
        uint winnerLockEnd;
        uint loserLockEnd;
        uint currentLeadingOption;
        uint leadingTokens;
        uint totalRevealedTokens;
        mapping(uint => uint) voteValues;
        mapping(address => bool) didCommit;
        mapping(address => bool) didReveal;
        mapping(address => Vote) votes;
    }

    struct Vote {
        bytes32 hiddenVote;
        uint tokensCommitted;
        uint salt;
        uint voteOption;
    }

    /** @dev Initializes the voting contract with the shared event emitter and treasury contracts.
        @notice Initializes the voting contract with the shared event emitter and treasury contracts.
        @param treasuryAddress Deployed Treasury address.
        @param _emitterAddress Deployed EventEmitter address.
    */
    constructor(address payable treasuryAddress, address _emitterAddress) public {
        emitter = EventEmitter(_emitterAddress);
        treasury = Treasury(treasuryAddress);
    }

    /** @dev Create a new poll. The commit and reveal periods must be provided. The creation of the poll is notified with an event from the shared EventEmitter.
        @notice Create a new poll. The commit and reveal periods must be provided. The creation of the poll is notified with an event from the shared EventEmitter.
        @param _commitEndBlock Block number when commit phase ends.
        @param _revealEndBlock Block number when reveal phase ends.
        @param _winnerLock Blocks after poll winning voters' tokens are locked.
        @param _loserLock Blocks after poll losing voters' tokens are locked.
        @return Poll index number. Will be used as the key for interacting with a vote.
    */
    function createPoll(uint _commitEndBlock, uint _revealEndBlock, uint _winnerLock, uint _loserLock) public returns (uint) {
        // Reveal end after commit
        require(_commitEndBlock < _revealEndBlock, "commit must end before reveal");

        // Set poll data
        Poll storage p = polls[nextPollId];
        p.id = nextPollId;
        p.creator = msg.sender;
        p.commitEndBlock = _commitEndBlock;
        p.revealEndBlock = _revealEndBlock;
        p.winnerLockEnd = _revealEndBlock + _winnerLock;
        p.loserLockEnd = _revealEndBlock + _loserLock;

        // Increase next poll index
        nextPollId++;

        // Format data and emit event
        bytes32[] memory data = new bytes32[](4);
        data[0] = bytes32(uint(p.creator));
        data[1] = bytes32(p.id);
        data[2] = bytes32(_commitEndBlock);
        data[3] = bytes32(_revealEndBlock);
        emitter.emitEvent('PollCreated', data, "");

        // Return the poll id
        return p.id;
    }

    /** @dev Commit a vote in a poll to be later revealed. The salt and option must be retained for a successful reveal.
        @notice Commit a vote in a poll to be later revealed. The salt and option must be retained for a successful reveal.
        @param _pollId Poll id to commit vote to.
        @param _vote Hash encoded vote option with salt.
        @param _tokensToCommit Number of tokens to commit to vote.
    */
    function commitVote(uint _pollId, bytes32 _vote, uint _tokensToCommit) public {
        Poll storage p = polls[_pollId];
        require(treasury.registerVote(msg.sender, _pollId, _tokensToCommit, p.winnerLockEnd, p.loserLockEnd), "insufficient tokens");
        _commitVote(_pollId, msg.sender, _vote, _tokensToCommit);
    }


    /** @dev Commit a vote in a poll for another address to be later revealed. The salt and option must be retained for a successful reveal.
        @notice Commit a vote in a poll for another address to be later revealed. The salt and option must be retained for a successful reveal.
        @param _pollId Poll id to commit vote to.
        @param _tokenHolder Address to submit commit in proxy of.
        @param _vote Hash encoded vote option with salt.
        @param _tokensToCommit Number of tokens to commit to vote.
    */
    function commitProxyVote(uint _pollId, address _tokenHolder, bytes32 _vote, uint _tokensToCommit) public {
        Poll storage p = polls[_pollId];
        require(treasury.registerProxyVote(msg.sender, _tokenHolder, _pollId, _tokensToCommit, p.winnerLockEnd, p.loserLockEnd), "insufficient tokens");
        _commitVote(_pollId, _tokenHolder, _vote, _tokensToCommit);
    }

    /** @dev Reveal a previously committed vote by providing the vote option and salt used to generate the vote hash.
        @notice Reveal a previously committed vote by providing the vote option and salt used to generate the vote hash.
        @param _pollId Poll id to commit vote to.
        @param _voteOption Vote option used to generate vote hash.
        @param _voteSalt Salt used to generate vote hash.
    */
    function revealVote(uint _pollId, uint _voteOption, uint _voteSalt) public {
        _revealVote(_pollId, msg.sender, _voteOption, _voteSalt);
    }

    /** @dev Reveal a previously committed vote for another address by providing the vote option and salt used to generate the vote hash.
        @notice Reveal a previously committed vote for another address by providing the vote option and salt used to generate the vote hash.
        @param _pollId Poll id to commit vote to.
        @param _tokenHolder Address to submit reveal in proxy of.
        @param _voteOption Vote option used to generate vote hash.
        @param _voteSalt Salt used to generate vote hash.
    */
    function revealProxyVote(uint _pollId, address _tokenHolder, uint _voteOption, uint _voteSalt) public {
        require(treasury.isProxyFor(_tokenHolder, msg.sender), "not valid proxy");

        _revealVote(_pollId, _tokenHolder, _voteOption, _voteSalt);
    }

    /** @dev Retrieve the winning option for a finalized poll.
        @param _pollId Poll index to check winning option for.
        @return The winning option.
    */
    function winningOption(uint _pollId) public view returns (uint) {
        Poll memory p = polls[_pollId];
        require(p.revealEndBlock < block.number, "poll hasn't ended");
        return p.currentLeadingOption;
    }

    /** @dev Retrieve the total number of tokens that supported the winning option of a finalized poll.
        @param _pollId Poll index to check winning tokens for.
        @return The uint number of tokens supporting the winning option.
    */
    function totalWinningTokens(uint _pollId) public view returns (uint) {
        Poll memory p = polls[_pollId];
        require(p.revealEndBlock < block.number, "poll hasn't ended");
        return p.leadingTokens;
    }

    /** @dev Retrieve the total number of tokens revealed for a finalized poll.
        @param _pollId Poll index to check total revealed tokens for.
        @return The total number of tokens revealed in the poll.
    */
    function totalRevealedTokens(uint _pollId) public view returns (uint) {
        Poll memory p = polls[_pollId];
        require(p.revealEndBlock < block.number, "poll hasn't ended");
        return p.totalRevealedTokens;
    }

    /** @dev Retrieve the number of tokens committed by a user for the winning option.
        @param _pollId Poll index to check winning tokens for.
        @param _user Address of user to check winning tokens.
    */
    function userWinningTokens(uint _pollId, address _user) public view returns (bool ended, uint tokens) {
        Poll memory p = polls[_pollId];

        if(p.revealEndBlock > block.number) {
            return (false, 0);
        }

        Vote memory v = polls[_pollId].votes[_user];

        if(p.currentLeadingOption == v.voteOption) {
            tokens = v.tokensCommitted;
        }

        return (true, tokens);
    }

    // INTERNAL

    /** @dev Commit votes
    */
    function _commitVote(uint _pollId, address _tokenHolder, bytes32 _vote, uint _tokensToCommit) internal {
        //load Poll and Vote
        Poll storage p = polls[_pollId];
        Vote storage v = p.votes[_tokenHolder];

        //Ensure commit phase hasn't ended, the user has not committed and has adequate balance in the treasury
        require(block.number <= p.commitEndBlock, "commit has ended");
        require(!p.didCommit[_tokenHolder], "address committed");
        require(_tokensToCommit > 0, "must commit tokens to lock");

        //Set the tokens committed hidden vote data
        v.tokensCommitted = _tokensToCommit;
        v.hiddenVote = _vote;

        //Track voter address and set did commit.
        p.didCommit[_tokenHolder] = true;
    }

    /** @dev Reveal vote
    */
    function _revealVote(uint _pollId, address _tokenHolder, uint _voteOption, uint _voteSalt) internal {
        Poll storage p = polls[_pollId];
        Vote storage v = p.votes[_tokenHolder];

        // Ensure commit phase has passed,  reveal phase has not.  User has commited but not revealed.  User has adequate balance in the treasury.
        require(block.number > p.commitEndBlock, "commit hasn't ended");
        require(block.number <= p.revealEndBlock, "reveal has ended");
        require(p.didCommit[_tokenHolder], "address hasn't committed");
        require(!p.didReveal[_tokenHolder], "address has revealed");

        // Calculate and compare the commited vote
        bytes32 exposedVote = keccak256(abi.encodePacked(_voteOption, _voteSalt));
        require(v.hiddenVote == exposedVote, "vote doesn't match");

        // Store info from a valid revealed vote. Remove the pending vote.
        v.salt = _voteSalt;
        v.voteOption = _voteOption;
        p.didReveal[_tokenHolder] = true;
        p.voteValues[_voteOption] = p.voteValues[_voteOption].add(v.tokensCommitted);
        p.totalRevealedTokens = p.totalRevealedTokens.add(v.tokensCommitted);

        // Update winner and tracking
        if(p.currentLeadingOption != _voteOption && p.voteValues[_voteOption] > p.leadingTokens) {
            p.currentLeadingOption = _voteOption;
        }

        p.leadingTokens = p.voteValues[p.currentLeadingOption];
    }
}
