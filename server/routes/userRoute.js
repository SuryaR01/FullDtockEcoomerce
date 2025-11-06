// import express from "express";
// import {
//   create,
//   getAllUserLists,
//   getUserListById,
//   update,
//   deleteUserList,
// } from "../controller/userListController.js";

// const router = express.Router();

// router.post("/UserList", create);
// router.get("/userListsAll", getAllUserLists);
// router.get("/userListsById/:id", getUserListById);
// router.put("/userListsUpdate/:id", update);
// router.delete("/userListsDelete/:id", deleteUserList);

// export default router;


import express from "express";
import jwt from "jsonwebtoken";
import UserList from "../model/registerModel.js"
import authMiddleware from "../authMiddleware.js"
import {createLoginUser, deleteloginUser, getAllLoginUsers, getLoginUserById, updateloginUser } from "../controller/userController.js"

const router = express.Router();

/* ===============================
   🔐 PROTECTED ROUTE (JWT REQUIRED)
================================== */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // Fetch userList info without password
    const userList = await UserList.findById(req.userList.id).select("-password");
    if (!userList)
      return res.status(404).json({ message: "UserList not found" });

    res.json(userList);
  } catch (err) {
    console.error("Error in /me route:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===============================
   👤 USERList CRUD ROUTES
================================== */
router.post("/userList", createLoginUser );              // ➕ Create userList
router.get("/userListsAll", getAllLoginUsers);      // 📄 Get all userLists
router.get("/userListsById/:id", getLoginUserById); // 🔍 Get single userList by ID
router.put("/userListsUpdate/:id", updateloginUser);    // ✏️ Update userList
router.delete("/userListsDelete/:id", deleteloginUser); // ❌ Delete userList

export default router;
