import mongoose from "mongoose";
import config from ".";
export default async function () {
  mongoose.connect(config.MONGO_DB_URL, (err) => {
    if (err) {
      throw new Error("Error connecting to MongoDB")
    }
    console.log("Mongodb connected successfully")

  })
}