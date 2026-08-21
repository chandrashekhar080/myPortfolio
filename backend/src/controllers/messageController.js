import { Message } from "../models/Message.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const BACKSLASH = String.fromCharCode(92);
const REGEX_SPECIALS = new Set([".", "*", "+", "?", "^", "$", "{", "}", "(", ")", "|", "[", "]", BACKSLASH]);

/** Escapes an admin search term so it matches literally instead of as a pattern. */
function escapeRegex(value) {
  return Array.from(value)
    .map((char) => (REGEX_SPECIALS.has(char) ? BACKSLASH + char : char))
    .join("");
}

/** Public — called by the contact form on the portfolio. */
export const submitMessage = asyncHandler(async (req, res) => {
  const message = await Message.create({
    ...req.body,
    ip: req.ip,
    userAgent: (req.headers["user-agent"] ?? "").slice(0, 300),
  });
  res
    .status(201)
    .json({ success: true, message: "Thanks — your message was sent.", data: { id: message.id } });
});

export const listMessages = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));

  const filter = {};
  if (["unread", "read", "archived"].includes(req.query.status)) filter.status = req.query.status;
  if (req.query.q) {
    const term = new RegExp(escapeRegex(String(req.query.q)), "i");
    filter.$or = [{ name: term }, { email: term }, { subject: term }, { message: term }];
  }

  const [items, total, unread] = await Promise.all([
    Message.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Message.countDocuments(filter),
    Message.countDocuments({ status: "unread" }),
  ]);

  res.json({
    success: true,
    data: items,
    meta: { page, limit, total, unread, pages: Math.ceil(total / limit) || 1 },
  });
});

export const getMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) throw ApiError.notFound("Message not found");

  // Opening a message is what marks it read.
  if (message.status === "unread") {
    message.status = "read";
    await message.save();
  }
  res.json({ success: true, data: message });
});

export const updateMessageStatus = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true },
  );
  if (!message) throw ApiError.notFound("Message not found");
  res.json({ success: true, message: "Status updated", data: message });
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message) throw ApiError.notFound("Message not found");
  res.json({ success: true, message: "Message deleted", data: { id: req.params.id } });
});
