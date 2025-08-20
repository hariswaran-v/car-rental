import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Using existing MongoDB connection");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    throw err;
  }
};

export default connectDB;
