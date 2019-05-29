import { toHex, toTwosComplement } from "web3-utils";

/**
 * @param value String value to be converted into bytes32 representation.
 */
export function toBytes32(value: string): string {
    return toTwosComplement(toHex(value));
}

export const NULL_ADDRESS: string = "0x0000000000000000000000000000000000000000";
