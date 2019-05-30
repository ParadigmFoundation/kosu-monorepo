const Web3 = require("web3");
const BigNumber = require("bignumber.js");
const EventEmitter = require("events");
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
     * Create a new `Gov` instance (`gov`). Requires no arguments, but can be
     * set to "debug" mode by passing `true` or `1` (or another truthy object to
     * the constructor).
     *
     * Prior to using most `gov` functionality, the async `gov.init()` method
     * must be called, which will initialize the module and load state from
     * the Kosu contract system.
     */
    constructor(debug) {
        // set to true after successful `gov.init()`
        this.initialized = false;

        // avg. blocks per day = 86400 sec/day / 13.5 (sec/block)
        this.blocksPerDay = 6400;

        // enables debug logs at various steps
        this.debug = debug ? true : false;

        this.validators = {};
        this.challenges = {};
        this.proposals = {};

        this.networkId = null;
        this.coinbase = null;

        this.kosu = null;
        this.web3 = null;

        this.initBlock = null;

        this.ee = new EventEmitter();
        this.init();
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
        };

        // process current listings from contract system
        const listings = await this.kosu.validatorRegistry.getListings();
        for (const listing of listings) {
            await this._processListing(listing);
        }
        const startupBlock = await this.web3.eth.getBlockNumber();
        this.kosu.eventEmitter.getFutureDecodedLogs(startupBlock + 1, this._handleEvents);
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
     * gov.weiToEther(100000000000000000000)   // > "100"
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
     * gov.etherToWei(10)  // > "10000000000000000000"
     * gov.etherToWei("1") // > "1000000000000000000"
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

    async _processListing(listing) {
        switch (listing.status) {
            case 1: {
                await this._processProposal(listing);
                break;
            }
            case 2: {
                await this._processValidator(listing);
                break;
            }
            case 3: {
                await this._processChallenge(listing);
                break;
            }
            case 4: {
                await this._processValidator(listing);
                break;
            }
            default: {
                console.error("unknown listing status");
            }
        }

        this._debugLog(`Raw listing:\n${JSON.stringify(listing, null, 2)}`);
    }

    // @todo implement "estimatedVotePower"
    async _processProposal(listing) {
        if (listing.status !== 1) {
            throw new Error("listing is not a proposal");
        }

        const owner = listing.owner;
        const acceptAt = parseInt(listing.applicationBlock) + this.params.applicationPeriod;
        const acceptUnix = await this.estimateFutureBlockTimestamp(acceptAt);
        const stakeSize = this.weiToEther(listing.stakedBalance);
        const dailyReward = this._estimateDailyReward(listing.rewardRate);
        const power = "0"; // @todo

        const proposal = {
            owner,
            stakeSize,
            dailyReward,
            power,
            details: listing.details,
            acceptUnix: acceptUnix.toString(),
        };

        this._addProposal(listing.tendermintPublicKey, proposal);
    }

    async _processValidator(listing) {
        if (listing.status !== 2 && listing.challengeId === 0) {
            throw new Error("listing is not a validator");
        }

        const owner = listing.owner;
        const stakeSize = this.weiToEther(listing.stakedBalance);
        const dailyReward = this._estimateDailyReward(listing.rewardRate);
        const power = "0"; // @todo

        const validator = {
            owner,
            stakeSize,
            dailyReward,
            power,
            details: listing.details,
        };

        this._addValidator(listing.tendermintPublicKey, validator);
    }

    async _processChallenge(listing) {
        if (listing.status !== 3) {
            throw new Error("listing is not in challenge");
        }

        let challengeType;
        if (listing.confirmationBlock === "0") {
            challengeType = "proposal";
        } else {
            challengeType = "validator";
        }

        this._debugLog(`Challenge type: ${challengeType}`);


        const listingChallenge = await this.kosu.validatorRegistry.getChallenge(listing.currentChallenge);
        const listingStake = this.weiToEther(listing.stakedBalance);
        const listingPower = "0"; // @todo
        const challengeEndUnix = await this.estimateFutureBlockTimestamp(listingChallenge.challengeEnd);


        const challenge = {
            listingOwner: listing.owner,
            listingStake,
            listingPower,
            challenger: listingChallenge.challenger,
            challengeId: listing.currentChallenge,
            challengerStake: listingChallenge.balance,
            challengeEndUnix,
            challengeType, // "proposal" or "validator"
            listingDetails: listing.details,
            challengeDetails: listingChallenge.details,
        };

        this._addChallenge(listing.tendermintPublicKey, challenge);
    }

    async _handleEvents(events) {
        for (const event of events) {
            const { decodedArgs } = event;
            switch (decodedArgs.eventType) {
                case "ValidatorRegistered":
                    const registeredListing = await this.kosu.validatorRegistry.getListing(decodedArgs.tendermintPublicKey);
                    await this._processProposal(registeredListing.tendermintPublicKey, registeredListing);
                    break;
                case "ValidatorChallenged":
                    const challengedListing = await this.kosu.validatorRegistry.getListing(decodedArgs.tendermintPublicKey);
                    delete this.proposals[challengedListing.tendermintPublicKey];
                    delete this.validators[challengedListing.tendermintPublicKey];
                    await this._processChallenge(challengedListing.tendermintPublicKey, challengedListing);
                    break;
                case "ValidatorRemoved":
                    const removedListing = await this.kosu.validatorRegistry.getListing(decodedArgs.tendermintPublicKey);
                    delete this.proposals[removedListing.tendermintPublicKey];
                    delete this.validators[removedListing.tendermintPublicKey];
                    delete this.challenges[removedListing.tendermintPublicKey];
                    break;
                case "ValidatorChallengeResolved":
                    const resolvedChallengeListing = await this.kosu.validatorRegistry.getListing(decodedArgs.tendermintPublicKey);
                    delete this.challenges[resolvedChallengeListing.tendermintPublicKey];
                    if (resolvedChallengeListing.status === 1) {
                        await this._processProposal(resolvedChallengeListing.tendermintPublicKey, resolvedChallengeListing)
                    } else if (resolvedChallengeListing.status === 2) {
                        await this._processValidator(resolvedChallengeListing.tendermintPublicKey, resolvedChallengeListing)
                    }
                    break;
                case "ValidatorConfirmed":
                    const confirmedListing = await this.kosu.validatorRegistry.getListing(decodedArgs.tendermintPublicKey);
                    delete this.proposals[confirmedListing.tendermintPublicKey];
                    await this._processValidator(confirmedListing.tendermintPublicKey, confirmedListing)
                    break;
                default:
                    console.warn(`Unrecognized eventType: ${eventType}`);
            }
        }
    }

    _addProposal(pubKey, proposal) {
        this.proposals[pubKey] = proposal;
        this.ee.emit("gov_newProposal", proposal);

        this._debugLog(`New proposal:\n${JSON.stringify(proposal, null, 2)}`);
    }

    _addValidator(pubKey, validator) {
        this.validators[pubKey] = validator;
        this.ee.emit("gov_newValidator", validator);

        this._debugLog(`New validator:\n${JSON.stringify(validator, null, 2)}`);
    }

    _addChallenge(pubKey, challenge) {
        this.challenges[pubKey] = challenge;
        this.ee.emit("gov_newChallenge", challenge);

        this._debugLog(`New challenge:\n${JSON.stringify(challenge, null, 2)}`);
    }

    _estimateDailyReward(rewardRate) {
        const rate = new BigNumber(rewardRate);
        const rewardPeriod = new BigNumber(this.params.rewardPeriod);
        const blocksPerDay = new BigNumber(this.blocksPerDay);
        const tokensPerBlock = rate.div(rewardPeriod);
        const tokensPerDay = tokensPerBlock.times(blocksPerDay);
        return this.weiToEther(tokensPerDay.toFixed());
    }

    _debugLog(message) {
        if (this.debug) {
            console.log(message);
        }
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
