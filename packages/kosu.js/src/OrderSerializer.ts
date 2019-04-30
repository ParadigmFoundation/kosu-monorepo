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
     *
     */
    static serializeMaker(_arguments: any[], order: Order): any[] {
        return this._serialize(_arguments, order.makerValues);
    }

    /**
     *
     */
    static serializeTaker(_arguments: any[], takerValues: any[]): string[] {
        return this._serialize(_arguments, takerValues);
    }

    /**
     *
     */
    static makerHex(order: Order, _arguments: any[]): string {
        return this._hexFor("maker", order, _arguments);
    }

    /**
     *
     */
    static posterHex(order: Order, _arguments: any[]): string {
        return this._hexFor("poster", order, _arguments);
    }



    /**
     *
     */
    private static _serialize(args: any[], values: any[]): any[] {
        return args.map(arg => utils.toBytes32( values[arg.name] ));
    }

    /**
     * Recovers the maker from the signed information
     */
    static recoverMaker(order: Order, _arguments: any[]): string {
        return Signature.recoverAddress(this._hexFor('poster', order, _arguments), order.makerSignature);
    }

    /**
     * Recovers the poster from the poster signature
     */
    static recoverPoster(order: PostableOrder, _arguments: any[]): string {
        return Signature.recoverAddress(this._hexFor('poster', order, _arguments), order.posterSignature);
    }

    /**
     *
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
     *
     */
    private static _shouldInclude(argument, order: Order): boolean {
        return order.makerValues[argument.name] != undefined;
    }

    /**
     *
     */
    private static _toHex(dataTypes: string[], values: any[]): string {
        return bufferToHex(solSHA3(dataTypes, values));
    }
}

export default OrderSerializer;