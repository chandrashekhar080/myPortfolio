import schoolImg from "@/assets/project-school.jpg";
import restaurantImg from "@/assets/project-restaurant.jpg";
import travelImg from "@/assets/project-travel.jpg";
import healthcareImg from "@/assets/project-healthcare.jpg";
import bizlaxyImg from "@/assets/project-bizlaxy.jpg";
import applylawImg from "@/assets/project-applylaw.jpg";
import nannyImg from "@/assets/project-nanny.svg";
import mnextImg from "@/assets/project-mnext.svg";
import kidskloudImg from "@/assets/project-kidskloud.svg";

export const profile = {
  name: "Shivani Patel",
  title: "React.js Frontend Developer",
  experience: "2+ Years",
  location: "Indore, Madhya Pradesh, India",
  tagline: "Building Modern, Responsive & Scalable Web Applications with React.js.",
  email: "shivanipatel7180@gmail.com",
  phone: "+91 7489099533",
  linkedin: "https://www.linkedin.com/in/shivani-patel-450164273/",
  github: "https://github.com/Patel1shivani",
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

export const education = {
  degree: "Bachelor of Technology (B.Tech.), Information Technology",
  institute: "Swami Vivekanand College of Engineering",
  location: "Indore, India",
  year: "2024",
};

export const experience = [
  {
    role: "React Developer",
    company: "Fovty Software Solution Pvt. Ltd.",
    location: "Indore, India",
    duration: "June 2025 – Present",
    responsibilities: [
      "Build production-ready applications for real clients",
      "Develop clean, responsive user interfaces",
      "Create reusable components and design-system patterns",
      "Manage application state with Redux Toolkit",
      "Integrate REST APIs with loading, error and empty states",
      "Implement role-based authentication and payment flows",
      "Collaborate with backend developers, UI/UX designers and QA",
      "Optimise performance and keep the codebase clean and scalable",
    ],
  },
  {
    role: "Junior React Developer",
    company: "Technoriz Software Solution",
    location: "Indore, India",
    duration: "2024 – 2025",
    responsibilities: [
      "Developed responsive web applications with React.js",
      "Created reusable React components for client projects",
      "Integrated REST APIs into production interfaces",
      "Fixed bugs and enhanced application performance",
      "Followed modern development and code-review practices",
    ],
  },
  {
    role: "MERN Stack Intern",
    company: "Siya Technology",
    location: "Indore, India",
    duration: "6 Months · 2024",
    responsibilities: [
      "Worked hands-on with JavaScript, React.js, Node.js, Express.js and MongoDB",
      "Contributed to both practice builds and live client projects",
      "Attended client meetings and contributed to project discussions",
      "Collaborated with cross-functional teams on real workflows",
      "Strengthened communication and teamwork alongside technical skills",
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
    title: "Nanny Services Platform",
    category: "Live Project",
    image: nannyImg,
    description:
      "Childcare marketplace connecting parents with vetted caregivers — search and filters, caregiver profiles, bookings, Stripe payments and an admin panel.",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "TanStack Query", "Stripe", "Socket.IO"],
    features: [
      "Caregiver search with advanced filters",
      "Booking & scheduling flow",
      "Stripe payment integration",
      "Real-time chat and notifications",
      "Separate admin panel and REST API",
    ],
    live: "https://506-a.codeinges.com/",
    repo: "https://github.com/Patel1shivani/Nanny-Services",
  },
  {
    title: "Mnext Dashboard Platform",
    category: "Live Project",
    image: mnextImg,
    description:
      "Full-stack management platform with a data-dense React admin dashboard, a Node backend and a companion mobile app.",
    tech: ["React.js", "Redux Toolkit", "Tailwind CSS", "ApexCharts", "Socket.IO", "Vite"],
    features: [
      "Analytics dashboard with charts & KPIs",
      "Sortable, filterable data tables",
      "Real-time updates over sockets",
      "Backend + mobile app in one monorepo",
    ],
    repo: "https://github.com/Patel1shivani/Mnext",
  },
  {
    title: "KidsKloud Learning Platform",
    category: "Live Project",
    image: kidskloudImg,
    description:
      "Learning platform for kids with lesson slides, course progress tracking and an admin area for managing content.",
    tech: ["Laravel", "Blade", "JavaScript", "Vite", "MySQL"],
    features: [
      "Lesson & slide-based content delivery",
      "Course progress tracking",
      "Admin content management",
      "Responsive, kid-friendly UI",
    ],
    live: "https://www.kidskloud.com/",
    repo: "https://github.com/Patel1shivani/kidsClaoud",
  },
  {
    title: "Travel Website + Dashboard",
    category: "Live Project",
    image: travelImg,
    description:
      "Complete travel management system with a customer-facing booking site and a full admin dashboard for operations.",
    tech: ["React.js", "TypeScript", "Redux Toolkit", "Tailwind CSS", "REST APIs", "Chart.js"],
    features: [
      "Admin dashboard with analytics",
      "User management",
      "Booking management",
      "Role-based protected routes",
    ],
    repo: "https://github.com/Patel1shivani/TravelDashbaord",
  },
  {
    title: "Share To Care Website + Dashboard",
    category: "Live Project",
    image: healthcareImg,
    description:
      "Healthcare platform with a public site, patient-facing flows and an admin panel to manage records and requests.",
    tech: ["React.js", "TypeScript", "Material UI", "Redux Toolkit", "REST APIs"],
    features: ["Healthcare platform", "Dashboard", "Admin panel", "Secure form workflows"],
    repo: "https://github.com/Patel1shivani/Share2Care",
  },
  {
    title: "ApplyLaw Website",
    category: "Live Project",
    image: applylawImg,
    description:
      "Law consultation platform focused on trust, clarity and fast lead capture across every device.",
    tech: ["React.js", "Bootstrap", "REST APIs"],
    features: ["Responsive design", "Consultation enquiry flow", "SEO-friendly page structure"],
    live: "https://www.applylaw.co.uk/",
  },
  {
    title: "Bizlaxy Website + Dashboard",
    category: "Live Project",
    image: bizlaxyImg,
    description:
      "Business management platform pairing a marketing website with a data-dense dashboard for day-to-day operations.",
    tech: ["React.js", "Tailwind CSS", "Redux Toolkit", "REST APIs"],
    features: ["Business management modules", "KPI dashboard", "Reusable table & form system"],
  },
  {
    title: "School Management Website",
    category: "Client Project",
    image: schoolImg,
    description:
      "Responsive school website with a modern UI and dynamic content pages for academics, admissions and events.",
    tech: ["React.js", "Tailwind CSS", "React Router"],
    features: ["Responsive school website", "Modern UI", "Dynamic pages"],
    repo: "https://github.com/Patel1shivani/School_web",
  },
  {
    title: "Restaurant Website",
    category: "Client Project",
    image: restaurantImg,
    description:
      "Responsive restaurant website with an appetising menu experience and a table booking section.",
    tech: ["React.js", "CSS3", "Bootstrap", "Node.js"],
    features: ["Responsive restaurant website", "Menu", "Booking section", "Node.js backend"],
    repo: "https://github.com/Patel1shivani/Resaturant-web",
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
  { value: "9+", label: "Live Projects Delivered" },
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
