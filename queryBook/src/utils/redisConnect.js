const redis = require("redis");
const redisClient = redis.createClient({
  host: process.env.REDIS_CLIENT_HOST || "127.0.0.1",
  port: process.env.REDIS_CLIENT_PORT || 6379,
  db: 2
});
redisClient
  .on("connect", () => {
    console.log(`${new Date().toISOString()} [REDIS] Connected to Redis Store`);
  })
  .on("error", err => {
    console.log(`${new Date().toISOString()} [REDIS] ${JSON.stringify(err)}`);
  });
module.exports = redisClient;
