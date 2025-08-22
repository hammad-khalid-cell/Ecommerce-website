import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";

import connectDB from "./config/db.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import passwordRoutes from "./routes/passwordRoutes.mjs";

// Load env vars
dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow cookies
  })
);


app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", passwordRoutes); 

app.get("/", (req, res) => res.send("Server is running 🚀"));

// Connect DB + Start server
connectDB();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
