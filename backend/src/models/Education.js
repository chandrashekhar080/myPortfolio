import mongoose from "mongoose";
import { toJsonPlugin, orderableFields } from "./plugins.js";

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true, trim: true },
    institute: { type: String, required: true, trim: true },
    location: { type: String, default: "" },
    year: { type: String, default: "" },
    score: { type: String, default: "" },
    ...orderableFields,
  },
  { timestamps: true },
);

educationSchema.plugin(toJsonPlugin);

export const Education = mongoose.model("Education", educationSchema);
