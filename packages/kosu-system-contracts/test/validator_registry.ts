/* tslint:disable:max-file-line-count */
import {BigNumber} from "@0x/utils";
import { padRight, soliditySha3, stringToHex, toTwosComplement, toWei } from "web3-utils";

import {
  AuthorizedAddressesContract, decodeKosuEvents,
  KosuTokenContract,
  TreasuryContract,
  ValidatorRegistryContract,
  ValidatorRegistryProxyContract, VotingContract,
} from "../src";
import {listingDecoder} from "../src/listingDecoder";
import {migrations} from "../src/migrations";

describe("ValidatorRegistry", async () => {
  let validatorRegistryProxy: ValidatorRegistryProxyContract;
  let validatorRegistry: ValidatorRegistryContract;
  let kosuToken: KosuTokenContract;
  let treasury: TreasuryContract;
  let auth: AuthorizedAddressesContract;
  let voting: VotingContract;
  let applicationPeriod: number;
  let exitPeriod: number;
  let rewardPeriod: number;
  let minimumBalance: string;
  let stakeholderCut: string;

  const base64Key: string = "x6899Z4PYjavGaaEBt8jk0Y/3HF5GiR1duDld66IlxM=";
  const tendermintPublicKey: string = `0x${Buffer.from(base64Key, "base64").toString("hex")}`;
  const nilKey: string = toTwosComplement(stringToHex(""));

  const salt = new BigNumber("42");
  const secret0 = soliditySha3({ t: "uint", v: "0" }, { t: "uint", v: salt });
  const secret1 = soliditySha3({ t: "uint", v: "1" }, { t: "uint", v: salt });
  const secret2 = soliditySha3({ t: "uint", v: "2" }, { t: "uint", v: salt });

  const prepareListing = async (options: { stake?: BigNumber; reward?: BigNumber } = {}) => {
    const { stake, reward } = options;
    await kosuToken.approve.sendTransactionAsync(treasury.address, stake || testValues.oneEther);
    await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, stake || testValues.oneEther, reward || new BigNumber("0"));
    await skipBlocks(applicationPeriod - 1);
  };

  const exitSkip = async () => {
    await skipBlocks(exitPeriod);
  };

  const toStakeholderCut = (value: string | number) => {
    return new BigNumber(value).times(new BigNumber(stakeholderCut)).div(new BigNumber("100")).toString();
  };

  const prepareTokens = async (from, funds) => {
    await kosuToken.transfer.sendTransactionAsync(from, testValues.fiveEther);
    await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.maxUint, { from });
    await treasury.deposit.sendTransactionAsync(new BigNumber(funds), { from });
  };

  beforeEach(async () => {
    const testContracts = await migrations(web3Wrapper.getProvider(), txDefaults, { noLogs: true });
    validatorRegistryProxy = testContracts.validatorRegistryProxy;
    validatorRegistry = testContracts.validatorRegistryImpl;
    kosuToken = testContracts.kosuToken;
    treasury = testContracts.treasury;
    auth = testContracts.authorizedAddresses;
    voting = testContracts.voting;
    applicationPeriod = await validatorRegistryProxy.applicationPeriod.callAsync().then(v => v.toNumber());
    exitPeriod = await validatorRegistryProxy.exitPeriod.callAsync().then(v => v.toNumber());
    rewardPeriod = await validatorRegistryProxy.rewardPeriod.callAsync().then(v => v.toNumber());
    minimumBalance = await validatorRegistryProxy.minimumBalance.callAsync().then(x => x.toString());
    stakeholderCut = await validatorRegistryProxy.stakeholderCut.callAsync().then(x => x.toString());
  });

  describe("token", () => {
    it("should have a token token configured", async () => {
      await validatorRegistryProxy.kosuToken.callAsync().should.eventually.eq(kosuToken.address);
    });
  });

  describe("validators", () => {
    let publicKeys;

    before(() => {
      publicKeys = accounts.map(a => padRight(a, 64).toLowerCase() );
    });

    beforeEach(async () => {
      for (const account of accounts) {
        const from = account;
        await kosuToken.transfer.sendTransactionAsync(from, testValues.oneEther);
        await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.oneEther, { from });
        await validatorRegistryProxy.registerListing.sendTransactionAsync(from, testValues.oneEther, testValues.zero, { from });
      }
    });

    it("should return a list of validator listing keys", async () => {
      const validators = await validatorRegistryProxy.validators.callAsync();
      // Keys are hex bytes32 padding these addresses to match the bytes32 output
      validators.should.have.members(publicKeys);
    });

    it("should have the value removed after a user removes listing", async () => {
      const removeKey = publicKeys[5];

      const remainingKeys = publicKeys.slice(0);
      remainingKeys.splice(5, 1);

      await validatorRegistryProxy.initExit.sendTransactionAsync(removeKey, { from: accounts[5] });

      const validators = await validatorRegistryProxy.validators.callAsync();
      // Keys are hex bytes32 padding these addresses to match the bytes32 output
      validators.length.should.eq(publicKeys.length - 1);
      validators.should.have.members(remainingKeys);
    });
  });

  describe("registerListing", () => {
    it("should require a balance greater or equal to the minimumBalance", async () => {
      const from = accounts[1];

      await kosuToken.balanceOf.callAsync(from).then(x => x.toString()).should.eventually.eq("0");
      await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, testValues.zero, { from }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });

    it("should require an approval greater or equal to the minimumBalance", async () => {
      await kosuToken.balanceOf.callAsync(accounts[0]).then(x => x.toString()).then(parseInt)
        .should.eventually.gt(parseInt(testValues.oneEther));
      await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.zero).should.eventually.be.fulfilled;
      await kosuToken.allowance.callAsync(accounts[0], validatorRegistryProxy.address).then(x => x.toString())
        .should.eventually.eq("0");
      await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, testValues.zero).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });

    describe("approved", () => {
      beforeEach(async () => {
        await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.maxUint);
      });

      it("should allow registration with the minimumBalance", async () => {
        await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, testValues.zero).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      });

      it("should not allow registration to overwrite existing listing", async () => {
        await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, testValues.zero).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
        await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, testValues.zero).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
      });

      it("should set the listing status to pending", async () => {
        await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, testValues.zero).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
        const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey).then(listingDecoder);

        listing.status.toString().should.eq("1"); // Pending is 1
      });

      it("should emit a ValidatorRegistered event", async () => {
        const blockNumber = await web3Wrapper.getBlockNumberAsync().then(x => (parseInt(x) + 1).toString());
        const result = await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, testValues.zero).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
        const decodedLogs = decodeKosuEvents(result.logs)[0];

        decodedLogs.eventType.should.eq("ValidatorRegistered");
        decodedLogs.tendermintPublicKey.should.eq(base64Key);
        decodedLogs.owner.should.eq(accounts[0].toLowerCase());
        decodedLogs.applicationBlockNumber.should.eq(blockNumber);
        decodedLogs.rewardRate.should.eq("0");
      });

      it("should emit a ValidatorRegistered event with correct positive reward", async () => {
        const blockNumber = await web3Wrapper.getBlockNumberAsync().then(x => (parseInt(x) + 1).toString());
        const result = await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, new BigNumber("1")).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
        const decodedLogs = decodeKosuEvents(result.logs)[0];

        decodedLogs.eventType.should.eq("ValidatorRegistered");
        decodedLogs.tendermintPublicKey.should.eq(base64Key);
        decodedLogs.owner.should.eq(accounts[0].toLowerCase());
        decodedLogs.applicationBlockNumber.should.eq(blockNumber);
        decodedLogs.rewardRate.should.eq("1");
      });

      it("should emit a ValidatorRegistered event with correct negative reward", async () => {
        const blockNumber = await web3Wrapper.getBlockNumberAsync().then(x => (parseInt(x) + 1).toString());
        const result = await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, new BigNumber("-1")).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
        const decodedLogs = decodeKosuEvents(result.logs)[0];

        decodedLogs.eventType.should.eq("ValidatorRegistered");
        decodedLogs.tendermintPublicKey.should.eq(base64Key);
        decodedLogs.owner.should.eq(accounts[0].toLowerCase());
        decodedLogs.applicationBlockNumber.should.eq(blockNumber);
        decodedLogs.rewardRate.should.eq("-1");
      });

      it("should fail with less tokens than minimum", async () => {
        const minimum = await validatorRegistryProxy.minimumBalance.callAsync();
        await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, minimum.minus(new BigNumber("1")), testValues.zero).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
      });

      it("should fail when you try to generate too many tokens",  async () => {
        const max = await validatorRegistryProxy.maxRewardRate.callAsync();
        await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, max.plus(new BigNumber("1"))).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
      });

      it("should allow an unbounded ", async () => {
        const allInToken = await kosuToken.balanceOf.callAsync(accounts[0]);
        await kosuToken.approve.sendTransactionAsync(treasury.address, allInToken);
        await treasury.deposit.sendTransactionAsync(allInToken);
        const totalTokens = await treasury.currentBalance.callAsync(accounts[0]);

        const initialContractStake = await kosuToken.balanceOf.callAsync(validatorRegistry.address);

        await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, totalTokens, testValues.zero).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

        const finalContractStake = await kosuToken.balanceOf.callAsync(validatorRegistry.address);
        finalContractStake.minus(initialContractStake).toString().should.eq(totalTokens.toString());

      });

      it("should be initialized correctly"); // TODO: maybe work on this after the read function is more descriptive
    });
  });

  describe("confirmListing", () => {
    it("should not confirm a null listing", async () => {
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });

    it("should require sufficient blocks to pass before confirmation", async () => {
      await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.oneEther);
      await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, testValues.zero);
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;

      await skipBlocks(applicationPeriod - 2);

      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
    });

    it("should increase the maxRewardRate", async () => {
      const oldReward = await validatorRegistryProxy.maxRewardRate.callAsync();
      await prepareListing({ reward: toWei("2") });

      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      const newReward = await validatorRegistryProxy.maxRewardRate.callAsync();
      newReward.gt(oldReward).should.eq(true);
    });

    describe("preparedListing tests", () => {
      beforeEach(prepareListing);

      it("should not confirm a challenged listing", async () => {
        await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.oneEther);

        await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
        await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
      });

      it("should only let the listing owner confirm the listing", async () => {
        await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
      });

      it("should change the listings status to ACCEPTED", async () => {
        await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
        const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey).then(listingDecoder);

        listing.status.toString().should.eq("2"); // Accepted is 2
        listing.tendermintPublicKey.should.eq(tendermintPublicKey, "tendermint");
        listing.owner.should.eq(accounts[0]);
      });
    });
  });

  describe("initExit", () => {
    beforeEach(prepareListing);

    it("should remove an unconfirmed listing", async () => {
      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey).then(listingDecoder);

      listing.status.toString().should.eq("0");
      listing.owner.should.eq("0x0000000000000000000000000000000000000000");
    });

    it("should not allow an exit with a pending challenge", async () => {
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.oneEther);
      await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.oneEther, { from: accounts[1] });
      await treasury.deposit.sendTransactionAsync(testValues.oneEther, { from: accounts[1] });
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });

    it("should set the status to exiting", async () => {
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey).then(listingDecoder);

      listing.status.toString().should.eq("4");
    });

    it("should only let the owner initExit", async () => {
      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });
  });

  describe("finalizeExit", () => {
    beforeEach(prepareListing);

    it("should remove the confirmed listing", async () => {
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await exitSkip();
      await validatorRegistryProxy.finalizeExit.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey).then(listingDecoder);

      listing.status.toString().should.eq("0");
      listing.tendermintPublicKey.should.eq(nilKey);
      listing.applicationBlock.toString().should.eq("0");
      listing.owner.should.eq("0x0000000000000000000000000000000000000000");
    });

    it("should release the tokens to the treasury", async () => {
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await treasury.currentBalance.callAsync(accounts[0]).then(r => r.toString()).should.eventually.eq("0");
      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await exitSkip();
      await validatorRegistryProxy.finalizeExit.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await treasury.currentBalance.callAsync(accounts[0]).then(r => r.toString()).should.eventually.eq(testValues.oneEther.toString());
    });

    it("should not allow a listing to exit until after the exit period", async () => {
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await treasury.currentBalance.callAsync(accounts[0]).then(r => r.toString()).should.eventually.eq("0");
      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await validatorRegistryProxy.finalizeExit.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });

    it("should only let the owner finalizeExit", async () => {
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await exitSkip();
      await validatorRegistryProxy.finalizeExit.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });

    it("should reduce the maxRewardRate on minting exit", async () => {
      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await prepareListing({ reward: toWei("2") });
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await exitSkip();
      const oldReward = await validatorRegistryProxy.maxRewardRate.callAsync();
      await validatorRegistryProxy.finalizeExit.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      const newReward = await validatorRegistryProxy.maxRewardRate.callAsync();

      oldReward.gt(newReward).should.eq(true);
    });
  });

  describe("challengeListing", () => {
    beforeEach(prepareListing);

    it("should require tokens approved to challenge", async () => {
      await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.oneEther);
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });

    it("should take tokens on challenge", async () => {
      await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.oneEther);
      await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.oneEther, { from: accounts[1] });
      await treasury.deposit.sendTransactionAsync(testValues.oneEther, { from: accounts[1] });

      await treasury.currentBalance.callAsync(accounts[1]).then(r => r.toString()).should.eventually.eq(testValues.oneEther.toString());
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await treasury.currentBalance.callAsync(accounts[1]).then(r => r.toString()).should.eventually.eq("0");
    });

    it("should allow an accepted listing to be challenged and should raise an event with a pollId", async () => {
      await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.oneEther);
      await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.oneEther, { from: accounts[1] });

      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey).then(listingDecoder);
      listing.status.toString().should.eq("2"); // Accepted is 2

      const result = await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      const decodedLogs = decodeKosuEvents(result.logs)[1];

      decodedLogs.eventType.should.eq("ValidatorChallenged");
      decodedLogs.challenger.should.eq(accounts[1].toLowerCase());
      decodedLogs.owner.should.eq(accounts[0].toLowerCase());

      decodedLogs.pollId.should.eq("1");

      await voting.nextPollId.callAsync().then(x => x.toString()).should.eventually.eq("2");
    });

    it("should allow a pending listing to be challenged", async () => {
      await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.oneEther);
      await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.oneEther, { from: accounts[1] });

      const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey).then(listingDecoder);
      listing.status.toString().should.eq("1"); // PENDING is 1

      const result = await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      const decodedLogs = decodeKosuEvents(result.logs)[1];

      decodedLogs.eventType.should.eq("ValidatorChallenged");
      decodedLogs.challenger.should.eq(accounts[1].toLowerCase());
      decodedLogs.owner.should.eq(accounts[0].toLowerCase());
      decodedLogs.pollId.should.eq("1");
    });

    it("should allow an exiting listing to be challenged", async () => {
      await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.oneEther);
      await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.oneEther, { from: accounts[1] });
      await treasury.deposit.sendTransactionAsync(testValues.oneEther, { from: accounts[1] });

      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

    });

    it("should match tokens for challenge to the balance staked by listing holder", async () => {
      await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.fiveEther);
      await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.fiveEther, { from: accounts[1] });
      await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.fiveEther);
      await treasury.deposit.sendTransactionAsync(testValues.fiveEther, { from: accounts[1] });

      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey).should.be.fulfilled;
      await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.fiveEther, testValues.zero).should.be.fulfilled;
      await skipBlocks(applicationPeriod);

      await treasury.currentBalance.callAsync(accounts[1]).then(x => x.toString()).should.eventually.eq(testValues.fiveEther.toString());
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await treasury.systemBalance.callAsync(accounts[1]).then(x => x.toString()).should.eventually.eq(testValues.fiveEther.toString());
      await treasury.currentBalance.callAsync(accounts[1]).then(x => x.toString()).should.eventually.eq("0");
    });

    it("should touch and remove a listing without adequate tokens for a burn", async () => {
      await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.oneEther);
      await kosuToken.transfer.sendTransactionAsync(accounts[1], new BigNumber("1"));
      await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.oneEther, { from: accounts[1] });
      await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.oneEther);

      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey);
      await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, new BigNumber("-1"), { from: accounts[1] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await kosuToken.approve.sendTransactionAsync(treasury.address, new BigNumber("1"), { from: accounts[1] });
      await treasury.deposit.sendTransactionAsync(new BigNumber("1"), { from: accounts[1] });
      await skipBlocks(applicationPeriod - 1);
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });

      await skipBlocks(2);

      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey).then(listingDecoder);
      listing.status.toString().should.eq("0");
    });
  });

  describe("resolveChallenge", () => {
    beforeEach(prepareListing);

    it("should fail if called a second time", async () => {
      await prepareTokens(accounts[1], testValues.fiveEther);
      await prepareTokens(accounts[2], testValues.fiveEther);
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther, { from: accounts[2] });
      await skipBlocks(2);
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt, { from: accounts[1] });
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt, { from: accounts[2] });
      await skipBlocks(2);

      await validatorRegistryProxy.resolveChallenge.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await validatorRegistryProxy.resolveChallenge.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;

    });

    it("should require challenge to be ended", async () => {
      await prepareTokens(accounts[1], testValues.fiveEther);
      await prepareTokens(accounts[2], testValues.fiveEther);
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther, { from: accounts[2] });
      await skipBlocks(2);
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt, { from: accounts[1] });
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt, { from: accounts[2] });

      await validatorRegistryProxy.resolveChallenge.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });

    it("should correctly finalize a successful challenge", async () => {
      await prepareTokens(accounts[1], testValues.fiveEther);
      await prepareTokens(accounts[2], testValues.fiveEther);
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther, { from: accounts[2] });
      await skipBlocks(2);
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt, { from: accounts[1] });
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt, { from: accounts[2] });
      await skipBlocks(2);

      const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
      const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
      const initialChallengerCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);

      await validatorRegistryProxy.resolveChallenge.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      const finalListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
      const finalChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
      const finalChallengerCurrentBalance = await treasury.currentBalance.callAsync(accounts[1]);

      initialListingHolderSystemBalance.minus(finalListingHolderSystemBalance).toString().should.eq(testValues.oneEther.toString());
      finalChallengerSystemBalance.minus(initialChallengerSystemBalance).toString().should.eq(toStakeholderCut(minimumBalance));
      finalChallengerCurrentBalance.minus(initialChallengerCurrentBalance).toString().should.eq(new BigNumber(toStakeholderCut(minimumBalance)).plus(new BigNumber(testValues.oneEther)).toString());
    });

    it("should correctly finalize a failed challenge", async () => {
      await prepareTokens(accounts[1], testValues.fiveEther);
      await prepareTokens(accounts[2], testValues.fiveEther);
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[2] });
      await skipBlocks(2);
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[1] });
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[2] });
      await skipBlocks(2);

      const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
      const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
      const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

      await validatorRegistryProxy.resolveChallenge.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      const finalChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
      const finalListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
      const finalListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

      initialChallengerSystemBalance.minus(finalChallengerSystemBalance).toString().should.eq(minimumBalance);
      finalListingHolderSystemBalance.minus(initialListingHolderSystemBalance).toString().should.eq(toStakeholderCut(minimumBalance));
      finalListingHolderCurrentBalance.minus(initialListingHolderCurrentBalance).toString().should.eq(toStakeholderCut(minimumBalance));
    });

    it("should correctly finalize a failed challenge on an exiting listing", async () => {
      await prepareTokens(accounts[1], testValues.fiveEther);
      await prepareTokens(accounts[2], testValues.fiveEther);
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey);
      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey);
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[2] });
      await skipBlocks(2);
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[1] });
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[2] });
      await skipBlocks(2);

      const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
      const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
      const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

      await validatorRegistryProxy.resolveChallenge.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      const finalChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
      const finalListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
      const finalListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

      initialChallengerSystemBalance.minus(finalChallengerSystemBalance).toString().should.eq(minimumBalance);
      finalListingHolderSystemBalance.minus(initialListingHolderSystemBalance).toString().should.eq(toStakeholderCut(minimumBalance));
      finalListingHolderCurrentBalance.minus(initialListingHolderCurrentBalance).toString().should.eq(new BigNumber(toStakeholderCut(minimumBalance)).plus(new BigNumber(testValues.oneEther)).toString());
    });

    it("should correctly finalize a failed challenge on a pending listing", async () => {
      await prepareTokens(accounts[1], testValues.fiveEther);
      await prepareTokens(accounts[2], testValues.fiveEther);
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[2] });
      await skipBlocks(2);
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[1] });
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[2] });
      await skipBlocks(2);

      const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
      const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
      const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

      await validatorRegistryProxy.resolveChallenge.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      const finalChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
      const finalListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
      const finalListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

      initialChallengerSystemBalance.minus(finalChallengerSystemBalance).toString().should.eq(minimumBalance);
      finalListingHolderSystemBalance.minus(initialListingHolderSystemBalance).toString().should.eq(toStakeholderCut(minimumBalance));
      finalListingHolderCurrentBalance.minus(initialListingHolderCurrentBalance).toString().should.eq(toStakeholderCut(minimumBalance));

      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
    });
  });

  describe("claimWinnings", () => {
    beforeEach(prepareListing);

    it("should succeed but deliver zero tokens if the user did not vote", async () => {
      await prepareTokens(accounts[1], testValues.fiveEther);
      await prepareTokens(accounts[2], testValues.fiveEther);
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey);
      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey);
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[2] });
      await skipBlocks(2);
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[1] });
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[2] });
      await skipBlocks(2);

      const initialVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
      const initialVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

      await validatorRegistryProxy.resolveChallenge.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await validatorRegistryProxy.claimWinnings.sendTransactionAsync(new BigNumber("1"), { from: accounts[5] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      const finalVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
      const finalVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

      initialVoterSystemBalance.minus(finalVoterSystemBalance).toString().should.eq("0");
      initialVoterCurrentBalance.minus(finalVoterCurrentBalance).toString().should.eq("0");
    });

    it("should succeed but deliver zero tokens if the user voted for the looser", async () => {
      await prepareTokens(accounts[1], testValues.fiveEther);
      await prepareTokens(accounts[2], testValues.fiveEther);
      await prepareTokens(accounts[5], testValues.fiveEther);
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey);
      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey);
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[2] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther, { from: accounts[5] });
      await skipBlocks(2);
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[1] });
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[2] });
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt, { from: accounts[5] });
      await skipBlocks(2);

      const initialVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
      const initialVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

      await validatorRegistryProxy.resolveChallenge.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await validatorRegistryProxy.claimWinnings.sendTransactionAsync(new BigNumber("1"), { from: accounts[5] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      const finalVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
      const finalVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

      initialVoterSystemBalance.minus(finalVoterSystemBalance).toString().should.eq("0");
      initialVoterCurrentBalance.minus(finalVoterCurrentBalance).toString().should.eq("0");
    });

    it("should correctly distribute the winnings", async () => {
      await prepareTokens(accounts[1], testValues.fiveEther);
      await prepareTokens(accounts[2], testValues.fiveEther);
      await prepareTokens(accounts[5], testValues.fiveEther);
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey);
      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey);
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[2] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther, { from: accounts[5] });
      await skipBlocks(2);
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[1] });
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[2] });
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt, { from: accounts[5] });
      await skipBlocks(2);

      const initialVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
      const initialVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

      await validatorRegistryProxy.resolveChallenge.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      await validatorRegistryProxy.claimWinnings.sendTransactionAsync(new BigNumber("1"), { from: accounts[5] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      const finalVoterSystemBalance = await treasury.systemBalance.callAsync(accounts[5]);
      const finalVoterCurrentBalance = await treasury.currentBalance.callAsync(accounts[5]);

      initialVoterSystemBalance.minus(finalVoterSystemBalance).toString().should.eq("0");
      initialVoterCurrentBalance.minus(finalVoterCurrentBalance).toString().should.eq("0");
    });

    it("should finalize a un-final challenge", async () => {
      await prepareTokens(accounts[1], testValues.fiveEther);
      await prepareTokens(accounts[2], testValues.fiveEther);
      await prepareTokens(accounts[5], testValues.fiveEther);
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey);
      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey);
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[2] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther, { from: accounts[5] });
      await skipBlocks(1);
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[1] });
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[2] });
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt, { from: accounts[5] });
      await skipBlocks(1);

      const initialChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
      const initialListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
      const initialListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

      await validatorRegistryProxy.claimWinnings.sendTransactionAsync(new BigNumber("1"), { from: accounts[5] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      const finalChallengerSystemBalance = await treasury.systemBalance.callAsync(accounts[1]);
      const finalListingHolderSystemBalance = await treasury.systemBalance.callAsync(accounts[0]);
      const finalListingHolderCurrentBalance = await treasury.currentBalance.callAsync(accounts[0]);

      initialChallengerSystemBalance.minus(finalChallengerSystemBalance).toString().should.eq(minimumBalance);
      finalListingHolderSystemBalance.minus(initialListingHolderSystemBalance).toString().should.eq(toStakeholderCut(minimumBalance));
      finalListingHolderCurrentBalance.minus(initialListingHolderCurrentBalance).toString().should.eq(new BigNumber(toStakeholderCut(minimumBalance)).plus(new BigNumber(testValues.oneEther)).toString());

    });

    it("should fail if the challenge has not ended", async () => {
      await prepareTokens(accounts[1], testValues.fiveEther);
      await prepareTokens(accounts[2], testValues.fiveEther);
      await prepareTokens(accounts[5], testValues.fiveEther);
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey);
      await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey);
      await validatorRegistryProxy.challengeListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[1] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret0, testValues.fiveEther, { from: accounts[2] });
      await voting.commitVote.sendTransactionAsync(new BigNumber("1"), secret1, testValues.fiveEther, { from: accounts[5] });
      await skipBlocks(1);
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[1] });
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("0"), salt, { from: accounts[2] });
      await voting.revealVote.sendTransactionAsync(new BigNumber("1"), new BigNumber("1"), salt, { from: accounts[5] });

      await validatorRegistryProxy.claimWinnings.sendTransactionAsync(new BigNumber("1"), { from: accounts[5] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });
  });

  describe("claimRewards", () => {
    describe("generate", () => {
      const reward = new BigNumber("1000000");
      beforeEach(async () => {
        await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.oneEther);
        await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.oneEther, { from: accounts[1] });
        await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, reward, { from: accounts[1] });
        await skipBlocks(applicationPeriod - 1);
        await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
      });

      it("should reward the user after a reward block", async () => {
        await skipBlocks(rewardPeriod);
        const startingBalance = await kosuToken.balanceOf.callAsync(accounts[1]);
        await validatorRegistryProxy.claimRewards.sendTransactionAsync(tendermintPublicKey);
        const endingBalance = await kosuToken.balanceOf.callAsync(accounts[1]);
        endingBalance.minus(startingBalance).toString().should.eq(reward.toString());
      });

      it("should reward users for all reward blocks passed", async () => {
        await skipBlocks(rewardPeriod * 10);
        const startingBalance = await kosuToken.balanceOf.callAsync(accounts[1]);
        await validatorRegistryProxy.claimRewards.sendTransactionAsync(tendermintPublicKey);
        const endingBalance = await kosuToken.balanceOf.callAsync(accounts[1]);
        endingBalance.minus(startingBalance).toString().should.eq(reward.times(new BigNumber("10")).toString());
      });
    });

    describe("burn", () => {
      const reward = new BigNumber("-1000000");
      it("should touch and remove a listing that is short on tokens.", async () => {
        await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.oneEther);
        await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.oneEther, { from: accounts[1] });
        await treasury.deposit.sendTransactionAsync(testValues.oneEther, { from: accounts[1] });
        await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, reward, { from: accounts[1] });
        await skipBlocks(applicationPeriod - 1);
        await kosuToken.transfer.sendTransactionAsync(accounts[1], new BigNumber(new BigNumber("1000000")));
        await kosuToken.approve.sendTransactionAsync(treasury.address, new BigNumber(new BigNumber("1000000")), { from: accounts[1] });
        await treasury.deposit.sendTransactionAsync(new BigNumber(new BigNumber("1000000")), { from: accounts[1] });
        await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
        await skipBlocks(rewardPeriod);
        await validatorRegistryProxy.claimRewards.sendTransactionAsync(tendermintPublicKey);

        const listing = await validatorRegistryProxy.getListing.callAsync(tendermintPublicKey).then(listingDecoder);
        listing.status.toString().should.eq("0");
      });

      it("should burn into the staked balance", async () => {
        await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.oneEther);
        await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.oneEther, { from: accounts[1] });
        await treasury.deposit.sendTransactionAsync(testValues.oneEther, { from: accounts[1] });
        await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, reward, { from: accounts[1] });
        await kosuToken.balanceOf.callAsync(accounts[1]).then(x => x.toString()).should.eventually.eq("0");
        await skipBlocks(applicationPeriod - 1);
        await kosuToken.transfer.sendTransactionAsync(accounts[1], new BigNumber("1000000"));
        await kosuToken.approve.sendTransactionAsync(treasury.address, new BigNumber("1000000"), { from: accounts[1] });
        await treasury.deposit.sendTransactionAsync(new BigNumber("1000000"), { from: accounts[1] });
        await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
        await treasury.currentBalance.callAsync(accounts[1]).then(x => x.toString()).should.eventually.eq("0");
        await treasury.systemBalance.callAsync(accounts[1]).then(x => x.toString()).should.eventually.eq(testValues.oneEther.toString());
        await skipBlocks(rewardPeriod);
        await validatorRegistryProxy.claimRewards.sendTransactionAsync(tendermintPublicKey);
        const desiredEndValue = new BigNumber(testValues.oneEther).plus(reward);
        await treasury.currentBalance.callAsync(accounts[1]).then(x => x.toString()).should.eventually.eq(desiredEndValue.toString());
      });

      it("should burn up to all the staked balance", async () => {
        const burnFive = new BigNumber(testValues.fiveEther).times(new BigNumber("-1"));
        await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.sixEther);
        await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.sixEther, { from: accounts[1] });
        await treasury.deposit.sendTransactionAsync(testValues.sixEther, { from: accounts[1] });
        await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, burnFive, { from: accounts[1] });
        await kosuToken.balanceOf.callAsync(accounts[1]).then(x => x.toString()).should.eventually.eq("0");
        await skipBlocks(applicationPeriod);
        await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
        await treasury.currentBalance.callAsync(accounts[1]).then(x => x.toString()).should.eventually.eq("0");
        await treasury.systemBalance.callAsync(accounts[1]).then(x => x.toString()).should.eventually.eq(testValues.oneEther.toString());
        await skipBlocks(rewardPeriod);
        await validatorRegistryProxy.claimRewards.sendTransactionAsync(tendermintPublicKey);
        await treasury.currentBalance.callAsync(accounts[1]).then(x => x.toString()).should.eventually.eq("0");
      });

      describe("funded", () => {
        beforeEach(async () => {
          await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.fiveEther);
          await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.fiveEther, { from: accounts[1] });
          await treasury.deposit.sendTransactionAsync(testValues.fiveEther, { from: accounts[1] });
          await validatorRegistryProxy.registerListing.sendTransactionAsync(tendermintPublicKey, testValues.oneEther, reward, { from: accounts[1] });
          await skipBlocks(applicationPeriod - 1);
          await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey, { from: accounts[1] });
        });

        it("should burn the users tokens after a reward block", async () => {
          await skipBlocks(rewardPeriod);
          const startingBalance = await treasury.currentBalance.callAsync(accounts[1]);
          await validatorRegistryProxy.claimRewards.sendTransactionAsync(tendermintPublicKey);
          const endingBalance = await treasury.currentBalance.callAsync(accounts[1]);
          startingBalance.minus(endingBalance).toString().should.eq(reward.times(new BigNumber("-1")).toString());
        });

        it("should burn users tokens for all reward blocks passed", async () => {
          await skipBlocks(rewardPeriod * 10);
          const startingBalance = await treasury.currentBalance.callAsync(accounts[1]);
          await validatorRegistryProxy.claimRewards.sendTransactionAsync(tendermintPublicKey);
          const endingBalance = await treasury.currentBalance.callAsync(accounts[1]);
          startingBalance.minus(endingBalance).toString().should.eq(reward.times(new BigNumber("-10")).toString());
        });
      });
    });
  });

  describe("ValidatorRegistryUpdate", () => {
    beforeEach(prepareListing);

    it("should emit event when listing is confirmed", async () => {

      const result = await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      const decodedLogs = decodeKosuEvents(result.logs)[0];

      decodedLogs.eventType.should.eq("ValidatorRegistryUpdate");
      decodedLogs.tendermintPublicKey.should.eq(base64Key);
      decodedLogs.owner.should.eq(accounts[0].toLowerCase());
      decodedLogs.stake.should.eq(testValues.oneEther.toString());
    });

    it("should emit event when stake is removed", async () => {
      await validatorRegistryProxy.confirmListing.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      const result = await validatorRegistryProxy.initExit.sendTransactionAsync(tendermintPublicKey).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      const decodedLogs = decodeKosuEvents(result.logs)[0];

      decodedLogs.eventType.should.eq("ValidatorRegistryUpdate");
      decodedLogs.tendermintPublicKey.should.eq(base64Key);
      decodedLogs.owner.should.eq(accounts[0].toLowerCase());
      decodedLogs.stake.should.eq("0");
    });
  });
});
