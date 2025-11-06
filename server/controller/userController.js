

import Users from "../model/userModel.js";

// ================================ CREATE USER ==========================================
export const createLoginUser = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userContact } = req.body;

    // ✅ Check for empty required fields
    if (!userName || !userEmail || !userPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Check if user already exists
    const userExist = await Users.findOne({ userEmail: userEmail.trim() });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    // ✅ Create and save new user (userContact is optional)
    const newUser = new Users({
      userName,
      userEmail,
      userPassword,
      userContact: userContact || null, // optional field
    });

    await newUser.save();

    if (newUser.role === "inducer") {
  await Cart.create({ userId: newUser._id, items: [] });
  await Favorite.create({ userId: newUser._id, favorites: [] });
}

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// ================================ GET ALL USERS =========================================
export const getAllLoginUsers = async (req, res) => {
  try {
    const users = await Users.find();
    if (!users || users.length === 0) {
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
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
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

    // ✅ Allow updating userContact if provided
    const updatedData = {
      userName: req.body.userName || userExist.userName,
      userEmail: req.body.userEmail || userExist.userEmail,
      userPassword: req.body.userPassword || userExist.userPassword,
      userContact: req.body.userContact || userExist.userContact,
    };

    await Users.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "User updated successfully." });
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
