import fs from "node:fs/promises";
import path from "node:path";
import { Media } from "../models/Media.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { absoluteUrl } from "../utils/urls.js";

const serialize = (doc) => ({ ...doc.toJSON(), url: absoluteUrl(doc.url) });

export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) throw ApiError.badRequest("No file was uploaded");

  const media = await Media.create({
    filename: req.file.filename,
    originalName: req.file.originalname,
    // Stored relative so the library survives a change of PUBLIC_URL.
    url: `/uploads/${req.file.filename}`,
    mimeType: req.file.mimetype,
    size: req.file.size,
    uploadedBy: req.user?.id,
  });

  res.status(201).json({ success: true, message: "File uploaded", data: serialize(media) });
});

export const listMedia = asyncHandler(async (_req, res) => {
  const items = await Media.find().sort({ createdAt: -1 }).limit(200);
  res.json({ success: true, count: items.length, data: items.map(serialize) });
});

export const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (!media) throw ApiError.notFound("File not found");

  // Drop the row even if the file is already gone from disk.
  await fs.rm(path.join(env.uploadsDir, media.filename), { force: true });
  await media.deleteOne();

  res.json({ success: true, message: "File deleted", data: { id: req.params.id } });
});
