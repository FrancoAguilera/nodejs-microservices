import mongoose from "mongoose";
import { config } from "./envConfig";

const MONGO_URL = `${config.MONGO_URL}/orders`;

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL, {
      autoIndex: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
