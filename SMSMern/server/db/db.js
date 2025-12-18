import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/sms"; 

const connectToDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);  
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectToDatabase;
