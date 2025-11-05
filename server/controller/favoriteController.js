// import User from "../models/userModel.js";
import Product from "../model/productModel.js";
import User from "../model/userModel.js";

// ✅ Add to favorites
// export const addFavorite = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (!user.favorites.includes(productId)) {
//       user.favorites.push(productId);
//       await user.save();
//     }

//     res.json({ message: "Added to favorites", favorites: user.favorites });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


export const addFavorite = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ set by authMiddleware
    const { productId } = req.body;

    let favorite = await Favorite.findOne({ user: userId });

    if (!favorite) {
      favorite = new Favorite({ user: userId, products: [productId] });
    } else {
      const index = favorite.products.indexOf(productId);
      if (index > -1) {
        favorite.products.splice(index, 1); // remove
      } else {
        favorite.products.push(productId); // add
      }
    }

    await favorite.save();
    res.json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Remove from favorites
export const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== productId
    );
    await user.save();

    res.json({ message: "Removed from favorites", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all favorites
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
