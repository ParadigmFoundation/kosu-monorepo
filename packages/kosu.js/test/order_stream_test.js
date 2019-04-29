describe('OrderStream', async () => {
  let maker, taker, order, orderGateway, orderStream, Signature;

  before(async () => {
    Signature = kosu.Signature;
    Order = kosu.Order;
    orderGateway = kosu.orderGateway;
    orderStream = kosu.orderStream;

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

    order = new kosu.Order({ subContract, maker, makerArguments, takerArguments, makerValues });
    await order.make();
  });

  /*
  it('should post to the OS', async () => {
    await order.prepareForPost(maker);
    await orderStream.add(order).should.eventually.be.fulfilled;
  });
  */

});
