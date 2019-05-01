import { soliditySHA3 as solSHA3 } from "ethereumjs-abi";
import { bufferToHex } from "ethereumjs-util";

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
     * Serializes the maker values
     * @todo refactor for subContract changes or modularize to be less messy
     */
    public static serializeMaker(_arguments: any[], order: Order): any[] {
        return this._serialize(_arguments, order.makerValues);
    }

    /**
     * Serializes teh taker values
     * @todo refactor for subContract changes or modularize to be less messy
     */
    public static serializeTaker(_arguments: any[], takerValues: any[]): string[] {
        return this._serialize(_arguments, takerValues);
    }

    /**
     * Serialize values based on datatypes
     * @todo refactor for subContract changes or modularize to be less messy
     */
    private static _serialize(args: any[], values: any[]): any[] {
        return args.map(arg => toBytes32( values[arg.name] ));
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
    public static makerHex(order: Order, _arguments: any[]): string {
        return OrderSerializer._hexFor("maker", order, _arguments);
    }

    /**
     * Recovers the poster from the poster signature
     * @todo refactor for subContract changes or modularize to be less messy
     */
    public static recoverPoster(order: PostableOrder, _arguments: any[]): string {
        return Signature.recoverAddress(this.posterHex(order, _arguments), order.posterSignature);
    }

    /**
     * Generate teh taker hex
     * @todo refactor for subContract changes or modularize to be less messy
     */
    public static posterHex(order: Order, _arguments: any[]): string {
        return this._hexFor("poster", order, _arguments);
    }

    /**
     * Create hex from data types
     * @todo refactor for subContract changes or modularize to be less messy
     */
    private static _hexFor(
        signer: string,
        order: Order | PostableOrder,
        _arguments: OrderArgument[],
    ): string {
        const dataTypes = [];
        const values = [];
        _arguments.forEach(argument => {
            if (signer === "maker" && argument.name.includes("signature")) {
                return;
            }
            if (order.makerValues[argument.name] !== undefined) {
                dataTypes.push(argument.dataType);
                values.push(order.makerValues[argument.name].toString());
            }
        });
        return bufferToHex(solSHA3(dataTypes, values));
    }
}
