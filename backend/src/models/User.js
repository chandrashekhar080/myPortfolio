import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { toJsonPlugin } from "./plugins.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ["admin", "editor"], default: "admin" },
    avatar: { type: String, default: "" },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

userSchema.plugin(toJsonPlugin);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model("User", userSchema);
