
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    product: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: String,
      price: Number,
      category: String,
      description: String,
      image: String,
      stock: Number,
      quantity: { type: Number, default: 1 },
    },
  },
  { timestamps: true }
);

// prevent duplicate items per user-product
cartSchema.index({ username: 1, "product._id": 1 }, { unique: true });

export default mongoose.model("Cart", cartSchema);

