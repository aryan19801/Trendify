import mongoose from "mongoose";


export const  connectDB = async ()=>{
    try {
        const conn =  await mongoose.connect(process.env.MONGO_URI);
        console.log(`Server is connected with the database :${conn.connection.host} ` );
    } catch (error) {
        console.log(`Error in connecting with the database :`,error);
        process.exit(1);
    }
}