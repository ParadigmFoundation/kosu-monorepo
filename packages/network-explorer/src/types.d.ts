interface INetworkData {
    token: {
        total_supply?: string;
        price?: string;
    };
    bandwidth: {
        total_limit?: string;
        total_orders?: string;
        remaining_limit?: string;
        number_posters?: string;
        sec_to_next_period?: string;
        rebalance_period_number?: string;
        period_end_eth_block?: string;
        current_eth_block?: string;
    };
    network: {
        block_height?: string;
        last_block_time?: string;
        avg_block_interval?: string;
        number_validators?: string;
        total_validator_stake?: string;
        total_poster_stake?: string;
    };
    transactions?: IOrder[];
    validators?: IValidator[];
}

interface IOrder {
    order_id: string;
    poster_address: string;
    maker_address: string;
    subcontract_address: string;
    order_type: string;
}

interface IValidator {
    public_key: string;
    stake: string;
    reward: string;
    uptime_percent: string;
    first_block: string;
    last_voted: string;
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
    order_id: string;
    poster_address: string;
    maker_address: string;
    subcontract_address: string;
    order_type: string;
}
