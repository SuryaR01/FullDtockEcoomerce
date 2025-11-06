

import express from "express";
import {
  addFavorite,
  removeFromFavorites,
  getUserFavorites,
} from "../controller/favoriteController.js";

const router = express.Router();

router.post("/add", addFavorite);
router.post("/remove", removeFromFavorites);
router.get("/:username", getUserFavorites);

export default router;
