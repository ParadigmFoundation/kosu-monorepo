/* tslint:disable:max-file-line-count */
import { BigNumber } from "@0x/utils";
import { ContractArtifact } from "ethereum-types";
import { padRight, soliditySha3, stringToHex, toTwosComplement, toWei } from "web3-utils";

import {
    artifacts,
    AuthorizedAddressesContract,
    decodeKosuEvents,
    KosuTokenContract,
    TreasuryContract,
    ValidatorRegistryContract,
    VotingContract,
} from "../src";

describe("ValidatorRegistry", async () => {
    const base64Key: string = "x6899Z4PYjavGaaEBt8jk0Y/3HF5GiR1duDld66IlxM=";
    const tendermintPublicKey: string = `0x${Buffer.from(base64Key, "base64").toString("hex")}`;
    const nilKey: string = toTwosComplement(stringToHex(""));
    const paradigmMarket: string = "https://paradigm.market";

    const salt = new BigNumber("42");
    const vote0 = new BigNumber("0");
    const vote1 = new BigNumber("1");
    const secret0 = soliditySha3({ t: "uint", v: "0" }, { t: "uint", v: salt });
    const secret1 = soliditySha3({ t: "uint", v: "1" }, { t: "uint", v: salt });

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
    let publicKeys: string[];

    before(async () => {
        publicKeys = accounts.map(a => padRight(a, 64).toLowerCase());

        validatorRegistry = contracts.validatorRegistry;
        kosuToken = contracts.kosuToken;
        treasury = contracts.treasury;
        auth = contracts.authorizedAddresses;
        voting = contracts.voting;
        applicationPeriod = await validatorRegistry.applicationPeriod.callAsync();
        exitPeriod = await validatorRegistry.exitPeriod.callAsync();
        rewardPeriod = await validatorRegistry.rewardPeriod.callAsync();
        minimumBalance = await validatorRegistry.minimumBalance.callAsync();
        stakeholderCut = await validatorRegistry.stakeholderCut.callAsync();
        challengePeriod = await validatorRegistry.challengePeriod.callAsync();
        commitPeriod = await validatorRegistry.commitPeriod.callAsync();

        for (const account of accounts) {
            await kosuToken.transfer.awaitTransactionSuccessAsync(account, minimumBalance.multipliedBy(10));
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance.multipliedBy(10), {
                from: account,
            });
            await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                account,
                minimumBalance,
                TestValues.zero,
                paradigmMarket,
                { from: account },
            );
            await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(account, paradigmMarket, {
                from: account,
            });
        }
    });

    after(async () => {
        for (const account of accounts) {
            await testHelpers.finishChallenge(account);
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(account, { from: account });
            await testHelpers.clearTreasury(account);
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, TestValues.zero, {
                from: account,
            });
        }
    });

    describe("constructor", () => {
        it("should have a reasonable gas cost", async () => {
            const { txReceipt } = await ValidatorRegistryContract.deployFrom0xArtifactAsync(
                artifacts.ValidatorRegistry as ContractArtifact,
                provider,
                txDefaults,
                treasury.address,
                voting.address,
                contracts.eventEmitter.address,
                TestValues.oneWei,
                TestValues.oneWei,
                TestValues.oneWei,
                TestValues.oneWei,
                TestValues.oneWei,
            );

            txReceipt.gasUsed.should.be.lt(5100000);
        });
    });

    describe("token", () => {
        it("should have a token configured", async () => {
            await validatorRegistry.kosuToken.callAsync().should.eventually.eq(kosuToken.address);
        });
    });

    describe("voting", () => {
        it("should have voting configured", async () => {
            await validatorRegistry.voting.callAsync().should.eventually.eq(voting.address);
        });
    });

    describe("treasury", () => {
        it("should have a treasury configured", async () => {
            await validatorRegistry.treasury.callAsync().should.eventually.eq(treasury.address);
        });
    });

    describe("listingKeys", () => {
        it("should return a list of listing keys", async () => {
            const validators = await validatorRegistry.listingKeys.callAsync();
            // Keys are hex bytes32 padding these addresses to match the bytes32 output
            validators.should.have.members(publicKeys);
        });

        it("should have the value removed after a user removes listing", async () => {
            const removeKey = padRight("0xffaabb", 64);

            await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                removeKey,
                minimumBalance,
                TestValues.zero,
                paradigmMarket,
                {
                    from: accounts[5],
                },
            );

            const beforeValidators = await validatorRegistry.listingKeys.callAsync();
            // Keys are hex bytes32 padding these addresses to match the bytes32 output
            beforeValidators.length.should.eq(publicKeys.length + 1);
            beforeValidators.should.include.members(publicKeys);
            beforeValidators.should.include(removeKey);

            await validatorRegistry.initExit.awaitTransactionSuccessAsync(removeKey, { from: accounts[5] });

            const validators = await validatorRegistry.listingKeys.callAsync();
            // Keys are hex bytes32 padding these addresses to match the bytes32 output
            validators.length.should.eq(publicKeys.length);
            validators.should.have.members(publicKeys);
            validators.should.not.include(removeKey);
        });
    });

    describe("getAllListings", () => {
        it("should return a list of listings", async () => {
            const listings: Listing[] = await validatorRegistry.getAllListings.callAsync();

            listings.length.should.eq(publicKeys.length);
            listings.forEach(listing => {
                publicKeys.should.contain(listing.tendermintPublicKey);
                accounts.should.contain(listing.owner);
                listing.stakedBalance.toString().should.eq(minimumBalance.toString());
                listing.rewardRate.toString().should.eq("0");
                listing.status.should.eq(3);
            });
        });
    });

    describe("getAllChallenges", () => {
        it("should return a list of challenges", async () => {
            const challenges: Challenge[] = await validatorRegistry.getAllChallenges.callAsync();
            challenges.length.should.equal(publicKeys.length);
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
            await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                minimumBalance,
                TestValues.zero,
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
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, TestValues.zero).should.eventually.be
                .fulfilled;
            await kosuToken.allowance
                .callAsync(accounts[0], validatorRegistry.address)
                .then(x => x.toString())
                .should.eventually.eq("0");
            await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                minimumBalance,
                TestValues.zero,
                paradigmMarket,
            ).should.eventually.be.rejected;
        });

        describe("approved", () => {
            beforeEach(async () => {
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance);
            });

            afterEach(async () => {
                await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
                await treasury.withdraw.awaitTransactionSuccessAsync(minimumBalance);
            });

            it("should allow registration with the minimumBalance", async () => {
                await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    TestValues.zero,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;
            });

            it("should not allow registration to overwrite existing listing", async () => {
                await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    TestValues.zero,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;
                await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    TestValues.zero,
                    paradigmMarket,
                ).should.eventually.be.rejected;
            });

            it("should set the listing status to pending", async () => {
                await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    TestValues.zero,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;
                const listing = await validatorRegistry.getListing.callAsync(tendermintPublicKey);

                listing.status.toString().should.eq("1"); // Pending is 1
            });

            it("should emit a ValidatorRegistered event", async () => {
                const blockNumber = await web3Wrapper.getBlockNumberAsync().then(x => (parseInt(x) + 1).toString());
                const result = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    TestValues.zero,
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
                const result = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
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
                const result = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
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
                const minimum = await validatorRegistry.minimumBalance.callAsync();
                await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimum.minus(new BigNumber("1")),
                    TestValues.zero,
                    paradigmMarket,
                ).should.eventually.be.rejected;
                await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimum,
                    TestValues.zero,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;
            });

            it("should fail when you try to generate too many tokens", async () => {
                const max = await validatorRegistry.maxRewardRate.callAsync();
                await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    max.plus(new BigNumber("1")),
                    paradigmMarket,
                ).should.eventually.be.rejected;
                await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    TestValues.zero,
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

                await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    allInToken,
                    TestValues.zero,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;

                const finalContractStake = await kosuToken.balanceOf.callAsync(validatorRegistry.address);
                finalContractStake
                    .minus(initialContractStake)
                    .toString()
                    .should.eq(allInToken.toString());
            });

            it("should be initialized correctly", async () => {
                const maxReward = await validatorRegistry.maxRewardRate.callAsync();
                const stake = minimumBalance.plus(4);

                const result = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    stake,
                    maxReward,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;

                const listing = await validatorRegistry.getListing.callAsync(tendermintPublicKey);
                listing.tendermintPublicKey.should.eq(tendermintPublicKey);
                listing.owner.should.eq(accounts[0]);
                listing.applicationBlock.toString().should.eq(result.blockNumber.toString());
                listing.rewardRate.toString().should.eq(maxReward.toString());
                listing.stakedBalance.toString().should.eq(stake.toString());
                listing.status.should.eq(1);
                listing.details.should.eq(paradigmMarket);
            });
        });
    });

    describe("confirmListing", () => {
        it("should not confirm a null listing", async () => {
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.rejected;
        });

        it("should require sufficient blocks to pass before confirmation", async () => {
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance);
            const result = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                minimumBalance,
                TestValues.zero,
                paradigmMarket,
            );
            const appBlock = decodeKosuEvents(result.logs)[0].applicationBlockNumber;
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.rejected;

            await testHelpers.skipApplicationPeriod(appBlock);

            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;

            await testHelpers.exitListing(tendermintPublicKey);
        });

        it("should increase the maxRewardRate", async () => {
            const oldReward = await validatorRegistry.maxRewardRate.callAsync();
            await testHelpers.prepareListing(tendermintPublicKey, { reward: oldReward });

            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;
            const newReward = await validatorRegistry.maxRewardRate.callAsync();
            newReward.gt(oldReward).should.eq(true);

            await testHelpers.exitListing(tendermintPublicKey);
        });

        describe("preparedListing tests", () => {
            beforeEach(async () => {
                await testHelpers.prepareListing(tendermintPublicKey);
            });

            it("should not confirm a challenged listing", async () => {
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance);

                const result = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    paradigmMarket,
                ).should.eventually.be.fulfilled;
                await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                    .eventually.be.rejected;

                await testHelpers.skipChallengePeriod(result.blockNumber);
                await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should
                    .eventually.be.fulfilled;
                await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually.be
                    .fulfilled;
                await treasury.withdraw.awaitTransactionSuccessAsync(minimumBalance).should.eventually.be.fulfilled;
            });

            it("should only let the listing owner confirm the listing", async () => {
                await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey, {
                    from: accounts[1],
                }).should.eventually.be.rejected;
                await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                    .eventually.be.fulfilled;
                await testHelpers.exitListing(tendermintPublicKey);
            });

            it("should change the listings status to ACCEPTED", async () => {
                await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should
                    .eventually.be.fulfilled;
                const listing = await validatorRegistry.getListing.callAsync(tendermintPublicKey);

                listing.status.toString().should.eq("2"); // Accepted is 2
                listing.tendermintPublicKey.should.eq(tendermintPublicKey, "tendermint");
                listing.owner.should.eq(accounts[0]);
                await testHelpers.exitListing(tendermintPublicKey);
            });
        });
    });

    describe("initExit", () => {
        beforeEach(async () => {
            await testHelpers.prepareListing(tendermintPublicKey, {
                reward: await validatorRegistry.maxRewardRate.callAsync(),
            });
        });

        it("should remove an unconfirmed listing", async () => {
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually.be
                .fulfilled;
            const listing = await validatorRegistry.getListing.callAsync(tendermintPublicKey);

            listing.status.toString().should.eq("0");
            listing.owner.should.eq("0x0000000000000000000000000000000000000000");
            treasury.withdraw.awaitTransactionSuccessAsync(minimumBalance);
        });

        it("should not allow an exit with a pending challenge", async () => {
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;

            await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], minimumBalance);
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance, {
                from: accounts[1],
            });
            await treasury.deposit.awaitTransactionSuccessAsync(minimumBalance, { from: accounts[1] });
            const result = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;

            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually.be
                .rejected;

            await testHelpers.finishChallenge(tendermintPublicKey, result.blockNumber);
            await testHelpers.exitListing(tendermintPublicKey);
        });

        it("should only let the owner initExit, not reduce the maxRewardRate and set the status to exiting", async () => {
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;

            // should only let the owner initExit
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey, {
                from: accounts[1],
            }).should.eventually.be.rejected;

            const iniitalMaxRewardRate = await validatorRegistry.maxRewardRate.callAsync();

            const result = await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            const listing = await validatorRegistry.getListing.callAsync(tendermintPublicKey);

            const finalMaxRewardRate = await validatorRegistry.maxRewardRate.callAsync();
            // should not reduce maxRewardRate when removing a pending listing
            iniitalMaxRewardRate.toString().should.eq(finalMaxRewardRate.toString());
            // should set the status to exiting
            listing.status.toString().should.eq("4");

            await testHelpers.finishExit(tendermintPublicKey, accounts[0], result.blockNumber);
        });
    });

    describe("finalizeExit", () => {
        beforeEach(async () => {
            await testHelpers.prepareListing(tendermintPublicKey, {
                reward: await validatorRegistry.maxRewardRate.callAsync(),
            });
        });

        it("should test expected failures and remove the confirmed listing with the proper state", async () => {
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;

            const initialBalance = await treasury.currentBalance.callAsync(accounts[0]);

            const result = await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;

            // should not allow a listing to exit until after the exit period
            await validatorRegistry.finalizeExit.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually.be
                .rejected;

            await testHelpers.skipExitPeriod(result.blockNumber);

            // should only let the owner finalizeExit
            await validatorRegistry.finalizeExit.awaitTransactionSuccessAsync(tendermintPublicKey, {
                from: accounts[1],
            }).should.eventually.be.rejected;

            const oldReward = await validatorRegistry.maxRewardRate.callAsync();

            // should remove the confirmed listing
            await validatorRegistry.finalizeExit.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually.be
                .fulfilled;

            const newReward = await validatorRegistry.maxRewardRate.callAsync();
            const finalBalance = await treasury.currentBalance.callAsync(accounts[0]);

            // should release the tokens to the treasury
            finalBalance
                .minus(initialBalance)
                .toString()
                .should.eq(minimumBalance.toString());

            // should reduce the maxRewardRate on minting exit
            oldReward.gt(newReward).should.eq(true);

            const listing = await validatorRegistry.getListing.callAsync(tendermintPublicKey);

            listing.status.toString().should.eq("0");
            listing.tendermintPublicKey.should.eq(nilKey);
            listing.applicationBlock.toString().should.eq("0");
            listing.owner.should.eq("0x0000000000000000000000000000000000000000");

            await testHelpers.clearTreasury(accounts[0]);
        });
    });

    describe("challengeListing", () => {
        let stakedBalance;
        beforeEach(async () => {
            stakedBalance = minimumBalance.plus(TestValues.oneEther);
            await testHelpers.prepareListing(tendermintPublicKey, {
                reward: await validatorRegistry.maxRewardRate.callAsync(),
                stake: stakedBalance,
            });
        });

        it("should allow a pending listing to be challenged and take tokens on challenge matching balance staked by listing holder", async () => {
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, stakedBalance, {
                from: accounts[1],
            });
            await treasury.deposit.awaitTransactionSuccessAsync(stakedBalance, { from: accounts[1] });

            const listing = await validatorRegistry.getListing.callAsync(tendermintPublicKey);
            listing.status.toString().should.eq("1"); // PENDING is 1

            const initialCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);
            const initialSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

            const initialNextPoll = await voting.nextPollId.callAsync();

            const result = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
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

            const finalCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);
            const finalSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

            // should match tokens for challenge to the balance staked by listing holder
            finalSystemBalance
                .minus(initialSystemBalance)
                .eq(0)
                .should.eq(true);
            initialCurrentBalance
                .minus(finalCurrentBalance)
                .eq(stakedBalance)
                .should.eq(true);

            const challenge = await validatorRegistry.getChallenge.callAsync(new BigNumber(decodedLogs.challengeId));
            challenge.challenger.should.eq(accounts[1].toLowerCase());

            await testHelpers.finishChallenge(tendermintPublicKey, result.blockNumber);
            await testHelpers.exitListing(tendermintPublicKey);
        });

        it("should allow an accepted listing to be challenged and should raise an event with a pollId", async () => {
            await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], stakedBalance);
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, stakedBalance, {
                from: accounts[1],
            });
            const initialNextPoll = await voting.nextPollId.callAsync();

            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;

            const listing = await validatorRegistry.getListing.callAsync(tendermintPublicKey);
            listing.status.toString().should.eq("2"); // Accepted is 2

            const result = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
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

            await testHelpers.finishChallenge(tendermintPublicKey, result.blockNumber);
            await testHelpers.exitListing(tendermintPublicKey);
        });

        it("should allow an exiting listing to be challenged", async () => {
            await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], stakedBalance);
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, stakedBalance, {
                from: accounts[1],
            });
            await treasury.deposit.awaitTransactionSuccessAsync(stakedBalance, { from: accounts[1] });

            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually.be
                .fulfilled;
            const result = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;

            await testHelpers.finishChallenge(tendermintPublicKey, result.blockNumber);
            await testHelpers.clearTreasury(accounts[0]);
        });

        it("should touch and remove a listing without adequate tokens for a burn", async () => {
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, stakedBalance, {
                from: accounts[1],
            });
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, stakedBalance);

            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const result = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                stakedBalance,
                new BigNumber("-1"),
                paradigmMarket,
                {
                    from: accounts[1],
                },
            ).should.eventually.be.fulfilled;
            const onePayout = await kosuToken.estimateEtherToToken.callAsync(new BigNumber("1"));
            await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, onePayout, {
                from: accounts[1],
            });
            await treasury.deposit.awaitTransactionSuccessAsync(onePayout, { from: accounts[1] });
            await testHelpers.skipApplicationPeriod(result.blockNumber);
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey, {
                from: accounts[1],
            });

            await testHelpers.skipBlocks(rewardPeriod);

            await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(tendermintPublicKey, paradigmMarket)
                .should.eventually.be.fulfilled;
            const listing = await validatorRegistry.getListing.callAsync(tendermintPublicKey);
            listing.status.toString().should.eq("0");

            await testHelpers.clearTreasury(accounts[0]);
            await testHelpers.clearTreasury(accounts[1]);
        });

        it("should touch and remove a listing when the stakedBalance is below minimumBalance");
    });

    describe("resolveChallenge", () => {
        beforeEach(async () => {
            await testHelpers.prepareListing(tendermintPublicKey);
        });

        it("should require challenge to be ended, should fail if called a second time and should correctly finalize a successful challenge", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumBalance);
            await testHelpers.prepareTokens(accounts[2], TestValues.fiveEther);
            const { blockNumber, logs } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, TestValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, TestValues.fiveEther, {
                from: accounts[2],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[2],
            });

            // should require challenge to be ended
            await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.rejected;

            await testHelpers.skipChallengePeriod(blockNumber);
            const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

            const initialChallengerCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);

            const result = await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey)
                .should.eventually.be.fulfilled;

            // should fail if called a second time
            await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.rejected;

            const decodedLogs = decodeKosuEvents(result.logs);
            decodedLogs[1].eventType.should.eq("ValidatorRemoved");
            decodedLogs[1].tendermintPublicKey.should.eq(base64Key);

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
                .should.eq(await testHelpers.toStakeholderCut(minimumBalance));

            finalChallengerCurrentBalance
                .minus(initialChallengerCurrentBalance)
                .toString()
                .should.eq(
                    new BigNumber(await testHelpers.toStakeholderCut(minimumBalance))
                        .plus(new BigNumber(minimumBalance))
                        .toString(),
                );

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[1]);
            await testHelpers.clearTreasury(accounts[2]);
        });

        it("should correctly finalize a failed challenge", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumBalance);
            await testHelpers.prepareTokens(accounts[2], TestValues.fiveEther);
            const { blockNumber, logs } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[2],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await testHelpers.skipChallengePeriod(blockNumber);

            const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            const result = await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey)
                .should.eventually.be.fulfilled;

            const decodedLogs = decodeKosuEvents(result.logs);
            decodedLogs[0].eventType.should.eq("ValidatorChallengeResolved");
            decodedLogs[0].tendermintPublicKey.should.eq(base64Key);

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
                .should.eq(await testHelpers.toStakeholderCut(minimumBalance));
            finalListingHolderCurrentBalance
                .minus(initialListingHolderCurrentBalance)
                .toString()
                .should.eq(await testHelpers.toStakeholderCut(minimumBalance));

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[1]);
            await testHelpers.clearTreasury(accounts[2]);
            await testHelpers.exitListing(tendermintPublicKey);
        });

        it("should correctly finalize a failed challenge on an exiting listing", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumBalance);
            await testHelpers.prepareTokens(accounts[2], TestValues.fiveEther);
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const { blockNumber, logs } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[2],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await testHelpers.skipChallengePeriod(blockNumber);

            const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;

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
                .should.eq(await testHelpers.toStakeholderCut(minimumBalance));
            finalListingHolderCurrentBalance
                .minus(initialListingHolderCurrentBalance)
                .toString()
                .should.eq(
                    new BigNumber(await testHelpers.toStakeholderCut(minimumBalance))
                        .plus(new BigNumber(minimumBalance))
                        .toString(),
                );

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[0]);
            await testHelpers.clearTreasury(accounts[1]);
            await testHelpers.clearTreasury(accounts[2]);
        });

        it("should correctly finalize a failed challenge on a pending listing", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumBalance);
            await testHelpers.prepareTokens(accounts[2], TestValues.fiveEther);
            const { blockNumber, logs } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[2],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await testHelpers.skipChallengePeriod(blockNumber);

            const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            const result = await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey)
                .should.eventually.be.fulfilled;

            const decodedLogs = decodeKosuEvents(result.logs);
            decodedLogs[0].eventType.should.eq("ValidatorChallengeResolved");
            decodedLogs[0].tendermintPublicKey.should.eq(base64Key);

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
                .should.eq(await testHelpers.toStakeholderCut(minimumBalance));
            finalListingHolderCurrentBalance
                .minus(initialListingHolderCurrentBalance)
                .toString()
                .should.eq(await testHelpers.toStakeholderCut(minimumBalance));

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[1]);
            await testHelpers.clearTreasury(accounts[2]);

            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;
            await testHelpers.exitListing(tendermintPublicKey);
        });
    });

    describe("claimWinnings", () => {
        beforeEach(async () => {
            await testHelpers.prepareListing(tendermintPublicKey);
        });

        it("should succeed but deliver zero tokens if the user did not vote", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumBalance);
            await testHelpers.prepareTokens(accounts[2], TestValues.fiveEther);
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const { blockNumber, logs } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[2],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await testHelpers.skipChallengePeriod(blockNumber);

            const initialVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const initialVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[5],
            }).should.eventually.be.fulfilled;

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

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[0]);
            await testHelpers.clearTreasury(accounts[1]);
            await testHelpers.clearTreasury(accounts[2]);
        });

        it("should succeed but deliver zero tokens if the user voted for the looser", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumBalance);
            await testHelpers.prepareTokens(accounts[2], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[5], TestValues.fiveEther);
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const { blockNumber, logs } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[2],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, TestValues.fiveEther, {
                from: accounts[5],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[5],
            });
            await testHelpers.skipChallengePeriod(blockNumber);

            const initialVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const initialVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[5],
            }).should.eventually.be.fulfilled;

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

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[0]);
            await testHelpers.clearTreasury(accounts[1]);
            await testHelpers.clearTreasury(accounts[2]);
        });

        it("should correctly distribute the winnings", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumBalance);
            await testHelpers.prepareTokens(accounts[2], TestValues.oneEther);
            await testHelpers.prepareTokens(accounts[5], TestValues.fiveEther);
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const { blockNumber, logs } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.oneEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.oneEther, {
                from: accounts[2],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, TestValues.fiveEther, {
                from: accounts[5],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[5],
            });
            await testHelpers.skipChallengePeriod(blockNumber);

            const initialVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const initialVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            await validatorRegistry.resolveChallenge.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[5],
            }).should.eventually.be.fulfilled;

            const finalVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
            const finalVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

            finalVoterSystemBalance
                .minus(initialVoterSystemBalance)
                .toString()
                .should.eq(minimumBalance.minus(await testHelpers.toStakeholderCut(minimumBalance)).toString());
            finalVoterCurrentBalance
                .minus(initialVoterCurrentBalance)
                .toString()
                .should.eq(minimumBalance.minus(await testHelpers.toStakeholderCut(minimumBalance)).toString());

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[0]);
            await testHelpers.clearTreasury(accounts[5]);
        });

        it("should finalize a un-final challenge", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumBalance);
            await testHelpers.prepareTokens(accounts[2], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[5], TestValues.fiveEther);
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const { blockNumber, logs } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[2],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, TestValues.fiveEther, {
                from: accounts[5],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[5],
            });
            await testHelpers.skipChallengePeriod(blockNumber);

            const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
            const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
            const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[5],
            }).should.eventually.be.fulfilled;

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
                .should.eq(await testHelpers.toStakeholderCut(minimumBalance));
            finalListingHolderCurrentBalance
                .minus(initialListingHolderCurrentBalance)
                .toString()
                .should.eq(
                    new BigNumber(await testHelpers.toStakeholderCut(minimumBalance))
                        .plus(new BigNumber(minimumBalance))
                        .toString(),
                );

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[0]);
            await testHelpers.clearTreasury(accounts[1]);
            await testHelpers.clearTreasury(accounts[2]);
        });

        it("should fail if the challenge has not ended", async () => {
            await testHelpers.prepareTokens(accounts[1], minimumBalance);
            await testHelpers.prepareTokens(accounts[2], TestValues.fiveEther);
            await testHelpers.prepareTokens(accounts[5], TestValues.fiveEther);
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey);
            await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey);
            const { blockNumber, logs } = await validatorRegistry.challengeListing.awaitTransactionSuccessAsync(
                tendermintPublicKey,
                paradigmMarket,
                { from: accounts[1] },
            ).should.eventually.be.fulfilled;
            const { challengeId, pollId } = decodeKosuEvents(logs)[1];
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[1],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret0, TestValues.fiveEther, {
                from: accounts[2],
            });
            await voting.commitVote.awaitTransactionSuccessAsync(new BigNumber(pollId), secret1, TestValues.fiveEther, {
                from: accounts[5],
            });
            await testHelpers.skipCommitPeriod(blockNumber);
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[1],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote0, salt, {
                from: accounts[2],
            });
            await voting.revealVote.awaitTransactionSuccessAsync(new BigNumber(pollId), vote1, salt, {
                from: accounts[5],
            });

            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[5],
            }).should.eventually.be.rejected;

            await testHelpers.skipChallengePeriod(blockNumber);
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[1],
            });
            await validatorRegistry.claimWinnings.awaitTransactionSuccessAsync(new BigNumber(challengeId), {
                from: accounts[2],
            });

            await testHelpers.clearTreasury(accounts[0]);
            await testHelpers.clearTreasury(accounts[1]);
            await testHelpers.clearTreasury(accounts[2]);
        });
    });

    describe("claimRewards", () => {
        describe("generate", () => {
            const reward = new BigNumber("1000000");
            beforeEach(async () => {
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance, {
                    from: accounts[1],
                });
                const { blockNumber } = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    reward,
                    paradigmMarket,
                    {
                        from: accounts[1],
                    },
                );
                await testHelpers.skipApplicationPeriod(blockNumber);
                await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey, {
                    from: accounts[1],
                });
            });

            it("should reward the user after a reward block and multiples of reward blocks", async () => {
                await testHelpers.skipRewardPeriods();
                const startingBalance1 = await kosuToken.balanceOf.callAsync(accounts[1]);
                const payout1 = await kosuToken.estimateEtherToToken.callAsync(reward);
                await validatorRegistry.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);
                const endingBalance1 = await kosuToken.balanceOf.callAsync(accounts[1]);
                endingBalance1
                    .minus(startingBalance1)
                    .toString()
                    .should.eq(payout1.toString());

                await testHelpers.skipRewardPeriods(undefined, 10);
                const startingBalance2 = await kosuToken.balanceOf.callAsync(accounts[1]);
                const payout2 = await kosuToken.estimateEtherToToken.callAsync(reward.times(new BigNumber("10")));
                await validatorRegistry.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);
                const endingBalance2 = await kosuToken.balanceOf.callAsync(accounts[1]);
                endingBalance2
                    .minus(startingBalance2)
                    .toString()
                    .should.eq(payout2.toString());

                await testHelpers.exitListing(tendermintPublicKey, accounts[1]);
            });
        });

        describe("burn", () => {
            const reward = new BigNumber("-1000000");

            it("should touch and remove a listing that is short on tokens.", async () => {
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance, {
                    from: accounts[1],
                });
                await treasury.deposit.awaitTransactionSuccessAsync(minimumBalance, { from: accounts[1] });
                const { blockNumber } = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    reward,
                    paradigmMarket,
                    {
                        from: accounts[1],
                    },
                );
                await testHelpers.skipApplicationPeriod(blockNumber);
                const burn = await kosuToken.estimateEtherToToken.callAsync(reward.multipliedBy("-1"));
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, burn, { from: accounts[1] });
                await treasury.deposit.awaitTransactionSuccessAsync(burn, {
                    from: accounts[1],
                });
                await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey, {
                    from: accounts[1],
                });
                await testHelpers.skipRewardPeriods();
                await validatorRegistry.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);

                const listing = await validatorRegistry.getListing.callAsync(tendermintPublicKey);
                listing.status.toString().should.eq("0");

                await testHelpers.clearTreasury(accounts[1]);
            });

            it("should burn into the staked balance", async () => {
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, minimumBalance, {
                    from: accounts[1],
                });
                await treasury.deposit.awaitTransactionSuccessAsync(minimumBalance, { from: accounts[1] });
                const { blockNumber } = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    reward,
                    paradigmMarket,
                    {
                        from: accounts[1],
                    },
                );
                await testHelpers.skipApplicationPeriod(blockNumber);
                const burn = await kosuToken.estimateEtherToToken.callAsync(reward.multipliedBy("-1"));
                await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], burn);
                await kosuToken.approve.awaitTransactionSuccessAsync(treasury.address, burn.multipliedBy("10"), {
                    from: accounts[1],
                });
                await treasury.deposit.awaitTransactionSuccessAsync(burn, { from: accounts[1] });
                await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey, {
                    from: accounts[1],
                });

                const initialSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

                await testHelpers.skipRewardPeriods();
                const burn2 = await kosuToken.estimateEtherToToken.callAsync(reward.multipliedBy("-1"));
                await validatorRegistry.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);

                const finalCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);
                const finalSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

                initialSystemBalance
                    .minus(finalSystemBalance)
                    .eq(burn2)
                    .should.eq(true);
                finalCurrentBalance
                    .plus(burn2)
                    .eq(minimumBalance)
                    .should.eq(true);
                await testHelpers.clearTreasury(accounts[1]);
            });

            it("should burn up to all the staked balance", async () => {
                const burn = new BigNumber(TestValues.oneEther).times(new BigNumber("-1"));
                const tokenBurnAmount = await kosuToken.estimateEtherToToken.callAsync(burn.multipliedBy("-1"));
                await kosuToken.approve.awaitTransactionSuccessAsync(
                    treasury.address,
                    minimumBalance.plus(tokenBurnAmount),
                    {
                        from: accounts[1],
                    },
                );
                await kosuToken.transfer.awaitTransactionSuccessAsync(accounts[1], tokenBurnAmount);
                await treasury.deposit.awaitTransactionSuccessAsync(minimumBalance.plus(tokenBurnAmount), {
                    from: accounts[1],
                });

                const preRegisterCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);
                const preRegisterSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

                const { blockNumber } = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                    tendermintPublicKey,
                    minimumBalance,
                    burn,
                    paradigmMarket,
                    {
                        from: accounts[1],
                    },
                );

                const postRegisterCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);
                const postRegisterSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

                preRegisterCurrentBalance
                    .minus(postRegisterCurrentBalance)
                    .eq(minimumBalance)
                    .should.eq(true, "Stake correctly claimed");
                preRegisterSystemBalance
                    .eq(postRegisterSystemBalance)
                    .should.eq(true, "System balance should be the same");

                await testHelpers.skipApplicationPeriod(blockNumber);
                await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey, {
                    from: accounts[1],
                });

                const postConfirmCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);
                const postConfirmSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

                preRegisterCurrentBalance
                    .minus(postConfirmCurrentBalance)
                    .eq(minimumBalance.plus(tokenBurnAmount))
                    .should.eq(true, "Confirmation burn failure");
                preRegisterSystemBalance
                    .minus(postConfirmSystemBalance)
                    .eq(tokenBurnAmount)
                    .should.eq(true, "Burned the first time");

                await testHelpers.skipRewardPeriods();
                await validatorRegistry.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);

                const postClaimCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);
                const postClaimSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);

                preRegisterCurrentBalance
                    .minus(postClaimCurrentBalance)
                    .eq(tokenBurnAmount.plus(minimumBalance))
                    .should.eq(true, "Burned all the test tokens - Current");
                preRegisterSystemBalance
                    .minus(postClaimSystemBalance)
                    .eq(tokenBurnAmount.plus(minimumBalance))
                    .should.eq(true, "Burned all the test tokens - System");

                await testHelpers.clearTreasury(accounts[1]);
            });

            describe("funded", () => {
                beforeEach(async () => {
                    await kosuToken.approve.awaitTransactionSuccessAsync(
                        treasury.address,
                        minimumBalance.plus(TestValues.fiveEther),
                        {
                            from: accounts[1],
                        },
                    );
                    await treasury.deposit.awaitTransactionSuccessAsync(minimumBalance.plus(TestValues.fiveEther), {
                        from: accounts[1],
                    });
                    const { blockNumber } = await validatorRegistry.registerListing.awaitTransactionSuccessAsync(
                        tendermintPublicKey,
                        minimumBalance,
                        reward,
                        paradigmMarket,
                        {
                            from: accounts[1],
                        },
                    );
                    await testHelpers.skipApplicationPeriod(blockNumber);
                    await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey, {
                        from: accounts[1],
                    });
                });

                afterEach(async () => {
                    await testHelpers.exitListing(tendermintPublicKey, accounts[1]);
                });

                it("should burn the users tokens after a reward block", async () => {
                    await testHelpers.skipRewardPeriods();
                    const tokens = await kosuToken.estimateEtherToToken.callAsync(reward.times("-1"));
                    const startingBalance = await treasury.currentBalance.callAsync(accounts[1]);
                    await validatorRegistry.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);
                    const endingBalance = await treasury.currentBalance.callAsync(accounts[1]);
                    startingBalance
                        .minus(endingBalance)
                        .toString()
                        .should.eq(tokens.toString());
                });

                it("should burn users tokens for all reward blocks passed", async () => {
                    await testHelpers.skipRewardPeriods(undefined, 10);
                    const tokens = await kosuToken.estimateEtherToToken.callAsync(reward.times("-10"));
                    const startingBalance = await treasury.currentBalance.callAsync(accounts[1]);
                    await validatorRegistry.claimRewards.awaitTransactionSuccessAsync(tendermintPublicKey);
                    const endingBalance = await treasury.currentBalance.callAsync(accounts[1]);
                    startingBalance
                        .minus(endingBalance)
                        .toString()
                        .should.eq(tokens.toString());
                });
            });
        });
    });

    describe("maxRewardRate", () => {
        it("should properly change when listings are added and removed", async () => {
            const keys = ["0x01", "0x02", "0x03", "0x04", "0x05", "0x06"];

            const initialMax = await validatorRegistry.maxRewardRate.callAsync();

            await testHelpers.prepareListing(keys[0], {
                reward: initialMax,
            });
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(keys[0]);

            const increasedMax = await validatorRegistry.maxRewardRate.callAsync();

            initialMax.lt(increasedMax).should.eq(true);

            await testHelpers.prepareListing(keys[1], {
                reward: initialMax,
            });
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(keys[1]);

            await validatorRegistry.maxRewardRate
                .callAsync()
                .then(x => x.toString())
                .should.eventually.eq(increasedMax.toString());

            await testHelpers.prepareListing(keys[2], {
                reward: initialMax.div(2),
            });
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(keys[2]);

            await validatorRegistry.maxRewardRate
                .callAsync()
                .then(x => x.toString())
                .should.eventually.eq(increasedMax.toString());

            await testHelpers.prepareListing(keys[3], {
                reward: increasedMax,
            });
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(keys[3]);

            const additionallyIncreasedMax = await validatorRegistry.maxRewardRate.callAsync();
            increasedMax.lt(additionallyIncreasedMax).should.eq(true);

            await testHelpers.exitListing(keys[1]);
            await validatorRegistry.maxRewardRate
                .callAsync()
                .then(x => x.toString())
                .should.eventually.eq(additionallyIncreasedMax.toString());

            await testHelpers.exitListing(keys[3]);
            await validatorRegistry.maxRewardRate
                .callAsync()
                .then(x => x.toString())
                .should.eventually.eq(increasedMax.toString());

            await testHelpers.exitListing(keys[0]);
            await validatorRegistry.maxRewardRate
                .callAsync()
                .then(x => x.lte(initialMax))
                .should.eventually.eq(true);

            await testHelpers.exitListing(keys[2]);
            await validatorRegistry.maxRewardRate
                .callAsync()
                .then(x => x.toString())
                .should.eventually.eq(initialMax.toString());
        });

        it("should max at 0.2 ether", async () => {
            let currentMax;
            const keys = [];
            do {
                currentMax = await validatorRegistry.maxRewardRate.callAsync();
                const key = `0x${Date.now()}0`;
                keys.push(key);
                await testHelpers.prepareListing(key, {
                    reward: currentMax,
                });
                await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(key);
            } while (currentMax.lt(await validatorRegistry.maxRewardRate.callAsync()));
            currentMax
                .toString()
                .should.eq(await validatorRegistry.maxMaxGenerator.callAsync().then(x => x.toString()));
            for (const key of keys) {
                await testHelpers.exitListing(key);
            }
        });
    });

    describe("updateConfigValue", () => {
        it("should only let the owner act", async () => {
            await validatorRegistry.updateConfigValue.awaitTransactionSuccessAsync(
                TestValues.zero,
                TestValues.oneHundredEther,
                { from: accounts[9] },
            ).should.eventually.be.rejected;
        });

        [
            "applicationPeriod",
            "commitPeriod",
            "challengePeriod",
            "exitPeriod",
            "rewardPeriod",
            "minimumBalance",
            "stakeholderCut",
            "minMaxGenerator",
            "maxGeneratorGrowth",
            "maxMaxGenerator",
        ].forEach((method, index) => {
            it(`should correctly set a new ${method}`, async () => {
                const originalValue = await validatorRegistry[method].callAsync();
                await validatorRegistry.updateConfigValue.awaitTransactionSuccessAsync(
                    new BigNumber(index),
                    TestValues.maxUint,
                ).should.eventually.be.fulfilled;
                const newValue = await validatorRegistry[method].callAsync();
                newValue.toString().should.eq(TestValues.maxUint.toString());
                await validatorRegistry.updateConfigValue.awaitTransactionSuccessAsync(
                    new BigNumber(index),
                    originalValue,
                ).should.eventually.be.fulfilled;
            });
        });
    });

    describe("reduceReward", () => {
        it("should emit an event", async () => {
            await testHelpers.prepareConfirmedListing("0xffaabb", {
                reward: TestValues.oneWei.plus(TestValues.oneWei),
            });
            const { logs } = await validatorRegistry.reduceReward.awaitTransactionSuccessAsync(
                "0xffaabb",
                TestValues.oneWei,
            );
            const decodedLogs = decodeKosuEvents(logs);
            decodedLogs[0].eventType.should.eq("ValidatorReducedReward");
            decodedLogs[0].tendermintPublicKeyHex.should.contain("0xffaabb");
            decodedLogs[0].newRewardRate.should.eq(TestValues.oneWei.toString());
            await testHelpers.exitListing("0xffaabb");
        });

        it("should not modify a negative reward", async () => {
            await testHelpers.prepareConfirmedListing("0xffaabb", { reward: TestValues.oneWei.times("-1") });
            await validatorRegistry.reduceReward.awaitTransactionSuccessAsync("0xffaabb", TestValues.zero).should
                .eventually.be.rejected;
            await testHelpers.exitListing("0xffaabb");
        });

        it("should not modify a zero reward", async () => {
            await testHelpers.prepareConfirmedListing("0xffaabb");
            await validatorRegistry.reduceReward.awaitTransactionSuccessAsync("0xffaabb", TestValues.oneWei).should
                .eventually.be.rejected;
            await testHelpers.exitListing("0xffaabb");
        });

        it("should not increase a reward", async () => {
            await testHelpers.prepareConfirmedListing("0xffaabb", { reward: TestValues.oneWei });
            await validatorRegistry.reduceReward.awaitTransactionSuccessAsync(
                "0xffaabb",
                TestValues.oneWei.plus(TestValues.oneWei),
            ).should.eventually.be.rejected;
            await testHelpers.exitListing("0xffaabb");
        });
    });

    describe("ValidatorRegistryUpdate", () => {
        beforeEach(async () => {
            await testHelpers.prepareListing(tendermintPublicKey);
        });

        it("should emit events when listing is confirmed", async () => {
            const result = await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey)
                .should.eventually.be.fulfilled;
            const decodedLogs = decodeKosuEvents(result.logs);

            decodedLogs[0].eventType.should.eq("ValidatorConfirmed");
            decodedLogs[0].tendermintPublicKey.should.eq(base64Key);

            decodedLogs[1].eventType.should.eq("ValidatorRegistryUpdate");
            decodedLogs[1].tendermintPublicKey.should.eq(base64Key);
            decodedLogs[1].owner.should.eq(accounts[0].toLowerCase());
            decodedLogs[1].stake.should.eq(minimumBalance.toString());

            await testHelpers.exitListing(tendermintPublicKey);
        });

        it("should emit event when stake is removed", async () => {
            await validatorRegistry.confirmListing.awaitTransactionSuccessAsync(tendermintPublicKey).should.eventually
                .be.fulfilled;

            const result = await validatorRegistry.initExit.awaitTransactionSuccessAsync(tendermintPublicKey).should
                .eventually.be.fulfilled;
            const decodedLogs = decodeKosuEvents(result.logs)[0];

            decodedLogs.eventType.should.eq("ValidatorRegistryUpdate");
            decodedLogs.tendermintPublicKey.should.eq(base64Key);
            decodedLogs.owner.should.eq(accounts[0].toLowerCase());
            decodedLogs.stake.should.eq("0");

            await testHelpers.finishExit(tendermintPublicKey);
        });
    });
});
