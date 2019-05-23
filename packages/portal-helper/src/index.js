const Web3 = require("web3");

let {
    generatePseudoRandomSalt,    
    assetDataUtils,
    ContractWrappers,
    signatureUtils,
    orderHashUtils,
    BigNumber,
    ERC20ProxyWrapper,
    ERC20TokenWrapper
} = require("0x.js");

let { MetamaskSubprovider } = require("@0x/subproviders");
let { Web3Wrapper } = require("@0x/web3-wrapper");
const zeroExFormatter = require("paradigm-0x-contracts");
let { Signature, OrderSerializer } = require("@kosu/kosu.js");

// stores common token addresses
const addresses = require("./addresses.json");

// hard-coded 0x subcontract makerArguments
const ZRX_SUBCONTRACT_MAKER_ARGS = require("./zrx_subcontract_maker_args.json");

/**
 * Helper methods for building the Paradigm "Create" portal.
 */
class Create {
    constructor () {
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

    async init() {
        // connect metamask and use 
        await this._connectMetamask();

        // check networkId
        let networkId = await this.web3.eth.net.getId();

        // throw if not mainnet
        if (networkId !== 1) {
            throw new Error("wrong network");
        }

        // store user address
        this.coinbase = await this.web3.eth.getCoinbase();

        // 0x web3 and erc20 wrapper
        let web3Wrapper = new Web3Wrapper(this.web3.currentProvider);
        let erc20proxy = new ERC20ProxyWrapper(web3Wrapper, networkId);
        this.erc20TokenWrapper = new ERC20TokenWrapper(
            web3Wrapper,
            networkId,
            erc20proxy
        );

        // helpers for creating and signing 0x orders
        this.subProvider = new MetamaskSubprovider(this.web3.currentProvider);
        this.zeroExContracts = new ContractWrappers(this.subProvider, { networkId });
        this.EXCHANGE_ADDRESS = this.zeroExContracts.exchange.address;

        this.initialized = true;
    }

    // ORDER HELPERS

    /**
     * Generate and sign a 0x order. Will prompt user for a MetaMask signature.
     * 
     * @param {object} options object with the following properties:
     *   - makerAsset: either ("WETH/DAI/ZRX") or a full 42 char hex address
     *   - takerAsset: either ("WETH/DAI/ZRX") or a full 42 char hex address 
     *   - makerAssetAmount: units are wei, value can be string/number or BigNumber
     *   - takerAssetAmount: units are wei, value can be string/number or BigNumber 
     *   - orderDuration: the number of seconds the order should be valid for
     *   - makerAddress: *can* be provided to override coinbase, but shouldn't
     */
    async createAndSignOrder(options) {
     /* makerAssetAddress,
        makerAssetAmount,
        takerAssetAddress,
        takerAssetAmount,
        orderDuration,
        makerAddress = this.coinbase, 
    ) {*/
        const makerAddress = options.makerAddress || this.coinbase;

        const {
            makerAssetAddress,
            takerAssetAddress,
            makerAssetAmount,
            takerAssetAmount,
            orderDuration
        } = options;

        // turn order duration into expiry unix timestamp
        const getExpiration = (secondsFromNow) => {
            const nowSec = Math.floor(Date.now()/1000);
            const duration = parseInt(secondsFromNow.toString());
            const expirationTimeSeconds = nowSec + duration;
            return new BigNumber(expirationTimeSeconds);
        }

        // allows shorthand (instead of full address) for these tokens
        const parseCommonToken = (identifier) => {
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
        }

        /**
         * Will accept either a 42 char (including the '0x' prefix) Ethereum
         * address, or the ticker of a pre-loaded "common token":
         * - "ZRX" (0x protocol token)
         * - "WETH" (wrapped ether)
         * - "DAI" (dai stablecoin)
        */
        const loadAddress = (maybeAddress) => {
            if (maybeAddress.slice(0, 2) == "0x" && maybeAddress.length === 42) {
                return maybeAddress;
            } else if (["WETH", "DAI", "ZRX"].indexOf(maybeAddress) === -1) {
                return parseCommonToken(maybeAddress);
            } else {
                throw new Error("not and address or a common token.");
            }
        }

        // use address or load common token (ZRX/WETH/DAI) if short id supplied
        const makerAsset = loadAddress(makerAssetAddress);
        const takerAsset = loadAddress(takerAssetAddress);

        // construct raw order object
        const zeroExOrder = {
            // user fields
            makerAddress:           makerAddress,                  
            makerAssetAmount:       new BigNumber(makerAssetAmount), 
            takerAssetAmount:       new BigNumber(takerAssetAmount),
            expirationTimeSeconds:  getExpiration(orderDuration),
            makerAssetData:      assetDataUtils.encodeERC20AssetData(makerAsset),
            takerAssetData:      assetDataUtils.encodeERC20AssetData(takerAsset),
            
            // boilerplate fields
            makerFee:            new BigNumber(0),            
            takerFee:            new BigNumber(0),            
            salt:                generatePseudoRandomSalt(),  
            exchangeAddress:     this.EXCHANGE_ADDRESS,
            takerAddress:        this.NULL_ADDRESS,
            feeRecipientAddress: this.NULL_ADDRESS,     
            senderAddress:       this.NULL_ADDRESS,
        };

        // hash order (requires valid 0x order schema)
        let orderHash;
        try {
            orderHash = orderHashUtils.getOrderHashHex(zeroExOrder);
        } catch {
            throw new Error("invalid 0x order (check that the input values)");
        }

        // prompts for metamask signature of the order hash
        const signature = await signatureUtils.ecSignHashAsync(
            this.subProvider,
            orderHash,
            makerAddress,
            "DEFAULT"
        );

        const signedZeroExOrder = {
            ...zeroExOrder,
            signature
        };

        return signedZeroExOrder;
    }

    /**
     * 
     * @param {object} signedZeroExOrder as outputted from `createAndSignOrder`
     */
    async signAndPost(signedZeroExOrder) {
        const makerValues = zeroExFormatter(signedZeroExOrder);
        const kosuOrder = {
            maker: this.coinbase,
            subContract: this.ZRX_SUBCONTRACT_ADDRESS,
            makerValues
        }
        const posterHex = OrderSerializer.posterHex(
            order,
            ZRX_SUBCONTRACT_MAKER_ARGS
        );
        const signed = {
            ...kosuOrder,
            posterSignature: await Signature.generate(
                this.web3,
                posterHex,
                this.coinbase,
            ),
        };
        console.log(JSON.stringify(signed, null, 2));
    }

    /**
     * Converts a number (assumed to be number of tokens) as a string to 
     * units of wei, which must be used for generating 0x orders.
     * 
     * @param {string} etherAmount a number of tokens in full units (ether)
     * @returns {string} the same amount in wei
     */
    convertToWei(etherAmount) {
        return this.web3.utils.toWei(etherAmount);
    }

    /**
     * Converts a number (assumed to be number of tokens in wei) as a string to 
     * units of ether, which is more common to display to users.
     * 
     * @param {string} weiAmount a number of tokens in smallest units (wei)
     * @returns {string} the same amount in ether
     */
    convertToWei(weiAmount) {
        return this.web3.utils.fromWei(weiAmount);
    }

    // WETH (wrapped ether)

    /**
     * Returns a BigNumber representing the users WETH balance (in wei).
     * 
     * @param {string} userAddress override user's detected coinbase address
     */
    async getUserWethBalance(userAddress = this.coinbase) {
        return await this._getERC20Balance(userAddress, this.WETH_ADDRESS);
    }

    /**
     * Returns a BigNumber representing the users WETH allowance for the 0x
     * contract system.
     * 
     * @param {string} userAddress override user's detected coinbase address
     */
    async getUserWethAllowance(userAddress = this.coinbase) {
        return await this._getERC20ProxyAllowance(userAddress, this.WETH_ADDRESS);
    }

    /**
     * Sets an unlimited allowance for the 0x contract system for WETH.
     * 
     * @param {string} userAddress override user's detected coinbase address
     */
    async setProxyAllowanceWeth(userAddress = this.coinbase) {
        return await this._setUnlimitedERC20ProxyAllowance(
            userAddress,
            this.WETH_ADDRESS
        );
    }

    // ZRX 

    /**
     * Returns a BigNumber representing the users ZRX balance (in wei).
     * 
     * @param {string} userAddress override user's detected coinbase address
     */
    async getUserZrxBalance(userAddress = this.coinbase) {
        return await this._getERC20Balance(userAddress, this.ZRX_ADDRESS);
    }

    /**
     * Returns a BigNumber representing the users ZRX allowance for the 0x
     * contract system.
     * 
     * @param {string} userAddress override user's detected coinbase address
     */
    async getUserZrxAllowance(userAddress = this.coinbase) {
        return await this._getERC20ProxyAllowance(userAddress, this.ZRX_ADDRESS);
    }

    /**
     * Sets an unlimited allowance for the 0x contract system for ZRX.
     * 
     * @param {string} userAddress override user's detected coinbase address
     */
    async setProxyAllowanceZrx(userAddress = this.coinbase) {
        return await this._setUnlimitedERC20ProxyAllowance(
            userAddress,
            this.ZRX_ADDRESS
        );
    }

    // DAI

    /**
     * Returns a BigNumber representing the users DAI balance (in wei).
     * 
     * @param {string} userAddress override user's detected coinbase address
     */
    async getUserDaiBalance(userAddress = this.coinbase) {
        return await this._getERC20Balance(userAddress, this.DAI_ADDRESS);
    }

    /**
     * Returns a BigNumber representing the users DAI allowance for the 0x
     * contract system.
     * 
     * @param {string} userAddress override user's detected coinbase address
     */
    async getUserDaiAllowance(userAddress = this.coinbase) {
        return await this._getERC20ProxyAllowance(userAddress, this.DAI_ADDRESS);
    }

    /**
     * Sets an unlimited allowance for the 0x contract system for DAI.
     * 
     * @param {string} userAddress override user's detected coinbase address
     */
    async setProxyAllowanceDai(userAddress = this.coinbase) {
        return await this._setUnlimitedERC20ProxyAllowance(
            userAddress,
            this.DAI_ADDRESS
        );
    }

    // CUSTOM

    /**
     * Returns a BigNumber representing the users balance of a custom token, 
     * provided by token address.
     * 
     * @param {string} tokenAddress 0x-prefixed address of the custom token
     * @param {string} userAddress override user's detected coinbase address
     */
    async getUserCustomBalance(tokenAddress, userAddress = this.coinbase) {
        return await this._getERC20Balance(userAddress, tokenAddress);
    }

    /**
     * Returns a BigNumber representing the users allowance for the 0x
     * contract system of a custom token, provided by tokenAddress.
     * 
     * @param {string} tokenAddress 0x-prefixed address of the custom token
     * @param {string} userAddress override user's detected coinbase address
     */
    async getUserCustomAllowance(tokenAddress, userAddress = this.coinbase) {
        return await this._getERC20ProxyAllowance(userAddress, tokenAddress);
    }

    /**
     * Sets an unlimited allowance for the 0x contract system for the provided
     * custom token address (tokenAddress).
     * 
     * @param {string} tokenAddress 0x-prefixed address of the custom token
     * @param {string} userAddress override user's detected coinbase address
     */
    async setProxyAllowanceCustom(tokenAddress, userAddress = this.coinbase) {
        return await this._setUnlimitedERC20ProxyAllowance(
            userAddress,
            tokenAddress
        );
    }

    // INTERNAL

    async _getERC20Balance(user, token) {
        return await this.erc20TokenWrapper.getBalanceAsync(
            token,
            user
        );
    }

    async _getERC20ProxyAllowance(user, token) {
        return await this.erc20TokenWrapper.getProxyAllowanceAsync(
            token,
            user
        );
    }

    async _setUnlimitedERC20ProxyAllowance(user, token) {
        return await this.erc20TokenWrapper.setUnlimitedProxyAllowanceAsync(
            token,
            user
        );
    }

    async _connectMetamask() {
        if (typeof window.ethereum !== "undefined") {
            try {
                await window.ethereum.enable();
                this.web3 = new Web3(window.ethereum);
            } catch (error) {
                throw new Error(error);
            }
        } else if (typeof window.web3 !== "undefined") {
            this.web3 = new Web3(web3.currentProvider);
            global.web3 = this.web3;
        } else {
            throw new Error("non-ethereum browser detected");
        }
    }
}

module.exports = Create;
