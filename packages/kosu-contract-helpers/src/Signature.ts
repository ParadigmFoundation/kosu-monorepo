import { NULL_ADDRESS } from "@kosu/utils";
import { bufferToHex, ecrecover, fromRpcSig, hashPersonalMessage, pubToAddress, toBuffer } from "ethereumjs-util";
import Web3 from "web3";

// tslint:disable-next-line: no-unnecessary-class
export const Signature = {
    /**
     * Generates a signature for a message hex using calls to a provider though web3
     *
     * @param web3 Web3 configured to desired provider
     * @param messageHex Hex representation of the message
     * @param signer Address to sign the message
     * @returns A vrs signature
     */
    async generate(web3: Web3, messageHex: string, signer: string): Promise<string> {
        return Signature.sign(web3, messageHex, signer);
    },

    /**
     * Validates the signature of a messageHex is from the provided signer
     *
     * @param messageHex signed message hex
     * @param signature signature from message hex
     * @param signer signer who may have signed the message
     * @returns boolean representing if the signer in fact generated the signature with this message
     */
    validate(messageHex: string, signature: string, signer: string): boolean {
        return Signature.recoverAddress(messageHex, signature) === signer.toLowerCase();
    },

    /**
     * Recovers address from a message hex and signature
     *
     * @param messageHex Hex representation of the signed message
     * @param signature VRS signature
     */
    recoverAddress(messageHex: any, signature: string): string {
        const msgBuffer = hashPersonalMessage(toBuffer(messageHex));
        try {
            const sig = fromRpcSig(signature);
            const rawPub = ecrecover(msgBuffer, sig.v, sig.r, sig.s);
            return bufferToHex(pubToAddress(rawPub));
        } catch (e) {
            return NULL_ADDRESS;
        }
    },

    /**
     * Sign hex with provided address
     *
     * @param web3 Provider which executes the signature.
     * @param messageHex Hex to be singed
     * @param signer Address to sign with.
     */
    async sign(web3: Web3, messageHex: string, signer: string): Promise<string> {
        let raw: string;

        try {
            // @ts-ignore
            raw = await web3.eth.personal.sign(messageHex, signer);
        } catch (e) {
            raw = await web3.eth.sign(messageHex, signer);
        }

        return raw;
    },
};
