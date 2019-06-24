import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { artifacts, DeployedAddresses, OrderGatewayContract } from "@kosu/system-contracts";
import Web3 from "web3";

import { OrderSerializer } from "./OrderSerializer";

/**
 * Integration with OrderGateway contract on an Ethereum blockchain.\
 *
 * Instances of the `OrderGateway` class are able to communicate with the deployed
 * OrderGateway contract for the detected network. Can be used to participate in
 * trades (executing maker orders) or to call methods on deployed `SubContract`
 * implementations, such as checking the fillable amount remaining for an order,
 * or checking the validity of a maker order.
 *
 * This class is also used to load the required `arguments` for maker order's
 * specified SubContract during serialization and signature generation.
 */
export class OrderGateway {
    /**
     * An instance of `web3` used to interact with the Ethereum blockchain.
     */
    private readonly web3: Web3;

    /**
     * An instance of a 0x `Web3Wrapper` used for some RPC calls and for certain
     * methods.
     */
    private readonly web3Wrapper: Web3Wrapper;

    /**
     * A promise that resolves when initialization has completed successfully.
     */
    private readonly initializing: Promise<void>;

    /**
     * The address of the deployed OrderGateway contract for the detected network.
     */
    private address: string;

    /**
     * An instance of the lower-level contract wrapper for the Kosu OrderGateway,
     * auto-generated from the Solidity source code.
     */
    private contract: OrderGatewayContract;

    /**
     * Create a new OrderGateway instance.
     *
     * @param options Instantiation options (see `KosuOptions`).
     */
    constructor(options: KosuOptions) {
        this.web3 = options.web3;
        this.web3Wrapper = options.web3Wrapper;
        this.address = options.orderGatewayAddress;
        this.initializing = this.init(options);
    }

    /**
     * Asynchronously initializes the instance after construction.
     *
     * @param options Instantiation options (see `KosuOptions` type).
     * @returns A promise to await complete instantiation for further calls
     */
    private async init(options: KosuOptions): Promise<void> {
        const networkId = options.networkId || (await options.web3.eth.net.getId());
        const abi = artifacts.OrderGateway.compilerOutput.abi;

        if (!this.address) {
            this.address = DeployedAddresses[networkId].OrderGateway;
        }
        if (!this.address) {
            /* istanbul ignore next */
            throw new Error("Invalid network for OrderGateway");
        }

        this.contract = new OrderGatewayContract(abi, this.address, this.web3.currentProvider, {
            from: await this.web3.eth.getCoinbase().catch(
                /* istanbul ignore next */
                () => undefined,
            ),
        });
    }

    /**
     * Participate in a trade as a taker (or on behalf of one), by submitting the
     * maker order, and the Ethereum address of the taker. The fill transaction
     * is passed to the deployed OrderGateway contract and to the underlying
     * SubContract settlement logic.
     *
     * @param order A signed Kosu maker order object with a valid `subContract`.
     * @param takerValues Taker values to fulfill the maker order.
     * @param taker The Ethereum address of the taker (should be available through provider).
     * @returns The boolean value indicating the status of the trade; `true` if the interaction was successful.
     */
    public async participate(order: Order, taker: string): Promise<any> {
        await this.initializing;

        // get arguments and serialize
        const args = await this.arguments(order.subContract);
        const participateBytes = OrderSerializer.serialize(args, order);

        // execute tx
        const txId = await this.contract.participate.sendTransactionAsync(order.subContract, participateBytes, {
            from: taker,
        });
        const receipt = await this.web3Wrapper.awaitTransactionSuccessAsync(txId);
        return receipt;
    }

    /**
     * Read the required arguments from a deployed SubContract.
     *
     * @param subContract Address of deployed contract implementation
     * @returns The JSON array that defines the arguments for the SubContract.
     */
    public async arguments(subContract: string): Promise<any> {
        await this.initializing;
        let args;
        try {
            args = await this.contract.arguments.callAsync(subContract);

            return JSON.parse(args);
        } catch (error) {
            throw new Error(`Unable to load arguments from contract: ${error.message}`);
        }
    }

    /**
     * Checks validity of order data according the order's SubContract implementation.
     *
     * @param order Kosu order to validate against `isValid` implementation.
     */
    public async isValid(order: Order): Promise<boolean> {
        await this.initializing;
        const args = await this.arguments(order.subContract);
        const makerValuesBytes = OrderSerializer.serialize(args, order);

        return this.contract.isValid.callAsync(order.subContract, makerValuesBytes);
    }

    /**
     * Checks amount of partial exchange tokens remaining, depending on the
     * implementation of the SubContract specified in the supplied order.
     *
     * @param order The Kosu order to check amount remaining for.
     * @returns A `BigNumber` representing the number returned by the SubContract's
     * implementation of the `amountRemaining` method.
     */
    public async amountRemaining(order: Order): Promise<BigNumber> {
        await this.initializing;
        const args = await this.arguments(order.subContract);
        const makerValuesBytes = OrderSerializer.serialize(args, order);

        return this.contract.amountRemaining.callAsync(order.subContract, makerValuesBytes);
    }
}
