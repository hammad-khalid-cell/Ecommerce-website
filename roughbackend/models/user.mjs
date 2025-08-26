import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: function () {
      return !this.googleId; // required only if not using Google
    },
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // email should always be unique
    lowercase: true,
    trim: true,
  },
  password: {
      type: String,
      required: function () {
        return !this.googleId && !this.facebookId; 
        
      },
    },
  googleId: {
    type: String, // only for Google OAuth users
    unique: true,
    sparse: true, // prevents conflicts with normal users
  },
  profilePic: {
    type: String, // optional (Google profile image URL)
  },
  facebookId:{
     type: String, // only for Google OAuth users
    unique: true,
    sparse: true, 
  },
    role: {
      type: String,
      enum: ["customer", "admin"], // only these values allowed
      default: "customer", // by default everyone is a normal user
    },
  
  resetToken: String,
  resetTokenExpiry: Date,
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
