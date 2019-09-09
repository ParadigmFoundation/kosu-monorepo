import { Request, Response, NextFunction } from "express";
import { SignedOrder } from "0x.js";

export type HandlerFunction = (req: Request, res: Response, next: NextFunction) => Response;
export type AsyncHandlerFunction = (req: Request, res: Response, next: NextFunction) => Promise<Response>;

export interface Snippet {
    orderId: string;
    expiration: number;
}
export interface Quote {
    price: string;
    size: string;
    expiration: string;
    orderId: string;
}

export interface SignedOrderWithID extends SignedOrder {
    id?: string;
}
