import { z } from "zod";

const str = (max = 300) => z.string().trim().max(max);
const optionalStr = (max = 300) => str(max).optional().default("");
const stringList = (max = 500) => z.array(str(max)).default([]);
const orderable = {
  order: z.number().int().min(0).optional(),
  published: z.boolean().optional(),
};

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export const updateAccountSchema = z.object({
  name: str(120).min(1, "Name is required"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
});

export const profileSchema = z.object({
  name: str(120).min(1, "Name is required"),
  initials: optionalStr(8),
  title: optionalStr(160),
  experience: optionalStr(60),
  location: optionalStr(200),
  tagline: optionalStr(400),
  email: z.union([z.string().trim().email(), z.literal("")]).optional().default(""),
  phone: optionalStr(40),
  phoneAlt: optionalStr(40),
  linkedin: optionalStr(300),
  github: optionalStr(300),
  company: optionalStr(160),
  avatar: optionalStr(500),
  resumeSummary: optionalStr(2000),
  typedRoles: stringList(160),
  navItems: z
    .array(z.object({ label: str(60).min(1), href: str(120).min(1) }))
    .default([]),
  seo: z
    .object({
      title: optionalStr(200),
      description: optionalStr(400),
      keywords: optionalStr(600),
      ogImage: optionalStr(500),
    })
    .default({}),
});

export const skillGroupSchema = z.object({
  label: str(80).min(1, "Group label is required"),
  skills: z
    .array(z.object({ name: str(80).min(1), level: z.number().int().min(0).max(100) }))
    .default([]),
  ...orderable,
});

export const experienceSchema = z.object({
  role: str(160).min(1, "Role is required"),
  company: str(160).min(1, "Company is required"),
  location: optionalStr(200),
  duration: optionalStr(80),
  responsibilities: stringList(600),
  ...orderable,
});

export const educationSchema = z.object({
  degree: str(200).min(1, "Degree is required"),
  institute: str(200).min(1, "Institute is required"),
  location: optionalStr(200),
  year: optionalStr(40),
  score: optionalStr(40),
  ...orderable,
});

export const certificationSchema = z.object({
  title: str(200).min(1, "Title is required"),
  issuer: str(160).min(1, "Issuer is required"),
  date: optionalStr(40),
  credentialUrl: optionalStr(500),
  ...orderable,
});

export const projectSchema = z.object({
  title: str(200).min(1, "Title is required"),
  slug: optionalStr(200),
  category: optionalStr(80),
  image: optionalStr(500),
  description: optionalStr(2000),
  tech: stringList(80),
  features: stringList(400),
  live: optionalStr(500),
  repo: optionalStr(500),
  featured: z.boolean().optional(),
  ...orderable,
});

export const serviceSchema = z.object({
  title: str(160).min(1, "Title is required"),
  description: optionalStr(600),
  ...orderable,
});

export const achievementSchema = z.object({
  value: str(40).min(1, "Value is required"),
  label: str(160).min(1, "Label is required"),
  ...orderable,
});

/** Public endpoint — deliberately stricter than the admin schemas. */
export const contactSchema = z.object({
  name: str(120).min(2, "Please enter your name"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  subject: optionalStr(200),
  message: str(5000).min(10, "Message should be at least 10 characters"),
});

export const messageStatusSchema = z.object({
  status: z.enum(["unread", "read", "archived"]),
});

export const reorderSchema = z.object({
  ids: z.array(z.string().min(1)).min(1, "Send at least one id"),
});
