import express from "express";
import {
  create,
  getAllUsers,
  getUserById,
  update,
  deleteUser,
} from "../controller/userController.js";

const router = express.Router();

router.post("/User", create);
router.get("/usersAll", getAllUsers);
router.get("/usersById/:id", getUserById);
router.put("/usersUpdate/:id", update);
router.delete("/usersDelete/:id", deleteUser);

export default router;
