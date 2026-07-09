import { Router } from "express";
import {
  shortenUrl,
  redirectToOriginalUrl,
} from "../controllers/urlController";

const router = Router();

router.post("/shorten", shortenUrl);
router.get("/:shortId", redirectToOriginalUrl);

export default router;
