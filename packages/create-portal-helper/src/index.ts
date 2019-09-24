import Web3 from "web3";

import {
    generatePseudoRandomSalt,
    assetDataUtils,
    ContractWrappers,
    signatureUtils,
    BigNumber,
    ERC20ProxyWrapper,
    ERC20TokenWrapper,
    SignedOrder,
} from "0x.js";

import { MetamaskSubprovider } from "@0x/subproviders";
import { Web3Wrapper, TransactionReceiptWithDecodedLogs } from "@0x/web3-wrapper";
import { OrderHelper, NodeClient } from "@kosu/kosu.js";

// stores common token addresses
import * as addresses from "./config/addresses.json";

// hard-coded 0x subcontract makerArguments
import * as ZRX_SUBCONTRACT_ARGS from "./config/zrx_subcontract_maker_args.json";

/**
 * Helper methods for building the Paradigm "Create" portal.
 */
class Create {
    public initialized: boolean;

    public NULL_ADDRESS: string;
    public WETH_ADDRESS: string;
    public ZRX_ADDRESS: string;
    public DAI_ADDRESS: string;
    public ZRX_SUBCONTRACT_ADDRESS: string;
    public EXCHANGE_ADDRESS: string;

    public node: NodeClient;
    public orderHelper: OrderHelper;
    public kosuNodeUrl: string;
    public web3: Web3;
    public web3Wrapper: Web3Wrapper;
    public subProvider: MetamaskSubprovider;
    public zeroExContracts: ContractWrappers;
    public erc20TokenWrapper: ERC20TokenWrapper;

    public coinbase: string;
    public gasPriceWei: BigNumber;

    /**
     * Construct a new `Create` instance. Accepts no arguments, and returns an
     * un-initialized instance.
     *
     * Most instance methods require `init()` to be called prior to use.
     */
    constructor(kosuNodeUrl: string = "wss://explore-api.kosu.io/jsonrpc") {
        // set to true after `init()` completes
        this.initialized = false;

        // connection to kosu RPC (setup in .init())
        this.kosuNodeUrl = kosuNodeUrl;

        // addresses for common tokens
        this.NULL_ADDRESS = addresses.NULL;
        this.WETH_ADDRESS = addresses.WETH;
        this.ZRX_ADDRESS = addresses.ZRX;
        this.DAI_ADDRESS = addresses.DAI;

        // used in creation of Kosu order
        this.ZRX_SUBCONTRACT_ADDRESS = addresses.ZRX_SUBCONTRACT;

        // will load to 0x exchange address
        this.EXCHANGE_ADDRESS = null;

        // will be loaded in `init()`
        this.node = null;
        this.orderHelper = null;
        this.web3 = null;
        this.web3Wrapper = null;
        this.coinbase = null;
        this.subProvider = null;
        this.zeroExContracts = null;
    }

    /**
     * Must be called prior to using most library functionality. Calling `init`
     * will trigger a Metamask pop-up prompting the user to approve access to
     * the web page.
     *
     * As such, `init()` should be the function call associated with the UX
     * "Connect to Metamask" button.
     *
     * Catching promise rejections from `init()` is required, and indicates
     * some bad user configuration. Certain rejections can be used to update
     * front-end state.
     *
     * Rejection cases:
     * - "wrong network": the user is not on the Ethereum main-network
     * - "user denied site access": the user clicked "deny" on Metamask pop-up
     * - "non-ethereum browser detected": user does not have a web3 browser
     */
    async init() {
        // connect metamask and use
        await this._connectMetamask();

        // check networkId
        let networkId = await this.web3.eth.net.getId();

        // throw if not mainnet
        /*
        if (networkId !== 1) {
            throw new Error("wrong network");
        }
        */

        // store user address
        this.coinbase = await this.web3.eth.getCoinbase();

        // 0x web3 and erc20 wrapper
        this.web3Wrapper = new Web3Wrapper(this.web3.currentProvider);
        let erc20proxy = new ERC20ProxyWrapper(this.web3Wrapper, networkId);
        this.erc20TokenWrapper = new ERC20TokenWrapper(this.web3Wrapper, networkId, erc20proxy);

        // helpers for creating and signing 0x orders
        this.subProvider = new MetamaskSubprovider(this.web3.currentProvider);
        this.zeroExContracts = new ContractWrappers(this.subProvider, { networkId });
        this.EXCHANGE_ADDRESS = this.zeroExContracts.exchange.address;

        // ropsten web3 provider required for check poster bond
        this.node = new NodeClient(this.kosuNodeUrl);
        this.orderHelper = new OrderHelper(this.web3, null);

        // get a reasonable gas price, use 5 if API fails
        const rawRes = await fetch("https://ethgasstation.info/json/ethgasAPI.json");
        const parsed = await rawRes.json();
        const gasPriceGwei = parsed["safeLow"] ? parsed["safeLow"].toString() : "5";
        this.gasPriceWei = new BigNumber(this.web3.utils.toWei(gasPriceGwei, "Gwei").toString());

        this.initialized = true;
    }

    // ORDER HELPERS

    /**
     * Generate and sign a 0x order. Will prompt user for a MetaMask signature.
     *
     * @param {object} options object with the following properties: </br>
     *   - makerAssetAddress: either ("WETH/DAI/ZRX") or a full 42 char hex address</br>
     *   - takerAssetAddress: either ("WETH/DAI/ZRX") or a full 42 char hex address</br>
     *   - makerAssetAmount: units are wei, value can be string/number or BigNumber</br>
     *   - takerAssetAmount: units are wei, value can be string/number or BigNumber</br>
     *   - orderDuration: the number of seconds the order should be valid for</br>
     *   - makerAddress: *can* be provided to override `coinbase`, but shouldn't</br>
     * @example
     * ```javascript
     * // create an order for 0.5 WETH <> 80 custom token, valid for 10 minutes
     * let order = await create.createAndSignOrder({
     *   makerAssetAddress: "WETH",
     *   takerAssetAddress: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
     *   makerAssetAmount: create.convertToWei("0.5"),
     *   takerAssetAmount: create.convertToWei("80"),
     *   orderDuration: 600
     * });
     * ```
     */
    async createAndSignOrder(options: {
        makerAssetAddress: string;
        takerAssetAddress: string;
        makerAssetAmount: string;
        takerAssetAmount: string;
        orderDuration: number;
        makerAddress?: string;
    }): Promise<SignedOrder> {
        const makerAddress = options.makerAddress || this.coinbase;

        const { makerAssetAddress, takerAssetAddress, makerAssetAmount, takerAssetAmount, orderDuration } = options;

        // so you don't see ugly errors due to missing parameters
        if (typeof options !== "object") {
            throw new Error("provide options object, not string or number");
        } else if (
            !(
                "makerAssetAddress" in options ||
                "takerAssetAddress" in options ||
                "makerAssetAmount" in options ||
                "takerAssetAmount" in options ||
                "orderDuration" in options
            )
        ) {
            throw new Error("missing required order parameters");
        }

        // turn order duration into expiry unix timestamp
        const getExpiration = secondsFromNow => {
            const nowSec = Math.floor(Date.now() / 1000);
            const duration = parseInt(secondsFromNow.toString());
            const expirationTimeSeconds = nowSec + duration;
            return new BigNumber(expirationTimeSeconds);
        };

        // allows shorthand (instead of full address) for these tokens
        const parseCommonToken = identifier => {
            switch (identifier) {
                case "WETH": {
                    return this.WETH_ADDRESS;
                }
                case "DAI": {
                    return this.DAI_ADDRESS;
                }
                case "ZRX": {
                    return this.ZRX_ADDRESS;
                }
                default: {
                    throw new Error("unsupported common token");
                }
            }
        };

        /**
         * Will accept either a 42 char (including the '0x' prefix) Ethereum
         * address, or the ticker of a pre-loaded "common token":
         * - "ZRX" (0x protocol token)
         * - "WETH" (wrapped ether)
         * - "DAI" (dai stablecoin)
         */
        const loadAddress = maybeAddress => {
            if (maybeAddress.slice(0, 2) == "0x" && maybeAddress.length === 42) {
                return maybeAddress;
            } else if (["WETH", "DAI", "ZRX"].indexOf(maybeAddress) !== -1) {
                return parseCommonToken(maybeAddress);
            } else {
                console.log(maybeAddress);
                throw new Error("not and address or a common token.");
            }
        };

        // use address or load common token (ZRX/WETH/DAI) if short id supplied
        const makerAsset = loadAddress(makerAssetAddress);
        const takerAsset = loadAddress(takerAssetAddress);

        // construct raw order object
        const zeroExOrder = {
            // user fields
            makerAddress: makerAddress,
            makerAssetAmount: new BigNumber(makerAssetAmount),
            takerAssetAmount: new BigNumber(takerAssetAmount),
            expirationTimeSeconds: getExpiration(orderDuration),
            makerAssetData: assetDataUtils.encodeERC20AssetData(makerAsset),
            takerAssetData: assetDataUtils.encodeERC20AssetData(takerAsset),

            // boilerplate fields
            makerFee: new BigNumber(0),
            takerFee: new BigNumber(0),
            salt: generatePseudoRandomSalt(),
            exchangeAddress: this.EXCHANGE_ADDRESS,
            takerAddress: this.NULL_ADDRESS,
            feeRecipientAddress: this.NULL_ADDRESS,
            senderAddress: this.NULL_ADDRESS,
        };

        // prompts for Metamask signature of the order hash
        let signedOrder;
        try {
            signedOrder = await signatureUtils.ecSignOrderAsync(this.subProvider, zeroExOrder, makerAddress);
        } catch {
            throw new Error("failed to sign order");
        }

        return signedOrder;
    }

    /**
     * Signs a (already signed) 0x order as the Kosu poster, and posts and order
     * to the Kosu network. Requires the poster to have a bonded amount of KOSU
     * in the `PosterRegistry` contract.
     *
     * @todo:
     *  - undo split-network ugly-ness
     *  - don't pull `makerArguments` from subcontract if provided
     *  - ability to use direct kosu.js to sign
     *
     * @param {object} signedZeroExOrder as outputted from `createAndSignOrder`
     */
    async signAndPost(signedZeroExOrder: SignedOrder): Promise<string> {
        const kosuOrder = {
            maker: this.coinbase,
            subContract: this.NULL_ADDRESS,
            makerValues: signedZeroExOrder,
            arguments: ZRX_SUBCONTRACT_ARGS,
        };
        const signedKosuOrder = await this.orderHelper.prepareForPost(kosuOrder, this.coinbase);

        const res: any = await this.node.addOrders([signedKosuOrder]);
        const { accepted, rejected } = res;

        if (rejected.length > 0) {
            throw new Error(`order rejected: ${rejected[0]["reason"]}`);
        } else {
            return accepted[0];
        }
    }

    /**
     * Converts a number (assumed to be number of tokens) as a string to
     * units of wei, which must be used for generating 0x orders.
     *
     * @param {string | BigNumber} etherAmount a number of tokens in full units (ether)
     * @returns {Promise<string>} the same amount in wei
     * @example
     * ```javascript
     * // convert 100 tokens (as entered by user) to wei
     * create.convertToWei("100")  // > "100000000000000000000" (BigNumber)
     * create.convertToWei(100)    // > "100000000000000000000" (BigNumber)
     * ```
     */
    convertToWei(etherAmount: string | BigNumber): string {
        return this.web3.utils.toWei(etherAmount.toString());
    }

    /**
     * Converts a number (assumed to be number of tokens in wei) as a string to
     * units of ether, which is more common to display to users.
     *
     * @param {string | BigNumber} weiAmount a number of tokens in smallest units (wei)
     * @returns {Promise<string>} the same amount in ether
     * @example
     * ```javascript
     * // convert 100 tokens (as received as balance or allowance) to tokens
     * create.convertToWei("100000000000000000000")  // > "100" (BigNumber)
     * create.convertToWei(100000000000000000000)    // > "100" (BigNumber)
     * ```
     */
    convertFromWei(weiAmount: string | BigNumber): string {
        return this.web3.utils.fromWei(weiAmount.toString());
    }

    /**
     * Returns `true` if the inputted string is a valid Ethereum address, otherwise
     * returns `false`.
     *
     * @param {string} address a string to be validated as an Ethereum address
     * @returns {boolean} `true` if valid Ethereum address, otherwise `false`
     * @example
     * ```javascript
     * create.isValidAddress("0x4f833a24e1f95d70f028921e27040ca56e09ab0b")  // > true
     * create.isValidAddress("4f833a24e1f95d70f028921e27040ca56e09ab0b")    // > false
     * create.isValidAddress("0x4f833a24e1f95d70f028921e27040ca56e09ab0")   // > false
     * ```
     */
    isValidAddress(address: string): boolean {
        return /^0x[a-fA-F0-9]{40}$/.test(address.toString());
    }

    /**
     * Check if the user (by their `coinbase` address) is allowed to post to the
     * Kosu network. Returns `true` if they are, and `false` if they are not.
     *
     * @param {string} userAddress can be provided to override coinbase, but shouldn't
     * @returns {Promise<boolean>} `true` if user has active bond, `false` otherwise
     */
    async userHasBond(userAddress: string = this.coinbase): Promise<boolean> {
        try {
            const { limit } = await this.node.queryPoster(userAddress.toLowerCase());
            if (limit > 0) {
                return true;
            }
            return false;
        } catch {
            return false;
        }
    }

    /**
     * Async function that returns a promise that resolves when the supplied txID
     * is mined and executed successfully. If the transaction fails, the promise
     * will reject. The resolved object is a full receipt that can usually be
     * ignored. The purpose of this method is to simply wait until a transaction
     * is successfully mined.
     *
     * @param {string} txID 32 byte (64-char) 0x-prefixed transaction hash
     * @returns the full decoded transaction receipt (usually will not need)
     * @example
     * ```javascript
     * const txId = await create.setProxyAllowanceWeth();
     *
     * // wait for the transaction to be mined, show loading icon, etc.
     * await create.awaitTransactionSuccessOrThrow(txId);
     * ```
     */
    async awaitTransactionSuccessOrThrow(txID: string): Promise<TransactionReceiptWithDecodedLogs> {
        if (!/^0x[a-fA-F0-9]{64}$/.test(txID)) {
            throw new Error("invalid transaction hash (txID)");
        }
        return await this.web3Wrapper.awaitTransactionSuccessAsync(txID);
    }

    // WETH (wrapped ether)

    /**
     * Returns a BigNumber representing the users WETH balance (in wei).
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<BigNumber>} the user's WETH balance in `wei`
     */
    async getUserWethBalance(userAddress: string = this.coinbase): Promise<BigNumber> {
        return await this._getERC20Balance(userAddress, this.WETH_ADDRESS);
    }

    /**
     * Returns a BigNumber representing the users WETH allowance for the 0x
     * contract system.
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<BigNumber>} the user's 0x proxy WETH allowance in `wei`
     */
    async getUserWethAllowance(userAddress: string = this.coinbase): Promise<BigNumber> {
        return await this._getERC20ProxyAllowance(userAddress, this.WETH_ADDRESS);
    }

    /**
     * Sets an unlimited allowance for the 0x contract system for WETH.
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {string} the transaction hash of the resulting tx
     */
    async setProxyAllowanceWeth(userAddress: string = this.coinbase): Promise<string> {
        return await this._setUnlimitedERC20ProxyAllowance(userAddress, this.WETH_ADDRESS);
    }

    // ZRX

    /**
     * Returns a BigNumber representing the users ZRX balance (in wei).
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<BigNumber>} the user's ZRX balance in `wei`
     */
    async getUserZrxBalance(userAddress: string = this.coinbase): Promise<BigNumber> {
        return await this._getERC20Balance(userAddress, this.ZRX_ADDRESS);
    }

    /**
     * Returns a BigNumber representing the users ZRX allowance for the 0x
     * contract system.
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<BigNumber>} the user's 0x proxy ZRX allowance in `wei`
     */
    async getUserZrxAllowance(userAddress: string = this.coinbase): Promise<BigNumber> {
        return await this._getERC20ProxyAllowance(userAddress, this.ZRX_ADDRESS);
    }

    /**
     * Sets an unlimited allowance for the 0x contract system for ZRX.
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<string>} the transaction hash of the resulting tx
     */
    async setProxyAllowanceZrx(userAddress: string = this.coinbase): Promise<string> {
        return await this._setUnlimitedERC20ProxyAllowance(userAddress, this.ZRX_ADDRESS);
    }

    // DAI

    /**
     * Returns a BigNumber representing the users DAI balance (in wei).
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<BigNumber>} the user's DAI balance in `wei`
     */
    async getUserDaiBalance(userAddress: string = this.coinbase): Promise<BigNumber> {
        return await this._getERC20Balance(userAddress, this.DAI_ADDRESS);
    }

    /**
     * Returns a BigNumber representing the users DAI allowance for the 0x
     * contract system.
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<BigNumber>} the user's 0x proxy DAI allowance in `wei`
     */
    async getUserDaiAllowance(userAddress: string = this.coinbase): Promise<BigNumber> {
        return await this._getERC20ProxyAllowance(userAddress, this.DAI_ADDRESS);
    }

    /**
     * Sets an unlimited allowance for the 0x contract system for DAI.
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<string>} the transaction hash of the resulting tx
     */
    async setProxyAllowanceDai(userAddress: string = this.coinbase): Promise<string> {
        return await this._setUnlimitedERC20ProxyAllowance(userAddress, this.DAI_ADDRESS);
    }

    // CUSTOM

    /**
     * Returns a BigNumber representing the users balance of a custom token,
     * provided by token address.
     *
     * @param {string} tokenAddress 0x-prefixed address of the custom token
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<BigNumber>} the user's balance in `wei` of custom token
     * @example
     * ```javascript
     * const balance = await create.getUserCustomBalance(
     *   "0x4f833a24e1f95d70f028921e27040ca56e09ab0b"
     * );
     * ```
     */
    async getUserCustomBalance(tokenAddress: string, userAddress: string = this.coinbase): Promise<BigNumber> {
        return await this._getERC20Balance(userAddress, tokenAddress);
    }

    /**
     * Returns a BigNumber representing the users allowance for the 0x
     * contract system of a custom token, provided by tokenAddress.
     *
     * @param {string} tokenAddress 0x-prefixed address of the custom token
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<BigNumber>} the user's 0x proxy allowance in `wei` for custom token
     * @example
     * ```javascript
     * const allowance = await create.getUserCustomAllowance(
     *   "0x4f833a24e1f95d70f028921e27040ca56e09ab0b"
     * );
     * ```
     */
    async getUserCustomAllowance(tokenAddress: string, userAddress: string = this.coinbase): Promise<BigNumber> {
        return await this._getERC20ProxyAllowance(userAddress, tokenAddress);
    }

    /**
     * Sets an unlimited allowance for the 0x contract system for the provided
     * custom token address (tokenAddress).
     *
     * @param {string} tokenAddress 0x-prefixed address of the custom token
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<string>} the transaction hash of the resulting tx
     * @example
     * ```javascript
     * await create.setProxyAllowanceCustom(
     *   "0x4f833a24e1f95d70f028921e27040ca56e09ab0b"
     * );
     * ```
     */
    async setProxyAllowanceCustom(tokenAddress: string, userAddress: string = this.coinbase): Promise<string> {
        return await this._setUnlimitedERC20ProxyAllowance(userAddress, tokenAddress);
    }

    // Internal implementation methods

    async _getERC20Balance(user: string, token: string): Promise<BigNumber> {
        return await this.erc20TokenWrapper.getBalanceAsync(token, user);
    }

    async _getERC20ProxyAllowance(user: string, token: string): Promise<BigNumber> {
        return await this.erc20TokenWrapper.getProxyAllowanceAsync(token, user);
    }

    async _setUnlimitedERC20ProxyAllowance(user: string, token: string): Promise<string> {
        return await this.erc20TokenWrapper.setUnlimitedProxyAllowanceAsync(token, user, {
            gasPrice: this.gasPriceWei,
        });
    }

    async _connectMetamask() {
        if (typeof (window as any).ethereum !== "undefined") {
            try {
                await (window as any).ethereum.enable();
                this.web3 = new Web3((window as any).ethereum);
            } catch (error) {
                console.log(error);
                throw new Error("user denied site access");
            }
        } else if (typeof (window as any).web3 !== "undefined") {
            this.web3 = new Web3((window as any).web3.currentProvider);
            (global as any).web3 = this.web3;
        } else {
            throw new Error("non-ethereum browser detected");
        }
    }
}

module.exports = Create;
