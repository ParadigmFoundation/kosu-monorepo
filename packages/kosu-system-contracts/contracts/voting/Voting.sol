pragma solidity ^0.5.0;

import "../treasury/Treasury.sol";
import "../event/EventEmitter.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

/** @title Voting
    @author Freydal
    @dev Voting manages polls and votes on governance matters within the Kosu system.  Poll resolution logic will be the responsibility of the contract utilizing this service.
*/
contract Voting {
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
        @return Poll index number. Will be used as the key for interacting with a vote.
    */
    function createPoll(uint _commitEndBlock, uint _revealEndBlock) public returns (uint) {//TODO is it a concern that polls could be created by anyone freely?
        // Reveal end after commit
        require(_commitEndBlock < _revealEndBlock);

        // Set poll data
        Poll storage p = polls[nextPollId];
        p.id = nextPollId;
        p.creator = msg.sender;
        p.commitEndBlock = _commitEndBlock;
        p.revealEndBlock = _revealEndBlock;

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
        //load Poll and Vote
        Poll storage p = polls[_pollId];
        Vote storage v = p.votes[msg.sender];

        //Ensure commit phase hasn't ended, the user has not committed and has adequate balance in the treasury
        require(block.number <= p.commitEndBlock);
        require(!p.didCommit[msg.sender]);
        require(treasury.registerVote(msg.sender, _pollId, _tokensToCommit, block.number + 100)); //TODO parameterize the 100
        require(_tokensToCommit > 0);

        //Set the tokens committed hidden vote data
        v.tokensCommitted = _tokensToCommit;
        v.hiddenVote = _vote;

        //Track voter address and set did commit.
        p.didCommit[msg.sender] = true;
    }

    /** @dev Reveal a previously committed vote by providing the vote option and salt used to generate the vote hash.
        @notice Reveal a previously committed vote by providing the vote option and salt used to generate the vote hash.
        @param _pollId Poll id to commit vote to.
        @param _voteOption Vote option used to generate vote hash.
        @param _voteSalt Salt used to generate vote hash.
    */
    function revealVote(uint _pollId, uint _voteOption, uint _voteSalt) public {
        Poll storage p = polls[_pollId];
        Vote storage v = p.votes[msg.sender];

        // Ensure commit phase has passed,  reveal phase has not.  User has commited but not revealed.  User has adequate balance in the treasury.
        require(block.number > p.commitEndBlock);
        require(block.number <= p.revealEndBlock);
        require(p.didCommit[msg.sender]);
        require(!p.didReveal[msg.sender]);

        // Calculate and compare the commited vote
        bytes32 exposedVote = keccak256(abi.encodePacked(_voteOption, _voteSalt));
        require(v.hiddenVote == exposedVote);

        // Store info from a valid revealed vote. Remove the pending vote.
        v.salt = _voteSalt;
        v.voteOption = _voteOption;
        p.didReveal[msg.sender] = true;
        p.voteValues[_voteOption] = p.voteValues[_voteOption].add(v.tokensCommitted);
        p.totalRevealedTokens = p.totalRevealedTokens.add(v.tokensCommitted);

        // Update winner and tracking
        if(p.currentLeadingOption != _voteOption && p.voteValues[_voteOption] > p.leadingTokens) {
            p.currentLeadingOption = _voteOption;
        }

        p.leadingTokens = p.voteValues[p.currentLeadingOption];
    }

    /** @dev Retrieve the winning option for a finalized poll.
        @param _pollId Poll index to check winning option for.
        @return The winning option.
    */
    function winningOption(uint _pollId) public view returns (uint) {
        Poll memory p = polls[_pollId];
        require(p.revealEndBlock < block.number);
        return p.currentLeadingOption;
    }

    /** @dev Retrieve the total number of tokens that supported the winning option of a finalized poll.
        @param _pollId Poll index to check winning tokens for.
        @return The uint number of tokens supporting the winning option.
    */
    function totalWinningTokens(uint _pollId) public view returns (uint) {
        Poll memory p = polls[_pollId];
        require(p.revealEndBlock < block.number);
        return p.leadingTokens;
    }

    /** @dev Retrieve the total number of tokens revealed for a finalized poll.
        @param _pollId Poll index to check total revealed tokens for.
        @return The total number of tokens revealed in the poll.
    */
    function totalRevealedTokens(uint _pollId) public view returns (uint) {
        Poll memory p = polls[_pollId];
        require(p.revealEndBlock < block.number);
        return p.totalRevealedTokens;
    }

    /** @dev Retrieve the number of tokens committed by a user for the winning option.
        @param _pollId Poll index to check winning tokens for.
        @param _user Address of user to check winning tokens.
    */
    function userWinningTokens(uint _pollId, address _user) public view returns (uint tokens) {
        Poll memory p = polls[_pollId];
        require(p.revealEndBlock < block.number);
        Vote memory v = polls[_pollId].votes[_user];

        if(p.currentLeadingOption == v.voteOption) {
            tokens = v.tokensCommitted;
        }

        return tokens;
    }
}
