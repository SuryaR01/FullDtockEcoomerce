

import express from "express";
import { addToCart, getCartItems, removeFromCart } from "../controller/cartController.js";


const router = express.Router();

router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.get("/:username", getCartItems);

export default router;
