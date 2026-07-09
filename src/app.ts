import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import urlRoutes from "./routes/UrlRoutes";
import { rateLimiter } from "./middleware/rateLimiter";
import authRoutes from "./auth/authRoutes";
const app = express();

// Middleware
app.use(express.json());
app.use(rateLimiter);
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/urls", urlRoutes);
app.use("/api/auth", authRoutes);
// Health Check Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 EdgeCache API is Running",
  });
});

export default app;
