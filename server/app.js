import express from "express";
const app = express();
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use("/api/auth",authRoutes);
app.get("/",(req,res)=>{
    res.send("welcome to my home pqage ");
});
app.listen(PORT,()=>{
    connectDB();
    console.log(`Your server is running at :  ${PORT}`);
})