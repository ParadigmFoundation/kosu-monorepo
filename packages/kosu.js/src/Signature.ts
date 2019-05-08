import { soliditySHA3 } from "ethereumjs-abi";
import { bufferToHex, ecrecover, fromRpcSig, hashPersonalMessage, pubToAddress, toBuffer } from "ethereumjs-util";
import Web3 from "web3";

import { NULL_ADDRESS } from "./utils";

// todo: does this need to be a class (all static methods)?
// tslint:disable-next-line: no-unnecessary-class
export class Signature {
    /**
     * Generates a signature for a message hex using calls to a provider though web3
     *
     * @param web3 Web3 configured to desired provider
     * @param messageHex Hex representation of the message
     * @param signer Address to sign the message
     * @returns A vrs signature
     */
    public static async generate(
        web3: Web3,
        messageHex: string,
        signer: string,
    ): Promise<{ r: string; s: string; v: any }> {
        let raw: string;
        let signature;
        [raw, signature] = await Signature.sign(web3, messageHex, signer);

        if (!Signature.validate(messageHex, signature, signer)) {
            signature = fromRpcSig(raw);
        }

        if (!Signature.validate(messageHex, signature, signer)) {
            throw new Error("Bad signature.");
        }

        return Signature.toJSON(signature);
    }

    /**
     * Validates the signature of a messageHex is from the provided signer
     *
     * @param messageHex signed message hex
     * @param signature signature from message hex
     * @param signer signer who may have signed the message
     * @returns boolean representing if the signer in fact generated the signature with this message
     */
    public static validate(messageHex: string, signature: SignatureVRS, signer: string): boolean {
        return Signature.recoverAddress(messageHex, signature) === signer.toLowerCase();
    }

    /**
     * Recovers address from a message hex and signature
     *
     * @param messageHex Hex representation of the signed message
     * @param signature VRS signature
     */
    public static recoverAddress(messageHex: any, signature: SignatureVRS): string {
        const msgBuffer = hashPersonalMessage(toBuffer(messageHex));
        try {
            const rawPub = ecrecover(msgBuffer, signature.v, signature.r, signature.s);
            return bufferToHex(pubToAddress(rawPub));
        } catch (e) {
            return NULL_ADDRESS;
        }
    }

    /**
     * @todo refactor and simplify this/ may be quite different after refactor
     */
    public static async sign(web3: Web3, messageHex: string, signer: string): Promise<any[]> {
        const raw: string = await Signature.getRaw(web3, messageHex, signer);
        const buffer: Buffer | Uint8Array = Signature.getBuffer(raw);

        return [raw, Signature.setVRS(buffer)];
    }

    /**
     * @todo refactor and simplify this/ may be quite different after refactor
     */
    public static async getRaw(web3: Web3, messageHex: string, signer: string): Promise<string> {
        let raw: string;

        try {
            // @ts-ignore
            raw = await web3.eth.personal.sign(messageHex, signer);
        } catch (e) {
            raw = await web3.eth.sign(messageHex, signer);
        }

        return raw;
    }

    /**
     * @todo refactor and simplify this/ may be quite different after refactor
     */
    public static getBuffer(raw: any): Buffer | Uint8Array {
        return toBuffer(raw);
    }

    /**
     * @todo refactor and simplify this/ may be quite different after refactor
     */
    public static setVRS(buffer: Buffer | Uint8Array): { r: any; s: any; v: any } {
        let v = buffer[0];
        const r = buffer.slice(1, 33);
        const s = buffer.slice(33, 65);
        if (v < 27) {
            v = 27;
        }
        return { v, r, s };
    }

    /**
     * @todo refactor and simplify this/ may be quite different after refactor
     */
    public static hash(dataTypes: string[], values: any[]): string {
        return bufferToHex(soliditySHA3(dataTypes, values));
    }

    /**
     * @todo refactor and simplify this/ may be quite different after refactor
     */
    public static toJSON(signature: {
        v: string | number;
        r: Uint8Array | Buffer;
        s: Uint8Array | Buffer;
    }): { r: string; s: string; v: string | number } {
        return {
            v: signature.v,
            r: bufferToHex(signature.r),
            s: bufferToHex(signature.s),
        };
    }
}
