import "dotenv/config";
import { Cache } from "cache-store-manager";
export let redisCache;
redisCache = Cache.create("redis", {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  db: 0,
  ttl: 60 * 1000,
});
