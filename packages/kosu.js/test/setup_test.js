const Web3 = require('web3');
const chai = require('chai');
const CAP = require('chai-as-promised');
const { Kosu } = require('../src');

const tokenHelper = require('./helpers/tokenHelper.js');
const kosuContractHelper = require('./helpers/kosuContractHelper');

chai.use(CAP);

before(async () => {
  global.assert = chai.assert;
  chai.should();
  global.web3 = new Web3('http://localhost:8545');
  global.accounts = await web3.eth.personal.getAccounts();
  global.kosu = new Kosu({ provider: web3.currentProvider, networkId: await web3.eth.net.getId() });
  global.MAX_UINT = web3.utils.toBN('2').pow(web3.utils.toBN('256')).sub(web3.utils.toBN('1')).toString();

  await kosuContractHelper();
  await tokenHelper();
});

it('should connect to web3', () => {
  assert.equal(accounts.length, 10, "There should be 10 ETH accounts.")
});

it('should have the version set', () => {
  assert.equal(require('../package').version, kosu.version);
  assert.equal(require('../package').version, Kosu.version);
});