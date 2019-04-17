const HDWalletProvider = require('truffle-hdwallet-provider');
const safeRequire = require('safe-node-require');
const mnemonics = safeRequire('./mnemonic');

let ropsten, kovan;

if(mnemonics) {
  ropsten = {
    network_id: 3,
        gas: 4600000,
        gasPrice: 10000000000,
        provider: () => new HDWalletProvider(mnemonics.mnemonic, "https://eth-ropsten.alchemyapi.io/jsonrpc/AAv0PpPC5GE3nqbj99bLqVhIsQKg7C-7")
  };
  kovan = {
    network_id: 42,
        gas: 4600000,
        gasPrice: 10000000000,
        provider: () => new HDWalletProvider(mnemonics.mnemonic, "https://eth-kovan.alchemyapi.io/jsonrpc/J7gEDgzpwwFKyJ-k6eWURlVgCIEtSYnh")
  }
}

const config = {
  networks: {
    develop: {
      network_id: '*',
      gas: 4600000,
      host: 'localhost',
      port: 9545
    },
    ropsten,
    kovan,
    docker: {
      network_id: 6174,
      gas: 4600000,
      gasPrice: 10000000000,
      host: 'localhost',
      port: 8545
    }
  },
  solc: {
    optimizer: {
      "enabled": true,
      "runs": 200
    }
  },
  mocha: {
    reporter: require('eth-gas-reporter'),
    reporterOptions: {
      currency: 'USD',
    }
  }
};

module.exports = config;
