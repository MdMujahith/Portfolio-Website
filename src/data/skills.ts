/**
 * SKILLS DATA
 * ===========
 * Technical skills displayed in the Skills section.
 *
 * HOW TO EDIT:
 * - Add a skill: copy an object and fill in name, icon, logoUrl, color, category
 * - Remove a skill: delete its object from the array
 * - Update a logo: change the `logoUrl` field (CDN URL or local /public path)
 * - category: "language" | "tool" | "framework"
 * - invertOnDark: set true if the logo is dark-colored and needs to be inverted in dark mode
 */

export interface Skill {
  name: string;
  icon: string;
  logoUrl: string;
  color: string;
  category?: "language" | "tool" | "framework";
  invertOnDark?: boolean;
}

export const skills: Skill[] = [
  {
    name: "Python",
    icon: "SiPython",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "#3776AB",
    category: "language",
  },
  {
    name: "C++",
    icon: "SiCplusplus",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    color: "#00599C",
    category: "language",
  },
  {
    name: "FastAPI",
    icon: "SiFastapi",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    color: "#009688",
    category: "framework",
  },
  {
    name: "HTML5",
    icon: "SiHtml5",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    color: "#E34F26",
    category: "language",
  },
  {
    name: "CSS3",
    icon: "SiCss3",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    color: "#1572B6",
    category: "language",
  },
  {
    name: "MySQL",
    icon: "SiMysql",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    color: "#4479A1",
    category: "tool",
  },
  {
    name: "Linux",
    icon: "SiLinux",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
    color: "#FCC624",
    category: "tool",
  },
  {
    name: "Git",
    icon: "SiGit",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    color: "#F05032",
    category: "tool",
  },
  {
    name: "AWS",
    icon: "SiAmazonaws",
    logoUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    color: "#FF9900",
    category: "tool",
    invertOnDark: true,
  },
  {
    name: "DSA",
    icon: "SiLeetcode",
    logoUrl: "https://cdn.simpleicons.org/leetcode/FFA116",
    color: "#FFA116",
    category: "language",
  },
];
