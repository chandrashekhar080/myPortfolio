import mongoose from "mongoose";
import { toJsonPlugin } from "./plugins.js";

/** Contact-form submissions. Written by the public site, read in the admin. */
const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    subject: { type: String, default: "", trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    status: { type: String, enum: ["unread", "read", "archived"], default: "unread", index: true },
    ip: { type: String, default: "" },
    userAgent: { type: String, default: "" },
  },
  { timestamps: true },
);

messageSchema.plugin(toJsonPlugin);

export const Message = mongoose.model("Message", messageSchema);
