import { NextFunction, Request, Response } from "express";

import { DB } from "../db";
import { AsyncHandlerFunction } from "../types";
import { parseQuotesFromOrders } from "../utils";

export function searchClosure(db: DB): AsyncHandlerFunction {
    return async (req: Request, res: Response, next: NextFunction) => {
        await db.initializing;
        const { baseAsset, quoteAsset, side, page = 0, perPage = 10 } = req.query;

        const orders = await db.getOrdersForPair(baseAsset, quoteAsset, side, perPage, page);
        const quotes = parseQuotesFromOrders(baseAsset, orders);
        return res.status(200).send({ side, baseAsset, quoteAsset, page, perPage, quotes });
    };
}
