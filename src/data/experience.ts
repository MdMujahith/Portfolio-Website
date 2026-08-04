/**
 * EXPERIENCE DATA
 * ===============
 * Professional timeline entries shown in the Experience section.
 *
 * HOW TO EDIT:
 * - Add a role: copy an object, assign a unique id, and fill in all fields
 * - Remove a role: delete its object
 * - tags: technology / skill tags displayed as chips when an entry is expanded
 * - Keep entries in reverse-chronological order (most recent first)
 */

export interface Experience {
  id: string;
  company: string;
  role: string;
  tenure: string;
  description: string;
  tags?: string[];
}

export const experience: Experience[] = [
  {
    id: "exp-ibm",
    company: "IBM",
    role: "Frontend Developer Intern",
    tenure: "Oct 2024 - Nov 2024",
    description: "Leading Front-end development for a Gaming Website.",
    tags: ["React", "TypeScript", "UI/UX"],
  },
  {
    id: "exp-techno",
    company: "Techno Hacks",
    role: "Cyber Security Intern",
    tenure: "Oct 2023 - Nov 2023",
    description:
      "Assisted in cybersecurity projects and learned about security tools.",
    tags: ["Security", "Network Analysis"],
  },
  {
    id: "exp-crescent",
    company: "Crescent Data Science Club",
    role: "Social Media Team Lead",
    tenure: "2024 - 2025",
    description:
      "Managed social media presence, led campaigns, and grew community engagement.",
    tags: ["Marketing", "Content Strategy"],
  },
  {
    id: "exp-opensource",
    company: "Open Source Projects",
    role: "Contributor",
    tenure: "03/2023 - 01/2024",
    description:
      "Learned and contributed to open-source projects while improving coding and collaboration skills.",
    tags: ["Git", "Collaboration"],
  },
];
