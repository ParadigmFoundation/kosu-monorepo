import { Kosu } from "@kosu/kosu.js";
import Redis from "ioredis";
import uuid from "uuid/v4";
import ws from "ws";

import { ChainData } from "./ChainData";
import { requestHandlerClosure } from "./requestHandler";
import { safeSend } from "./utils";

const {
    REDIS_HOST = "localhost",
    REDIS_PORT = "6379",
} = process.env;

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
    return (message: any) => {
        if (message.id) {
            console.log(`new orders subscription with ID: ${message.id}`);
        }
    };
}
