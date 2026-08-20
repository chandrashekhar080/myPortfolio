import cafeImg from "@/assets/project-cafe.svg";
import tierlistImg from "@/assets/project-tierlist.svg";
import redbusImg from "@/assets/project-redbus.svg";
import portfolioImg from "@/assets/project-portfolio.svg";
import taskImg from "@/assets/project-task.svg";
import jobportalImg from "@/assets/project-jobportal.svg";
import healthcareImg from "@/assets/project-healthcare.jpg";
import bizlaxyImg from "@/assets/project-bizlaxy.jpg";
import kidskloudImg from "@/assets/project-kidskloud.svg";

export const profile = {
  name: "Chandrashekhar Ghosh",
  initials: "CG",
  title: "MERN Stack Developer",
  experience: "1.5+ Years",
  location: "Ganesh Nagar, Indore, Madhya Pradesh, India",
  tagline: "Building full-stack web applications with React, Next.js, Node.js, Express and MongoDB.",
  email: "0810chandrashekhar@gmail.com",
  phone: "+91 8959281584",
  phoneAlt: "+91 8962504009",
  // TODO: confirm the exact profile URLs — the resume only lists the handle "ChandraShekhar_080"
  // and carries no LinkedIn. An empty string hides that icon everywhere it is rendered.
  linkedin: "",
  github: "https://github.com/ChandraShekhar_080",
  company: "Fovty Solutions Pvt. Ltd.",
};

export const typedRoles = [
  "MERN Stack Developer",
  "React & Next.js Developer",
  "Node.js & REST API Developer",
  "Full-Stack Web Developer",
];

export const skillGroups = [
  {
    label: "Frontend",
    skills: [
      { name: "HTML5", level: 92 },
      { name: "CSS3", level: 90 },
      { name: "JavaScript (ES6+)", level: 88 },
      { name: "React.js", level: 88 },
      { name: "Next.js", level: 78 },
      { name: "Redux Toolkit", level: 80 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Bootstrap", level: 84 },
      { name: "shadcn/ui", level: 76 },
      { name: "Responsive Design", level: 90 },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", level: 84 },
      { name: "Express.js", level: 82 },
      { name: "REST APIs", level: 86 },
      { name: "GraphQL", level: 62 },
      { name: "WebSockets", level: 70 },
      { name: "Auth & JWT", level: 76 },
      { name: "Mongoose", level: 78 },
      { name: "CORS / DotEnv", level: 80 },
    ],
  },
  {
    label: "Database",
    skills: [
      { name: "MongoDB", level: 82 },
      { name: "MySQL", level: 76 },
      { name: "PostgreSQL", level: 68 },
      { name: "Firebase", level: 70 },
      { name: "phpMyAdmin", level: 72 },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "VS Code", level: 92 },
      { name: "Git", level: 86 },
      { name: "GitHub", level: 86 },
      { name: "Postman", level: 84 },
      { name: "Nodemon", level: 82 },
      { name: "Docker", level: 60 },
      { name: "Vercel", level: 78 },
      { name: "AWS", level: 58 },
      { name: "GCP", level: 55 },
    ],
  },
] as const;

export type Education = {
  degree: string;
  institute: string;
  location: string;
  year: string;
  score: string;
};

export const education: Education[] = [
  {
    degree: "B.Sc. in Computer Science",
    institute: "Govt. Holkar Science College",
    location: "Indore, India",
    year: "2024",
    score: "68.0%",
  },
  {
    degree: "DCA in Computer Applications",
    institute: "MCRPV",
    location: "Bhopal, India",
    year: "2022",
    score: "71.0%",
  },
  {
    degree: "Class 12th (Mathematics)",
    institute: "Govt. Excellence School No. 01",
    location: "Khargone, India",
    year: "2021",
    score: "88.2%",
  },
  {
    degree: "Class 10th",
    institute: "SHSK Khamkheda",
    location: "Khargone, India",
    year: "2019",
    score: "87.8%",
  },
];

export const experience = [
  {
    role: "Junior MERN Stack Developer",
    company: "Fovty Solutions Pvt. Ltd.",
    location: "Indore, India · Onsite",
    duration: "Nov 2025 – Present",
    responsibilities: [
      "Handle end-to-end development on a live tractor platform project",
      "Own features across React, Express, Node.js and MongoDB",
      "Design REST endpoints and the data models behind them",
      "Translate client requirements into shippable, scoped work",
      "Keep the codebase clean, reusable and scalable as it grows",
      "Coordinate with designers, backend developers and QA through code review",
    ],
  },
  {
    role: "Software Development Intern",
    company: "Fovty Solutions Pvt. Ltd.",
    location: "Indore, India · Onsite",
    duration: "May 2025 – Oct 2025",
    responsibilities: [
      "Built and maintained features across the MERN stack on live client work",
      "Developed responsive React interfaces from design handoffs",
      "Wrote Express REST endpoints and wired them into the frontend",
      "Modelled collections in MongoDB with Mongoose schemas",
      "Handled loading, error and empty states on every data-driven view",
      "Converted a six-month internship into a full-time on-role position",
    ],
  },
  {
    role: "Web Development Intern",
    company: "The Developers Arena",
    location: "Remote",
    duration: "May 2025 – Present",
    responsibilities: [
      "Build assigned web modules with React.js, Node.js and Express.js",
      "Turn written requirements into reusable, well-structured components",
      "Integrate REST APIs and verify them end to end with Postman",
      "Deliver tasks against weekly sprint deadlines with mentor review",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Code Alpha Pvt. Ltd.",
    location: "Remote",
    duration: "April 2025",
    responsibilities: [
      "Completed a short, intensive frontend development track",
      "Built responsive layouts with HTML, CSS, Bootstrap and JavaScript",
      "Submitted working projects against a fixed review checklist",
    ],
  },
  {
    role: "Software Development Intern",
    company: "Unified Mentors",
    location: "Remote",
    duration: "Dec 2024 – Mar 2025",
    responsibilities: [
      "Built full-stack practice applications on the MERN stack",
      "Practised Git and GitHub workflows on every submission",
      "Strengthened JavaScript fundamentals, DOM work and API handling",
    ],
  },
] as const;

export type Certification = {
  title: string;
  issuer: string;
  date: string;
};

export const certifications: Certification[] = [
  { title: "Advanced Software Engineering", issuer: "Walmart Global Tech", date: "Dec 2024" },
  { title: "Software Engineering", issuer: "Goldman Sachs", date: "Dec 2024" },
  { title: "Software Engineering", issuer: "Accenture", date: "Dec 2024" },
  { title: "Development & Advanced Engineering", issuer: "Accenture", date: "Dec 2024" },
  { title: "Artificial Intelligence", issuer: "Cognizant", date: "Dec 2024" },
];

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
    title: "Job Portal — Full Stack",
    category: "Full Stack",
    image: jobportalImg,
    description:
      "End-to-end hiring platform where candidates search and apply for jobs while employers post roles, create companies and track applications in real time.",
    tech: [
      "React.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "shadcn/ui",
      "Node.js",
      "Express.js",
      "WebSockets",
    ],
    features: [
      "Job search with filters, explore and browse",
      "Separate employee and employer profiles",
      "Post jobs, create companies, manage listings",
      "Application and job status tracking",
      "Resume, certificate and profile uploads",
    ],
  },
  {
    title: "BBC Cafe Website",
    category: "Full Stack",
    image: cafeImg,
    description:
      "Full-stack cafe website pairing a public menu experience with an admin panel for managing dishes — graded A+ as an academic capstone.",
    tech: ["HTML", "CSS", "JavaScript", "Tailwind", "PHP", "phpMyAdmin", "Node.js", "Express.js"],
    features: [
      "Authentication for the admin area",
      "Full CRUD on menu management",
      "Admin panel built with Node.js and Express.js",
      "phpMyAdmin-backed data layer",
      "Received an A+ grade",
    ],
  },
  {
    title: "Share To Care Website + Dashboard",
    category: "Client Project",
    image: healthcareImg,
    description:
      "Healthcare platform with a public site, patient-facing flows and an admin panel for managing records and requests — contributed as part of the Fovty delivery team.",
    tech: ["React.js", "Material UI", "Redux Toolkit", "Node.js", "REST APIs"],
    features: [
      "Public healthcare website",
      "Patient-facing request flows",
      "Admin panel for records management",
      "Secure, validated form workflows",
    ],
  },
  {
    title: "Bizlaxy Website + Dashboard",
    category: "Client Project",
    image: bizlaxyImg,
    description:
      "Business management platform pairing a marketing website with a data-dense dashboard for day-to-day operations — contributed as part of the Fovty delivery team.",
    tech: ["React.js", "Tailwind CSS", "Redux Toolkit", "Node.js", "REST APIs"],
    features: [
      "Business management modules",
      "KPI dashboard",
      "Reusable table and form system",
      "Role-aware navigation",
    ],
  },
  {
    title: "KidsKloud Learning Platform",
    category: "Client Project",
    image: kidskloudImg,
    description:
      "Learning platform for kids with slide-based lessons, course progress tracking and an admin area for managing content — contributed as part of the Fovty delivery team.",
    tech: ["Laravel", "Blade", "JavaScript", "MySQL", "Vite"],
    features: [
      "Lesson and slide-based content delivery",
      "Course progress tracking",
      "Admin content management",
      "Responsive, kid-friendly UI",
    ],
    live: "https://www.kidskloud.com/",
  },
  {
    title: "Task Management App",
    category: "MERN Project",
    image: taskImg,
    description:
      "Task manager for creating, editing and prioritising work with drag-and-drop ordering, backed by an Express API and MongoDB persistence.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Local Storage"],
    features: [
      "Create, edit and prioritise tasks",
      "Drag-and-drop reordering",
      "Express REST API for task operations",
      "MongoDB storage with local-storage fallback",
    ],
  },
  {
    title: "Portfolio Website",
    category: "MERN Project",
    image: portfolioImg,
    description:
      "Personal portfolio built in React with reusable components, smooth navigation and a Node backend that stores contact-form submissions.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Reusable component architecture",
      "Smooth section navigation",
      "Validated contact form",
      "Express + MongoDB submission handling",
      "Performance-tuned for fast loads",
    ],
  },
  {
    title: "Red Bus Web App",
    category: "Frontend",
    image: redbusImg,
    description:
      "Responsive transportation booking interface with route search, seat layout and trip listings that hold together on every screen size.",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    features: [
      "Route and date search UI",
      "Seat selection layout",
      "Dynamic trip listings",
      "Mobile-first responsive design",
    ],
  },
  {
    title: "Tier List Web App",
    category: "Frontend",
    image: tierlistImg,
    description:
      "Interactive tier-ranking board where items are dragged between S–D rows, built in vanilla JavaScript to sharpen DOM fundamentals.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: [
      "Drag items between tier rows",
      "Editable tier labels",
      "State handled in plain JavaScript",
      "Responsive board layout",
    ],
  },
];

export const services = [
  {
    title: "MERN Stack Development",
    description:
      "End-to-end web apps on MongoDB, Express, React and Node — one developer across the whole flow.",
  },
  {
    title: "React & Next.js Development",
    description: "Component-driven interfaces with clean state management and predictable data flow.",
  },
  {
    title: "Frontend Development",
    description: "Semantic, accessible markup and modern CSS turned into fast production interfaces.",
  },
  {
    title: "REST API Development",
    description: "Express endpoints with validation, auth and error handling wired straight into the UI.",
  },
  {
    title: "Database Design",
    description: "MongoDB and SQL schemas modelled around how the application actually queries them.",
  },
  {
    title: "Responsive Website Design",
    description: "Layouts that hold up from 320px phones to ultra-wide desktops.",
  },
  {
    title: "Website Maintenance",
    description: "Bug fixes, performance tuning and incremental feature delivery.",
  },
];

export const achievements = [
  { value: "1.5+", label: "Years of Hands-On Development" },
  { value: "9+", label: "Projects Built & Delivered" },
  { value: "5", label: "Industry Certifications" },
  { value: "MERN", label: "End-to-End Stack Coverage" },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
