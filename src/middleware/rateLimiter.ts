import { Request, Response, NextFunction } from "express";
import { redisClient } from "../config/redis";

const WINDOW = Number(process.env.RATE_LIMIT_WINDOW || 60);
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 100);

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ip = req.ip || req.socket.remoteAddress || "unknown";

    const key = `rate:${ip}`;

    const requests = await redisClient.incr(key);

    if (requests === 1) {
      await redisClient.expire(key, WINDOW);
    }

    if (requests > MAX_REQUESTS) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Try again later.",
      });
    }

    next();
  } catch (error) {
    console.error(error);

    next();
  }
};
