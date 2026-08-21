import mongoose from "mongoose";
import { toJsonPlugin, orderableFields } from "./plugins.js";

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, default: "" },
    duration: { type: String, default: "" },
    responsibilities: { type: [String], default: [] },
    ...orderableFields,
  },
  { timestamps: true },
);

experienceSchema.plugin(toJsonPlugin);

export const Experience = mongoose.model("Experience", experienceSchema);
