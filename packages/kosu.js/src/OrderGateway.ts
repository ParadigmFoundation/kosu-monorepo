import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { artifacts, DeployedAddresses, OrderGatewayContract } from "@kosu/system-contracts";
import Web3 from "web3";

import { OrderSerializer } from "./OrderSerializer";

/**
 * Integration with OrderGateway contract on an Ethereum blockchain.
 */
export class OrderGateway {
    private readonly web3: Web3;
    private readonly initializing: Promise<void>;
    private readonly web3Wrapper: Web3Wrapper;
    private address: string;
    private contract: OrderGatewayContract;

    /**
     * Create a new OrderGateway instance.
     *
     * @param options instantiation options
     */
    constructor(options: KosuOptions) {
        this.web3 = options.web3;
        this.web3Wrapper = options.web3Wrapper;
        this.address = options.orderGatewayAddress;
        this.initializing = this.init(options);
    }

    /**
     * Asyncronously initializes the instance after construction
     *
     * @param options instantiation options
     * @returns A promise to await complete instantiation for further calls
     */
    private async init(options: KosuOptions): Promise<void> {
        const networkId = options.networkId || (await options.web3.eth.net.getId());
        const abi = artifacts.OrderGateway.compilerOutput.abi;

        if (!this.address) {
            this.address = DeployedAddresses[networkId].OrderGateway;
        }
        if (!this.address) {
            throw new Error("Invalid network for OrderGateway");
        }

        this.contract = new OrderGatewayContract(abi, this.address, this.web3.currentProvider, {
            from: await this.web3.eth.getCoinbase().catch(() => undefined),
        });
    }

    /**
     * Participate in the terms of an order
     *
     * @param order A Kosu order
     * @param takerValues Taker values to fulfill the order
     * @param taker address of the taker
     * @todo refactor makerData types after possible pending changes
     */
    public async participate(order: Order, taker: string): Promise<any> {
        await this.initializing;
        const args = await this.arguments(order.subContract);
        const participateBytes = OrderSerializer.serialize(args, order);

        // tslint:disable-next-line: await-promise
        return this.contract.participate.sendTransactionAsync(
            order.subContract,
            participateBytes,
            { from: taker },
        ).then(txHash => this.web3Wrapper.awaitTransactionSuccessAsync(txHash));
    }

    /**
     * Read maker arguments
     *
     * @param subContract Address of deployed contract implementation
     */
    public async arguments(subContract: string): Promise<any> {
        await this.initializing;
        return JSON.parse(await this.contract.arguments.callAsync(subContract));
    }

    /**
     * Checks validity of order data
     *
     * @param order Kosu order to validate
     * @todo refactor makerData types after possible pending changes
     */
    public async isValid(order: Order): Promise<boolean> {
        await this.initializing;
        const args = await this.arguments(order.subContract);
        const makerValuesBytes = OrderSerializer.serialize(args, order);

        return this.contract.isValid.callAsync(order.subContract, makerValuesBytes);
    }

    /**
     * Checks amount of partial exchange tokens remaining
     *
     * @param order Kosu order to validate
     * @todo refactor makerData types after possible pending changes
     */
    public async amountRemaining(order: Order): Promise<BigNumber> {
        await this.initializing;
        const args = await this.arguments(order.subContract);
        const makerValuesBytes = OrderSerializer.serialize(args, order);

        return this.contract.amountRemaining.callAsync(order.subContract, makerValuesBytes);
    }
}
