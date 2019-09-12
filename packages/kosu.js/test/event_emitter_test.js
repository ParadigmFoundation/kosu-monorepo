const { EventEmitter } = require("../src/EventEmitter");

describe("EventEmitter", () => {
    it("should allow constructor to configured with a custom address", async () => {
        await new EventEmitter({ eventEmitterAddress: "fork", web3Wrapper }).getAddress().should.eventually.eq("fork");
    });

    describe("getAddress", () => {
        it("throw when using an unknown network", async () => {
            await new EventEmitter({ web3Wrapper: nullWeb3Wrapper })
                .getAddress()
                .should.eventually.be.rejectedWith("No known Kosu deployment for detected networkId.");
        });
    });

    describe("getPastDecodedLogs", () => {
        it("should return decoded logs", async () => {
            const fromBlock = (await web3Wrapper.getBlockNumberAsync()) + 1;
            await kosu.posterRegistry.pay(TestValues.oneWei);
            const logs = await kosu.eventEmitter.getPastDecodedLogs({ fromBlock });
            logs.length.should.eq(1);
            logs[0].decodedArgs.eventType.should.eq("PosterRegistryUpdate");

            const tokens = await kosu.posterRegistry.tokensRegisteredFor(accounts[0]);
            await kosu.posterRegistry.releaseTokens(tokens);
            await kosu.treasury.withdraw(tokens);
        });
    });

    describe("getFutureDecodedLogs", () => {
        it("should call the callback with a log", async () => {
            let interval;
            await new Promise(async resolve => {
                const callback = logs => {
                    logs.should.not.be.empty;
                    resolve();
                };

                interval = kosu.eventEmitter.getFutureDecodedLogs(
                    (await web3Wrapper.getBlockNumberAsync()) - 1,
                    callback,
                );

                await kosu.posterRegistry.pay(TestValues.oneWei).catch(e => {
                    clearInterval(interval);
                    throw e;
                });

                const tokens = await kosu.posterRegistry.tokensRegisteredFor(accounts[0]);
                await kosu.posterRegistry.releaseTokens(tokens);
                await kosu.treasury.withdraw(tokens);
            })
                .then(() => {
                    clearInterval(interval);
                })
                .catch(() => {
                    clearInterval(interval);
                });
        });
    });
});
