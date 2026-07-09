import { redisClient } from "../config/redis";

export const getCache = async (key: string) => {
  return await redisClient.get(key);
};

export const setCache = async (key: string, value: string) => {
  await redisClient.set(key, value, {
    EX: 3600,
  });
};

export const deleteCache = async (key: string) => {
  await redisClient.del(key);
};
