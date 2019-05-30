/* tslint:disable:max-file-line-count */
import { BigNumber } from "@0x/utils";
import { padRight, soliditySha3, stringToHex, toTwosComplement, toWei } from "web3-utils";

import {
    AuthorizedAddressesContract,
    decodeKosuEvents,
    KosuTokenContract,
    TreasuryContract,
    ValidatorRegistryContract,
    ValidatorRegistryProxyContract,
    VotingContract,
} from "../src";

describe("ValidatorRegistry", async () => {
    let validatorRegistryProxy: ValidatorRegistryProxyContract;
    let validatorRegistry: ValidatorRegistryContract;
    let kosuToken: KosuTokenContract;
    let treasury: TreasuryContract;
    let auth: AuthorizedAddressesContract;
    let voting: VotingContract;
    let applicationPeriod: BigNumber;
    let exitPeriod: BigNumber;
    let rewardPeriod: BigNumber;
    let challengePeriod: BigNumber;
    let commitPeriod: BigNumber;
    let minimumBalance: BigNumber;
    let stakeholderCut: BigNumber;

    const base64Key: string = "x6899Z4PYjavGaaEBt8jk0Y/3HF5GiR1duDld66IlxM=";
    const tendermintPublicKey: string = `0x${Buffer.from(base64Key, "base64").toString("hex")}`;
    const nilKey: string = toTwosComplement(stringToHex(""));
    const paradigmMarket: string = "https://paradigm.market";

    const salt = new BigNumber("42");
    const vote0 = new BigNumber("0");
    const vote1 = new BigNumber("1");
    const vote2 = new BigNumber("2");
    const secret0 = soliditySha3({ t: "uint", v: "0" }, { t: "uint", v: salt });
    const secret1 = soliditySha3({ t: "uint", v: "1" }, { t: "uint", v: salt });
    const secret2 = soliditySha3({ t: "uint", v: "2" }, { t: "uint", v: salt });

    // Listing automation
    const prepareListing = async (options: { stake?: BigNumber; reward?: BigNumber; details?: string } = {}) => {
        const { stake, reward, details } = options;
        await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, stake || minimumBalance);
        const result = await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
            tendermintPublicKey,
            stake || minimumBalance,
            reward || new BigNumber("0"),
            details || paradigmMarket,
        );
        await skipApplicationPeriod(result.blockNumber);
    };

    const exitListing = async (publicKey = tendermintPublicKey, from = accounts[0]) => {
        const { status } = await validatorRegistryProxy.getListing.callAsync(publicKey);
        const result = await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(publicKey, { from });
        if (status === 1) {
            await withdrawAll(from);
        } else {
            await finishExit(publicKey, from, result.blockNumber);
        }
    };

    const finishExit = async (publicKey = tendermintPublicKey, from = accounts[0], initBlock = undefined) => {
        await skipExitPeriod(initBlock || (await web3Wrapper.getBlockNumberAsync()));
        await validatorRegistryProxy.finalizeExit.awaitTransactionSuccessAsync(publicKey, { from });
        await withdrawAll(from);
    };

    const finishChallenge = async (publicKey = tendermintPublicKey, challengeBlock = undefined) => {
        await skipChallengePeriod(challengeBlock || (await web3Wrapper.getBlockNumberAsync()));
        await validatorRegistryProxy.resolveChallenge.awaitTransactionSuccessAsync(publicKey);
    };

    // Treasury autmomation
    const withdrawAll = async (from = accounts[0]) => {
        await clearTreasury(from);
    };

    // Skips
    const skipExitPeriod = async start => {
        const target = exitPeriod.plus(start).toNumber();
        while ((await web3Wrapper.getBlockNumberAsync()) < target) {
            await skipBlocks(1);
        }
    };

    const skipChallengePeriod = async start => {
        const target = challengePeriod.plus(start).toNumber();
        while ((await web3Wrapper.getBlockNumberAsync()) < target) {
            await skipBlocks(1);
        }
    };

    const skipApplicationPeriod = async start => {
        const target = applicationPeriod.plus(start).toNumber();
        while ((await web3Wrapper.getBlockNumberAsync()) < target) {
            await skipBlocks(1);
        }
    };

    const skipCommitPeriod = async start => {
        const target = commitPeriod.plus(start).toNumber();
        while ((await web3Wrapper.getBlockNumberAsync()) < target) {
            await skipBlocks(1);
        }
    };

    const skipRewardPeriods = async (start = undefined, count = 1) => {
        const target = rewardPeriod
            .multipliedBy(count)
            .plus(start || (await web3Wrapper.getBlockNumberAsync()))
            .toNumber();
        while ((await web3Wrapper.getBlockNumberAsync()) < target) {
            await skipBlocks(1);
        }
    };

    const toStakeholderCut = (value: string | number | BigNumber) => {
        return new BigNumber(value)
            .times(new BigNumber(stakeholderCut))
            .div(new BigNumber("100"))
            .toString();
    };

    const prepareTokens = async (from, funds) => {
        await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, new BigNumber(funds), { from });
        await treasury.deposit.awaitTransactionSuccessAsync(new BigNumber(funds), { from });
    };

    before(async () => {
        validatorRegistryProxy = contracts.validatorRegistryProxy;
        validatorRegistry = contracts.validatorRegistryImpl;
        kosuToken = contracts.kosuToken;
        treasury = contracts.treasury;
        auth = contracts.authorizedAddresses;
        voting = contracts.voting;
        applicationPeriod = await validatorRegistryProxy.applicationPeriod.callAsync();
        exitPeriod = await validatorRegistryProxy.exitPeriod.callAsync();
        rewardPeriod = await validatorRegistryProxy.rewardPeriod.callAsync();
        minimumBalance = await validatorRegistryProxy.minimumBalance.callAsync();
        stakeholderCut = await validatorRegistryProxy.stakeholderCut.callAsync();
        challengePeriod = await validatorRegistryProxy.challengePeriod.callAsync();
        commitPeriod = await validatorRegistryProxy.commitPeriod.callAsync();
        const transactions = [];
        for (const account of accounts) {
            transactions.push(kosuToken.transfer.awaitTransactionSuccessAsync(account, testValues.oneHundredEther));
        }
        await Promise.all(transactions);
    });

    describe("token", () => {
        it("should have a token configured", async () => {
            await validatorRegistryProxy.kosuToken.callAsync().should.eventually.eq(kosuToken.address);
        });
    });

    describe("voting", () => {
        it("should have voting configured", async () => {
            await validatorRegistryProxy.voting.callAsync().should.eventually.eq(voting.address);
        });
    });

    describe("treasury", () => {
        it("should have a treasury configured", async () => {
            await validatorRegistryProxy.treasury.callAsync().should.eventually.eq(treasury.address);
        });
    });

    describe("setImplementation", () => {
        it("should set the implementation", async () => {
            await validatorRegistryProxy.setImplementation.awaitTransactionSuccessAsync(accounts[0]).should.eventually
                .be.fulfilled;
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(testValues.zero).should.eventually
                .be.rejected;
            await validatorRegistryProxy.setImplementation.awaitTransactionSuccessAsync(validatorRegistry.address)
                .should.eventually.be.fulfilled;
        });
    });

    describe("listingKeys", () => {
        let publicKeys;

        before(() => {
            publicKeys = accounts.map(a => padRight(a, 64).toLowerCase());
        });

        beforeEach(async () => {
            for (const account of accounts) {
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance, {
                    from: account,
                });
                await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    account,
                    minimumBalance,
                    testValues.zero,
                    paradigmMarket,
                    { from: account },
                );
            }
        });

        afterEach(async () => {
            for (const account of accounts) {
                await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(account, { from: account });
                await treasury.withdraw.awaitTransactionSuccessAsync(new BigNumber(minimumBalance), { from: account });
            }
        });

        it("should return a list of listing keys", async () => {
            const validators = await validatorRegistryProxy.listingKeys.callAsync();
            // Keys are hex bytes32 padding these addresses to match the bytes32 output
            validators.should.have.members(publicKeys);
        });

        it("should have the value removed after a user removes listing", async () => {
            const removeKey = publicKeys[5];

            const remainingKeys = publicKeys.slice(0);
            remainingKeys.splice(5, 1);

            await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(removeKey, { from: accounts[5] });

            const validators = await validatorRegistryProxy.listingKeys.callAsync();
            // Keys are hex bytes32 padding these addresses to match the bytes32 output
            validators.length.should.eq(publicKeys.length - 1);
            validators.should.have.members(remainingKeys);

            await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                accounts[5],
                minimumBalance,
                testValues.zero,
                paradigmMarket,
                {
                    from: accounts[5],
                },
            );
        });
    });

    describe("getListings", () => {
        let publicKeys;

        before(() => {
            publicKeys = accounts.map(a => padRight(a, 64).toLowerCase());
        });

        beforeEach(async () => {
            for (const account of accounts) {
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance, {
                    from: account,
                });
                await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    account,
                    minimumBalance,
                    testValues.zero,
                    paradigmMarket,
                    { from: account },
                );
            }
        });

        afterEach(async () => {
            for (const account of accounts) {
                await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(account, { from: account });
                await treasury.withdraw.awaitTransactionSuccessAsync(new BigNumber(minimumBalance), { from: account });
            }
        });

        it("should return a list of listing keys", async () => {
            const listings: Listing[] = await validatorRegistryProxy.getListings.callAsync();

            listings.length.should.eq(publicKeys.length);
            listings.forEach(listing => {
                publicKeys.should.contain(listing.tendermintPublicKey);
                accounts.should.contain(listing.owner);
                listing.stakedBalance.toString().should.eq(minimumBalance.toString());
                listing.rewardRate.toString().should.eq("0");
                listing.status.should.eq(1);
            });
        });
    });

    describe("registerListing", () => {
        it("should require a balance greater or equal to the minimumBalance", async () => {
            const from = accounts[1];
            const idleBalance = await kosuToken.balanceOf.callAsync(from);
            await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[0], idleBalance, { from });

            await kosuToken.balanceOf
                .callAsync(from)
                .then(x => x.toString())
                .should.eventually.eq("0");
            await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                minimumBalance,
                testValues.zero,
                paradigmMarket,
                { from },
            ).should.eventually.be.rejected;

            kosuToken.transfer.awaitTransactionSuccessAsync(from, idleBalance, { from: accounts[0] });
        });

        it("should require an approval greater or equal to the minimumBalance", async () => {
            await kosuToken.balanceOf
                .callAsync(accounts[0])
                .then(x => x.toString())
                .then(parseInt)
                .should.eventually.gt(minimumBalance.toNumber());
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, testValues.zero).should.eventually.be
                .fulfilled;
            await kosuToken.allowance
                .callAsync(accounts[0], validatorRegistryProxy.address)
                .then(x => x.toString())
                .should.eventually.eq("0");
            await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                minimumBalance,
                testValues.zero,
                paradigmMarket,
            ).should.eventually.be.rejected;
        });

        describe("approved", () => {
            beforeEach(async () => {
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance);
            });

            afterEach(async () => {
                await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
                await treasury.withdraw.awaitTransactionSuccessAsync(minimumBalance);
            });

            it("should allow registration with the minimumBalance", async () => {
                await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    testValues.zero,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;
            });

            it("should not allow registration to overwrite existing listing", async () => {
                await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    testValues.zero,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;
                await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    testValues.zero,
                    paradigmMarket,
                ).should.eventually.be.rejected;
            });

            it("should set the listing status to pending", async () => {
                await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    testValues.zero,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;
                const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey);

                listing.status.toString().should.eq("1"); // Pending is 1
            });

            it("should emit a ValidatorRegistered event", async () => {
                const blockNumber = await web3Wrapper.getBlockNumberAsync().then(x => (parseInt(x) + 1).toString());
                const result = await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    testValues.zero,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;
                const decodedLogs = decodeKosuEvents(result.logs)[0];

                decodedLogs.eventType.should.eq("ValidatorRegistered");
                decodedLogs.tendermintPublicKey.should.eq(base64Key);
                decodedLogs.owner.should.eq(accounts[0].toLowerCase());
                decodedLogs.applicationBlockNumber.should.eq(blockNumber);
                decodedLogs.rewardRate.should.eq("0");
                decodedLogs.details.should.eq(paradigmMarket);
            });

            it("should emit a ValidatorRegistered event with correct positive reward", async () => {
                const blockNumber = await web3Wrapper.getBlockNumberAsync().then(x => (parseInt(x) + 1).toString());
                const result = await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    new BigNumber("1"),
                    paradigmMarket,
                ).should.eventually.be.fulfilled;
                const decodedLogs = decodeKosuEvents(result.logs)[0];

                decodedLogs.eventType.should.eq("ValidatorRegistered");
                decodedLogs.tendermintPublicKey.should.eq(base64Key);
                decodedLogs.owner.should.eq(accounts[0].toLowerCase());
                decodedLogs.applicationBlockNumber.should.eq(blockNumber);
                decodedLogs.rewardRate.should.eq("1");
                decodedLogs.details.should.eq(paradigmMarket);
            });

            it("should emit a ValidatorRegistered event with correct negative reward", async () => {
                const blockNumber = await web3Wrapper.getBlockNumberAsync().then(x => (parseInt(x) + 1).toString());
                const result = await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    new BigNumber("-1"),
                    paradigmMarket,
                ).should.eventually.be.fulfilled;
                const decodedLogs = decodeKosuEvents(result.logs)[0];

                decodedLogs.eventType.should.eq("ValidatorRegistered");
                decodedLogs.tendermintPublicKey.should.eq(base64Key);
                decodedLogs.owner.should.eq(accounts[0].toLowerCase());
                decodedLogs.applicationBlockNumber.should.eq(blockNumber);
                decodedLogs.rewardRate.should.eq("-1");
                decodedLogs.details.should.eq(paradigmMarket);
            });

            it("should fail with less tokens than minimum", async () => {
                const minimum = await validatorRegistryProxy.minimumBalance.callAsync();
                await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimum.minus(new BigNumber("1")),
                    testValues.zero,
                    paradigmMarket,
                ).should.eventually.be.rejected;
                await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimum,
                    testValues.zero,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;
            });

            it("should fail when you try to generate too many tokens", async () => {
                const max = await validatorRegistryProxy.maxRewardRate.callAsync();
                await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    max.plus(new BigNumber("1")),
                    paradigmMarket,
                ).should.eventually.be.rejected;
                await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    testValues.zero,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;
            });

            it("should allow an unbounded ", async () => {
                const allInToken = await kosuToken.balanceOf.callAsync(accounts[0]);
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, allInToken);
                await treasury.deposit.awaitTransactionSuccessAsync(allInToken);
                await treasury.currentBalance
                    .callAsync(accounts[0])
                    .then(x => x.toString())
                    .should.eventually.eq(allInToken.toString());

                const initialContractStake = await kosuToken.balanceOf.callAsync(validatorRegistry.address);

                await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    allInToken,
                    testValues.zero,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;

                const finalContractStake = await kosuToken.balanceOf.callAsync(validatorRegistry.address);
                finalContractStake
                    .minus(initialContractStake)
                    .toString()
                    .should.eq(allInToken.toString());
            });

            it("should be initialized correctly", async () => {
                const maxReward = await validatorRegistryProxy.maxRewardRate.callAsync();

                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, testValues.sixEther);
                const result = await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    testValues.sixEther,
                    maxReward,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;

                const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey);
                listing.tendermintPublicKey.should.eq(tendermintPublicKey);
                listing.owner.should.eq(accounts[0]);
                listing.applicationBlock.toString().should.eq(result.blockNumber.toString());
                listing.rewardRate.toString().should.eq(maxReward.toString());
                listing.stakedBalance.toString().should.eq(testValues.sixEther.toString());
                listing.status.should.eq(1);
                listing.details.should.eq(paradigmMarket);
            });
        });
    });

    describe("confirmListing", () => {
        it("should not confirm a null listing", async () => {
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.rejected;
        });

        it("should require sufficient blocks to pass before confirmation", async () => {
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance);
            const result = await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                minimumBalance,
                testValues.zero,
                paradigmMarket,
            );
            const appBlock = decodeKosuEvents(result.logs)[0].applicationBlockNumber;
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.rejected;

            await skipApplicationPeriod(appBlock);

            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;

            await exitListing(tendermintPublicKey);
        });

        it("should increase the maxRewardRate", async () => {
            const oldReward = await validatorRegistryProxy.maxRewardRate.callAsync();
            await prepareListing({ reward: oldReward });

            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            const newReward = await validatorRegistryProxy.maxRewardRate.callAsync();
            newReward.gt(oldReward).should.eq(true);

            await exitListing(tendermintPublicKey);
        });

        describe("preparedListing tests", () => {
            beforeEach(prepareListing);

            it("should not confirm a challenged listing", async () => {
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance);

                const result = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;
                await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                    .eventually.be.rejected;

                await skipChallengePeriod(result.blockNumber);
                await validatorRegistryProxy.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should
                    .eventually.be.fulfilled;
                await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey).should
                    .eventually.be.fulfilled;
                await treasury.withdraw.awaitTransactionSuccessAsync(minimumBalance).should.eventually.be.fulfilled;
            });

            it("should only let the listing owner confirm the listing", async () => {
                await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey, {
                    from: accounts[1],
                }).should.eventually.be.rejected;
                await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                    .eventually.be.fulfilled;
                await exitListing();
            });

            it("should change the listings status to ACCEPTED", async () => {
                await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                    .eventually.be.fulfilled;
                const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey);

                listing.status.toString().should.eq("2"); // Accepted is 2
                listing.tendermintPublicKey.should.eq(tendermintPublicKey, "tendermint");
                listing.owner.should.eq(accounts[0]);
                await exitListing();
            });
        });
    });

    describe("initExit", () => {
        beforeEach(prepareListing);

        it("should remove an unconfirmed listing", async () => {
            await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually.be
                .fulfilled;
            const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey);

            listing.status.toString().should.eq("0");
            listing.owner.should.eq("0x0000000000000000000000000000000000000000");
            treasury.withdraw.awaitTransactionSuccessAsync(minimumBalance);
        });

        it("should not allow an exit with a pending challenge", async () => {
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;

            await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], minimumBalance);
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance, {
                from: accounts[1],
            });
            await treasury.deposit.awaitTransactionSuccessAsync(minimumBalance, { from: accounts[1] });
            const result = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;

            await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually.be
                .rejected;

            await finishChallenge(tendermintPublicKey, result.blockNumber);
            await exitListing();
        });

        it("should set the status to exiting", async () => {
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            const result = await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey)
                .should.eventually.be.fulfilled;
            const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey);

            listing.status.toString().should.eq("4");

            await finishExit(tendermintPublicKey, accounts[0], result.blockNumber);
        });

        it("should only let the owner initExit", async () => {
            await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey, {
                from: accounts[1],
            }).should.eventually.be.rejected;

            await exitListing();
        });
    });

    describe("finalizeExit", () => {
        beforeEach(prepareListing);

        it("should remove the confirmed listing", async () => {
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            const result = await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey)
                .should.eventually.be.fulfilled;
            await skipExitPeriod(result.blockNumber);
            await validatorRegistryProxy.finalizeExit.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;

            const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey);

            listing.status.toString().should.eq("0");
            listing.tendermintPublicKey.should.eq(nilKey);
            listing.applicationBlock.toString().should.eq("0");
            listing.owner.should.eq("0x0000000000000000000000000000000000000000");

            await withdrawAll();
        });

        it("should release the tokens to the treasury", async () => {
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            await treasury.currentBalance
                .callAsync(accounts[0])
                .then(r => r.toString())
                .should.eventually.eq("0");
            const result = await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey)
                .should.eventually.be.fulfilled;
            await skipExitPeriod(result.blockNumber);
            await validatorRegistryProxy.finalizeExit.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            await treasury.currentBalance
                .callAsync(accounts[0])
                .then(r => r.toString())
                .should.eventually.eq(minimumBalance.toString());

            await withdrawAll();
        });

        it("should not allow a listing to exit until after the exit period", async () => {
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            await treasury.currentBalance
                .callAsync(accounts[0])
                .then(r => r.toString())
                .should.eventually.eq("0");
            const result = await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey)
                .should.eventually.be.fulfilled;
            await validatorRegistryProxy.finalizeExit.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.rejected;

            await finishExit(tendermintPublicKey, accounts[0], result.blockNumber);
        });

        it("should only let the owner finalizeExit", async () => {
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            const result = await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey)
                .should.eventually.be.fulfilled;
            await skipExitPeriod(result.blockNumber);
            await validatorRegistryProxy.finalizeExit.awaitTransactionSuccessAsync(tendermintPublicKey, {
                from: accounts[1],
            }).should.eventually.be.rejected;

            await finishExit(tendermintPublicKey, accounts[0], result.blockNumber);
        });

        it("should reduce the maxRewardRate on minting exit", async () => {
            await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually.be
                .fulfilled;
            await prepareListing({ reward: await validatorRegistryProxy.maxRewardRate.callAsync() });
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;

            const result = await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey)
                .should.eventually.be.fulfilled;
            await skipExitPeriod(result.blockNumber);
            const oldReward = await validatorRegistryProxy.maxRewardRate.callAsync();
            await validatorRegistryProxy.finalizeExit.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            const newReward = await validatorRegistryProxy.maxRewardRate.callAsync();

            oldReward.gt(newReward).should.eq(true);

            await withdrawAll();
        });
    });

    describe("challengeListing", () => {
        beforeEach(prepareListing);

        it("should require tokens approved to challenge", async () => {
            await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.rejected;

            await exitListing();
        });

        it("should take tokens on challenge", async () => {
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance, {
                from: accounts[1],
            });
            await treasury.deposit.awaitTransactionSuccessAsync(minimumBalance, { from: accounts[1] });

            await treasury.currentBalance
                .callAsync(accounts[1])
                .then(r => r.toString())
                .should.eventually.eq(minimumBalance.toString());
            const result = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            await treasury.currentBalance
                .callAsync(accounts[1])
                .then(r => r.toString())
                .should.eventually.eq("0");

            await finishChallenge(tendermintPublicKey, result.blockNumber);
            await exitListing();
        });

        it("should allow an accepted listing to be challenged and should raise an event with a pollId", async () => {
            await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], minimumBalance);
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance, {
                from: accounts[1],
            });
            const initialNextPoll = await voting.nextPollId.callAsync();

            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;

            const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey);
            listing.status.toString().should.eq("2"); // Accepted is 2

            const result = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const decodedLogs = decodeKosuEvents(result.logs)[1];

            decodedLogs.eventType.should.eq("ValidatorChallenged");
            decodedLogs.challenger.should.eq(accounts[1].toLowerCase());
            decodedLogs.owner.should.eq(accounts[0].toLowerCase());
            decodedLogs.pollId.should.eq(initialNextPoll.toString());
            decodedLogs.details.should.eq(paradigmMarket);

            await voting.nextPollId
                .callAsync()
                .then(x => x.toString())
                .should.eventually.eq(initialNextPoll.plus(1).toString());

            await finishChallenge(tendermintPublicKey, result.blockNumber);
            await exitListing();
        });

        it("should allow a pending listing to be challenged", async () => {
            await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], minimumBalance);
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance, {
                from: accounts[1],
            });
            const initialNextPoll = await voting.nextPollId.callAsync();

            const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey);
            listing.status.toString().should.eq("1"); // PENDING is 1

            const result = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const decodedLogs = decodeKosuEvents(result.logs)[1];

            decodedLogs.eventType.should.eq("ValidatorChallenged");
            decodedLogs.challenger.should.eq(accounts[1].toLowerCase());
            decodedLogs.owner.should.eq(accounts[0].toLowerCase());
            decodedLogs.pollId.should.eq(initialNextPoll.toString());
            decodedLogs.details.should.eq(paradigmMarket);

            const challenge = await validatorRegistryProxy.getChallenge.callAsync(decodedLogs.challengeId);
            challenge.challenger.should.eq(accounts[1].toLowerCase());

            await finishChallenge(tendermintPublicKey, result.blockNumber);
            await exitListing();
        });

        it("should allow an exiting listing to be challenged", async () => {
            await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], minimumBalance);
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance, {
                from: accounts[1],
            });
            await treasury.deposit.awaitTransactionSuccessAsync(minimumBalance, { from: accounts[1] });

            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually.be
                .fulfilled;
            const result = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;

            await finishChallenge(tendermintPublicKey, result.blockNumber);
            await withdrawAll();
        });

        it("should match tokens for challenge to the balance staked by listing holder", async () => {
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, testValues.fiveEther, {
                from: accounts[1],
            });
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, testValues.fiveEther);
            await treasury.deposit.awaitTransactionSuccessAsync(testValues.fiveEther, { from: accounts[1] });

            await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey).should.be.fulfilled;
            const result1 = await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                testValues.fiveEther,
                testValues.zero,
                paradigmMarket,
            ).should.be.fulfilled;
            await skipApplicationPeriod(result1.blockNumber);

            await treasury.currentBalance
                .callAsync(accounts[1])
                .then(x => x.toString())
                .should.eventually.eq(testValues.fiveEther.toString());
            const result2 = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            await treasury.systemBalance
                .callAsync(accounts[1])
                .then(x => x.toString())
                .should.eventually.eq(testValues.fiveEther.toString());
            await treasury.currentBalance
                .callAsync(accounts[1])
                .then(x => x.toString())
                .should.eventually.eq("0");

            await finishChallenge(tendermintPublicKey, result2.blockNumber);
            await exitListing();
        });

        it("should touch and remove a listing without adequate tokens for a burn", async () => {
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance, {
                from: accounts[1],
            });
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance);

            await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const result = await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                minimumBalance,
                new BigNumber("-1"),
                paradigmMarket,
                {
                    from: accounts[1],
                },
            ).should.eventually.be.fulfilled;
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, new BigNumber("1"), {
                from: accounts[1],
            });
            await treasury.deposit.awaitTransactionSuccessAsync(new BigNumber("1"), { from: accounts[1] });
            await skipApplicationPeriod(result.blockNumber);
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey, {
                from: accounts[1],
            });

            await skipBlocks(rewardPeriod);

            await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
            ).should.eventually.be.fulfilled;
            const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey);
            listing.status.toString().should.eq("0");

            await withdrawAll();
            await withdrawAll(accounts[1]);
        });

        it("should touch and remove a listing when the stakedBalance is below minimumBalance");
    });

    describe("resolveChallenge", () => {
        beforeEach(prepareListing);

        it("should fail if called a second time", async () => {
            await prepareTokens(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[2], testValues.fiveEther);
            const { blockNumber, logs } = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, testValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, testValues.fiveEther, {
                from: accounts[2],
            });
            await skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[2],
            });

            await skipChallengePeriod(blockNumber);
            await validatorRegistryProxy.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;

            await validatorRegistryProxy.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.rejected;
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[1] });
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[2] });

            await withdrawAll(accounts[1]);
            await withdrawAll(accounts[2]);
        });

        it("should require challenge to be ended", async () => {
            await prepareTokens(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[2], testValues.fiveEther);
            const { blockNumber, logs } = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, testValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, testValues.fiveEther, {
                from: accounts[2],
            });
            await skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[2],
            });

            await validatorRegistryProxy.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.rejected;
            await skipChallengePeriod(blockNumber);
            await validatorRegistryProxy.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[1] });
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[2] });

            await withdrawAll(accounts[1]);
            await withdrawAll(accounts[2]);
        });

        it("should correctly finalize a successful challenge", async () => {
            await prepareTokens(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[2], testValues.fiveEther);
            const { blockNumber, logs } = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, testValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, testValues.fiveEther, {
                from: accounts[2],
            });
            await skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[2],
            });

            await skipChallengePeriod(blockNumber);
            const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

            const initialChallengerCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);

            await validatorRegistryProxy.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            const finalListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const finalChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

            const finalChallengerCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);
            initialListingHolderSystemBalance
                .minus(finalListingHolderSystemBalance)
                .toString()
                .should.eq(minimumBalance.toString());
            finalChallengerSystemBalance
                .minus(initialChallengerSystemBalance)
                .toString()
                .should.eq(toStakeholderCut(minimumBalance));

            finalChallengerCurrentBalance
                .minus(initialChallengerCurrentBalance)
                .toString()
                .should.eq(
                    new BigNumber(toStakeholderCut(minimumBalance)).plus(new BigNumber(minimumBalance)).toString(),
                );

            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[1] });
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[2] });

            await withdrawAll(accounts[1]);
            await withdrawAll(accounts[2]);
        });

        it("should correctly finalize a failed challenge", async () => {
            await prepareTokens(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[2], testValues.fiveEther);
            const { blockNumber, logs } = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.fiveEther, {
                from: accounts[2],
            });
            await skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await skipChallengePeriod(blockNumber);

            const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            await validatorRegistryProxy.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;

            const finalChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const finalListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const finalListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            initialChallengerSystemBalance
                .minus(finalChallengerSystemBalance)
                .toString()
                .should.eq(minimumBalance.toString());
            finalListingHolderSystemBalance
                .minus(initialListingHolderSystemBalance)
                .toString()
                .should.eq(toStakeholderCut(minimumBalance));
            finalListingHolderCurrentBalance
                .minus(initialListingHolderCurrentBalance)
                .toString()
                .should.eq(toStakeholderCut(minimumBalance));

            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[1] });
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[2] });

            await withdrawAll(accounts[1]);
            await withdrawAll(accounts[2]);
            await exitListing();
        });

        it("should correctly finalize a failed challenge on an exiting listing", async () => {
            await prepareTokens(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[2], testValues.fiveEther);
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const { blockNumber, logs } = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.fiveEther, {
                from: accounts[2],
            });
            await skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await skipChallengePeriod(blockNumber);

            const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            await validatorRegistryProxy.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;

            const finalChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const finalListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const finalListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            initialChallengerSystemBalance
                .minus(finalChallengerSystemBalance)
                .toString()
                .should.eq(minimumBalance.toString());
            finalListingHolderSystemBalance
                .minus(initialListingHolderSystemBalance)
                .toString()
                .should.eq(toStakeholderCut(minimumBalance));
            finalListingHolderCurrentBalance
                .minus(initialListingHolderCurrentBalance)
                .toString()
                .should.eq(
                    new BigNumber(toStakeholderCut(minimumBalance)).plus(new BigNumber(minimumBalance)).toString(),
                );

            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[1] });
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[2] });

            await withdrawAll(accounts[0]);
            await withdrawAll(accounts[1]);
            await withdrawAll(accounts[2]);
        });

        it("should correctly finalize a failed challenge on a pending listing", async () => {
            await prepareTokens(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[2], testValues.fiveEther);
            const { blockNumber, logs } = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.fiveEther, {
                from: accounts[2],
            });
            await skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await skipChallengePeriod(blockNumber);

            const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            await validatorRegistryProxy.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;

            const finalChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const finalListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const finalListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            initialChallengerSystemBalance
                .minus(finalChallengerSystemBalance)
                .toString()
                .should.eq(minimumBalance.toString());
            finalListingHolderSystemBalance
                .minus(initialListingHolderSystemBalance)
                .toString()
                .should.eq(toStakeholderCut(minimumBalance));
            finalListingHolderCurrentBalance
                .minus(initialListingHolderCurrentBalance)
                .toString()
                .should.eq(toStakeholderCut(minimumBalance));

            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[1] });
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[2] });

            await withdrawAll(accounts[1]);
            await withdrawAll(accounts[2]);

            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            await exitListing();
        });
    });

    describe("claimWinnings", () => {
        beforeEach(prepareListing);

        it("should succeed but deliver zero tokens if the user did not vote", async () => {
            await prepareTokens(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[2], testValues.fiveEther);
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const { blockNumber, logs } = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.fiveEther, {
                from: accounts[2],
            });
            await skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await skipChallengePeriod(blockNumber);

            const initialVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const initialVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            await validatorRegistryProxy.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[5] })
                .should.eventually.be.fulfilled;

            const finalVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const finalVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            initialVoterSystemBalance
                .minus(finalVoterSystemBalance)
                .toString()
                .should.eq("0");
            initialVoterCurrentBalance
                .minus(finalVoterCurrentBalance)
                .toString()
                .should.eq("0");

            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[1] });
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[2] });

            await withdrawAll(accounts[0]);
            await withdrawAll(accounts[1]);
            await withdrawAll(accounts[2]);
        });

        it("should succeed but deliver zero tokens if the user voted for the looser", async () => {
            await prepareTokens(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[2], testValues.fiveEther);
            await prepareTokens(accounts[5], testValues.fiveEther);
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const { blockNumber, logs } = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.fiveEther, {
                from: accounts[2],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, testValues.fiveEther, {
                from: accounts[5],
            });
            await skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[5],
            });
            await skipChallengePeriod(blockNumber);

            const initialVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const initialVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            await validatorRegistryProxy.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[5] })
                .should.eventually.be.fulfilled;

            const finalVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const finalVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            initialVoterSystemBalance
                .minus(finalVoterSystemBalance)
                .toString()
                .should.eq("0");
            initialVoterCurrentBalance
                .minus(finalVoterCurrentBalance)
                .toString()
                .should.eq("0");

            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[1] });
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[2] });

            await withdrawAll(accounts[0]);
            await withdrawAll(accounts[1]);
            await withdrawAll(accounts[2]);
        });

        it("should correctly distribute the winnings", async () => {
            await prepareTokens(accounts[1], testValues.oneEther);
            await prepareTokens(accounts[2], testValues.oneEther);
            await prepareTokens(accounts[5], testValues.fiveEther);
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const { blockNumber, logs } = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.oneEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.oneEther, {
                from: accounts[2],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, testValues.fiveEther, {
                from: accounts[5],
            });
            await skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[5],
            });
            await skipChallengePeriod(blockNumber);

            const initialVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const initialVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            await validatorRegistryProxy.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[5] })
                .should.eventually.be.fulfilled;

            const finalVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const finalVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            finalVoterSystemBalance
                .minus(initialVoterSystemBalance)
                .toString()
                .should.eq(minimumBalance.minus(toStakeholderCut(minimumBalance)).toString());
            finalVoterCurrentBalance
                .minus(initialVoterCurrentBalance)
                .toString()
                .should.eq(minimumBalance.minus(toStakeholderCut(minimumBalance)).toString());

            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[1] });
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[2] });

            await withdrawAll(accounts[0]);
            await withdrawAll(accounts[5]);
        });

        it("should finalize a un-final challenge", async () => {
            await prepareTokens(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[2], testValues.fiveEther);
            await prepareTokens(accounts[5], testValues.fiveEther);
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const { blockNumber, logs } = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.fiveEther, {
                from: accounts[2],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, testValues.fiveEther, {
                from: accounts[5],
            });
            await skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[5],
            });
            await skipChallengePeriod(blockNumber);

            const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[5] })
                .should.eventually.be.fulfilled;

            const finalChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const finalListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const finalListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            initialChallengerSystemBalance
                .minus(finalChallengerSystemBalance)
                .toString()
                .should.eq(minimumBalance.toString());
            finalListingHolderSystemBalance
                .minus(initialListingHolderSystemBalance)
                .toString()
                .should.eq(toStakeholderCut(minimumBalance));
            finalListingHolderCurrentBalance
                .minus(initialListingHolderCurrentBalance)
                .toString()
                .should.eq(
                    new BigNumber(toStakeholderCut(minimumBalance)).plus(new BigNumber(minimumBalance)).toString(),
                );

            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[1] });
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[2] });

            await withdrawAll(accounts[0]);
            await withdrawAll(accounts[1]);
            await withdrawAll(accounts[2]);
        });

        it("should fail if the challenge has not ended", async () => {
            await prepareTokens(accounts[1], testValues.fiveEther);
            await prepareTokens(accounts[2], testValues.fiveEther);
            await prepareTokens(accounts[5], testValues.fiveEther);
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const { blockNumber, logs } = await validatorRegistryProxy.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, testValues.fiveEther, {
                from: accounts[2],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, testValues.fiveEther, {
                from: accounts[5],
            });
            await skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[5],
            });

            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[5] })
                .should.eventually.be.rejected;

            await skipChallengePeriod(blockNumber);
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[1] });
            await validatorRegistryProxy.claimWinnings.awaitTransactionSuccessAsync(challengeId, { from: accounts[2] });

            await withdrawAll(accounts[0]);
            await withdrawAll(accounts[1]);
            await withdrawAll(accounts[2]);
        });
    });

    describe("claimRewards", () => {
        describe("generate", () => {
            const reward = new BigNumber("1000000");
            beforeEach(async () => {
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance, {
                    from: accounts[1],
                });
                const { blockNumber } = await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    reward,
                    paradigmMarket,
                    {
                        from: accounts[1],
                    },
                );
                await skipApplicationPeriod(blockNumber);
                await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey, {
                    from: accounts[1],
                });
            });

            it("should reward the user after a reward block", async () => {
                await skipRewardPeriods();
                const startingBalance = await kosuToken.balanceOf.callAsync(accounts[1]);
                await validatorRegistryProxy.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);
                const endingBalance = await kosuToken.balanceOf.callAsync(accounts[1]);
                endingBalance
                    .minus(startingBalance)
                    .toString()
                    .should.eq(reward.toString());

                await exitListing(tendermintPublicKey, accounts[1]);
            });

            it("should reward users for all reward blocks passed", async () => {
                await skipRewardPeriods(undefined, 10);
                const startingBalance = await kosuToken.balanceOf.callAsync(accounts[1]);
                await validatorRegistryProxy.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);
                const endingBalance = await kosuToken.balanceOf.callAsync(accounts[1]);
                endingBalance
                    .minus(startingBalance)
                    .toString()
                    .should.eq(reward.times(new BigNumber("10")).toString());

                await exitListing(tendermintPublicKey, accounts[1]);
            });
        });

        describe("burn", () => {
            const reward = new BigNumber("-1000000");

            it("should touch and remove a listing that is short on tokens.", async () => {
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance, {
                    from: accounts[1],
                });
                await treasury.deposit.awaitTransactionSuccessAsync(minimumBalance, { from: accounts[1] });
                const { blockNumber } = await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    reward,
                    paradigmMarket,
                    {
                        from: accounts[1],
                    },
                );
                await skipApplicationPeriod(blockNumber);
                await kosuToken.approve.awaitTransactionSuccessAsync(
                    treasury.address,
                    new BigNumber(new BigNumber("1000000")),
                    { from: accounts[1] },
                );
                await treasury.deposit.awaitTransactionSuccessAsync(new BigNumber(new BigNumber("1000000")), {
                    from: accounts[1],
                });
                await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey, {
                    from: accounts[1],
                });
                await skipRewardPeriods();
                await validatorRegistryProxy.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);

                const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey);
                listing.status.toString().should.eq("0");

                withdrawAll(accounts[1]);
            });

            it("should burn into the staked balance", async () => {
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance, {
                    from: accounts[1],
                });
                await treasury.deposit.awaitTransactionSuccessAsync(minimumBalance, { from: accounts[1] });
                const { blockNumber } = await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    reward,
                    paradigmMarket,
                    {
                        from: accounts[1],
                    },
                );
                await skipApplicationPeriod(blockNumber);
                await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], new BigNumber("1000000"));
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, new BigNumber("1000000"), {
                    from: accounts[1],
                });
                await treasury.deposit.awaitTransactionSuccessAsync(new BigNumber("1000000"), { from: accounts[1] });
                await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey, {
                    from: accounts[1],
                });
                await treasury.currentBalance
                    .callAsync(accounts[1])
                    .then(x => x.toString())
                    .should.eventually.eq("0");
                await treasury.systemBalance
                    .callAsync(accounts[1])
                    .then(x => x.toString())
                    .should.eventually.eq(minimumBalance.toString());
                await skipRewardPeriods();
                await validatorRegistryProxy.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);
                const desiredEndValue = new BigNumber(minimumBalance).plus(reward);
                await treasury.currentBalance
                    .callAsync(accounts[1])
                    .then(x => x.toString())
                    .should.eventually.eq(desiredEndValue.toString());
                withdrawAll(accounts[1]);
            });

            it("should burn up to all the staked balance", async () => {
                const burnFive = new BigNumber(testValues.fiveEther).times(new BigNumber("-1"));
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, testValues.sixEther, {
                    from: accounts[1],
                });
                await treasury.deposit.awaitTransactionSuccessAsync(testValues.sixEther, { from: accounts[1] });
                const { blockNumber } = await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    burnFive,
                    paradigmMarket,
                    {
                        from: accounts[1],
                    },
                );
                await skipApplicationPeriod(blockNumber);
                await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey, {
                    from: accounts[1],
                });
                await treasury.currentBalance
                    .callAsync(accounts[1])
                    .then(x => x.toString())
                    .should.eventually.eq("0");
                await treasury.systemBalance
                    .callAsync(accounts[1])
                    .then(x => x.toString())
                    .should.eventually.eq(minimumBalance.toString());
                await skipRewardPeriods();
                await validatorRegistryProxy.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);
                await treasury.currentBalance
                    .callAsync(accounts[1])
                    .then(x => x.toString())
                    .should.eventually.eq("0");
                withdrawAll(accounts[1]);
            });

            describe("funded", () => {
                beforeEach(async () => {
                    await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, testValues.fiveEther, {
                        from: accounts[1],
                    });
                    await treasury.deposit.awaitTransactionSuccessAsync(testValues.fiveEther, { from: accounts[1] });
                    const { blockNumber } = await validatorRegistryProxy.registerListing.awaitTransactionSuccessAsync(
                        tendermintPublicKey,
                        minimumBalance,
                        reward,
                        paradigmMarket,
                        {
                            from: accounts[1],
                        },
                    );
                    await skipApplicationPeriod(blockNumber);
                    await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey, {
                        from: accounts[1],
                    });
                });

                afterEach(async () => {
                    await exitListing(tendermintPublicKey, accounts[1]);
                });

                it("should burn the users tokens after a reward block", async () => {
                    await skipRewardPeriods();
                    const startingBalance = await treasury.currentBalance.callAsync(accounts[1]);
                    await validatorRegistryProxy.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);
                    const endingBalance = await treasury.currentBalance.callAsync(accounts[1]);
                    startingBalance
                        .minus(endingBalance)
                        .toString()
                        .should.eq(reward.times(new BigNumber("-1")).toString());
                });

                it("should burn users tokens for all reward blocks passed", async () => {
                    await skipRewardPeriods(undefined, 10);
                    const startingBalance = await treasury.currentBalance.callAsync(accounts[1]);
                    await validatorRegistryProxy.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);
                    const endingBalance = await treasury.currentBalance.callAsync(accounts[1]);
                    startingBalance
                        .minus(endingBalance)
                        .toString()
                        .should.eq(reward.times(new BigNumber("-10")).toString());
                });
            });
        });
    });

    describe("ValidatorRegistryUpdate", () => {
        beforeEach(prepareListing);

        it("should emit events when listing is confirmed", async () => {
            const result = await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey)
                .should.eventually.be.fulfilled;
            const decodedLogs = decodeKosuEvents(result.logs);

            decodedLogs[0].eventType.should.eq("ValidatorConfirmed");
            decodedLogs[0].tendermintPublicKey.should.eq(base64Key);

            decodedLogs[1].eventType.should.eq("ValidatorRegistryUpdate");
            decodedLogs[1].tendermintPublicKey.should.eq(base64Key);
            decodedLogs[1].owner.should.eq(accounts[0].toLowerCase());
            decodedLogs[1].stake.should.eq(minimumBalance.toString());

            await exitListing();
        });

        it("should emit event when stake is removed", async () => {
            await validatorRegistryProxy.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;

            const result = await validatorRegistryProxy.initExit.awaitTransactionSuccessAsync(tendermintPublicKey)
                .should.eventually.be.fulfilled;
            const decodedLogs = decodeKosuEvents(result.logs)[0];

            decodedLogs.eventType.should.eq("ValidatorRegistryUpdate");
            decodedLogs.tendermintPublicKey.should.eq(base64Key);
            decodedLogs.owner.should.eq(accounts[0].toLowerCase());
            decodedLogs.stake.should.eq("0");

            await finishExit(tendermintPublicKey);
        });
    });
});
