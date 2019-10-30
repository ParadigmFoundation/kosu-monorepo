// import { DeployedAddresses } from "@kosu/migrations";
// import { deployTestToken, kosuSubContractHelper } from "@kosu/test-helpers/dist/src";
// import { MAX_UINT } from "@kosu/utils";
//
// import { OrderGateway } from "../src";
//
// describe("OrderGateway", () => {
//     let orderGateway;
//     let maker;
//     let taker;
//     let order;
//     let tka;
//     let TKA;
//     let tkb;
//     let TKB;
//     let subContract;
//
//     before(async () => {
//         const { signatureValidatorSubContract, basicTradeSubContract } = await kosuSubContractHelper(web3Wrapper);
//
//         const tokenA = await deployTestToken(web3Wrapper, "Token A", "TKA", { from: accounts[7] });
//         const tokenB = await deployTestToken(web3Wrapper, "Token B", "TKB", { from: accounts[8] });
//
//         tka = tokenA.easyToken;
//         tkb = tokenB.easyToken;
//         TKA = tokenA.testToken.address;
//         TKB = tokenB.testToken.address;
//
//         subContract = basicTradeSubContract.address;
//         orderGateway = new OrderGateway(enhancementOptions);
//
//         maker = accounts[7].toLowerCase();
//         taker = accounts[8].toLowerCase();
//         const args = await orderGateway.arguments(subContract);
//
//         await tka.approve(subContract, MAX_UINT, maker);
//         await tkb.approve(subContract, MAX_UINT, taker);
//
//         const makerValues = {
//             signer: maker,
//             signerToken: TKA,
//             signerTokenCount: 1000,
//             buyer: taker,
//             buyerToken: TKB,
//             buyerTokenCount: 1000,
//         };
//
//         order = { subContract, maker, arguments: args, makerValues };
//         await orderHelper.makeOrder(order);
//     });
//
//     describe("isValid", () => {
//         it("should return true for a valid order", async () => {
//             await orderGateway.isValid(order).should.eventually.equal(true);
//         });
//     });
//
//     describe("participate()", () => {
//         it("should participate in a fully constructed Order.", async () => {
//             order.takerValues = { tokensToBuy: 500 };
//             await orderGateway.participate(order, taker);
//
//             await tka
//                 .balanceOf(taker)
//                 .then(v => v.toString())
//                 .should.eventually.eq("500");
//             await tkb
//                 .balanceOf(maker)
//                 .then(v => v.toString())
//                 .should.eventually.eq("500");
//         });
//     });
//
//     describe("amountRemaining", () => {
//         it("should return true for a valid order", async () => {
//             await orderGateway.amountRemaining(order).then(val => {
//                 assert(val.eq(500));
//             });
//         });
//     });
//
//     describe("arguments()", () => {
//         it("should get the arguments of a SubContract", async () => {
//             const args = await orderGateway.arguments(subContract);
//             assert.doesNotThrow(() => {
//                 JSON.stringify(args);
//             });
//         });
//
//         it("should throw an error on invalid subContract", async () => {
//             await orderGateway
//                 .arguments(accounts[0])
//                 .should.eventually.be.rejectedWith("Unable to load arguments from contract");
//         });
//     });
//
//     describe("constructor()", () => {
//         it("should not deploy a new contract if configuration doesn't point to a network with a deployed contract.", async () => {
//             await orderGateway.initializing;
//
//             (async () => {
//                 const gw = new OrderGateway({ web3, networkId: 123 });
//                 await gw.initializing;
//             })().should.eventually.be.rejected;
//         });
//
//         it("should select an existing contract if the core has been deployed to the network.", async () => {
//             await orderGateway.initializing;
//             const deployedAddress = orderGateway.address;
//
//             const testOrderGateway = new OrderGateway({ web3, web3Wrapper, networkId: 3 });
//             await testOrderGateway.initializing;
//
//             deployedAddress.should.not.equal(testOrderGateway.address);
//             testOrderGateway.address.should.equal(DeployedAddresses[3].OrderGateway.contractAddress);
//         });
//
//         it("should select an existing contract if the options provide address.", async () => {
//             await orderGateway.initializing;
//             const deployedAddress = orderGateway.address;
//
//             const testOrderGateway = new OrderGateway({ web3, web3Wrapper, orderGatewayAddress: deployedAddress });
//             await testOrderGateway.initializing;
//
//             deployedAddress.should.equal(testOrderGateway.address);
//         });
//     });
// });
