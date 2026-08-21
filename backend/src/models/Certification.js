import mongoose from "mongoose";
import { toJsonPlugin, orderableFields } from "./plugins.js";

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    date: { type: String, default: "" },
    credentialUrl: { type: String, default: "" },
    ...orderableFields,
  },
  { timestamps: true },
);

certificationSchema.plugin(toJsonPlugin);

export const Certification = mongoose.model("Certification", certificationSchema);
