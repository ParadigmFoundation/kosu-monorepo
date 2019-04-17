const AuthorizedAddresses = artifacts.require("./AuthorizedAddresses.sol");
const EventEmitter = artifacts.require("./EventEmitter.sol");

module.exports = async function(deployer) {
  const auth = await AuthorizedAddresses.deployed();
  await deployer.deploy(EventEmitter, auth.address);
};
