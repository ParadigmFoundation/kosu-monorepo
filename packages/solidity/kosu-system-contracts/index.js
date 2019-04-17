const Utils = require('web3-utils');
const Decoder = require('web3-eth-abi').AbiCoder();

const bytes32ToAddressString = (val) => {
  return `0x${val.substr(26)}`;
};

const bytes32ToBase64 = (val) => {
  return Buffer(val.substr(2), 'hex').toString('base64');
};

const eventDecoder = (eventReturnValues) => {
  const eventType = eventReturnValues.eventType;
  const data = eventReturnValues.data;
  const decoded = {
    eventType
  };
  switch (eventType) {
    case 'PosterRegistryUpdate':
      Object.assign(decoded, {
        poster: bytes32ToAddressString(data[0]),
        stake: Utils.hexToNumberString(data[1]) //TODO: better name
      });
      break;
    case 'ValidatorRegistryUpdate':
      Object.assign(decoded, {
        tendermintPublicKey: bytes32ToBase64(data[0]),
        owner: bytes32ToAddressString(data[1]),
        stake: Utils.hexToNumberString(data[2]) //TODO: better name
      });
      break;
    case 'ValidatorRegistered':
      Object.assign(decoded, {
        tendermintPublicKey: bytes32ToBase64(data[0]),
        applicationBlockNumber: Utils.hexToNumberString(data[1]), //TODO: better name
        owner: bytes32ToAddressString(data[2]),
        rewardRate: Decoder.decodeParameter('int', data[3]).toString()
      });
      break;
    case 'ValidatorChallenged':
      Object.assign(decoded, {
        tendermintPublicKey: bytes32ToBase64(data[0]),
        owner: bytes32ToAddressString(data[1]),
        challenger: bytes32ToAddressString(data[2]),
        pollId: Utils.hexToNumberString(data[3])
      });
      break;
    case 'PollCreated':
      Object.assign(decoded, {
        pollCreator: bytes32ToAddressString(data[0]),
        pollId: Utils.hexToNumberString(data[1]),
      });
      break;

    default:
      console.warn(`Unrecognized eventType: ${eventType}`);
  }
  return decoded;
};

module.exports = {
  eventDecoder,
  contracts: {
    AuthorizedAddresses: require('./build/contracts/AuthorizedAddresses.json'),
    EventEmitter: require('./build/contracts/EventEmitter.json'),
    OrderGateway: require('./build/contracts/OrderGateway.json'),
    PosterRegistryProxy: require('./build/contracts/PosterRegistryProxy.json'),
    ValidatorRegistryProxy: require('./build/contracts/ValidatorRegistryProxy.json'),
    Treasury: require('./build/contracts/Treasury.json'),
    KosuToken: require('./build/contracts/KosuToken.json'),
    Voting: require('./build/contracts/Voting.json')
  }
};
