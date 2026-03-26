/**
 * SITE CONFIGURATION
 * ===================
 * Central hub for all site-wide settings, contact information, and metadata.
 * 
 * HOW TO EDIT:
 * - Update your email, social links, and resume files here
 * - Changes reflect across the entire site automatically
 */

export interface SiteConfig {
  // Personal Information
  owner: {
    firstName: string;
    lastName: string;
    email: string;
    location: {
      city: string;
      country: string;
      timezone: string;
    };
  };

  // Social Media Links
  social: {
    twitter: string;
    github: string;
    linkedin: string;
  };

  // Resume Versions
  resumes: {
    id: string;
    label: string;
    description: string;
    icon: string; // Icon name from lucide-react
    fileName: string; // File in /public/pdf/
  }[];

  // SEO & Metadata
  seo: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    ogImage: string;
  };
}

export const siteConfig: SiteConfig = {
  owner: {
    firstName: "Mohamed",
    lastName: "Mujahith",
    email: "mohamedmujahith.mj@gmail.com",
    location: {
      city: "Chennai",
      country: "India",
      timezone: "Asia/Kolkata",
    },
  },

  social: {
    twitter: "https://twitter.com/VishwaGauravIn",
    github: "https://github.com/MdMujahith",
    linkedin: "https://linkedin.com/in/mohamedmujahith03",
  },

  resumes: [
    {
      id: "full",
      label: "Full Resume",
      description: "For general roles",
      icon: "FileText",
      fileName: "Mujahith_Resume.pdf",
    },
    {
      id: "frontend",
      label: "Frontend Developer",
      description: "React, Next.js, UI/UX",
      icon: "Code",
      fileName: "Mujahith_Frontend.pdf",
    },
    {
      id: "backend",
      label: "Backend & AI",
      description: "Python, Node, ML",
      icon: "Cpu",
      fileName: "Mujahith_Backend.pdf",
    },
  ],

  seo: {
    title: "Mohamed Mujahith - Full Stack Developer & MBA Candidate",
    description:
      "Portfolio of Mohamed Mujahith - B.Tech in Computer Science graduate and MBA candidate specializing in full-stack development, AI, and business strategy.",
    keywords: [
      "Full Stack Developer",
      "Python Developer",
      "React Developer",
      "Next.js",
      "TypeScript",
      "MBA",
      "Computer Science",
      "Portfolio",
    ],
    author: "Mohamed Mujahith",
    ogImage: "/image/og-image.png",
  },
};