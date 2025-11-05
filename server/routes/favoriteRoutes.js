import express from "express";
import authMiddleware from "../authMiddleware.js";
import { addFavorite, getFavorites, removeFavorite } from "../controller/favoriteController.js";
const router = express.Router();

// Add to favorites
router.post("/add", authMiddleware, addFavorite);

// Remove from favorites
router.delete("/remove/:productId", authMiddleware, removeFavorite);

// Get user’s favorites
router.get("/", authMiddleware, getFavorites);

export default router;
