import mongoose from "mongoose";
import { toJsonPlugin, orderableFields } from "./plugins.js";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    ...orderableFields,
  },
  { timestamps: true },
);

serviceSchema.plugin(toJsonPlugin);

export const Service = mongoose.model("Service", serviceSchema);
