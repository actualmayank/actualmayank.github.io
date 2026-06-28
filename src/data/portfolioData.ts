export type WindowId =
  | "welcome"
  | "about"
  | "projects"
  | "skills"
  | "education"
  | "experience"
  | "contact"
  | "resume"
  | "computer"
  | "recycle"
  | "shutdown"
  | "secret"
  | "certificate"
  | "project-fluxlane"
  | "project-subwise"
  | "project-gistify"
  | "terminal"
  | "readme";

export const profile = {
  name: "Mayank Kumar",
  role: "Computer Science Student, Developer, Content Creator",
  intro:
    "Building things for the internet, experimenting with AI, and occasionally turning chaotic ideas into usable products.",
  email: "mayank12999@gmail.com",
  resumePath: "/resume/resume.pdf",
  profileImagePath: "/images/profile.png",
  stats: [
    "B.Tech CSE Student",
    "MERN / Full-Stack Developer",
    "AI Automation Explorer",
    "Content Creator / YouTuber",
  ],
  systemInfo: [
    ["System Name", "Mayank Kumar"],
    ["Operating System", "MoonOS 98"],
    ["Status", "Building cool stuff"],
    ["Current Mission", "Turning ideas into products"],
  ],
};

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/actualmayank" },
  { label: "LinkedIn", href: "https://linkedin.com/in/actualmayank" },
  { label: "Email", href: `mailto:${profile.email}` },
];

export const projects = [
  {
    id: "fluxlane",
    title: "FluxLane",
    subtitle: "Traffic Prediction System",
    year: "2026",
    imagePath: "/images/fluxlane.png",
    description:
      "Built a full-stack traffic prediction platform leveraging machine learning to forecast traffic patterns, featuring REST APIs, real-time predictions, and an optimized data pipeline achieving 85%+ model accuracy.",
    skills: ["Full-Stack Development", "Python", "Machine Learning", "REST APIs"],
    badge: "",
    links: [
      ["View Project", "https://fluxlane.vercel.app/"],
      ["GitHub", "https://github.com/actualmayank/fluxlane"],
    ],
  },
  {
    id: "subwise",
    title: "Subwise",
    subtitle: "Subscription Tracker SaaS",
    year: "2026",
    imagePath: "/images/subwise.png",
    description:
      "Built a SaaS-based subscription management platform that helps users track recurring expenses, monitor spending patterns, and manage subscriptions through analytics-driven insights and a responsive user experience.",
    skills: ["React.js", "Node.js", "Full-Stack Development", "SaaS"],
    badge: "",
    links: [
      ["View Project", "https://github.com/actualmayank"],
      ["GitHub", "https://github.com/actualmayank"],
    ],
  },
  {
    id: "gistify",
    title: "Gistify",
    subtitle: "Chrome Extension",
    year: "2025",
    imagePath: "/images/gistify.png",
    description:
      "Built an AI-powered Chrome extension that generates concise web page summaries, helping users consume content faster through a clean, distraction-free reading experience.",
    skills: ["JavaScript", "Chrome Extensions", "AI APIs"],
    badge: "100+ weekly active users",
    links: [
      ["View Project", "https://chromewebstore.google.com/detail/gistify-%E2%80%93-ai-web-summariz/hlpmoeanajniaaofddpeffghklanpmpe"],
      ["GitHub", "https://github.com/actualmayank/gistify"],
    ],
  },
] as const;

export type ProjectId = (typeof projects)[number]["id"];

export const skillGroups = [
  {
    category: "Languages",
    imagePath: "/images/languages.png",
    skills: ["JavaScript", "Python"],
  },
  {
    category: "Frameworks",
    imagePath: "/images/frameworks.png",
    skills: ["React.js", "Node.js"],
  },
  {
    category: "Tools",
    imagePath: "/images/tools.png",
    skills: ["Git / GitHub", "REST APIs", "AI APIs"],
  },
  {
    category: "Development",
    imagePath: "/images/development.png",
    skills: [
      "Full-Stack Development",
      "Machine Learning",
      "Chrome Extension Development",
      "UI/UX",
    ],
  },
  {
    category: "Creative / Marketing",
    imagePath: "/images/creative.png",
    skills: ["Content Strategy", "Social Media Marketing"],
  },
];

export const education = [
  {
    school: "Manipal Institute of Technology",
    degree: "Bachelor of Technology - B.Tech, Computer Science",
    years: "2023-2027",
    imagePath: "/images/manipal.png",
  },
  {
    school: "Doon International School",
    degree: "Intermediate, Science",
    years: "2016-2022",
    imagePath: "/images/doon.png",
  },
  {
    school: "Laxman Public School",
    degree: "Secondary Education",
    years: "2014-2016",
    imagePath: "/images/laxman.png",
  },
  {
    school: "Holy Hearts Educational Academy",
    degree: "Primary Education",
    years: "2007-2013",
    imagePath: "/images/holyhearts.png",
  },
];

export const experience = [
  {
    role: "Engineer Intern",
    place: "National Payments Corporation of India (NPCI)",
    imagePath: "/images/npci.png",
    meta: "Internship | Jun 2026 - Jul 2026 | 2 months | Mumbai, Maharashtra, India - On-site",
    description:
      "Working on API-driven systems, EFRM workflows, and digital payments infrastructure within NPCI's Mobility Solutions team.",
    hasCertificate: false,
  },
] as const;

export const desktopIcons = [
  ["about", "About Me", "user", "Open Mayank's profile", 10, 28],
  ["computer", "My Computer", "computer", "System folders and links", 10, 0],
  ["projects", "My Projects", "projects", "Browse featured projects", 10, 0],
  ["skills", "Skills.exe", "skills", "Installed skills and tools", 10, 0],
  ["education", "Education", "education", "Academic timeline", 10, 0],
  ["experience", "Experience", "experience", "Work and leadership history", 10, 0],
  ["recycle", "Recycle Bin", "recycle", "Mostly empty, thankfully", 10, 0],
  ["contact", "Contact Me", "contact", "Send a message", 10, 0],
  ["resume", "Resume.pdf", "resume", "Preview and download resume", 10, 0],
  ["terminal", "Terminal.exe", "terminal", "Open MoonOS Terminal", 110, 28],
  ["readme", "README.txt", "text", "Read terminal commands", 110, 128],
] as const;

export const windowTitles: Record<WindowId, string> = {
  welcome: "Welcome to MoonOS 98",
  about: "About Me",
  projects: "My Projects",
  skills: "C:\\MOONOS\\SKILLS.EXE",
  education: "Education",
  experience: "Experience.doc",
  contact: "Send Message",
  resume: "Resume.pdf",
  computer: "My Computer",
  recycle: "Recycle Bin",
  shutdown: "Shut Down MoonOS 98",
  secret: "MoonOS Developer Mode Activated",
  certificate: "CodeAlpha Certificate Preview",
  "project-fluxlane": "FluxLane - Project Details",
  "project-subwise": "Subwise - Project Details",
  "project-gistify": "Gistify - Project Details",

  terminal: "MoonOS Terminal",
  readme: "README.txt - Notepad",
};

export const startMenu = [
  ["about", "About"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["education", "Education"],
  ["experience", "Experience"],
  ["contact", "Contact"],
  ["resume", "Resume"],
  ["computer", "My Computer"],
  ["terminal", "Terminal"],
  ["readme", "README.txt"],
  ["shutdown", "Shut Down MoonOS 98"],
] as const;

export const mobileTiles = [
  ["about", "About", "wide", "cyan"],
  ["projects", "Projects", "large", "blue"],
  ["skills", "Skills", "small", "green"],
  ["education", "Education", "small", "purple"],
  ["experience", "Experience", "wide", "orange"],
  ["contact", "Contact", "small", "cyan"],
  ["resume", "Resume", "small", "blue"],
  ["github", "GitHub", "small", "green"],
  ["linkedin", "LinkedIn", "small", "purple"],
] as const;