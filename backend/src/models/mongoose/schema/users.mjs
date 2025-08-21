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
      return !this.googleId; // required only if not using Google
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
  resetToken: String,
  resetTokenExpiry: Date,
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
