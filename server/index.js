     


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



