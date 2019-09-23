import Web3 from "web3";
import BigNumber from "bignumber.js";
import cookies from "browser-cookies";
import { EventEmitter } from "events";
import { Kosu } from "@kosu/kosu.js";

/**
 * Represents a current validator in the live-updating store.
 */
interface Validator {
    owner: string;
    stakeSize: BigNumber;
    dailyReward: BigNumber;
    confirmationUnix: number;
    power: BigNumber;
    details: string;
}

/**
 * Represents a listing proposal in the live-updating store.
 */
interface Proposal {
    owner: string;
    stakeSize: BigNumber;
    dailyReward: BigNumber;
    power: BigNumber;
    details: string;
    acceptUnix: number;
}

/**
 * Challenge representation in the live-updating store.
 */
interface StoreChallenge {
    listingOwner: string;
    listingStake: BigNumber;
    listingPower: BigNumber | null;
    challenger: string;
    challengeId: BigNumber;
    challengerStake: BigNumber;
    challengeEndUnix: number;
    challengeEnd: BigNumber;
    totalTokens: BigNumber;
    winningTokens: BigNumber;
    result: "passed" | "failed";
    challengeType: "proposal" | "validator";
    listingDetails: string;
    challengeDetails: string;
}

/**
 * A challenge as returned from the ValidatorRegistry contract (past challenges).
 */
interface PastChallenge {
    balance: BigNumber;
    challengeEnd: BigNumber;
    challenger: string;
    details: string;
    finalized: boolean;
    listingKey: string;
    listingSnapshot: ListingSnapshot;
    passed: boolean;
    pollId: BigNumber;
    voterTotal: BigNumber;
    winningTokens: BigNumber;
}

/**
 * The state of the listing at the time of challenge.
 */
interface ListingSnapshot {
    applicationBlock: BigNumber;
    confirmationBlock: BigNumber;
    currentChallenge: BigNumber;
    details: string;
    exitBlock: BigNumber;
    lastRewardBlock: BigNumber;
    owner: string;
    rewardRate: BigNumber;
    stakedBalance: BigNumber;
    status: number;
    tendermintPublicKey: string;
}

interface ContractParams {
    applicationPeriod: number;
    commitPeriod: number;
    challengePeriod: number;
    exitPeriod: number;
    rewardPeriod: number;
}

interface ChallengeInfo {
    challengeStart: number;
    endCommitPeriod: number;
    challengeEnd: number;
}

interface Vote {
    id: BigNumber;
    value: string;
    salt: string;
    encoded: string;
    commitTxHash?: string;
    revealTxHash?: string;
}

interface PastGovernanceActivity {
    type: "CHALLENGE_BY" | "CHALLENGE_AGAINST" | "PROPOSAL";
    result: "PENDING" | "ACCEPTED" | "REJECTED";
    actionable: boolean;
}

interface OwnedListings {
    [publicKey: string]: {
        state: "PENDING" | "ACCEPTED" | "REJECTED";
        challenger?: string;
        challengeId?: string;
        applicationBlockNumber: number;
        confirmedBlockNumber: number;
    };
}

interface OwnedChallenges {
    [challengeId: string]: {
        state: "PENDING" | "ACCEPTED" | "REJECTED";
        listingPublicKey: string;
        listingOwner: string;
        challengeBlock: number;
        challengeEndBlock: number;
    };
}

interface ChallengesAgainst {
    [challengeId: string]: {
        state: "PENDING" | "ACCEPTED" | "REJECTED";
        listingPublicKey: string;
        challenger: string;
        challengeBlock: number;
        challengeEndBlock: number;
    };
}

// will be the global window object in browser
declare var window, global: Window;

interface Window {
    web3: any;
    ethereum: any;
}

// Simple key-value map string:T
interface Map<T> {
    [key: string]: T;
}

/**
 * Represents an active validator in the registry.
 * @typedef Validator
 * @property {string} owner the Ethereum address of the validator
 * @property {BigNumber} stakeSize the staked balance (in wei) of the validator
 * @property {BigNumber} dailyReward the approximate daily reward to the validator (in wei)
 * @property {number} confirmationUnix the unix timestamp of the block the validator was confirmed in
 * @property {BigNumber} power the validators approximate current vote power on the Kosu network
 * @property {string} details arbitrary details provided by the validator when they applied
 */

/**
 * Represents a pending listing application for a spot on the `ValidatorRegistry`.
 * @typedef Proposal
 * @property {string} owner the Ethereum address of the applicant
 * @property {BigNumber} stakeSize the total stake the applicant is including with their proposal (in wei)
 * @property {BigNumber} dailyReward the approximate daily reward (in wei) the applicant is requesting
 * @property {BigNumber} power the estimated vote power the listing would receive if accepted right now
 * @property {string} details arbitrary details provided by the applicant with their proposal
 * @property {number} acceptUnix the approximate unix timestamp the listing will be accepted, if not challenged
 */

/**
 * Represents a current challenge (in the `gov` state).
 * @typedef StoreChallenge
 * @property {string} listingOwner the Ethereum address of the owner of the challenged listing
 * @property {BigNumber} listingStake the total stake of the challenged listing
 * @property {BigNumber} listingPower the current vote power of the listing (if they are a validator)
 * @property {string} challenger the Ethereum address of the challenger
 * @property {BigNumber} challengeId the incremental ID of the current challenge
 * @property {BigNumber} challengerStake the staked balance of the challenger
 * @property {number} challengeEndUnix the estimated unix timestamp the challenge ends at
 * @property {BigNumber} challengeEnd the block at which the challenge reveal period ends
 * @property {BigNumber} totalTokens if finalized, the total number of tokens from participating voters
 * @property {BigNumber} winningTokens if finalized, the number of tokens that voted on the winning side
 * @property {string} result the final result of the challenge; "passed", "failed", or `null` if not finalized
 * @property {string} challengeType the type of listing the challenge is against, either a "validator" or a "proposal"
 * @property {string} listingDetails details provided by the listing holder
 * @property {string} challengeDetails details provided by the challenger
 */

/**
 * Represents a historical challenge, and its outcome.
 * @typedef PastChallenge
 * @property {BigNumber} balance the number of tokens (in wei) staked in the challenge
 * @property {BigNumber} challengeEnd the block the challenge ends at
 * @property {string} challenger the Ethereum address of the challenger
 * @property {string} details additional details provided by the challenger
 * @property {boolean} finalized `true` if the challenge result is final, `false` if it is ongoing
 * @property {string} listingKey the key that corresponds to the challenged listing
 * @property {ListingSnapshot} listingSnapshot an object representing the state of the challenged listing at the time of challenge
 * @property {boolean} passed `true` if the challenge was successful, `false` otherwise
 * @property {BigNumber} pollId the incremental ID used to identify the poll
 * @property {BigNumber} voterTotal the total number of tokens participating in the vote
 * @property {BigNumber} winningTokens the total number of tokens voting for the winning option
 */

/**
 * Represents a listing at the time it was challenged.
 * @typedef ListingSnapshot
 * @property {BigNumber} applicationBlock the block the listing application was submitted
 * @property {BigNumber} confirmationBlock the block the listing was confirmed (0 if unconfirmed)
 * @property {BigNumber} currentChallenge the ID of the current challenge against the listing
 * @property {string} details arbitrary details provided by the listing applicant
 * @property {BigNumber} exitBlock the block (if any) the listing exited at
 * @property {BigNumber} lastRewardBlock the last block the listing owner claimed rewards for
 * @property {string} owner the Ethereum address of the listing owner
 * @property {BigNumber} rewardRate the number of tokens (in wei) rewarded to the listing per reward period
 * @property {BigNumber} stakedBalance the number of tokens staked by the listing owner (in wei)
 * @property {number} status the number representing the listing status (0: no listing, 1: proposal, 2: validator, 3: in-challenge, 4: exiting)
 * @property {string} tendermintPublicKey the 32 byte Tendermint public key of the listing holder
 */

/**
 * Represents a stored vote in a challenge poll.
 * @typedef Vote
 * @property {BigNumber} id the challengeId the vote is for
 * @property {string} value the vote value (should be "1" or "0" for challenge votes)
 * @property {string} salt a secret string used to hash the vote; must use same salt in commit as reveal
 * @property {string} encoded the encoded vote, as passed to the contract system
 * @property {string} commitTxHash the transaction hash of the commit transaction
 * @property {string} revealTxHash the transaction hash of the reveal transaction
 */

/**
 * Contains block numbers for various state changes for a given challenge.
 * @typedef ChallengeInfo
 * @property {number} challengeStart the block at which the challenge was initiated, and when the commit period starts
 * @property {number} endCommitPeriod the block the commit period ends, and the reveal period starts
 * @property {number} challengeEnd the block the reveal period ends, and the challenge finalizes
 */

/**
 * An object representing an instance of past "activity" within the ValidatorRegistry contract.
 *
 * If `actionable` is true, the following actions can be taken for a given `type`:
 * - CHALLENGE_BY: challenge can be resolved
 * - CHALLENGE_AGAINST: challenge can be resolved
 * - PROPOSAL: the listing can be confirmed
 *
 * If `state` is `"PENDING"` for a given `type`, the following action can be taken:
 * - CHALLENGE_BY: the challenge can be voted on in the active poll
 * - CHALLENGE_AGAINST: the challenge can be voted on in the active poll
 * - PROPOSAL: the proposal may be challenged
 * @typedef PastGovernanceActivity
 * @property {string} type Either "CHALLENGE_BY" for created challenges, "CHALLENGE_AGAINST" for challenges against a user, and "PROPOSAL" for created listings
 * @property {string} result Either "PENDING" for active, "ACCEPTED" for successful listings and challenges, and "REJECTED" for failed challenges and applications
 */

/**
 * `Gov` is a helper library for interacting with the Kosu validator governance
 * system (primarily the Kosu `ValidatorRegistry` contract).
 *
 * It is designed with the browser in mind, and is intended to be used in front-
 * end projects for simplifying interaction with the governance system.
 *
 * Methods may be used to load the current `proposals`, `validators`, and
 * `challenges` from the prototype's state, or the `gov.ee` object (an EventEmitter)
 * may be used to detect updates to the state, emitted as `gov_update` events.
 *
 * After a `gov_update` event, the read methods for `proposals`, `challenges`,
 * and `validators` must be called to load the current listings. Alternatively,
 * access the objects directly with `gov.listings`, etc.
 */
class Gov {
    /** Create new BigNumber (mimics constructor) */
    public static BigNumber: (num: string | number) => BigNumber;

    /** The value `0` as an instance of`BigNumber`. */
    public static ZERO: BigNumber;

    /** The value `1` as an instance of`BigNumber`. */
    public static ONE: BigNumber;

    /** The value `100` as an instance of`BigNumber`. */
    public static ONE_HUNDRED: BigNumber;

    /** Estimated blocks per day (mainnet only). */
    public static BLOCKS_PER_DAY: BigNumber;

    public initialized: boolean;
    public debug: boolean;

    public validators: Map<Validator>;
    public challenges: Map<StoreChallenge>;
    public proposals: Map<Proposal>;

    public networkId: number;
    public coinbase: string;

    public kosu: Kosu;
    public web3: Web3;

    public params: ContractParams;

    public initBlock: number;

    public ee: EventEmitter;
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

        this.ee = new EventEmitter();
    }

    /**
     * Main initialization function for the `gov` module. You must call `init`
     * prior to interacting with most module functionality, and `gov.init()` will
     * load the current registry status (validators, proposals, etc.) so it should
     * be called early-on in the page life-cycle.
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
        const listings = await this.kosu.validatorRegistry.getAllListings();
        for (const listing of listings) {
            await this._processListing(listing);
        }
        this.kosu.eventEmitter.getFutureDecodedLogs(this.initBlock + 1, this._handleEvents.bind(this));
        this.initialized = true;
    }

    /**
     * Load the current proposal map from state.
     *
     * @returns {Map<Proposal>} a map where the key is the listing public key, and the value is a proposal object
     * @example
     * ```javascript
     * const proposals = gov.currentProposals();
     * ```
     */
    public currentProposals(): Map<Proposal> {
        return this.proposals;
    }

    /**
     * Load the current validators map from state.
     *
     * @returns {Map<Validator>} a map where the key is the listing public key, and the value is a validator object
     * @example
     * ```javascript
     * const validators = gov.currentValidators();
     * ```
     */
    public currentValidators(): Map<Validator> {
        return this.validators;
    }
    /**
     * Load the current challenges map from state.
     *
     * @returns {Map<StoreChallenge>} a map where the key is the listing public key, and the value is a challenge object
     * @example
     * ```javascript
     * const challenges = gov.currentChallenges();
     * ```
     */
    public currentChallenges(): Map<StoreChallenge> {
        return this.challenges;
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
    weiToEther(wei: string | BigNumber): string {
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
    etherToWei(ether: string | BigNumber): string {
        return this.web3.utils.toWei(ether.toString());
    }

    /**
     * Commit a vote in an active a challenge poll.
     *
     * This method creates a vote (with value and salt), encodes it, and submits
     * it as a transaction (requires MetaMask signature).
     *
     * It stores the vote data in a browser cookie so it may be revealed later,
     * which means voters must reveal a vote with the same browser they used to
     * commit it.
     *
     * @param {BigNumber} challengeId the pollId of the challenge, as a string
     * @param {string} value the vote value, "1" to vote for the challenge, "0" to vote against
     * @param {BigNumber} amount the number of tokens (in wei) to commit in the vote
     * @returns {Promise<string>} the transaction hash of the commit tx
     * @example
     * ```javascript
     * // we are looking at challenge #13, and want to vote AGAINST it with 10 tokens
     * const pollId = new BigNumber(13);
     * const amount = new BigNumber(gov.etherToWei("10"));
     * const value = "0";
     *
     * // will prompt for MetaMask signature
     * const commitVoteTxId = await gov.commitVote(pollId, value, amount);
     *
     * // ... some time passes, we now want to reveal ...
     *
     * // load vote from cookie and reveal
     * const revealTxId = await gov.revealVote(new BigNumber("13"));
     *
     * // ... wait for Tx's to confirm or whatever, etc.
     * ```
     */
    async commitVote(challengeId: BigNumber, value: string, amount: BigNumber): Promise<string> {
        const vote = this._createVote(challengeId, value);

        const { id, encoded } = vote;
        const pollId = new BigNumber(id);
        const tokens = new BigNumber(amount);

        let receipt;
        try {
            receipt = await this.kosu.voting.commitVote(pollId, encoded, tokens);
            vote.commitTxHash = receipt.tansactionHash;
            this._storeVote(vote);
        } catch (error) {
            throw Error(`[gov] failed to commit vote: ${error.message}`);
        }
        return receipt.transactionHash;
    }

    /**
     * Check for a previously committed vote, by challengeId (as a BigNumber).
     *
     * @param {BigNumber} challengeId the challenge to check for a stored commit vote for
     * @returns {boolean} the boolean representing the presence of a commit vote
     */
    hasCommittedVote(challengeId: BigNumber): boolean {
        try {
            const vote = this._loadVote(challengeId.toString());
            return vote.commitTxHash && vote.commitTxHash.startsWith("0x");
        } catch (e) {
            return false;
        }
    }

    /**
     * Reveal a previously committed vote, by challengeId (as a BigNumber).
     *
     * For this method to work, the user must have committed a vote during the
     * commit period for the given challenge.
     *
     * This method must also be called during the reveal period in order for the
     * transaction not to fail.
     *
     * Calling this method will trigger a MetaMask pop-up asking for the user's
     * signature and approval.
     *
     * @param {BigNumber} challengeId the challenge to reveal a stored vote for
     * @returns {Promise<string>} the transaction hash of the reveal tx.
     */
    async revealVote(challengeId: BigNumber): Promise<string> {
        const id = new BigNumber(challengeId);
        const idStr = id.toString();

        const vote = this._loadVote(idStr);
        const { value, salt } = vote;

        const voteNum = new BigNumber(value);
        const saltNum = new BigNumber(salt);

        let receipt;
        try {
            receipt = await this.kosu.voting.revealVote(id, voteNum, saltNum);
            vote.revealTxHash = receipt.tansactionHash;
            this._storeVote(vote);
        } catch (error) {
            throw new Error(`[gov] failed to reveal vote: ${error.message}`);
        }

        return receipt.transactionHash;
    }

    /**
     * Check for a previously revealed vote, by challengeId (as a BigNumber).
     *
     * @param {BigNumber} challengeId the challenge to check for a stored reveal vote for
     * @returns {boolean} the boolean representing the presence of a reveal vote
     */
    hasRevealedVote(challengeId: BigNumber): boolean {
        try {
            const vote = this._loadVote(challengeId.toString());
            return vote.revealTxHash && vote.revealTxHash.startsWith("0x");
        } catch (e) {
            return false;
        }
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
    async estimateFutureBlockTimestamp(blockNumber: number): Promise<number> {
        const nowUnixSec = Math.floor(Date.now() / 1000);
        const currentBlock = await this.web3.eth.getBlockNumber();

        // don't throw if historical block, just return  the real timestamp
        if (currentBlock > blockNumber) {
            return this.getPastBlockTimestamp(blockNumber);
        }

        const blockTimeSeconds = await this._getBlockTimeSeconds();
        const diff = parseInt(blockNumber.toString()) - currentBlock;
        const estSeconds = diff * blockTimeSeconds.toNumber();

        return Math.floor(nowUnixSec + estSeconds);
    }

    /**
     * Retrieve the Unix timestamp of a block that has already been mined.
     * Should be used to display times of things that have happened (validator
     * confirmed, etc.).
     *
     * @param {number} blockNumber the block to get the unix timestamp for
     * @returns {Promise<number>} the Unix timestamp of the specified `blockNumber`
     * @example
     * ```javascript
     * await gov.getPastBlockTimestamp(515237) // > 1559346404
     * ```
     */
    async getPastBlockTimestamp(blockNumber: number): Promise<number> {
        let block;
        try {
            block = await this.web3.eth.getBlock(blockNumber);
        } catch (error) {
            throw new Error(`[gov] failed to get timestamp: ${error.message}`);
        }

        return block.timestamp;
    }

    /**
     * This method returns an array (described below) that contains information
     * about all past challenges. Intended to be used for the "Past Challenges"
     * section.
     *
     * @returns {Promise<Array<PastChallenge>>} all historical `challenges`.
     */
    async getHistoricalChallenges(): Promise<Array<PastChallenge>> {
        const pastChallenges = await this.kosu.validatorRegistry.getAllChallenges();
        for (const pastChallenge of pastChallenges) {
            pastChallenge.winningTokens = await this.kosu.voting.totalWinningTokens(pastChallenge.pollId);
        }
        return pastChallenges.reverse();
    }

    /**
     * Returns an object with the block numbers of important times for a given
     * challenge. Between `challengeStart` and `endCommitPeriod`, votes may be
     * committed (submitted) to the challenge.
     *
     * Between `endCommitPeriod` and `challengeEnd`, votes may be revealed with
     * the same salt and vote value.
     *
     * @param {string | number | BigNumber} challengeId the ID of the challenge to query
     * @returns {Promise<ChallengeInfo>} the block numbers for this challenge
     * @example
     * ```javascript
     * const info = await gov.getChallengeInfo(new BigNumber(1));
     * const currentBlock = await gov.currentBlockNumber();
     *
     * if (currentBlock < endCommitPeriod && currentBlock >= challengeStart) {
     *   // in "commit" period; voters may submit votes
     * } else if (currentBlock >= endCommitPeriod && currentBlock <= challengeEnd) {
     *   // in "reveal" period; voters may reveal votes
     * } else {
     *   // challenge has ended (or issues with block numbers)
     * }
     * ```
     */
    async getChallengeInfo(challengeId: number | BigNumber | string): Promise<ChallengeInfo> {
        const id = new BigNumber(challengeId);
        const challenge = await this.kosu.validatorRegistry.getChallenge(id);

        const challengeEnd = challenge.challengeEnd.toNumber();
        const challengeStart = challengeEnd - this.params.challengePeriod;
        const endCommitPeriod = challengeStart + this.params.commitPeriod;

        return {
            challengeStart,
            endCommitPeriod,
            challengeEnd,
        };
    }

    /**
     * Returns the current block height (as a number).
     *
     * @returns {number} The current (or most recent) Ethereum block height.
     */
    async currentBlockNumber(): Promise<number> {
        return await this.web3.eth.getBlockNumber();
    }

    /**
     * Get information about a given Ethereum address's past governance activity
     * within the system.
     *
     * Returns info about proposals submitted, challenges created, and challenges
     * against listings owned by the user.
     *
     * For a given activity object, if `actionable` is `true`, the following
     * action may be taken for each state:
     * - If "CHALLENGE_BY": the challenge can be resolved
     * - If "CHALLENGE_AGAINST": the challenge can be resolved
     * - If "PROPOSAL" the listing can be confirmed
     *
     * @param {string} address Ethereum address of user to get past activity for.
     * @returns {Promise<PastGovernanceActivity[]>} An array of snippets about past governance activity.
     */
    async getPastGovernanceActivity(_address: string): Promise<PastGovernanceActivity[]> {
        const ownedListings: OwnedListings = {};
        const ownedChallenges: OwnedChallenges = {};
        const challengesAgainst: ChallengesAgainst = {};

        const address = _address.toLowerCase();
        const pastLogs = await this.kosu.eventEmitter.getPastDecodedLogs({ fromBlock: 0 });

        for (const event of pastLogs) {
            const { decodedArgs, blockNumber } = event;
            const { eventType } = decodedArgs;

            switch (eventType) {
                case "ValidatorRegistered": {
                    const { applicationBlockNumber, owner, tendermintPublicKeyHex } = decodedArgs;
                    if (owner !== address) {
                        break;
                    }

                    ownedListings[tendermintPublicKeyHex] = {
                        state: "PENDING",
                        applicationBlockNumber: parseInt(applicationBlockNumber),
                        confirmedBlockNumber: parseInt(applicationBlockNumber) + this.params.applicationPeriod,
                    };
                    break;
                }
                case "ValidatorChallenged": {
                    const { challenger, challengeId, owner, tendermintPublicKeyHex } = decodedArgs;
                    if (challenger === address) {
                        ownedChallenges[challengeId] = {
                            state: "PENDING",
                            listingOwner: owner,
                            listingPublicKey: tendermintPublicKeyHex,
                            challengeBlock: blockNumber,
                            challengeEndBlock: blockNumber + this.params.challengePeriod,
                        };
                    } else if (owner === address) {
                        challengesAgainst[challengeId] = {
                            state: "PENDING",
                            challenger,
                            listingPublicKey: tendermintPublicKeyHex,
                            challengeBlock: blockNumber,
                            challengeEndBlock: blockNumber + this.params.challengePeriod,
                        };
                    } else {
                        break;
                    }
                }
                default:
                    break;
            }
        }

        return this._processPastGovernanceActivity(ownedListings, ownedChallenges, challengesAgainst);
    }

    async _processPastGovernanceActivity(
        ownedListings: OwnedListings,
        ownedChallenges: OwnedChallenges,
        challengesAgainst: ChallengesAgainst,
    ): Promise<PastGovernanceActivity[]> {
        const pastGovActivity: PastGovernanceActivity[] = [];
        const currentBlock = await this.kosu.web3Wrapper.getBlockNumberAsync();
        await this._processOwnedListings(pastGovActivity, currentBlock, ownedListings);
        await this._processOwnedChallenges(pastGovActivity, currentBlock, ownedChallenges);
        await this._processChallengesAgainst(pastGovActivity, currentBlock, challengesAgainst);
        return pastGovActivity;
    }

    async _processOwnedListings(
        pastGovArr: PastGovernanceActivity[],
        currentBlock: number,
        ownedListings: OwnedListings,
    ): Promise<void> {
        for (const listingKey of Object.keys(ownedListings)) {
            const govActivity: Partial<PastGovernanceActivity> = {};
            govActivity.type = "PROPOSAL";

            const snapshot = ownedListings[listingKey];
            const listing = await this.kosu.validatorRegistry.getListing(listingKey);

            // currently a proposal
            if (listing.status === 1) {
                // application period ended, but not yet confirmed
                if (snapshot.confirmedBlockNumber <= currentBlock) {
                    govActivity.actionable = true;
                    govActivity.result = "ACCEPTED";
                } else {
                    govActivity.actionable = false;
                    govActivity.result = "PENDING";
                }

                // currently in registry (validator)
            } else if (listing.status === 2) {
                govActivity.actionable = false;
                govActivity.result = "ACCEPTED";

                // currently in challenge
            } else if (listing.status === 3) {
                govActivity.actionable = false;
                govActivity.result = "PENDING";

                // 0, 4, or 5 => listing has exited or been kicked-off
            } else {
                govActivity.actionable = false;
                govActivity.result = "REJECTED";
            }
            pastGovArr.push(govActivity as PastGovernanceActivity);
        }
    }

    async _processOwnedChallenges(
        pastGovArr: PastGovernanceActivity[],
        currentBlock: number,
        ownedChallenges: OwnedChallenges,
    ): Promise<void> {
        for (const challengeId of Object.keys(ownedChallenges)) {
            const govActivity: Partial<PastGovernanceActivity> = {};
            govActivity.type = "CHALLENGE_BY";

            const snapshot = ownedChallenges[challengeId];
            const challenge = await this.kosu.validatorRegistry.getChallenge(new BigNumber(challengeId));

            if (challenge.finalized) {
                govActivity.actionable = false;
                if (challenge.passed) {
                    govActivity.result = "ACCEPTED";
                } else {
                    govActivity.result = "REJECTED";
                }
            } else {
                if (snapshot.challengeEndBlock <= currentBlock) {
                    govActivity.actionable = true;
                    const result = await this.kosu.voting
                        .winningOption(challenge.pollId)
                        .then(option => (option.toString() === "1" ? "ACCEPTED" : "REJECTED"));
                    govActivity.result = result;
                } else {
                    govActivity.actionable = false;
                    govActivity.result = "PENDING";
                }
            }
            pastGovArr.push(govActivity as PastGovernanceActivity);
        }
    }

    async _processChallengesAgainst(
        pastGovArr: PastGovernanceActivity[],
        currentBlock: number,
        challengesAgainst: ChallengesAgainst,
    ): Promise<void> {
        for (const challengeId of Object.keys(challengesAgainst)) {
            if (!challengeId) {
                continue;
            }
            const govActivity: Partial<PastGovernanceActivity> = {};
            govActivity.type = "CHALLENGE_AGAINST";

            const snapshot = challengesAgainst[challengeId];
            const challenge = await this.kosu.validatorRegistry.getChallenge(new BigNumber(challengeId));

            if (challenge.finalized) {
                govActivity.actionable = false;
                if (challenge.passed) {
                    govActivity.result = "ACCEPTED";
                } else {
                    govActivity.result = "REJECTED";
                }
            } else {
                if (snapshot.challengeEndBlock <= currentBlock) {
                    govActivity.actionable = true;
                    const result = await this.kosu.voting
                        .winningOption(challenge.pollId)
                        .then(option => (option.toString() === "1" ? "ACCEPTED" : "REJECTED"));
                    govActivity.result = result;
                } else {
                    govActivity.actionable = false;
                    govActivity.result = "PENDING";
                }
            }
            pastGovArr.push(govActivity as PastGovernanceActivity);
        }
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

    async _processProposal(listing) {
        if (listing.status !== 1) {
            throw new Error("[gov] listing is not a proposal");
        }

        const owner = listing.owner;
        const stakeSize = listing.stakedBalance;

        const acceptAt = parseInt(listing.applicationBlock) + this.params.applicationPeriod;
        const acceptUnix = await this.estimateFutureBlockTimestamp(acceptAt);
        const dailyReward = await this._estimateDailyReward(listing.rewardRate);

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
    }

    async _processValidator(listing) {
        if (listing.status !== 2 && listing.challengeId === 0) {
            throw new Error("[gov] listing is not a validator");
        }

        const owner = listing.owner;
        const stakeSize = listing.stakedBalance;
        const confBlock = listing.confirmationBlock.toNumber();
        const dailyReward = await this._estimateDailyReward(listing.rewardRate);
        const confirmationUnix = await this.getPastBlockTimestamp(confBlock);

        // power is set after update
        const power = null;

        const validator = {
            owner,
            confirmationUnix,
            stakeSize,
            dailyReward,
            power,
            details: listing.details,
        };

        delete this.proposals[listing.tendermintPublicKeyHex];

        this._addValidator(listing.tendermintPublicKey, validator);
    }

    async _processChallenge(listing) {
        delete this.proposals[listing.tendermintPublicKeyHex];
        delete this.validators[listing.tendermintPublicKeyHex];

        if (listing.status !== 3) {
            throw new Error("[gov] listing is not in challenge");
        }

        let challengeType;
        if (listing.confirmationBlock.toString() === "0") {
            challengeType = "proposal";
        } else {
            challengeType = "validator";
        }

        this._debugLog(`Challenge type: ${challengeType}`);

        const listingChallenge = await this.kosu.validatorRegistry.getChallenge(listing.currentChallenge);
        const listingStake = listing.stakedBalance;

        // copy over listing power if validator challenge
        const listingPower =
            challengeType === "validator" ? await this._getValidatorPower(listing.tendermintPublicKey) : null;

        const challengeEndUnix = await this.estimateFutureBlockTimestamp(listingChallenge.challengeEnd);

        let totalTokens, winningTokens, result;
        if (challengeEndUnix <= Math.floor(Date.now() / 1000)) {
            totalTokens = await this.kosu.voting.totalRevealedTokens(listingChallenge.pollId);
            winningTokens = await this.kosu.voting.totalWinningTokens(listingChallenge.pollId);
            result = await this.kosu.voting
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
            challengeEnd: listingChallenge.challengeEnd,
            totalTokens,
            winningTokens,
            result,
            challengeType, // "proposal" or "validator"
            listingDetails: listing.details,
            challengeDetails: listingChallenge.details,
        };

        this._addChallenge(listing.tendermintPublicKey, challenge);
    }

    async _processResolvedChallenge(pubKey, listing) {
        delete this.challenges[pubKey];
        if (listing.status === 1) {
            await this._processProposal(listing);
        } else if (listing.status === 2) {
            await this._processValidator(listing);
        }
    }

    async _handleEvents(events) {
        for (const event of events) {
            const { decodedArgs } = event;
            this._debugLog(`Handling event: ${JSON.stringify(decodedArgs)}`);
            switch (decodedArgs.eventType) {
                case "ValidatorRegistered":
                    const registeredListing = await this._getListing(decodedArgs.tendermintPublicKey);
                    this._debugLog(
                        `Event type: ${decodedArgs.eventType}\nListing: ${JSON.stringify(registeredListing)}`,
                    );

                    await this._processProposal(registeredListing);
                    break;
                case "ValidatorChallenged":
                    const challengedListing = await this._getListing(decodedArgs.tendermintPublicKey);
                    this._debugLog(
                        `Event type: ${decodedArgs.eventType}\nListing: ${JSON.stringify(challengedListing)}`,
                    );

                    await this._processChallenge(challengedListing);
                    break;
                case "ValidatorRemoved":
                    const removedListing = await this._getListing(decodedArgs.tendermintPublicKey);
                    this._debugLog(`Event type: ${decodedArgs.eventType}\nListing: ${JSON.stringify(removedListing)}`);

                    this._removeValidator(decodedArgs.tendermintPublicKeyHex);
                    break;
                case "ValidatorChallengeResolved":
                    const resolvedChallengeListing = await this._getListing(decodedArgs.tendermintPublicKey);
                    this._debugLog(
                        `Event type: ${decodedArgs.eventType}\nListing: ${JSON.stringify(resolvedChallengeListing)}`,
                    );

                    this._processResolvedChallenge(decodedArgs.tendermintPublicKeyHex, resolvedChallengeListing);
                    break;
                case "ValidatorConfirmed":
                    const confirmedListing = await this._getListing(decodedArgs.tendermintPublicKey);
                    this._debugLog(
                        `Event type: ${decodedArgs.eventType}\nListing: ${JSON.stringify(confirmedListing)}`,
                    );

                    await this._processValidator(confirmedListing);
                    break;
                case "ValidatorRegistryUpdate":
                    break;
                default:
                    console.warn(`Unrecognized eventType: ${decodedArgs.eventType}`);
            }
        }
    }

    async _getListing(pubKey) {
        return await this.kosu.validatorRegistry.getListing(pubKey);
    }

    async _getValidatorPower(pubKey) {
        let cache = {};
        let power, stake;

        if (!/^0x[a-faF0-9]{64}$/.test(pubKey)) {
            throw new Error("[gov] invalid public key");
        }

        const listings = await this.kosu.validatorRegistry.getAllListings();
        listings.forEach(listing => {
            cache[listing.tendermintPublicKey] = listing;
        });

        const listing = cache[pubKey];
        if (!listing || listing.confirmationBlock.eq(Gov.ZERO)) {
            return "0";
        }

        let totalStake = new BigNumber(0);
        Object.keys(cache).forEach(id => {
            const lst = cache[id];
            if (lst.confirmationBlock.eq(Gov.ZERO)) {
                return;
            }

            const stake = new BigNumber(cache[id].stakedBalance);
            totalStake = totalStake.plus(stake);
        });

        stake = new BigNumber(cache[pubKey].stakedBalance);
        power = stake.div(totalStake).times(Gov.ONE_HUNDRED);
        return power;
    }

    async _getBlockTimeSeconds(): Promise<BigNumber> {
        const netId = await this.web3.eth.net.getId();
        switch (netId) {
            // mainnet
            case 1:
                return new BigNumber(13.5);

            // ropsten
            case 3:
                return new BigNumber(15);

            // kosu-poa dev net
            case 6174:
                return new BigNumber(2);
            default: {
                throw new Error("[gov] unknown blockTime for current network");
            }
        }
    }

    async _estimateDailyReward(rewardRate: string | number | BigNumber): Promise<BigNumber> {
        const rate = new BigNumber(rewardRate);
        const rewardPeriod = new BigNumber(this.params.rewardPeriod);
        const tokensPerBlock = rate.div(rewardPeriod);
        const blocksPerDay = await this._getBlocksPerDay();
        const tokensPerDay = tokensPerBlock.times(blocksPerDay);
        return tokensPerDay;
    }

    async _getBlocksPerDay(): Promise<BigNumber> {
        const blockTimeSeconds = await this._getBlockTimeSeconds();
        const secondsPerDay = new BigNumber(26 * 60 * 60);
        return secondsPerDay.div(blockTimeSeconds);
    }

    _addProposal(pubKey: string, proposal: Proposal): void {
        this.proposals[pubKey] = proposal;
        this.ee.emit("gov_update");

        this._debugLog(`New proposal:\n${JSON.stringify(proposal, null, 2)}`);
    }

    _addValidator(pubKey: string, validator: Validator): void {
        delete this.proposals[pubKey];
        this.validators[pubKey] = validator;
        this._updateVotePowers();
        this.ee.emit("gov_update");

        this._debugLog(`New validator:\n${JSON.stringify(validator, null, 2)}`);
    }

    _removeValidator(pubKey: string): void {
        delete this.proposals[pubKey];
        delete this.validators[pubKey];
        delete this.challenges[pubKey];
        this.ee.emit("gov_update");
    }

    _addChallenge(pubKey: string, challenge: StoreChallenge): void {
        this.challenges[pubKey] = challenge;
        this.ee.emit("gov_update");

        this._debugLog(`New challenge:\n${JSON.stringify(challenge, null, 2)}`);
    }

    _estimateProposalPower(stake: string | number | BigNumber): BigNumber {
        const stakeBn = new BigNumber(stake);
        const totalStake = this._getTotalStake();
        const newTotal = totalStake.plus(stakeBn);
        const power = stakeBn.div(newTotal);
        return power.times(Gov.ONE_HUNDRED);
    }

    _updateVotePowers() {
        const totalStake = this._getTotalStake();
        Object.keys(this.validators).forEach(id => {
            const validator = this.validators[id];
            const stake = new BigNumber(validator.stakeSize);
            const power = stake.div(totalStake).times(Gov.ONE_HUNDRED);
            validator.power = power;
        });
    }

    _getTotalStake() {
        let totalStake = new BigNumber(0);
        Object.keys(this.validators).forEach(id => {
            const validator = this.validators[id];
            const stake = new BigNumber(validator.stakeSize);
            totalStake = totalStake.plus(stake);
        });
        Object.keys(this.challenges).forEach(id => {
            const challenge = this.challenges[id];
            if (challenge.challengeType === "validator") {
                const stake = new BigNumber(challenge.listingStake);
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

    _generateRandomBigNumber() {
        const randomNumber = BigNumber.random(15);
        const factor = new BigNumber(10).pow(14);
        const randomNumberScaledTo256Bits = randomNumber.times(factor).integerValue();
        console.log(JSON.stringify(randomNumberScaledTo256Bits));
        return randomNumberScaledTo256Bits;
    }

    _createVote(challengeId: BigNumber, value: string): Vote {
        if (value !== "1" && value !== "0") {
            throw new Error("invalid vote value for a challenge");
        }
        const id = challengeId;
        const salt = this._generateRandomBigNumber().toString();
        const encoded = this.kosu.voting.encodeVote(value, salt);
        return {
            id,
            salt,
            value,
            encoded,
        };
    }

    _storeVote(vote: Vote): void {
        const { id } = vote;
        const key = `gov_vote#${id}#${this.networkId}#${this.coinbase}`;
        const cookie = JSON.stringify(vote);
        cookies.set(key, cookie);
    }

    _loadVote(id: string): Vote {
        const key = `gov_vote#${id}#${this.networkId}#${this.coinbase}`;
        const cookie = cookies.get(key);
        if (!cookie) {
            throw new Error("[gov] vote not stored for this pollId");
        }
        return JSON.parse(cookie);
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
            this.web3 = new Web3(window.web3.currentProvider);
            global.web3 = this.web3;
        } else {
            throw new Error("non-ethereum browser detected");
        }
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
Gov.BigNumber = input => new BigNumber(input);

/** The value `0` as an instance of`BigNumber`. */
Gov.ZERO = new BigNumber(0);

/** The value `1` as an instance of`BigNumber`. */
Gov.ONE = new BigNumber(1);

/** The value `100` as an instance of`BigNumber`. */
Gov.ONE_HUNDRED = new BigNumber(100);

/** Estimated blocks per day (mainnet only). */
Gov.BLOCKS_PER_DAY = new BigNumber(6400);

module.exports = Gov;
