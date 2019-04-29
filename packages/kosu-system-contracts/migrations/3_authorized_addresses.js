var AuthorizedAddresses = artifacts.require("./AuthorizedAddresses.sol");

module.exports = function(deployer) {
  deployer.deploy(AuthorizedAddresses);
};
