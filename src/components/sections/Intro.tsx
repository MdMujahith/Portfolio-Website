"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { content } from "@/data/content";
import BackgroundFX from "@/components/ui/BackgroundFX";

interface IntroProps {
  onContactClick: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const Intro: React.FC<IntroProps> = ({ onContactClick }) => {
  const { headline, headlineHighlight, headlineSuffix, description, cta } = content.intro;

  return (
    <section
      id="about"
      className="w-full py-20 sm:py-28 lg:py-36 relative z-10 overflow-hidden transition-colors duration-300 bg-[var(--bg)] font-sans"
      aria-labelledby="about-heading"
    >
      <BackgroundFX
        bloomColor="primary"
        bloomPosition="top-[10%] right-[-10%] w-[40%] h-[40%]"
        pattern="grid"
        textureOpacity="medium"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Apple & Google Tier Section Header */}
        <motion.div
          className="mb-14 sm:mb-18 lg:mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-sm sm:text-base font-medium tracking-wide text-[var(--text-muted)] mb-3">
            About
          </p>
          <h2 id="about-heading" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] max-w-3xl leading-[1.08]">
            Engineering systems that power the background.
          </h2>
        </motion.div>

        {/* REFINED ARCHITECTURAL BENTO GRID */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          
          {/* =========================================================
           * CARD 1: PRIMARY STATEMENT & NARRATIVE (8 Columns)
           * ========================================================= */}
          <div className="lg:col-span-8 p-8 sm:p-12 rounded-[2.25rem] bg-[var(--card-bg)] dark:bg-[#121215] border border-black/5 dark:border-white/[0.08] shadow-sm flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-black/15 dark:hover:border-white/[0.16]">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-[var(--text-primary)] leading-[1.3]">
                {headline} <span className="text-[var(--text-muted)] font-medium">{headlineHighlight}</span> {headlineSuffix}
              </h3>
              
              <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-6 leading-relaxed max-w-2xl font-normal">
                {description}
              </p>
            </div>

            <div className="mt-12 pt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for opportunities</span>
              </div>

              <button
                onClick={onContactClick}
                className="px-7 py-3 rounded-full font-medium text-sm sm:text-base bg-[var(--text-primary)] text-[var(--bg)] hover:opacity-90 active:scale-95 transition-all duration-200"
              >
                {cta}
              </button>
            </div>
          </div>

          {/* =========================================================
           * CARD 2: BASE OF OPERATIONS & PROTOCOL (4 Columns)
           * ========================================================= */}
          <div className="lg:col-span-4 p-8 sm:p-10 rounded-[2.25rem] bg-[var(--card-bg)] dark:bg-[#121215] border border-black/5 dark:border-white/[0.08] shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-black/15 dark:hover:border-white/[0.16]">
            <div>
              <span className="text-xs sm:text-sm font-semibold text-[var(--text-muted)] tracking-wider uppercase block">
                Base of Operations
              </span>
              <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mt-2">
                Tamil Nadu, India
              </h4>
              <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1 font-medium">
                UTC+05:30 · Asia/Kolkata
              </p>
            </div>

            <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-relaxed mt-10">
              Structured for asynchronous, remote-first execution across global engineering teams with consistent reliability.
            </p>
          </div>

          {/* =========================================================
           * CARD 3: SYSTEMS CAPENCE & TECH ARSENAL (6 Columns)
           * ========================================================= */}
          <div className="lg:col-span-6 p-8 sm:p-10 rounded-[2.25rem] bg-[var(--card-bg)] dark:bg-[#121215] border border-black/5 dark:border-white/[0.08] shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-black/15 dark:hover:border-white/[0.16]">
            <div>
              <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Systems & APIs
              </h4>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-3 leading-relaxed font-normal">
                Architecting resilient relational databases, reliable microservice pipelines, and backend server engines engineered for sustained high data throughput.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {[
                "Python (FastAPI & Django)",
                "C++ (Memory & Algorithms)",
                "PostgreSQL Tuning",
                "REST Architecture",
                "System Profiling"
              ].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-[var(--text-primary)]/[0.04] dark:bg-white/[0.05] border border-black/5 dark:border-white/[0.08] text-[var(--text-primary)] transition-colors hover:bg-[var(--text-primary)]/[0.08]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* =========================================================
           * CARD 4: PREDICTABLE COMPLEXITY & PHILOSOPHY (6 Columns)
           * ========================================================= */}
          <div className="lg:col-span-6 p-8 sm:p-10 rounded-[2.25rem] bg-[var(--card-bg)] dark:bg-[#121215] border border-black/5 dark:border-white/[0.08] shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-black/15 dark:hover:border-white/[0.16]">
            <div>
              <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Predictable Complexity
              </h4>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-3 leading-relaxed font-normal">
                Prioritizing operational simplicity and clean code architecture. Complexity is only introduced when performance benchmarks and scale dictate a clear engineering requirement.
              </p>
            </div>

            <div className="mt-10 pt-2 flex items-center justify-between">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2.5 text-sm sm:text-base font-semibold text-[var(--text-primary)] hover:opacity-75 transition-opacity"
              >
                <span>Examine project architecture</span>
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Intro;