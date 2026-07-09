import Url from "../models/Url";

export const getDashboardData = async (userId: string) => {
  const totalUrls = await Url.countDocuments({
    user: userId,
  });

  const totalClicksResult = await Url.aggregate([
    {
      $match: {
        user: Url.db.base.Types.ObjectId.createFromHexString(userId),
      },
    },
    {
      $group: {
        _id: null,
        totalClicks: {
          $sum: "$clicks",
        },
      },
    },
  ]);

  const totalClicks =
    totalClicksResult.length > 0 ? totalClicksResult[0].totalClicks : 0;

  const mostClicked = await Url.findOne({
    user: userId,
  }).sort({
    clicks: -1,
  });

  const recentUrls = await Url.find({
    user: userId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(5)
    .select("shortId originalUrl clicks createdAt");

  return {
    totalUrls,
    totalClicks,
    mostClicked,
    recentUrls,
  };
};
