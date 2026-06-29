/**
 * CONTENT CONFIGURATION
 * ======================
 * All text content, headlines, and CTAs for the portfolio.
 * * HOW TO EDIT:
 * - Update hero headlines, section titles, and button text here
 * - Supports multi-language strings for hero name animation
 */

export interface ContentConfig {
  hero: {
    greeting: string;
    languages: { name: string; lang: string }[];
    description: string;
    titles: string[];
    cta: {
      primary: string;
      secondary: string;
    };
    status?: {
      text: string;
      state: string;
      emoji: string;
    };
  };

  intro: {
    headline: string;
    headlineHighlight: string;
    headlineSuffix: string;
    description: string;
    cta: string;
    specSheet: {
      label: string;
      value: string;
      sub?: string;
      badge?: { text: string };
    }[];
  };

  sections: {
    skills: {
      title: string;
      description?: string;
    };
    projects: {
      title: string;
      description: string;
    };
    experience: {
      title: string;
    };
    testimonials: {
      title: string;
    };
  };

  footer: {
    headline: string;
    description: string;
    cta: string;
    marquee: {
      line1: string;
      line2: string;
    };
    copyright: {
      text: string;
      inspiration: {
        text: string;
        name: string;
        url: string;
      };
    };
  };
}

export const content: ContentConfig = {
  hero: {
    greeting: "Hello",
    languages: [
      { name: "Mujahith", lang: "en" },
      { name: "முஜாஹித்", lang: "ta" },
      { name: "مجاهد", lang: "ar" },
      { name: "ムジャヒス", lang: "ja" },
      { name: "무자히드", lang: "ko" },
      { name: "穆贾希德", lang: "zh" },
    ],
    titles: [
      "Python Developer",
      "AI Enthusiast",
      "Full Stack Engineer",
    ],
    description: "A software engineer specializing in building exceptional, high-performance digital experiences. Currently focused on mastering modern Software Architectures.",
    cta: {
      primary: "Download CV",
      secondary: "Contact Me",
    },
    status: {
      text: "Open to work",
      state: "available",
      emoji: "" 
    },
  },

  intro: {
    headline: "I build things",
    headlineHighlight: "that run in the",
    headlineSuffix: "background.",
    description:
      "Backend-focused developer who enjoys working close to the metal — from managing databases and APIs to understanding the exact address layout of dynamic arrays in memory. Passionate about writing code that is simple, secure, and maintainable.",
    cta: "Let's talk",
    specSheet: [
      {
        label: "Role",
        value: "Backend Developer",
        sub: "Entry level",
      },
      {
        label: "Status",
        value: "Open to work",
        badge: { text: "Available now" },
      },
      {
        label: "Focus",
        value: "Systems & APIs",
        sub: "Python · C++ · PostgreSQL",
      },
      {
        label: "Currently",
        value: "Mastering core algorithms",
        sub: "& low-level memory mechanics",
      },
      {
        label: "Based in",
        value: "Tamil Nadu, India",
      },
    ],
  },

  sections: {
    skills: {
      title: "Skills & Expertise",
    },
    projects: {
      title: "Featured Projects",
      description:
        "A selection of my work, showcasing my skills in creating modern, responsive, and user-friendly web applications.",
    },
    experience: {
      title: "Professional Experience",
    },
    testimonials: {
      title: "Testimonials",
    },
  },

  footer: {
    headline: "Stay Connected",
    description:
      "Feel free to reach out. I'm always open to new ideas, collaborations, or just a friendly chat.",
    cta: "Get in Touch",
    marquee: {
      line1: "Thank You For Visiting My Portfolio",
      line2: "Coded and Crafted With ❤️ by Mohamed Mujahith",
    },
    copyright: {
      text: "All Rights Reserved.",
      inspiration: {
        text: "Inspired by",
        name: "Vishwa Gaurav",
        url: "https://itsvg.in",
      },
    },
  },
};