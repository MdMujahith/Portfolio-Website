"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { experience } from "@/data/professional";
import { content } from "@/data/content";
import BackgroundFX from "@/components/ui/BackgroundFX"; 

interface ExperienceItem {
  id: number | string;
  company: string;
  role: string;
  tenure: string;
  description: string;
  tags?: string[];
}

// Premium easing curve matching the rest of the site
const premiumEase = [0.16, 1, 0.3, 1] as const;

const Experience: React.FC = () => {
  const [activeId, setActiveId] = useState<number | string | null>(null);

  return (
    <section
      id="experience"
      /* Perfectly matched responsive spacing */
      className="w-full pt-12 pb-20 md:pt-20 md:pb-32 lg:pt-24 lg:pb-40 transition-colors duration-300 relative z-10 overflow-hidden"
      style={{ background: "var(--bg)" }}
      aria-labelledby="experience-heading"
    >
      {/* ── AMBIENT LIGHTING (No Grid) ── */}
      {/* Vertical light bloom on the left to highlight the timeline numbers, pattern turned off */}
      <BackgroundFX 
        bloomColor="primary" 
        bloomPosition="top-1/2 left-[-5%] -translate-y-1/2 w-[40%] h-[80%]"
        pattern="none"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">

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
            04 // Professional Timeline
          </p>
          <h2
            id="experience-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter leading-[1.1]"
            style={{ color: "var(--text-primary)" }}
          >
            {content.sections.experience.title}
          </h2>
        </motion.div>

        {/* =======================================
          * ACCORDION LIST
          * ======================================= */}
        <motion.div
          role="list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ 
            hidden: {}, 
            visible: { transition: { staggerChildren: 0.1, ease: premiumEase } } 
          }}
          className="w-full"
        >
          {(experience as ExperienceItem[]).map((exp, index) => {
            const isActive = activeId === exp.id;

            return (
              <motion.article
                key={exp.id}
                role="listitem"
                variants={{
                  hidden:  { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEase } },
                }}
                className="group border-t transition-colors duration-300 hover:bg-[var(--bg-subtle)]"
                style={{ borderColor: "var(--border)" }}
              >
                <button
                  className="w-full text-left py-6 md:py-8 px-4 sm:px-6 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  onClick={() => setActiveId(isActive ? null : exp.id)}
                  aria-expanded={isActive}
                  aria-label={`${exp.company} — ${exp.role}`}
                >
                  {/* Row Container */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-8">
                    
                    {/* Left: Index & Company */}
                    <div className="flex items-start gap-4 sm:gap-8 lg:gap-12 flex-grow">
                      <span className="text-[12px] font-semibold tabular-nums mt-1.5 md:mt-2 select-none" style={{ color: "var(--text-muted)" }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      
                      <div className="flex flex-col overflow-hidden">
                        <span
                          className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight transition-all duration-500 ease-out"
                          style={{
                            color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                            transform: isActive ? "translateX(8px)" : "translateX(0)",
                          }}
                        >
                          {exp.company}
                        </span>

                        {/* Expandable Content */}
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              key="expanded"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: premiumEase }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 pb-2">
                                <p className="text-[15px] sm:text-[16px] leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                                  {exp.description}
                                </p>

                                {exp.tags && exp.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-5">
                                    {exp.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="text-[10px] md:text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border transition-colors"
                                        style={{
                                          background: "var(--bg)",
                                          color: "var(--text-muted)",
                                          borderColor: "var(--border)",
                                        }}
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Right: Role, Tenure & Icon */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-1 shrink-0 ml-8 sm:ml-0">
                      <div className="flex flex-col sm:items-end">
                        <span className="text-[14px] sm:text-[15px] font-medium" style={{ color: "var(--text-primary)" }}>
                          {exp.role}
                        </span>
                        <span className="text-[12px] sm:text-[13px]" style={{ color: "var(--text-muted)" }}>
                          {exp.tenure}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: premiumEase }}
                        className="hidden sm:block mt-2 transition-colors duration-300"
                        style={{ color: isActive ? "var(--text-primary)" : "var(--text-muted)" }}
                      >
                        <ArrowUpRight size={20} className="group-hover:text-[var(--text-primary)]" />
                      </motion.div>
                    </div>

                  </div>
                </button>
              </motion.article>
            );
          })}
          
          {/* Final Bottom Border */}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </motion.div>

      </div>
    </section>
  );
};

export default Experience;