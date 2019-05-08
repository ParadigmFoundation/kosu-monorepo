import { BigNumber } from "@0x/utils";
import { toBN, toWei } from "web3-utils";

import {
  AuthorizedAddressesContract,
  decodeKosuEvents,
  KosuTokenContract,
  PosterRegistryContract,
  PosterRegistryProxyContract,
  TreasuryContract,
} from "../src";

describe("PosterRegistry", async () => {
  let posterRegistryProxy: PosterRegistryProxyContract;
  let posterRegistry: PosterRegistryContract;
  let token: KosuTokenContract;
  let treasury: TreasuryContract;
  let auth: AuthorizedAddressesContract;

  const cleanupUser = async (from: string): Promise<void> => {
    await posterRegistryProxy.releaseTokens.sendTransactionAsync(await posterRegistryProxy.tokensRegisteredFor.callAsync(from));
  };

  before(() => {
    posterRegistryProxy = contracts.posterRegistryProxy;
    posterRegistry = contracts.posterRegistryImpl;
    token = contracts.kosuToken;
    treasury = contracts.treasury;
    auth = contracts.authorizedAddresses;
  });

  describe("registerTokens", () => {
    it("should require a balance greater or equal to the amount registered", async () => {
      const value = toWei("50");
      const from = accounts[1];

      await token.balanceOf.callAsync(from).then(x => x.toString()).should.eventually.eq("0");
      await posterRegistryProxy.registerTokens.sendTransactionAsync(value, { from }).should.eventually.be.rejected;
    });

    it("should require an approval greater or equal to the amount registered", async () => {
      const value = toWei("50");
      const from = accounts[0];

      await token.balanceOf.callAsync(from).then(x => x.toString()).then(parseInt)
        .should.eventually.gt(parseInt(value));
      await token.approve.sendTransactionAsync(treasury.address, toBN("0")).should.eventually.be.fulfilled;
      await token.allowance.callAsync(from, treasury.address).then(x => x.toString())
          .should.eventually.eq("0");
      await posterRegistryProxy.registerTokens.sendTransactionAsync(value).should.eventually.be.rejected;
    });

    it("should increase tokensContributed and tokensRegisteredFor by the amount", async () => {
      const value = toWei("50");
      const double = toWei("100");
      const from = accounts[0];

      await token.approve.sendTransactionAsync(treasury.address, value);
      await posterRegistryProxy.registerTokens.sendTransactionAsync(value);

      await posterRegistryProxy.tokensRegisteredFor.callAsync(from).then(x => x.toString()).should.eventually.eq(value);
      await posterRegistryProxy.tokensContributed.callAsync().then(x => x.toString()).should.eventually.eq(value);

      await token.approve.sendTransactionAsync(treasury.address, value);
      await posterRegistryProxy.registerTokens.sendTransactionAsync(value);

      await posterRegistryProxy.tokensRegisteredFor.callAsync(from).then(x => x.toString()).should.eventually.eq(double);
      await posterRegistryProxy.tokensContributed.callAsync().then(x => x.toString()).should.eventually.eq(double);
    });
  });

  describe("releaseTokens", () => {
    it("should not allow you to reduce balance below 0", async () => {
      const amount = toWei("1");
      const from = accounts[0];

      await cleanupUser(from);

      await posterRegistryProxy.tokensRegisteredFor.callAsync(from).then(x => x.toString()).should.eventually.eq("0");

      await posterRegistryProxy.releaseTokens.sendTransactionAsync(amount).should.eventually.be.rejected;
    });

    it("should reduce balance and total by the amount", async () => {
      const value = toWei("50");
      const double = toWei("100");
      const from = accounts[0];

      await token.approve.sendTransactionAsync(treasury.address, double);
      await posterRegistryProxy.registerTokens.sendTransactionAsync(double);

      await posterRegistryProxy.tokensRegisteredFor.callAsync(from).then(x => x.toString()).should.eventually.eq(double);
      await posterRegistryProxy.tokensContributed.callAsync().then(x => x.toString()).should.eventually.eq(double);

      await posterRegistryProxy.releaseTokens.sendTransactionAsync(value, { from });

      await posterRegistryProxy.tokensRegisteredFor.callAsync(from).then(x => x.toString()).should.eventually.eq(value);
      await posterRegistryProxy.tokensContributed.callAsync().then(x => x.toString()).should.eventually.eq(value);
    });

    it("should return the tokens to the user's treasury currentBalance", async () => {
      const value = toWei("50");
      const from = accounts[0];

      await token.approve.sendTransactionAsync(treasury.address, value);
      await posterRegistryProxy.registerTokens.sendTransactionAsync(value);

      const initialBalance = await treasury.currentBalance.callAsync(from);

      await posterRegistryProxy.releaseTokens.sendTransactionAsync(value);

      const afterBalance: BigNumber = await treasury.currentBalance.callAsync(from);

      afterBalance.minus(initialBalance).toString().should.eq(value);
    });
  });

  describe("token", () => {
    it("should have a token token configured", async () => {
      posterRegistryProxy.token.callAsync().should.eventually.eq(token.address);
    });
  });

  describe("tokensRegisteredFor", () => {
    it("should return the current registered tokens for user", async () => {
      const value = toWei("50");
      const from = accounts[0];

      await cleanupUser(from);

      await token.approve.sendTransactionAsync(treasury.address, value, { from });
      await posterRegistryProxy.registerTokens.sendTransactionAsync(value, { from });

      await posterRegistryProxy.tokensRegisteredFor.callAsync(from).then(x => x.toString())
        .should.eventually.eq(value);
    });
  });

  describe("tokensContributed", () => {
    it("should report tokensContributed", async () => {
      const value = toWei("50");
      const from = accounts[0];

      await cleanupUser(from);

      await token.approve.sendTransactionAsync(treasury.address, value);
      await posterRegistryProxy.registerTokens.sendTransactionAsync(value);

      await posterRegistryProxy.tokensContributed.callAsync().then(x => x.toString()).should.eventually.eq(value);
    });

    it("should match tokens possessed by contract", async () => {
      const value = toWei("50");
      const from = accounts[0];

      await cleanupUser(from);

      await token.approve.sendTransactionAsync(treasury.address, value);
      await posterRegistryProxy.registerTokens.sendTransactionAsync(value);

      await posterRegistryProxy.tokensContributed.callAsync().then(x => x.toString()).should.eventually.eq(value);
      await token.balanceOf.callAsync(posterRegistry.address).then(x => x.toString()).should.eventually.eq(value);
    });
  });

  describe("PosterRegistryUpdate", () => {
    it("should emit event when tokens are registered", async () => {
      const value = toWei("50");
      const from = accounts[0];

      await cleanupUser(from);

      await token.approve.sendTransactionAsync(treasury.address, value);
      const result = await posterRegistryProxy.registerTokens.sendTransactionAsync(value).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
      const decodedLogs = decodeKosuEvents(result.logs)[0];

      decodedLogs.eventType.should.eq("PosterRegistryUpdate");
      decodedLogs.poster.should.eq(from.toLowerCase());
      decodedLogs.stake.should.eq(value);
    });

    it("should emit event when tokens are released", async () => {
      const value = toWei("50");
      const from = accounts[0];

      await cleanupUser(from);

      await token.approve.sendTransactionAsync(treasury.address, value);
      await posterRegistryProxy.registerTokens.sendTransactionAsync(value);

      const result = await posterRegistryProxy.releaseTokens.sendTransactionAsync(value).then(txHash => web3Wrapper.awaitTransactionSuccessAsync(txHash));
      const decodedLogs = decodeKosuEvents(result.logs)[0];

      decodedLogs.eventType.should.eq("PosterRegistryUpdate");
      decodedLogs.poster.should.eq(from.toLowerCase());
      decodedLogs.stake.should.eq("0");
    });
  });
});
