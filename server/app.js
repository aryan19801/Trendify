import express from "express";
const app = express();
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cartRoute.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser"; 
import couponRoutes from "./routes/couponRoutes.js"
import paymentRoutes from"./routes/paymentRoutes.js"

const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/coupons",couponRoutes);
app.use("/api/payments",paymentRoutes);
app.get("/",(req,res)=>{
    res.send("welcome to my home pqage ");
});
app.listen(PORT,()=>{
    connectDB();
    console.log(`Your server is running at :  ${PORT}`);
})