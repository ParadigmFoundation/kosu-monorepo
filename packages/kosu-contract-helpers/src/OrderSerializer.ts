import { Order, PostableOrder } from "@kosu/types";
import { toBytes32 } from "@kosu/utils";
import { soliditySHA3 as solSHA3 } from "ethereumjs-abi";
import { bufferToHex, toBuffer } from "ethereumjs-util";
import { isAddress } from "web3-utils";

import { Signature } from "./Signature";

function _serialize(_arguments: any, values: any): string {
    let bytes: string = "";

    _arguments.forEach(arg => {
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
            case "int":
                bytes += toBytes32(values[arg.name]).substr(2);
                break;
            case "bytes":
                if (!values[arg.name].startsWith("0x")) {
                    throw new Error(`${arg.name} is not valid hex bytes`);
                }
                bytes += values[arg.name].substr(2);
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
 * could add to utils (or create order-utils pacakge)
 */
// tslint:disable-next-line: no-unnecessary-class
export const OrderSerializer = {
    /**
     * Serializes the data into bytes
     *
     * @param _arguments Argument json defined in the subContract
     * @param order Order to serialize
     */
    serialize(_arguments: any, order: Order): string {
        let bytes: string = `0x${_serialize(_arguments.maker, order.makerValues)}`;
        if (order.takerValues) {
            bytes += _serialize(_arguments.taker, order.takerValues);
        }

        return bytes;
    },

    /**
     * Generates hex to be used for the poster signing process
     *
     * @param order Order to get data for
     * @param _arguments Argument json defined in the subContract
     */
    posterSignatureHex(order: Order, _arguments: any): string {
        // @ts-ignore
        const hashOrder: Order = {};
        Object.assign(hashOrder, order);
        delete hashOrder.takerValues;
        return bufferToHex(solSHA3(["bytes"], [toBuffer(OrderSerializer.serialize(_arguments, hashOrder))]));
    },

    /**
     * Recovers the poster from the poster signature
     *
     * @param order Order to recover address that signed
     * @param _arguments Argument json defined in the subContract
     */
    recoverPoster(order: PostableOrder, _arguments: any[]): string {
        return Signature.recoverAddress(OrderSerializer.posterSignatureHex(order, _arguments), order.posterSignature);
    },

    /**
     * Generate the maker hex from order
     *
     * @param order to generate hex from
     * @param _arguments Argument json defined in the subContract
     */
    makerHex(order: Order, _arguments: any): string {
        const datatypes = [];
        const values = [];

        _arguments.maker.forEach(argument => {
            if (argument.name.includes("signature") && argument.signatureFields) {
                argument.signatureFields.forEach(i => {
                    datatypes.push(_arguments.maker[i].datatype);
                    if (
                        _arguments.maker[i].datatype === "bytes" &&
                        typeof order.makerValues[_arguments.maker[i].name] === "string"
                    ) {
                        values.push(toBuffer(order.makerValues[_arguments.maker[i].name]));
                    } else {
                        values.push(order.makerValues[_arguments.maker[i].name]);
                    }
                });
            }
        });
        return bufferToHex(solSHA3(datatypes, values));
    },

    /**
     * Recovers the maker from the signed information
     *
     * @param order to recover address from
     * @param _arguments Argument json defined in the subContract
     */
    recoverMaker(order: Order, _arguments: any[]): string {
        return Signature.recoverAddress(OrderSerializer.makerHex(order, _arguments), order.makerSignature);
    },
};
