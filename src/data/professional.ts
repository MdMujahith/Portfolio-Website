/**
 * PROFESSIONAL DATA
 * ==================
 * Skills, projects, and work experience.
 * * HOW TO EDIT:
 * - Add/remove skills: Just add objects to the `skills` array
 * - Update projects: Edit the `projects` array with your latest work
 * - Manage experience: Update the `experience` array chronologically
 */

export interface Skill {
  name: string;
  icon: string;
  logoUrl: string;
  color: string;
  category?: "language" | "tool" | "framework";
  invertOnDark?: boolean;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  tags: string[];
  featured?: boolean;
}

export interface Experience {
  id: string; // Added to prevent React key mapping errors in the UI
  company: string;
  role: string;
  tenure: string;
  description: string;
  bgImageUrl: string;
  skills?: string[];
}

export const skills: Skill[] = [
  { name: "Python", icon: "SiPython", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", color: "#3776AB", category: "language" },
  { name: "C++", icon: "SiCplusplus", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", color: "#00599C", category: "language" },
  { name: "FastAPI", icon: "SiFastapi", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg", color: "#009688", category: "framework" },
  { name: "HTML5", icon: "SiHtml5", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", color: "#E34F26", category: "language" },
  { name: "CSS3", icon: "SiCss3", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", color: "#1572B6", category: "language" },
  { name: "MySQL", icon: "SiMysql", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", color: "#4479A1", category: "tool" },
  { name: "Linux", icon: "SiLinux", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", color: "#FCC624", category: "tool" },
  { name: "Git", icon: "SiGit", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", color: "#F05032", category: "tool" },
  { name: "AWS", icon: "SiAmazonaws", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", color: "#FF9900", category: "tool", invertOnDark: true },
  { name: "DSA", icon: "SiLeetcode", logoUrl: "https://cdn.simpleicons.org/leetcode/FFA116", color: "#FFA116", category: "language" },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "SignBridge (RTSLDS)",
    description: "Real-time ISL & ASL translation using Computer Vision.",
    longDescription:
      "A real-time system translating Indian (ISL) and American (ASL) Sign Language into English using Python and YOLO. It facilitates instant communication for the hearing-impaired by mapping gestures to text output.",
    imageUrl: "/image/project/RTSLDS.png",
    projectUrl: "https://github.com/MdMujahith/RTSLDS",
    githubUrl: "https://github.com/MdMujahith/RTSLDS",
    tags: ["Python", "YOLO", "Flask", "CV"],
    featured: true,
  },
  {
    id: 2,
    title: "Uni Navigator",
    description: "Emotionally intelligent academic co-pilot.",
    longDescription:
      "An innovative academic assistant powered by the Gemini API, designed to provide emotionally intelligent support and guidance for students. Features include personalized recommendations, resource management, and an AI agent for interactive help.",
    imageUrl: "/image/project/UniNav.png",
    projectUrl: "https://github.com/MdMujahith/UniNavigator",
    githubUrl: "https://github.com/MdMujahith/UniNavigator",
    tags: ["Python", "Ai Agent", "Gemini API"],
    featured: true,
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Sleek personal portfolio with interactive animations.",
    longDescription:
      "Built with Next.js, Tailwind CSS, and Framer Motion. This site features high-performance animations, responsive layouts, and accessibility optimizations to showcase projects elegantly.",
    imageUrl: "/image/project/Portfolio-Website.png",
    projectUrl: "https://mdmujahith.vercel.app",
    githubUrl: "https://mdmujahith.vercel.app",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    featured: true,
  },
  {
    id: 4,
    title: "Personal Networth Tracker",
    description: "A simple tool to track and manage personal finances.",
    longDescription:
      "A high-performance blogging platform featuring Markdown support, syntax highlighting, and static rendering. Designed for developers to share technical articles with optimal SEO performance.",
    imageUrl: "/image/project/blogweb.png",
    projectUrl: "#",
    githubUrl: "https://github.com/MdMujahith/Finance-App",
    tags: ["Next.js", "Markdown", "SEO"],
    featured: false,
  },
];

export const experience: Experience[] = [
  {
    id: "exp-ibm",
    company: "IBM",
    role: "Frontend Developer Intern",
    tenure: "Oct 2024 - Nov 2024",
    description: "Leading Front-end development for a Gaming Website.",
    bgImageUrl: "/image/experience/Frontend_Exp.png",
    skills: ["React", "TypeScript", "UI/UX"],
  },
  {
    id: "exp-techno",
    company: "Techno Hacks",
    role: "Cyber Security Intern",
    tenure: "Oct 2023 - Nov 2023",
    description:
      "Assisted in cybersecurity projects and learned about security tools.",
    bgImageUrl: "/image/experience/Cybersecurity_Exp.png",
    skills: ["Security", "Network Analysis"],
  },
  {
    id: "exp-crescent",
    company: "Crescent Data Science Club",
    role: "Social Media Team Lead",
    tenure: "2024 - 2025",
    description:
      "Managed social media presence, led campaigns, and grew community engagement.",
    bgImageUrl: "/image/experience/Socialmedia_Exp.png",
    skills: ["Marketing", "Content Strategy"],
  },
  {
    id: "exp-opensource",
    company: "Open Source Projects",
    role: "Contributor",
    tenure: "03/2023 - 01/2024",
    description:
      "Learned and contributed to open-source projects while improving coding and collaboration skills.",
    bgImageUrl: "/image/experience/Opensource_Exp.png",
    skills: ["Git", "Collaboration"],
  },
];