const Voting = artifacts.require("./Voting.sol");
const KosuToken = artifacts.require('./KosuToken.sol');
const Treasury = artifacts.require('./Treasury.sol');

contract('Voting', async (accounts) => {
    let voting, digm, treasury;

    const shortPoll = async () => {
        await prepareTokens(accounts[0], fiveEther);
        const base = await web3.eth.getBlockNumber().then(x => parseInt(x));
        await voting.createPoll(base + 2, base + 3);
    };

    const variablePoll = async (start, end) => {
        const base = await web3.eth.getBlockNumber().then(x => parseInt(x));
        const creationBlock = base + 1;
        const commitEnd = creationBlock + start;
        const revealEnd = commitEnd + end;
        await voting.createPoll(commitEnd, revealEnd);
    };

    const twoOnePoll = async () => {
        await prepareTokens(accounts[0], fiveEther);
        await variablePoll(2, 1);
    };

    const oneTwoPoll = async () => {
        await prepareTokens(accounts[0], fiveEther);
        await variablePoll(1, 2);
    };

    const salt = '42';
    const secret1 = web3.utils.soliditySha3({ t: 'uint', v: '1' }, { t: 'uint', v: salt });
    const secret2 = web3.utils.soliditySha3({ t: 'uint', v: '2' }, { t: 'uint', v: salt });

    before(async () => {
        voting = await Voting.deployed();
        digm = await KosuToken.deployed();
        treasury = await Treasury.deployed();
    });

    describe('createPoll', () => {
        it('should allow a poll to be created', async () => {
            const result  = await voting.createPoll(1, 2);
            assertEmitterEvents(result, 0, (decoded) => (
                decoded.eventType === 'PollCreated' &&
                decoded.pollCreator === accounts[0].toLowerCase() &&
                decoded.pollId === '1'
            ));
            await voting.nextPollId.call().then(x => x.toString()).should.eventually.eq('2')
        });

        it('should not allow the commit end to be before reveal end', async () => {
            await voting.createPoll(2, 1).should.eventually.be.rejected
        });

        it('should not allow the commit end to be equal to reveal end', async () => {
            await voting.createPoll(1, 1).should.eventually.be.rejected
        });
    });

    describe('commitVote', () => {
        beforeEach(shortPoll);

        it('should allow a user to commit a vote', async () => {
            await voting.commitVote(1, secret1, fiveEther).should.eventually.be.fulfilled;
        });

        it('should not let a vote to be commited after the commit phase', async () => {
            await digm.approve(accounts[1], '4'); //Skip a block
            await voting.commitVote(1, secret1, fiveEther).should.eventually.be.rejected;
        });

        it('should require tokens to vote', async () => {
            await voting.commitVote(1, secret1, fiveEther, { from: accounts[2] }).should.eventually.be.rejected;
        });

        it('should not let a voter commit twice', async () => {
            await twoOnePoll();
            await voting.commitVote(2, secret1, fiveEther).should.eventually.be.fulfilled;
            await voting.commitVote(2, secret1, fiveEther).should.eventually.be.rejected;
        })
    });

    describe('revealVote', () => {
        beforeEach(shortPoll);

        it('should allow a user to reveal a vote', async () => {
            await voting.commitVote(1, secret1, fiveEther).should.eventually.be.fulfilled;
            await voting.revealVote(1, 1, salt).should.eventually.be.fulfilled;
        });

        it('should not allow a user to reveal without commting', async () => {
            await digm.approve(accounts[1], '4');
            await voting.revealVote(1, 1, salt).should.eventually.be.rejected;
        });

        it('should not allow a change in salt', async () => {
            await voting.commitVote(1, secret1, fiveEther).should.eventually.be.fulfilled;
            await voting.revealVote(1, 1, 'notsalt').should.eventually.be.rejected;
        });

        it('should not allow a change in vote', async () => {
            await voting.commitVote(1, secret1, fiveEther).should.eventually.be.fulfilled;
            await voting.revealVote(1, 2, salt).should.eventually.be.rejected;
        });

        it('should not allow a voter to reveal twice', async () => {
           await oneTwoPoll();
           await voting.commitVote(2, secret1, fiveEther).should.eventually.be.fulfilled;
           await voting.revealVote(2, 1, salt).should.eventually.be.fulfilled;
           await voting.revealVote(2, 1, salt).should.eventually.be.rejected;
        });

        it('should not allow a voter to reveal when the tokens are gone', async () => {
            await treasury.withdraw(fiveEther);
            await oneTwoPoll();
            await voting.commitVote(2, secret1, fiveEther).should.eventually.be.fulfilled;
            await treasury.withdraw(1);
            await voting.revealVote(2, 1, salt).should.eventually.be.rejected;
        });

        it('should make the correct changes to the results when revealed')//TODO waiting on the data to be exposed
    });

    describe('winningOption', () => {
        it('should report the correct winningOption', async () => {
            await digm.transfer(accounts[1], fiveEther);
            await prepareTokens(accounts[0], fiveEther);
            await prepareTokens(accounts[1], fiveEther);
            await variablePoll(2, 2);
            await voting.commitVote(1, secret1, oneEther).should.eventually.be.fulfilled;
            await voting.commitVote(1, secret2, fiveEther, { from: accounts[1] }).should.eventually.be.fulfilled;
            await voting.revealVote(1, 1, salt).should.eventually.be.fulfilled;
            await voting.revealVote(1, 2, salt, { from: accounts[1] }).should.eventually.be.fulfilled;

            await voting.winningOption.call(1).then(x => x.toString()).should.eventually.eq('2');
        });

        it('should report the first winning option in a tie', async () => {
            await digm.transfer(accounts[1], fiveEther);
            await prepareTokens(accounts[0], fiveEther);
            await prepareTokens(accounts[1], fiveEther);
            await variablePoll(2, 2);
            await voting.commitVote(1, secret1, fiveEther).should.eventually.be.fulfilled;
            await voting.commitVote(1, secret2, fiveEther, { from: accounts[1] }).should.eventually.be.fulfilled;
            await voting.revealVote(1, 2, salt, { from: accounts[1] }).should.eventually.be.fulfilled;
            await voting.revealVote(1, 1, salt).should.eventually.be.fulfilled;

            await voting.winningOption.call(1).then(x => x.toString()).should.eventually.eq('2');
        });
    });

    describe('totalWinningTokens', () => {
        it('should report the correct number of total tokens contributed', async () => {
            await digm.transfer(accounts[1], fiveEther);
            await prepareTokens(accounts[0], fiveEther);
            await prepareTokens(accounts[1], fiveEther);
            await variablePoll(2, 2);
            await voting.commitVote(1, secret1, oneEther).should.eventually.be.fulfilled;
            await voting.commitVote(1, secret1, fiveEther, { from: accounts[1] }).should.eventually.be.fulfilled;
            await voting.revealVote(1, 1, salt).should.eventually.be.fulfilled;
            await voting.revealVote(1, 1, salt, { from: accounts[1] }).should.eventually.be.fulfilled;

            await voting.totalWinningTokens.call(1).then(x => x.toString()).should.eventually.eq(sixEther);
        });
    });

    describe('userWinningTokens', () => {
        it('should report 0 when not a winning vote', async () => {
            await digm.transfer(accounts[1], fiveEther);
            await prepareTokens(accounts[0], fiveEther);
            await prepareTokens(accounts[1], fiveEther);
            await variablePoll(2, 2);
            await voting.commitVote(1, secret1, oneEther).should.eventually.be.fulfilled;
            await voting.commitVote(1, secret2, fiveEther, { from: accounts[1] }).should.eventually.be.fulfilled;
            await voting.revealVote(1, 1, salt).should.eventually.be.fulfilled;
            await voting.revealVote(1, 2, salt, { from: accounts[1] }).should.eventually.be.fulfilled;

            await voting.userWinningTokens.call(1, accounts[0]).then(x => x.toString()).should.eventually.eq('0');
        });

        it('should report the correct number of tokens w', async () => {
            await digm.transfer(accounts[1], fiveEther);
            await prepareTokens(accounts[0], fiveEther);
            await prepareTokens(accounts[1], fiveEther);
            await variablePoll(2, 2);
            await voting.commitVote(1, secret1, oneEther).should.eventually.be.fulfilled;
            await voting.commitVote(1, secret2, fiveEther, { from: accounts[1] }).should.eventually.be.fulfilled;
            await voting.revealVote(1, 1, salt).should.eventually.be.fulfilled;
            await voting.revealVote(1, 2, salt, { from: accounts[1] }).should.eventually.be.fulfilled;

            await voting.userWinningTokens.call(1, accounts[1]).then(x => x.toString()).should.eventually.eq(fiveEther);
        });
    });
});
