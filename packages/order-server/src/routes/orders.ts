import { NextFunction, Request, Response } from "express";

import { DB } from "../db";
import { AsyncHandlerFunction } from "../types";

export function ordersClosure(db: DB): AsyncHandlerFunction {
    return async (req: Request, res: Response, next: NextFunction) => {
        await db.initializing;
        const { makerAddress, limit } = req.query;

        const orders = await db.getOrdersByMaker(makerAddress, limit);
        return res.status(200).send(orders);
    };
}
