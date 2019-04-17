const ValidatorRegistryProxy = artifacts.require("./ValidatorRegistryProxy.sol");
const AuthorizedAddresses = artifacts.require('./AuthorizedAddresses.sol');
const ValidatorRegistry = artifacts.require("./ValidatorRegistry.sol");
const Treasury = artifacts.require('./Treasury.sol');
const Voting = artifacts.require("./Voting.sol");
const KosuToken = artifacts.require("./KosuToken.sol");

contract('ValidatorRegistry', async (accounts) => {
  let validatorRegistryProxy, validatorRegistry, kosuToken, treasury, auth, voting, applicationPeriod, exitPeriod, rewardPeriod, minimumBalance, stakeholderCut;
  const base64Key = 'x6899Z4PYjavGaaEBt8jk0Y/3HF5GiR1duDld66IlxM=';
  const tendermintPublicKey = '0x' + Buffer.from(base64Key, 'base64').toString('hex');
  const nilKey = web3.utils.toTwosComplement(web3.utils.stringToHex(''));

  const salt = '42';
  const secret0 = web3.utils.soliditySha3({ t: 'uint', v: '0' }, { t: 'uint', v: salt });
  const secret1 = web3.utils.soliditySha3({ t: 'uint', v: '1' }, { t: 'uint', v: salt });
  const secret2 = web3.utils.soliditySha3({ t: 'uint', v: '2' }, { t: 'uint', v: salt });

  const prepareListing = async (options = {}) => {
    const { stake, reward } = options;
    await kosuToken.approve(treasury.address, stake || oneEther);
    await validatorRegistryProxy.registerListing(tendermintPublicKey, stake || oneEther, reward || '0');
    await skipBlocks(applicationPeriod - 1);
  };

  const exitSkip = async () => {
    await skipBlocks(exitPeriod);
  };

  const toStakeholderCut = (value) => {
    return web3.utils.toBN(value).mul(web3.utils.toBN(stakeholderCut)).div(web3.utils.toBN('100')).toString();
  };

  before(async () => {
    validatorRegistryProxy = await ValidatorRegistryProxy.deployed();
    validatorRegistry = await ValidatorRegistry.deployed();
    kosuToken = await KosuToken.deployed();
    treasury = await Treasury.deployed();
    auth = await AuthorizedAddresses.deployed();
    voting = await Voting.deployed();
    applicationPeriod = await validatorRegistryProxy.applicationPeriod.call().then((v) => v.toNumber());
    exitPeriod = await validatorRegistryProxy.exitPeriod.call().then((v) => v.toNumber());
    rewardPeriod = await validatorRegistryProxy.rewardPeriod.call().then((v) => v.toNumber());
    minimumBalance = await validatorRegistryProxy.minimumBalance.call().then(x => x.toString());
    stakeholderCut = await validatorRegistryProxy.stakeholderCut.call().then(x => x.toString());
  });

 describe('token', () => {
    it('should have a token token configured', async () => {
      validatorRegistryProxy.token.call().should.eventually.eq(kosuToken.address);
    });
  });

  describe('validators', () => {
    const publicKeys = accounts.map( (a) => web3.utils.padRight(a, 64).toLowerCase() );
    beforeEach(async () => {
      for(let i = 0; i < accounts.length; i++) {
        const from  = accounts[i];
        await kosuToken.transfer(from, oneEther);
        await kosuToken.approve(treasury.address, oneEther, { from });
        await validatorRegistryProxy.registerListing(from, oneEther, '0', { from });
      }
    });

    it('should return a list of validator listing keys', async () => {
      const validators = await validatorRegistryProxy.validators.call();
      //Keys are hex bytes32 padding these addresses to match the bytes32 output
      validators.should.have.members(publicKeys);
    });

    it('should have the value removed after a user removes listing', async () => {
      const removeKey = publicKeys[5];

      const remainingKeys = publicKeys.slice(0);
      remainingKeys.splice(5, 1);

      await validatorRegistryProxy.initExit(removeKey, { from: accounts[5] });

      const validators = await validatorRegistryProxy.validators.call();
      //Keys are hex bytes32 padding these addresses to match the bytes32 output
      validators.length.should.eq(publicKeys.length - 1);
      validators.should.have.members(remainingKeys);
    })
  });

  describe('registerListing', () => {
    it('should require a balance greater or equal to the minimumBalance', async () => {
      const from = accounts[1];

      await kosuToken.balanceOf.call(from).then(x => x.toString()).should.eventually.eq('0');
      await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, '0', { from }).should.eventually.be.rejected;
    });

    it('should require an approval greater or equal to the minimumBalance', async () => {
      await kosuToken.balanceOf.call(accounts[0]).then(x => x.toString()).then(parseInt)
        .should.eventually.gt(parseInt(oneEther));
      await kosuToken.approve(treasury.address, '0').should.eventually.be.fulfilled;
      await kosuToken.allowance.call(accounts[0], validatorRegistryProxy.address).then(x => x.toString())
        .should.eventually.eq('0');
      await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, '0').should.eventually.be.rejected;
    });

    describe('approved', () => {
      beforeEach(async () => {
        await kosuToken.approve(treasury.address, maxUint);
      });

      it('should allow registration with the minimumBalance', async () => {
        await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, '0').should.eventually.be.fulfilled;
      });

      it('should not allow registration to overwrite existing listing', async () => {
        await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, '0').should.eventually.be.fulfilled;
        await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, '0').should.eventually.be.rejected;
      });

      it('should set the listing status to pending', async () => {
        await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, '0').should.eventually.be.fulfilled;
        const listing = await validatorRegistryProxy.getListing.call(tendermintPublicKey);

        listing.status.toString().should.eq('1'); //Pending is 1
      });

      it('should emit a ValidatorRegistered event', async () => {
        const blockNumber = await web3.eth.getBlockNumber().then(x => (parseInt(x) + 1).toString());
        const result = await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, '0');
        assertEmitterEvents(result, 3, (decoded) => (
            decoded.eventType === 'ValidatorRegistered' &&
            decoded.tendermintPublicKey === base64Key &&
            decoded.owner === accounts[0].toLowerCase() &&
            decoded.applicationBlockNumber === blockNumber &&
            decoded.rewardRate === '0'
        ));
      });

      it('should emit a ValidatorRegistered event with correct positive reward', async () => {
        const blockNumber = await web3.eth.getBlockNumber().then(x => (parseInt(x) + 1).toString());
        const result = await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, '1');
        assertEmitterEvents(result, 3, (decoded) => (
            decoded.eventType === 'ValidatorRegistered' &&
            decoded.tendermintPublicKey === base64Key &&
            decoded.owner === accounts[0].toLowerCase() &&
            decoded.applicationBlockNumber === blockNumber &&
            decoded.rewardRate === '1'
        ));
      });

      it('should emit a ValidatorRegistered event with correct negative reward', async () => {
        const blockNumber = await web3.eth.getBlockNumber().then(x => (parseInt(x) + 1).toString());
        const result = await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, '-1');
        assertEmitterEvents(result, 3, (decoded) => (
            decoded.eventType === 'ValidatorRegistered' &&
            decoded.tendermintPublicKey === base64Key &&
            decoded.owner === accounts[0].toLowerCase() &&
            decoded.applicationBlockNumber === blockNumber &&
            decoded.rewardRate === '-1'
        ));
      });

      it('should fail with less tokens than minimum', async () => {
        const minimum = await validatorRegistryProxy.minimumBalance();
        await validatorRegistryProxy.registerListing(tendermintPublicKey, minimum.sub(web3.utils.toBN('1')), '0').should.eventually.be.rejected;
      });

      it('should fail when you try to generate too many tokens',  async () => {
        const max = await validatorRegistryProxy.maxRewardRate();
        await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, max.add(web3.utils.toBN('1'))).should.eventually.be.rejected;
      });

      it('should allow an unbounded ', async () => {
        const allInToken = await kosuToken.balanceOf(accounts[0]);
        await kosuToken.approve(treasury.address, allInToken);
        await treasury.deposit(allInToken);
        const totalTokens = await treasury.currentBalance(accounts[0]);

        const initialContractStake = await kosuToken.balanceOf(validatorRegistry.address);

        await validatorRegistryProxy.registerListing(tendermintPublicKey, totalTokens, '0').should.eventually.be.fulfilled;

        const finalContractStake = await kosuToken.balanceOf(validatorRegistry.address);
        finalContractStake.sub(initialContractStake).toString().should.eq(totalTokens.toString());

      });

      it('should be initialized correctly');//TODO: maybe work on this after the read function is more descriptive
    });
  });

  describe('confirmListing', () => {
    it('should not confirm a null listing', async () => {
      await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.rejected;
    });

    it('should require sufficient blocks to pass before confirmation', async () => {
      await kosuToken.approve(treasury.address, oneEther);
      await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, '0');
      await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.rejected;

      await skipBlocks(applicationPeriod - 2);

      await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.fulfilled;
    });

    it('should increase the maxRewardRate', async () => {
      const oldReward = await validatorRegistryProxy.maxRewardRate();
      await prepareListing({ reward: web3.utils.toWei('2') });

      await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.fulfilled;
      const newReward = await validatorRegistryProxy.maxRewardRate.call();
      newReward.gt(oldReward).should.be.true;
    });

    describe('preparedListing tests', () => {
      beforeEach(prepareListing);

      it('should not confirm a challenged listing', async () => {
        await kosuToken.approve(treasury.address, oneEther);

        await validatorRegistryProxy.challengeListing(tendermintPublicKey).should.eventually.be.fulfilled;
        await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.rejected;
      });

      it('should only let the listing owner confirm the listing', async () => {
        await validatorRegistryProxy.confirmListing(tendermintPublicKey, { from: accounts[1] }).should.eventually.be.rejected;
      });

      it('should change the listings status to ACCEPTED', async () => {
        await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.fulfilled;
        const listing = await validatorRegistryProxy.getListing.call(tendermintPublicKey);

        listing.status.toString().should.eq('2'); //Accepted is 2
        listing.tendermintPublicKey.should.eq(tendermintPublicKey, 'tendermint');
        listing.owner.should.eq(accounts[0]);
      });
    });
  });

  describe('initExit', () => {
    beforeEach(prepareListing);

    it('should remove an unconfirmed listing', async () => {
      await validatorRegistryProxy.initExit(tendermintPublicKey).should.eventually.be.fulfilled;
      const listing = await validatorRegistryProxy.getListing.call(tendermintPublicKey);

      listing.status.toString().should.eq('0');
      listing.owner.should.eq('0x0000000000000000000000000000000000000000');
    });

    it('should not allow an exit with a pending challenge', async () => {
      await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.fulfilled;

      await kosuToken.transfer(accounts[1], oneEther);
      await kosuToken.approve(treasury.address, oneEther, { from: accounts[1] });
      await treasury.deposit(oneEther, { from: accounts[1] });
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] }).should.eventually.be.fulfilled;

      await validatorRegistryProxy.initExit(tendermintPublicKey).should.eventually.be.rejected;
    });

    it('should set the status to exiting', async () => {
      await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.fulfilled;
      await validatorRegistryProxy.initExit(tendermintPublicKey).should.eventually.be.fulfilled;
      const listing = await validatorRegistryProxy.getListing.call(tendermintPublicKey);

      listing.status.toString().should.eq('4');
    });

    it('should only let the owner initExit', async () => {
      await validatorRegistryProxy.initExit(tendermintPublicKey, { from: accounts[1] }).should.eventually.be.rejected;
    });
  });

  describe('finalizeExit', () => {
    beforeEach(prepareListing);

    it('should remove the confirmed listing', async () => {
      await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.fulfilled;
      await validatorRegistryProxy.initExit(tendermintPublicKey).should.eventually.be.fulfilled;
      await exitSkip();
      await validatorRegistryProxy.finalizeExit(tendermintPublicKey).should.eventually.be.fulfilled;

      const listing = await validatorRegistryProxy.getListing.call(tendermintPublicKey);

      listing.status.toString().should.eq('0');
      listing.tendermintPublicKey.should.eq(nilKey);
      listing.applicationBlock.toString().should.eq('0');
      listing.owner.should.eq('0x0000000000000000000000000000000000000000')
    });

    it('should release the tokens to the treasury', async () => {
      await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.fulfilled;
      await treasury.currentBalance.call(accounts[0]).then(r => r.toString()).should.eventually.eq('0');
      await validatorRegistryProxy.initExit(tendermintPublicKey).should.eventually.be.fulfilled;
      await exitSkip();
      await validatorRegistryProxy.finalizeExit(tendermintPublicKey).should.eventually.be.fulfilled;
      await treasury.currentBalance.call(accounts[0]).then(r => r.toString()).should.eventually.eq(oneEther)
    });

    it('should not allow a listing to exit until after the exit period', async () => {
      await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.fulfilled;
      await treasury.currentBalance.call(accounts[0]).then(r => r.toString()).should.eventually.eq('0');
      await validatorRegistryProxy.initExit(tendermintPublicKey).should.eventually.be.fulfilled;
      await validatorRegistryProxy.finalizeExit(tendermintPublicKey).should.eventually.be.rejected;
    });

    it('should only let the owner finalizeExit', async () => {
      await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.fulfilled;
      await validatorRegistryProxy.initExit(tendermintPublicKey).should.eventually.be.fulfilled;
      await exitSkip();
      await validatorRegistryProxy.finalizeExit(tendermintPublicKey, { from: accounts[1] }).should.eventually.be.rejected;
    });

    it('should reduce the maxRewardRate on minting exit', async () => {
      await validatorRegistryProxy.initExit(tendermintPublicKey).should.eventually.be.fulfilled;
      await prepareListing({ reward: web3.utils.toWei('2') })
      await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.fulfilled;

      await validatorRegistryProxy.initExit(tendermintPublicKey).should.eventually.be.fulfilled;
      await exitSkip();
      const oldReward = await validatorRegistryProxy.maxRewardRate();
      await validatorRegistryProxy.finalizeExit(tendermintPublicKey).should.eventually.be.fulfilled;
      const newReward = await validatorRegistryProxy.maxRewardRate.call();

      oldReward.gt(newReward).should.be.true;

    });
  });

  describe('challengeListing', () => {
    beforeEach(prepareListing);

    it('should require tokens approved to challenge', async () => {
      await kosuToken.transfer(accounts[1], oneEther);
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] }).should.eventually.be.rejected;
    });

    it('should take tokens on challenge', async () => {
      await kosuToken.transfer(accounts[1], oneEther);
      await kosuToken.approve(treasury.address, oneEther, { from: accounts[1] });
      await treasury.deposit(oneEther, { from: accounts[1] });

      await treasury.currentBalance.call(accounts[1]).then(r => r.toString()).should.eventually.eq(oneEther);
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] }).should.eventually.be.fulfilled;
      await treasury.currentBalance.call(accounts[1]).then(r => r.toString()).should.eventually.eq('0');
    });

    it('should allow an accepted listing to be challenged and should raise an event with a pollId', async () => {
      await kosuToken.transfer(accounts[1], oneEther);
      await kosuToken.approve(treasury.address, oneEther, { from: accounts[1] });

      await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.fulfilled;

      const listing = await validatorRegistryProxy.getListing.call(tendermintPublicKey);
      listing.status.toString().should.eq('2'); //Accepted is 2

      const result = await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] });
      assertEmitterEvents(result, 4, (decoded) => (
        decoded.eventType === 'ValidatorChallenged' &&
        decoded.challenger === accounts[1].toLowerCase() &&
        decoded.owner === accounts[0].toLowerCase() &&
        decoded.pollId === '1'
      ));

      await voting.nextPollId.call().then(x => x.toString()).should.eventually.eq('2');
    });

    it('should allow a pending listing to be challenged', async () => {
      await kosuToken.transfer(accounts[1], oneEther);
      await kosuToken.approve(treasury.address, oneEther, { from: accounts[1] });

      const listing = await validatorRegistryProxy.getListing.call(tendermintPublicKey);
      listing.status.toString().should.eq('1'); //PENDING is 1

      const result = await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] });
      assertEmitterEvents(result, 4, (decoded) => (
        decoded.eventType === 'ValidatorChallenged' &&
        decoded.challenger === accounts[1].toLowerCase() &&
        decoded.owner === accounts[0].toLowerCase() &&
        decoded.pollId === '1'
      ));
    });

    it('should allow an exiting listing to be challenged', async () => {
      await kosuToken.transfer(accounts[1], oneEther);
      await kosuToken.approve(treasury.address, oneEther, { from: accounts[1] });
      await treasury.deposit(oneEther, { from: accounts[1] });

      await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.fulfilled;
      await validatorRegistryProxy.initExit(tendermintPublicKey).should.eventually.be.fulfilled;
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] }).should.eventually.be.fulfilled;

    });

    it('should match tokens for challenge to the balance staked by listing holder', async () => {
      await kosuToken.transfer(accounts[1], fiveEther);
      await kosuToken.approve(treasury.address, fiveEther, { from: accounts[1] });
      await kosuToken.approve(treasury.address, fiveEther);
      await treasury.deposit(fiveEther, { from: accounts[1] });

      await validatorRegistryProxy.initExit(tendermintPublicKey).should.be.fulfilled;
      await validatorRegistryProxy.registerListing(tendermintPublicKey, fiveEther, '0').should.be.fulfilled;
      await skipBlocks(applicationPeriod);

      await treasury.currentBalance(accounts[1]).then(x => x.toString()).should.eventually.eq(fiveEther.toString());
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] }).should.eventually.be.fulfilled;
      await treasury.systemBalance(accounts[1]).then(x => x.toString()).should.eventually.eq(fiveEther.toString());
      await treasury.currentBalance(accounts[1]).then(x => x.toString()).should.eventually.eq('0');
    });

    it('should touch and remove a listing without adequate tokens for a burn', async () => {
      await kosuToken.transfer(accounts[1], oneEther);
      await kosuToken.transfer(accounts[1], '1');
      await kosuToken.approve(treasury.address, oneEther, { from: accounts[1] });
      await kosuToken.approve(treasury.address, oneEther);

      await validatorRegistryProxy.initExit(tendermintPublicKey);
      await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, '-1', { from: accounts[1] }).should.eventually.be.fulfilled;
      await kosuToken.approve(treasury.address, '1', { from: accounts[1] });
      await treasury.deposit('1', { from: accounts[1] });
      await skipBlocks(applicationPeriod - 1);
      await validatorRegistryProxy.confirmListing(tendermintPublicKey, { from: accounts[1] });

      await skipBlocks(2);

      await validatorRegistryProxy.challengeListing(tendermintPublicKey).should.eventually.be.fulfilled;
      const listing = await validatorRegistryProxy.getListing(tendermintPublicKey);
      listing.status.toString().should.eq('0');
    });
  });

  describe('resolveChallenge', () => {
    beforeEach(prepareListing);

    it('should fail if called a second time', async () => {
      await prepareTokens(accounts[1], fiveEther);
      await prepareTokens(accounts[2], fiveEther);
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote(1, secret1, fiveEther, { from: accounts[1] });
      await voting.commitVote(1, secret1, fiveEther, { from: accounts[2] });
      await skipBlocks(2);
      await voting.revealVote(1, 1, salt, { from: accounts[1] });
      await voting.revealVote(1, 1, salt, { from: accounts[2] });
      await skipBlocks(2);

      await validatorRegistryProxy.resolveChallenge(tendermintPublicKey).should.eventually.be.fulfilled;
      await validatorRegistryProxy.resolveChallenge(tendermintPublicKey).should.eventually.be.rejected;

    });

    it('should require challenge to be ended', async () => {
      await prepareTokens(accounts[1], fiveEther);
      await prepareTokens(accounts[2], fiveEther);
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote(1, secret1, fiveEther, { from: accounts[1] });
      await voting.commitVote(1, secret1, fiveEther, { from: accounts[2] });
      await skipBlocks(2);
      await voting.revealVote(1, 1, salt, { from: accounts[1] });
      await voting.revealVote(1, 1, salt, { from: accounts[2] });

      await validatorRegistryProxy.resolveChallenge(tendermintPublicKey).should.eventually.be.rejected;
    });

    it('should correctly finalize a successful challenge', async () => {
      await prepareTokens(accounts[1], fiveEther);
      await prepareTokens(accounts[2], fiveEther);
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote(1, secret1, fiveEther, { from: accounts[1] });
      await voting.commitVote(1, secret1, fiveEther, { from: accounts[2] });
      await skipBlocks(2);
      await voting.revealVote(1, 1, salt, { from: accounts[1] });
      await voting.revealVote(1, 1, salt, { from: accounts[2] });
      await skipBlocks(2);

      const initialListingHolderSystemBalance = await treasury.systemBalance.call(accounts[0]);
      const initialChallengerSystemBalance = await treasury.systemBalance.call(accounts[1]);
      const initialChallengerCurrentBalance = await treasury.currentBalance.call(accounts[1]);

      await validatorRegistryProxy.resolveChallenge(tendermintPublicKey).should.eventually.be.fulfilled;

      const finalListingHolderSystemBalance = await treasury.systemBalance.call(accounts[0]);
      const finalChallengerSystemBalance = await treasury.systemBalance.call(accounts[1]);
      const finalChallengerCurrentBalance = await treasury.currentBalance.call(accounts[1]);

      initialListingHolderSystemBalance.sub(finalListingHolderSystemBalance).toString().should.eq(oneEther);
      finalChallengerSystemBalance.sub(initialChallengerSystemBalance).toString().should.eq(toStakeholderCut(minimumBalance));
      finalChallengerCurrentBalance.sub(initialChallengerCurrentBalance).toString().should.eq(web3.utils.toBN(toStakeholderCut(minimumBalance)).add(web3.utils.toBN(oneEther)).toString());
    });

    it('should correctly finalize a failed challenge', async () => {
      await prepareTokens(accounts[1], fiveEther);
      await prepareTokens(accounts[2], fiveEther);
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[2] });
      await skipBlocks(2);
      await voting.revealVote(1, 0, salt, { from: accounts[1] });
      await voting.revealVote(1, 0, salt, { from: accounts[2] });
      await skipBlocks(2);

      const initialChallengerSystemBalance = await treasury.systemBalance.call(accounts[1]);
      const initialListingHolderSystemBalance = await treasury.systemBalance.call(accounts[0]);
      const initialListingHolderCurrentBalance = await treasury.currentBalance.call(accounts[0]);

      await validatorRegistryProxy.resolveChallenge(tendermintPublicKey).should.eventually.be.fulfilled;

      const finalChallengerSystemBalance = await treasury.systemBalance.call(accounts[1]);
      const finalListingHolderSystemBalance = await treasury.systemBalance.call(accounts[0]);
      const finalListingHolderCurrentBalance = await treasury.currentBalance.call(accounts[0]);

      initialChallengerSystemBalance.sub(finalChallengerSystemBalance).toString().should.eq(minimumBalance);
      finalListingHolderSystemBalance.sub(initialListingHolderSystemBalance).toString().should.eq(toStakeholderCut(minimumBalance));
      finalListingHolderCurrentBalance.sub(initialListingHolderCurrentBalance).toString().should.eq(toStakeholderCut(minimumBalance));
    });

    it('should correctly finalize a failed challenge on an exiting listing', async () => {
      await prepareTokens(accounts[1], fiveEther);
      await prepareTokens(accounts[2], fiveEther);
      await validatorRegistryProxy.confirmListing(tendermintPublicKey);
      await validatorRegistryProxy.initExit(tendermintPublicKey);
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[2] });
      await skipBlocks(2);
      await voting.revealVote(1, 0, salt, { from: accounts[1] });
      await voting.revealVote(1, 0, salt, { from: accounts[2] });
      await skipBlocks(2);

      const initialChallengerSystemBalance = await treasury.systemBalance.call(accounts[1]);
      const initialListingHolderSystemBalance = await treasury.systemBalance.call(accounts[0]);
      const initialListingHolderCurrentBalance = await treasury.currentBalance.call(accounts[0]);

      await validatorRegistryProxy.resolveChallenge(tendermintPublicKey).should.eventually.be.fulfilled;

      const finalChallengerSystemBalance = await treasury.systemBalance.call(accounts[1]);
      const finalListingHolderSystemBalance = await treasury.systemBalance.call(accounts[0]);
      const finalListingHolderCurrentBalance = await treasury.currentBalance.call(accounts[0]);

      initialChallengerSystemBalance.sub(finalChallengerSystemBalance).toString().should.eq(minimumBalance);
      finalListingHolderSystemBalance.sub(initialListingHolderSystemBalance).toString().should.eq(toStakeholderCut(minimumBalance));
      finalListingHolderCurrentBalance.sub(initialListingHolderCurrentBalance).toString().should.eq(web3.utils.toBN(toStakeholderCut(minimumBalance)).add(web3.utils.toBN(oneEther)).toString());
    });

    it('should correctly finalize a failed challenge on a pending listing', async () => {
      await prepareTokens(accounts[1], fiveEther);
      await prepareTokens(accounts[2], fiveEther);
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[2] });
      await skipBlocks(2);
      await voting.revealVote(1, 0, salt, { from: accounts[1] });
      await voting.revealVote(1, 0, salt, { from: accounts[2] });
      await skipBlocks(2);

      const initialChallengerSystemBalance = await treasury.systemBalance.call(accounts[1]);
      const initialListingHolderSystemBalance = await treasury.systemBalance.call(accounts[0]);
      const initialListingHolderCurrentBalance = await treasury.currentBalance.call(accounts[0]);

      await validatorRegistryProxy.resolveChallenge(tendermintPublicKey).should.eventually.be.fulfilled;

      const finalChallengerSystemBalance = await treasury.systemBalance.call(accounts[1]);
      const finalListingHolderSystemBalance = await treasury.systemBalance.call(accounts[0]);
      const finalListingHolderCurrentBalance = await treasury.currentBalance.call(accounts[0]);

      initialChallengerSystemBalance.sub(finalChallengerSystemBalance).toString().should.eq(minimumBalance);
      finalListingHolderSystemBalance.sub(initialListingHolderSystemBalance).toString().should.eq(toStakeholderCut(minimumBalance));
      finalListingHolderCurrentBalance.sub(initialListingHolderCurrentBalance).toString().should.eq(toStakeholderCut(minimumBalance));

      await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.fulfilled;
    })
  });

  describe('claimWinnings', () => {
    beforeEach(prepareListing);

    it('should succeed but deliver zero tokens if the user did not vote', async () => {
      await prepareTokens(accounts[1], fiveEther);
      await prepareTokens(accounts[2], fiveEther);
      await validatorRegistryProxy.confirmListing(tendermintPublicKey);
      await validatorRegistryProxy.initExit(tendermintPublicKey);
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[2] });
      await skipBlocks(2);
      await voting.revealVote(1, 0, salt, { from: accounts[1] });
      await voting.revealVote(1, 0, salt, { from: accounts[2] });
      await skipBlocks(2);

      const initialVoterSystemBalance = await treasury.systemBalance.call(accounts[5]);
      const initialVoterCurrentBalance = await treasury.currentBalance.call(accounts[5]);

      await validatorRegistryProxy.resolveChallenge(tendermintPublicKey).should.eventually.be.fulfilled;
      await validatorRegistryProxy.claimWinnings(1, { from: accounts[5] }).should.eventually.be.fulfilled;

      const finalVoterSystemBalance = await treasury.systemBalance.call(accounts[5]);
      const finalVoterCurrentBalance = await treasury.currentBalance.call(accounts[5]);

      initialVoterSystemBalance.sub(finalVoterSystemBalance).toString().should.eq('0');
      initialVoterCurrentBalance.sub(finalVoterCurrentBalance).toString().should.eq('0');
    });

    it('should succeed but deliver zero tokens if the user voted for the looser', async () => {
      await prepareTokens(accounts[1], fiveEther);
      await prepareTokens(accounts[2], fiveEther);
      await prepareTokens(accounts[5], fiveEther);
      await validatorRegistryProxy.confirmListing(tendermintPublicKey);
      await validatorRegistryProxy.initExit(tendermintPublicKey);
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[2] });
      await voting.commitVote(1, secret1, fiveEther, { from: accounts[5] });
      await skipBlocks(2);
      await voting.revealVote(1, 0, salt, { from: accounts[1] });
      await voting.revealVote(1, 0, salt, { from: accounts[2] });
      await voting.revealVote(1, 1, salt, { from: accounts[5] });
      await skipBlocks(2);

      const initialVoterSystemBalance = await treasury.systemBalance.call(accounts[5]);
      const initialVoterCurrentBalance = await treasury.currentBalance.call(accounts[5]);


      await validatorRegistryProxy.resolveChallenge(tendermintPublicKey).should.eventually.be.fulfilled;
      await validatorRegistryProxy.claimWinnings(1, { from: accounts[5] }).should.eventually.be.fulfilled;

      const finalVoterSystemBalance = await treasury.systemBalance.call(accounts[5]);
      const finalVoterCurrentBalance = await treasury.currentBalance.call(accounts[5]);

      initialVoterSystemBalance.sub(finalVoterSystemBalance).toString().should.eq('0');
      initialVoterCurrentBalance.sub(finalVoterCurrentBalance).toString().should.eq('0');
    });

    it('should correctly distribute the winnings', async () => {
      await prepareTokens(accounts[1], fiveEther);
      await prepareTokens(accounts[2], fiveEther);
      await prepareTokens(accounts[5], fiveEther);
      await validatorRegistryProxy.confirmListing(tendermintPublicKey);
      await validatorRegistryProxy.initExit(tendermintPublicKey);
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[2] });
      await voting.commitVote(1, secret1, fiveEther, { from: accounts[5] });
      await skipBlocks(2);
      await voting.revealVote(1, 0, salt, { from: accounts[1] });
      await voting.revealVote(1, 0, salt, { from: accounts[2] });
      await voting.revealVote(1, 1, salt, { from: accounts[5] });
      await skipBlocks(2);

      const initialVoterSystemBalance = await treasury.systemBalance.call(accounts[5]);
      const initialVoterCurrentBalance = await treasury.currentBalance.call(accounts[5]);


      await validatorRegistryProxy.resolveChallenge(tendermintPublicKey).should.eventually.be.fulfilled;
      await validatorRegistryProxy.claimWinnings(1, { from: accounts[5] }).should.eventually.be.fulfilled;

      const finalVoterSystemBalance = await treasury.systemBalance.call(accounts[5]);
      const finalVoterCurrentBalance = await treasury.currentBalance.call(accounts[5]);

      initialVoterSystemBalance.sub(finalVoterSystemBalance).toString().should.eq('0');
      initialVoterCurrentBalance.sub(finalVoterCurrentBalance).toString().should.eq('0');
    });

    it('should finalize a un-final challenge', async () => {
      await prepareTokens(accounts[1], fiveEther);
      await prepareTokens(accounts[2], fiveEther);
      await prepareTokens(accounts[5], fiveEther);
      await validatorRegistryProxy.confirmListing(tendermintPublicKey);
      await validatorRegistryProxy.initExit(tendermintPublicKey);
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[2] });
      await voting.commitVote(1, secret1, fiveEther, { from: accounts[5] });
      await skipBlocks(1);
      await voting.revealVote(1, 0, salt, { from: accounts[1] });
      await voting.revealVote(1, 0, salt, { from: accounts[2] });
      await voting.revealVote(1, 1, salt, { from: accounts[5] });
      await skipBlocks(1);

      const initialChallengerSystemBalance = await treasury.systemBalance.call(accounts[1]);
      const initialListingHolderSystemBalance = await treasury.systemBalance.call(accounts[0]);
      const initialListingHolderCurrentBalance = await treasury.currentBalance.call(accounts[0]);

      await validatorRegistryProxy.claimWinnings(1, { from: accounts[5] }).should.eventually.be.fulfilled;

      const finalChallengerSystemBalance = await treasury.systemBalance.call(accounts[1]);
      const finalListingHolderSystemBalance = await treasury.systemBalance.call(accounts[0]);
      const finalListingHolderCurrentBalance = await treasury.currentBalance.call(accounts[0]);

      initialChallengerSystemBalance.sub(finalChallengerSystemBalance).toString().should.eq(minimumBalance);
      finalListingHolderSystemBalance.sub(initialListingHolderSystemBalance).toString().should.eq(toStakeholderCut(minimumBalance));
      finalListingHolderCurrentBalance.sub(initialListingHolderCurrentBalance).toString().should.eq(web3.utils.toBN(toStakeholderCut(minimumBalance)).add(web3.utils.toBN(oneEther)).toString());

    });

    it('should fail if the challenge has not ended', async () => {
      await prepareTokens(accounts[1], fiveEther);
      await prepareTokens(accounts[2], fiveEther);
      await prepareTokens(accounts[5], fiveEther);
      await validatorRegistryProxy.confirmListing(tendermintPublicKey);
      await validatorRegistryProxy.initExit(tendermintPublicKey);
      await validatorRegistryProxy.challengeListing(tendermintPublicKey, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[1] });
      await voting.commitVote(1, secret0, fiveEther, { from: accounts[2] });
      await voting.commitVote(1, secret1, fiveEther, { from: accounts[5] });
      await skipBlocks(1);
      await voting.revealVote(1, 0, salt, { from: accounts[1] });
      await voting.revealVote(1, 0, salt, { from: accounts[2] });
      await voting.revealVote(1, 1, salt, { from: accounts[5] });

      await validatorRegistryProxy.claimWinnings(1, { from: accounts[5] }).should.eventually.be.rejected;
    });
  });

  describe('claimRewards', () => {
    describe('generate', () => {
      const reward = web3.utils.toBN('1000000');
      beforeEach(async () => {
        await kosuToken.transfer(accounts[1], oneEther);
        await kosuToken.approve(treasury.address, oneEther, { from: accounts[1] });
        await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, reward, { from: accounts[1] });
        await skipBlocks(applicationPeriod - 1);
        await validatorRegistryProxy.confirmListing(tendermintPublicKey, { from: accounts[1] });
      });

      it('should reward the user after a reward block', async () => {
        await skipBlocks(rewardPeriod);
        const startingBalance = await kosuToken.balanceOf(accounts[1]);
        await validatorRegistryProxy.claimRewards(tendermintPublicKey);
        const endingBalance = await kosuToken.balanceOf(accounts[1]);
        endingBalance.sub(startingBalance).toString().should.eq(reward.toString())
      });

      it('should reward users for all reward blocks passed', async () => {
        await skipBlocks(rewardPeriod * 10);
        const startingBalance = await kosuToken.balanceOf(accounts[1]);
        await validatorRegistryProxy.claimRewards(tendermintPublicKey);
        const endingBalance = await kosuToken.balanceOf(accounts[1]);
        endingBalance.sub(startingBalance).toString().should.eq(reward.mul(web3.utils.toBN('10')).toString())
      });
    });

    describe('burn', () => {
      const reward = web3.utils.toBN('-1000000');
      it('should touch and remove a listing that is short on tokens.', async () => {
        await kosuToken.transfer(accounts[1], oneEther);
        await kosuToken.approve(treasury.address, oneEther, { from: accounts[1] });
        await treasury.deposit(oneEther, { from: accounts[1] });
        await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, reward, { from: accounts[1] });
        await skipBlocks(applicationPeriod - 1);
        await kosuToken.transfer(accounts[1], '1000000');
        await kosuToken.approve(treasury.address, '1000000', { from: accounts[1] });
        await treasury.deposit('1000000', { from: accounts[1] });
        await validatorRegistryProxy.confirmListing(tendermintPublicKey, { from: accounts[1] });
        await skipBlocks(rewardPeriod);
        await validatorRegistryProxy.claimRewards(tendermintPublicKey);

        const listing = await validatorRegistryProxy.getListing(tendermintPublicKey);
        listing.status.toString().should.eq('0');
      });

      it('should burn into the staked balance', async () => {
        await kosuToken.transfer(accounts[1], oneEther);
        await kosuToken.approve(treasury.address, oneEther, { from: accounts[1] });
        await treasury.deposit(oneEther, { from: accounts[1] });
        await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, reward, { from: accounts[1] });
        await kosuToken.balanceOf(accounts[1]).then(x => x.toString()).should.eventually.eq('0');
        await skipBlocks(applicationPeriod - 1);
        await kosuToken.transfer(accounts[1], '1000000');
        await kosuToken.approve(treasury.address, '1000000', { from: accounts[1] });
        await treasury.deposit('1000000', { from: accounts[1] });
        await validatorRegistryProxy.confirmListing(tendermintPublicKey, { from: accounts[1] });
        await treasury.currentBalance(accounts[1]).then(x => x.toString()).should.eventually.eq('0');
        await treasury.systemBalance(accounts[1]).then(x => x.toString()).should.eventually.eq(oneEther);
        await skipBlocks(rewardPeriod);
        await validatorRegistryProxy.claimRewards(tendermintPublicKey);
        const desiredEndValue = web3.utils.toBN(oneEther).add(reward);
        await treasury.currentBalance(accounts[1]).then(x => x.toString()).should.eventually.eq(desiredEndValue.toString());
      });

      it('should burn up to all the staked balance', async () => {
        const burnFive = web3.utils.toBN(fiveEther).mul(web3.utils.toBN('-1'));
        await kosuToken.transfer(accounts[1], sixEther);
        await kosuToken.approve(treasury.address, sixEther, { from: accounts[1] });
        await treasury.deposit(sixEther, { from: accounts[1] });
        await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, burnFive, { from: accounts[1] });
        await kosuToken.balanceOf(accounts[1]).then(x => x.toString()).should.eventually.eq('0');
        await skipBlocks(applicationPeriod);
        await validatorRegistryProxy.confirmListing(tendermintPublicKey, { from: accounts[1] });
        await treasury.currentBalance(accounts[1]).then(x => x.toString()).should.eventually.eq('0');
        await treasury.systemBalance(accounts[1]).then(x => x.toString()).should.eventually.eq(oneEther);
        await skipBlocks(rewardPeriod);
        await validatorRegistryProxy.claimRewards(tendermintPublicKey);
        await treasury.currentBalance(accounts[1]).then(x => x.toString()).should.eventually.eq('0');
      });

      describe('funded', () => {
        beforeEach(async () => {
          await kosuToken.transfer(accounts[1], fiveEther);
          await kosuToken.approve(treasury.address, fiveEther, { from: accounts[1] });
          await treasury.deposit(fiveEther, { from: accounts[1] });
          await validatorRegistryProxy.registerListing(tendermintPublicKey, oneEther, reward, { from: accounts[1] });
          await skipBlocks(applicationPeriod - 1);
          await validatorRegistryProxy.confirmListing(tendermintPublicKey, { from: accounts[1] });
        });

        it('should burn the users tokens after a reward block', async () => {
          await skipBlocks(rewardPeriod);
          const startingBalance = await treasury.currentBalance(accounts[1]);
          await validatorRegistryProxy.claimRewards(tendermintPublicKey);
          const endingBalance = await treasury.currentBalance(accounts[1]);
          startingBalance.sub(endingBalance).toString().should.eq(reward.mul(web3.utils.toBN('-1')).toString())
        });

        it('should burn users tokens for all reward blocks passed', async () => {
          await skipBlocks(rewardPeriod * 10);
          const startingBalance = await treasury.currentBalance(accounts[1]);
          await validatorRegistryProxy.claimRewards(tendermintPublicKey);
          const endingBalance = await treasury.currentBalance(accounts[1]);
          startingBalance.sub(endingBalance).toString().should.eq(reward.mul(web3.utils.toBN('-10')).toString())
        });
      });
    });
  });

  describe('ValidatorRegistryUpdate', () => {
    beforeEach(prepareListing);

    it('should emit event when listing is confirmed', async () => {

      const result = await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.fulfilled;
      assertEmitterEvents(result, 0, (decoded) => (
          decoded.eventType === 'ValidatorRegistryUpdate' &&
          decoded.tendermintPublicKey === base64Key &&
          decoded.owner === accounts[0].toLowerCase() &&
          decoded.stake === oneEther
      ));
    });

    it('should emit event when stake is removed', async () => {
      await validatorRegistryProxy.confirmListing(tendermintPublicKey).should.eventually.be.fulfilled;


      const result = await validatorRegistryProxy.initExit(tendermintPublicKey);
      assertEmitterEvents(result, 0, (decoded) => (
          decoded.eventType === 'ValidatorRegistryUpdate' &&
          decoded.tendermintPublicKey === base64Key &&
          decoded.owner === accounts[0].toLowerCase() &&
          decoded.stake === '0'
      ));
    });
  });
});