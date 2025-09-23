import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";
import { port } from "./constants.js";
dotenv.config();

connectDB()
  .then(() => {
    app.listen(port || 8000, () => {
      console.log(`server is running at ${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!", err);
  });

/*  import express from "express";
const app = express()

    (async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
            app.on("error", (error) => {
                console.log("Error: ", error);
                throw error
            })

            app.listen(process.env.PORT, () => {
                console.log(`app is listening on port ${process.env.PORT}`);
            })

        } catch (error) {
            console.error(`Error: ${error}`)
            throw err
        }
    })()  */
