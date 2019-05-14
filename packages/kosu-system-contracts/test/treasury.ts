import { toBN } from "web3-utils";

import {AuthorizedAddressesContract, KosuTokenContract, TreasuryContract} from "../src";

describe("Treasury", async () => {
  let treasury: TreasuryContract;
  let kosuToken: KosuTokenContract;
  let auth: AuthorizedAddressesContract;

  before(async () => {
    treasury = contracts.treasury;
    kosuToken = contracts.kosuToken;
    auth = contracts.authorizedAddresses;

    // Account 5 is the executor
    await auth.authorizeAddress.sendTransactionAsync(accounts[5]);

    // Account 1 holds 100 kosu, 50 approved
    await kosuToken.transfer.sendTransactionAsync(accounts[1], testValues.oneHundredWei);
    await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.fiftyWei, { from: accounts[1] });

    // Account 2 holds 100 kosu, 50 approved
    await kosuToken.transfer.sendTransactionAsync(accounts[2], testValues.oneHundredWei);
    await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.fiftyWei, { from: accounts[2] });

    // Account 3 has 100 kosu
    await kosuToken.transfer.sendTransactionAsync(accounts[3], testValues.oneHundredWei);
    await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.oneHundredWei, { from: accounts[3] });
  });

  beforeEach(async () => {
    // Account 5 is the executor
    await auth.authorizeAddress.sendTransactionAsync(accounts[5]);

    // Account 1 holds 100 kosu, 50 approved
    const lockedTokens1 = (await treasury.systemBalance.callAsync(accounts[1])).minus(await treasury.currentBalance.callAsync(accounts[1]));
    await treasury.releaseTokens.sendTransactionAsync(accounts[1], lockedTokens1);
    await treasury.contractWithdraw.sendTransactionAsync(accounts[1], await treasury.currentBalance.callAsync(accounts[1]));
    await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.fiftyWei, { from: accounts[1] });

    // Account 2 holds 100 kosu, 50 approved
    const lockedTokens2 = (await treasury.systemBalance.callAsync(accounts[2])).minus(await treasury.currentBalance.callAsync(accounts[2]));
    await treasury.releaseTokens.sendTransactionAsync(accounts[2], lockedTokens2);
    await treasury.contractWithdraw.sendTransactionAsync(accounts[2], await treasury.currentBalance.callAsync(accounts[2]));
    await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.fiftyWei, { from: accounts[2] });

    // Account 3 has 100 kosu
    const lockedTokens3 = (await treasury.systemBalance.callAsync(accounts[3])).minus(await treasury.currentBalance.callAsync(accounts[3]));
    await treasury.releaseTokens.sendTransactionAsync(accounts[3], lockedTokens3);
    await treasury.contractWithdraw.sendTransactionAsync(accounts[3], await treasury.currentBalance.callAsync(accounts[3]));
    await kosuToken.approve.sendTransactionAsync(treasury.address, testValues.oneHundredWei, { from: accounts[3] });
  });

  describe("deposit", () => {
    it("should be tested");
  });

  describe("withdraw", () => {
    it("should be tested");
  });

  describe("contractDeposit", () => {
    it("should pull tokens from the given accounts and track the balance.", async () => {
      await treasury.contractDeposit.sendTransactionAsync(accounts[1], testValues.fiftyWei, { from: accounts[5] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      await treasury.currentBalance.callAsync(accounts[1]).then(x => x.toString()).should.eventually.eq(testValues.fiftyWei.toString());
    });

    it("should fail on insufficient token approval.", async () => {
        await treasury.contractDeposit.sendTransactionAsync(accounts[1], toBN("51"), { from: accounts[5] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });

    it("should fail on insufficient token balance.", async () => {
      await kosuToken.approve.sendTransactionAsync(treasury.address, toBN("100000"), { from: accounts[1] });
      await treasury.contractDeposit.sendTransactionAsync(accounts[1], toBN("101"), { from: accounts[5] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });
  });

  describe("contractWithdraw", () => {
    it("should reduce the balance by the provided value.", async () => {
      await treasury.contractDeposit.sendTransactionAsync(accounts[3], testValues.oneHundredWei, { from: accounts[5] });
      await treasury.contractWithdraw.sendTransactionAsync(accounts[3], toBN("75"), { from: accounts[5] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;

      await treasury.currentBalance.callAsync(accounts[3]).then(x => x.toString()).should.eventually.eq("25");
    });

    it("should fail on over withdraw.", async () => {
      await treasury.contractWithdraw.sendTransactionAsync(accounts[3], toBN("101"), { from: accounts[5] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });
  });

  describe("claimTokens", () => {
    it("should be tested");
  });

  describe("releaseTokens", () => {
    it("should be tested");
  });

  describe("updateBalance", () => {
    it("should make required changes for balance to end at desired value.", async () => {
      await kosuToken.approve.sendTransactionAsync(treasury.address, toBN("100000"), { from: accounts[3] });
      await treasury.contractDeposit.sendTransactionAsync(accounts[3], testValues.oneHundredWei, { from: accounts[5] });

      await treasury.currentBalance.callAsync(accounts[3]).then(x => x.toString()).should.eventually.eq(testValues.oneHundredWei.toString());

      await treasury.updateBalance.sendTransactionAsync(accounts[3], toBN("73"), { from: accounts[5] });

      await treasury.currentBalance.callAsync(accounts[3]).then(x => x.toString()).should.eventually.eq("73");

      await treasury.updateBalance.sendTransactionAsync(accounts[3], toBN("80"), { from: accounts[5] });

      await treasury.currentBalance.callAsync(accounts[3]).then(x => x.toString()).should.eventually.eq("80");

      await kosuToken.balanceOf.callAsync(accounts[3]).then(x => x.toString()).should.eventually.eq("20");
    });

    it("should fail on insufficient token approval.", async () => {
      await treasury.updateBalance.sendTransactionAsync(accounts[1], toBN("51"), { from: accounts[5] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });

    it("should fail on insufficient token balance.", async () => {
      await kosuToken.approve.sendTransactionAsync(treasury.address, toBN("100000"), { from: accounts[1] });

      await treasury.updateBalance.sendTransactionAsync(accounts[1], toBN("101"), { from: accounts[5] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });
  });

  describe("adjustBalance", () => {
    it("should change the balance by the provided value", async () => {
      await kosuToken.approve.sendTransactionAsync(treasury.address, toBN("100000"), { from: accounts[3] });
      await treasury.contractDeposit.sendTransactionAsync(accounts[3], testValues.oneHundredWei, { from: accounts[5] });
      await treasury.currentBalance.callAsync(accounts[3]).then(x => x.toString()).should.eventually.eq(testValues.oneHundredWei.toString());

      // should handle negative change
      await treasury.adjustBalance.sendTransactionAsync(accounts[3], toBN("-27"), { from: accounts[5] });
      await treasury.currentBalance.callAsync(accounts[3]).then(x => x.toString()).should.eventually.eq("73");

      // should handle 0
      await treasury.adjustBalance.sendTransactionAsync(accounts[3], toBN("0"), { from: accounts[5] });
      await treasury.currentBalance.callAsync(accounts[3]).then(x => x.toString()).should.eventually.eq("73");

      // should handle positive change
      await treasury.adjustBalance.sendTransactionAsync(accounts[3], toBN("7"), { from: accounts[5] });
      await treasury.currentBalance.callAsync(accounts[3]).then(x => x.toString()).should.eventually.eq("80");

      await kosuToken.balanceOf.callAsync(accounts[3]).then(x => x.toString()).should.eventually.eq("20");
    });

    it("should fail on over withdraw.", async () => {
      await treasury.adjustBalance.sendTransactionAsync(accounts[3], toBN("-101"), { from: accounts[5] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });

    it("should fail on insufficient token approval.", async () => {
        await kosuToken.approve.sendTransactionAsync(treasury.address, toBN("0"), { from: accounts[3] });

        await treasury.adjustBalance.sendTransactionAsync(accounts[3], toBN("1"), { from: accounts[5] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });

    it("should fail on insufficient token balance.", async () => {
      await kosuToken.approve.sendTransactionAsync(treasury.address, toBN("100000"), { from: accounts[3] });

      await treasury.adjustBalance.sendTransactionAsync(accounts[3], toBN("101"), { from: accounts[5] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;
    });
  });

  describe("confiscate", () => {
    it("should correctly remove systemBalance from the user");
  });

  describe("award", () => {
    it("should transfer tokens held by the calling address to the recipient and increase its current and system balances");
  });

  describe("currentBalance", () => {
    it("should return the current value of the input token for the provided user", async () => {
      await treasury.currentBalance.callAsync(accounts[3]).then(x => x.toString()).should.eventually.eq("0");
      await treasury.contractDeposit.sendTransactionAsync(accounts[3], testValues.oneHundredWei, { from: accounts[5] });
      await treasury.currentBalance.callAsync(accounts[3]).then(x => x.toString()).should.eventually.eq(testValues.oneHundredWei.toString());
    });
  });

  describe("Authorizeable", () => {
    describe("isAuthorized", () => {
      it("should allow an added account to call protected methods", async () => {
        await auth.unauthorizeAddress.sendTransactionAsync(accounts[6]);

        await treasury.contractDeposit.sendTransactionAsync(accounts[1], testValues.fiftyWei, { from: accounts[6] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.rejected;

        await auth.authorizeAddress.sendTransactionAsync(accounts[6]).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));

        await kosuToken.allowance.callAsync(accounts[1], treasury.address).then(x => x.toString()).should.eventually.eq(testValues.fiftyWei.toString());
        await kosuToken.balanceOf.callAsync(accounts[1]).then(x => x.toString()).should.eventually.eq(testValues.oneHundredWei.toString());
        await treasury.contractDeposit.sendTransactionAsync(accounts[1], testValues.fiftyWei, { from: accounts[6] }).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash)).should.eventually.be.fulfilled;
      });
    });
  });
});
