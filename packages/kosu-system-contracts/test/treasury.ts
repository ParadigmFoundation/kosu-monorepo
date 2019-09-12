import { BigNumber } from "@0x/utils";
import { soliditySha3 } from "web3-utils";

import { AuthorizedAddressesContract, KosuTokenContract, PosterRegistryContract, TreasuryContract } from "../src";

describe("Treasury", async () => {
    let treasury: TreasuryContract;
    let kosuToken: KosuTokenContract;
    let auth: AuthorizedAddressesContract;
    let posterRegistry: PosterRegistryContract;

    before(async () => {
        treasury = contracts.treasury;
        kosuToken = contracts.kosuToken;
        auth = contracts.authorizedAddresses;
        posterRegistry = contracts.posterRegistry;
    });

    after(async () => {
        // Reverting setup
        await auth.unauthorizeAddress.awaitTransactionSuccessAsync(accounts[5]);
        await testHelpers.cleanAccounts();
    });

    beforeEach(async () => {
        // Account 5 is the executor
        await auth.authorizeAddress.awaitTransactionSuccessAsync(accounts[5]);

        // Account 1 holds 100 kosu, 50 approved
        await testHelpers.clearTreasury(accounts[1]);
        await testHelpers.ensureTokenBalance(accounts[1], TestValues.oneHundredWei);
        await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, TestValues.fiftyWei, {
            from: accounts[1],
        });

        // Account 2 holds 100 kosu, 50 approved
        await testHelpers.clearTreasury(accounts[2]);
        await testHelpers.ensureTokenBalance(accounts[2], TestValues.oneHundredWei);
        await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, TestValues.fiftyWei, {
            from: accounts[2],
        });

        // Account 3 has 100 kosu
        await testHelpers.clearTreasury(accounts[3]);
        await testHelpers.ensureTokenBalance(accounts[3], TestValues.oneHundredWei);
        await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, TestValues.oneHundredWei, {
            from: accounts[3],
        });
    });

    describe("deposit", () => {
        let expectedValue;
        let from;

        before(() => {
            expectedValue = TestValues.fiftyWei;
            from = accounts[1];
        });

        it("should remove tokens from user and add them to current and system balances", async () => {
            const initialTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(from);
            const initialSystemBalance = await treasury.systemBalance.callAsync(from);

            await treasury.deposit.awaitTransactionSuccessAsync(expectedValue, { from });

            const finalTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const finalCurrentBalance = await treasury.currentBalance.callAsync(from);
            const finalSystemBalance = await treasury.systemBalance.callAsync(from);

            initialTokenBalance
                .minus(finalTokenBalance)
                .toString()
                .should.eq(expectedValue.toString());
            finalCurrentBalance
                .minus(initialCurrentBalance)
                .toString()
                .should.eq(expectedValue.toString());
            finalSystemBalance
                .minus(initialSystemBalance)
                .toString()
                .should.eq(expectedValue.toString());
        });

        it("should work up to the current treasury allowance", async () => {
            const initialTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(from);
            const initialSystemBalance = await treasury.systemBalance.callAsync(from);
            (await kosuToken.allowance.callAsync(from, treasury.address))
                .toString()
                .should.eq(expectedValue.toString());

            await treasury.deposit.awaitTransactionSuccessAsync(expectedValue.plus(1), { from }).should.be.rejected;
            await treasury.deposit.awaitTransactionSuccessAsync(expectedValue, { from });

            const finalTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const finalCurrentBalance = await treasury.currentBalance.callAsync(from);
            const finalSystemBalance = await treasury.systemBalance.callAsync(from);

            initialTokenBalance
                .minus(finalTokenBalance)
                .toString()
                .should.eq(expectedValue.toString());
            finalCurrentBalance
                .minus(initialCurrentBalance)
                .toString()
                .should.eq(expectedValue.toString());
            finalSystemBalance
                .minus(initialSystemBalance)
                .toString()
                .should.eq(expectedValue.toString());
        });
    });

    describe("withdraw", () => {
        let expectedValue;
        let from;

        before(() => {
            expectedValue = TestValues.fiftyWei;
            from = accounts[1];
        });

        it("should return to user reducing current and system balances", async () => {
            await treasury.deposit.awaitTransactionSuccessAsync(expectedValue, { from });

            const initialTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(from);
            const initialSystemBalance = await treasury.systemBalance.callAsync(from);

            await treasury.withdraw.awaitTransactionSuccessAsync(expectedValue, { from });

            const finalTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const finalCurrentBalance = await treasury.currentBalance.callAsync(from);
            const finalSystemBalance = await treasury.systemBalance.callAsync(from);

            finalTokenBalance
                .minus(initialTokenBalance)
                .toString()
                .should.eq(expectedValue.toString());
            initialCurrentBalance
                .minus(finalCurrentBalance)
                .toString()
                .should.eq(expectedValue.toString());
            initialSystemBalance
                .minus(finalSystemBalance)
                .toString()
                .should.eq(expectedValue.toString());
        });

        it("should up to the total current balance", async () => {
            await treasury.deposit.awaitTransactionSuccessAsync(expectedValue, { from });
            await posterRegistry.registerTokens.awaitTransactionSuccessAsync(TestValues.oneWei, { from });

            const initialTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(from);
            const initialSystemBalance = await treasury.systemBalance.callAsync(from);

            initialCurrentBalance.toNumber().should.be.lt(expectedValue.toNumber());

            await treasury.withdraw.awaitTransactionSuccessAsync(expectedValue, { from }).should.be.rejected;
            await treasury.withdraw.awaitTransactionSuccessAsync(expectedValue.minus(1), { from }).should.be.fulfilled;

            const finalTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const finalCurrentBalance = await treasury.currentBalance.callAsync(from);
            const finalSystemBalance = await treasury.systemBalance.callAsync(from);

            finalTokenBalance
                .minus(initialTokenBalance)
                .toString()
                .should.eq(expectedValue.minus(1).toString());
            initialCurrentBalance
                .minus(finalCurrentBalance)
                .toString()
                .should.eq(expectedValue.minus(1).toString());
            initialSystemBalance
                .minus(finalSystemBalance)
                .toString()
                .should.eq(expectedValue.minus(1).toString());
            await posterRegistry.releaseTokens.awaitTransactionSuccessAsync(TestValues.oneWei, { from });
        });
    });

    describe("contractDeposit", () => {
        it("should pull tokens from the given accounts and track the balance.", async () => {
            await treasury.contractDeposit.awaitTransactionSuccessAsync(accounts[1], TestValues.fiftyWei, {
                from: accounts[5],
            }).should.eventually.be.fulfilled;

            await treasury.currentBalance
                .callAsync(accounts[1])
                .then(x => x.toString())
                .should.eventually.eq(TestValues.fiftyWei.toString());
        });

        it("should fail on insufficient token approval.", async () => {
            await treasury.contractDeposit.awaitTransactionSuccessAsync(accounts[1], new BigNumber("51"), {
                from: accounts[5],
            }).should.eventually.be.rejected;
        });

        it("should fail on insufficient token balance.", async () => {
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, new BigNumber("100000"), {
                from: accounts[1],
            });
            await treasury.contractDeposit.awaitTransactionSuccessAsync(accounts[1], new BigNumber("101"), {
                from: accounts[5],
            }).should.eventually.be.rejected;
        });
    });

    describe("contractWithdraw", () => {
        it("should reduce the balance by the provided value.", async () => {
            await treasury.contractDeposit.awaitTransactionSuccessAsync(accounts[3], TestValues.oneHundredWei, {
                from: accounts[5],
            });
            await treasury.contractWithdraw.awaitTransactionSuccessAsync(accounts[3], new BigNumber("75"), {
                from: accounts[5],
            }).should.eventually.be.fulfilled;

            await treasury.currentBalance
                .callAsync(accounts[3])
                .then(x => x.toString())
                .should.eventually.eq("25");
        });

        it("should fail on over withdraw.", async () => {
            await treasury.contractWithdraw.awaitTransactionSuccessAsync(accounts[3], new BigNumber("101"), {
                from: accounts[5],
            }).should.eventually.be.rejected;
        });
    });

    describe("claimTokens", () => {
        let expectedValue;
        let from;
        let target;

        before(() => {
            expectedValue = TestValues.fiftyWei;
            from = accounts[5];
            target = accounts[1];
        });

        it("should take tokens from user currentBalance and transfer to the requesting authorized caller", async () => {
            await treasury.deposit.awaitTransactionSuccessAsync(expectedValue, { from: target });

            const initialTargetTokenBalance = await kosuToken.balanceOf.callAsync(target);
            const initialFromTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(target);
            const initialSystemBalance = await treasury.systemBalance.callAsync(target);

            await treasury.claimTokens.awaitTransactionSuccessAsync(target, expectedValue, { from });

            const finalTargetTokenBalance = await kosuToken.balanceOf.callAsync(target);
            const finalFromTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const finalCurrentBalance = await treasury.currentBalance.callAsync(target);
            const finalSystemBalance = await treasury.systemBalance.callAsync(target);

            initialTargetTokenBalance.toString().should.eq(finalTargetTokenBalance.toString(), "Target Token Balance");
            finalFromTokenBalance
                .minus(initialFromTokenBalance)
                .toString()
                .should.eq(expectedValue.toString(), "From Token Balance");
            initialCurrentBalance
                .minus(finalCurrentBalance)
                .toString()
                .should.eq(expectedValue.toString(), "Current Balance");
            initialSystemBalance.toString().should.eq(finalSystemBalance.toString(), "System Balance");

            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, expectedValue, { from });
            await treasury.releaseTokens.awaitTransactionSuccessAsync(target, expectedValue, { from });
        });

        it("should pull tokens from the user automatically with a treasury allowance set", async () => {
            const initialTargetTokenBalance = await kosuToken.balanceOf.callAsync(target);
            const initialFromTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(target);
            const initialSystemBalance = await treasury.systemBalance.callAsync(target);

            await treasury.claimTokens.awaitTransactionSuccessAsync(target, expectedValue, { from });

            const finalTargetTokenBalance = await kosuToken.balanceOf.callAsync(target);
            const finalFromTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const finalCurrentBalance = await treasury.currentBalance.callAsync(target);
            const finalSystemBalance = await treasury.systemBalance.callAsync(target);

            initialTargetTokenBalance
                .minus(finalTargetTokenBalance)
                .toString()
                .should.eq(expectedValue.toString(), "Target Token Balance");
            finalFromTokenBalance
                .minus(initialFromTokenBalance)
                .toString()
                .should.eq(expectedValue.toString(), "From Token Balance");
            initialCurrentBalance
                .minus(finalCurrentBalance)
                .toString()
                .should.eq("0", "Current Balance");
            finalSystemBalance
                .minus(initialSystemBalance)
                .toString()
                .should.eq(expectedValue.toString(), "System Balance");

            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, expectedValue, { from });
            await treasury.releaseTokens.awaitTransactionSuccessAsync(target, expectedValue, { from });
        });
    });

    describe("releaseTokens", () => {
        let expectedValue;
        let from;
        let target;

        before(() => {
            expectedValue = TestValues.fiftyWei;
            from = accounts[5];
            target = accounts[1];
        });

        it("should take tokens from user currentBalance and transfer to the requesting authorized caller", async () => {
            await treasury.claimTokens.awaitTransactionSuccessAsync(target, expectedValue, { from });

            const initialTargetTokenBalance = await kosuToken.balanceOf.callAsync(target);
            const initialFromTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(target);
            const initialSystemBalance = await treasury.systemBalance.callAsync(target);

            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, expectedValue, { from });
            await treasury.releaseTokens.awaitTransactionSuccessAsync(target, expectedValue, { from });

            const finalTargetTokenBalance = await kosuToken.balanceOf.callAsync(target);
            const finalFromTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const finalCurrentBalance = await treasury.currentBalance.callAsync(target);
            const finalSystemBalance = await treasury.systemBalance.callAsync(target);

            initialTargetTokenBalance.toString().should.eq(finalTargetTokenBalance.toString(), "Target Token Balance");
            initialFromTokenBalance
                .minus(finalFromTokenBalance)
                .toString()
                .should.eq(expectedValue.toString(), "From Token Balance");
            finalCurrentBalance
                .minus(initialCurrentBalance)
                .toString()
                .should.eq(expectedValue.toString(), "Current Balance");
            finalSystemBalance.toString().should.eq(initialSystemBalance.toString(), "System Balance");
        });
    });

    describe("confiscate", () => {
        let expectedValue;
        let from;
        let target;

        before(() => {
            expectedValue = TestValues.fiftyWei;
            from = accounts[5];
            target = accounts[1];
        });

        it("should correctly remove systemBalance from the user", async () => {
            await treasury.deposit.awaitTransactionSuccessAsync(expectedValue, { from: target });
            await treasury.claimTokens.awaitTransactionSuccessAsync(target, expectedValue, { from });

            const initialTargetTokenBalance = await kosuToken.balanceOf.callAsync(target);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(target);
            const initialSystemBalance = await treasury.systemBalance.callAsync(target);

            await treasury.confiscate.awaitTransactionSuccessAsync(target, expectedValue, { from });

            const finalTargetTokenBalance = await kosuToken.balanceOf.callAsync(target);
            const finalCurrentBalance = await treasury.currentBalance.callAsync(target);
            const finalSystemBalance = await treasury.systemBalance.callAsync(target);

            initialTargetTokenBalance.toString().should.eq(finalTargetTokenBalance.toString(), "Target Token Balance");
            finalCurrentBalance.toString().should.eq(initialCurrentBalance.toString(), "Current Balance");
            initialSystemBalance
                .minus(finalSystemBalance)
                .toString()
                .should.eq(expectedValue.toString(), "System Balance");

            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, expectedValue, { from });
            await treasury.award.awaitTransactionSuccessAsync(target, expectedValue, { from });
        });
    });

    describe("award", () => {
        let expectedValue;
        let from;
        let target;

        before(() => {
            expectedValue = TestValues.fiftyWei;
            from = accounts[5];
            target = accounts[1];
        });

        it("should transfer tokens held by the calling address to the recipient and increase its current and system balances", async () => {
            await treasury.deposit.awaitTransactionSuccessAsync(expectedValue, { from: target });
            await treasury.claimTokens.awaitTransactionSuccessAsync(target, expectedValue, { from });
            await treasury.confiscate.awaitTransactionSuccessAsync(target, expectedValue, { from });

            const initialTargetTokenBalance = await kosuToken.balanceOf.callAsync(target); // 50
            const initialCurrentBalance = await treasury.currentBalance.callAsync(target); // 0
            const initialSystemBalance = await treasury.systemBalance.callAsync(target); // 0

            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, expectedValue, { from });
            await treasury.award.awaitTransactionSuccessAsync(target, expectedValue, { from });

            const finalTargetTokenBalance = await kosuToken.balanceOf.callAsync(target); // 50
            const finalCurrentBalance = await treasury.currentBalance.callAsync(target); // 50
            const finalSystemBalance = await treasury.systemBalance.callAsync(target); // 50

            initialTargetTokenBalance.toString().should.eq(finalTargetTokenBalance.toString(), "Target Token Balance");
            finalCurrentBalance
                .minus(initialCurrentBalance)
                .toString()
                .should.eq(expectedValue.toString(), "Current Balance");
            finalSystemBalance
                .minus(initialSystemBalance)
                .toString()
                .should.eq(expectedValue.toString(), "System Balance");
        });
    });

    describe("currentBalance", () => {
        it("should return the current value of the input token for the provided user", async () => {
            await treasury.currentBalance
                .callAsync(accounts[3])
                .then(x => x.toString())
                .should.eventually.eq("0");
            await treasury.contractDeposit.awaitTransactionSuccessAsync(accounts[3], TestValues.oneHundredWei, {
                from: accounts[5],
            });
            await treasury.currentBalance
                .callAsync(accounts[3])
                .then(x => x.toString())
                .should.eventually.eq(TestValues.oneHundredWei.toString());
        });
    });

    describe("Authorizeable", () => {
        describe("isAuthorized", () => {
            it("should allow an added account to call protected methods", async () => {
                await auth.unauthorizeAddress.awaitTransactionSuccessAsync(accounts[6]);

                await treasury.contractDeposit.awaitTransactionSuccessAsync(accounts[1], TestValues.fiftyWei, {
                    from: accounts[6],
                }).should.eventually.be.rejected;

                await auth.authorizeAddress.awaitTransactionSuccessAsync(accounts[6]);

                await kosuToken.allowance
                    .callAsync(accounts[1], treasury.address)
                    .then(x => x.toString())
                    .should.eventually.eq(TestValues.fiftyWei.toString());
                await kosuToken.balanceOf
                    .callAsync(accounts[1])
                    .then(x => x.toString())
                    .should.eventually.eq(TestValues.oneHundredWei.toString());
                await treasury.contractDeposit.awaitTransactionSuccessAsync(accounts[1], TestValues.fiftyWei, {
                    from: accounts[6],
                }).should.eventually.be.fulfilled;
            });
        });
    });

    describe("fallback", () => {
        it("should correctly mint tokens through the treasury payable function", async () => {
            const initialSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);
            const expectedReturn = await kosuToken.estimateEtherToToken.callAsync(TestValues.oneEther);

            await web3Wrapper
                .sendTransactionAsync({
                    to: treasury.address,
                    value: TestValues.oneEther,
                    from: accounts[0],
                    gas: 4500000,
                })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

            const finalSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const finalCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            initialSystemBalance
                .plus(expectedReturn)
                .toString()
                .should.eq(finalSystemBalance.toString());
            initialCurrentBalance
                .plus(expectedReturn)
                .toString()
                .should.eq(finalCurrentBalance.toString());
        });
    });

    describe("TokenLocks", () => {
        const salt = new BigNumber("42");
        const vote1 = new BigNumber("1");
        const vote2 = new BigNumber("2");
        const secret1 = soliditySha3({ t: "uint", v: new BigNumber("1") }, { t: "uint", v: salt });
        const secret2 = soliditySha3({ t: "uint", v: new BigNumber("2") }, { t: "uint", v: salt });


        it("should lock a validator after exit", async () => {
            await testHelpers.prepareListing("0x010203", {
                reward: await contracts.validatorRegistry.maxRewardRate.callAsync(),
            });
            await contracts.validatorRegistry.confirmListing.awaitTransactionSuccessAsync("0x010203");

            const result = await contracts.validatorRegistry.initExit.awaitTransactionSuccessAsync("0x010203");

            await testHelpers.skipExitPeriod(result.blockNumber);

            const result2 = await contracts.validatorRegistry.finalizeExit.awaitTransactionSuccessAsync("0x010203");

            const lockDuration = await contracts.validatorRegistry.exitLockPeriod.callAsync();
            const lock = await contracts.treasury.tokenLocksExpire.callAsync(accounts[0]);

            lockDuration.plus(result2.blockNumber).toString().should.eq(lock.toString());

            await testHelpers.clearTreasury(accounts[0]);
        });

        it("should lock a voter after commit until after the poll ends + winning side", async () => {
            await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[0], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[1], TestValues.fiveEther);
            const { pollId, blockNumber } = await testHelpers.variablePoll(2, 2, { win: new BigNumber(10), lose: new BigNumber(5) });
            await contracts.voting.commitVote.awaitTransactionSuccessAsync(pollId, secret1, TestValues.oneEther).should.eventually
                .be.fulfilled;
            await contracts.voting.commitVote.awaitTransactionSuccessAsync(pollId, secret2, TestValues.fiveEther, {
                from: accounts[1],
            }).should.eventually.be.fulfilled;
            await contracts.voting.revealVote.awaitTransactionSuccessAsync(pollId, vote1, salt).should.eventually.be.fulfilled;
            await contracts.voting.revealVote.awaitTransactionSuccessAsync(pollId, vote2, salt, { from: accounts[1] }).should
                .eventually.be.fulfilled;

            await testHelpers.skipBlocks(new BigNumber(1));
            await contracts.voting.userWinningTokens
                .callAsync(pollId, accounts[0])
                .then(x => x.toString())
                .should.eventually.eq("true,0");
            await treasury.tokenLocksExpire.callAsync(accounts[0])
                .then(x => x.toString())
                .should.eventually.eq((blockNumber + 4 + 5).toString());
        });

        it("should lock a voter after commit until after the poll ends + loosing side", async () => {
            await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[0], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[1], TestValues.fiveEther);
            const { pollId, blockNumber } = await testHelpers.variablePoll(2, 2, { win: new BigNumber(10), lose: new BigNumber(5) });
            await contracts.voting.commitVote.awaitTransactionSuccessAsync(pollId, secret1, TestValues.oneEther).should.eventually
                .be.fulfilled;
            await contracts.voting.commitVote.awaitTransactionSuccessAsync(pollId, secret2, TestValues.fiveEther, {
                from: accounts[1],
            }).should.eventually.be.fulfilled;
            await contracts.voting.revealVote.awaitTransactionSuccessAsync(pollId, vote1, salt).should.eventually.be.fulfilled;
            await contracts.voting.revealVote.awaitTransactionSuccessAsync(pollId, vote2, salt, { from: accounts[1] }).should
                .eventually.be.fulfilled;

            await testHelpers.skipBlocks(new BigNumber(1));
            await contracts.voting.userWinningTokens
                .callAsync(pollId, accounts[1])
                .then(x => x.toString())
                .should.eventually.eq([true, TestValues.fiveEther].toString());

            await treasury.tokenLocksExpire.callAsync(accounts[1])
                .then(x => x.toString())
                .should.eventually.eq((blockNumber + 4 + 10).toString());
        });
    });
});
