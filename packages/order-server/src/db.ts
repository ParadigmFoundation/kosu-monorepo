import { assetDataUtils, orderHashUtils, SignedOrder } from "0x.js";
import assert from "assert";
import mysql from "mysql";

import { SignedOrderWithID } from "./types";

/**
 * Abstraction over a MySQL database for 0x orders.
 */
export class DB {

    /** Underlying mysql connection. */
    private readonly _db: mysql.Connection;

    /** Promise that resolves when ready to use. */
    public initializing: Promise<void>;

    /**
     * Create a new order DB instance (wraps mysql).
     *
     * @param options mysql connection options
     * @param createTable optionally override table creation (default `true`)
     */
    constructor(options: mysql.ConnectionConfig, createTable: boolean = true) {
        this._db = mysql.createConnection(options);
        this._db.connect();

        // create table if requested
        this.initializing = createTable ? this._createTable() : Promise.resolve();
    }

    /**
     * Fetch orders for a given currency pair and bid/ask specification.
     *
     * @param baseAsset token address to use as the base currency
     * @param quoteAsset token address to use as the quote currency
     * @param side either "bid" or "ask" interpreted for the supplied pair
     * @param perPage optionally specify custom pagination (default 10)
     * @param page optionally select a 'page' (based on `perPage`, default 0)
     * @returns an array of orders matching the query
     */
    public async getOrdersForPair(
        baseAsset: string,
        quoteAsset: string,
        side: "bid" | "ask",
        perPage: number = 10,
        page: number = 0,
    ): Promise<SignedOrderWithID[]> {
        assert(/^0x[a-fA-F0-9]{40}$/.test(baseAsset), "invalid base asset address");
        assert(/^0x[a-fA-F0-9]{40}$/.test(quoteAsset), "invalid quote asset address");
        assert(side === "ask" || side === "bid", "invalid side: must be bid or ask");
        assert(typeof perPage === "number", "value for 'perPage' must be a number");
        assert(typeof page === "number", "value for 'page' must be a number");

        let makerAssetData;
        let takerAssetData;
        if (side === "bid") {
            makerAssetData = assetDataUtils.encodeERC20AssetData(quoteAsset);
            takerAssetData = assetDataUtils.encodeERC20AssetData(baseAsset);
        } else {
            makerAssetData = assetDataUtils.encodeERC20AssetData(baseAsset);
            takerAssetData = assetDataUtils.encodeERC20AssetData(quoteAsset);
        }

        const qs = `SELECT * FROM orders WHERE\
            makerAssetData = '${makerAssetData}' AND \
            takerAssetData = '${takerAssetData}' \
            LIMIT ${page},${perPage}`;
        console.log(qs);
        return this._query(qs);
    }

    /**
     * Fetch a single 0x order based on its order hash (ID).
     *
     * @param id a 0x order hash
     * @returns the signed order (if found) including the order hash
     */
    public async getOrderById(id: string): Promise<SignedOrderWithID> {
        assert(/^0x[a-fA-F0-9]{64}$/.test(id), "invalid 0x order ID");
        const qs = `SELECT * FROM orders WHERE id = '${id.toLowerCase()}'`;
        const order = (await this._query(qs))[0];
        if (!order) {
            throw new Error("order with requested ID not found");
        }
        return order;
    }

    /**
     * Fetch a single 0x order based on its order hash (ID).
     *
     * @param id a 0x order hash
     * @param limit restrict number of results (default 10)
     * @returns an array of signed orders from the provided maker
     */
    public async getOrdersByMaker(makerAddress: string, limit: number = 10): Promise<SignedOrderWithID[]> {
        assert(/^0x[a-fA-F0-9]{40}$/, "invalid maker's Ethereum address");
        const qs = `SELECT * FROM orders WHERE makerAddress = '${makerAddress.toLowerCase()}' LIMIT ${limit}`;
        return this._query(qs);
    }

    /**
     * Add a 0x order to the order DB.
     *
     * @param order the signed 0x order
     */
    public async addOrder(order: SignedOrder): Promise<void> {
        // get order hash and validate order
        const id = orderHashUtils.getOrderHashHex(order);

        // remove any and all address checksums
        Object.keys(order).forEach(key => {
            order[key] = order[key].toLowerCase();
        });

        const {
            makerAddress,
            takerAddress,
            feeRecipientAddress,
            senderAddress,
            makerAssetAmount,
            takerAssetAmount,
            makerFee,
            takerFee,
            exchangeAddress,
            expirationTimeSeconds,
            signature,
            salt,
            makerAssetData,
            takerAssetData,
        } = order;

        const qs = `INSERT INTO orders VALUES('${id}','${makerAddress}','${takerAddress}',\
            '${feeRecipientAddress}','${senderAddress}',${makerAssetAmount},${takerAssetAmount},\
            ${makerFee},${takerFee},'${exchangeAddress}',${expirationTimeSeconds},'${signature}',\
            ${salt},'${makerAssetData}','${takerAssetData}')`;
        await this._query(qs);
    }

    private async _createTable(): Promise<void> {
        const qs = `\
            CREATE TABLE orders (id CHAR(66) NOT NULL PRIMARY KEY,makerAddress CHAR(42) NOT NULL,\
                takerAddress CHAR(42) NOT NULL,feeRecipientAddress CHAR(42) NOT NULL,\
                senderAddress CHAR(42) NOT NULL,makerAssetAmount VARCHAR(78) NOT NULL,\
                takerAssetAmount VARCHAR(78) NOT NULL,makerFee VARCHAR(78) NOT NULL,\
                takerFee VARCHAR(78) NOT NULL,exchangeAddress CHAR(42) NOT NULL,\
                expirationTimeSeconds BIGINT NOT NULL,signature CHAR(134) NOT NULL,\
                salt VARCHAR(255) NOT NULL,makerAssetData CHAR(74) NOT NULL,\
                takerAssetData CHAR(74) NOT NULL)`;
        await this._query(qs);
        return;
    }

    private async _query(qs: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._db.query(qs, (error, results, _) => {
                if (error) {
                    reject(error);
                }
                const res = [];
                results.forEach(result => {
                    res.push({ ...result });
                });
                resolve(res);
            });
        });
    }
}
