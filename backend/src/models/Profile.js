import mongoose from "mongoose";
import { toJsonPlugin } from "./plugins.js";

const navItemSchema = new mongoose.Schema(
  { label: { type: String, required: true }, href: { type: String, required: true } },
  { _id: false },
);

const seoSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    keywords: { type: String, default: "" },
    ogImage: { type: String, default: "" },
  },
  { _id: false },
);

/**
 * Singleton: exactly one Profile document exists, addressed by `key: "main"`.
 * It carries everything that is not a repeatable list.
 */
const profileSchema = new mongoose.Schema(
  {
    key: { type: String, default: "main", unique: true, immutable: true },

    name: { type: String, required: true, trim: true },
    initials: { type: String, default: "" },
    title: { type: String, default: "" },
    experience: { type: String, default: "" },
    location: { type: String, default: "" },
    tagline: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    phoneAlt: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    company: { type: String, default: "" },
    avatar: { type: String, default: "" },

    typedRoles: { type: [String], default: [] },
    navItems: { type: [navItemSchema], default: [] },
    resumeSummary: { type: String, default: "" },
    seo: { type: seoSchema, default: () => ({}) },
  },
  { timestamps: true },
);

profileSchema.plugin(toJsonPlugin);

/** Never returns null — the admin always has a document to edit. */
profileSchema.statics.getSingleton = async function getSingleton() {
  const existing = await this.findOne({ key: "main" });
  if (existing) return existing;
  return this.create({ key: "main", name: "Your Name" });
};

export const Profile = mongoose.model("Profile", profileSchema);
