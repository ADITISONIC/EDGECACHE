import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db";
import { connectRedis } from "./config/redis";
import app from "./app";
const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
  }


};

startServer();
