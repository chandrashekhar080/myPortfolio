import { Router } from "express";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";
import publicRoutes from "./publicRoutes.js";

const router = Router();

router.get("/health", (_req, res) =>
  res.json({ success: true, message: "API is up", uptime: process.uptime() }),
);

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/", publicRoutes);

export default router;
