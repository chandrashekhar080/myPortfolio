import {
  Award,
  BarChart3,
  Briefcase,
  FolderKanban,
  GraduationCap,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { FieldDef } from "@/components/editors/FormFields";

type Row = Record<string, unknown>;

export type SectionConfig = {
  /** URL segment under /sections and the last part of the API path. */
  key: string;
  endpoint: string;
  title: string;
  description: string;
  icon: LucideIcon;
  itemLabel: string;
  fields: FieldDef[];
  defaults: Row;
  primary: (item: Row) => string;
  secondary?: (item: Row) => string;
  meta?: (item: Row) => string;
  thumbnail?: (item: Row) => string;
};

const visibility: FieldDef = {
  name: "published",
  label: "Visible on the site",
  type: "switch",
  hint: "Turn off to keep the entry without showing it publicly.",
};

const text = (value: unknown) => (typeof value === "string" ? value : "");
const list = (value: unknown) => (Array.isArray(value) ? value : []);

export const sections: SectionConfig[] = [
  {
    key: "skills",
    endpoint: "/api/admin/skills",
    title: "Skills",
    description: "Skill groups and the proficiency bars inside each one.",
    icon: BarChart3,
    itemLabel: "Skill group",
    defaults: { label: "", skills: [], published: true },
    fields: [
      { name: "label", label: "Group name", type: "text", required: true, placeholder: "Frontend", wide: true },
      { name: "skills", label: "Skills", type: "skills" },
      visibility,
    ],
    primary: (item) => text(item.label),
    meta: (item) => `${list(item.skills).length} skills`,
  },
  {
    key: "experience",
    endpoint: "/api/admin/experience",
    title: "Experience",
    description: "Roles, internships and what you did in each one.",
    icon: Briefcase,
    itemLabel: "Role",
    defaults: { role: "", company: "", location: "", duration: "", responsibilities: [], published: true },
    fields: [
      { name: "role", label: "Role", type: "text", required: true, placeholder: "Junior MERN Stack Developer" },
      { name: "company", label: "Company", type: "text", required: true, placeholder: "Fovty Solutions Pvt. Ltd." },
      { name: "location", label: "Location", type: "text", placeholder: "Indore, India · Onsite" },
      { name: "duration", label: "Duration", type: "text", placeholder: "Nov 2025 – Present" },
      {
        name: "responsibilities",
        label: "Responsibilities",
        type: "bulletList",
        placeholder: "What you owned in this role",
        addLabel: "Add responsibility",
      },
      visibility,
    ],
    primary: (item) => text(item.role),
    secondary: (item) => [text(item.company), text(item.location)].filter(Boolean).join(" · "),
    meta: (item) => text(item.duration),
  },
  {
    key: "education",
    endpoint: "/api/admin/education",
    title: "Education",
    description: "Degrees and qualifications, newest first.",
    icon: GraduationCap,
    itemLabel: "Qualification",
    defaults: { degree: "", institute: "", location: "", year: "", score: "", published: true },
    fields: [
      { name: "degree", label: "Degree", type: "text", required: true, placeholder: "B.Sc. in Computer Science" },
      { name: "institute", label: "Institute", type: "text", required: true, placeholder: "Govt. Holkar Science College" },
      { name: "location", label: "Location", type: "text", placeholder: "Indore, India" },
      { name: "year", label: "Year", type: "text", placeholder: "2024" },
      { name: "score", label: "Score", type: "text", placeholder: "68.0%" },
      visibility,
    ],
    primary: (item) => text(item.degree),
    secondary: (item) => [text(item.institute), text(item.location)].filter(Boolean).join(" · "),
    meta: (item) => [text(item.year), text(item.score)].filter(Boolean).join(" · "),
  },
  {
    key: "certifications",
    endpoint: "/api/admin/certifications",
    title: "Certifications",
    description: "Courses and credentials shown beside your experience.",
    icon: Award,
    itemLabel: "Certification",
    defaults: { title: "", issuer: "", date: "", credentialUrl: "", published: true },
    fields: [
      { name: "title", label: "Title", type: "text", required: true, placeholder: "Advanced Software Engineering" },
      { name: "issuer", label: "Issuer", type: "text", required: true, placeholder: "Walmart Global Tech" },
      { name: "date", label: "Date", type: "text", placeholder: "Dec 2024" },
      { name: "credentialUrl", label: "Credential URL", type: "url", placeholder: "https://…" },
      visibility,
    ],
    primary: (item) => text(item.title),
    secondary: (item) => text(item.issuer),
    meta: (item) => text(item.date),
  },
  {
    key: "projects",
    endpoint: "/api/admin/projects",
    title: "Projects",
    description: "Portfolio case studies, their cover art, stack and feature lists.",
    icon: FolderKanban,
    itemLabel: "Project",
    defaults: {
      title: "",
      category: "",
      image: "",
      description: "",
      tech: [],
      features: [],
      live: "",
      repo: "",
      featured: false,
      published: true,
    },
    fields: [
      { name: "title", label: "Title", type: "text", required: true, placeholder: "Job Portal — Full Stack" },
      { name: "category", label: "Category", type: "text", placeholder: "Full Stack" },
      { name: "image", label: "Cover image", type: "image", hint: "Roughly 2.4:1 fits the card slot best." },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        rows: 3,
        placeholder: "What the project is and what it does.",
      },
      { name: "tech", label: "Tech stack", type: "stringList", placeholder: "React.js", addLabel: "Add technology" },
      { name: "features", label: "Key features", type: "bulletList", placeholder: "A feature worth calling out", addLabel: "Add feature" },
      { name: "live", label: "Live URL", type: "url", placeholder: "https://…" },
      { name: "repo", label: "Repository URL", type: "url", placeholder: "https://github.com/…" },
      { name: "featured", label: "Featured project", type: "switch", hint: "Highlight this one above the rest." },
      visibility,
    ],
    primary: (item) => text(item.title),
    secondary: (item) => text(item.description).slice(0, 110),
    meta: (item) => text(item.category),
    thumbnail: (item) => text(item.image),
  },
  {
    key: "services",
    endpoint: "/api/admin/services",
    title: "Services",
    description: "What you offer, shown as cards in the Services section.",
    icon: Wrench,
    itemLabel: "Service",
    defaults: { title: "", description: "", published: true },
    fields: [
      { name: "title", label: "Title", type: "text", required: true, placeholder: "MERN Stack Development" },
      { name: "description", label: "Description", type: "textarea", rows: 3, placeholder: "One or two lines on what this covers." },
      visibility,
    ],
    primary: (item) => text(item.title),
    secondary: (item) => text(item.description).slice(0, 120),
  },
  {
    key: "achievements",
    endpoint: "/api/admin/achievements",
    title: "Achievements",
    description: "The headline stat tiles — value plus its label.",
    icon: Sparkles,
    itemLabel: "Achievement",
    defaults: { value: "", label: "", published: true },
    fields: [
      { name: "value", label: "Value", type: "text", required: true, placeholder: "1.5+" },
      { name: "label", label: "Label", type: "text", required: true, placeholder: "Years of Hands-On Development" },
      visibility,
    ],
    primary: (item) => text(item.value),
    secondary: (item) => text(item.label),
  },
];

export const sectionByKey = (key: string) => sections.find((section) => section.key === key);
