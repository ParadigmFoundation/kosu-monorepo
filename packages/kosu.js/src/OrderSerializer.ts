import { soliditySHA3 as solSHA3 } from "ethereumjs-abi";
import { bufferToHex } from "ethereumjs-util";
import { isAddress } from "web3-utils";
import { toBuffer} from "ethereumjs-util";

import { Signature } from "./Signature";
import { toBytes32 } from "./utils";

/**
 * todo: does this need to be a class? (all static methods)
 *
 * could add to utils (or create order-utils pacakge)
 */
// tslint:disable-next-line: no-unnecessary-class
export class OrderSerializer {
    /**
     * Serializes the datathpes
     */
    public static serialize(_arguments: any, order: Order): string {
        let bytes: string = `0x${this._serialize(_arguments.maker, order.makerValues)}`;
        if (order.takerValues) {
            bytes += this._serialize(_arguments.taker, order.takerValues);
        }

        return bytes;
    }

    /**
     * Serialize values based on datatypes
     */
    private static _serialize(args: any, values: any[]): string {
        let bytes: string = "";

        args.forEach(arg => {
            switch (arg.datatype.toLowerCase()) {
                case "address":
                    const address = values[arg.name];
                    if (!isAddress(address)) {
                    throw new Error(`${arg.name} is not a valid address`);
                    }
                    bytes += address.substr(2);
                    break;
                case "uint":
                    bytes += toBytes32(values[arg.name]).substr(2);
                    break;
                case "signature":
                    const sig = values[arg.name];
                    if (!sig || sig.length !== 132) {
                        throw new Error(`${arg.name} is not a valid signature`);
                    }
                    bytes += sig.substr(2);
                    break;
                default:
                    throw new Error(`Not known datatype: ${arg.datatype}`);
            }
        });

        return bytes;
    }

    /**
     * Recovers the maker from the signed information
     * @todo refactor for subContract changes or modularize to be less messy
     */
    public static recoverMaker(order: Order, _arguments: any[]): string {
        return Signature.recoverAddress(this.makerHex(order, _arguments), order.makerSignature);
    }

    /**
     * Generate the maker hex
     * @todo refactor for subContract changes or modularize to be less messy
     */
    public static makerHex(order: Order, _arguments: any): string {
        return OrderSerializer._hexFor("maker", order, _arguments);
    }

    public static posterHex(order: Order, _arguments: any): string {
        return bufferToHex(solSHA3(["bytes"], [toBuffer(this.serialize(_arguments, order))]));
    }

    /**
     * Recovers the poster from the poster signature
     * @todo refactor for subContract changes or modularize to be less messy
     */
    public static recoverPoster(order: PostableOrder, _arguments: any[]): string {
        return Signature.recoverAddress(this.posterHex(order, _arguments), order.posterSignature);
    }

    /**
     * Create hex from data types
     * @todo refactor for subContract changes or modularize to be less messy
     */
    private static _hexFor(signer: string, order: Order | PostableOrder, _arguments: OrderArgument[]): string {
        const dataTypes = [];
        const values = [];
        _arguments[signer].forEach(argument => {
            // TODO addres this
            if (signer === "maker" && argument.name.includes("signature")) {
                return;
            }
            if (order.makerValues[argument.name] !== undefined) {
                dataTypes.push(argument.datatype);
                values.push(order.makerValues[argument.name].toString());
            }
        });
        return bufferToHex(solSHA3(dataTypes, values));
    }
}
