import { Kosu } from "@kosu/kosu.js";
import Redis from "ioredis";
import uuid from "uuid/v4";
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
 * @param cache used to track client connections
 * @param kosu instantiated kosu.js instance
 * @param kosuRpc socket connection to kosu JSONRPC server
 */
export function connectionHandlerClosure(clients: IClientMap, kosu: Kosu): (s: ws, r: ws.Data) => void {
    const redis = new Redis(parseInt(REDIS_PORT), REDIS_HOST);
    return (socket: ws, request: ws.Data) => {
        const subscriptionId = uuid();
        const serverSecret = uuid();

        console.log(`adding client with server ID: '${subscriptionId}' and client ID: '${subscriptionId}'`);
        clients[serverSecret] = {
            client: socket,
            id: subscriptionId,
        };

        socket.onclose = () => {
            console.log(`client disconnected with server ID: ${serverSecret}`);
            delete clients[serverSecret];
        };

        // notify client of subscription ID
        safeSend(socket, { message: subscriptionId });

        // handle requests for values
        socket.on("message", requestHandlerClosure(socket, serverSecret, kosu));
    };
}
