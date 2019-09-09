import { BigNumber } from "0x.js";
import { NextFunction, Request, Response } from "express";

import { Quote, SignedOrderWithID } from "./types";

/**
 * Returns a generic internal error handler (500)
 */
export function genericErrorHandler():
    (e: Error, r: Request, re: Response, n: NextFunction) => Response {
    return (err: Error, _: Request, res: Response, __: NextFunction) => {
        const message = err.message || "internal server error, try again later";
        console.error("[%o] internal error: %s", new Date(), err);
        return res.status(500).send({ error: message });
    };
}

/**
 * .
 */
export function notFoundHandler(): (r: Request, re: Response) => Response {
    return (_: Request, res: Response) => {
        return res.status(404).send({ error: "resource not found, check endpoint" });
    };
}

/**
 * Wraps express API method handler in a Promise resolver/catcher.
 *
 * @param fn async request handler to wrap
 */
export const wrapAsync = (fn: (...args: any[]) => any) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

/**
 * Convert an array of full signed orders to quote snippets.
 */
export function parseQuotesFromOrders(orders: SignedOrderWithID[], side: "bid" | "ask"): Quote[] {
    const quotes: Quote[] = [];
    for (const order of orders) {
        const makerAssetAmount = new BigNumber(order.makerAssetAmount);
        const takerAssetAmount = new BigNumber(order.takerAssetAmount);

        const price = side === "bid"
            ? takerAssetAmount.div(makerAssetAmount).toFixed(8)
            : makerAssetAmount.div(takerAssetAmount).toFixed(8);

        const size = side === "bid"
            ? takerAssetAmount.toString()
            : makerAssetAmount.toString();

        const orderId = order.id;
        const expiration = order.expirationTimeSeconds.toString();
        quotes.push({ price, size, orderId, expiration });
    }
    return quotes;
}
