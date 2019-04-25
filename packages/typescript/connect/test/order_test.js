describe('Order', () => {
  let maker, taker, order, orderGateway, bank, Signature;

  before(async () => {
    Signature = kosuConnect.Signature;
    Order = kosuConnect.Order;
    orderGateway = kosuConnect.orderGateway;

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

    order = new kosuConnect.Order({ subContract, maker: maker, makerArguments, takerArguments, makerValues });
    await order.make();
  });

  it('should have token balances and allowances setup for the following test', async () => {
    assert.isAbove(parseInt(await tka.balanceOf(maker)), 3000);
    assert.isAbove(parseInt(await tka.allowance(maker, subContract)), 3000);
    assert.isAbove(parseInt(await tkb.balanceOf(taker)), 3000);
    assert.isAbove(parseInt(await tkb.allowance(taker, subContract)), 3000);
  });

  describe('constructor()', () => {
    it("receives an array of args to send to the OrderGateway", () => {
      assert.equal(order.makerValues.signer, maker);
      assert.equal(order.makerValues.signerTokenCount, 1000);
      assert.equal(order.makerValues.buyerTokenCount, 1000);
    });

    it("receives an array of data types", async () => {
      let makerArguments = order.makerArguments;
      if(typeof makerArguments !== 'string') makerArguments = JSON.stringify(makerArguments);
      assert.equal(makerArguments, await orderGateway.makerArguments(subContract)); //TODO: update
    });

    it("receives a SubContract address", () => {
      assert.equal(order.subContract, subContract);
    });

    it('should throw for bad subContract address', async () => {
      (() => new kosuConnect.Order({ subContract: '0x0', makerValues: { a: 'a' }})).should.throw();
    });
  });

  describe('make()', () => {
    it("signs the order details and stores the vrs", async () => {
      let makerArguments = await orderGateway.makerArguments(subContract);
      let makerValues = {
        signer: maker,
        signerToken: TKA,
        signerTokenCount: 1000,
        buyer: taker,
        buyerToken: TKB,
        buyerTokenCount: 1000
      };
      let o2 = new Order({ subContract, maker: maker, makerArguments, makerValues });
      await o2.make();

      let signature = { v: o2.makerValues.signatureV, r: o2.makerValues.signatureR, s: o2.makerValues.signatureS }
      let recoveredAddress = Signature.recoverAddress(o2.makerHex(), signature);

      assert.equal(recoveredAddress, maker);
    });
  });

  describe('take()', () => {
    it("posts the order to the OrderGateway", async () => {
      const initialTKABalance = await tka.balanceOf(taker);
      const initialTKBBalance = await tkb.balanceOf(maker);
      const takerValues = {
        tokensToBuy: 100
      };

      await order.take(taker, takerValues);


      const resultTKABalance = web3.utils.toBN(await tka.balanceOf(taker)).sub(web3.utils.toBN(initialTKABalance));
      const resultTKBBalance = web3.utils.toBN(await tkb.balanceOf(maker)).sub(web3.utils.toBN(initialTKBBalance));

      assert.equal(resultTKABalance, '100', 'TKA');
      assert.equal(resultTKBBalance, '100', 'TKB');
    });
  });

  describe('recoverMaker()', () => {
    it('should result the maker', () => {
      order.recoverMaker().should.eq(maker);
    });

    it("recovers the maker address from the JSON used to initalize it", () => {
      const json = order.toJSON();
      const newOrder = new Order(json);
      newOrder.recoverMaker().should.eq(maker);
    });
  });

  describe('prepareForPost()', () => {
    it('should sign the order adding a posterSignature', async () => {
      if (order.posterSignature !== undefined) delete order.posterSignature;
      await order.prepareForPost(accounts[6]);

      order.recoverPoster().should.eq(accounts[6].toLowerCase());
    });
  });

  describe('recoverPoster()', () => {
    it('returns the maker address if not signed by poster', async () => {
      await order.prepareForPost();

      order.recoverPoster().should.eq(maker);
    });

    it('returns the poster address', async () => {
      await order.prepareForPost(accounts[5]);

      order.recoverPoster().should.eq(accounts[5].toLowerCase());
    });

    it('should change returned address for modified order', async () => {
      const testOrder = new Order(order.toJSON());
      await testOrder.prepareForPost(accounts[5]);

      testOrder.makerValues.buyerToken = accounts[4];

      testOrder.recoverPoster().should.not.eq(accounts[5]);
    });
  });

  describe('toJSON()', () => {
    it("converts the order to JSON", async () => {
      assert.equal(typeof JSON.stringify(order), 'string');
    });

    it('should have the required keys', () => {
      order.toJSON().should.contain.keys('subContract', 'maker', 'makerArguments', 'takerArguments', 'makerValues');
    })
  });

  describe('validateStake()', () => {
    it("NYI -- verifies the stake of the maker (or poster)");
  });

  describe('serialize()', () => {
    it('WRITE TESTS');
  });

  describe('checkDataTypes', () => {
    it('should pull data types if they are missing')
  });
});
