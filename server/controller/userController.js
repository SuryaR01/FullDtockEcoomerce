


import Users from "../model/userModel.js";
import jwt from "jsonwebtoken";

// ================================ CREATE USER ==========================================
export const createLoginUser = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userContact, role } = req.body;

    // ✅ Validation
    if (!userName || !userEmail || !userPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Check for existing user
    const userExist = await Users.findOne({ userEmail: userEmail.trim() });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    // ✅ Create and save
    const newUser = new Users({
      userName,
      userEmail,
      userPassword,
      userContact: userContact || null,
      role: role || "user",
    });

    await newUser.save();

    // ✅ Optionally create user-related records
    if (newUser.role === "inducer") {
      await Cart.create({ userId: newUser._id, items: [] });
      await Favorite.create({ userId: newUser._id, favorites: [] });
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.userEmail },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created successfully!",
      user: newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// ================================ GET ALL USERS =========================================
export const getAllLoginUsers = async (req, res) => {
  try {
    const users = await Users.find().select("-userPassword"); // hide password
    if (!users.length) {
      return res.status(404).json({ message: "No users found." });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// ================================ GET USER BY ID ========================================
export const getLoginUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findById(id).select("-userPassword");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// ================================ ✅ GET CURRENT USER ====================================
export const getCurrentUser = async (req, res) => {
  try {
    // Token can come from headers or localStorage (frontend)
    const token = req.headers.authorization?.split(" ")[1] || req.body.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user in DB
    const user = await Users.findById(decoded.id).select("-userPassword");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Current user fetched successfully.", user });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token.", error: error.message });
  }
};

// ================================ UPDATE USER ===========================================
export const updateloginUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Users.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    const updatedData = {
      userName: req.body.userName || userExist.userName,
      userEmail: req.body.userEmail || userExist.userEmail,
      userPassword: req.body.userPassword || userExist.userPassword,
      userContact: req.body.userContact || userExist.userContact,
    };

    const updatedUser = await Users.findByIdAndUpdate(id, updatedData, { new: true }).select(
      "-userPassword"
    );

    res.status(200).json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// ================================ DELETE USER ===========================================
export const deleteloginUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Users.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    await Users.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
