var OrderGateway = artifacts.require("./OrderGateway.sol");

module.exports = function(deployer) {
  deployer.deploy(OrderGateway);
};
