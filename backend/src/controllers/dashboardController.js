import {
  Profile,
  SkillGroup,
  Experience,
  Education,
  Certification,
  Project,
  Service,
  Achievement,
  Message,
  Media,
} from "../models/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/** Powers the admin home screen: section counts plus the latest messages. */
export const getStats = asyncHandler(async (_req, res) => {
  const [
    profile,
    skillGroups,
    experience,
    education,
    certifications,
    projects,
    publishedProjects,
    services,
    achievements,
    messages,
    unreadMessages,
    media,
    recentMessages,
  ] = await Promise.all([
    Profile.getSingleton(),
    SkillGroup.countDocuments(),
    Experience.countDocuments(),
    Education.countDocuments(),
    Certification.countDocuments(),
    Project.countDocuments(),
    Project.countDocuments({ published: true }),
    Service.countDocuments(),
    Achievement.countDocuments(),
    Message.countDocuments(),
    Message.countDocuments({ status: "unread" }),
    Media.countDocuments(),
    Message.find().sort({ createdAt: -1 }).limit(5),
  ]);

  const skillCount = (await SkillGroup.find().select("skills")).reduce(
    (total, group) => total + group.skills.length,
    0,
  );

  res.json({
    success: true,
    data: {
      counts: {
        skillGroups,
        skills: skillCount,
        experience,
        education,
        certifications,
        projects,
        publishedProjects,
        services,
        achievements,
        messages,
        unreadMessages,
        media,
      },
      profile: { name: profile.name, title: profile.title, updatedAt: profile.updatedAt },
      recentMessages,
    },
  });
});
