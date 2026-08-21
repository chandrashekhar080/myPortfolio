import { env } from "../config/env.js";

/** Uploads are stored as `/uploads/name.ext` and served absolute, so the
 *  frontend and admin can render them from any origin. */
export function absoluteUrl(value) {
  if (!value) return "";
  if (/^(https?:)?\/\//i.test(value) || value.startsWith("data:")) return value;
  return `${env.publicUrl}${value.startsWith("/") ? "" : "/"}${value}`;
}

export function withAbsoluteImage(doc, field = "image") {
  const plain = typeof doc.toJSON === "function" ? doc.toJSON() : { ...doc };
  plain[field] = absoluteUrl(plain[field]);
  return plain;
}
