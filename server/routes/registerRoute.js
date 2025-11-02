

import express from "express";
import {
  create,
  getAllUsers,
  getUserById,
  update,
  deleteUser,
  login,
} from "../controller/registerController.js";

const router = express.Router();

router.post("/register", create);
router.post("/login" , login)
router.get("/registerAll", getAllUsers);
router.get("/registerUsers/:id", getUserById);
router.put("/updateRegister/:id", update);
router.delete("/deleteRegister/:id", deleteUser);

export default router;
