import BN = require("bn.js");
import { toHex, toTwosComplement } from "web3-utils";

/**
 * todo
 *
 * @param value todo
 */
export function toBytes32(value: string): number | string | BN {
    return toTwosComplement(toHex(value));
}

export const NULL_ADDRESS: string = "0x0000000000000000000000000000000000000000";
