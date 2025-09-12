import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}?retryWrites=true&w=majority`)
        console.log(`\n MongoDB connected !! DB host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("mongoDB connect error", error);
        process.exit(1)
    }
}