const Treasury = artifacts.require("./Treasury.sol");
const KosuToken = artifacts.require("./KosuToken.sol");
const AuthorizedAddresses = artifacts.require('./AuthorizedAddresses.sol');

contract('Treasury', async (accounts) => {
  let treasury, digm, auth;
  before(async () => {
    treasury = await Treasury.deployed();
    digm = await KosuToken.deployed();
    auth = await AuthorizedAddresses.deployed();
  });

  beforeEach(async () => {
    //Account 5 is the executer
    await auth.authorizeAddress(accounts[5]);

    //Account 1 holds 100 digm, 50 approved
    await digm.transfer(accounts[1], 100);
    await digm.approve(treasury.address, 50, { from: accounts[1] });

    //Account 2 holds 100 digm, 50 approved
    await digm.transfer(accounts[2], 100);
    await digm.approve(treasury.address, 50, { from: accounts[2] });

    //Account 3 has 100 digm
    await digm.transfer(accounts[3], 100);
    await digm.approve(treasury.address, 100, { from: accounts[3] });
  });

  describe('deposit', () => {
    it('should be tested');
  });

  describe('withdraw', () => {
    it('should be tested');
  });

  describe('contractDeposit', () => {
    it('should pull tokens from the given accounts and track the balance.', async () => {
      await treasury.contractDeposit(accounts[1], 50, { from: accounts[5] }).should.eventually.be.fulfilled;

      await treasury.currentBalance(accounts[1]).then(x => x.toString()).should.eventually.eq('50');
    });

    it('should fail on insufficient token approval.', async () => {
        await treasury.contractDeposit(accounts[1], 51, { from: accounts[5] }).should.eventually.be.rejected;
    });

    it('should fail on insufficient token balance.', async () => {
      await digm.approve(treasury.address, 100000, { from: accounts[1] });
      await treasury.contractDeposit(accounts[1], 101, { from: accounts[5] }).should.eventually.be.rejected;
    });
  });

  describe('contractWithdraw', () => {
    it('should reduce the balance by the provided value.', async () => {
      await treasury.contractDeposit(accounts[3], '100', { from: accounts[5] });
      await treasury.contractWithdraw(accounts[3], 75, { from: accounts[5] }).should.eventually.be.fulfilled;

      await treasury.currentBalance(accounts[3]).then(x => x.toString()).should.eventually.eq('25');
    });

    it('should fail on over withdraw.', async () => {
      await treasury.contractWithdraw(accounts[3], 101, { from: accounts[5] }).should.eventually.be.rejected;
    });
  });

  describe('claimTokens', () => {
    it('should be tested');
  });

  describe('releaseTokens', () => {
    it('should be tested');
  });

  describe('updateBalance', () => {
    it('should make required changes for balance to end at desired value.', async () => {
      await digm.approve(treasury.address, 100000, { from: accounts[3] });
      await treasury.contractDeposit(accounts[3], '100', { from: accounts[5] });

      await treasury.currentBalance(accounts[3]).then(x => x.toString()).should.eventually.eq('100');

      await treasury.updateBalance(accounts[3], 73, { from: accounts[5] });

      await treasury.currentBalance(accounts[3]).then(x => x.toString()).should.eventually.eq('73');

      await treasury.updateBalance(accounts[3], 80, { from: accounts[5] });

      await treasury.currentBalance(accounts[3]).then(x => x.toString()).should.eventually.eq('80');

      await digm.balanceOf(accounts[3]).then(x => x.toString()).should.eventually.eq('20');
    });

    it('should fail on insufficient token approval.', async () => {
      await treasury.updateBalance(accounts[1], 51, { from: accounts[5] }).should.eventually.be.rejected
    });

    it('should fail on insufficient token balance.', async () => {
      await digm.approve(treasury.address, 100000, { from: accounts[1] });

      await treasury.updateBalance(accounts[1], 101, { from: accounts[5] }).should.eventually.be.rejected
    });
  });

  describe('adjustBalance', () => {
    it('should change the balance by the provided value', async () => {
      await digm.approve(treasury.address, 100000, { from: accounts[3] });
      await treasury.contractDeposit(accounts[3], 100, { from: accounts[5] });
      await treasury.currentBalance(accounts[3]).then(x => x.toString()).should.eventually.eq('100');

      //should handle negative change
      await treasury.adjustBalance(accounts[3], -27, { from: accounts[5] });
      await treasury.currentBalance(accounts[3]).then(x => x.toString()).should.eventually.eq('73');

      //should handle 0
      await treasury.adjustBalance(accounts[3], 0, { from: accounts[5] });
      await treasury.currentBalance(accounts[3]).then(x => x.toString()).should.eventually.eq('73');

      //should handle positive change
      await treasury.adjustBalance(accounts[3], 7, { from: accounts[5] });
      await treasury.currentBalance(accounts[3]).then(x => x.toString()).should.eventually.eq('80');

      await digm.balanceOf(accounts[3]).then(x => x.toString()).should.eventually.eq('20');
    });

    it('should fail on over withdraw.', async () => {
      await treasury.adjustBalance(accounts[3], -101, { from: accounts[5] }).should.eventually.be.rejected;
    });

    it('should fail on insufficient token approval.', async () => {
        await digm.approve(treasury.address, 0, { from: accounts[3] });

        await treasury.adjustBalance(accounts[3], 1, { from: accounts[5] }).should.eventually.be.rejected;
    });

    it('should fail on insufficient token balance.', async () => {
      await digm.approve(treasury.address, 100000, { from: accounts[3] });

      await treasury.adjustBalance(accounts[3], 101, { from: accounts[5] }).should.eventually.be.rejected;
    });
  });

  describe('confiscate', () => {
    it('should correctly remove systemBalance from the user');
  });

  describe('award', () => {
    it('should transfer tokens held by the calling address to the recipient and increase its current and system balances')
  });

  describe('currentBalance', () => {
    it('should return the current value of the input token for the provided user', async () => {
      await treasury.currentBalance(accounts[3]).then(x => x.toString()).should.eventually.eq('0');
      await treasury.contractDeposit(accounts[3], '100', { from: accounts[5] });
      await treasury.currentBalance(accounts[3]).then(x => x.toString()).should.eventually.eq('100');
    });
  });

  describe('Authorizeable', () => {
    describe('isAuthorized', () => {
      it('should allow an added account to call protected methods', async () => {
        await treasury.contractDeposit(accounts[1], 50, { from: accounts[6] }).should.eventually.be.rejected;

        await auth.authorizeAddress(accounts[6]);

        await treasury.contractDeposit(accounts[1], 50, { from: accounts[6] }).should.eventually.be.fulfilled;
      });
    });
  });
});
