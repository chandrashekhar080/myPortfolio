import {
  profile,
  skillGroups,
  experience,
  education,
  certifications,
  projects,
} from "@/data/portfolio";

const PROFILE_SUMMARY =
  "MERN stack developer with a strong foundation in frontend and full-stack development, building " +
  "responsive, scalable and user-friendly web applications. Hands-on across React.js, Next.js, " +
  "Node.js, Express.js and MongoDB, with practical experience in REST API development and " +
  "integration, authentication, real-time features and both SQL and NoSQL databases. Keen to keep " +
  "growing into AI-driven applications and cloud-based solutions.";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function resumeFileName(extension: string) {
  return `${profile.name.replace(/\s+/g, "-")}-MERN-Stack-Developer-Resume.${extension}`;
}

/** Links the résumé should show — anything left blank in the profile is skipped. */
function profileLinks() {
  return [profile.linkedin, profile.github].filter(Boolean) as string[];
}

function buildResumeHtml() {
  const contact = [profile.location, profile.email, `${profile.phone}, ${profile.phoneAlt}`]
    .map(escapeHtml)
    .join(" · ");
  const links = profileLinks().map(escapeHtml).join(" · ");

  const jobs = experience
    .map(
      (job) => `
        <article class="entry">
          <header>
            <h3>${escapeHtml(job.role)} — ${escapeHtml(job.company)}</h3>
            <span>${escapeHtml(job.duration)}</span>
          </header>
          <p class="meta">${escapeHtml(job.location)}</p>
          <ul>${job.responsibilities.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>`,
    )
    .join("");

  const skills = skillGroups
    .map(
      (group) =>
        `<p class="skill-row"><strong>${escapeHtml(group.label)}:</strong> ${group.skills
          .map((skill) => escapeHtml(skill.name))
          .join(", ")}</p>`,
    )
    .join("");

  const schooling = education
    .map(
      (item) => `
        <article class="entry">
          <header>
            <h3>${escapeHtml(item.degree)}</h3>
            <span>${escapeHtml(item.year)}</span>
          </header>
          <p class="meta">${escapeHtml(item.institute)}, ${escapeHtml(item.location)} · ${escapeHtml(
            item.score,
          )}</p>
        </article>`,
    )
    .join("");

  const certs = certifications
    .map(
      (cert) =>
        `<p class="skill-row"><strong>${escapeHtml(cert.title)}</strong> — ${escapeHtml(
          cert.issuer,
        )} (${escapeHtml(cert.date)})</p>`,
    )
    .join("");

  const work = projects
    .map((project) => {
      const urls = [
        project.live ? `Live: ${project.live}` : null,
        project.repo ? `Code: ${project.repo}` : null,
      ]
        .filter(Boolean)
        .map((url) => escapeHtml(url as string))
        .join(" · ");

      return `
        <article class="entry">
          <header>
            <h3>${escapeHtml(project.title)}</h3>
            <span>${escapeHtml(project.category)}</span>
          </header>
          <p>${escapeHtml(project.description)}</p>
          <p class="meta">${escapeHtml(project.tech.join(", "))}</p>
          ${urls ? `<p class="meta">${urls}</p>` : ""}
        </article>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(profile.name)} — ${escapeHtml(profile.title)}</title>
<style>
  @page { size: A4; margin: 14mm 14mm 12mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 10.2pt;
    line-height: 1.45;
    color: #16181d;
  }
  h1 { margin: 0; font-size: 20pt; letter-spacing: -0.01em; }
  .role { margin: 2px 0 0; font-size: 11pt; font-weight: 600; color: #3b4252; }
  .contact { margin: 6px 0 0; font-size: 9pt; color: #55606f; }
  header.masthead { border-bottom: 2px solid #16181d; padding-bottom: 10px; }
  section { margin-top: 16px; }
  h2 {
    margin: 0 0 8px;
    font-size: 9pt;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #16181d;
    border-bottom: 1px solid #c9cfd8;
    padding-bottom: 4px;
  }
  .entry { margin-bottom: 11px; break-inside: avoid; }
  .entry header { display: flex; justify-content: space-between; gap: 12px; align-items: baseline; }
  .entry h3 { margin: 0; font-size: 10.6pt; }
  .entry header span { font-size: 8.6pt; color: #55606f; white-space: nowrap; }
  .entry p { margin: 2px 0 0; }
  .meta { font-size: 8.8pt; color: #55606f; }
  ul { margin: 5px 0 0; padding-left: 16px; }
  li { margin-bottom: 2px; }
  .skill-row { margin: 0 0 3px; }
  @media screen {
    body { max-width: 820px; margin: 0 auto; padding: 32px 28px 48px; }
  }
</style>
</head>
<body>
  <header class="masthead">
    <h1>${escapeHtml(profile.name)}</h1>
    <p class="role">${escapeHtml(profile.title)} · ${escapeHtml(profile.experience)} experience</p>
    <p class="contact">${contact}</p>
    ${links ? `<p class="contact">${links}</p>` : ""}
  </header>

  <section>
    <h2>Profile</h2>
    <p>${escapeHtml(PROFILE_SUMMARY)}</p>
  </section>

  <section>
    <h2>Experience</h2>
    ${jobs}
  </section>

  <section>
    <h2>Education</h2>
    ${schooling}
  </section>

  <section>
    <h2>Skills</h2>
    ${skills}
  </section>

  <section>
    <h2>Projects</h2>
    ${work}
  </section>

  <section>
    <h2>Certifications</h2>
    ${certs}
  </section>
</body>
</html>`;
}

/** Fallback for when a popup is blocked: download the same résumé as plain text. */
function downloadResumeText() {
  const lines = [
    profile.name.toUpperCase(),
    `${profile.title} · ${profile.experience} experience`,
    `${profile.location} · ${profile.email} · ${profile.phone}, ${profile.phoneAlt}`,
    profileLinks().join(" · "),
    "",
    "PROFILE",
    PROFILE_SUMMARY,
    "",
    "EXPERIENCE",
    ...experience.flatMap((job) => [
      `${job.role} — ${job.company}, ${job.location} (${job.duration})`,
      ...job.responsibilities.map((item) => `  - ${item}`),
      "",
    ]),
    "EDUCATION",
    ...education.map(
      (item) => `${item.degree} — ${item.institute}, ${item.location} (${item.year}, ${item.score})`,
    ),
    "",
    "SKILLS",
    ...skillGroups.map((group) => `${group.label}: ${group.skills.map((s) => s.name).join(", ")}`),
    "",
    "PROJECTS",
    ...projects.flatMap((p) => [
      `${p.title} — ${p.tech.join(", ")}`,
      ...(p.live ? [`  Live: ${p.live}`] : []),
      ...(p.repo ? [`  Code: ${p.repo}`] : []),
    ]),
    "",
    "CERTIFICATIONS",
    ...certifications.map((c) => `${c.title} — ${c.issuer} (${c.date})`),
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = resumeFileName("txt");
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Opens a print-ready résumé built from the portfolio data and triggers the browser's
 * print dialog, where it can be saved as a PDF. Falls back to a plain-text download
 * if the popup is blocked.
 */
export function downloadResume() {
  // No `noopener` here: the spec makes window.open() return null when it is set,
  // and we need the handle to write the résumé into the new window.
  const win = window.open("", "_blank", "width=900,height=1000");

  if (!win) {
    downloadResumeText();
    return;
  }

  win.document.write(buildResumeHtml());
  win.document.close();
  win.document.title = `${profile.name} — ${profile.title}`;

  const print = () => {
    win.focus();
    win.print();
  };

  if (win.document.readyState === "complete") {
    window.setTimeout(print, 120);
  } else {
    win.addEventListener("load", () => window.setTimeout(print, 120));
  }
}
