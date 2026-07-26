import schoolImg from "@/assets/project-school.jpg";
import restaurantImg from "@/assets/project-restaurant.jpg";
import travelImg from "@/assets/project-travel.jpg";
import healthcareImg from "@/assets/project-healthcare.jpg";
import bizlaxyImg from "@/assets/project-bizlaxy.jpg";
import applylawImg from "@/assets/project-applylaw.jpg";

export const profile = {
  name: "Shivani Patel",
  title: "React.js Frontend Developer",
  experience: "2+ Years",
  location: "Indore, Madhya Pradesh, India",
  tagline: "Building Modern, Responsive & Scalable Web Applications with React.js.",
  email: "shivanipatel.dev@gmail.com",
  phone: "+91 98765 43210",
  linkedin: "https://www.linkedin.com/in/shivani-patel",
  github: "https://github.com/shivanipatel",
  company: "Fovty Software Solution Pvt. Ltd.",
};

export const typedRoles = [
  "React.js Frontend Developer",
  "Dashboard & Admin Panel Specialist",
  "Responsive UI Engineer",
  "REST API Integration Developer",
];

export const skillGroups = [
  {
    label: "Frontend",
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "React.js", level: 93 },
      { name: "Redux Toolkit", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Material UI", level: 84 },
      { name: "Bootstrap", level: 86 },
      { name: "Responsive Design", level: 94 },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", level: 72 },
      { name: "Express.js", level: 70 },
      { name: "MongoDB", level: 74 },
      { name: "REST APIs", level: 88 },
    ],
  },
  {
    label: "Database",
    skills: [
      { name: "MongoDB", level: 74 },
      { name: "SQL", level: 68 },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "VS Code", level: 95 },
      { name: "Git", level: 88 },
      { name: "GitHub", level: 88 },
      { name: "Postman", level: 85 },
      { name: "npm", level: 87 },
      { name: "Chrome DevTools", level: 86 },
      { name: "Figma (Basic)", level: 62 },
    ],
  },
] as const;

export const experience = [
  {
    role: "React.js Frontend Developer",
    company: "Fovty Software Solution Pvt. Ltd.",
    location: "Indore, India",
    duration: "2024 – Present",
    responsibilities: [
      "Develop responsive web applications using React.js",
      "Build reusable UI components and design-system patterns",
      "Implement Redux Toolkit for state management",
      "Integrate REST APIs with loading, error and empty states",
      "Fix bugs and optimize application performance",
      "Collaborate with backend developers and designers",
      "Maintain clean, scalable and production-ready code",
    ],
  },
  {
    role: "React & Python Developer / Trainer",
    company: "Makespace Technology",
    location: "Indore, India",
    duration: "6 Months",
    responsibilities: [
      "Built React.js interfaces and Python-based backend modules",
      "Trained students and junior developers on React and Python fundamentals",
      "Created hands-on projects and coding assignments",
      "Reviewed code and guided best practices for clean architecture",
    ],
  },
  {
    role: "React Developer",
    company: "Technorizen Software Solutions",
    location: "Indore, India",
    duration: "1 Year (6 Months Internship + 6 Months On-Role)",
    responsibilities: [
      "Started as a 6-month intern and transitioned into an on-role React Developer",
      "Developed dynamic UI components and responsive web pages",
      "Worked with JavaScript, React.js and REST API integration",
      "Collaborated with the team to deliver client projects on time",
      "Learned production workflows, Git and code-review practices",
    ],
  },
] as const;

export type Project = {
  title: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
  features: string[];
  live?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "Travel Website + Dashboard",
    category: "Live Project",
    image: travelImg,
    description:
      "Complete travel management system with a customer-facing booking site and a full admin dashboard for operations.",
    tech: ["React.js", "Redux Toolkit", "Tailwind CSS", "REST APIs", "Chart.js"],
    features: [
      "Admin dashboard with analytics",
      "User management",
      "Booking management",
      "Role-based protected routes",
    ],
    live: "#",
    repo: "#",
  },
  {
    title: "Hare To Care Website + Dashboard",
    category: "Live Project",
    image: healthcareImg,
    description:
      "Healthcare platform with a public site, patient-facing flows and an admin panel to manage records and requests.",
    tech: ["React.js", "Material UI", "Redux Toolkit", "REST APIs"],
    features: ["Healthcare platform", "Dashboard", "Admin panel", "Secure form workflows"],
    live: "#",
  },
  {
    title: "Bizlaxy Website + Dashboard",
    category: "Live Project",
    image: bizlaxyImg,
    description:
      "Business management platform pairing a marketing website with a data-dense dashboard for day-to-day operations.",
    tech: ["React.js", "Tailwind CSS", "Redux Toolkit", "REST APIs"],
    features: ["Business management modules", "KPI dashboard", "Reusable table & form system"],
    live: "#",
  },
  {
    title: "ApplyLaw Website",
    category: "Live Project",
    image: applylawImg,
    description:
      "Law consultation platform focused on trust, clarity and fast lead capture across every device.",
    tech: ["React.js", "Bootstrap", "REST APIs"],
    features: ["Responsive design", "Consultation enquiry flow", "SEO-friendly page structure"],
    live: "#",
  },
  {
    title: "School Management Website",
    category: "Client Project",
    image: schoolImg,
    description:
      "Responsive school website with a modern UI and dynamic content pages for academics, admissions and events.",
    tech: ["React.js", "Tailwind CSS", "React Router"],
    features: ["Responsive school website", "Modern UI", "Dynamic pages"],
    repo: "#",
  },
  {
    title: "Restaurant Website",
    category: "Client Project",
    image: restaurantImg,
    description:
      "Responsive restaurant website with an appetising menu experience and a table booking section.",
    tech: ["React.js", "CSS3", "Bootstrap"],
    features: ["Responsive restaurant website", "Menu", "Booking section"],
    repo: "#",
  },
];

export const services = [
  {
    title: "React.js Development",
    description: "Component-driven React apps with clean state management and predictable data flow.",
  },
  {
    title: "Frontend Development",
    description: "Semantic, accessible markup and modern CSS turned into fast production interfaces.",
  },
  {
    title: "Dashboard Development",
    description: "Data-dense admin panels: tables, filters, charts, roles and permissions.",
  },
  {
    title: "Responsive Website Design",
    description: "Layouts that hold up from 320px phones to ultra-wide desktops.",
  },
  {
    title: "API Integration",
    description: "REST API wiring with loading, error and empty states handled properly.",
  },
  {
    title: "UI Development",
    description: "Figma-to-React translation with reusable design-system components.",
  },
  {
    title: "Website Maintenance",
    description: "Bug fixes, performance tuning and incremental feature delivery.",
  },
];

export const achievements = [
  { value: "2+", label: "Years of Professional Experience" },
  { value: "6+", label: "Live Projects Delivered" },
  { value: "100%", label: "Production-Level Applications" },
  { value: "React", label: "Strong Ecosystem Knowledge" },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
