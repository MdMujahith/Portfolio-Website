"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { ArrowUpRight, ChevronUp, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/professional";
import { content } from "@/data/content";
import BackgroundFX from "@/components/ui/BackgroundFX";

const premiumEase = [0.16, 1, 0.3, 1] as const;

type Project = (typeof projects)[number];

// ── Link card: real <a> everywhere a click results in navigation ──
const LinkCard = memo(function LinkCard({
  href,
  label,
  sub,
  icon,
}: {
  href: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-strong)" }}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px] font-semibold text-[var(--text-primary)]">{label}</span>
        <span className="text-[12px] text-[var(--text-muted)] group-hover/link:text-[var(--text-secondary)] transition-colors">
          {sub}
        </span>
      </div>
      {icon}
    </a>
  );
});

// ── Tech stack chips (shared desktop/mobile) ──
const TagList = memo(function TagList({ tags, full }: { tags: string[]; full?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {(full ? tags : tags.slice(0, 3)).map((tag) => (
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
  );
});

// ── Single project row, memoized so toggling one card doesn't re-render all ──
const ProjectRow = memo(function ProjectRow({
  project,
  index,
  isExpanded,
  isMobile,
  onToggle,
  registerRef,
}: {
  project: Project;
  index: number;
  isExpanded: boolean;
  isMobile: boolean;
  onToggle: (id: number) => void;
  registerRef: (id: number, el: HTMLElement | null) => void;
}) {
  const isEven = index % 2 === 0;
  const panelId = `project-panel-${project.id}`;

  return (
    <motion.article
      ref={(el) => registerRef(project.id, el)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: 0.05, ease: premiumEase }}
      className="relative py-10 md:py-14 border-t border-[var(--border-strong)] first:border-t-0"
    >
      <div
        className="relative rounded-2xl p-5 md:p-8"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-strong)" }}
      >
        <div
          className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
            !isEven ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Preview trigger — expands panel, doesn't navigate → <button>, not <a> */}
          <motion.div className="w-full lg:w-1/2 relative group" whileHover="hovered">
            <button
              type="button"
              onClick={() => onToggle(project.id)}
              aria-expanded={isExpanded}
              aria-controls={panelId}
              aria-label={`${isExpanded ? "Collapse" : "Expand"} details for ${project.title}`}
              className="block w-full text-left cursor-pointer"
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
                    loading={index === 0 ? undefined : "lazy"}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:bg-white/5" />
              </div>
            </button>

            <div
              className={`absolute -bottom-3 ${
                isEven ? "-right-3" : "-left-3"
              } w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-semibold tabular-nums shadow-sm transition-transform duration-500 group-hover:-translate-y-1 pointer-events-none`}
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
            <TagList tags={project.tags} />

            <div>
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1] mb-2.5"
                style={{ color: "var(--text-primary)" }}
              >
                {project.title}
              </h3>
              <p className="text-[14px] sm:text-[15px] leading-[1.6]" style={{ color: "var(--text-secondary)" }}>
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Toggles panel → button */}
              <button
                type="button"
                onClick={() => onToggle(project.id)}
                aria-expanded={isExpanded}
                aria-controls={panelId}
                className="group/btn inline-flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:opacity-80"
                style={
                  isExpanded
                    ? { background: "var(--bg-subtle)", color: "var(--text-primary)", border: "1px solid var(--border-strong)" }
                    : { background: "var(--text-primary)", color: "var(--bg)", border: "1px solid transparent" }
                }
              >
                {isExpanded ? (
                  <>Show Less <ChevronUp size={14} /></>
                ) : (
                  <>
                    Learn More
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </>
                )}
              </button>

              {/* Navigates externally → <a> */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-[var(--bg-subtle)]"
                style={{ background: "transparent", color: "var(--text-primary)", border: "1px solid var(--border-strong)" }}
              >
                <SiGithub size={14} /> Source
              </a>
            </div>
          </div>
        </div>

        {!isMobile && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                id={panelId}
                key="detail"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.5, ease: premiumEase }}
                style={{ overflow: "hidden" }}
              >
                <div className="p-6 md:p-8 rounded-xl" style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-strong)" }}>
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
                        <TagList tags={project.tags} full />
                      </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-3 border-t lg:border-t-0 lg:border-l border-[var(--border-strong)] pt-6 lg:pt-0 pl-0 lg:pl-8">
                      <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-1">
                        Project Links
                      </h4>
                      <LinkCard href={project.projectUrl} label="Live Project" sub="View production" icon={<ArrowUpRight size={18} className="text-[var(--text-muted)]" />} />
                      <LinkCard href={project.githubUrl} label="Source Code" sub="View repository" icon={<SiGithub size={16} className="text-[var(--text-muted)]" />} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.article>
  );
});

const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const projectRefs = useRef<Record<number, HTMLElement | null>>({});

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    const check = () => setIsMobile(mql.matches);
    check();
    mql.addEventListener("change", check);
    return () => mql.removeEventListener("change", check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobile && expandedId !== null ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [expandedId, isMobile]);

  useEffect(() => {
    if (expandedId === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setExpandedId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedId]);

  const registerRef = useCallback((id: number, el: HTMLElement | null) => {
    projectRefs.current[id] = el;
  }, []);

  const toggle = useCallback(
    (id: number) => {
      setExpandedId((current) => {
        const next = current === id ? null : id;
        if (next !== null && window.innerWidth >= 1024) {
          requestAnimationFrame(() => {
            setTimeout(() => {
              const el = projectRefs.current[next];
              if (!el) return;
              const y = el.getBoundingClientRect().top + window.scrollY - 40;
              window.scrollTo({ top: y, behavior: "smooth" });
            }, 100);
          });
        }
        return next;
      });
    },
    []
  );

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === expandedId),
    [expandedId]
  );

  return (
    <section
      id="projects"
      className="w-full py-12 md:py-20 relative z-10 overflow-hidden"
      style={{ background: "var(--bg)" }}
      aria-labelledby="projects-heading"
    >
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
          className="mb-6 md:mb-8"
        >
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 md:mb-4">
            03 // Selected Works
          </p>
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.08]"
            style={{ color: "var(--text-primary)" }}
          >
            {content.sections.projects.title}
          </h2>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            isExpanded={expandedId === project.id}
            isMobile={isMobile}
            onToggle={toggle}
            registerRef={registerRef}
          />
        ))}
      </div>

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
              aria-modal="true"
              aria-label={`${selectedProject.title} details`}
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
                  type="button"
                  onClick={() => setExpandedId(null)}
                  aria-label="Close details"
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
                  <TagList tags={selectedProject.tags} full />
                </div>
                <div className="flex flex-col gap-2 pb-6">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-1">Links</h4>
                  <LinkCard href={selectedProject.projectUrl} label="Live Project" sub="View deployed site" icon={<ArrowUpRight size={16} className="text-[var(--text-primary)]" />} />
                  <LinkCard href={selectedProject.githubUrl} label="Source Code" sub="GitHub repository" icon={<SiGithub size={14} className="text-[var(--text-primary)]" />} />
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