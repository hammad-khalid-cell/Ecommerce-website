import express, { response } from "express";
import mongoose, { connect } from "mongoose";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import cors from "cors";
import { checkUserValidationSchema } from "./utils/checkUserValidationSchema.mjs";
import { User } from "./models/mongoose/schema/users.mjs";
import { hashPassword, comparePassword } from "./utils/helper.mjs";
import "./strategies/google-strategy.mjs"
import passport from "passport";
import session from "express-session";
import authRoutes from "./authRoutes.mjs"
import jwt from "jsonwebtoken";




const app = express();


app.use(
  session({
    secret: "hammad",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/auth", authRoutes);


mongoose
    .connect("mongodb://localhost:27017/project")
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(`Error : ${err}`));




app.get("/", (request, response) => {
    response.send("server is ready")
})

app.post(
  "/api/users/login",
  async (request, response) => {
    try {
      const { email, password } = request.body;

      // 1. Validate input
      if (!email || !password) {
        return response.status(400).json({ error: "Email and password are required" });
      }

      // 2. Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return response.status(401).json({ error: "Invalid email or password" });
      }

      // 3. Compare passwords
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return response.status(401).json({ error: "Invalid email or password" });
      }else{
         response.json({
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
      response.redirect("http://localhost:5173/")

      }

      // 4. Success → return user info (or JWT if you want token auth)
     
    } catch (err) {
      console.error("Login error:", err);
      response.status(500).json({ error: "Internal server error" });
    }
  }
);

app.post(
  "/api/users",
  checkSchema(checkUserValidationSchema),
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = request.body; 
      if (!username || !email || !password) {
        return response.status(400).json({ error: "All fields are required" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return response.status(400).json({ error: "User already exists , logIn" });
      }

      const hashedpassword = await hashPassword(password);

      const newUser = new User({ username, email, password: hashedpassword });
      const savedUser = await newUser.save();

      response.status(201).json(savedUser);
      console.log("User saved:", username, email);
    } catch (err) {
      console.error("Error saving user:", err);
      response.status(500).json({ error: "Failed to save user" });
    }
  }
);


const JWT_SECRET = "cdkjv3459cbkd9"; 

app.post("/api/auth/reset-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    // frontend route for entering new password
    const resetLink = `http://localhost:5173/reset-password/${token}`;
    res.json({ message: "Password reset link generated", resetLink });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// reset password
app.post("/api/auth/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.resetToken !== token || Date.now() > user.resetTokenExpiry) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashed = await hashPassword(newPassword, 10);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
});



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

