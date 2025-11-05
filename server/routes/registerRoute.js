

// import express from "express";
// import {
//   create,
//   getAllUsers,
//   getUserById,
//   update,
//   deleteUser,
//   login,
// } from "../controller/registerController.js";

// const router = express.Router();

// router.post("/register", create);
// router.post("/login" , login)
// router.get("/registerAll", getAllUsers);
// router.get("/registerUsers/:id", getUserById);
// router.put("/updateRegister/:id", update);
// router.delete("/deleteRegister/:id", deleteUser);

// export default router;



import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_EXPIRE = process.env.JWT_EXPIRES_IN || "15m";
const REFRESH_EXPIRE = process.env.REFRESH_EXPIRES_IN || "7d";
let refreshTokensStore = [];

// ---------- Create Access Token ----------
function createAccessToken(user) {
  const payload = { sub: user._id, username: user.username };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRE });
}

// ---------- Create Refresh Token ----------
function createRefreshToken(user) {
  const payload = { sub: user._id };
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRE });
}


router.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    console.log("📥 Incoming register data:", req.body);

    // 🧩 1. Check required fields
    if (!username || !email || !password || !confirmPassword)
      return res.status(400).json({ message: "All fields are required" });

    // 🧩 2. Check password match
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    // 🧩 3. Check for existing user
    const existing = await User.findOne({ userEmail: email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    // 🧩 4. Hash password
    const hash = await bcrypt.hash(password, 10);

    // 🧩 5. Create user with correct field names
    const newUser = new User({
      userName: username,
      userEmail: email,
      userPassword: hash,
    });

    await newUser.save();

    res.status(201).json({ message: "✅ Registered successfully" });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



// ---------- LOGIN ----------
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Username & password required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid)
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    refreshTokensStore.push(refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      path: "/api/auth/refresh",
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// ---------- REFRESH ----------
router.post("/refresh", (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);
  if (!refreshTokensStore.includes(token)) return res.sendStatus(403);

  jwt.verify(token, REFRESH_SECRET, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const user = await User.findById(payload.sub);
    if (!user) return res.sendStatus(403);

    const newAccessToken = createAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
});

// ---------- LOGOUT ----------
router.post("/logout", (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    refreshTokensStore = refreshTokensStore.filter((t) => t !== token);
  }
  res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
  res.json({ message: "✅ Logged out" });
});

// ---------- PROTECTED ----------
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = payload;
    next();
  });
}

router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is protected data!", user: req.user });
});

export default router;
