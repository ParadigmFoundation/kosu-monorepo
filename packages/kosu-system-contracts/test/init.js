const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Treasury = artifacts.require("./Treasury.sol");
const KosuToken = artifacts.require("./KosuToken.sol");
const truffleAssert = require('truffle-assertions');
const truffleEvent  = require('truffle-events');
const eventDecoder = require('..').eventDecoder;

chai.use(chaiAsPromised);

var snapshot, treasury, kosuToken;

const saveSnapshot = () => {
  return new Promise((resolve) => {
    web3.currentProvider.send({
      jsonrpc: "2.0",
      method: "evm_snapshot"
    }, (err, value) => {
      resolve(value.result);
    });
  });
};

const revertToSnapshot = () => {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send({
      jsonrpc: "2.0",
      method: "evm_revert",
      params: [snapshot]
    }, (err, res) => {
      if(err) reject(err);
      else resolve();
    });
  });
};

const assertEmitterEvents = (result, index, eventAssertion) => {
  result.receipt.logs = result.receipt.rawLogs; //TODO: work around for the new truffle changes
  const eventsResult = truffleEvent.formTxObject('EventEmitter', index, result);

  truffleAssert.eventEmitted(eventsResult, 'KosuEvent', (ev) => {
    const decoded = eventDecoder(ev);
    return eventAssertion(decoded);
  });
};

const skipBlocks = async (number) => {
  for(let i = 0; i < number; i++) {
    await new Promise((resolve, reject) => {
      web3.currentProvider.send({
        jsonrpc: "2.0",
        method: "evm_mine",
        params: []
      }, (err, res) => {
        if(err) reject(err);
        else resolve();
      });
    });
  }
};

const prepareTokens = async (from, funds) => {
  await kosuToken.transfer(from, fiveEther);
  await kosuToken.approve(treasury.address, maxUint, { from });
  await treasury.deposit(web3.utils.toBN(funds), { from });
};

const values = {
  maxUint: web3.utils.toBN(2).pow(web3.utils.toBN(256)).sub(web3.utils.toBN(1)),
  sixEther: web3.utils.toWei('6'),
  fiveEther: web3.utils.toWei('5'),
  oneEther: web3.utils.toWei('1'),
  halfEther: web3.utils.toWei('0.5'),
};

before(async () => {
  expect = chai.expect;
  chai.should();
  Object.assign(global, { assertEmitterEvents, skipBlocks, prepareTokens, ...values });
  treasury = await Treasury.deployed();
  kosuToken = await KosuToken.deployed();
  await kosuToken.approve(treasury.address, web3.utils.toWei('50000'));
  snapshot = await saveSnapshot();
});

afterEach(async () => {
  await revertToSnapshot();
  //TODO: I don't know why but without the below things freeze up.
  // I console logged a few of the messages to see if further tx were hitting the 'rpc'
  // They where... Just going to keep going with that till I can circle back and try to figure it out.
  await saveSnapshot();
  await saveSnapshot();
});
