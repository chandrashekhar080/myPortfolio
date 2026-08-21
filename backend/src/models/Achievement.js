import mongoose from "mongoose";
import { toJsonPlugin, orderableFields } from "./plugins.js";

const achievementSchema = new mongoose.Schema(
  {
    value: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    ...orderableFields,
  },
  { timestamps: true },
);

achievementSchema.plugin(toJsonPlugin);

export const Achievement = mongoose.model("Achievement", achievementSchema);
