/**
 * SITE CONFIGURATION
 * ===================
 * Central hub for site-wide settings: personal info, social links, resume files,
 * navigation, and SEO metadata.
 *
 * HOW TO EDIT:
 * - Update your email, social links, and resume files here
 * - Add/remove nav links in the `navLinks` array (order determines display order)
 * - Changes reflect across the entire site automatically
 *
 * NOTE: Skills, projects, experience, certifications, and testimonials each have
 * their own dedicated file in this data/ directory.
 */

export interface SiteConfig {
  yearsCoding: number;
  resumeUrl: string;
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

  social: {
    twitter: string;
    github: string;
    linkedin: string;
  };

  navLinks: {
    label: string;
    href: string;
  }[];

  resumes: {
    id: string;
    label: string;
    description: string;
    icon: string;
    fileName: string;
  }[];

  seo: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    ogImage: string;
  };
}

export const siteConfig: SiteConfig = {
  yearsCoding: 4,
  resumeUrl: "/resume.pdf",

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
    twitter: "https://twitter.com/",
    github: "https://github.com/MdMujahith",
    linkedin: "https://linkedin.com/in/mdmujahith03",
  },

  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Testimonials", href: "#testimonials" },
  ],

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
    title: "Mohamed Mujahith - Python Developer",
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
