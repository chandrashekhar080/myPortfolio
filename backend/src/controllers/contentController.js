import {
  Profile,
  SkillGroup,
  Experience,
  Education,
  Certification,
  Project,
  Service,
  Achievement,
} from "../models/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { absoluteUrl, withAbsoluteImage } from "../utils/urls.js";

const bySortOrder = { order: 1, createdAt: 1 };
const visible = { published: true };

/**
 * The single endpoint the public site calls. Returns every section already
 * filtered to published rows and sorted, so the frontend does no shaping.
 */
export const getSiteContent = asyncHandler(async (_req, res) => {
  const [profile, skillGroups, experience, education, certifications, projects, services, achievements] =
    await Promise.all([
      Profile.getSingleton(),
      SkillGroup.find(visible).sort(bySortOrder),
      Experience.find(visible).sort(bySortOrder),
      Education.find(visible).sort(bySortOrder),
      Certification.find(visible).sort(bySortOrder),
      Project.find(visible).sort(bySortOrder),
      Service.find(visible).sort(bySortOrder),
      Achievement.find(visible).sort(bySortOrder),
    ]);

  const profileJson = profile.toJSON();

  res.json({
    success: true,
    data: {
      profile: { ...profileJson, avatar: absoluteUrl(profileJson.avatar) },
      typedRoles: profileJson.typedRoles ?? [],
      navItems: profileJson.navItems ?? [],
      seo: profileJson.seo ?? {},
      resumeSummary: profileJson.resumeSummary ?? "",
      skillGroups,
      experience,
      education,
      certifications,
      projects: projects.map((project) => withAbsoluteImage(project)),
      services,
      achievements,
      updatedAt: profile.updatedAt,
    },
  });
});

/** Detail view for a single project, addressed by slug or id. */
export const getProjectBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const project = await Project.findOne({ slug, published: true });
  if (!project) return res.status(404).json({ success: false, message: "Project not found" });
  res.json({ success: true, data: withAbsoluteImage(project) });
});
