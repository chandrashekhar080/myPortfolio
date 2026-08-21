export type Orderable = {
  id: string;
  order: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  lastLoginAt?: string;
};

export type NavItem = { label: string; href: string };

export type Profile = {
  id: string;
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
  avatar: string;
  typedRoles: string[];
  navItems: NavItem[];
  resumeSummary: string;
  seo: { title: string; description: string; keywords: string; ogImage: string };
  updatedAt?: string;
};

export type Skill = { name: string; level: number };
export type SkillGroup = Orderable & { label: string; skills: Skill[] };
export type ExperienceItem = Orderable & {
  role: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
};
export type EducationItem = Orderable & {
  degree: string;
  institute: string;
  location: string;
  year: string;
  score: string;
};
export type CertificationItem = Orderable & {
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
};
export type ProjectItem = Orderable & {
  title: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
  features: string[];
  live: string;
  repo: string;
  featured: boolean;
};
export type ServiceItem = Orderable & { title: string; description: string };
export type AchievementItem = Orderable & { value: string; label: string };

export type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "archived";
  createdAt: string;
};

export type MediaItem = {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt: string;
};

export type DashboardStats = {
  counts: Record<string, number>;
  profile: { name: string; title: string; updatedAt: string };
  recentMessages: Message[];
};
