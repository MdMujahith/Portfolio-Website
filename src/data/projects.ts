/**
 * PROJECTS DATA
 * =============
 * Portfolio projects displayed in the Projects section and individual case study pages.
 *
 * HOW TO EDIT:
 * - Add a project: copy an object and fill in all fields, assign a unique id and slug
 * - Remove a project: delete its object. Its slug-based route will automatically disappear.
 * - featured: true = shown with "Featured Build" badge (first project in the list)
 * - highlights: 3 bullet points shown on the project's case study page
 */

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  tags: string[];
  featured?: boolean;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "signbridge-rtslds",
    title: "SignBridge (RTSLDS)",
    description: "Real-time ISL & ASL translation using Computer Vision.",
    longDescription:
      "A real-time system translating Indian (ISL) and American (ASL) Sign Language into English using Python and YOLO. It facilitates instant communication for the hearing-impaired by mapping gestures to text output.",
    imageUrl: "/image/project/RTSLDS.png",
    projectUrl: "https://github.com/MdMujahith/RTSLDS",
    githubUrl: "https://github.com/MdMujahith/RTSLDS",
    tags: ["Python", "YOLO", "Flask", "CV"],
    featured: true,
    highlights: [
      "Real-time gesture recognition with YOLO at 30+ FPS.",
      "Supports both Indian Sign Language (ISL) and American Sign Language (ASL).",
      "Flask-powered web interface for instant text output display.",
    ],
  },
  {
    id: 2,
    slug: "uni-navigator",
    title: "Uni Navigator",
    description: "Emotionally intelligent academic co-pilot.",
    longDescription:
      "An innovative academic assistant powered by the Gemini API, designed to provide emotionally intelligent support and guidance for students. Features include personalized recommendations, resource management, and an AI agent for interactive help.",
    imageUrl: "/image/project/UniNav1.png",
    projectUrl: "https://github.com/MdMujahith/UniNavigator",
    githubUrl: "https://github.com/MdMujahith/UniNavigator",
    tags: ["Python", "Ai Agent", "Gemini API"],
    featured: true,
    highlights: [
      "Gemini API-powered AI agent that understands student context and emotional state.",
      "Personalized academic recommendations and resource management.",
      "Interactive chat interface for real-time guidance and support.",
    ],
  },
  {
    id: 3,
    slug: "portfolio-website",
    title: "Portfolio Website",
    description: "Sleek personal portfolio with interactive animations.",
    longDescription:
      "Built with Next.js, Tailwind CSS, and Framer Motion. This site features high-performance animations, responsive layouts, and accessibility optimizations to showcase projects elegantly.",
    imageUrl: "/image/project/Portfolio-Website.png",
    projectUrl: "https://mdmujahith.vercel.app",
    githubUrl: "https://mdmujahith.vercel.app",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    featured: true,
    highlights: [
      "Data-driven architecture — all content lives in a single data directory.",
      "Smooth Framer Motion animations with full reduced-motion accessibility support.",
      "Live GitHub and LeetCode stats fetched via serverless API routes.",
    ],
  },
  {
    id: 4,
    slug: "personal-networth-tracker",
    title: "Personal Networth Tracker",
    description: "A simple tool to track and manage personal finances.",
    longDescription:
      "A high-performance blogging platform featuring Markdown support, syntax highlighting, and static rendering. Designed for developers to share technical articles with optimal SEO performance.",
    imageUrl: "/image/project/blogweb.png",
    projectUrl: "#",
    githubUrl: "https://github.com/MdMujahith/Finance-App",
    tags: ["Next.js", "Markdown", "SEO"],
    featured: false,
    highlights: [
      "Track assets, liabilities, and net worth over time with a clean dashboard.",
      "CSV import/export for easy data management and portability.",
      "Visual charts for at-a-glance financial health overview.",
    ],
  },
];
