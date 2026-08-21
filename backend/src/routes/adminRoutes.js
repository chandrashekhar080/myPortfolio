import { Router } from "express";
import {
  SkillGroup,
  Experience,
  Education,
  Certification,
  Project,
  Service,
  Achievement,
} from "../models/index.js";
import {
  skillGroupSchema,
  experienceSchema,
  educationSchema,
  certificationSchema,
  projectSchema,
  serviceSchema,
  achievementSchema,
  profileSchema,
  messageStatusSchema,
} from "../validators/schemas.js";
import { resourceRouter } from "./resourceRoutes.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { upload } from "../middleware/upload.js";
import * as profileController from "../controllers/profileController.js";
import * as messageController from "../controllers/messageController.js";
import * as mediaController from "../controllers/mediaController.js";
import { getStats } from "../controllers/dashboardController.js";

const router = Router();

// Everything below this line requires a valid admin token.
router.use(requireAuth);

router.get("/stats", getStats);

router
  .route("/profile")
  .get(profileController.getProfile)
  .put(validateBody(profileSchema), profileController.updateProfile);

router.use("/skills", resourceRouter(SkillGroup, skillGroupSchema, "Skill group"));
router.use("/experience", resourceRouter(Experience, experienceSchema, "Experience"));
router.use("/education", resourceRouter(Education, educationSchema, "Education"));
router.use("/certifications", resourceRouter(Certification, certificationSchema, "Certification"));
router.use("/projects", resourceRouter(Project, projectSchema, "Project"));
router.use("/services", resourceRouter(Service, serviceSchema, "Service"));
router.use("/achievements", resourceRouter(Achievement, achievementSchema, "Achievement"));

router.get("/messages", messageController.listMessages);
router.get("/messages/:id", messageController.getMessage);
router.patch(
  "/messages/:id",
  validateBody(messageStatusSchema),
  messageController.updateMessageStatus,
);
router.delete("/messages/:id", messageController.deleteMessage);

router.get("/media", mediaController.listMedia);
router.post("/media", upload.single("file"), mediaController.uploadFile);
router.delete("/media/:id", mediaController.deleteMedia);

export default router;
