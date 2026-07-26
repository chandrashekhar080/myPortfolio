import { profile, skillGroups, experience, projects } from "@/data/portfolio";

/** Builds a plain-text résumé on the fly and downloads it (no external file needed). */
export function downloadResume() {
  const lines = [
    profile.name.toUpperCase(),
    `${profile.title} · ${profile.experience} experience`,
    `${profile.location} · ${profile.email} · ${profile.phone}`,
    `${profile.linkedin} · ${profile.github}`,
    "",
    "PROFILE",
    "React.js developer with 2+ years of experience building responsive, scalable and",
    "user-friendly web applications, dashboards and admin panels for production clients.",
    "",
    "EXPERIENCE",
    ...experience.flatMap((job) => [
      `${job.role} — ${job.company}, ${job.location} (${job.duration})`,
      ...job.responsibilities.map((item) => `  - ${item}`),
      "",
    ]),
    "SKILLS",
    ...skillGroups.map((group) => `${group.label}: ${group.skills.map((s) => s.name).join(", ")}`),
    "",
    "PROJECTS",
    ...projects.map((p) => `${p.title} — ${p.tech.join(", ")}`),
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Shivani-Patel-React-Developer-Resume.txt";
  a.click();
  URL.revokeObjectURL(url);
}
