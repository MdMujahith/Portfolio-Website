"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { experience } from "@/data/professional";
import { content } from "@/data/content";

interface ExperienceItem {
  id: number | string;
  company: string;
  role: string;
  tenure: string;
  description: string;
  tags?: string[];
}

const Experience: React.FC = () => {
  const [activeId, setActiveId] = useState<number | string | null>(null);

  return (
    <section
      id="experience"
      className="w-full py-24 transition-colors duration-300"
      style={{ background: "var(--bg)" }}
      aria-labelledby="experience-heading"
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <motion.h2
          id="experience-heading"
          className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-center animate-gradient-text mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {content.sections.experience.title}
        </motion.h2>

        {/* Accordion List */}
        <motion.div
          role="list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {(experience as ExperienceItem[]).map((exp, index) => {
            const isActive = activeId === exp.id;

            return (
              <motion.article
                key={exp.id}
                role="listitem"
                variants={{
                  hidden:  { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
              >
                <button
                  className="w-full text-left"
                  onClick={() => setActiveId(isActive ? null : exp.id)}
                  aria-expanded={isActive}
                  aria-label={`${exp.company} — ${exp.role}`}
                >
                  <div
                    className="grid items-start gap-6 sm:gap-10 py-7 transition-all duration-300"
                    style={{
                      gridTemplateColumns: "2.5rem 1fr auto",
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    {/* Index */}
                    <span
                      className="text-xs font-semibold tabular-nums pt-1 select-none"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Center: company + expandable */}
                    <div className="overflow-hidden">
                      <span
                        className="block text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-none transition-all duration-300"
                        style={{
                          color:     isActive ? "var(--accent)" : "var(--text-primary)",
                          transform: isActive ? "translateX(6px)" : "translateX(0)",
                        }}
                      >
                        {exp.company}
                      </span>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key="expanded"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden"
                          >
                            <p
                              className="text-sm sm:text-base leading-relaxed mt-4"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {exp.description}
                            </p>

                            {exp.tags && exp.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {exp.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md font-mono"
                                    style={{
                                      background:  "var(--bg-subtle)",
                                      color:       "var(--text-muted)",
                                      border:      "1px solid var(--border)",
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right: role + tenure + arrow */}
                    <div className="text-right shrink-0 flex flex-col items-end gap-1">
                      <span
                        className="text-xs sm:text-sm font-semibold"
                        style={{ color: "var(--accent-text)" }}
                      >
                        {exp.role}
                      </span>
                      <span
                        className="text-[11px] sm:text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {exp.tenure}
                      </span>
                      <motion.div
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="mt-1"
                        style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
                      >
                        <ArrowUpRight size={18} />
                      </motion.div>
                    </div>

                  </div>
                </button>

                {/* Bottom border on last item */}
                {index === experience.length - 1 && (
                  <div style={{ borderTop: "1px solid var(--border)" }} />
                )}
              </motion.article>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Experience;