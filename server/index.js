     


import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import productRoute from "./routes/productRoute.js";
import registerRoute from "./routes/registerRoute.js";
import userRoute from "./routes/userRoute.js";
import favoriteRoute from "./routes/favoriteRoutes.js";
import authRoute from "./routes/registerRoute.js";
import cartRoute from "./routes/cartRoutes.js"


dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// --- MongoDB Connection ---
const MONGOURL = process.env.MONGODB_URL;
mongoose.connect(MONGOURL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err));

// --- Routes ---
app.use("/prd", productRoute);
app.use("/userReg", registerRoute);
app.use("/induser", userRoute);
app.use("/api/favorites", favoriteRoute);
app.use("/api/auth", authRoute);
app.use("/api/cart" , cartRoute )

// --- Default Route ---
app.get("/", (req, res) => res.send("🔥 Server Running with JWT Auth + MongoDB"));

// --- Start Server ---
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));



// //history method=========================================

// const orderSchema = new mongoose.Schema({
//   orderId: String,
//   userEmail: String,
//   products: Array,
//   totalAmount: Number,
//   paymentStatus: String,
//   paymentId: String,
//   shippingAddress: Object,
//   createdAt: { type: Date, default: Date.now },
// });

// const Order = mongoose.model("Order", orderSchema);

// // ✅ POST route to store order
// app.post("/api/orders", async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     await order.save();
//     res.json({ success: true, message: "Order saved successfully!" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// app.listen(5000, () => console.log("✅ Server running on port 5000"));