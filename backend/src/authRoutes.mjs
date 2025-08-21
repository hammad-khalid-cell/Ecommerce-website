import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login", 
  }),
  (req, res) => {
    // Successful login
    // You can send a JWT or set a cookie here
    res.redirect("http://localhost:5173/"); 
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Error logging out");
    res.redirect("http://localhost:5173/");
  });
});


router.get("/me", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

export default router;
