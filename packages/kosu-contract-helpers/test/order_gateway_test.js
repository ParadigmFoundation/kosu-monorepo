const { OrderGateway } = require("@kosu/wrapper-enhancements");
const DeployedAddresses = require("@kosu/migrations").DeployedAddresses;

describe("OrderGateway", () => {
    let orderGateway, maker, taker, order, subContract;

    before(async () => {
        subContract = basicTradeSubContract.address;
        orderGateway = kosu.orderGateway;

        maker = accounts[7].toLowerCase();
        taker = accounts[8].toLowerCase();
        let args = await orderGateway.arguments(subContract);

        await tka.approve(subContract, MAX_UINT, maker);
        await tkb.approve(subContract, MAX_UINT, taker);

        let makerValues = {
            signer: maker,
            signerToken: TKA,
            signerTokenCount: 1000,
            buyer: taker,
            buyerToken: TKB,
            buyerTokenCount: 1000,
        };

        order = { subContract, maker: maker, arguments: args, makerValues };
        await kosu.orderHelper.makeOrder(order);
    });

    describe("isValid", () => {
        it("should return true for a valid order", async () => {
            await orderGateway
                .isValid(order.subContract, await kosu.orderHelper.serialize(order))
                .should.eventually.equal(true);
        });
    });

    describe("participate()", () => {
        it("should participate in a fully constructed Order.", async () => {
            order.takerValues = { tokensToBuy: 500 };
            await orderGateway.participate(order.subContract, await kosu.orderHelper.serialize(order), taker);

            await tka
                .balanceOf(taker)
                .then(v => v.toString())
                .should.eventually.eq("500");
            await tkb
                .balanceOf(maker)
                .then(v => v.toString())
                .should.eventually.eq("500");
        });
    });

    describe("amountRemaining", () => {
        it("should return true for a valid order", async () => {
            await orderGateway.amountRemaining(order.subContract, await kosu.orderHelper.serialize(order)).then(val => {
                val.eq(500).should.be.true;
            });
        });
    });

    describe("arguments()", () => {
        it("should get the arguments of a SubContract", async () => {
            const args = await orderGateway.arguments(subContract);
            assert.doesNotThrow(() => {
                JSON.stringify(args);
            });
        });

        it("should throw an error on invalid subContract", async () => {
            await orderGateway
                .arguments(accounts[0])
                .should.eventually.be.rejectedWith("Unable to load arguments from contract");
        });
    });

    describe("constructor()", () => {
        it("should not deploy a new contract if configuration doesn't point to a network with a deployed contract.", async () => {
            await orderGateway.initializing;

            (async () => {
                const gw = new OrderGateway({ web3, networkId: 123 });
                await gw.initializing;
            })().should.eventually.be.rejected;
        });

        it("should select an existing contract if the core has been deployed to the network.", async () => {
            await orderGateway.initializing;
            const deployedAddress = orderGateway.address;

            const testOrderGateway = new OrderGateway({ web3, web3Wrapper, networkId: 3 });
            await testOrderGateway.initializing;

            deployedAddress.should.not.equal(testOrderGateway.address);
            testOrderGateway.address.should.equal(DeployedAddresses[3].OrderGateway.contractAddress);
        });

        it("should select an existing contract if the options provide address.", async () => {
            await orderGateway.initializing;
            const deployedAddress = orderGateway.address;

            const testOrderGateway = new OrderGateway({ web3, web3Wrapper, orderGatewayAddress: deployedAddress });
            await testOrderGateway.initializing;

            deployedAddress.should.equal(testOrderGateway.address);
        });
    });
});
