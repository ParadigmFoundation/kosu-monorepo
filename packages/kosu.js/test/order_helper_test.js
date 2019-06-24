const NULL_ADDRESS = require("../src/utils").NULL_ADDRESS;

describe("OrderHelper", () => {
    let maker, taker, order, orderGateway, orderHelper, Signature, subContract;

    before(async () => {
        subContract = basicTradeSubContract.address;
        Signature = kosu.Signature;
        orderGateway = kosu.orderGateway;
        orderHelper = kosu.orderHelper;

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

    describe("makeOrder()", () => {
        it("signs the order details and stores the signature", async () => {
            let args = await orderGateway.arguments(subContract);
            let makerValues = {
                signer: maker,
                signerToken: TKA,
                signerTokenCount: 1000,
                buyer: taker,
                buyerToken: TKB,
                buyerTokenCount: 1000,
            };
            let o2 = { subContract, maker: maker, arguments: args, makerValues };
            await orderHelper.makeOrder(o2);

            let recoveredAddress = Signature.recoverAddress(await orderHelper.makerHex(o2), o2.makerValues.signature);

            assert.equal(recoveredAddress, maker);
        });
    });

    describe("takeOrder()", () => {
        it("posts the order to the OrderGateway", async () => {
            const initialTKABalance = await tka.balanceOf(taker);
            const initialTKBBalance = await tkb.balanceOf(maker);
            const takerValues = {
                tokensToBuy: 100,
            };
            order.takerValues = takerValues;
            await orderHelper.takeOrder(order, taker);

            const resultTKABalance = BigNumber(await tka.balanceOf(taker)).minus(initialTKABalance);
            const resultTKBBalance = BigNumber(await tkb.balanceOf(maker)).minus(initialTKBBalance);

            assert.equal(resultTKABalance.toString(), "100", "TKA");
            assert.equal(resultTKBBalance.toString(), "100", "TKB");
        });
    });

    describe("recoverMaker()", () => {
        it("should result the maker", async () => {
            (await orderHelper.recoverMaker(order)).should.eq(maker);
        });
    });

    describe("prepareForPost()", () => {
        it("should sign the order adding a posterSignature", async () => {
            if (order.posterSignature !== undefined) delete order.posterSignature;
            const preparedOrder = await orderHelper.prepareForPost(order, accounts[6]);

            (await orderHelper.recoverPoster(preparedOrder)).should.eq(accounts[6].toLowerCase());
        });
    });

    describe("recoverPoster()", () => {
        it("returns the maker address if not signed by poster", async () => {
            const preparedOrder = await orderHelper.prepareForPost(order);

            (await orderHelper.recoverPoster(preparedOrder)).should.eq(maker);
        });

        it("returns the poster address", async () => {
            const preparedOrder = await orderHelper.prepareForPost(order, accounts[5]);

            (await orderHelper.recoverPoster(preparedOrder)).should.eq(accounts[5].toLowerCase());
        });

        it("should change returned address for modified order", async () => {
            const preparedOrder = await orderHelper.prepareForPost(order, accounts[5]);

            preparedOrder.makerValues.buyerToken = accounts[4];

            (await orderHelper.recoverPoster(preparedOrder)).should.not.eq(accounts[5].toLowerCase());
        });
    });

    describe("custom orders", () => {
        it("should sign an order with a bogus subContract and provided makerArguments", async () => {
            const customOrder = {
                subContract: NULL_ADDRESS,
                arguments: { maker: [{ datatype: "address", name: "acc" }, { datatype: "uint", name: "num" }] },
                makerValues: { acc: accounts[9], num: 4 },
            };
            const preparedOrder = await orderHelper.prepareForPost(customOrder, accounts[5]);
            await orderHelper.recoverPoster(preparedOrder).should.eventually.eq(accounts[5].toLowerCase());
        });
    });
});
