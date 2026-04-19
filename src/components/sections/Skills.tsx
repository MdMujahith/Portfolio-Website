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

// Fortune 500 easing: deliberate, smooth, no bounce.
const premiumEase = [0.16, 1, 0.3, 1] as const;

const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      /* Perfectly matched responsive spacing */
      className="w-full pt-12 pb-20 md:pt-20 md:pb-32 lg:pt-24 lg:pb-40 relative z-10 transition-colors duration-300"
      aria-labelledby="skills-heading"
    >
      {/* * =======================================
        * The "Liquid Glass" Sheet: SHIFTED DOWN
        * =======================================
        * We created a dedicated element and forced the radial glow to the bottom.
        * This creates the premium "Apple" depth effect without overlapping content.
        */}
      <div
        className="absolute inset-0 -z-10 opacity-30 dark:opacity-15 backdrop-blur-xl pointer-events-none"
        style={{
          /* 👇 Gradient shifted drastically to the bottom (85%) 👇 */
          background: "radial-gradient(ellipse 70% 30% at 50% 85%, var(--border-strong), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-20">
        
        {/* =======================================
          * HEADER: Editorial Style
          * ======================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="mb-12 md:mb-16 lg:mb-20 text-left"
        >
          <p className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-[var(--text-muted)] mb-4 md:mb-6">
            02 // Technical Arsenal
          </p>
          <h2 
            id="skills-heading" 
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter leading-[1.1]"
            style={{ color: "var(--text-primary)" }}
          >
            {content.sections.skills.title}
          </h2>
        </motion.div>

        {/* =======================================
          * GRID: Apple-Style Soft Cards
          * ======================================= */}
        <motion.ul
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { staggerChildren: 0.05, ease: premiumEase } 
            },
          }}
          role="list"
        >
          {skills.map((skill) => {
            const IconComponent = iconRegistry[skill.icon] || FaCode;
            
            return (
              <motion.li 
                key={skill.name} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: premiumEase } },
                }}
              >
                <div
                  className="group relative flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-[1.5rem] border transition-all duration-500 overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 cursor-default"
                  style={{ background: "var(--bg-elevated)", borderColor: "var(--border-strong)" }}
                >
                  {/* Subtle hover gradient flare */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--text-primary)] to-transparent opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none" />

                  {/* Icon Wrapper */}
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full flex items-center justify-center border transition-transform duration-500 ease-out group-hover:scale-110"
                    style={{ background: "var(--bg-subtle)", borderColor: "var(--border-strong)" }}
                    aria-hidden="true"
                  >
                    <IconComponent size={20} style={{ color: skill.color }} className="md:w-6 md:h-6" />
                  </div>
                  
                  {/* Skill Text */}
                  <p 
                    className="text-[14px] md:text-[16px] font-medium tracking-tight transition-colors duration-300 group-hover:text-[var(--text-primary)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {skill.name}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

      </div>
    </section>
  );
};

export default Skills;