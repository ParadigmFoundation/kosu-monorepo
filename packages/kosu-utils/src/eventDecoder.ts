import { artifacts } from "@kosu/system-contracts";
import Decoder from "web3-eth-abi";
import { hexToNumberString, soliditySha3 } from "web3-utils";

const event: {
    name: string;
    type: string;
    inputs: Array<{ name: string; type: string }>;
} = artifacts.EventEmitter.compilerOutput.abi.filter(entry => entry.type === "event")[0] as {
    name: string;
    type: string;
    inputs: Array<{ name: string; type: string }>;
};
const signature: string = soliditySha3(`${event.name}(${event.inputs.map(input => input.type).join(",")})`);

export const bytes32ToAddressString = (val: string): string => {
    return `0x${val.substr(26)}`;
};

export const bytes32ToBase64 = (val: string): string => {
    return Buffer.from(val.substr(2), "hex").toString("base64");
};

export const eventDecoder = (eventReturnValues: any): any => {
    const eventType = eventReturnValues.eventType;
    const data = eventReturnValues.data;
    const stringData = eventReturnValues.stringData;
    const decoded = {
        eventType,
    };
    switch (eventType) {
        case "PosterRegistryUpdate":
            Object.assign(decoded, {
                poster: bytes32ToAddressString(data[0]),
                stake: hexToNumberString(data[1]), // TODO: better name
            });
            break;
        case "ValidatorRegistryUpdate":
            Object.assign(decoded, {
                tendermintPublicKey: bytes32ToBase64(data[0]),
                tendermintPublicKeyHex: data[0],
                owner: bytes32ToAddressString(data[1]),
                stake: hexToNumberString(data[2]), // TODO: better name
            });
            break;
        case "ValidatorRegistered":
            Object.assign(decoded, {
                tendermintPublicKey: bytes32ToBase64(data[0]),
                tendermintPublicKeyHex: data[0],
                applicationBlockNumber: hexToNumberString(data[1]),
                owner: bytes32ToAddressString(data[2]),
                rewardRate: Decoder.decodeParameter("int", data[3]).toString(),
                details: stringData,
            });
            break;
        case "ValidatorChallenged":
            Object.assign(decoded, {
                tendermintPublicKey: bytes32ToBase64(data[0]),
                tendermintPublicKeyHex: data[0],
                owner: bytes32ToAddressString(data[1]),
                challenger: bytes32ToAddressString(data[2]),
                challengeId: hexToNumberString(data[3]),
                pollId: hexToNumberString(data[4]),
                details: stringData,
            });
            break;
        case "PollCreated":
            Object.assign(decoded, {
                pollCreator: bytes32ToAddressString(data[0]),
                pollId: hexToNumberString(data[1]),
                commitEndBlock: hexToNumberString(data[2]),
                revealEndBlock: hexToNumberString(data[3]),
            });
            break;
        case "ValidatorRemoved":
            Object.assign(decoded, {
                tendermintPublicKey: bytes32ToBase64(data[0]),
                tendermintPublicKeyHex: data[0],
            });
            break;
        case "ValidatorChallengeResolved":
            Object.assign(decoded, {
                tendermintPublicKey: bytes32ToBase64(data[0]),
                tendermintPublicKeyHex: data[0],
            });
            break;
        case "ValidatorConfirmed":
            Object.assign(decoded, {
                tendermintPublicKey: bytes32ToBase64(data[0]),
                tendermintPublicKeyHex: data[0],
            });
            break;
        case "ValidatorTouchedAndRemoved":
            Object.assign(decoded, {
                tendermintPublicKey: bytes32ToBase64(data[0]),
                tendermintPublicKeyHex: data[0],
                owner: bytes32ToAddressString(data[1]),
            });
            break;
        case "ValidatorReducedReward":
            Object.assign(decoded, {
                tendermintPublicKey: bytes32ToBase64(data[0]),
                tendermintPublicKeyHex: data[0],
                owner: bytes32ToAddressString(data[1]),
                newRewardRate: hexToNumberString(data[2]),
            });
            break;
        default:
            console.warn(`Unrecognized eventType: ${eventType}`);
    }
    return decoded;
};

export const decodeKosuEvents = (logs: any): any => {
    return logs
        .filter(log => log.topics[0] === signature)
        .map(log => eventDecoder(Decoder.decodeLog(event.inputs, log.data, log.topics)));
};
