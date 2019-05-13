describe("OrderHelper", () => {
    let maker, taker, order, orderGateway, orderHelper, Signature;

    before(async () => {
        Signature = kosu.Signature;
        orderGateway = kosu.orderGateway;
        orderHelper = kosu.orderHelper;

        maker = accounts[7].toLowerCase();
        taker = accounts[8].toLowerCase();
        let makerArguments = await orderGateway.makerArguments(subContract);
        let takerArguments = await orderGateway.takerArguments(subContract);

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

        order = { subContract, maker: maker, makerArguments, takerArguments, makerValues };
        await kosu.orderHelper.makeOrder(order);
    });

    describe("makeOrder()", () => {
        it("signs the order details and stores the vrs", async () => {
            let makerArguments = await orderGateway.makerArguments(subContract);
            let makerValues = {
                signer: maker,
                signerToken: TKA,
                signerTokenCount: 1000,
                buyer: taker,
                buyerToken: TKB,
                buyerTokenCount: 1000,
            };
            let o2 = { subContract, maker: maker, makerArguments, makerValues };
            await orderHelper.makeOrder(o2);

            let signature = {
                v: o2.makerValues.signatureV,
                r: o2.makerValues.signatureR,
                s: o2.makerValues.signatureS,
            };
            let recoveredAddress = Signature.recoverAddress(await orderHelper.makerHex(o2), signature);

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

            await orderHelper.takeOrder(order, takerValues, taker);

            const resultTKABalance = web3.utils
                .toBN(await tka.balanceOf(taker))
                .sub(web3.utils.toBN(initialTKABalance));
            const resultTKBBalance = web3.utils
                .toBN(await tkb.balanceOf(maker))
                .sub(web3.utils.toBN(initialTKBBalance));

            assert.equal(resultTKABalance, "100", "TKA");
            assert.equal(resultTKBBalance, "100", "TKB");
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
});
