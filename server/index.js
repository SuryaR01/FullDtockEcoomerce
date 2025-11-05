
// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import dotenv from "dotenv"
// import route from "./routes/productRoute.js";
// import router from "./routes/registerRoute.js";
// import UserRouter from "./routes/userRoute.js";
// import cors from "cors"
// import favoriteRoutes from "./routes/favoriteRoutes.js"
// const cookieParser = require('cookie-parser');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const app = express();
// app.use(bodyParser.json());
// dotenv.config();
// app.use(cors())
// app.use(express.json())

// const PORT = process.env.PORT || 7000;
// const MANGOURL = process.env.MONGODB_URL;
// const JWT_Token = process.env.JWT_SECRET


 
// mongoose
//         .connect(MANGOURL)
//        .then(() => {
//         console.log("DB Connetced Successfully")
//         app.listen(PORT , () => {
//             console.log(`server is running on port : ${PORT}`)
//         })
//        })
//        .catch((error) => console.log(error));

//        app.use("/prd" , route)
//        app.use("/userReg" , router)
//        app.use("/induser" , UserRouter)
//        app.use("/api/favorites", favoriteRoutes);
      


import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import productRoute from "./routes/productRoute.js";
import registerRoute from "./routes/registerRoute.js";
import userRoute from "./routes/userRoute.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import authRoute from "./routes/registerRoute.js";


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
app.use("/api/favorites", favoriteRoutes);
app.use("/api/auth", authRoute);

// --- Default Route ---
app.get("/", (req, res) => res.send("🔥 Server Running with JWT Auth + MongoDB"));

// --- Start Server ---
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
