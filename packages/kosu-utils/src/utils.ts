import { BigNumber } from "@0x/utils";
import { toHex, toTwosComplement } from "web3-utils";

/**
 * Convert an arbitrary string to a `bytes32` version.
 *
 * @param value String value to be converted into bytes32 representation.
 */
export function toBytes32(value: string): string {
    return toTwosComplement(toHex(value));
}

export const NULL_ADDRESS: string = "0x0000000000000000000000000000000000000000";
export const MAX_UINT = new BigNumber("2")
    .pow(new BigNumber("256"))
    .minus(new BigNumber("1"))
    .toString();
