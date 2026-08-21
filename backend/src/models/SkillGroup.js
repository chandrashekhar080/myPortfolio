import mongoose from "mongoose";
import { toJsonPlugin, orderableFields } from "./plugins.js";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 0, max: 100 },
  },
  { _id: false },
);

const skillGroupSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    skills: { type: [skillSchema], default: [] },
    ...orderableFields,
  },
  { timestamps: true },
);

skillGroupSchema.plugin(toJsonPlugin);

export const SkillGroup = mongoose.model("SkillGroup", skillGroupSchema);
