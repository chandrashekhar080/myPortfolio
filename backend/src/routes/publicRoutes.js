import { Router } from "express";
import rateLimit from "express-rate-limit";
import { getSiteContent, getProjectBySlug } from "../controllers/contentController.js";
import { submitMessage } from "../controllers/messageController.js";
import { validateBody } from "../middleware/validate.js";
import { contactSchema } from "../validators/schemas.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many messages sent — please try again later." },
});

router.get("/content", getSiteContent);
router.get("/projects/:slug", getProjectBySlug);
router.post("/contact", contactLimiter, validateBody(contactSchema), submitMessage);

export default router;
