import { NextFunction, Request, Response } from "express";

import { DB } from "../db";
import { AsyncHandlerFunction } from "../types";

export function orderClosure(db: DB): AsyncHandlerFunction {
    return async (req: Request, res: Response, next: NextFunction) => {
        await db.initializing;
        const { id } = req.query;

        if (!id) {
            return res.status(400).send({
                error: "missing required 'id' parameter",
            });
        }

        const order = await db.getOrderById(id);
        if (!order) {
            throw new Error("order with specified ID not found");
        }
        return res.status(200).send({ id, order });
    };
}
