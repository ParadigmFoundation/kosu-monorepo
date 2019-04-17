const ValidatorRegistryProxy = artifacts.require("./ValidatorRegistryProxy.sol");
const AuthorizedAddresses = artifacts.require("./AuthorizedAddresses.sol");
const ValidatorRegistry = artifacts.require("./ValidatorRegistry.sol");
const EventEmitter = artifacts.require("./EventEmitter.sol");
const Treasury = artifacts.require("./Treasury.sol");
const Voting = artifacts.require("./Voting.sol");

module.exports = async function(deployer) {
  await deployer.then(async () => {
    const treasury = await Treasury.deployed();
    const voting = await Voting.deployed();
    const auth = await AuthorizedAddresses.deployed();
    const events = await EventEmitter.deployed();
    const registry = await deployer.deploy(ValidatorRegistry, treasury.address, voting.address, auth.address, events.address);
    await auth.authorizeAddress(registry.address);
    const proxy = await deployer.deploy(ValidatorRegistryProxy, registry.address, auth.address);
    await auth.authorizeAddress(proxy.address);
  });
};
