

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  // 🧡 store favorite product IDs
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default mongoose.model("User", userSchema);




// import mongoose from "mongoose";

// const favoriteSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "Register", required: true },
//     product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Favorite", favoriteSchema);
