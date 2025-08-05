import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
      minlength: [6, "Password must be at least 6 character"],
    },
    isFirstLogin: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
    },
    platformHandles: {
      leetcode: { type: String, trim: true },
      codeforce: { type: String, trim: true },
      github: { type: String, trim: true },
    },
    provider: {
      type: String,
      enum: ["email", "google", "github"],
      default: "email",
    },
  },
  { timestamps: true }
);

const USER = mongoose.model("Users",userSchema)

export default USER