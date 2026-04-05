/**
 * CONTENT CONFIGURATION
 * ======================
 * All text content, headlines, and CTAs for the portfolio.
 * 
 * HOW TO EDIT:
 * - Update hero headlines, section titles, and button text here
 * - Supports multi-language strings for hero name animation
 */

export interface ContentConfig {
  hero: {
    greeting: string;
    languages: { name: string; lang: string }[];
    titles: string[];
    cta: {
      primary: string;
      secondary: string;
    };
  };

  intro: {
    headline: string;
    subheadline: string;
    description: string;
    cta: string;
    cards: {
      title: string;
      description: string;
      icon: string; // lucide-react icon name
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
      "Open Source Enthusiast",
      "Full Stack Engineer",
    ],
    cta: {
      primary: "Download CV",
      secondary: "Contact Me",
    },
    status: {
  text: "Open to work",
  state: "available", // Green dot
  emoji: ""         // Renders: [dot] 🚀 Open to work
},
  },

  intro: {
    headline: "Developer.\nStrategist.\nInnovator.",
    subheadline: "Hi, I'm Mohamed Mujahith.",
    description:
      "As a recent B.Tech in Computer Science graduate and a current MBA candidate, I'm passionate about the intersection of technology and business. I am building a unique skill set to not only engineer powerful software but also to understand the market dynamics that make a product successful.",
    cta: "Get in Touch",
    cards: [
      {
        title: "Technical Skills",
        description:
          "Equipped with a strong foundation in modern web development, including hands-on experience with React, Next.js, and TypeScript to build responsive and efficient applications.",
        icon: "Code",
      },
      {
        title: "Strategic Mindset",
        description:
          "My MBA studies are providing me with a robust framework for market analysis, product management, and strategic decision-making, ensuring technology aligns with business goals.",
        icon: "Briefcase",
      },
      {
        title: "Eager to Innovate",
        description:
          "I am driven to apply my combined skills to create innovative products. I am actively seeking opportunities to contribute to challenging projects and grow within a forward-thinking team.",
        icon: "Zap",
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