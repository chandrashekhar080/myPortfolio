import { connectDb, disconnectDb } from "./config/db.js";
import { env, assertEnv } from "./config/env.js";
import {
  User,
  Profile,
  SkillGroup,
  Experience,
  Education,
  Certification,
  Project,
  Service,
  Achievement,
} from "./models/index.js";
import * as seed from "./seed/seedData.js";

const RESUME_SUMMARY =
  "MERN stack developer with a strong foundation in frontend and full-stack development, building " +
  "responsive, scalable and user-friendly web applications. Hands-on across React.js, Next.js, " +
  "Node.js, Express.js and MongoDB, with practical experience in REST API development and " +
  "integration, authentication, real-time features and both SQL and NoSQL databases. Keen to keep " +
  "growing into AI-driven applications and cloud-based solutions.";

const SEO = {
  title: "Chandrashekhar Ghosh — MERN Stack Developer in Indore",
  description:
    "MERN stack developer building responsive, scalable full-stack web applications with React.js, " +
    "Next.js, Node.js, Express.js and MongoDB. Based in Indore, India.",
  keywords:
    "Chandrashekhar Ghosh, MERN stack developer Indore, full stack developer, React.js, Next.js, " +
    "Node.js, Express.js, MongoDB portfolio",
  ogImage: "",
};

const fresh = process.argv.includes("--fresh");

/** `order` is what the admin's drag-to-reorder edits, so seed it from array position. */
const ordered = (items) => items.map((item, index) => ({ ...item, order: index, published: true }));

async function seedCollection(Model, label, rows) {
  const existing = await Model.countDocuments();
  if (existing > 0 && !fresh) {
    console.log(`  · ${label}: ${existing} already present — skipped`);
    return;
  }
  if (fresh) await Model.deleteMany({});
  // insertMany bypasses pre('validate'), which Project needs for its slug.
  await Model.create(ordered(rows));
  console.log(`  ✓ ${label}: ${rows.length} inserted`);
}

async function seedAdminUser() {
  const existing = await User.findOne({ email: env.admin.email.toLowerCase() });
  if (existing) {
    console.log(`  · admin user: ${existing.email} already exists — skipped`);
    return;
  }
  await User.create({
    name: env.admin.name,
    email: env.admin.email,
    password: env.admin.password,
    role: "admin",
  });
  console.log(`  ✓ admin user: ${env.admin.email}`);
  console.log(`    password: ${env.admin.password}  ← change this after your first sign-in`);
}

async function seedProfile() {
  const profile = await Profile.getSingleton();
  const untouched = profile.name === "Your Name";
  if (!untouched && !fresh) {
    console.log("  · profile: already customised — skipped");
    return;
  }
  profile.set({
    ...seed.profile,
    typedRoles: [...seed.typedRoles],
    navItems: seed.navItems.map((item) => ({ ...item })),
    resumeSummary: RESUME_SUMMARY,
    seo: SEO,
  });
  await profile.save();
  console.log("  ✓ profile");
}

async function run() {
  assertEnv();
  await connectDb();
  console.log(fresh ? "\nSeeding (fresh — existing content is wiped):" : "\nSeeding:");

  await seedAdminUser();
  await seedProfile();
  await seedCollection(SkillGroup, "skill groups", seed.skillGroups.map((g) => ({ ...g, skills: [...g.skills] })));
  await seedCollection(Experience, "experience", seed.experience.map((e) => ({ ...e, responsibilities: [...e.responsibilities] })));
  await seedCollection(Education, "education", seed.education);
  await seedCollection(Certification, "certifications", seed.certifications);
  await seedCollection(Project, "projects", seed.projects);
  await seedCollection(Service, "services", seed.services);
  await seedCollection(Achievement, "achievements", seed.achievements);

  console.log("\nDone. Start the API with `npm run dev`.\n");
  await disconnectDb();
}

run().catch(async (error) => {
  console.error("\nSeed failed:", error.message);
  await disconnectDb().catch(() => {});
  process.exit(1);
});
