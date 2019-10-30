import { padRight } from "web3-utils";

/**
 * Converts public key to hex if input is not currently in hex
 *
 * @param _pubKey .
 * @returns hex encoded tendermint public key
 */
export function convertPubKey(_pubKey: string): string {
    let out;
    if (_pubKey.length === 66 && _pubKey.startsWith("0x")) {
        return _pubKey;
    } else if (_pubKey.startsWith("0x") && _pubKey.length < 66) {
        out = _pubKey;
    } else {
        out = `0x${Buffer.from(_pubKey, "base64").toString("hex")}`;
    }

    if (out.length > 66) {
        out = out.substr(0, 66);
    }

    return padRight(out, 64, "0");
}
