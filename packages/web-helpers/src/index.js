const Kosu = require("@kosu/kosu.js").Kosu;
const eventDecoder = require("@kosu/system-contracts").eventDecoder;
const Web3 = require("web3");
const uuid = require("uuid/v4");

const trim = num => {
    if (!kosuJS) return;
    const ether = kosuJS.web3.utils.fromWei(num.toString());
    const split = ether.toString().split(".");
    if (split.length === 1) {
        return split[0];
    } else {
        return `${split[0]}.${split[1].slice(0, 4)}`;
    }
};

const toWei = val => {
    if (!kosuJS) return;
    return kosuJS.web3.utils.toWei(val);
};

const resetValues = async () => {
    const coinbase = await kosuJS.web3.eth.getCoinbase();
    const { kosuToken, treasury, posterRegistry, validatorRegistry } = kosuJS;

    const kosuTokenBalanceHtml = document.getElementById("kosu-token-balance");
    if (typeof kosuTokenBalanceHtml !== "undefined") {
        const val = await kosuToken.balanceOf(coinbase);
        kosuTokenBalanceHtml.innerText = trim(val);
    }

    const kosuTokenSupplyHtml = document.getElementById("kosu-token-supply");
    if (typeof kosuTokenSupplyHtml !== "undefined") {
        const val = await kosuToken.totalSupply();
        kosuTokenSupplyHtml.innerText = trim(val);
    }

    const kosuTokenTreasuryAllowanceHtml = document.getElementById("kosu-token-treasury-allowance");
    if (typeof kosuTokenTreasuryAllowanceHtml !== "undefined") {
        const val = await kosuToken.allowance(coinbase, treasury.address);
        kosuTokenTreasuryAllowanceHtml.innerText = trim(val);
    }

    const currentTreasuryHtml = document.getElementById("treasury-current-balance");
    if (typeof currentTreasuryHtml !== "undefined") {
        const val = await treasury.currentBalance(coinbase);
        currentTreasuryHtml.innerText = trim(val);
    }

    const totalTreasuryHtml = document.getElementById("treasury-system-balance");
    if (typeof totalTreasuryHtml !== "undefined") {
        const val = await treasury.systemBalance(coinbase);
        totalTreasuryHtml.innerText = trim(val);
    }

    const posterTokenContributedHtml = document.getElementById("poster-registry-tokens-contributed");
    if (typeof posterTokenContributedHtml !== "undefined") {
        const val = await posterRegistry.tokensContributed();
        posterTokenContributedHtml.innerText = trim(val);
    }

    const posterUserTokenContributedHtml = document.getElementById("poster-registry-registered-tokens");
    if (typeof posterUserTokenContributedHtml !== "undefined") {
        const val = await posterRegistry.tokensRegisteredFor(coinbase);
        posterUserTokenContributedHtml.innerText = trim(val);
    }

    const applicationPeriodHtml = document.getElementById("application-period-value");
    if (typeof applicationPeriodHtml !== "undefined") {
        const val = await validatorRegistry.applicationPeriod();
        applicationPeriodHtml.innerText = val;
    }

    const commitPeriodHtml = document.getElementById("commit-period-value");
    if (typeof commitPeriodHtml !== "undefined") {
        const val = await validatorRegistry.commitPeriod();
        commitPeriodHtml.innerText = val;
    }

    const challengePeriodHtml = document.getElementById("challenge-period-value");
    if (typeof challengePeriodHtml !== "undefined") {
        const val = await validatorRegistry.challengePeriod();
        challengePeriodHtml.innerText = val;
    }

    const exitPeriodHtml = document.getElementById("exit-period-value");
    if (typeof exitPeriodHtml !== "undefined") {
        const val = await validatorRegistry.exitPeriod();
        exitPeriodHtml.innerText = val;
    }

    const rewardPeriodHtml = document.getElementById("reward-period-value");
    if (typeof rewardPeriodHtml !== "undefined") {
        const val = await validatorRegistry.rewardPeriod();
        rewardPeriodHtml.innerText = val;
    }

    const minimumBalanceHtml = document.getElementById("minimum-balance-value");
    if (typeof minimumBalanceHtml !== "undefined") {
        const val = await validatorRegistry.minimumBalance();
        minimumBalanceHtml.innerText = trim(val);
    }

    const stakeHolderCutHtml = document.getElementById("stake-holder-cut");
    if (typeof stakeHolderCutHtml !== "undefined") {
        stakeHolderCutHtml.innerText = await validatorRegistry.stakeholderCut();
    }
};

const activateForms = async () => {
    const { kosuToken, treasury, posterRegistry, voting, validatorRegistry } = kosuJS;

    document.getElementById("approve-button").onclick = async () => {
        const value = document.getElementById("approve-value").value;
        const wei = toWei(value);
        console.log(`Setting approval for Treasury(${treasury.address}) for ${value} KOSU`);
        kosuToken.approve(treasury.address, wei).then(() => {
            resetValues();
            console.log(`Successfully set approval for Treasury(${treasury.address}) to ${value} KOSU`);
        });
    };

    document.getElementById("eth-bond-button").onclick = async () => {
        const value = document.getElementById("eth-bond-value").value;
        const wei = toWei(value);
        console.log(`Bonding ${value} ETH with KosuToken(${kosuToken.address}) for KOSU`);
        kosuToken.pay(wei).then(() => {
            resetValues();
            console.log(`Successfuly bonded ${value} ETH`);
        });
    };

    document.getElementById("kosu-bond-button").onclick = async () => {
        const value = document.getElementById("kosu-bond-value").value;
        const wei = toWei(value);
        console.log(`Bonding ${value} KOSU with KosuToken(${kosuToken.address}) for ETH`);
        kosuToken.releaseTokens(wei).then(() => {
            resetValues();
            console.log(`Successfuly bonded ${value} KOSU`);
        });
    };

    document.getElementById("transfer-button").onclick = async () => {
        const recipient = document.getElementById("transfer-recipient").value;
        const value = document.getElementById("transfer-value").value;
        const wei = toWei(value);
        console.log(`Transfering ${value} KOSU tokens to ${recipient}`);
        kosuToken.transfer(recipient, wei).then(() => {
            resetValues();
            console.log(`Successfully transferred ${value} KOSU to ${recipient}`);
        });
    };

    document.getElementById("deposit-button").onclick = async () => {
        const value = document.getElementById("deposit-value").value;
        const wei = toWei(value);
        console.log(`Depositing ${value} KOSU into Treasury`);
        treasury.deposit(wei).then(log => {
            console.log(log);
            resetValues();
            console.log(`Successfully deposited ${value} KOSU into Treasury`);
        });
    };

    document.getElementById("withdraw-button").onclick = async () => {
        const value = document.getElementById("withdraw-value").value;
        const wei = toWei(value);
        console.log(`Withdrawing ${value} KOSU from Treasury`);
        treasury.withdraw(wei).then(() => {
            resetValues();
            console.log(`Successfully withdrew ${value} KOSU from Treasury`);
        });
    };

    document.getElementById("register-button").onclick = async () => {
        const value = document.getElementById("register-value").value;
        const wei = toWei(value);
        console.log(`Registering ${value} KOSU to post`);
        posterRegistry.registerTokens(wei).then(() => {
            resetValues();
            console.log(`Successfully registered ${value} KOSU to post`);
        });
    };

    document.getElementById("release-button").onclick = async () => {
        const value = document.getElementById("release-value").value;
        const wei = toWei(value);
        console.log(`Releasing ${value} KOSU from PosterRegistry`);
        posterRegistry.releaseTokens(wei).then(() => {
            resetValues();
            console.log(`Successfully released ${value} KOSU from PosterRegistry`);
        });
    };

    document.getElementById("voting-commit-button").onclick = async () => {
        const poll = document.getElementById("voting-poll-id").value;
        const voteOption = document.getElementById("voting-commit-option").value;
        const voteSalt = document.getElementById("voting-commit-salt").value;
        const voteTokens = document.getElementById("voting-commit-tokens").value;
        const voteTokensWei = toWei(voteTokens);
        const hiddenVote = voting.encodeVote(voteOption, voteSalt);

        voting.commitVote(poll, hiddenVote, voteTokensWei).then(() => {
            resetValues();
            console.log(`Successfully commited vote for poll ${poll}.`);
        });
    };

    document.getElementById("voting-reveal-button").onclick = async () => {
        const poll = document.getElementById("voting-poll-id").value;
        const voteOption = document.getElementById("voting-reveal-option").value;
        const voteSalt = document.getElementById("voting-reveal-salt").value;

        voting.revealVote(poll, voteOption, voteSalt).then(() => {
            resetValues();
            console.log(`Successfully revealed vote for poll ${poll}.`);
        });
    };

    document.getElementById("validator-register-button").onclick = async () => {
        const pubKey = document.getElementById("validator-public-key-hex").innerText;
        const tokens = toWei(document.getElementById("validator-register-tokens").value);
        const reward = toWei(document.getElementById("validator-register-reward").value);
        const details = document.getElementById("validator-details").value;

        validatorRegistry.registerListing(pubKey, tokens, reward, details).then(async () => {
            resetValues();
            const validatorListingInfo = await validatorRegistry.getListing(pubKey);

            const listingInfoHtml = document.getElementById("validator-listing-info");
            if (typeof listingInfoHtml !== "undefined") {
                listingInfoHtml.innerText = JSON.stringify(validatorListingInfo);
            }
            console.log(`Successfully registered validator listing ${pubKey}.`);
        });
    };

    document.getElementById("validator-confirm-button").onclick = async () => {
        const pubKey = document.getElementById("validator-public-key-hex").innerText;

        validatorRegistry.confirmListing(pubKey).then(async () => {
            resetValues();
            const validatorListingInfo = await validatorRegistry.getListing(pubKey);

            const listingInfoHtml = document.getElementById("validator-listing-info");
            if (typeof listingInfoHtml !== "undefined") {
                listingInfoHtml.innerText = JSON.stringify(validatorListingInfo);
            }
            console.log(`Successfully confirmed validator listing ${pubKey}.`);
        });
    };

    document.getElementById("validator-challenge-button").onclick = async () => {
        const pubKey = document.getElementById("validator-public-key-hex").innerText;

        validatorRegistry.challengeListing(pubKey, "https://paradigm.market").then(async () => {
            resetValues();
            const validatorListingInfo = await validatorRegistry.getListing(pubKey);

            const listingInfoHtml = document.getElementById("validator-listing-info");
            if (typeof listingInfoHtml !== "undefined") {
                listingInfoHtml.innerText = JSON.stringify(validatorListingInfo);
            }
            console.log(`Successfully challenged validator listing ${pubKey}.`);
        });
    };

    document.getElementById("validator-resolve-challenge-button").onclick = async () => {
        const pubKey = document.getElementById("validator-public-key-hex").innerText;

        validatorRegistry.resolveChallenge(pubKey).then(async () => {
            resetValues();
            const validatorListingInfo = await validatorRegistry.getListing(pubKey);

            const listingInfoHtml = document.getElementById("validator-listing-info");
            if (typeof listingInfoHtml !== "undefined") {
                listingInfoHtml.innerText = JSON.stringify(validatorListingInfo);
            }
            console.log(`Successfully resolved validator listing ${pubKey} challenge.`);
        });
    };

    document.getElementById("validator-claim-rewards-button").onclick = async () => {
        const pubKey = document.getElementById("validator-public-key-hex").innerText;

        validatorRegistry.claimRewards(pubKey).then(async () => {
            resetValues();
            const validatorListingInfo = await validatorRegistry.getListing(pubKey);

            const listingInfoHtml = document.getElementById("validator-listing-info");
            if (typeof listingInfoHtml !== "undefined") {
                listingInfoHtml.innerText = JSON.stringify(validatorListingInfo);
            }
            console.log(`Successfully claimed rewards for validator listing ${pubKey}.`);
        });
    };

    document.getElementById("validator-init-exit-button").onclick = async () => {
        const pubKey = document.getElementById("validator-public-key-hex").innerText;

        validatorRegistry.initExit(pubKey).then(async () => {
            resetValues();
            const validatorListingInfo = await validatorRegistry.getListing(pubKey);

            const listingInfoHtml = document.getElementById("validator-listing-info");
            if (typeof listingInfoHtml !== "undefined") {
                listingInfoHtml.innerText = JSON.stringify(validatorListingInfo);
            }
            console.log(`Successfully initialized exit for validator listing ${pubKey}.`);
        });
    };

    document.getElementById("validator-finalize-exit-button").onclick = async () => {
        const pubKey = document.getElementById("validator-public-key-hex").innerText;

        validatorRegistry.finalizeExit(pubKey).then(async () => {
            resetValues();
            const validatorListingInfo = await validatorRegistry.getListing(pubKey);

            const listingInfoHtml = document.getElementById("validator-listing-info");
            if (typeof listingInfoHtml !== "undefined") {
                listingInfoHtml.innerText = JSON.stringify(validatorListingInfo);
            }
            console.log(`Successfully finalized exit for  validator listing ${pubKey}.`);
        });
    };

    document.getElementById("validator-claim-button").onclick = async () => {
        const challengeId = document.getElementById("validator-claim-challenge-id").value;

        validatorRegistry.claimWinnings(challengeId).then(async () => {
            resetValues();
            console.log(`Successfully claimed winnigs from challenge ${challengeId}.`);
        });
    };

    document.getElementById("voting-poll-id").onchange = async event => {
        const votingWinningOptionHTML = document.getElementById("voting-winning-option");
        if (typeof votingWinningOptionHTML !== "undefined") {
            const val = await voting.winningOption(event.target.value);
            votingWinningOptionHTML.innerText = val;
        }

        const votingTotalWinningTokensHTML = document.getElementById("voting-total-winning-tokens");
        if (typeof votingTotalWinningTokensHTML !== "undefined") {
            const val = await voting.totalWinningTokens(event.target.value);
            votingTotalWinningTokensHTML.innerText = trim(val);
        }

        const votingUserWinningTokensHTML = document.getElementById("voting-user-winning-tokens");
        if (typeof votingUserWinningTokensHTML !== "undefined") {
            const val = await voting.userWinningTokens(event.target.value);
            votingUserWinningTokensHTML.innerText = trim(val);
        }
    };
    document.getElementById("voting-poll-id").onkeyup = document.getElementById("voting-poll-id").onchange;

    document.getElementById("validator-public-key").onchange = async event => {
        const publicKeyRow = document.getElementById("validator-public-key-hex-row");
        const publicKeyHtml = document.getElementById("validator-public-key-hex");
        const listingInfoHtml = document.getElementById("validator-listing-info");
        const keyValue = event.target.value;
        const hexValue = validatorRegistry.convertPubKey(keyValue);
        const validatorListingInfo = await validatorRegistry.getListing(hexValue);
        if (keyValue !== hexValue) {
            publicKeyRow.style.display = "table-row";
        } else {
            publicKeyRow.style.display = "none";
        }

        if (typeof publicKeyHtml !== "undefined") {
            publicKeyHtml.innerText = hexValue;
        }

        if (typeof listingInfoHtml !== "undefined") {
            listingInfoHtml.innerText = JSON.stringify(validatorListingInfo);
        }
    };
    document.getElementById("validator-public-key").onkeyup = document.getElementById("validator-public-key").onchange;
};

const initApp = async provider => {
    global.kosuJS = new Kosu({ provider });
    await kosuJS.eventEmitter
        .getPastDecodedLogs({
            fromBlock: 0,
        })
        .then(decodedLogs => {
            decodedLogs.forEach(log => {
                console.log(log);
            });
        });

    kosuJS.eventEmitter.getFutureDecodedLogs(await kosuJS.web3Wrapper.getBlockNumberAsync(), console.log);
    await kosuJS.treasury.getContract();
    resetValues();
    activateForms();
};

window.contractHelpers = async () => {
    //Rebind console.log to use on page log panel
    (function() {
        var old = console.log;
        var logger = document.getElementById("log");
        console.log = function() {
            if (typeof logger !== "undefined") {
                for (var i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] == "object") {
                        logger.innerHTML +=
                            (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) +
                            "<br />";
                    } else {
                        logger.innerHTML += arguments[i] + "<br />";
                    }
                }
            }
            old(...arguments);
        };
    })();

    // Modern dapp browsers...
    if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask detected: requesting access...");
        try {
            await ethereum.enable();
            console.log("Successfully enabled ethereum access.");
            global.web3 = new Web3(ethereum);
            initApp(ethereum);
        } catch (error) {
            console.log("Enable ethereum failed");
            throw new Error(error);
        }
    } else if (typeof window.web3 !== "undefined") {
        console.log("No ethereum found: using deprecated web3");
        initApp(web3.currentProvider);
    } else {
        const msg = "Non-Ethereum browser detected. You should consider trying MetaMask!";
        console.log(msg);
        throw new Error(msg);
    }
};

/**
 * ORDERSTREAM INFO FUNCTIONS BELOW
 **/

function getOrderNumber(socket) {
    if (socket.readyState !== socket.OPEN) return;
    return new Promise((resolve, reject) => {
        const requestId = uuid();
        socket.send(
            JSON.stringify({
                jsonrpc: "2.0",
                id: requestId,
                method: "state.query",
                params: { path: "orderCounter" },
            }),
        );
        socket.onmessage = msg => {
            const parsed = JSON.parse(msg.data);
            if (parsed.id === requestId) {
                resolve(parsed.result.response.info);
                socket.onmessage = () => null;
            }
        };
        socket.onerror = () => {
            reject("?");
            socket.onmessage = () => null;
        };
    });
}

function mainHandler(ws2) {
    return msg => {
        // update block height with each new block
        const { height } = JSON.parse(msg.data).result;
        if (typeof height !== "number") return;
        document.getElementById("block-number").innerHTML = height;

        // now set order counter
        getOrderNumber(ws2)
            .then(n => {
                document.getElementById("order-number").innerHTML = n;
            })
            .catch(e => {
                return;
            });
    };
}

// BELOW WILL BE UPDATED WHEN 'GO-KOSU' SUPPORTS NECESSARY RPC METHODS

/*
window.kosuInfo = () => {
    // config
    const streamURL = "";
    const subscribeOptions = JSON.stringify({
        jsonrpc: "2.0",
        id: uuid(),
        method: "subscription.start",
        params: { eventName: "block" }
    });

    // setup websocket connections
    const ws1 = new WebSocket(streamURL);
    const ws2 = new WebSocket(streamURL);

    // setup new block handler
    ws1.onmessage = mainHandler(ws2);

    // send subscribe message when connection opens
    ws1.onopen = () => ws1.send(subscribeOptions);
}
*/
