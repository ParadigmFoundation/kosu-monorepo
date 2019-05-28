const Web3 = require("web3");
const BigNumber = require("bignumber.js");
const { Kosu } = require("@kosu/kosu.js");

/**
 * `Gov` is a helper library for interacting with the Kosu validator governance
 * system (primarily the Kosu `ValidatorRegistry` contract).
 * 
 * It is designed with the browser in mind, and is intended to be used in front-
 * end projects for simplifying interaction with the governance system.
 */
class Gov {

    /**
     * Create a new `Gov` instance (`gov`). Requires no arguments.
     * 
     * Prior to using most `gov` functionality, the async `gov.init()` method
     * must be called, which will initialize the module and load state from
     * the Kosu contract system.
     */
    constructor() {
        // set to true after successful `gov.init()`
        this.initialized = false;

        // Avg. blocks per day = 86400 sec/day / 13.5 (sec/block)
        this.blocksPerDay = 6400;

        this.validators = {};
        this.challenges = {};
        this.proposals = {};

        this.networkId = null;
        this.coinbase = null;

        this.kosu = null;
        this.web3 = null;

        this.initBlock = null;
    }

    /**
     * Main initialization function for the `gov` module. You must call `init`
     * prior to interacting with most module functionality, and `gov.init()` will
     * load the current registry status (validators, proposals, etc.) so it should
     * be called early-on in the page lifecycle.
     * 
     * Performs many functions, including:
     * - prompt user to connect MetaMask
     * - load user's address (the "coinbase")
     * - load the current Ethereum block height
     * - load and process the latest ValidatorRegistry state
     */
    async init() {
        // will prompt user to allow site access
        await this._connectMetamask();

        // netId, coinbase, and initBlock from Metamask provider
        this.networkId = await this.web3.eth.net.getId();
        this.coinbase = await this.web3.eth.getCoinbase();
        this.initBlock = await this.web3.eth.getBlockNumber();

        // kosu instance for interacting with Kosu contracts
        this.kosu = new Kosu({ provider: this.web3.currentProvider });

        // parameters from ValidatorRegistry
        this.params = {
            applicationPeriod: (await this.kosu.validatorRegistry.applicationPeriod()).toNumber(),
            commitPeriod: (await this.kosu.validatorRegistry.commitPeriod()).toNumber(),
            challengePeriod: (await this.kosu.validatorRegistry.challengePeriod()).toNumber(),
            exitPeriod: (await this.kosu.validatorRegistry.exitPeriod()).toNumber(),
            rewardPeriod: (await this.kosu.validatorRegistry.rewardPeriod()).toNumber(),
        }

        // temp
        const listings = await this.kosu.validatorRegistry.getListings();
        this._processListings(listings);
    }

    /**
     * Convert a number of tokens, denominated in the smallest unit - "wei" - to
     * "full" units, called "ether". One ether = 1*10^18 wei.
     * 
     * All contract calls require amounts in wei, but the user should be shown
     * amounts in ether.
     * 
     * @param {BigNumber | string | number} wei the token amount in wei to convert
     * @returns {string} the same amount in ether, string used for precision
     * @example
     * ```javascript
     * gov.weiToEther("100000000000000000000") // > "100"
     * ```
     */
    weiToEther(wei) {
        return this.web3.utils.fromWei(wei.toString());
    }

    /**
     * Convert a number of tokens (full units, called "ether") to "wei", the
     * smallest denomination of most ERC-20 tokens with 18 decimals.
     * 
     * All contract calls require amounts in wei, but the user should be shown
     * amounts in ether.
     * 
     * @param {BigNumber | string | number} ether the token amount to convert
     * @returns {string} the same amount in wei, string used for precision
     * @example
     * ```javascript
     * gov.etherToWei(10) // > "10000000000000000000"
     * ```
     */
    etherToWei(ether) {
        return this.web3.utils.toWei(ether.toString());
    }

    /**
     * Estimate the UNIX timestamp (in seconds) at which a given `block` will be
     * mined.
     * 
     * @param {number} block the block number to estimate the timestamp for
     * @returns {number} the block's estimated UNIX timestamp (in seconds)
     * @example
     * ```javascript
     * const block = 6102105;
     * const unixTs = gov.estimateFutureBlockTimestamp(block);
     * 
     * // use as a normal date object (multiply by 1000 to get ms)
     * const blockDate = new Date(ts * 1000);
     * ```
     */
    async estimateFutureBlockTimestamp(block) {
        const nowUnixSec = Math.floor(Date.now() / 1000);
        const currentBlock = await this.web3.eth.getBlockNumber();
        const diff = parseInt(block) - currentBlock;
        if (diff < 0) {
            throw new Error("block has been mined");
        }
        const estSeconds = diff * 13.5;
        const ts = Math.floor(nowUnixSec + estSeconds);
        return ts;
    }

    _processListings(listings) {
        for (const listing of listings) {
            switch (listing.status) {
                case 1: {
                    this._processProposal(listing);
                    break;
                }
                case 2: {
                    console.log("validator");
                    break;
                }
                case 3: {
                    console.log("in challenge");
                    break;
                }
                case 4: {
                    console.log("exiting");
                    break;
                }
                default: {
                    console.error("unknown listing status");
                }
            }
        }
    }

    // @todo implement "estimatedVotePower"
    async _processProposal(listing) {
        if (listing.status !== 1) {
            throw new Error("listing is not a proposal");
        }

        const owner = listing.owner;
        const acceptAt = parseInt(listing.applicationBlock) + this.params.applicationPeriod;
        const acceptUnix = await this._estimateFutureBlockTimestamp(acceptAt);
        const stakeSize = this.weiToEther(listing.stakedBalance);
        const dailyReward = this.estimateDailyReward(listing.rewardRate);
        const power = "0" // @todo

        const proposal = {
            owner,
            stakeSize,
            dailyReward,
            power,
            acceptUnix: acceptUnix.toString(),
        };

        console.log(JSON.stringify(listing, null, 2));
    }

    _estimateDailyReward(rewardRate) {
        const rate = new BigNumber(rewardRate);
        const rewardPeriod = new BigNumber(this.params.rewardPeriod);
        const blocksPerDay = new BigNumber(this.blocksPerDay);
        const tokensPerBlock = rate.div(rewardPeriod);
        const tokensPerDay = tokensPerBlock.times(blocksPerDay);
        return this.weiToEther(tokensPerDay.integerValue());
    }

    async _connectMetamask() {
        if (typeof window.ethereum !== "undefined") {
            try {
                await window.ethereum.enable();
                this.web3 = new Web3(window.ethereum);
            } catch (error) {
                throw new Error("user denied site access");
            }
        } else if (typeof window.web3 !== "undefined") {
            this.web3 = new Web3(web3.currentProvider);
            global.web3 = this.web3;
        } else {
            throw new Error("non-ethereum browser detected");
        }
    }
}

module.exports = Gov;