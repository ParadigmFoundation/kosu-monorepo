import { Router } from "express";

import { DB } from "../db";
import { wrapAsync } from "../utils";

import { orderClosure } from "./order";
import { ordersClosure } from "./orders";
import { searchClosure } from "./search";

const {
    MYSQL_PORT = "3306",
    MYSQL_HOST = "127.0.0.1",
    MYSQL_USER = "root",
    MYSQL_PASSWORD = "root",
    MYSQL_DATABASE = "order_db",
} = process.env;

export const router = Router();

const connectionOptions = {
    host: MYSQL_HOST,
    port: parseInt(MYSQL_PORT, 10),
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
};

const db = new DB(connectionOptions, false);

router.get("/search", wrapAsync(searchClosure(db)));
router.get("/orders", wrapAsync(ordersClosure(db)));
router.get("/order", wrapAsync(orderClosure(db)));
