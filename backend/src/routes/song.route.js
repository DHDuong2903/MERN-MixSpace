import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getTrendingSongs, searchSongs } from "../controllers/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/trending", getTrendingSongs);
router.get("/search", searchSongs);

export default router;
