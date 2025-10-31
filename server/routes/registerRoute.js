

import express from "express";
import {
  create,
  getAllUsers,
  getUserById,
  update,
  deleteUser,
} from "../controller/registerController.js";

const router = express.Router();

router.post("/register", create);
router.get("/registerAll", getAllUsers);
router.get("/registerUsers/:id", getUserById);
router.put("/updateRegister/:id", update);
router.delete("/deleteRegister/:id", deleteUser);

export default router;
