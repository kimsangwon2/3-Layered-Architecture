import "dotenv/config";
import { Cache } from "cache-store-manager";
export let redisCache;
redisCache = Cache.create("redis", {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  db: 0,
  ttl: 60 * 1000,
  connectTimeout: 5000,
  enableOfflineQueue: false, // 오프라인 큐 비활성화
  showFriendlyErrorStack: true,
});
