import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { User } from "../models/user.mjs";
import { hashPassword } from "../utils/hashPassword.mjs";
import { comparePassword } from "../utils/comparePassword.mjs";
import dotenv from "dotenv"


dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET value:", process.env.JWT_SECRET);


// 🔑 Register new user
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists, please login" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Failed to save user" });
  }
};

// 🔑 Login user with email + password
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // ✅ Generate JWT
    const token = jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });


    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true if HTTPS
      sameSite: "lax",
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        role :  user.role,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 🔑 Google OAuth callback
export const googleCallback = (req, res) => {
  try {
    const googeleUser = req.user; 

    if (!googeleUser) {
      return res.status(400).json({ error: "No user returned from Google OAuth" });
    }

    const token = jwt.sign(
      { id: googeleUser._id.toString(), role: googeleUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "lax",
    });

    res.redirect("http://localhost:5173/");
  } catch (err) {
    console.error("Google callback error:", err);
    res.status(500).json({ error: "OAuth login failed" });
  }
};



export const facebookCallback = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Facebook authentication failed" });
  }

  const token = jwt.sign(
    { id: req.user._id.toString(), role: req.user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.redirect("http://localhost:5173/");
};

// 🔑 Logout
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({message: "User logged out successfully"})
};
