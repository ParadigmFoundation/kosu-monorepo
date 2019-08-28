import { clearInterval } from "timers";
import uuid from "uuid/v4";
import ws from "ws";

/**
 * Safely send data to a client (does nothing if socket closed).
 *
 * @param ws socket instance of client connection
 * @param data data to send to client
 */
export function safeSend(socket: ws, data: any): void {
    if (socket.readyState === socket.OPEN) {
        const message = typeof data === "string" ? data : JSON.stringify(data);
        return void socket.send(message);
    } else {
        return;
    }
}

/**
 * Common socket error handler.
 */
export function socketErrorHandlerClosure(prefixMessage: string): (e: any) => void {
    return (error: any) => {
        const log = error && error.message ? error.message : error;
        console.error(`${prefixMessage}: ${log}`);
    };
}

/**
 * Abstraction over  JSONRPC query methods.
 */
export async function nodeQuery(socket: ws, method: string, params: any[], timeout: number = 4000): Promise<any> {
    return new Promise((resolve, reject) => {
        const requestId = uuid();
        let handler: (m: any) => void;

        const timer = setTimeout(() => {
            socket.off("message", handler);
            clearInterval(timer);
            reject(`timeout: failed query with method: "${method}"`);
        }, timeout);

        handler = (msg: any) => {
            const parsed = JSON.parse(msg.toString());
            if (parsed.id === requestId) {
                socket.off("message", handler);
                clearInterval(timer);
                resolve(parsed.result);
            }
        };

        socket.on("message", handler);
        socket.send(
            JSON.stringify({
                jsonrpc: "2.0",
                id: requestId,
                method,
                params,
            }),
        );
    }).catch((err: any) => {
        console.error(`failed node query: ${err}`);
    });
}
