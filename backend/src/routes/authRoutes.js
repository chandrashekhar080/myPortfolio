import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as auth from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { loginSchema, changePasswordSchema, updateAccountSchema } from "../validators/schemas.js";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many sign-in attempts — try again in 15 minutes." },
});

router.post("/login", loginLimiter, validateBody(loginSchema), auth.login);
router.post("/logout", auth.logout);
router.get("/me", requireAuth, auth.me);
router.patch("/account", requireAuth, validateBody(updateAccountSchema), auth.updateAccount);
router.patch(
  "/password",
  requireAuth,
  validateBody(changePasswordSchema),
  auth.changePassword,
);

export default router;
