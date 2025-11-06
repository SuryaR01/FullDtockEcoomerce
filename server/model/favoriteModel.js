


// import mongoose from "mongoose";

// const favoriteSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       index: true, // ✅ optional: improves query speed (not unique)
//     },
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// // ✅ Prevent duplicate favorites per user-product combination
// favoriteSchema.index({ username: 1, productId: 1 }, { unique: true });

// export default mongoose.model("Favorite", favoriteSchema);



import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: true, // ✅ Optional: speeds up user queries
    },

    // Store full product snapshot at the time of favoriting
    product: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
      stock: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

// ✅ Prevent duplicate favorites for same user + same product
favoriteSchema.index({ username: 1, "product._id": 1 }, { unique: true });

export default mongoose.model("Favorite", favoriteSchema);
