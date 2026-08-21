import mongoose from "mongoose";
import slugify from "slugify";
import { toJsonPlugin, orderableFields } from "./plugins.js";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    category: { type: String, default: "", trim: true },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    tech: { type: [String], default: [] },
    features: { type: [String], default: [] },
    live: { type: String, default: "" },
    repo: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    ...orderableFields,
  },
  { timestamps: true },
);

projectSchema.plugin(toJsonPlugin);

// Slugs are derived from the title but stay stable once set, so an existing
// project keeps its URL when it is renamed.
projectSchema.pre("validate", async function ensureSlug(next) {
  if (this.slug) return next();
  const base = slugify(this.title ?? "project", { lower: true, strict: true }) || "project";
  let candidate = base;
  let suffix = 1;
  while (await this.constructor.exists({ slug: candidate, _id: { $ne: this._id } })) {
    candidate = `${base}-${++suffix}`;
  }
  this.slug = candidate;
  next();
});

export const Project = mongoose.model("Project", projectSchema);
