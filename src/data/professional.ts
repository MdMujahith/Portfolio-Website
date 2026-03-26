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
  icon: string; // Icon name from react-icons (e.g., "SiPython")
  color: string; // Hex color code
  category?: "language" | "tool" | "framework";
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
  { name: "Python", icon: "SiPython", color: "#3776AB", category: "language" },
  { name: "C", icon: "SiC", color: "#00599C", category: "language" },
  { name: "C++", icon: "SiCplusplus", color: "#00599C", category: "language" },
  {
    name: "JavaScript",
    icon: "SiJavascript",
    color: "#F7DF1E",
    category: "language",
  },
  { name: "Java", icon: "FaJava", color: "#007396", category: "language" },
  {
    name: "AppScript",
    icon: "SiGoogleappsscript",
    color: "#4285F4",
    category: "language",
  },
  { name: "HTML5", icon: "SiHtml5", color: "#E34F26", category: "language" },
  { name: "CSS3", icon: "SiCss3", color: "#1572B6", category: "language" },
  { name: "MySQL", icon: "SiMysql", color: "#4479A1", category: "tool" },
  { name: "Linux", icon: "SiLinux", color: "#FCC624", category: "tool" },
  { name: "Git", icon: "SiGit", color: "#F05032", category: "tool" },
  { name: "Figma", icon: "SiFigma", color: "#F24E1E", category: "tool" },
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
    title: "Blog Platform",
    description: "Markdown-based blogging site with SEO optimization.",
    longDescription:
      "A high-performance blogging platform featuring Markdown support, syntax highlighting, and static rendering. Designed for developers to share technical articles with optimal SEO performance.",
    imageUrl: "/image/project/blogweb.png",
    projectUrl: "#",
    githubUrl: "#",
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

export interface ResumeVersion {
  id: string;
  label: string;
  sub: string;
  icon: string; // Stored as a string name!
  file: string;
}

// Add this array to the bottom of professional.ts
export const resumeVersions: ResumeVersion[] = [
  {
    id: "full",
    label: "Full Resume",
    sub: "For general roles",
    icon: "FileText",
    file: "/pdf/Mujahith_Resume.pdf",
  },
  {
    id: "frontend",
    label: "Frontend Developer",
    sub: "React, Next.js, UI/UX",
    icon: "Code",
    file: "/pdf/Mujahith_Frontend.pdf",
  },
  {
    id: "backend",
    label: "Backend & AI",
    sub: "Python, Node, ML",
    icon: "Cpu",
    file: "/pdf/Mujahith_Backend.pdf",
  },
];