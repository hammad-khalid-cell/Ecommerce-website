
import jwt from "jsonwebtoken";
import { User } from "../models/mongoose/schema/users.mjs"; 
import { hashPassword } from "../utils/helper.mjs";


const JWT_SECRET = "cdkjv3459cbkd9"; 

router.post("/api/auth/reset-password", async (req, res) => {
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
router.post("/api/auth/reset-password/:token", async (req, res) => {
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
