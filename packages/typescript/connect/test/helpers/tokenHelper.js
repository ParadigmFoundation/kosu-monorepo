const TokenContractInfo = require('./TestToken.json');
const SimpleERC20 = require('simple-erc20');

module.exports = async () => {
  const TokenContract = new web3.eth.Contract(TokenContractInfo.abi);

  const tkaContract = await TokenContract.deploy({ data: TokenContractInfo.bytecode , arguments: ['Token A', 'TKA'] }).send({ from: accounts[7], gas: 4500000 });
  const tkbContract = await TokenContract.deploy({ data: TokenContractInfo.bytecode , arguments: ['Token B', 'TKB'] }).send({ from: accounts[8], gas: 4500000 });

  global.TKA = tkaContract.options.address;
  global.tka = SimpleERC20(TKA, await web3.eth.net.getId(), web3);

  global.TKB = tkbContract.options.address;
  global.tkb = SimpleERC20(TKB, await web3.eth.net.getId(), web3);
};