import { BigNumber } from "@0x/utils";

import { AuthorizedAddressesContract, KosuTokenContract, PosterRegistryProxyContract, TreasuryContract } from "../src";

describe("Treasury", async () => {
    let treasury: TreasuryContract;
    let kosuToken: KosuTokenContract;
    let auth: AuthorizedAddressesContract;
    let posterRegistry: PosterRegistryProxyContract;

    before(async () => {
        treasury = contracts.treasury;
        kosuToken = contracts.kosuToken;
        auth = contracts.authorizedAddresses;
        posterRegistry = contracts.posterRegistryProxy;
    });

    after(async () => {
        // Reverting setup
        await auth.unauthorizeAddress
            .sendTransactionAsync(accounts[5])
            .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        await cleanAccounts();
    });

    beforeEach(async () => {
        // Account 5 is the executor
        await auth.authorizeAddress.sendTransactionAsync(accounts[5]);

        // Account 1 holds 100 kosu, 50 approved
        await clearTreasury(accounts[1]);
        await ensureTokenBalance(accounts[1], testValues.oneHundredWei);
        await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.fiftyWei, { from: accounts[1] });

        // Account 2 holds 100 kosu, 50 approved
        await clearTreasury(accounts[2]);
        await ensureTokenBalance(accounts[2], testValues.oneHundredWei);
        await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.fiftyWei, { from: accounts[2] });

        // Account 3 has 100 kosu
        await clearTreasury(accounts[3]);
        await ensureTokenBalance(accounts[3], testValues.oneHundredWei);
        await kosuToken.approve
            .sendTransactionAsync(treasury.address, testValues.oneHundredWei, { from: accounts[3] })
            .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
    });

    describe("deposit", () => {
        let expectedValue;
        let from;

        before(() => {
            expectedValue = testValues.fiftyWei;
            from = accounts[1];
        });

        it("should remove tokens from user and add them to current and system balances", async () => {
            const initialTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(from);
            const initialSystemBalance = await treasury.systemBalance.callAsync(from);

            await treasury.deposit
                .sendTransactionAsync(expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

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

            await treasury.deposit
                .sendTransactionAsync(expectedValue.plus(1), { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.be.rejected;
            await treasury.deposit
                .sendTransactionAsync(expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

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
            expectedValue = testValues.fiftyWei;
            from = accounts[1];
        });

        it("should return to user reducing current and system balances", async () => {
            await treasury.deposit
                .sendTransactionAsync(expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

            const initialTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(from);
            const initialSystemBalance = await treasury.systemBalance.callAsync(from);

            await treasury.withdraw
                .sendTransactionAsync(expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

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
            await treasury.deposit
                .sendTransactionAsync(expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
            await posterRegistry.registerTokens
                .sendTransactionAsync(testValues.oneWei, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

            const initialTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(from);
            const initialSystemBalance = await treasury.systemBalance.callAsync(from);

            initialCurrentBalance.toNumber().should.be.lt(expectedValue.toNumber());

            await treasury.withdraw
                .sendTransactionAsync(expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.be.rejected;
            await treasury.withdraw
                .sendTransactionAsync(expectedValue.minus(1), { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.be.fulfilled;

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
            await posterRegistry.releaseTokens
                .sendTransactionAsync(testValues.oneWei, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        });
    });

    describe("contractDeposit", () => {
        it("should pull tokens from the given accounts and track the balance.", async () => {
            await treasury.contractDeposit
                .sendTransactionAsync(accounts[1], testValues.fiftyWei, { from: accounts[5] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

            await treasury.currentBalance
                .callAsync(accounts[1])
                .then(x => x.toString())
                .should.eventually.eq(testValues.fiftyWei.toString());
        });

        it("should fail on insufficient token approval.", async () => {
            await treasury.contractDeposit
                .sendTransactionAsync(accounts[1], new BigNumber("51"), { from: accounts[5] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should fail on insufficient token balance.", async () => {
            await kosuToken.approve.sendTransactionAsync(treasury.address, new BigNumber("100000"), {
                from: accounts[1],
            });
            await treasury.contractDeposit
                .sendTransactionAsync(accounts[1], new BigNumber("101"), { from: accounts[5] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });
    });

    describe("contractWithdraw", () => {
        it("should reduce the balance by the provided value.", async () => {
            await treasury.contractDeposit.sendTransactionAsync(accounts[3], testValues.oneHundredWei, {
                from: accounts[5],
            });
            await treasury.contractWithdraw
                .sendTransactionAsync(accounts[3], new BigNumber("75"), { from: accounts[5] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

            await treasury.currentBalance
                .callAsync(accounts[3])
                .then(x => x.toString())
                .should.eventually.eq("25");
        });

        it("should fail on over withdraw.", async () => {
            await treasury.contractWithdraw
                .sendTransactionAsync(accounts[3], new BigNumber("101"), { from: accounts[5] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });
    });

    describe("claimTokens", () => {
        let expectedValue;
        let from;
        let target;

        before(() => {
            expectedValue = testValues.fiftyWei;
            from = accounts[5];
            target = accounts[1];
        });

        it("should take tokens from user currentBalance and transfer to the requesting authorized caller", async () => {
            await treasury.deposit
                .sendTransactionAsync(expectedValue, { from: target })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

            const initialTargetTokenBalance = await kosuToken.balanceOf.callAsync(target);
            const initialFromTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(target);
            const initialSystemBalance = await treasury.systemBalance.callAsync(target);

            await treasury.claimTokens
                .sendTransactionAsync(target, expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

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

            await kosuToken.approve.sendTransactionAsync(treasury.address, expectedValue, { from });
            await treasury.releaseTokens
                .sendTransactionAsync(target, expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        });

        it("should pull tokens from the user automatically with a treasury allowance set", async () => {
            const initialTargetTokenBalance = await kosuToken.balanceOf.callAsync(target);
            const initialFromTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(target);
            const initialSystemBalance = await treasury.systemBalance.callAsync(target);

            await treasury.claimTokens
                .sendTransactionAsync(target, expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

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

            await kosuToken.approve.sendTransactionAsync(treasury.address, expectedValue, { from });
            await treasury.releaseTokens
                .sendTransactionAsync(target, expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        });
    });

    describe("releaseTokens", () => {
        let expectedValue;
        let from;
        let target;

        before(() => {
            expectedValue = testValues.fiftyWei;
            from = accounts[5];
            target = accounts[1];
        });

        it("should take tokens from user currentBalance and transfer to the requesting authorized caller", async () => {
            await treasury.claimTokens
                .sendTransactionAsync(target, expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

            const initialTargetTokenBalance = await kosuToken.balanceOf.callAsync(target);
            const initialFromTokenBalance = await kosuToken.balanceOf.callAsync(from);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(target);
            const initialSystemBalance = await treasury.systemBalance.callAsync(target);

            await kosuToken.approve.sendTransactionAsync(treasury.address, expectedValue, { from });
            await treasury.releaseTokens
                .sendTransactionAsync(target, expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

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

    describe("updateBalance", () => {
        it("should make required changes for balance to end at desired value.", async () => {
            await kosuToken.approve.sendTransactionAsync(treasury.address, new BigNumber("100000"), {
                from: accounts[3],
            });
            await treasury.contractDeposit
                .sendTransactionAsync(accounts[3], testValues.oneHundredWei, {
                    from: accounts[5],
                })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

            await treasury.currentBalance
                .callAsync(accounts[3])
                .then(x => x.toString())
                .should.eventually.eq(testValues.oneHundredWei.toString());

            await treasury.updateBalance
                .sendTransactionAsync(accounts[3], new BigNumber("73"), { from: accounts[5] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

            await treasury.currentBalance
                .callAsync(accounts[3])
                .then(x => x.toString())
                .should.eventually.eq("73");

            await treasury.updateBalance
                .sendTransactionAsync(accounts[3], new BigNumber("80"), { from: accounts[5] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

            await treasury.currentBalance
                .callAsync(accounts[3])
                .then(x => x.toString())
                .should.eventually.eq("80");

            await kosuToken.balanceOf
                .callAsync(accounts[3])
                .then(x => x.toString())
                .should.eventually.eq("20");
        });

        it("should fail on insufficient token approval.", async () => {
            await treasury.updateBalance
                .sendTransactionAsync(accounts[1], new BigNumber("51"), { from: accounts[5] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should fail on insufficient token balance.", async () => {
            await kosuToken.approve.sendTransactionAsync(treasury.address, new BigNumber("100000"), {
                from: accounts[1],
            });

            await treasury.updateBalance
                .sendTransactionAsync(accounts[1], new BigNumber("101"), { from: accounts[5] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });
    });

    describe("adjustBalance", () => {
        it("should change the balance by the provided value", async () => {
            await kosuToken.approve.sendTransactionAsync(treasury.address, new BigNumber("100000"), {
                from: accounts[3],
            });
            await treasury.contractDeposit
                .sendTransactionAsync(accounts[3], testValues.oneHundredWei, {
                    from: accounts[5],
                })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
            await treasury.currentBalance
                .callAsync(accounts[3])
                .then(x => x.toString())
                .should.eventually.eq(testValues.oneHundredWei.toString());

            // should handle negative change
            await treasury.adjustBalance
                .sendTransactionAsync(accounts[3], new BigNumber("-27"), { from: accounts[5] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
            await treasury.currentBalance
                .callAsync(accounts[3])
                .then(x => x.toString())
                .should.eventually.eq("73");

            // should handle 0
            await treasury.adjustBalance
                .sendTransactionAsync(accounts[3], new BigNumber("0"), { from: accounts[5] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
            await treasury.currentBalance
                .callAsync(accounts[3])
                .then(x => x.toString())
                .should.eventually.eq("73");

            // should handle positive change
            await treasury.adjustBalance
                .sendTransactionAsync(accounts[3], new BigNumber("7"), { from: accounts[5] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
            await treasury.currentBalance
                .callAsync(accounts[3])
                .then(x => x.toString())
                .should.eventually.eq("80");

            await kosuToken.balanceOf
                .callAsync(accounts[3])
                .then(x => x.toString())
                .should.eventually.eq("20");
        });

        it("should fail on over withdraw.", async () => {
            await treasury.adjustBalance
                .sendTransactionAsync(accounts[3], new BigNumber("-101"), { from: accounts[5] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should fail on insufficient token approval.", async () => {
            await kosuToken.approve.sendTransactionAsync(treasury.address, new BigNumber("0"), { from: accounts[3] });

            await treasury.adjustBalance
                .sendTransactionAsync(accounts[3], new BigNumber("1"), { from: accounts[5] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });

        it("should fail on insufficient token balance.", async () => {
            await kosuToken.approve.sendTransactionAsync(treasury.address, new BigNumber("100000"), {
                from: accounts[3],
            });

            await treasury.adjustBalance
                .sendTransactionAsync(accounts[3], new BigNumber("101"), { from: accounts[5] })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
        });
    });

    describe("confiscate", () => {
        let expectedValue;
        let from;
        let target;

        before(() => {
            expectedValue = testValues.fiftyWei;
            from = accounts[5];
            target = accounts[1];
        });

        it("should correctly remove systemBalance from the user", async () => {
            await treasury.deposit
                .sendTransactionAsync(expectedValue, { from: target })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
            await treasury.claimTokens
                .sendTransactionAsync(target, expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

            const initialTargetTokenBalance = await kosuToken.balanceOf.callAsync(target);
            const initialCurrentBalance = await treasury.currentBalance.callAsync(target);
            const initialSystemBalance = await treasury.systemBalance.callAsync(target);

            await treasury.confiscate
                .sendTransactionAsync(target, expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

            const finalTargetTokenBalance = await kosuToken.balanceOf.callAsync(target);
            const finalCurrentBalance = await treasury.currentBalance.callAsync(target);
            const finalSystemBalance = await treasury.systemBalance.callAsync(target);

            initialTargetTokenBalance.toString().should.eq(finalTargetTokenBalance.toString(), "Target Token Balance");
            finalCurrentBalance.toString().should.eq(initialCurrentBalance.toString(), "Current Balance");
            initialSystemBalance
                .minus(finalSystemBalance)
                .toString()
                .should.eq(expectedValue.toString(), "System Balance");

            await kosuToken.approve.sendTransactionAsync(treasury.address, expectedValue, { from });
            await treasury.award
                .sendTransactionAsync(target, expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
        });
    });

    describe("award", () => {
        let expectedValue;
        let from;
        let target;

        before(() => {
            expectedValue = testValues.fiftyWei;
            from = accounts[5];
            target = accounts[1];
        });

        it("should transfer tokens held by the calling address to the recipient and increase its current and system balances", async () => {
            await treasury.deposit
                .sendTransactionAsync(expectedValue, { from: target })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
            await treasury.claimTokens
                .sendTransactionAsync(target, expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
            await treasury.confiscate
                .sendTransactionAsync(target, expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

            const initialTargetTokenBalance = await kosuToken.balanceOf.callAsync(target); // 50
            const initialCurrentBalance = await treasury.currentBalance.callAsync(target); // 0
            const initialSystemBalance = await treasury.systemBalance.callAsync(target); // 0

            await kosuToken.approve.sendTransactionAsync(treasury.address, expectedValue, { from });
            await treasury.award
                .sendTransactionAsync(target, expectedValue, { from })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

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
            await treasury.contractDeposit
                .sendTransactionAsync(accounts[3], testValues.oneHundredWei, {
                    from: accounts[5],
                })
                .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
            await treasury.currentBalance
                .callAsync(accounts[3])
                .then(x => x.toString())
                .should.eventually.eq(testValues.oneHundredWei.toString());
        });
    });

    describe("Authorizeable", () => {
        describe("isAuthorized", () => {
            it("should allow an added account to call protected methods", async () => {
                await auth.unauthorizeAddress.sendTransactionAsync(accounts[6]);

                await treasury.contractDeposit
                    .sendTransactionAsync(accounts[1], testValues.fiftyWei, { from: accounts[6] })
                    .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;

                await auth.authorizeAddress
                    .sendTransactionAsync(accounts[6])
                    .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

                await kosuToken.allowance
                    .callAsync(accounts[1], treasury.address)
                    .then(x => x.toString())
                    .should.eventually.eq(testValues.fiftyWei.toString());
                await kosuToken.balanceOf
                    .callAsync(accounts[1])
                    .then(x => x.toString())
                    .should.eventually.eq(testValues.oneHundredWei.toString());
                await treasury.contractDeposit
                    .sendTransactionAsync(accounts[1], testValues.fiftyWei, { from: accounts[6] })
                    .then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
            });
        });
    });
});
