interface INetworkData {
    token: {
        totalSupply?: string;
        price?: string;
    };
    bandwidth: {
        totalLimit?: string;
        totalOrders?: string;
        remainingLimit?: string;
        numberPosters?: string;
        secToNextPeriod?: string;
        rebalancePeriodNumber?: string;
        periodEndEthBlock?: string;
        currentEthBlock?: string;
    };
    network: {
        blockHeight?: string;
        lastBlockTime?: string;
        avgBlockInterval?: string;
        numberValidators?: string;
        totalValidatorStake?: string;
        totalPosterStake?: string;
    };
    transactions?: IOrder[];
    validators?: IValidator[];
}

interface IOrder {
    orderId: string;
    posterAddress: string;
    makerAddress: string;
    subcontractAddress: string;
    orderType: string;
}

interface IValidator {
    publicKey: string;
    stake: string;
    reward: string;
    uptimePercent: string;
    firstVote: string;
    lastVoted: string;
    totalVotes: string;
    power: string;
}

interface IWsRequest {
    id: string;
    method: string;
    param: string;
}

interface IWsResponse {
    id: string;
    code: number;
    data?: string;
}

interface OrderData {
    orderId: string;
    posterAddress: string;
    makerAddress: string;
    subContractAddress: string;
    orderType: string;
}
