const { EventEmitter } = require("../src/EventEmitter");
const DeployedAddresses = require("@kosu/system-contracts").DeployedAddresses;

describe("EventEmitter", () => {
    it("should allow constructor to configured with a custom address", async () => {
        await new EventEmitter({ eventEmitterAddress: "fork", web3Wrapper }).getAddress().should.eventually.eq("fork");
    });

    describe("getAddress", () => {
        it("should return the configured address.", async () => {
            await new EventEmitter({ web3Wrapper })
                .getAddress()
                .should.eventually.eq(DeployedAddresses["6174"].EventEmitter);
        });

        it("throw when using an unknown network", async () => {
            await new EventEmitter({ web3Wrapper: nullWeb3Wrapper })
                .getAddress()
                .should.eventually.be.rejectedWith("No known Kosu deployment for detected networkId.");
        });
    });

    describe("getPastDecodedLogs", () => {
        it("should return decoded logs", async () => {
            const logs = await kosu.eventEmitter.getPastDecodedLogs({});
            // @todo get some data and validate something is there.
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

                await kosu.posterRegistry.releaseTokens(1).catch(e => {
                    clearInterval(interval);
                    throw e;
                });
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
