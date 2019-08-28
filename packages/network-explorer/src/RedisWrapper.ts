import Redis from "ioredis";

const { REDIS_PORT = "6379", REDIS_HOST = "localhost" } = process.env;

export class RedisWrapper {
    private readonly db: Redis;

    constructor() {
        this.db = new Redis(parseInt(REDIS_PORT), REDIS_HOST);
        this.db.on("error", (err: any) => {
            console.error(`error encountered with redis connection: ${err}`);
        });
    }

    public async get(key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.db.get(key, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    }

    public async set(key: string, value: any): Promise<void> {
        const val = value === undefined || !value ? "" : value.toString();
        return new Promise((resolve, reject) => {
            this.db.set(key, val, (err, reply) => {
                if (err || reply !== "OK") {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public async purgeAll(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.flushall((err, reply) => {
                if (err || reply !== "OK") {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}
