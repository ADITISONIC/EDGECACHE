import { Request, Response } from "express";
import {
  createShortUrl,
  getOriginalUrl,
  getUserUrls,
} from "../services/urlServices";
import { AuthRequest } from "../middleware/authMiddleware";

export const shortenUrl = async (req: AuthRequest, res: Response) => {
  try {
    const { originalUrl, customAlias, expiresAt } = req.body;
    const userId = req.user._id.toString();

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: "Original URL is required",
      });
    }

    const url = await createShortUrl(
      originalUrl,
      userId,
      customAlias,
      expiresAt,
    );

    return res.status(201).json({
      success: true,
      shortUrl: `http://localhost:${process.env.PORT}/${url.shortId}`,
      data: url,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

export const redirectToOriginalUrl = async (
  req: Request<{ shortId: string }>,
  res: Response,
) => {
  try {
    const { shortId } = req.params;

    const originalUrl = await getOriginalUrl(shortId);

    if (!originalUrl) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    return res.redirect(originalUrl);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMyUrls = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!._id.toString();

    const urls = await getUserUrls(userId);

    return res.status(200).json({
      success: true,
      count: urls.length,
      data: urls,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};