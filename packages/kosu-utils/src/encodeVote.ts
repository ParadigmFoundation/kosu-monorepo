import { soliditySha3 } from "web3-utils";

/**
 * Encodes a vote by hashing the option and salt
 *
 * @param _voteOption .
 * @param _voteSalt .
 *
 * @returns Encoded vote
 */
export function  encodeVote(_voteOption: string, _voteSalt: string): string {
    return soliditySha3({ t: "uint", v: _voteOption }, { t: "uint", v: _voteSalt });
}
