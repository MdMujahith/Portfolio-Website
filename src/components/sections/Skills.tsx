"use client";

import React from "react";
import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { content } from "@/data/content";
import BackgroundFX from "@/components/ui/BackgroundFX";
import { fadeInUp, staggerContainer, springSnappy } from "@/lib/motion";

/* eslint-disable @next/next/no-img-element */
const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="w-full py-12 md:py-16 lg:py-20 relative z-10 transition-colors duration-300 overflow-hidden"
      aria-labelledby="skills-heading"
    >
      <BackgroundFX
        bloomColor="accent"
        bloomPosition="top-[20%] right-[-10%] w-[60%] h-[60%]"
        pattern="grid"
        textureOpacity="light"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-20">
        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-12 md:mb-16 lg:mb-20 text-left"
        >
          <p className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-[var(--text-muted)] mb-4 md:mb-6">
            {content.sections.skills.label}
          </p>
          <h2
            id="skills-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter leading-[1.1] text-[var(--text-primary)]"
          >
            {content.sections.skills.title}
          </h2>
        </motion.div>

        {/* ── Skills Grid ── */}
        <motion.ul
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer(0.05)}
          role="list"
        >
          {skills.map((skill) => (
            <motion.li
              key={skill.name}
              variants={fadeInUp}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={springSnappy}
            >
              <div
                className="group relative flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-[1.5rem] border border-[var(--border-strong)] bg-[var(--bg-elevated)] transition-colors duration-300 overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:border-[var(--text-muted)] hover:shadow-lg cursor-default"
              >
                {/* Subtle hover gradient flare */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Icon */}
                <div
                  className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full flex items-center justify-center border border-[var(--border-strong)] bg-[var(--bg-subtle)] transition-transform duration-500 ease-out group-hover:scale-110"
                  aria-hidden="true"
                >
                  {skill.logoUrl ? (
                    <img
                      src={skill.logoUrl}
                      alt={`${skill.name} logo`}
                      width={32}
                      height={32}
                      decoding="async"
                      className="w-6 h-6 md:w-8 md:h-8 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-[var(--border-strong)] rounded-full" />
                  )}
                </div>

                {/* Name */}
                <p
                  className="text-[14px] md:text-[16px] font-medium tracking-tight text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--text-primary)]"
                >
                  {skill.name}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Skills;
