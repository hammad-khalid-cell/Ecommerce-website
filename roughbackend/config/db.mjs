import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/project");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB Connection Failed", err.message);
    process.exit(1);
  }
};

export default connectDB;
