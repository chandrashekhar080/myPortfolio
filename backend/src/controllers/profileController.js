import { Profile } from "../models/Profile.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProfile = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await Profile.getSingleton() });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.getSingleton();
  profile.set(req.body);
  await profile.save();
  res.json({ success: true, message: "Profile saved", data: profile });
});
