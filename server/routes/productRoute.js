
import express from "express"

import { create, deleteProduct, getById, updateProduct  } from "../controller/productController.js";

const route = express.Router();

route.post("/product" , create)
route.get("/getproduct/:id" , getById)
route.put("/updateproduct/:id" , updateProduct)
route.delete("/deleteproduct/:id" , deleteProduct )

export default route;