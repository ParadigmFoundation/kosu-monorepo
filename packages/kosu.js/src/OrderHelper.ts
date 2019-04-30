import {Order, PostableOrder} from "./types";
import OrderGateway from "./OrderGateway";
import Signature from "./Signature";
import Web3 from "web3";
import OrderSerializer from "./OrderSerializer";
import {bufferToHex} from "ethereumjs-util";
import {soliditySHA3 as solSHA3} from "ethereumjs-abi";


class OrderHelper {
    private orderGateway: OrderGateway;
    private web3: Web3;

    constructor(web3: Web3, orderGateway: OrderGateway) {
        this.web3 = web3;
        this.orderGateway = orderGateway;
    }

    /**
     * Make an order by ensuring a required signature is  present
     * @todo refactoring subContract may effect this
     * @todo consider renaming
     */
    async makeOrder(order: Order): Promise<Order> {
        order.makerSignature = await Signature.generate(this.web3, await this.makerHex(order), order.maker);
        order.makerValues.signatureV = order.makerSignature.v;
        order.makerValues.signatureR = order.makerSignature.r;
        order.makerValues.signatureS = order.makerSignature.s;

        return order;
    }

    /**
     * Take a prepared order on the ethereum blockchain
     * @todo refactoring subContract may effect this
     * @todo consider renaming
     */
    async takeOrder(order: Order, takerValues: any[], taker: string): Promise<void> {
        return this.orderGateway.participate(order, takerValues, taker)
    }

    /**
     * Generate a poster signature for OrderStream submission
     * @todo refactor/move implementation.
     */
    async prepareForPost(order: Order, poster: string = order.maker): Promise<PostableOrder> {
        return {
            ...order,
            posterSignature: await Signature.generate(this.web3, OrderSerializer.posterHex(order, await this.orderGateway.makerArguments(order.subContract)), poster)
        };
    }

    /**
     * Generate the maker hex
     * @todo refactor for subContract changes or modularize to be less messy
     */
    async makerHex(order: Order): Promise<string> {
        const _arguments = await this.orderGateway.makerArguments(order.subContract);
        return OrderSerializer.makerHex(order, _arguments);
    }

    /**
     * Recover the maker
     * @todo refactor for subContract changes or modularize to be less messy
     */
    async recoverMaker(order: Order): Promise<string> {
        const _arguments = await this.orderGateway.makerArguments(order.subContract);
        return OrderSerializer.recoverMaker(order, _arguments);
    }

    /**
     * Recover the poster
     * @todo refactor for subContract changes or modularize to be less messy
     */
    async recoverPoster(order: PostableOrder): Promise<string> {
        const _arguments = await this.orderGateway.makerArguments(order.subContract);
        return OrderSerializer.recoverPoster(order, _arguments);
    }


}

export default OrderHelper;