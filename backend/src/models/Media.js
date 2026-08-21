import mongoose from "mongoose";
import { toJsonPlugin } from "./plugins.js";

/** One row per uploaded file, so the admin can browse and reuse past uploads. */
const mediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    originalName: { type: String, default: "" },
    url: { type: String, required: true },
    mimeType: { type: String, default: "" },
    size: { type: Number, default: 0 },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

mediaSchema.plugin(toJsonPlugin);

export const Media = mongoose.model("Media", mediaSchema);
