
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import route from "./routes/productRoute.js";
import router from "./routes/registerRoute.js";
import UserRouter from "./routes/userRoute.js";
import cors from "cors"


const app = express();
app.use(bodyParser.json());
dotenv.config();
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 7000;
const MANGOURL = process.env.MONGODB_URL;

mongoose
        .connect(MANGOURL)
       .then(() => {
        console.log("DB Connetced Successfully")
        app.listen(PORT , () => {
            console.log(`server is running on port : ${PORT}`)
        })
       })
       .catch((error) => console.log(error));

       app.use("/prd" , route)
       app.use("/userReg" , router)
       app.use("/induser" , UserRouter)
      