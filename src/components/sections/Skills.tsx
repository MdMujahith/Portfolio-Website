"use client";

import React from "react";
import { motion } from "framer-motion";
import { skills } from "@/data/professional";
import { content } from "@/data/content";
import BackgroundFX from "@/components/ui/BackgroundFX"; // <-- Import the new component

// Map your existing skill.icon strings to the official full-color SVG logos
const logoRegistry: Record<string, string> = {
  SiPython: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  SiC: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg",
  SiCplusplus: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  SiJavascript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  FaJava: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  SiGoogleappsscript: "https://www.gstatic.com/images/branding/product/2x/apps_script_48dp.png",
  SiHtml5: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  SiCss3: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  SiMysql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  SiLinux: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  SiGit: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  SiFigma: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
};

// Fortune 500 easing: deliberate, smooth, no bounce.
const premiumEase = [0.16, 1, 0.3, 1] as const;

const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      /* Perfectly matched responsive spacing */
      className="w-full py-20 md:py-28 relative z-10 transition-colors duration-300 overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* ── AMBIENT LIGHTING & TEXTURE (The Proper Way) ── */}
      <BackgroundFX 
        bloomColor="accent" 
        bloomPosition="top-[20%] right-[-10%] w-[60%] h-[60%]"
        pattern="grid"
        textureOpacity="light"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-20">
        
        {/* ── HEADER: Editorial Style ── */}
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

        {/* ── GRID: Apple-Style Soft Cards ── */}
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
            const logoUrl = logoRegistry[skill.icon];
            
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
                    {logoUrl ? (
                      <img 
                        src={logoUrl} 
                        alt={`${skill.name} logo`} 
                        className="w-6 h-6 md:w-8 md:h-8 object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-[var(--border-strong)] rounded-full" />
                    )}
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