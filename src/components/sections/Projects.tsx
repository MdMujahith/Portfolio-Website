// components/Projects.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUpRight, ChevronUp, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/professional";
import { content } from "@/data/content";

const spring = [0.16, 1, 0.3, 1] as const;

const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const expandRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll lock for mobile drawer
  useEffect(() => {
    if (isMobile && expandedId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [expandedId, isMobile]);

  // Escape key
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
    if (next !== null && !isMobile) {
      setTimeout(() => {
        expandRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 120);
    }
  };

  const selectedProject = projects.find((p) => p.id === expandedId);

  return (
    <section
      id="projects"
      className="w-full pt-16 pb-24 md:pt-24 md:pb-36 relative z-10"
      aria-labelledby="projects-heading"
    >
      {/* ── HEADER ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: spring }}
          className="mb-20 md:mb-28"
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.3em] mb-5"
            style={{ color: "var(--text-muted)" }}
          >
            03 // Selected Works
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
            <h2
              id="projects-heading"
              className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] leading-[0.95]"
              style={{ color: "var(--text-primary)" }}
            >
              {content.sections.projects.title}
            </h2>
            <p
              className="max-w-sm text-[15px] md:text-[16px] leading-relaxed md:pb-2 shrink-0"
              style={{ color: "var(--text-secondary)" }}
            >
              {content.sections.projects.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── PROJECT ROWS ────────────────────────────── */}
      <div>
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          const isExpanded = expandedId === project.id;

          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.05, ease: spring }}
              role="listitem"
              className="relative transition-colors duration-500"
              style={{
                borderTop: "1px solid var(--border)",
                background: isExpanded && !isMobile ? "var(--bg-elevated)" : "transparent",
              }}
            >
              {/* ── Main Row ── */}
              <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-14 md:py-20">
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center ${
                    !isEven ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* Image */}
                  <motion.div
                    className="relative"
                    style={{ direction: "ltr" }}
                    whileHover="hovered"
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{
                        borderRadius: "1.5rem",
                        aspectRatio: "4 / 3",
                        background: "var(--bg-subtle)",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        variants={{ hovered: { scale: 1.04 } }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </motion.div>
                    </div>

                    {/* Index badge */}
                    <div
                      className="absolute -bottom-3 -right-3 w-11 h-11 rounded-full flex items-center justify-center text-[10px] font-semibold tabular-nums border"
                      style={{
                        background: "var(--bg)",
                        borderColor: "var(--border)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div style={{ direction: "ltr" }} className="flex flex-col gap-5">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-md border"
                          style={{
                            background: "var(--bg-subtle)",
                            color: "var(--text-secondary)",
                            borderColor: "var(--border)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3
                      className="text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold tracking-[-0.025em] leading-[1.1]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {project.title}
                    </h3>

                    <p
                      className="text-[15px] md:text-[16px] leading-[1.75]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        onClick={() => toggle(project.id)}
                        className="group/btn inline-flex items-center gap-2 text-[14px] font-semibold px-6 py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        style={
                          isExpanded
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
                          <>Show Less <ChevronUp size={14} /></>
                        ) : (
                          <>
                            Learn More
                            <ArrowUpRight
                              size={14}
                              className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            />
                          </>
                        )}
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[14px] font-medium px-6 py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border"
                        style={{
                          background: "transparent",
                          color: "var(--text-primary)",
                          borderColor: "var(--border-strong)",
                        }}
                      >
                        <SiGithub size={14} /> Source
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── DESKTOP: Inline Expand Panel ── */}
              {!isMobile && (
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      ref={(el) => { expandRefs.current[project.id] = el; }}
                      key="detail"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45, ease: spring }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 pb-16"
                        style={{ borderTop: "1px solid var(--border)" }}
                      >
                        <div className="grid grid-cols-2 gap-16 lg:gap-24 pt-12">

                          {/* Left: About + Stack */}
                          <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-4">
                              <h4
                                className="text-[13px] font-semibold uppercase tracking-[0.2em]"
                                style={{ color: "var(--text-muted)" }}
                              >
                                About
                              </h4>
                              <p
                                className="text-[16px] leading-[1.8]"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                {project.longDescription}
                              </p>
                            </div>

                            <div className="flex flex-col gap-4">
                              <h4
                                className="text-[13px] font-semibold uppercase tracking-[0.2em]"
                                style={{ color: "var(--text-muted)" }}
                              >
                                Stack
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag: string) => (
                                  <span
                                    key={tag}
                                    className="text-[12px] font-semibold uppercase tracking-wider px-3.5 py-2 rounded-lg border"
                                    style={{
                                      background: "var(--bg-subtle)",
                                      color: "var(--text-secondary)",
                                      borderColor: "var(--border)",
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right: Links */}
                          <div className="flex flex-col gap-4">
                            <h4
                              className="text-[13px] font-semibold uppercase tracking-[0.2em]"
                              style={{ color: "var(--text-muted)" }}
                            >
                              Links
                            </h4>

                            <a
                              href={project.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link flex items-center justify-between px-6 py-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5"
                              style={{
                                background: "var(--bg)",
                                borderColor: "var(--border)",
                              }}
                            >
                              <div className="flex flex-col gap-1">
                                <span
                                  className="text-[16px] font-semibold"
                                  style={{ color: "var(--text-primary)" }}
                                >
                                  Live Project
                                </span>
                                <span
                                  className="text-[13px]"
                                  style={{ color: "var(--text-muted)" }}
                                >
                                  View deployed site
                                </span>
                              </div>
                              <ArrowUpRight
                                size={20}
                                className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                style={{ color: "var(--text-muted)" }}
                              />
                            </a>

                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link flex items-center justify-between px-6 py-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5"
                              style={{
                                background: "var(--bg)",
                                borderColor: "var(--border)",
                              }}
                            >
                              <div className="flex flex-col gap-1">
                                <span
                                  className="text-[16px] font-semibold"
                                  style={{ color: "var(--text-primary)" }}
                                >
                                  Source Code
                                </span>
                                <span
                                  className="text-[13px]"
                                  style={{ color: "var(--text-muted)" }}
                                >
                                  GitHub repository
                                </span>
                              </div>
                              <SiGithub size={18} style={{ color: "var(--text-muted)" }} />
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

        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>

      {/* ── MOBILE: Bottom Drawer ─────────────────────── */}
      <AnimatePresence>
        {isMobile && expandedId !== null && selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 backdrop-blur-sm"
              style={{ background: "rgba(0,0,0,0.5)" }}
              onClick={() => setExpandedId(null)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: spring }}
              className="fixed bottom-0 left-0 right-0 z-50 flex flex-col"
              style={{
                background: "var(--bg-elevated)",
                borderRadius: "2rem 2rem 0 0",
                border: "1px solid var(--border-strong)",
                borderBottom: "none",
                maxHeight: "88dvh",
              }}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedProject.title} details`}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-4 pb-2 shrink-0">
                <div
                  className="w-10 h-1 rounded-full"
                  style={{ background: "var(--border-strong)" }}
                />
              </div>

              {/* Header */}
              <div
                className="flex items-center justify-between px-6 pt-2 pb-5 shrink-0"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex flex-col gap-1">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {String(projects.findIndex(p => p.id === expandedId) + 1).padStart(2, "0")} / Project
                  </p>
                  <h3
                    className="text-[22px] font-semibold tracking-tight leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setExpandedId(null)}
                  className="p-2.5 rounded-full border shrink-0 transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "var(--bg-subtle)",
                    borderColor: "var(--border-strong)",
                    color: "var(--text-primary)",
                  }}
                  aria-label="Close"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>

              {/* Scrollable body */}
              <div
                className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-8"
                style={{ scrollbarWidth: "none" }}
              >
                {/* About */}
                <div className="flex flex-col gap-3">
                  <h4
                    className="text-[13px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    About
                  </h4>
                  <p
                    className="text-[15px] leading-[1.8]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Stack */}
                <div className="flex flex-col gap-3">
                  <h4
                    className="text-[13px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[12px] font-semibold uppercase tracking-wider px-3.5 py-2 rounded-lg border"
                        style={{
                          background: "var(--bg-subtle)",
                          color: "var(--text-secondary)",
                          borderColor: "var(--border)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-3">
                  <h4
                    className="text-[13px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Links
                  </h4>

                  <a
                    href={selectedProject.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-5 py-4 rounded-2xl border"
                    style={{
                      background: "var(--bg)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>
                        Live Project
                      </span>
                      <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                        View deployed site
                      </span>
                    </div>
                    <ArrowUpRight size={18} style={{ color: "var(--text-muted)" }} />
                  </a>

                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-5 py-4 rounded-2xl border"
                    style={{
                      background: "var(--bg)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>
                        Source Code
                      </span>
                      <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                        GitHub repository
                      </span>
                    </div>
                    <SiGithub size={16} style={{ color: "var(--text-muted)" }} />
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