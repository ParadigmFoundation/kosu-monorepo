import { EventEmitter, PosterRegistry, Treasury } from "../src";

describe("EventEmitter", () => {
    let treasury: Treasury;
    let posterRegistry: PosterRegistry;
    let eventEmitter: EventEmitter;

    before(() => {
        treasury = new Treasury(enhancementOptions);
        posterRegistry = new PosterRegistry(enhancementOptions, treasury);
        eventEmitter = new EventEmitter(enhancementOptions);
    });

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
            await posterRegistry.pay(TestValues.oneWei);
            const logs = await eventEmitter.getPastDecodedLogs({ fromBlock });
            logs.length.should.eq(1);
            logs[0].decodedArgs.eventType.should.eq("PosterRegistryUpdate");

            const tokens = await posterRegistry.tokensRegisteredFor(accounts[0]);
            await posterRegistry.releaseTokens(tokens);
            await treasury.withdraw(tokens);
        });
    });

    describe("getFutureDecodedLogs", () => {
        it("should call the callback with a log", async () => {
            let interval;
            await new Promise(async resolve => {
                const callback = logs => {
                    // tslint:disable-next-line:no-unused-expression
                    logs.should.not.be.empty;
                    resolve();
                };

                interval = eventEmitter.getFutureDecodedLogs((await web3Wrapper.getBlockNumberAsync()) - 1, callback);

                await posterRegistry.pay(TestValues.oneWei).catch(e => {
                    clearInterval(interval);
                    throw e;
                });

                const tokens = await posterRegistry.tokensRegisteredFor(accounts[0]);
                await posterRegistry.releaseTokens(tokens);
                await treasury.withdraw(tokens);
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
