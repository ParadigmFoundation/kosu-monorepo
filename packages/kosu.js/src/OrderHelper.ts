import Web3 from "web3";

import { OrderGateway } from "./OrderGateway";
import { OrderSerializer } from "./OrderSerializer";
import { Signature } from "./Signature";

export class OrderHelper {
    private readonly orderGateway: OrderGateway;
    private readonly web3: Web3;

    constructor(web3: Web3, orderGateway: OrderGateway) {
        this.web3 = web3;
        this.orderGateway = orderGateway;
    }

    /**
     * Make an order by ensuring a required signature is  present
     * @todo refactoring subContract may effect this
     * @todo consider renaming
     */
    public async makeOrder(order: Order): Promise<Order> {
        order.makerSignature = await Signature.generate(this.web3, await this.makerHex(order), order.maker);
        order.makerValues.signature = order.makerSignature;

        return order;
    }

    /**
     * Take a prepared order on the ethereum blockchain
     */
    public async takeOrder(order: TakeableOrder, taker: string): Promise<any> {
        return this.orderGateway.participate(order, taker);
    }

    /**
     * Generate a poster signature for OrderStream submission
     * @todo refactor/move implementation.
     */
    public async prepareForPost(order: Order, poster: string = order.maker): Promise<PostableOrder> {
        return {
            ...order,
            posterSignature: await Signature.generate(
                this.web3,
                OrderSerializer.posterSignatureHex(
                    order,
                    order.arguments || (await this.orderGateway.arguments(order.subContract)),
                ),
                poster,
            ),
        };
    }

    /**
     * Generate the maker hex
     * @todo refactor for subContract changes or modularize to be less messy
     */
    public async makerHex(order: Order): Promise<string> {
        const _arguments = order.arguments || (await this.orderGateway.arguments(order.subContract));
        return OrderSerializer.makerHex(order, _arguments);
    }

    /**
     * Recover the maker
     * @todo refactor for subContract changes or modularize to be less messy
     */
    public async recoverMaker(order: Order): Promise<string> {
        const _arguments = order.arguments || (await this.orderGateway.arguments(order.subContract));
        return OrderSerializer.recoverMaker(order, _arguments);
    }

    /**
     * Recover the poster
     * @todo refactor for subContract changes or modularize to be less messy
     */
    public async recoverPoster(order: PostableOrder): Promise<string> {
        const _arguments = order.arguments || (await this.orderGateway.arguments(order.subContract));
        return OrderSerializer.recoverPoster(order, _arguments);
    }
}
