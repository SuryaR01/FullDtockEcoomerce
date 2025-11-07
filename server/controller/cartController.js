
import Cart from "../model/cartModel.js";

// ✅ Add to cart
export const addToCart = async (req, res) => {
  try {
    const { username, product } = req.body;

    if (!username || !product?._id) {
      return res.status(400).json({ message: "username and product._id are required" });
    }

    const existing = await Cart.findOne({
      username,
      "product._id": product._id,
    });

    if (existing) {
      // Update quantity
      existing.product.quantity += 1;
      await existing.save();
      return res.status(200).json({ message: "Quantity updated", cart: existing });
    }

    const cartItem = new Cart({ username, product });
    await cartItem.save();

    res.status(201).json({ message: "Added to cart", cart: cartItem });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const { username, productId } = req.body;

    if (!username || !productId)
      return res.status(400).json({ message: "username and productId required" });

    const deleted = await Cart.findOneAndDelete({
      username,
      "product._id": productId,
    });

    if (!deleted) return res.status(404).json({ message: "Item not found in cart" });

    res.json({ message: "Removed from cart" });
  } catch (error) {
    console.error("Remove cart error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all cart items
export const getCartItems = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: "username is required" });
    }

    // 🛒 Fetch all cart items for the user
    const cart = await Cart.find({ username });

    res.status(200).json({
      message: "✅ Cart fetched successfully",
      count: cart.length,
      cart,
    });
  } catch (error) {
    console.error("❌ Get cart error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
