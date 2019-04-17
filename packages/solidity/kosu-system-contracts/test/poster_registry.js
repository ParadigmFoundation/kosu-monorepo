const PosterRegistryProxy = artifacts.require("./PosterRegistryProxy.sol");
const PosterRegistry = artifacts.require("./PosterRegistry.sol");
const Token = artifacts.require("./IERC20.sol");
const Treasury = artifacts.require('./Treasury.sol');
const AuthorizedAddresses = artifacts.require('./AuthorizedAddresses.sol');

contract('PosterRegistry', async (accounts) => {
  let posterRegistryProxy, posterRegistry, token, treasury, auth;
  before(async () => {
    posterRegistryProxy = await PosterRegistryProxy.deployed();
    posterRegistry = await PosterRegistry.deployed();
    token = await Token.at(await posterRegistryProxy.token());
    treasury = await Treasury.deployed();
    auth = await AuthorizedAddresses.deployed();
  });

  describe('registerTokens', () => {
    it('should require a balance greater or equal to the amount registered', async () => {
      const value = web3.utils.toWei('50');
      const from = accounts[1];

      await token.balanceOf.call(from).then(x => x.toString()).should.eventually.eq('0');
      await posterRegistryProxy.registerTokens(value, { from }).should.eventually.be.rejected;
    });

    it('should require an approval greater or equal to the amount registered', async () => {
      const value = web3.utils.toWei('50');
      const from = accounts[0];

      await token.balanceOf.call(from).then(x => x.toString()).then(parseInt)
        .should.eventually.gt(parseInt(value));
      await token.approve(treasury.address, '0').should.eventually.be.fulfilled;
      await token.allowance.call(from, treasury.address).then(x => x.toString())
          .should.eventually.eq('0');
      await posterRegistryProxy.registerTokens(value).should.eventually.be.rejected;
    });

    it('should increase tokensContributed and tokensRegisteredFor by the amount', async () => {
      const value = web3.utils.toWei('50');
      const double = web3.utils.toWei('100');
      const from = accounts[0];

      await token.approve(treasury.address, value);
      await posterRegistryProxy.registerTokens(value);

      await posterRegistryProxy.tokensRegisteredFor.call(from).then(x => x.toString()).should.eventually.eq(value);
      await posterRegistryProxy.tokensContributed.call().then(x => x.toString()).should.eventually.eq(value);

      await token.approve(treasury.address, value);
      await posterRegistryProxy.registerTokens(value);

      await posterRegistryProxy.tokensRegisteredFor.call(from).then(x => x.toString()).should.eventually.eq(double);
      await posterRegistryProxy.tokensContributed.call().then(x => x.toString()).should.eventually.eq(double);
    });
  });

  describe('releaseTokens', () => {
    it('should not allow you to reduce balance below 0', async () => {
      const amount = web3.utils.toWei('1');
      const from = accounts[0];

      await posterRegistryProxy.tokensRegisteredFor.call(from).then(x => x.toString()).should.eventually.eq('0');

      await posterRegistryProxy.releaseTokens(amount).should.eventually.be.rejected;
    });

    it('should reduce balance and total by the amount', async () => {
      const value = web3.utils.toWei('50');
      const double = web3.utils.toWei('100');
      const from = accounts[0];

      await token.approve(treasury.address, double);
      await posterRegistryProxy.registerTokens(double);

      await posterRegistryProxy.tokensRegisteredFor.call(from).then(x => x.toString()).should.eventually.eq(double);
      await posterRegistryProxy.tokensContributed.call().then(x => x.toString()).should.eventually.eq(double);

      await posterRegistryProxy.releaseTokens(value, { from });

      await posterRegistryProxy.tokensRegisteredFor.call(from).then(x => x.toString()).should.eventually.eq(value);
      await posterRegistryProxy.tokensContributed.call().then(x => x.toString()).should.eventually.eq(value);
    });

    it('should return the tokens to the user\'s treasury currentBalance', async () => {
      const value = web3.utils.toWei('50');
      const from = accounts[0];

      await token.approve(treasury.address, value);
      await posterRegistryProxy.registerTokens(value);

      const initialBalance = await treasury.currentBalance.call(from);

      await posterRegistryProxy.releaseTokens(value);

      const afterBalance = await treasury.currentBalance.call(from);

      afterBalance.sub(initialBalance).toString().should.eq(value);
    });
  });

  describe('token', () => {
    it('should have a token token configured', async () => {
      posterRegistryProxy.token.call().should.eventually.eq(token.address);
    });
  });

  describe('tokensRegisteredFor', () => {
    it('should return the current registered tokens for user', async () => {
      const value = web3.utils.toWei('50');
      const from = accounts[0];

      await token.approve(treasury.address, value, { from });
      await posterRegistryProxy.registerTokens(value, { from });

      await posterRegistryProxy.tokensRegisteredFor.call(from).then(x => x.toString())
        .should.eventually.eq(value);
    });
  });

  describe('tokensContributed', () => {
    it('should report tokensContributed', async () => {
      const value = web3.utils.toWei('50');

      await token.approve(treasury.address, value);
      await posterRegistryProxy.registerTokens(value);

      await posterRegistryProxy.tokensContributed.call().then(x => x.toString()).should.eventually.eq(value);
    });

    it('should match tokens possessed by contract', async () => {
      const value = web3.utils.toWei('50');

      await token.approve(treasury.address, value);
      await posterRegistryProxy.registerTokens(value);

      await posterRegistryProxy.tokensContributed.call().then(x => x.toString()).should.eventually.eq(value);
      await token.balanceOf.call(posterRegistry.address).then(x => x.toString()).should.eventually.eq(value);
    });
  });

  describe('PosterRegistryUpdate', () => {
    it('should emit event when tokens are registered', async () => {
      const value = web3.utils.toWei('50');
      const from = accounts[0];

      await token.approve(treasury.address, value);
      const result = await posterRegistryProxy.registerTokens(value);
      assertEmitterEvents(result, 3, (decoded) => (
          decoded.eventType === 'PosterRegistryUpdate' &&
          decoded.poster === from.toLowerCase() &&
          decoded.stake === value
      ));
    });

    it('should emit event when tokens are released', async () => {
      const value = web3.utils.toWei('50');
      const from = accounts[0];

      await token.approve(treasury.address, value);
      await posterRegistryProxy.registerTokens(value);

      const result = await posterRegistryProxy.releaseTokens(value);
      assertEmitterEvents(result, 3, (decoded) => (
          decoded.eventType === 'PosterRegistryUpdate' &&
          decoded.poster === from.toLowerCase() &&
          decoded.stake === '0'
      ));
    });
  });
});
