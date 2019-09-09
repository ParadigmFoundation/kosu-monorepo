import { NextFunction, Request, Response } from "express";

import { DB } from "../db";
import { AsyncHandlerFunction } from "../types";

export function orderClosure(db: DB): AsyncHandlerFunction {
    return async (req: Request, res: Response, next: NextFunction) => {
        await db.initializing;
        const { id } = req.query;

        const order = await db.getOrderById(id);
        return res.status(200).send({ id, order });
    };
}
