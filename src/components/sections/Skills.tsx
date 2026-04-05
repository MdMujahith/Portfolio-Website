"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SiC,
  SiCplusplus,
  SiLinux,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGit,
  SiPython,
  SiMysql,
  SiFigma,
  SiGoogleappsscript,
} from "react-icons/si";
import { FaJava, FaCode } from "react-icons/fa";
import { IconType } from "react-icons";
import { skills } from "@/data/professional";
import { content } from "@/data/content";

/* ============================================
 * ICON REGISTRY
 * ============================================
 * Maps string names from the CMS to actual React Icon components.
 */
const iconRegistry: Record<string, IconType> = {
  SiPython,
  SiC,
  SiCplusplus,
  SiJavascript,
  FaJava,
  SiGoogleappsscript,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiLinux,
  SiGit,
  SiFigma,
};

const Skills: React.FC = () => {
  // Framer Motion variants for staggered container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }, // Fast, snappy stagger
    },
  };

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" as const } // <--- Add 'as const' here!
  }
};

  return (
    <section
      id="skills"
      className="w-full flex flex-col items-center py-20 sm:py-28 pattern-bg-project relative z-10"
      aria-labelledby="skills-heading"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 
          id="skills-heading"
          className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-center animate-gradient-text mb-12 sm:mb-16"
        >
          {content.sections.skills.title}
        </h2>
      </motion.div>

      {/* Grid */}
      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl px-4 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // Triggers when 10% of the grid is visible
        role="list"
      >
        {skills.map((skill) => {
          // Dynamically fetch the icon, fallback to a generic code icon if not found
          const IconComponent = iconRegistry[skill.icon] || FaCode;

          return (
            <motion.li key={skill.name} variants={itemVariants}>
              {/* Preserved Original Card Styles */}
              <div className="group flex items-center gap-5 p-5 bg-white rounded-full border border-slate-300 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-400 hover:-translate-y-0.5 cursor-default">
                <div
                  className="p-3 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors"
                  style={{ color: skill.color }}
                  aria-hidden="true"
                >
                  <IconComponent size={32} />
                </div>
                <p className="text-lg sm:text-xl font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                  {skill.name}
                </p>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
};

export default Skills;