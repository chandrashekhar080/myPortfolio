import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { signToken } from "../middleware/auth.js";
import { env } from "../config/env.js";

const cookieOptions = {
  httpOnly: true,
  sameSite: env.isProd ? "none" : "lax",
  secure: env.isProd,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  // One message for both branches so the endpoint cannot be used to enumerate accounts.
  if (!user || !(await user.comparePassword(password))) {
    throw ApiError.unauthorized("Incorrect email or password");
  }

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  const token = signToken(user);
  res.cookie("token", token, cookieOptions);
  res.json({ success: true, message: "Signed in", data: { token, user: user.toJSON() } });
});

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie("token", { ...cookieOptions, maxAge: undefined });
  res.json({ success: true, message: "Signed out" });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user });
});

export const updateAccount = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const taken = await User.findOne({ email, _id: { $ne: req.user.id } });
  if (taken) throw ApiError.conflict("That email is already in use");

  req.user.set({ name, email });
  await req.user.save();
  res.json({ success: true, message: "Account updated", data: req.user });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");
  if (!(await user.comparePassword(currentPassword))) {
    throw ApiError.badRequest("Current password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  // The old token stays valid until it expires; hand out a fresh one either way.
  const token = signToken(user);
  res.cookie("token", token, cookieOptions);
  res.json({ success: true, message: "Password changed", data: { token } });
});
