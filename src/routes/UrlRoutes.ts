import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  shortenUrl,
  redirectToOriginalUrl,
  getMyUrls,
} from "../controllers/urlController";

const router = Router();

router.post("/shorten", protect, shortenUrl);
router.get("/my", protect, getMyUrls);
router.get("/:shortId", redirectToOriginalUrl);


export default router;
