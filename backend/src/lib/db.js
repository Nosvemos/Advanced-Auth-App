import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${db.connection.host}`);
  } catch (error) {
    console.error("Error connection to MongoDB: ", error.message);
    process.exit(1);
  }
}