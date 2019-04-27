const AuthorizedAddresses = artifacts.require("./AuthorizedAddresses.sol");
const KosuToken = artifacts.require('./KosuToken.sol');

module.exports = async function(deployer) {
    const auth = await AuthorizedAddresses.deployed();
    await deployer.deploy(KosuToken, auth.address);
    const kosuToken = await KosuToken.deployed();
    await kosuToken.mint(web3.utils.toWei('1000000000'));
};