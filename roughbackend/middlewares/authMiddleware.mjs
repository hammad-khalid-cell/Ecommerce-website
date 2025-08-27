import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  // 1. Try cookie first
  const  token = req.cookies.token;
  
  console.log("this is the token", token);

  if (!token) {
    
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("this is the decoded value",decoded);
    console.log("this is the token in the try block", token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
