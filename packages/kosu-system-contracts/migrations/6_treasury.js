const AuthorizedAddresses = artifacts.require("./AuthorizedAddresses.sol");
const KosuToken = artifacts.require('./KosuToken.sol');
const Treasury = artifacts.require("./Treasury.sol");

module.exports = async function(deployer) {
  const auth = await AuthorizedAddresses.deployed();
  const kosuToken = await KosuToken.deployed();
  await deployer.deploy(Treasury, kosuToken.address, auth.address);
  const treasury = await Treasury.deployed();
  await auth.authorizeAddress(treasury.address);
};
