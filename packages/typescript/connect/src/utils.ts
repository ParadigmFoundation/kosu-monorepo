import BN = require("bn.js");
import { toTwosComplement, toHex } from "web3-utils";

export function toBytes32(value: string): number | string | BN {
    return toTwosComplement(toHex(value));
}

export var NULL_ADDRESS: string = '0x0000000000000000000000000000000000000000';

export default {
    toBytes32,
    NULL_ADDRESS
}