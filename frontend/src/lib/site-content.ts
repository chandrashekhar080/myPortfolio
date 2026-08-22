import {
  achievements,
  certifications,
  education,
  experience,
  navItems,
  profile,
  projects,
  services,
  skillGroups,
  typedRoles,
} from "@/data/portfolio";

export type NavItem = { label: string; href: string };
export type Skill = { name: string; level: number };
export type SkillGroup = { label: string; skills: Skill[] };

export type ExperienceEntry = {
  role: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
};

export type EducationEntry = {
  degree: string;
  institute: string;
  location: string;
  year: string;
  score: string;
};

export type CertificationEntry = { title: string; issuer: string; date: string; credentialUrl?: string };

export type ProjectEntry = {
  title: string;
  slug?: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
  features: string[];
  live?: string;
  repo?: string;
  featured?: boolean;
};

export type ServiceEntry = { title: string; description: string };
export type AchievementEntry = { value: string; label: string };

export type SiteProfile = {
  name: string;
  initials: string;
  title: string;
  experience: string;
  location: string;
  tagline: string;
  email: string;
  phone: string;
  phoneAlt: string;
  linkedin: string;
  github: string;
  company: string;
  avatar?: string;
};

export type Seo = { title: string; description: string; keywords: string; ogImage: string };

export type SiteContent = {
  profile: SiteProfile;
  typedRoles: string[];
  navItems: NavItem[];
  seo: Seo;
  resumeSummary: string;
  skillGroups: SkillGroup[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
  projects: ProjectEntry[];
  services: ServiceEntry[];
  achievements: AchievementEntry[];
};

const RESUME_SUMMARY =
  "MERN stack developer with a strong foundation in frontend and full-stack development, building " +
  "responsive, scalable and user-friendly web applications. Hands-on across React.js, Next.js, " +
  "Node.js, Express.js and MongoDB, with practical experience in REST API development and " +
  "integration, authentication, real-time features and both SQL and NoSQL databases. Keen to keep " +
  "growing into AI-driven applications and cloud-based solutions.";

/**
 * The content compiled into the bundle. It is what renders when the API has not
 * answered yet — during the first paint, and if the backend is unreachable — so
 * the site is never blank or half-rendered.
 */
export const fallbackContent: SiteContent = {
  profile: { ...profile },
  typedRoles: [...typedRoles],
  navItems: navItems.map((item) => ({ ...item })),
  seo: {
    title: "Chandrashekhar Ghosh — MERN Stack Developer in Indore",
    description:
      "MERN stack developer building responsive, scalable full-stack web applications with " +
      "React.js, Next.js, Node.js, Express.js and MongoDB. Based in Indore, India.",
    keywords:
      "Chandrashekhar Ghosh, MERN stack developer Indore, full stack developer, React.js, " +
      "Next.js, Node.js, Express.js, MongoDB portfolio",
    ogImage: "",
  },
  resumeSummary: RESUME_SUMMARY,
  skillGroups: skillGroups.map((group) => ({
    label: group.label,
    skills: group.skills.map((skill) => ({ ...skill })),
  })),
  experience: experience.map((entry) => ({
    ...entry,
    responsibilities: [...entry.responsibilities],
  })),
  education: [...education],
  certifications: [...certifications],
  projects: [...projects],
  services: [...services],
  achievements: [...achievements],
};

/**
 * Base URL of the API — e.g. https://myportfolio-backend-c8pg.onrender.com
 *
 * Callers append their own `/api/...` path, so a VITE_API_URL that already ends
 * in `/api` would build `/api/api/...` and 404. Both spellings are accepted
 * here — trailing slashes and a trailing `/api` are stripped.
 */
const API_URL = (import.meta.env.VITE_API_URL ?? "")
  .trim()
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

/** Only arrays the API actually returned should replace the bundled ones. */
function list<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) && value.length > 0 ? (value as T[]) : fallback;
}

function merge(payload: Partial<SiteContent> | null | undefined): SiteContent {
  if (!payload) return fallbackContent;

  return {
    profile: { ...fallbackContent.profile, ...(payload.profile ?? {}) },
    typedRoles: list(payload.typedRoles, fallbackContent.typedRoles),
    navItems: list(payload.navItems, fallbackContent.navItems),
    seo: { ...fallbackContent.seo, ...(payload.seo ?? {}) },
    resumeSummary: payload.resumeSummary || fallbackContent.resumeSummary,
    skillGroups: list(payload.skillGroups, fallbackContent.skillGroups),
    experience: list(payload.experience, fallbackContent.experience),
    education: list(payload.education, fallbackContent.education),
    certifications: list(payload.certifications, fallbackContent.certifications),
    projects: list(payload.projects, fallbackContent.projects),
    services: list(payload.services, fallbackContent.services),
    achievements: list(payload.achievements, fallbackContent.achievements),
  };
}

/**
 * Reads the live content from the backend. A missing VITE_API_URL, a timeout or
 * any error resolves to the bundled content rather than throwing — the site
 * must keep rendering whether or not the API is up.
 */
export async function fetchSiteContent(): Promise<SiteContent> {
  if (!API_URL) return fallbackContent;

  try {
    const response = await fetch(`${API_URL}/api/content`, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`Content API returned ${response.status}`);

    const payload = (await response.json()) as { data?: Partial<SiteContent> };
    return merge(payload.data);
  } catch (error) {
    console.warn("[content] falling back to bundled content:", (error as Error).message);
    return fallbackContent;
  }
}

export { API_URL };
