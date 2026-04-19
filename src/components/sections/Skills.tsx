"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiC, SiCplusplus, SiLinux, SiJavascript, SiHtml5, SiCss3, SiGit, SiPython, SiMysql, SiFigma, SiGoogleappsscript } from "react-icons/si";
import { FaJava, FaCode } from "react-icons/fa";
import { IconType } from "react-icons";
import { skills } from "@/data/professional";
import { content } from "@/data/content";

const iconRegistry: Record<string, IconType> = {
  SiPython, SiC, SiCplusplus, SiJavascript, FaJava, SiGoogleappsscript,
  SiHtml5, SiCss3, SiMysql, SiLinux, SiGit, SiFigma,
};

const Skills: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section
      id="skills"
      className="w-full flex flex-col items-center py-20 sm:py-28 pattern-bg-project relative z-10 transition-colors duration-300"
      aria-labelledby="skills-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 id="skills-heading" className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-center animate-gradient-text mb-12 sm:mb-16">
          {content.sections.skills.title}
        </h2>
      </motion.div>

      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl px-4 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        role="list"
      >
        {skills.map((skill) => {
          const IconComponent = iconRegistry[skill.icon] || FaCode;
          return (
            <motion.li key={skill.name} variants={itemVariants}>
              <div
  className="group flex items-center gap-5 p-5 rounded-full border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-default"
  style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
>
  <div
    className="p-3 rounded-full transition-colors duration-200 
      bg-slate-50 group-hover:bg-slate-100 
      dark:bg-zinc-800 dark:group-hover:bg-zinc-700"
    style={{ color: skill.color }}
    aria-hidden="true"
  >
    <IconComponent size={32} />
  </div>
  <p className="text-lg sm:text-xl font-semibold transition-colors duration-200
    text-zinc-600 group-hover:text-zinc-900
    dark:text-zinc-300 dark:group-hover:text-zinc-100">
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