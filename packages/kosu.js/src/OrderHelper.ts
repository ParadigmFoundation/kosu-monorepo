import Web3 from "web3";

import { OrderGateway } from "./OrderGateway";
import { OrderSerializer } from "./OrderSerializer";
import { Signature } from "./Signature";

/**
 * The `OrderHelper` provides methods for interacting with maker orders, such as
 * participating in trades (as a taker), signing maker order's for execution and
 * for submission to the Kosu relay network.
 *
 * Requires a configured `web3` provider that allows signatures and the execution
 * of transactions.
 */
export class OrderHelper {
    /**
     * An instance of `web3` used to interact with the Ethereum blockchain.
     */
    private readonly web3: Web3;

    /**
     * Instance of the `OrderGateway` wrapper.
     */
    private readonly orderGateway: OrderGateway;

    /**
     * Create a new `OrderHelper` instance (requires a provider via supplied `web3`
     * instance).
     *
     * @param web3 An instance of `Web3` with an active node provider.
     * @param orderGateway An instantiated `OrderGateway` wrapper.
     */
    constructor(web3: Web3, orderGateway: OrderGateway) {
        this.web3 = web3;
        this.orderGateway = orderGateway;
    }

    /**
     * Sign and complete a maker order (requires a pre-configured Order object).
     *
     * @param order Order to sign as a maker.
     * @returns The supplied maker order with an appended `makerSignature`.
     */
    public async makeOrder(order: Order): Promise<Order> {
        if (order.maker === undefined) {
            order.maker = await this.web3.eth.getCoinbase();
        }
        order.makerSignature = await Signature.generate(this.web3, await this.makerHex(order), order.maker);
        order.makerValues.signature = order.makerSignature;

        return order;
    }

    /**
     * Take a signed maker order on the Ethereum blockchain via the order's
     * specified SubContract, from the supplied taker address (should be available
     * via configured `web` provider).
     *
     * @param order A signed and fillable maker order object.
     * @param taker The Ethereum address of the taker (must be available to sign via provider).
     * @returns The value defined by the order's SubContract implementation, usually `true`
     * for successfully filled orders, and `false` for failed fills.
     */
    public async takeOrder(order: TakeableOrder, taker: string): Promise<any> {
        return this.orderGateway.participate(order, taker);
    }

    /**
     * Sign and order as a poster and append the poster signature to an order
     * prior to submission to the Kosu relay network.
     *
     * @param order Order to prepare (by appending a poster signature).
     * @param poster Poster address to sign order with, defaults to the order's maker.
     * @returns The maker order now signed and prepared for post with an appended `posterSignature`.
     */
    public async prepareForPost(order: Order, poster: string = order.maker): Promise<PostableOrder> {
        if (order.arguments === undefined) {
            order.arguments = await this.orderGateway.arguments(order.subContract);
        }

        return {
            ...order,
            posterSignature: await Signature.generate(
                this.web3,
                OrderSerializer.posterSignatureHex(
                    order,
                    order.arguments,
                ),
                poster || await this.web3.eth.getCoinbase(),
            ),
        };
    }

    /**
     * Generate the maker hex (serialized `makerValues`).
     *
     * @param order Order to get maker hex for
     */
    public async makerHex(order: Order): Promise<string> {
        const _arguments = order.arguments || (await this.orderGateway.arguments(order.subContract));
        return OrderSerializer.makerHex(order, _arguments);
    }

    /**
     * Recover the maker address from a signed order.
     *
     * @param order A signed order to recover maker address from.
     */
    public async recoverMaker(order: Order): Promise<string> {
        const _arguments = order.arguments || (await this.orderGateway.arguments(order.subContract));
        return OrderSerializer.recoverMaker(order, _arguments);
    }

    /**
     * Recover the poster address from a maker order that has been signed from a
     * poster.
     *
     * @param order Order to recover poster from (must be signed by a poster).
     */
    public async recoverPoster(order: PostableOrder): Promise<string> {
        const _arguments = order.arguments || (await this.orderGateway.arguments(order.subContract));
        return OrderSerializer.recoverPoster(order, _arguments);
    }

    /**
     * Generates the contract submission bytes from the arguments of provided order.
     *
     * @param order Order to generate contract input bytes for.
     */
    public async serialize(order: Order): Promise<string> {
        const _arguments = order.arguments || (await this.orderGateway.arguments(order.subContract));
        return OrderSerializer.serialize(_arguments, order);
    }
}
