import Url from "../models/Url";
import { generateShortId } from "../utils/generateShortId";
import { getCache, setCache } from "../cache/cache";

export const createShortUrl = async (
  originalUrl: string,
  userId: string,
  customAlias?: string,
  expiresAt?: Date,
) => {
  let shortId = customAlias || generateShortId();
  const existing = await Url.findOne({ shortId });

  if (existing) {
    throw new Error("Custom alias already exists");
  }

  // Ensure shortId is unique
  if (!customAlias) {
    while (await Url.findOne({ shortId })) {
      shortId = generateShortId();
    }
  }

  const url = await Url.create({
    originalUrl,
    shortId,
    user: userId,
    expiresAt,
  });

  return url;
};

export const getOriginalUrl = async (shortId: string) => {
  // Check Redis first

  const cachedUrl = await getCache(shortId);

  if (cachedUrl) {
    console.log("✅ Cache Hit");

    await Url.findOneAndUpdate(
      { shortId },

      { $inc: { clicks: 1 } },
    );

    return cachedUrl;
  }

  console.log("❌ Cache Miss");

  const url = await Url.findOne({ shortId });

  if (!url) {
    return null;
  }

  await setCache(shortId, url.originalUrl);

  url.clicks++;

  await url.save();

  return url.originalUrl;
};

export const getUserUrls = async (userId: string) => {
  return await Url.find({ user: userId })
    .select("originalUrl shortId clicks createdAt expiresAt")
    .sort({ createdAt: -1 });
};

export const deleteUrl = async (urlId: string, userId: string) => {
  const deletedUrl = await Url.findOneAndDelete({
    _id: urlId,
    user: userId,
  });

  if (!deletedUrl) {
    throw new Error("URL not found or you are not authorized");
  }

  return deletedUrl;
};