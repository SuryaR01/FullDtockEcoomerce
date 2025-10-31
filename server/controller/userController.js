// import Users from "../model/userModel.js";

// // ================================ CREATE USER ==========================================
// export const create = async (req, res) => {
//   try {
//     const { uaerName, uaerEmail, uaerPassword } = req.body;

//     // ✅ Check for empty fields
//     if (!name || !uaerEmail || !uaerPassword) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     // ✅ Check if user already exists
//     const userExist = await Users.findOne({ uaerEmail: uaerEmail.trim() });
//     if (userExist) {
//       return res.status(400).json({ message: "User already exists." });
//     }

//     // ✅ Create and save new user
//     const newUser = new Users({ name, uaerEmail, uaerPassword });
//     await newUser.save();

//     res.status(201).json({ message: "User created successfully!" });
//   } catch (error) {
//     res.status(500).json({ errorMessage: error.message });
//   }
// };

// // ================================ GET ALL USERS =========================================
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await Users.find();
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
//     const user = await Users.findById(id);
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
//     const userExist = await Users.findById(id);

//     if (!userExist) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     await Users.findByIdAndUpdate(id, req.body, { new: true });
//     res.status(200).json({ message: "User updated successfully." });
//   } catch (error) {
//     res.status(500).json({ errorMessage: error.message });
//   }
// };

// // ================================ DELETE USER ===========================================
// export const deleteUser = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const userExist = await Users.findById(id);

//     if (!userExist) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     await Users.findByIdAndDelete(id);
//     res.status(200).json({ message: "User deleted successfully." });
//   } catch (error) {
//     res.status(500).json({ errorMessage: error.message });
//   }
// };






import Users from "../model/userModel.js";

// ================================ CREATE USER ==========================================
export const create = async (req, res) => {
  try {
    const { uaerName, uaerEmail, uaerPassword, userContact } = req.body;

    // ✅ Check for empty required fields
    if (!uaerName || !uaerEmail || !uaerPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Check if user already exists
    const userExist = await Users.findOne({ uaerEmail: uaerEmail.trim() });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    // ✅ Create and save new user (userContact is optional)
    const newUser = new Users({
      uaerName,
      uaerEmail,
      uaerPassword,
      userContact: userContact || null, // optional field
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// ================================ GET ALL USERS =========================================
export const getAllUsers = async (req, res) => {
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
export const getUserById = async (req, res) => {
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
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Users.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    // ✅ Allow updating userContact if provided
    const updatedData = {
      uaerName: req.body.uaerName || userExist.uaerName,
      uaerEmail: req.body.uaerEmail || userExist.uaerEmail,
      uaerPassword: req.body.uaerPassword || userExist.uaerPassword,
      userContact: req.body.userContact || userExist.userContact,
    };

    await Users.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// ================================ DELETE USER ===========================================
export const deleteUser = async (req, res) => {
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
