import { Web3Wrapper } from "@0x/web3-wrapper";
import { artifacts } from "@kosu/system-contracts";
import { KosuOptions, KosuUtils } from "@kosu/types";
import { NULL_ADDRESS, toBytes32 } from "@kosu/utils";
import { EventEmitter, KosuToken, OrderGateway, PosterRegistry, Treasury, ValidatorRegistry, Voting } from "@kosu/wrapper-enhancements";
import Web3 from "web3";

import * as packageJson from "../package.json";

import { OrderHelper } from "./OrderHelper";
import { Signature } from "./Signature";

// tslint:disable-next-line: no-var-requires
const version = process.env.npm_package_version || packageJson.version;

/**
 * The `Kosu` class assists in interacting with the Kosu contract system and
 * network.
 *
 * Instances of the `Kosu` class (`kosu`) provide access to read and write
 * access to the Kosu contract system via the `web3` library and connection to
 * an Ethereum node, or remote provider (read-only).
 *
 * If a compatible Ethereum network is detected (there has been a deployment of
 * the Kosu contract system with the same `networkId`), JavaScript wrappers of
 * each contract will be instantiated and can used to interact will the deployed
 * contracts.
 */
export class Kosu {
    // WEB3

    /**
     * The primary `web3` instance provides access to an Ethereum node's JSONRPC
     * API and utilities. This instance is used to interact with each Kosu contract
     * wrapper and can be used to directly access the `web3` API.
     */
    public readonly web3: Web3;

    /**
     * The `web3Wrapper` is used for some extended features, and provides
     * a higher-level API to the same underlying `web3` provider. It it used to
     * manage the various deployed contracts ABI's.
     */
    public readonly web3Wrapper: Web3Wrapper;

    // KOSU CONTRACTS

    /**
     * The `orderGateway` instance provides access to the `OrderGateway` contract
     * which is used to direct settlement of orders to their corresponding
     * `SubContract` and underlying settlement logic.
     *
     * It can also be used to load the required `arguments` for a specific order
     * type, based on a `SubContract` address.
     */
    public readonly orderGateway: OrderGateway;

    /**
     * The `orderHelper` instance provides methods for generating and signing
     * maker orders, signing orders for submission to the Kosu network, and
     * submitting orders for settlement on the Ethereum blockchain via the
     * `OrderGateway` and the `SubContract` specified in the maker order.
     */
    public readonly orderHelper: OrderHelper;

    /**
     * The `kosuToken` provides methods for interacting with the KOSU ERC-20 token.
     */
    public readonly kosuToken: KosuToken;

    /**
     * The `treasury` instance provides access to functionality of the Kosu
     * `Treasury` contract, such as deposits/withdrawals and allowance management.
     */
    public readonly treasury: Treasury;

    /**
     * The `voting` instance provides access to the Kosu `voting` contract and
     * allows users to participate in voting on governance measures, and claiming
     * rewards for correctly participating in winning polls.
     */
    public readonly voting: Voting;

    /**
     * The `posterRegistry` instance enables users to interact with the Kosu
     * `PosterRegistry` contract to bond and un-bond KOSU tokens to access the
     * order relay feature of the Kosu network.
     */
    public readonly posterRegistry: PosterRegistry;

    /**
     * The `validatorRegistry` instance enables interaction with the `ValidatorRegistry`
     * token-curated registry system. The system enables users to submit proposals
     * to become validators and challenge existing validators and pending proposals.
     *
     * It also provides query access to past challenges and the current listings.
     */
    public readonly validatorRegistry: ValidatorRegistry;

    /**
     * The `eventEmitter` enables the query of and subscription to decoded event
     * logs from the Kosu `EventEmitter` contract.
     */
    public readonly eventEmitter: EventEmitter;

    // UTILS

    /**
     * Common and helpful utility methods and constants for interacting with the
     * Kosu contract system and Ethereum blockchain.
     */
    public readonly utils: KosuUtils;

    /**
     * The current `@kosu/kosu.js` package version.
     */
    public readonly version: string;

    /**
     * Create a new `kosu` instance and instantiate wrappers for each Kosu system
     * contract.
     *
     * If provided with no arguments, `kosu` will be generated in a read-only
     * state, with a default Ropsten test-network provider. Methods that query
     * constants and the state of the contract system will work, the submission
     * of transactions and generation of signatures will not be possible.
     *
     * @param options An options object used to configure `kosu` and the configured
     * contract instances. A custom `provider` may be supplied.
     */
    constructor(options: KosuOptions) {
        // Configuring web3
        this.web3 = new Web3(options.provider);
        this.web3Wrapper = new Web3Wrapper(options.provider);
        options.web3 = this.web3;
        options.web3Wrapper = this.web3Wrapper;

        for (const contractName of Object.keys(artifacts)) {
            this.web3Wrapper.abiDecoder.addABI(artifacts[contractName].compilerOutput.abi, contractName);
        }

        // Initializing contract objects
        this.orderGateway = new OrderGateway(options);
        this.kosuToken = new KosuToken(options);
        this.treasury = new Treasury(options, this.kosuToken);
        this.voting = new Voting(options, this.treasury);
        this.posterRegistry = new PosterRegistry(options, this.treasury);
        this.validatorRegistry = new ValidatorRegistry(options, this.treasury);
        this.orderHelper = new OrderHelper(this.web3, this.orderGateway);
        this.eventEmitter = new EventEmitter(options);

        // Utilities
        this.utils = { toBytes32, NULL_ADDRESS };
        this.version = version;
    }
}

export { Signature };
