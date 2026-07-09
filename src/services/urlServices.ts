import Url from "../models/Url";
import { generateShortId } from "../utils/generateShortId";
import { getCache, setCache } from "../cache/cache";

export const createShortUrl = async (originalUrl: string, expiresAt?: Date) => {
  let shortId = generateShortId();

  // Ensure shortId is unique
  while (await Url.findOne({ shortId })) {
    shortId = generateShortId();
  }

  const url = await Url.create({
    originalUrl,
    shortId,
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