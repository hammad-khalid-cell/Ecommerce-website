import { Router } from "express";
import passport from "passport";
import { checkSchema } from "express-validator";
import {
  registerUser,
  loginUser,
  googleCallback,
  logoutUser,
} from "../controllers/authController.mjs";
import { checkUserValidationSchema } from "../utils/checkUserValidationSchema.mjs";
import "../config/passport.mjs";


const router = Router();

// Register
router.post("/users", checkSchema(checkUserValidationSchema), registerUser);

// Login
router.post("/users/login", loginUser);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login", session: false }), googleCallback);

// Logout
router.get("/logout", logoutUser);

export default router;
