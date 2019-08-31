import { Kosu, OrderSerializer } from "@kosu/kosu.js";
import Redis from "ioredis";
import uuid from "uuid/v4";
import { orderHashUtils, Order } from "0x.js";
import ws from "ws";

import { ChainData } from "./ChainData";
import { requestHandlerClosure } from "./requestHandler";
import { safeSend } from "./utils";

const { REDIS_HOST = "localhost", REDIS_PORT = "6379" } = process.env;

export interface IClientMap {
    [id: string]: {
        client: ws;
        id: string;
    };
}

/**
 * Main closure used to handle client connections. Returns handler function to
 * be used as a WebSocket server "connection" handler.
 *
 * @param clients used to track client connections
 * @param chain initialized chain data manager
 */
export function orderHandlerClosure(chain: ChainData): (message: any) => void {
    return async (order: any) => {
        if (order.id) {
            console.log(`new orders subscription with ID: ${order.id}`);
        }
        if (!order.subContract) {
            return;
        }

        const makerAddress = order.maker;
        const posterAddress = await chain.kosu.orderHelper.recoverPoster(order);

        let orderId;
        let orderType;
        if (order.makerValues && order.makerValues.makerAssetData) {
            orderType = "0x";
            orderId = orderHashUtils.getOrderHashHex(order.makerValues);
        } else {
            orderType = "other";
            orderId = OrderSerializer.posterSignatureHex(order, order.arguments);
        }

        const orderData = { makerAddress, posterAddress, orderId, orderType };
        chain.addOrder(orderData);
    };
}
