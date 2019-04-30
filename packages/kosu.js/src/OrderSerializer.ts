import {bufferToHex} from "ethereumjs-util";
import {soliditySHA3 as solSHA3} from "ethereumjs-abi";
import utils from "./utils";
import Signature from "./Signature";
import {Order, PostableOrder} from "./types";

/**
 *
 */
class OrderSerializer {

    /**
     * Serializes the maker values
     * @todo refactor for subContract changes or modularize to be less messy
     */
    static serializeMaker(_arguments: any[], order: Order): any[] {
        return this._serialize(_arguments, order.makerValues);
    }

    /**
     * Serializes teh taker values
     * @todo refactor for subContract changes or modularize to be less messy
     */
    static serializeTaker(_arguments: any[], takerValues: any[]): string[] {
        return this._serialize(_arguments, takerValues);
    }

    /**
     * Serialize values based on datatypes
     * @todo refactor for subContract changes or modularize to be less messy
     */
    private static _serialize(args: any[], values: any[]): any[] {
        return args.map(arg => utils.toBytes32( values[arg.name] ));
    }
    /**
     * Recovers the maker from the signed information
     * @todo refactor for subContract changes or modularize to be less messy
     */
    static recoverMaker(order: Order, _arguments: any[]): string {
        return Signature.recoverAddress(this._hexFor('poster', order, _arguments), order.makerSignature);
    }

    /**
     * Generate the maker hex
     * @todo refactor for subContract changes or modularize to be less messy
     */
    static makerHex(order: Order, _arguments: any[]): string {
        return OrderSerializer._hexFor("maker", order, _arguments);
    }

    /**
     * Recovers the poster from the poster signature
     * @todo refactor for subContract changes or modularize to be less messy
     */
    static recoverPoster(order: PostableOrder, _arguments: any[]): string {
        return Signature.recoverAddress(this._hexFor('poster', order, _arguments), order.posterSignature);
    }

    /**
     * Generate teh taker hex
     * @todo refactor for subContract changes or modularize to be less messy
     */
    static posterHex(order: Order, _arguments: any[]): string {
        return this._hexFor("poster", order, _arguments);
    }

    /**
     * Create hex from data types
     * @todo refactor for subContract changes or modularize to be less messy
     */
    private static _hexFor(signer, order: Order | PostableOrder, _arguments: any[]): string {
        let dataTypes = [], values = [];
        _arguments.forEach((argument) => {
            if (signer == 'maker' && argument.name.includes('signature')) return;
            if (order.makerValues[argument.name] != undefined) {
                dataTypes.push(argument.dataType);
                values.push(order.makerValues[argument.name].toString());
            }
        });
        return bufferToHex(solSHA3(dataTypes, values));
    }
}

export default OrderSerializer;