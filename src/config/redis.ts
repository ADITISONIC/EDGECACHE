import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient>;

const connectRedis = async () => {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error("REDIS_URL is missing in .env");
  }

  redisClient = createClient({
    url: redisUrl,
  });

  redisClient.on("connect", () => {
    console.log("🟢 Redis Connected");
  });

  redisClient.on("error", (err) => {
    console.error("🔴 Redis Error:", err);
  });

  await redisClient.connect();
};

export { redisClient, connectRedis };
