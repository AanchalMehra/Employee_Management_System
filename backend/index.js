import express from "express"
import dotenv from "dotenv"
import dbConnection from "./config/db.js"
import multer from "multer";
import cors from "cors";

const app=express();
dotenv.config();
dbConnection();

const PORT=process.env.PORT||4000;
app.use(cors())
app.use(express.json())
app.use(multer().none())

app.get("/", (req, res) => {
    res.send("Server is running");
});
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))