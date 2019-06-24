const NULL_ADDRESS = require("../src/utils").NULL_ADDRESS;
const { OrderSerializer } = require("../src/OrderSerializer");

describe("OrderSerializer", () => {
    let maker, taker, order, orderGateway;

    before(async () => {
        subContract = basicTradeSubContract.address;
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

        const takerValues = {
            tokensToBuy: 100,
        };
        order.takerValues = takerValues;
        await orderHelper.makeOrder(order);
    });

    it("should generate the same poster hex with and without takerArguments", async () => {
        const hexWithTakerArgs = OrderSerializer.posterSignatureHex(order, order.arguments);
        order.takerValues.should.not.be.undefined;
        delete order.takerValues;
        const hexWithoutTakerArgs = OrderSerializer.posterSignatureHex(order, order.arguments);
        hexWithTakerArgs.should.eq(hexWithoutTakerArgs);
    });
});
