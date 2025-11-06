// import Register from "../model/registerModel.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // ================================ POST METHOD (CREATE USER) =============================
// export const create = async (req, res) => {
//   try {
//     const { name, email, password, conformPassword } = req.body;

//     //  1. Validate inputs
//     if (!name || !email || !password || !conformPassword) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     // 2. Check if passwords match
//     if (password !== conformPassword) {
//       return res.status(400).json({ message: "Passwords do not match." });
//     }

//     // 3. Check if user already exists
//     const userExist = await Register.findOne({ email: email.trim() });
//     if (userExist) {
//       return res.status(400).json({ message: "User already exists." });
//     }

//     // 4. Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     // 5. Create new user with hashed password only
//     const newUser = new Register({
//       name,
//       email,
//       password: hashPassword, // store only hashed password
//     });

//     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//       expiresIn: JWT_EXPIRES_IN,
//     });
//     console.log(token)
//     console.log(token)
//     res.json({ token });

//     await newUser.save();

//     res.status(201).json({ message: "User created successfully!" });
//   } catch (error) {
//     console.error("❌ Error in user registration:", error);
//     res.status(500).json({ errorMessage: error.message });
//   }
// };


// // ================================ GET ALL USERS =========================================
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await Register.find();
//     if (!users || users.length === 0) {
//       return res.status(404).json({ message: "No users found." });
//     }
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error.message });
//   }
// };

// // ================================ GET USER BY ID ========================================
// export const getUserById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await Register.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error.message });
//   }
// };

// // ================================ UPDATE USER ===========================================
// export const update = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const userExist = await Register.findById(id);

//     if (!userExist) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     await Register.findByIdAndUpdate(id, req.body, { new: true });
//     res.status(200).json({ message: "User updated successfully." });
//   } catch (error) {
//     res.status(500).json({ errorMessage: error.message });
//   }
// };

// // ================================ DELETE USER ===========================================
// export const deleteUser = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const userExist = await Register.findById(id);

//     if (!userExist) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     await Register.findByIdAndDelete(id);
//     res.status(200).json({ message: "User deleted successfully." });
//   } catch (error) {
//     res.status(500).json({ errorMessage: error.message });
//   }
// };

// // router.post("/login",

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await Register.findOne({ email });
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User not found. Please register first!" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password." });
//     }

//     // ✅ Check if admin
//     const isAdmin = email === "suriya@gmail.com";

//     res.status(200).json({
//       message: isAdmin ? "Admin login successful!" : "Login successful!",
//       user: { email: user.email, name: user.name, isAdmin },
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
