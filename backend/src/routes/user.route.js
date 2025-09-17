import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addFavorite, getAllUsers, getFavorites, getMessages, removeFavorite } from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectRoute, getAllUsers);
router.get("/messages/:userId", protectRoute, getMessages);
router.get("/favorites", protectRoute, getFavorites);
router.post("/favorites/:songId", protectRoute, addFavorite);
router.delete("/favorites/:songId", protectRoute, removeFavorite);

export default router;
