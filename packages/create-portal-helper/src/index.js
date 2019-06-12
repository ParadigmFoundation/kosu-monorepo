"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const _0x_js_1 = require("0x.js");
const subproviders_1 = require("@0x/subproviders");
const web3_wrapper_1 = require("@0x/web3-wrapper");
const kosu_js_1 = require("@kosu/kosu.js");
// stores common token addresses
const addresses = __importStar(require("./config/addresses.json"));
// hard-coded 0x subcontract makerArguments
const ZRX_SUBCONTRACT_MAKER_ARGS = __importStar(require("./config/zrx_subcontract_maker_args.json"));
/**
 * Helper methods for building the Paradigm "Create" portal.
 */
class Create {
    /**
     * Construct a new `Create` instance. Accepts no arguments, and returns an
     * un-initialized instance.
     *
     * Most instance methods require `init()` to be called prior to use.
     */
    constructor() {
        // set to true after `init()` completes
        this.initialized = false;
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
        this.kosu = null;
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
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // connect metamask and use
            yield this._connectMetamask();
            // check networkId
            let networkId = yield this.web3.eth.net.getId();
            // throw if not mainnet
            /*
            if (networkId !== 1) {
                throw new Error("wrong network");
            }
            */
            // store user address
            this.coinbase = yield this.web3.eth.getCoinbase();
            // 0x web3 and erc20 wrapper
            this.web3Wrapper = new web3_wrapper_1.Web3Wrapper(this.web3.currentProvider);
            let erc20proxy = new _0x_js_1.ERC20ProxyWrapper(this.web3Wrapper, networkId);
            this.erc20TokenWrapper = new _0x_js_1.ERC20TokenWrapper(this.web3Wrapper, networkId, erc20proxy);
            // helpers for creating and signing 0x orders
            this.subProvider = new subproviders_1.MetamaskSubprovider(this.web3.currentProvider);
            this.zeroExContracts = new _0x_js_1.ContractWrappers(this.subProvider, { networkId });
            this.EXCHANGE_ADDRESS = this.zeroExContracts.exchange.address;
            // ropsten web3 provider required for check poster bond
            this.kosu = new kosu_js_1.Kosu();
            // get a reasonable gas price, use 5 if API fails
            const rawRes = yield fetch("https://ethgasstation.info/json/ethgasAPI.json");
            const parsed = yield rawRes.json();
            const gasPriceGwei = parsed["safeLow"] ? parsed["safeLow"].toString() : "5";
            this.gasPriceWei = new _0x_js_1.BigNumber(this.web3.utils.toWei(gasPriceGwei, "Gwei"));
            this.initialized = true;
        });
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
    createAndSignOrder(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const makerAddress = options.makerAddress || this.coinbase;
            const { makerAssetAddress, takerAssetAddress, makerAssetAmount, takerAssetAmount, orderDuration } = options;
            // so you don't see ugly errors due to missing parameters
            if (typeof options !== "object") {
                throw new Error("provide options object, not string or number");
            }
            else if (!("makerAssetAddress" in options ||
                "takerAssetAddress" in options ||
                "makerAssetAmount" in options ||
                "takerAssetAmount" in options ||
                "orderDuration" in options)) {
                throw new Error("missing required order parameters");
            }
            // turn order duration into expiry unix timestamp
            const getExpiration = secondsFromNow => {
                const nowSec = Math.floor(Date.now() / 1000);
                const duration = parseInt(secondsFromNow.toString());
                const expirationTimeSeconds = nowSec + duration;
                return new _0x_js_1.BigNumber(expirationTimeSeconds);
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
                }
                else if (["WETH", "DAI", "ZRX"].indexOf(maybeAddress) !== -1) {
                    return parseCommonToken(maybeAddress);
                }
                else {
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
                makerAssetAmount: new _0x_js_1.BigNumber(makerAssetAmount),
                takerAssetAmount: new _0x_js_1.BigNumber(takerAssetAmount),
                expirationTimeSeconds: getExpiration(orderDuration),
                makerAssetData: _0x_js_1.assetDataUtils.encodeERC20AssetData(makerAsset),
                takerAssetData: _0x_js_1.assetDataUtils.encodeERC20AssetData(takerAsset),
                // boilerplate fields
                makerFee: new _0x_js_1.BigNumber(0),
                takerFee: new _0x_js_1.BigNumber(0),
                salt: _0x_js_1.generatePseudoRandomSalt(),
                exchangeAddress: this.EXCHANGE_ADDRESS,
                takerAddress: this.NULL_ADDRESS,
                feeRecipientAddress: this.NULL_ADDRESS,
                senderAddress: this.NULL_ADDRESS,
            };
            // prompts for Metamask signature of the order hash
            let signedOrder;
            try {
                signedOrder = yield _0x_js_1.signatureUtils.ecSignOrderAsync(this.subProvider, zeroExOrder, makerAddress);
            }
            catch (_a) {
                throw new Error("failed to sign order");
            }
            return signedOrder;
        });
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
    signAndPost(signedZeroExOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const makerValues = this._formatZeroExOrder(signedZeroExOrder);
            const kosuOrder = {
                maker: this.coinbase,
                subContract: this.ZRX_SUBCONTRACT_ADDRESS,
                makerValues,
            };
            const posterSignature = yield kosu_js_1.Signature.generate(this.web3, kosu_js_1.OrderSerializer.posterHex(kosuOrder, ZRX_SUBCONTRACT_MAKER_ARGS), this.coinbase);
            const signedKosuOrder = Object.assign({}, kosuOrder, { posterSignature });
            console.log(JSON.stringify(signedKosuOrder, null, 2));
            return "1234";
        });
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
    convertToWei(etherAmount) {
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
    convertFromWei(weiAmount) {
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
    isValidAddress(address) {
        return /^0x[a-fA-F0-9]{40}$/.test(address.toString());
    }
    /**
     * Check if the user (by their `coinbase` address) is allowed to post to the
     * Kosu network. Returns `true` if they are, and `false` if they are not.
     *
     * @param {string} userAddress can be provided to override coinbase, but shouldn't
     * @returns {Promise<boolean>} `true` if user has active bond, `false` otherwise
     */
    userHasBond(userAddress = this.coinbase) {
        return __awaiter(this, void 0, void 0, function* () {
            const bond = yield this.kosu.posterRegistry.tokensRegisteredFor(userAddress);
            if (bond.gt(0)) {
                return true;
            }
            return false;
        });
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
    awaitTransactionSuccessOrThrow(txID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!/^0x[a-fA-F0-9]{64}$/.test(txID)) {
                throw new Error("invalid transaction hash (txID)");
            }
            return yield this.web3Wrapper.awaitTransactionSuccessAsync(txID);
        });
    }
    // WETH (wrapped ether)
    /**
     * Returns a BigNumber representing the users WETH balance (in wei).
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<BigNumber>} the user's WETH balance in `wei`
     */
    getUserWethBalance(userAddress = this.coinbase) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._getERC20Balance(userAddress, this.WETH_ADDRESS);
        });
    }
    /**
     * Returns a BigNumber representing the users WETH allowance for the 0x
     * contract system.
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<BigNumber>} the user's 0x proxy WETH allowance in `wei`
     */
    getUserWethAllowance(userAddress = this.coinbase) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._getERC20ProxyAllowance(userAddress, this.WETH_ADDRESS);
        });
    }
    /**
     * Sets an unlimited allowance for the 0x contract system for WETH.
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {string} the transaction hash of the resulting tx
     */
    setProxyAllowanceWeth(userAddress = this.coinbase) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._setUnlimitedERC20ProxyAllowance(userAddress, this.WETH_ADDRESS);
        });
    }
    // ZRX
    /**
     * Returns a BigNumber representing the users ZRX balance (in wei).
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<BigNumber>} the user's ZRX balance in `wei`
     */
    getUserZrxBalance(userAddress = this.coinbase) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._getERC20Balance(userAddress, this.ZRX_ADDRESS);
        });
    }
    /**
     * Returns a BigNumber representing the users ZRX allowance for the 0x
     * contract system.
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<BigNumber>} the user's 0x proxy ZRX allowance in `wei`
     */
    getUserZrxAllowance(userAddress = this.coinbase) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._getERC20ProxyAllowance(userAddress, this.ZRX_ADDRESS);
        });
    }
    /**
     * Sets an unlimited allowance for the 0x contract system for ZRX.
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<string>} the transaction hash of the resulting tx
     */
    setProxyAllowanceZrx(userAddress = this.coinbase) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._setUnlimitedERC20ProxyAllowance(userAddress, this.ZRX_ADDRESS);
        });
    }
    // DAI
    /**
     * Returns a BigNumber representing the users DAI balance (in wei).
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<BigNumber>} the user's DAI balance in `wei`
     */
    getUserDaiBalance(userAddress = this.coinbase) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._getERC20Balance(userAddress, this.DAI_ADDRESS);
        });
    }
    /**
     * Returns a BigNumber representing the users DAI allowance for the 0x
     * contract system.
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<BigNumber>} the user's 0x proxy DAI allowance in `wei`
     */
    getUserDaiAllowance(userAddress = this.coinbase) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._getERC20ProxyAllowance(userAddress, this.DAI_ADDRESS);
        });
    }
    /**
     * Sets an unlimited allowance for the 0x contract system for DAI.
     *
     * @param {string} userAddress override user's detected coinbase address
     * @returns {Promise<string>} the transaction hash of the resulting tx
     */
    setProxyAllowanceDai(userAddress = this.coinbase) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._setUnlimitedERC20ProxyAllowance(userAddress, this.DAI_ADDRESS);
        });
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
    getUserCustomBalance(tokenAddress, userAddress = this.coinbase) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._getERC20Balance(userAddress, tokenAddress);
        });
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
    getUserCustomAllowance(tokenAddress, userAddress = this.coinbase) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._getERC20ProxyAllowance(userAddress, tokenAddress);
        });
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
    setProxyAllowanceCustom(tokenAddress, userAddress = this.coinbase) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._setUnlimitedERC20ProxyAllowance(userAddress, tokenAddress);
        });
    }
    // Internal implementation methods
    _getERC20Balance(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.erc20TokenWrapper.getBalanceAsync(token, user);
        });
    }
    _getERC20ProxyAllowance(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.erc20TokenWrapper.getProxyAllowanceAsync(token, user);
        });
    }
    _setUnlimitedERC20ProxyAllowance(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.erc20TokenWrapper.setUnlimitedProxyAllowanceAsync(token, user, {
                gasPrice: this.gasPriceWei,
            });
        });
    }
    _connectMetamask() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof window.ethereum !== "undefined") {
                try {
                    yield window.ethereum.enable();
                    this.web3 = new web3_1.default(window.ethereum);
                }
                catch (error) {
                    console.log(error);
                    throw new Error("user denied site access");
                }
            }
            else if (typeof window.web3 !== "undefined") {
                this.web3 = new web3_1.default(window.web3.currentProvider);
                global.web3 = this.web3;
            }
            else {
                throw new Error("non-ethereum browser detected");
            }
        });
    }
    _formatZeroExOrder(signedOrder) {
        const makerAsset = signedOrder.makerAssetData.substr(2).match(/.{1,64}/g);
        const takerAsset = signedOrder.takerAssetData.substr(2).match(/.{1,64}/g);
        const signature = signedOrder.signature.substr(2).match(/.{1,64}/g);
        signedOrder.makerAssetData0 = `0x${makerAsset[0]}`;
        signedOrder.makerAssetData1 = `0x${makerAsset[1]}`;
        signedOrder.takerAssetData0 = `0x${takerAsset[0]}`;
        signedOrder.takerAssetData1 = `0x${takerAsset[1]}`;
        signedOrder.signature0 = `0x${signature[0]}`;
        signedOrder.signature1 = `0x${signature[1]}`;
        signedOrder.signature2 = `0x${signature[2]}`;
        return signedOrder;
    }
}
module.exports = Create;
