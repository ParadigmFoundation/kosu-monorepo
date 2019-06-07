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
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const events_1 = require("events");
const kosu_js_1 = require("@kosu/kosu.js");
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
        this.ee = new events_1.EventEmitter();
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
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // will prompt user to allow site access
            yield this._connectMetamask();
            // netId, coinbase, and initBlock from Metamask provider
            this.networkId = yield this.web3.eth.net.getId();
            this.coinbase = yield this.web3.eth.getCoinbase();
            this.initBlock = yield this.web3.eth.getBlockNumber();
            // kosu instance for interacting with Kosu contracts
            this.kosu = new kosu_js_1.Kosu({ provider: this.web3.currentProvider });
            // parameters from ValidatorRegistry
            this.params = {
                applicationPeriod: (yield this.kosu.validatorRegistry.applicationPeriod()).toNumber(),
                commitPeriod: (yield this.kosu.validatorRegistry.commitPeriod()).toNumber(),
                challengePeriod: (yield this.kosu.validatorRegistry.challengePeriod()).toNumber(),
                exitPeriod: (yield this.kosu.validatorRegistry.exitPeriod()).toNumber(),
                rewardPeriod: (yield this.kosu.validatorRegistry.rewardPeriod()).toNumber(),
            };
            // process current listings from contract system
            const listings = yield this.kosu.validatorRegistry.getAllListings();
            for (const listing of listings) {
                yield this._processListing(listing);
            }
            this.kosu.eventEmitter.getFutureDecodedLogs(this.initBlock + 1, this._handleEvents.bind(this));
        });
    }
    /**
     * Convert a number of tokens, denominated in the smallest unit - "wei" - to
     * "full" units, called "ether". One ether = 1*10^18 wei.
     *
     * All contract calls require amounts in wei, but the user should be shown
     * amounts in ether.
     *
     * @param {BigNumber | string } wei the token amount in wei to convert
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
     * @param {BigNumber | string} ether the token amount to convert
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
     * @param {number} blockNumber the block number to estimate the timestamp for
     * @returns {Promise<number>} the block's estimated UNIX timestamp (in seconds)
     * @example
     * ```javascript
     * const block = 6102105;
     * const unixTs = gov.estimateFutureBlockTimestamp(block);
     *
     * // use as a normal date object (multiply by 1000 to get ms)
     * const blockDate = new Date(ts * 1000);
     * ```
     */
    estimateFutureBlockTimestamp(blockNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const nowUnixSec = Math.floor(Date.now() / 1000);
            const currentBlock = yield this.web3.eth.getBlockNumber();
            // don't throw if historical block, just return  the real timestamp
            if (currentBlock > blockNumber) {
                return this.getPastBlockTimestamp(blockNumber);
            }
            // blockTime depends on networkId
            let blockTimeSeconds;
            const netId = yield this.web3.eth.net.getId();
            switch (netId) {
                // mainnet
                case 1:
                    blockTimeSeconds = 13.5;
                    break;
                // ropsten
                case 3:
                    blockTimeSeconds = 15;
                    break;
                // kosu-poa dev net
                case 6174:
                    blockTimeSeconds = 2;
                    break;
                default: {
                    throw new Error("unknown blockTime for current network");
                }
            }
            const diff = parseInt(blockNumber.toString()) - currentBlock;
            const estSeconds = diff * blockTimeSeconds;
            return Math.floor(nowUnixSec + estSeconds);
        });
    }
    /**
     * Retrieve the Unix timestamp of a block that has already been mined.
     * Should be used to display times of things that have happened (validator
     * confirmed, etc.).
     *
     * @param {number} blockNumber the block to get the unix timestamp for
     * @returns {number} the Unix timestamp of the specified `blockNumber`
     * @example
     * ```javascript
     * await gov.getPastBlockTimestamp(515237) // > 1559346404
     * ```
     */
    getPastBlockTimestamp(blockNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            let block;
            try {
                block = yield this.web3.eth.getBlock(blockNumber);
            }
            catch (error) {
                throw new Error(`failed to get timestamp: ${error.message}`);
            }
            return block.timestamp;
        });
    }
    /**
     * This method returns an array (described below) that contains information
     * about all past challenges. Intended to be used for the "Past Challenges"
     * section.
     *
     * @returns {Promise<Array<PastChallenge>>} all historical `challenges`.
     */
    getHistoricalChallenges() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.kosu.validatorRegistry.getAllChallenges().then(a => a.reverse());
        });
    }
    _processListing(listing) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (listing.status) {
                case 1: {
                    yield this._processProposal(listing);
                    break;
                }
                case 2: {
                    yield this._processValidator(listing);
                    break;
                }
                case 3: {
                    yield this._processChallenge(listing);
                    break;
                }
                case 4: {
                    yield this._processValidator(listing);
                    break;
                }
                default: {
                    console.error("unknown listing status");
                }
            }
            this._debugLog(`Raw listing:\n${JSON.stringify(listing, null, 2)}`);
        });
    }
    _processProposal(listing) {
        return __awaiter(this, void 0, void 0, function* () {
            if (listing.status !== 1) {
                throw new Error("listing is not a proposal");
            }
            const owner = listing.owner;
            const stakeSize = listing.stakedBalance;
            const acceptAt = parseInt(listing.applicationBlock) + this.params.applicationPeriod;
            const acceptUnix = yield this.estimateFutureBlockTimestamp(acceptAt);
            const dailyReward = this._estimateDailyReward(listing.rewardRate);
            const power = this._estimateProposalPower(listing.stakedBalance);
            const proposal = {
                owner,
                stakeSize,
                dailyReward,
                power,
                details: listing.details,
                acceptUnix: acceptUnix,
            };
            this._addProposal(listing.tendermintPublicKey, proposal);
        });
    }
    _processValidator(listing) {
        return __awaiter(this, void 0, void 0, function* () {
            if (listing.status !== 2 && listing.challengeId === 0) {
                throw new Error("listing is not a validator");
            }
            const owner = listing.owner;
            const stakeSize = listing.stakedBalance;
            const dailyReward = this._estimateDailyReward(listing.rewardRate);
            // power is set after update
            const power = null;
            const validator = {
                owner,
                stakeSize,
                dailyReward,
                power,
                details: listing.details,
            };
            delete this.proposals[listing.tendermintPublicKeyHex];
            this._addValidator(listing.tendermintPublicKey, validator);
        });
    }
    _processChallenge(listing) {
        return __awaiter(this, void 0, void 0, function* () {
            delete this.proposals[listing.tendermintPublicKeyHex];
            delete this.validators[listing.tendermintPublicKeyHex];
            if (listing.status !== 3) {
                throw new Error("listing is not in challenge");
            }
            let challengeType;
            if (listing.confirmationBlock.toString() === "0") {
                challengeType = "proposal";
            }
            else {
                challengeType = "validator";
            }
            this._debugLog(`Challenge type: ${challengeType}`);
            const listingChallenge = yield this.kosu.validatorRegistry.getChallenge(listing.currentChallenge);
            const listingStake = listing.stakedBalance;
            // copy over listing power if validator challenge
            const listingPower = challengeType === "validator" ? yield this._getValidatorPower(listing.tendermintPublicKey) : null;
            const challengeEndUnix = yield this.estimateFutureBlockTimestamp(listingChallenge.challengeEnd);
            let totalTokens, winningTokens, result;
            if (challengeEndUnix <= Math.floor(Date.now() / 1000)) {
                totalTokens = yield this.kosu.voting.totalRevealedTokens(listingChallenge.pollId);
                winningTokens = yield this.kosu.voting.totalWinningTokens(listingChallenge.pollId);
                result = yield this.kosu.voting
                    .winningOption(listingChallenge.pollId)
                    .then(option => (option.toString() === "1" ? "passed" : "failed"));
            }
            const challenge = {
                listingOwner: listing.owner,
                listingStake,
                listingPower,
                challenger: listingChallenge.challenger,
                challengeId: listing.currentChallenge,
                challengerStake: listingChallenge.balance,
                challengeEndUnix,
                totalTokens,
                winningTokens,
                result,
                challengeType,
                listingDetails: listing.details,
                challengeDetails: listingChallenge.details,
            };
            this._addChallenge(listing.tendermintPublicKey, challenge);
        });
    }
    _processResolvedChallenge(pubKey, listing) {
        return __awaiter(this, void 0, void 0, function* () {
            delete this.challenges[pubKey];
            if (listing.status === 1) {
                yield this._processProposal(listing);
            }
            else if (listing.status === 2) {
                yield this._processValidator(listing);
            }
        });
    }
    _handleEvents(events) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const event of events) {
                const { decodedArgs } = event;
                this._debugLog(`Handling event: ${JSON.stringify(decodedArgs)}`);
                switch (decodedArgs.eventType) {
                    case "ValidatorRegistered":
                        const registeredListing = yield this._getListing(decodedArgs.tendermintPublicKey);
                        this._debugLog(`Event type: ${decodedArgs.eventType}\nListing: ${JSON.stringify(registeredListing)}`);
                        yield this._processProposal(registeredListing);
                        break;
                    case "ValidatorChallenged":
                        const challengedListing = yield this._getListing(decodedArgs.tendermintPublicKey);
                        this._debugLog(`Event type: ${decodedArgs.eventType}\nListing: ${JSON.stringify(challengedListing)}`);
                        yield this._processChallenge(challengedListing);
                        break;
                    case "ValidatorRemoved":
                        const removedListing = yield this._getListing(decodedArgs.tendermintPublicKey);
                        this._debugLog(`Event type: ${decodedArgs.eventType}\nListing: ${JSON.stringify(removedListing)}`);
                        this._removeValidator(decodedArgs.tendermintPublicKeyHex);
                        break;
                    case "ValidatorChallengeResolved":
                        const resolvedChallengeListing = yield this._getListing(decodedArgs.tendermintPublicKey);
                        this._debugLog(`Event type: ${decodedArgs.eventType}\nListing: ${JSON.stringify(resolvedChallengeListing)}`);
                        this._processResolvedChallenge(decodedArgs.tendermintPublicKeyHex, resolvedChallengeListing);
                        break;
                    case "ValidatorConfirmed":
                        const confirmedListing = yield this._getListing(decodedArgs.tendermintPublicKey);
                        this._debugLog(`Event type: ${decodedArgs.eventType}\nListing: ${JSON.stringify(confirmedListing)}`);
                        yield this._processValidator(confirmedListing);
                        break;
                    case "ValidatorRegistryUpdate":
                        break;
                    default:
                        console.warn(`Unrecognized eventType: ${decodedArgs.eventType}`);
                }
            }
        });
    }
    _getListing(pubKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.kosu.validatorRegistry.getListing(pubKey);
        });
    }
    _getValidatorPower(pubKey) {
        return __awaiter(this, void 0, void 0, function* () {
            let cache = {};
            let power, stake;
            if (!/^0x[a-faF0-9]{64}$/.test(pubKey)) {
                throw new Error("invalid public key");
            }
            const listings = yield this.kosu.validatorRegistry.getListings();
            listings.forEach(listing => {
                cache[listing.tendermintPublicKey] = listing;
            });
            const listing = cache[pubKey];
            if (!listing || listing.confirmationBlock.eq(Gov.ZERO)) {
                return "0";
            }
            let totalStake = new bignumber_js_1.default(0);
            Object.keys(cache).forEach(id => {
                const lst = cache[id];
                if (lst.confirmationBlock.eq(Gov.ZERO)) {
                    return;
                }
                const stake = new bignumber_js_1.default(cache[id].stakedBalance);
                totalStake = totalStake.plus(stake);
            });
            stake = new bignumber_js_1.default(cache[pubKey].stakedBalance);
            power = stake.div(totalStake).times(Gov.ONE_HUNDRED);
            return power;
        });
    }
    _addProposal(pubKey, proposal) {
        this.proposals[pubKey] = proposal;
        this.ee.emit("gov_update");
        this._debugLog(`New proposal:\n${JSON.stringify(proposal, null, 2)}`);
    }
    _addValidator(pubKey, validator) {
        delete this.proposals[pubKey];
        this.validators[pubKey] = validator;
        this._updateVotePowers();
        this.ee.emit("gov_update");
        this._debugLog(`New validator:\n${JSON.stringify(validator, null, 2)}`);
    }
    _removeValidator(pubKey) {
        delete this.proposals[pubKey];
        delete this.validators[pubKey];
        delete this.challenges[pubKey];
        this.ee.emit("gov_update");
    }
    _addChallenge(pubKey, challenge) {
        this.challenges[pubKey] = challenge;
        this.ee.emit("gov_update");
        this._debugLog(`New challenge:\n${JSON.stringify(challenge, null, 2)}`);
    }
    _estimateProposalPower(stake) {
        const stakeBn = new bignumber_js_1.default(stake);
        const totalStake = this._getTotalStake();
        const newTotal = totalStake.plus(stakeBn);
        const power = stakeBn.div(newTotal);
        return power.times(Gov.ONE_HUNDRED);
    }
    _estimateDailyReward(rewardRate) {
        const rate = new bignumber_js_1.default(rewardRate);
        const rewardPeriod = new bignumber_js_1.default(this.params.rewardPeriod);
        const tokensPerBlock = rate.div(rewardPeriod);
        const tokensPerDay = tokensPerBlock.times(Gov.BLOCKS_PER_DAY);
        return tokensPerDay.toFixed();
    }
    _updateVotePowers() {
        const totalStake = this._getTotalStake();
        Object.keys(this.validators).forEach(id => {
            const validator = this.validators[id];
            const stake = new bignumber_js_1.default(validator.stakeSize);
            const power = stake.div(totalStake).times(Gov.ONE_HUNDRED);
            validator.power = power.toString();
        });
    }
    _getTotalStake() {
        let totalStake = new bignumber_js_1.default(0);
        Object.keys(this.validators).forEach(id => {
            const validator = this.validators[id];
            const stake = new bignumber_js_1.default(validator.stakeSize);
            totalStake = totalStake.plus(stake);
        });
        Object.keys(this.challenges).forEach(id => {
            const challenge = this.challenges[id];
            if (challenge.challengeType === "validator") {
                const stake = new bignumber_js_1.default(challenge.listingStake);
                totalStake = totalStake.plus(stake);
            }
        });
        return totalStake;
    }
    _debugLog(message) {
        if (this.debug) {
            console.log(message);
        }
    }
    _connectMetamask() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof window.ethereum !== "undefined") {
                try {
                    yield window.ethereum.enable();
                    this.web3 = new web3_1.default(window.ethereum);
                }
                catch (error) {
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
}
/**
 * Create new `BigNumber` instance. Identical to calling `BigNumber` constructor.
 *
 * @param {number | string | BigNumber} input value to wrap as a BigNumber
 * @returns {BigNumber} the `BigNumber` version of `input`
 * @example
 * ```javascript
 * const bn = new Gov.BigNumber(10);
 * ```
 */
Gov.BigNumber = input => new bignumber_js_1.default(input);
/** The value `0` as an instance of`BigNumber`. */
Gov.ZERO = new bignumber_js_1.default(0);
/** The value `1` as an instance of`BigNumber`. */
Gov.ONE = new bignumber_js_1.default(1);
/** The value `100` as an instance of`BigNumber`. */
Gov.ONE_HUNDRED = new bignumber_js_1.default(100);
/** Estimated blocks per day (mainnet only). */
Gov.BLOCKS_PER_DAY = new bignumber_js_1.default(6400);
module.exports = Gov;
