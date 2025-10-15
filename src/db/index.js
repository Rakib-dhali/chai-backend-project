import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URL}`,
    );
    console.log(
      `MongoDB connected !! DB host: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("mongoDB connect error", error);
    process.exit(1);
  }
};
