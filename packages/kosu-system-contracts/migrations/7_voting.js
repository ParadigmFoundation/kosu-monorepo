const Treasury = artifacts.require("./Treasury.sol");
const AuthorizedAddresses = artifacts.require("./AuthorizedAddresses.sol");
const Voting = artifacts.require('./Voting.sol');
const EventEmitter = artifacts.require("./EventEmitter.sol");

module.exports = async function(deployer) {
    const auth = await AuthorizedAddresses.deployed();
    const treasury = await Treasury.deployed();
    const events = await EventEmitter.deployed();
    const voting = await deployer.deploy(Voting, treasury.address, events.address);
    await auth.authorizeAddress(voting.address);
};
