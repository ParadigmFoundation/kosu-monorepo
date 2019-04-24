const TokenContractInfo = require('./TestToken.json');

function wrap(contract) {
  const methods = contract.methods;

  return {
    name: function name() {
      return methods.name().call();
    },
    symbol: function symbol() {
      return methods.symbol().call();
    },
    totalSupply: function totalSupply() {
      return methods.totalSupply().call();
    },
    decimals: function decimals() {
      return methods.decimals().call();
    },
    balanceOf: function balanceOf(owner) {
      return methods.balanceOf(owner).call();
    },
    allowance: function allowance(owner, spender) {
      return methods.allowance(owner, spender).call();
    },
    approve: async function approve(spender, value, from = null) {
      if (from === null) from = await getCoinbase();
      var tx = methods.approve(spender, value);
      return tx.send({ from: from });
    },
    transferFrom: async function transferFrom(fromAddress, to, value, from = null) {
      if (from === null) from = await getCoinbase();
      var tx = methods.transferFrom(fromAddress, to, value);
      return tx.send({ from: from });
    },
    transfer: async function transfer(to, value, from = null) {
      if (from === null) from = await getCoinbase();
      var tx = methods.transfer(to, value);
      return tx.send({ from: from });
    }
  }
};

module.exports = async () => {
  const TokenContract = new web3.eth.Contract(TokenContractInfo.abi);

  const tkaContract = await TokenContract.deploy({ data: TokenContractInfo.bytecode , arguments: ['Token A', 'TKA'] }).send({ from: accounts[7], gas: 4500000 });
  const tkbContract = await TokenContract.deploy({ data: TokenContractInfo.bytecode , arguments: ['Token B', 'TKB'] }).send({ from: accounts[8], gas: 4500000 });

  global.TKA = tkaContract.options.address;
  global.tka = wrap(tkaContract);

  global.TKB = tkbContract.options.address;
  global.tkb = wrap(tkbContract);
};