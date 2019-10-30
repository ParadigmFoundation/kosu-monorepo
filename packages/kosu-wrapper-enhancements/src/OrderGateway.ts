import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { DeployedAddresses } from "@kosu/migrations";
import { OrderGatewayContract } from "@kosu/system-contracts";
import { KosuOptions } from "@kosu/types";

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
     * An instance of a 0x `Web3Wrapper` used for some RPC calls and for certain
     * methods.
     */
    public readonly web3Wrapper: Web3Wrapper;

    /**
     * A promise that resolves when initialization has completed successfully.
     */
    public readonly initializing: Promise<void>;

    /**
     * The address of the deployed OrderGateway contract for the detected network.
     */
    public address: string;

    /**
     * An instance of the lower-level contract wrapper for the Kosu OrderGateway,
     * auto-generated from the Solidity source code.
     */
    public contract: OrderGatewayContract;

    /**
     * Create a new OrderGateway instance.
     *
     * @param options Instantiation options (see `KosuOptions`).
     */
    constructor(options: KosuOptions) {
        this.web3Wrapper = options.web3Wrapper;
        this.initializing = this.init(options);
    }

    /**
     * Asynchronously initializes the instance after construction.
     *
     * @param options Instantiation options (see `KosuOptions` type).
     * @returns A promise to await complete instantiation for further calls
     */
    private async init(options: KosuOptions): Promise<void> {
        const networkId = options.networkId || (await options.web3Wrapper.getNetworkIdAsync());

        this.address = options.orderGatewayAddress;
        if (!this.address) {
            this.address = DeployedAddresses[networkId].OrderGateway.contractAddress;
        }
        if (!this.address) {
            /* istanbul ignore next */
            throw new Error("Invalid network for OrderGateway");
        }

        this.contract = new OrderGatewayContract(this.address, this.web3Wrapper.getProvider(), {
            from: await this.web3Wrapper.getAvailableAddressesAsync().then(addresses => addresses[0]),
        });
    }

    /**
     * Participate in a trade as a taker (or on behalf of one), by submitting the
     * maker order, and the Ethereum address of the taker. The fill transaction
     * is passed to the deployed OrderGateway contract and to the underlying
     * SubContract settlement logic.
     *
     * @param subContract The subContract address;
     * @param bytes The Kosu order serialized into subContract specific bytes.
     * @param taker The Ethereum address of the taker (should be available through provider).
     * @returns The boolean value indicating the status of the trade; `true` if the interaction was successful.
     */
    public async participate(subContract: string, bytes: string, taker: string): Promise<any> {
        await this.initializing;

        // execute tx
        const txId = await this.contract.participate.sendTransactionAsync(subContract, bytes, {
            from: taker,
        });
        return this.web3Wrapper.awaitTransactionSuccessAsync(txId);
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
     * @param subContract The subContract address;
     * @param bytes The Kosu order serialized into subContract specific bytes.
     */
    public async isValid(subContract: string, bytes: string): Promise<boolean> {
        await this.initializing;

        return this.contract.isValid.callAsync(subContract, bytes);
    }

    /**
     * Checks amount of partial exchange tokens remaining, depending on the
     * implementation of the SubContract specified in the supplied order.
     *
     * @param subContract The subContract address;
     * @param bytes The Kosu order serialized into subContract specific bytes.
     * @returns A `BigNumber` representing the number returned by the SubContract's
     * implementation of the `amountRemaining` method.
     */
    public async amountRemaining(subContract: string, bytes: string): Promise<BigNumber> {
        await this.initializing;
        return this.contract.amountRemaining.callAsync(subContract, bytes);
    }
}
