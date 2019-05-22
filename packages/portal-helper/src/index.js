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

// let { MetamaskSubprovider } = require("@0x/subproviders");

let { Web3Wrapper } = require("@0x/web3-wrapper");

// stores common token addresses
const addresses = require("./addresses.json");

class Create {
    constructor () {
        this.initialized = false;
        this.kosu = null;
        this.web3 = null;
        this.web3Wrapper = null;
        this.coinbase = null;
    }

    async init() {
        // connect metamask and use 
        await this.connectMetamask();

        // check networkId
        let netId = await this.web3.eth.net.getId();

        // throw if not mainnet
        if (netId !== 1) {
            throw new Error("wrong network");
        }

        // store user address
        this.coinbase = await this.web3.eth.getCoinbase();

        // 0x web3 and erc20 wrapper
        let web3Wrapper = new Web3Wrapper(this.web3.currentProvider);
        let erc20proxy = new ERC20ProxyWrapper(web3Wrapper, 1);
        this.erc20TokenWrapper = new ERC20TokenWrapper(web3Wrapper, 1, erc20proxy);

        this.initialized = true;
    }

    async connectMetamask() {
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

    // WETH (wrapped ether)

    async getUserWethBalance(userAddress = this.coinbase) {
        return await this._getERC20Balance(userAddress, addresses.WETH);
    }

    async getUserWethAllowance(userAddress = this.coinbase) {
        return await this.erc20TokenWrapper.getProxyAllowanceAsync(
            addresses.WETH,
            userAddress
        )
    }

    async setProxyAllowanceWeth(userAddress = this.coinbase) {
        return await this._setUnlimitedERC20ProxyAllowance(
            userAddress,
            addresses.WETH
        );
    }

    // ZRX 

    async getUserZrxBalance(userAddress = this.coinbase) {
        return await this._getERC20Balance(userAddress, addresses.ZRX);
    }

    async getUserZrxAllowance(userAddress = this.coinbase) {
        return await this._getERC20ProxyAllowance(userAddress, addresses.ZRX);
    }

    async setProxyAllowanceZrx(userAddress = this.coinbase) {
        return await this._setUnlimitedERC20ProxyAllowance(
            userAddress,
            addresses.ZRX
        );
    }

    // DAI

    async getUserDaiBalance(userAddress = this.coinbase) {
        return await this._getERC20Balance(userAddress, addresses.DAI);
    }

    async getUserDaiAllowance(userAddress = this.coinbase) {
        return await this._getERC20ProxyAllowance(userAddress, addresses.DAI);
    }

    async setProxyAllowanceDai(userAddress = this.coinbase) {
        return await this._setUnlimitedERC20ProxyAllowance(
            userAddress,
            addresses.DAI
        );
    }

    // CUSTOM

    async getUserCustomBalance(userAddress = this.coinbase, tokenAddress) {
        return await this._getERC20Balance(userAddress, tokenAddress);
    }

    async getUserCustomAllowance(userAddress = this.coinbase, tokenAddress) {
        return await this._getERC20ProxyAllowance(userAddress, tokenAddress);
    }

    async setProxyAllowanceCustom(userAddress = this.coinbase, tokenAddress) {
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
}

module.exports = Create;
