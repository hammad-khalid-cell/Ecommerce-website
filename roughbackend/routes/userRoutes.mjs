import express, { request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.mjs";

const router =  express.Router();

import dotenv from "dotenv";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
dotenv.config();


router.get("/me", authMiddleware, async (request, response) => {
  try {
    const user = await User.findById(request.user.id).select("username email role profilePic");
    if (!user) return response.status(404).json({ error: "User not found" });
    response.json(user);
  } catch (err) {
    console.error("Error in /me:", err);
    response.status(500).json({ error: "Server error" });
  }
});

router.get("/get", async(req, res)=>{
  try{
    const users = await User.find();
    res.json(users)
  }catch(err){
    console.error("Error fetching users", err);
    res.status(500).json({error : "Failed to fetch users"})
  }
})



export default router;