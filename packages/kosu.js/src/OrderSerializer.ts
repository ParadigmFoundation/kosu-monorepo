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
     * Generate the maker hex
     * @todo refactor for subContract changes or modularize to be less messy
     */
    static makerHex(order: Order, _arguments: any[]): string {
        return this._hexFor("maker", order, _arguments);
    }

    /**
     * Generate teh taker hex
     * @todo refactor for subContract changes or modularize to be less messy
     */
    static posterHex(order: Order, _arguments: any[]): string {
        return this._hexFor("poster", order, _arguments);
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
     * Recovers the poster from the poster signature
     * @todo refactor for subContract changes or modularize to be less messy
     */
    static recoverPoster(order: PostableOrder, _arguments: any[]): string {
        return Signature.recoverAddress(this._hexFor('poster', order, _arguments), order.posterSignature);
    }

    /**
     * Create hex from data types
     * @todo refactor for subContract changes or modularize to be less messy
     */
    private static _hexFor(signer, order: Order | PostableOrder, _arguments: any[]): string {
        let dataTypes = [], values = [];
        _arguments.forEach((argument) => {
            if (signer == 'maker' && argument.name.includes('signature')) return;
            if (this._shouldInclude(argument, order)) {
                dataTypes.push(argument.dataType);
                values.push(order.makerValues[argument.name].toString());
            }
        });
        return this._toHex(dataTypes, values);
    }

    /**
     * Determines if argument is present
     * @todo refactor for subContract changes or modularize to be less messy
     */
    private static _shouldInclude(argument, order: Order): boolean {
        return order.makerValues[argument.name] != undefined;
    }

    /**
     * Hashes values by their datatype
     * @todo refactor for subContract changes or modularize to be less messy
     */
    private static _toHex(dataTypes: string[], values: any[]): string {
        return bufferToHex(solSHA3(dataTypes, values));
    }
}

export default OrderSerializer;