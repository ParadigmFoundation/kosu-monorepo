import { assetDataUtils, BigNumber, orderHashUtils } from "0x.js";
import { NextFunction, Request, Response } from "express";

import { DB } from "./db";
import { Quote, SignedOrderWithID, Snippet } from "./types";

/**
 * Returns a generic internal error handler (500)
 */
export function genericErrorHandler(): (e: Error, r: Request, re: Response, n: NextFunction) => Response {
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
export function parseQuotesFromOrders(baseAsset: string, orders: SignedOrderWithID[]): Quote[] {
    const quotes: Quote[] = [];
    for (const order of orders) {
        const { tokenAddress: makerAsset } = assetDataUtils.decodeERC20AssetData(order.makerAssetData);
        const makerAssetAmount = new BigNumber(order.makerAssetAmount);
        const takerAssetAmount = new BigNumber(order.takerAssetAmount);

        let price;
        let size;
        if (baseAsset.toLowerCase() === makerAsset.toLowerCase()) {
            price = takerAssetAmount.div(makerAssetAmount).toFixed(10);
            size = makerAssetAmount.toString();
        } else {
            price = makerAssetAmount.div(takerAssetAmount).toFixed(10);
            size = takerAssetAmount.toString();
        }

        const orderId = order.id;
        const expiration = order.expirationTimeSeconds.toString();
        quotes.push({ price, size, orderId, expiration });
    }
    return quotes;
}

/**
 * Main order handler (from Kosu node RPC).
 */
export function orderInsertionHandler(db: DB): (order: any) => Promise<void> {
    return async (order: any) => {
        const { makerValues } = order;
        if (!makerValues) {
            console.log(`skipping empty order`);
            return;
        }

        try {
            orderHashUtils.getOrderHashHex(makerValues);
        } catch (_) {
            console.log("skipping non-0x order");
            return;
        }

        // insert 0x order (makerValues) into db
        try {
            return db.addOrder(makerValues);
        } catch (error) {
            console.log("[%o] unable to insert order: %s", new Date(), error);
        }
    };
}

/**
 * Parse order snippets (order ID + expiration) from full 0x orders.
 *
 * @param orders raw signed 0x orders
 */
export function parseSnippetsFromOrders(orders: SignedOrderWithID[]): Snippet[] {
    const snippets: Snippet[] = [];
    for (const order of orders) {
        const orderId = order.id;
        const expiration = parseInt(order.expirationTimeSeconds.toString(), 10);
        snippets.push({ orderId, expiration });
    }
    return snippets;
}
