import { soliditySHA3 } from "ethereumjs-abi";
import { bufferToHex, toBuffer, hashPersonalMessage, fromRpcSig, ecrecover, pubToAddress } from 'ethereumjs-util';
import Web3 from "web3";
import utils from './utils';
import OrderSerializer from "./OrderSerializer";
import {Order} from "./types";

class Signature {

  static async generate(web3: Web3, messageHex: string, signer: string): Promise<{ r: string; s: string; v: any }> {

    let raw, signature;
    [raw, signature] = await Signature.sign(web3, messageHex, signer);

    if(!Signature.validate(messageHex, signature, signer))
      signature = fromRpcSig(raw);

    if(!Signature.validate(messageHex, signature, signer))
      throw new Error('Bad signature.');

    return Signature.toJSON(signature);
  }

  static validate(messageHex, signature, signer): boolean {
    return Signature.recoverAddress(messageHex, signature) === signer.toLowerCase();
  }

  static recoverAddress(messageHex: any, signature: { v: number; r: Buffer | Uint8Array; s: Buffer | Uint8Array; }): string {
    const msgBuffer = hashPersonalMessage(toBuffer(messageHex));
    try {
      const rawPub = ecrecover(msgBuffer, signature.v, signature.r, signature.s);
      return bufferToHex(pubToAddress(rawPub));
    } catch (e) {
      return utils.NULL_ADDRESS;
    }
  }

  static async sign(web3: Web3, messageHex: string, signer: string): Promise<any[]> {
    const raw: string = await Signature.getRaw(web3, messageHex, signer);
    const buffer: Buffer | Uint8Array = Signature.getBuffer(raw);

    return [raw, Signature.setVRS(buffer)];
  }

  static async getRaw(web3: Web3, messageHex: string, signer: string): Promise<string> {
    let raw: string;

    try {
      raw = await web3.eth.personal.sign(messageHex, signer)
    } catch (e) {
        raw = await web3.eth.sign(messageHex, signer);
    }
    
    return raw;
  }

  static getBuffer(raw: any): Buffer | Uint8Array {
    return toBuffer(raw);
  }

  static setVRS(buffer: Buffer | Uint8Array): { r: any; s: any; v: any } {
    let v = buffer[0];
    const r = buffer.slice(1, 33);
    const s = buffer.slice(33, 65);
    if(v < 27) v = 27;
    return { v, r, s };
  }

  static hash(dataTypes: string[], values: any[]): string {
    return bufferToHex(soliditySHA3(dataTypes, values));
  }

  static toJSON(signature: { v: string | number; r: Uint8Array | Buffer; s: Uint8Array | Buffer; }): { r: string; s: string; v: string | number } {
    return {
      v: signature.v,
      r: bufferToHex(signature.r),
      s: bufferToHex(signature.s)
    }
  }
}

export default Signature;
