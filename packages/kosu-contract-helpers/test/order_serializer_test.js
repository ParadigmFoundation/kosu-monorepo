const NULL_ADDRESS = require("../src/utils").NULL_ADDRESS;
const { OrderSerializer } = require("../src/OrderSerializer");

describe("OrderSerializer", () => {
    it("should generate the same poster hex with and without takerArguments", async () => {
        const orderGateway = kosu.orderGateway;
        const orderHelper = kosu.orderHelper;

        maker = accounts[7].toLowerCase();
        taker = accounts[8].toLowerCase();
        let args = await orderGateway.arguments(basicTradeSubContract.address);

        await tka.approve(basicTradeSubContract.address, MAX_UINT, maker);
        await tkb.approve(basicTradeSubContract.address, MAX_UINT, taker);

        let makerValues = {
            signer: maker,
            signerToken: TKA,
            signerTokenCount: 1000,
            buyer: taker,
            buyerToken: TKB,
            buyerTokenCount: 1000,
        };

        order = { subContract: basicTradeSubContract.address, maker: maker, arguments: args, makerValues };

        const takerValues = {
            tokensToBuy: 100,
        };
        order.takerValues = takerValues;
        await orderHelper.makeOrder(order);

        const hexWithTakerArgs = OrderSerializer.posterSignatureHex(order, order.arguments);
        order.takerValues.should.not.be.undefined;
        delete order.takerValues;
        const hexWithoutTakerArgs = OrderSerializer.posterSignatureHex(order, order.arguments);
        hexWithTakerArgs.should.eq(hexWithoutTakerArgs);
    });

    it("should generate and validate an test order with each datatype", async () => {
        const order = {
            makerValues: {
                testAddress: signatureValidatorSubContract.address,
                testUint: 1,
                testInt: -1,
                twoBytes: "0x1122",
                fiveBytes: "0xaabbccddee",
            },
            subContract: signatureValidatorSubContract.address,
        };
        await kosu.orderHelper.makeOrder(order);

        await kosu.orderGateway.isValid(order).should.eventually.eq(true);
    });
});
