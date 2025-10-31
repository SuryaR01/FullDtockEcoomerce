import Register from "../model/registerModel.js";

// ================================ POST METHOD (CREATE USER) =============================
export const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for empty fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const userExist = await Register.findOne({ email: email.trim() });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create and save new user
    const newUser = new Register({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// ================================ GET ALL USERS =========================================
export const getAllUsers = async (req, res) => {
  try {
    const users = await Register.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// ================================ GET USER BY ID ========================================
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Register.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// ================================ UPDATE USER ===========================================
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Register.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    await Register.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// ================================ DELETE USER ===========================================
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Register.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    await Register.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
