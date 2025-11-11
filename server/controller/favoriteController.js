

import Favorite from "../model/favoriteModel.js";
import Product from "../model/productModel.js";

/**
 * ✅ Add Product to Favorites (stores full product details)
 */
export const addFavorite = async (req, res) => {
  try {
    const { username, productId } = req.body;

    if (!username || !productId) {
      return res
        .status(400)
        .json({ message: "username and productId are required" });
    }

    // 🧩 Check if product exists
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // 🧩 Check for duplicate favorite
    const existing = await Favorite.findOne({
      username,
      "product._id": productId,
    });
    if (existing) {
      return res.status(200).json({ message: "Already in favorites" });
    }

    // 🧩 Create new favorite with product snapshot
    const fav = new Favorite({
      username,
      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
        stock: product.stock,
      },
    });

    await fav.save();

    res.status(201).json({
      message: "✅ Added to favorites",
      fav,
    });
  } catch (error) {
    console.error("❌ Favorite add error:", error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


export const removeFromFavorites = async (req, res) => {
  try {
    const { username, productId } = req.body;

    if (!username || !productId) {
      return res
        .status(400)
        .json({ message: "username and productId are required" });
    }

    const deleted = await Favorite.findOneAndDelete({
      username,
      "product._id": productId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.json({ message: "✅ Removed from favorites" });
  } catch (error) {
    console.error("❌ Favorite remove error:", error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

/**
 * ✅ Get All Favorites for a User (by username)
 */
export const getUserFavorites = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: "username is required" });
    }

    const favorites = await Favorite.find({ username });

    res.status(200).json({
      message: "✅ Favorites fetched successfully",
      count: favorites.length,
      favorites,
    });
  } catch (error) {
    console.error("❌ Get favorites error:", error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
