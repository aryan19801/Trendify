import express from "express";
const app = express();
const PORT = 8081;
app.get("/",(req,res)=>{
    res.send("welcome to my home pqage ");
});
app.listen(PORT,()=>{
    console.log(`Your server is running at :  ${PORT}`);
})