import {BigNumber} from "@0x/utils";
import { toHex, toTwosComplement } from "web3-utils";

/**
 * todo
 *
 * @param value todo
 */
export function toBytes32(value: string): number | string | BigNumber {
    return toTwosComplement(toHex(value));
}

export const NULL_ADDRESS: string = "0x0000000000000000000000000000000000000000";
