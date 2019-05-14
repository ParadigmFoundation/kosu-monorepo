import {BigNumber} from "@0x/utils";
import { soliditySha3 } from "web3-utils";

import {decodeKosuEvents, KosuTokenContract, TreasuryContract, VotingContract} from "../src";
import {migrations} from "../src/migrations";

describe("Voting", () => {
    let voting: VotingContract;
    let kosuToken: KosuTokenContract;
    let treasury: TreasuryContract;

    const prepareTokens = async (from, funds) => {
        await kosuToken.transfer.sendTransactionAsync(from, testValues.fiveEther);
        await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.maxUint, { from });
        await treasury.deposit.sendTransactionAsync(new BigNumber(funds), { from });
    };

    const shortPoll = async () => {
        await prepareTokens(accounts[0], testValues.fiveEther);
        const base = await web3Wrapper.getBlockNumberAsync().then(x => parseInt(x));
        await voting.createPoll.sendTransactionAsync(base + 2, base + 3);
    };

    const variablePoll = async (start: number, end: number) => {
        const base = await await web3Wrapper.getBlockNumberAsync().then(x => parseInt(x));
        const creationBlock = base + 1;
        const commitEnd = creationBlock + start;
        const revealEnd = commitEnd + end;
        await voting.createPoll.sendTransactionAsync(commitEnd, revealEnd);
    };

    const twoOnePoll = async () => {
        await prepareTokens(accounts[0], testValues.fiveEther);
        await variablePoll(2, 1);
    };

    const oneTwoPoll = async () => {
        await prepareTokens(accounts[0], testValues.fiveEther);
        await variablePoll(1, 2);
    };

    const salt = new BigNumber("42");
    const secret1 = soliditySha3({ t: "uint", v: new BigNumber("1") }, { t: "uint", v: salt });
    const secret2 = soliditySha3({ t: "uint", v: new BigNumber("2") }, { t: "uint", v: salt });

    beforeEach(async () => {
        const testContracts = await migrations(web3Wrapper.getProvider(), txDefaults, { noLogs: true });
        voting = testContracts.voting;
        kosuToken = testContracts.kosuToken;
        treasury = testContracts.treasury;
    });

    describe("createPoll", () => {
        it("should allow a poll to be created", async () => {
            const result  = await voting.createPoll.sendTransactionAsync(new BigNumber("1"), new BigNumber("2")).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            const decodedLogs = decodeKosuEvents(result.logs)[0];

            decodedLogs.eventType.should.eq("PollCreated");
            decodedLogs.pollCreator.should.eq(accounts[0].toLowerCase());
            decodedLogs.pollId.should.eq("1");

            await voting.nextPollId.callAsync().then(x => x.toString()).should.eventually.eq("2");
        });

        it("should not allow the commit end to be before reveal end", async () => {
            await voting.createPoll.sendTransactionAsync(new BigNumber("2"), new BigNumber("1")).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should not allow the commit end to be equal to reveal end", async () => {
            await voting.createPoll.sendTransactionAsync(new BigNumber("1"), new BigNumber("1")).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });
    });

    describe("commitVote", () => {
        beforeEach(shortPoll);

        it("should allow a user to commit a vote", async () => {
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
        });

        it("should not let a vote to be commited after the commit phase", async () => {
            await kosuToken.approve.sendTransactionAsync(accounts[1], new BigNumber("4")); // Skip a block
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should require tokens to vote", async () => {
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther, { from: accounts[2] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should not let a voter commit twice", async () => {
            await twoOnePoll();
            await voting.commitVote.sendTransactionAsync(new BigNumber("2"), secret1, testValues.fiveEther).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.commitVote.sendTransactionAsync(new BigNumber("2"), secret1, testValues.fiveEther).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });
    });

    describe("revealVote", () => {
        beforeEach(shortPoll);

        it("should allow a user to reveal a vote", async () => {
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
        });

        it("should not allow a user to reveal without commiting", async () => {
            await kosuToken.approve.sendTransactionAsync(accounts[1], new BigNumber("4"));
            await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should not allow a change in salt", async () => {
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), new BigNumber("24")).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should not allow a change in vote", async () => {
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("2"), salt).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should not allow a voter to reveal twice", async () => {
           await oneTwoPoll();
           await voting.commitVote.sendTransactionAsync(new BigNumber("2"), secret1, testValues.fiveEther).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
           await voting.revealVote.sendTransactionAsync(new BigNumber("2"), new BigNumber("1"), salt).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
           await voting.revealVote.sendTransactionAsync(new BigNumber("2"), new BigNumber("1"), salt).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should not allow a voter to reveal when the tokens are gone", async () => {
            await treasury.withdraw.sendTransactionAsync(testValues.fiveEther);
            await oneTwoPoll();
            await voting.commitVote.sendTransactionAsync(new BigNumber("2"), secret1, testValues.fiveEther).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await treasury.withdraw.sendTransactionAsync(new BigNumber("1"));
            await voting.revealVote.sendTransactionAsync(new BigNumber("2"), new BigNumber("1"), salt).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should make the correct changes to the results when revealed"); // TODO waiting on the data to be exposed
    });

    describe("winningOption", () => {
        it("should report the correct winningOption", async () => {
            await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[0], testValues.fiveEther);
            await prepareTokens(accounts[1], testValues.fiveEther);
            await variablePoll(2, 2);
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.oneEther).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret2, testValues.fiveEther, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("2"), salt, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

            await voting.winningOption.callAsync(new BigNumber("1")).then(x => x.toString()).should.eventually.eq("2");
        });

        it("should report the first winning option in a tie", async () => {
            await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[0], testValues.fiveEther);
            await prepareTokens(accounts[1], testValues.fiveEther);
            await variablePoll(2, 2);
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret2, testValues.fiveEther, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("2"), salt, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

            await voting.winningOption.callAsync(new BigNumber("1")).then(x => x.toString()).should.eventually.eq("2");
        });
    });

    describe("totalWinningTokens", () => {
        it("should report the correct number of total tokens contributed", async () => {
            await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[0], testValues.fiveEther);
            await prepareTokens(accounts[1], testValues.fiveEther);
            await variablePoll(2, 2);
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.oneEther).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

            await voting.totalWinningTokens.callAsync(new BigNumber("1")).then(x => x.toString()).should.eventually.eq(testValues.sixEther.toString());
        });
    });

    describe("userWinningTokens", () => {
        it("should report 0 when not a winning vote", async () => {
            await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[0], testValues.fiveEther);
            await prepareTokens(accounts[1], testValues.fiveEther);
            await variablePoll(2, 2);
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.oneEther).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret2, testValues.fiveEther, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("2"), salt, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

            await voting.userWinningTokens.callAsync(new BigNumber("1"), accounts[0]).then(x => x.toString()).should.eventually.eq("0");
        });

        it("should report the correct number of tokens", async () => {
            await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[0], testValues.fiveEther);
            await prepareTokens(accounts[1], testValues.fiveEther);
            await variablePoll(2, 2);
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.oneEther).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret2, testValues.fiveEther, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("2"), salt, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

            await voting.userWinningTokens.callAsync(new BigNumber("1"), accounts[1]).then(x => x.toString()).should.eventually.eq(testValues.fiveEther.toString());
        });
    });
});
