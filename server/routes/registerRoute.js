

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




// checked ok
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


// ---------- GET ALL USERS ----------
router.get("/users", async (req, res) => {
  try {
    // Fetch all users from MongoDB (but exclude passwords)
    const users = await User.find().select("-userPassword");

    // If no users found
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      message: "✅ Users fetched successfully",
      count: users.length,
      users,
    });
  } catch (err) {
    console.error("❌ Get users error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check inputs
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Find user by email
    const user = await User.findOne({ userEmail: email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.userPassword);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // 4. Generate token
    const token = jwt.sign(
      { id: user._id, email: user.userEmail },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "✅ Login successful",
      accessToken: token,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
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


// ---------- DELETE USER ----------
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 🧩 Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🧩 Delete the user
    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "✅ User deleted successfully",
      deletedUserId: id,
    });
  } catch (err) {
    console.error("❌ Delete user error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


export default router;


