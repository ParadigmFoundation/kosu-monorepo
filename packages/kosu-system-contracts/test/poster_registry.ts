import { BigNumber } from "@0x/utils";
import { toBN, toWei } from "web3-utils";

import {
    AuthorizedAddressesContract,
    decodeKosuEvents,
    KosuTokenContract,
    PosterRegistryContract,
    TreasuryContract,
} from "../src";

describe("PosterRegistry", () => {
    let posterRegistry: PosterRegistryContract;
    let token: KosuTokenContract;
    let treasury: TreasuryContract;
    let auth: AuthorizedAddressesContract;

    const cleanupUser = async (from: string): Promise<void> => {
        await posterRegistry.releaseTokens.awaitTransactionSuccessAsync(
            await posterRegistry.tokensRegisteredFor.callAsync(from),
        );
    };

    before(() => {
        posterRegistry = contracts.posterRegistry;
        token = contracts.kosuToken;
        treasury = contracts.treasury;
        auth = contracts.authorizedAddresses;
    });

    after(async () => {
        for (const account of accounts) {
            await posterRegistry.releaseTokens.awaitTransactionSuccessAsync(
                await posterRegistry.tokensRegisteredFor.callAsync(account),
                {
                    from: account,
                },
            );
        }

    });

    describe("registerTokens", () => {
        it("should require a balance greater or equal to the amount registered", async () => {
            const value = toWei("50");
            const from = accounts[1];

            await token.balanceOf
                .callAsync(from)
                .then(x => x.toString())
                .should.eventually.eq("0");
            await posterRegistry.registerTokens.awaitTransactionSuccessAsync(value, { from }).should.eventually.be
                .rejected;
        });

        it("should require an approval greater or equal to the amount registered", async () => {
            const value = toWei("50");
            const from = accounts[0];

            await token.balanceOf
                .callAsync(from)
                .then(x => x.toString())
                .then(parseInt)
                .should.eventually.gt(parseInt(value));
            await token.approve.awaitTransactionSuccessAsync(treasury.address, toBN("0")).should.eventually.be
                .fulfilled;
            await token.allowance
                .callAsync(from, treasury.address)
                .then(x => x.toString())
                .should.eventually.eq("0");
            await posterRegistry.registerTokens.awaitTransactionSuccessAsync(value).should.eventually.be.rejected;
        });

        it("should increase tokensContributed and tokensRegisteredFor by the amount", async () => {
            const value = toWei("50");
            const double = toWei("100");
            const from = accounts[0];

            await token.approve.awaitTransactionSuccessAsync(treasury.address, value);
            await posterRegistry.registerTokens.awaitTransactionSuccessAsync(value);

            await posterRegistry.tokensRegisteredFor
                .callAsync(from)
                .then(x => x.toString())
                .should.eventually.eq(value);
            await posterRegistry.tokensContributed
                .callAsync()
                .then(x => x.toString())
                .should.eventually.eq(value);

            await token.approve.awaitTransactionSuccessAsync(treasury.address, value);
            await posterRegistry.registerTokens.awaitTransactionSuccessAsync(value);

            await posterRegistry.tokensRegisteredFor
                .callAsync(from)
                .then(x => x.toString())
                .should.eventually.eq(double);
            await posterRegistry.tokensContributed
                .callAsync()
                .then(x => x.toString())
                .should.eventually.eq(double);
        });
    });

    describe("releaseTokens", () => {
        it("should not allow you to reduce balance below 0", async () => {
            const amount = toWei("1");
            const from = accounts[0];

            await cleanupUser(from);

            await posterRegistry.tokensRegisteredFor
                .callAsync(from)
                .then(x => x.toString())
                .should.eventually.eq("0");

            await posterRegistry.releaseTokens.awaitTransactionSuccessAsync(amount).should.eventually.be.rejected;
        });

        it("should reduce balance and total by the amount", async () => {
            const value = toWei("50");
            const double = toWei("100");
            const from = accounts[0];

            await token.approve.awaitTransactionSuccessAsync(treasury.address, double);
            await posterRegistry.registerTokens.awaitTransactionSuccessAsync(double);

            await posterRegistry.tokensRegisteredFor
                .callAsync(from)
                .then(x => x.toString())
                .should.eventually.eq(double);
            await posterRegistry.tokensContributed
                .callAsync()
                .then(x => x.toString())
                .should.eventually.eq(double);

            await posterRegistry.releaseTokens.awaitTransactionSuccessAsync(value, { from });

            await posterRegistry.tokensRegisteredFor
                .callAsync(from)
                .then(x => x.toString())
                .should.eventually.eq(value);
            await posterRegistry.tokensContributed
                .callAsync()
                .then(x => x.toString())
                .should.eventually.eq(value);
        });

        it("should return the tokens to the user's treasury currentBalance", async () => {
            const value = toWei("50");
            const from = accounts[0];

            await token.approve.awaitTransactionSuccessAsync(treasury.address, value);
            await posterRegistry.registerTokens.awaitTransactionSuccessAsync(value);

            const initialBalance = await treasury.currentBalance.callAsync(from);

            await posterRegistry.releaseTokens.awaitTransactionSuccessAsync(value);

            const afterBalance: BigNumber = await treasury.currentBalance.callAsync(from);

            afterBalance
                .minus(initialBalance)
                .toString()
                .should.eq(value);
        });
    });

    describe("token", () => {
        it("should have a token token configured", async () => {
            posterRegistry.token.callAsync().should.eventually.eq(token.address);
        });
    });

    describe("tokensRegisteredFor", () => {
        it("should return the current registered tokens for user", async () => {
            const value = toWei("50");
            const from = accounts[0];

            await cleanupUser(from);

            await token.approve.awaitTransactionSuccessAsync(treasury.address, value, { from });
            await posterRegistry.registerTokens.awaitTransactionSuccessAsync(value, { from });

            await posterRegistry.tokensRegisteredFor
                .callAsync(from)
                .then(x => x.toString())
                .should.eventually.eq(value);
        });
    });

    describe("tokensContributed", () => {
        it("should report tokensContributed", async () => {
            const value = toWei("50");
            const from = accounts[0];

            await cleanupUser(from);

            await token.approve.awaitTransactionSuccessAsync(treasury.address, value);
            await posterRegistry.registerTokens.awaitTransactionSuccessAsync(value);

            await posterRegistry.tokensContributed
                .callAsync()
                .then(x => x.toString())
                .should.eventually.eq(value);
        });

        it("should match tokens possessed by contract", async () => {
            const value = toWei("50");
            const from = accounts[0];

            await cleanupUser(from);

            await token.approve.awaitTransactionSuccessAsync(treasury.address, value);
            await posterRegistry.registerTokens.awaitTransactionSuccessAsync(value);

            await posterRegistry.tokensContributed
                .callAsync()
                .then(x => x.toString())
                .should.eventually.eq(value);
            await token.balanceOf
                .callAsync(posterRegistry.address)
                .then(x => x.toString())
                .should.eventually.eq(value);
        });
    });

    describe("PosterRegistryUpdate", () => {
        it("should emit event when tokens are registered", async () => {
            const value = toWei("50");
            const from = accounts[0];

            await cleanupUser(from);

            await token.approve.awaitTransactionSuccessAsync(treasury.address, value);
            const result = await posterRegistry.registerTokens.awaitTransactionSuccessAsync(value);
            const decodedLogs = decodeKosuEvents(result.logs)[0];

            decodedLogs.eventType.should.eq("PosterRegistryUpdate");
            decodedLogs.poster.should.eq(from.toLowerCase());
            decodedLogs.stake.should.eq(value);
        });

        it("should emit event when tokens are released", async () => {
            const value = toWei("50");
            const from = accounts[0];

            await cleanupUser(from);

            await token.approve.awaitTransactionSuccessAsync(treasury.address, value);
            await posterRegistry.registerTokens.awaitTransactionSuccessAsync(value);

            const result = await posterRegistry.releaseTokens.awaitTransactionSuccessAsync(value);
            const decodedLogs = decodeKosuEvents(result.logs)[0];

            decodedLogs.eventType.should.eq("PosterRegistryUpdate");
            decodedLogs.poster.should.eq(from.toLowerCase());
            decodedLogs.stake.should.eq("0");
        });
    });
});
