const PosterRegistry = artifacts.require("./PosterRegistry.sol");
const PosterRegistryProxy = artifacts.require("./PosterRegistryProxy.sol");
const Treasury = artifacts.require("./Treasury.sol");
const AuthorizedAddresses = artifacts.require("./AuthorizedAddresses.sol");
const EventEmitter = artifacts.require("./EventEmitter.sol");


module.exports = async function(deployer) {
  await deployer.then(async () => {
    const treasury = await Treasury.deployed();
    const auth = await AuthorizedAddresses.deployed();
    const events = await EventEmitter.deployed();
    const registryImpl = await deployer.deploy(PosterRegistry, treasury.address, events.address, auth.address);
    const registryProxy = await deployer.deploy(PosterRegistryProxy, registryImpl.address, auth.address);
    await auth.authorizeAddress(registryImpl.address);
    await auth.authorizeAddress(registryProxy.address);
  });
};
