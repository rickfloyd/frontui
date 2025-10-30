import Redis from "ioredis";
import rateLimit from "express-rate-limit";

const redis = new Redis(process.env.REDIS_URL);

export const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 300, // 300 requests/min/user
  handler: (_, res) => res.status(429).json({ error: "Too many requests" }),
});

export async function cacheSet(key, data, ttl = 60) {
  await redis.set(key, JSON.stringify(data), "EX", ttl);
}

export async function cacheGet(key) {
  const val = await redis.get(key);
  return val ? JSON.parse(val) : null;
}
