import {Order, PostableOrder} from "./types";
import OrderGateway from "./OrderGateway";
import Signature from "./Signature";
import Web3 from "web3";
import OrderSerializer from "./OrderSerializer";


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
        order.makerSignature = await Signature.generate(this.web3, OrderSerializer.makerHex(order, await this.orderGateway.makerArguments(order.subContract)), order.maker);
        return order;
    }

    /**
     *
     */
    async prepareForPost(order: Order, poster: string): Promise<PostableOrder> {
        return {
            ...order,
            posterSignature: await Signature.generate(this.web3, OrderSerializer.posterHex(order, await this.orderGateway.makerArguments(order.subContract)), poster)
        };
    }
}

export default OrderHelper;