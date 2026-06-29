"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUpRight, ChevronUp, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/professional";
import { content } from "@/data/content";
import BackgroundFX from "@/components/ui/BackgroundFX"; // <-- Imported BackgroundFX

const premiumEase = [0.16, 1, 0.3, 1] as const;

const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Changed ref to target the entire project article instead of just the details panel
  const projectRefs = useRef<Record<number, HTMLElement | null>>({});

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile && expandedId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [expandedId, isMobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggle = (id: number) => {
    const next = expandedId === id ? null : id;
    setExpandedId(next);
    
    // Smooth scroll to frame the ENTIRE project row perfectly
    if (next !== null && !isMobile) {
      setTimeout(() => {
        const yOffset = -40; // Leaves a perfect breathing gap at the top of the screen
        const element = projectRefs.current[next];
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  };

  const selectedProject = projects.find((p) => p.id === expandedId);

  return (
    <section
      id="projects"
      className="w-full py-12 md:py-20 relative z-10 overflow-hidden"
      style={{ background: "var(--bg)" }}
      aria-labelledby="projects-heading"
    >
      {/* ── AMBIENT LIGHTING & TEXTURE ── */}
      <BackgroundFX 
        bloomColor="primary" 
        bloomPosition="top-[20%] left-1/2 -translate-x-1/2 w-[80%] h-[40%]"
        pattern="grid"
        textureOpacity="light"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: premiumEase }}
          // TIGHTENED gap between header and projects
          className="mb-6 md:mb-8"
        >
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 md:mb-4">
            03 // Selected Works
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
            <h2
              id="projects-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.08]"
              style={{ color: "var(--text-primary)" }}
            >
              {content.sections.projects.title}
            </h2>
            {/* Removed the description paragraph here */}
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          const isExpanded = expandedId === project.id;

          return (
            <motion.article
              // Added ref here to anchor the scroll to the top of the project
              ref={(el) => { projectRefs.current[project.id] = el; }}
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.05, ease: premiumEase }}
              className="relative py-10 md:py-14 border-t border-[var(--border-strong)] first:border-t-0 transition-colors duration-700"
            >
              <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                
                <motion.div
                  className="w-full lg:w-1/2 relative group cursor-pointer"
                  onClick={() => toggle(project.id)}
                  whileHover="hovered"
                >
                  <div
                    className="relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_16px_40px_rgb(0,0,0,0.08)] transition-all duration-700"
                    style={{
                      borderRadius: "1rem",
                      aspectRatio: "16/10",
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--border-strong)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      variants={{ hovered: { scale: 1.05 } }}
                      transition={{ duration: 0.7, ease: premiumEase }}
                    >
                      <Image
                        src={project.imageUrl}
                        alt={`Screenshot of ${project.title}`}
                        fill
                        priority={index === 0}
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:bg-white/5" />
                  </div>

                  <div
                    className={`absolute -bottom-3 ${isEven ? '-right-3' : '-left-3'} w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-semibold tabular-nums shadow-sm transition-transform duration-500 group-hover:-translate-y-1`}
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-strong)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </motion.div>

                <div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-5">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-md"
                        style={{
                          background: "var(--bg-subtle)",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border-strong)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div>
                    <h3
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1] mb-2.5"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-[14px] sm:text-[15px] leading-[1.6]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      onClick={() => toggle(project.id)}
                      className="group/btn inline-flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:opacity-80"
                      style={
                        isExpanded && !isMobile
                          ? {
                              background: "var(--bg-subtle)",
                              color: "var(--text-primary)",
                              border: "1px solid var(--border-strong)",
                            }
                          : {
                              background: "var(--text-primary)",
                              color: "var(--bg)",
                              border: "1px solid transparent",
                            }
                      }
                    >
                      {isExpanded && !isMobile ? (
                        <>Show Less <ChevronUp size={14} className="transition-transform duration-300" /></>
                      ) : (
                        <>
                          Learn More
                          <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                          />
                        </>
                      )}
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-[var(--bg-subtle)]"
                      style={{
                        background: "transparent",
                        color: "var(--text-primary)",
                        border: "1px solid var(--border-strong)",
                      }}
                    >
                      <SiGithub size={14} /> Source
                    </a>
                  </div>
                </div>
              </div>

              {/* ── DESKTOP EXPANION PANEL ── */}
              {!isMobile && (
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.5, ease: premiumEase }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="p-6 md:p-8 rounded-xl"
                        style={{
                          background: "var(--bg-subtle)",
                          border: "1px solid var(--border-strong)",
                        }}
                      >
                        <div className="grid grid-cols-12 gap-8">
                          
                          <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                            <div className="flex flex-col gap-3">
                              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                                Concept & Architecture
                              </h4>
                              <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                                {project.longDescription}
                              </p>
                            </div>

                            <div className="flex flex-col gap-3">
                              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                                Technology Stack
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag: string) => (
                                  <span
                                    key={tag}
                                    className="text-[12px] font-medium px-3 py-1.5 rounded-lg"
                                    style={{
                                      background: "var(--bg)",
                                      color: "var(--text-primary)",
                                      border: "1px solid var(--border-strong)",
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3 border-t lg:border-t-0 lg:border-l border-[var(--border-strong)] pt-6 lg:pt-0 pl-0 lg:pl-8">
                            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-1">
                              Project Links
                            </h4>

                            <a
                              href={project.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                              style={{
                                background: "var(--bg-elevated)",
                                border: "1px solid var(--border-strong)",
                              }}
                            >
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[14px] font-semibold text-[var(--text-primary)]">
                                  Live Project
                                </span>
                                <span className="text-[12px] text-[var(--text-muted)] group-hover/link:text-[var(--text-secondary)] transition-colors">
                                  View production
                                </span>
                              </div>
                              <ArrowUpRight size={18} className="text-[var(--text-muted)] group-hover/link:text-[var(--text-primary)] transition-colors duration-300" />
                            </a>

                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                              style={{
                                background: "var(--bg-elevated)",
                                border: "1px solid var(--border-strong)",
                              }}
                            >
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[14px] font-semibold text-[var(--text-primary)]">
                                  Source Code
                                </span>
                                <span className="text-[12px] text-[var(--text-muted)] group-hover/link:text-[var(--text-secondary)] transition-colors">
                                  View repository
                                </span>
                              </div>
                              <SiGithub size={16} className="text-[var(--text-muted)] group-hover/link:text-[var(--text-primary)] transition-colors duration-300" />
                            </a>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.article>
          );
        })}
      </div>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {isMobile && expandedId !== null && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 backdrop-blur-md"
              style={{ background: "rgba(0,0,0,0.6)" }}
              onClick={() => setExpandedId(null)}
              aria-hidden="true"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: premiumEase }}
              className="fixed bottom-0 left-0 right-0 z-50 flex flex-col shadow-[0_-20px_40px_rgba(0,0,0,0.15)]"
              style={{
                background: "var(--bg-elevated)",
                borderRadius: "1.5rem 1.5rem 0 0",
                borderTop: "1px solid var(--border-strong)",
                maxHeight: "85dvh",
              }}
              role="dialog"
            >
              <div className="flex justify-center pt-3 pb-2 shrink-0">
                <div className="w-12 h-1.5 rounded-full bg-[var(--border-strong)]" />
              </div>

              <div className="flex items-center justify-between px-5 pb-3 shrink-0 border-b border-[var(--border-strong)]">
                <div className="flex flex-col gap-0.5 mt-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Project details
                  </p>
                  <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setExpandedId(null)}
                  className="p-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-subtle)] text-[var(--text-primary)] transition-transform active:scale-95"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6" style={{ scrollbarWidth: "none" }}>
                <div className="flex flex-col gap-2">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">About</h4>
                  <p className="text-[14px] leading-[1.7] text-[var(--text-secondary)]">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[12px] font-medium px-3 py-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-subtle)] text-[var(--text-primary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 pb-6">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-1">Links</h4>
                  <a
                    href={selectedProject.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg)] active:scale-[0.98] transition-transform"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-semibold text-[var(--text-primary)]">Live Project</span>
                      <span className="text-[11px] text-[var(--text-muted)]">View deployed site</span>
                    </div>
                    <ArrowUpRight size={16} className="text-[var(--text-primary)]" />
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg)] active:scale-[0.98] transition-transform"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-semibold text-[var(--text-primary)]">Source Code</span>
                      <span className="text-[11px] text-[var(--text-muted)]">GitHub repository</span>
                    </div>
                    <SiGithub size={14} className="text-[var(--text-primary)]" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;