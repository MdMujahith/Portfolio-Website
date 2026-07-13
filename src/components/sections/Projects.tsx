"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, ChevronUp, X, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, PanInfo } from "framer-motion";
import { projects } from "@/data/professional";
import { content } from "@/data/content";
import BackgroundFX from "@/components/ui/BackgroundFX";

const premiumEase = [0.16, 1, 0.3, 1] as const;

type Project = (typeof projects)[number];

const CORNER_BRACKETS = [
  { pos: "top-3 left-3", style: { borderTop: "1.5px solid rgba(255,255,255,0.8)", borderLeft: "1.5px solid rgba(255,255,255,0.8)" }, delay: "0ms" },
  { pos: "top-3 right-3", style: { borderTop: "1.5px solid rgba(255,255,255,0.8)", borderRight: "1.5px solid rgba(255,255,255,0.8)" }, delay: "30ms" },
  { pos: "bottom-3 left-3", style: { borderBottom: "1.5px solid rgba(255,255,255,0.8)", borderLeft: "1.5px solid rgba(255,255,255,0.8)" }, delay: "60ms" },
  { pos: "bottom-3 right-3", style: { borderBottom: "1.5px solid rgba(255,255,255,0.8)", borderRight: "1.5px solid rgba(255,255,255,0.8)" }, delay: "90ms" },
] as const;

// ── Link Card ──
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
      className="group/link flex items-center justify-between p-4 rounded-xl transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-md"
      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-strong)" }}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px] font-semibold text-[var(--text-primary)]">{label}</span>
        <span className="text-[12px] text-[var(--text-muted)] group-hover/link:text-[var(--text-secondary)] transition-colors duration-300">
          {sub}
        </span>
      </div>
      <div className="transition-transform duration-500 group-hover/link:scale-110 group-hover/link:rotate-3">
        {icon}
      </div>
    </a>
  );
});

// ── Tag Chips ──
const TagList = memo(function TagList({ tags, full }: { tags: string[]; full?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {(full ? tags : tags.slice(0, 3)).map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-md transition-colors duration-300 hover:text-[var(--text-primary)]"
          style={{
            background: "var(--bg-subtle)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border-strong)",
          }}
        >
          <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "var(--text-muted)" }} />
          {tag}
        </span>
      ))}
      {!full && tags.length > 3 && (
        <span className="text-[10px] font-semibold text-[var(--text-muted)] px-1">
          +{tags.length - 3}
        </span>
      )}
    </div>
  );
});

// ── Project Row ──
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
  const isFeatured = index === 0;
  const panelId = `project-panel-${project.id}`;
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      ref={(el) => registerRef(project.id, el)}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, ease: premiumEase }}
      className="relative py-10 md:py-14 border-t border-[var(--border-strong)] first:border-t-0 transition-opacity duration-500 hover:!opacity-100 group-hover/list:opacity-40"
    >
      <div
        className="relative rounded-2xl p-5 md:p-8 overflow-hidden transition-colors duration-500"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-strong)" }}
      >
        <span
          aria-hidden="true"
          className="hidden lg:block absolute top-4 right-6 text-[120px] font-bold leading-none pointer-events-none select-none"
          style={{ color: "var(--text-primary)", opacity: 0.045 }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {isFeatured && (
          <div
            className="inline-flex items-center gap-1.5 mb-5 text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full relative z-10"
            style={{ background: "var(--text-primary)", color: "var(--bg)" }}
          >
            <Sparkles size={11} />
            Featured Build
          </div>
        )}

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 relative group">
            <button
              type="button"
              onClick={() => onToggle(project.id)}
              aria-expanded={isExpanded}
              aria-controls={panelId}
              aria-label={`${isExpanded ? "Collapse" : "Expand"} details for ${project.title}`}
              className="block w-full text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)] rounded-[1rem]"
            >
              <div
                className="relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_50px_rgb(0,0,0,0.16)] transition-shadow duration-700"
                style={{
                  borderRadius: "1rem",
                  aspectRatio: "16/10",
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border-strong)",
                }}
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                  <Image
                    src={project.imageUrl}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-[13px] font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {isExpanded ? "Hide details" : "View details"}
                  <ArrowUpRight size={14} />
                </div>

                {CORNER_BRACKETS.map(({ pos, style, delay }) => (
                  <span
                    key={pos}
                    aria-hidden="true"
                    className={`absolute ${pos} w-4 h-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    style={{ ...style, transitionDelay: delay }}
                  />
                ))}
              </div>
            </button>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-5">
            <div className="flex items-center gap-3">
              <span
                className="text-[11px] font-bold tabular-nums px-2 py-0.5 rounded-md"
                style={{ background: "var(--bg-subtle)", color: "var(--text-muted)", border: "1px solid var(--border-strong)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <TagList tags={project.tags} />
            </div>

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
              <button
                type="button"
                onClick={() => onToggle(project.id)}
                aria-expanded={isExpanded}
                aria-controls={panelId}
                className="group/btn inline-flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-full transition-all duration-500 hover:opacity-80 active:scale-95"
                style={
                  isExpanded
                    ? { background: "var(--bg-subtle)", color: "var(--text-primary)", border: "1px solid var(--border-strong)" }
                    : { background: "var(--text-primary)", color: "var(--bg)", border: "1px solid transparent" }
                }
              >
                {isExpanded ? (
                  <>Show Less <ChevronUp size={14} className="transition-transform duration-300" /></>
                ) : (
                  <>
                    Learn More
                    <ArrowUpRight size={14} className="transition-transform duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </>
                )}
              </button>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-full transition-all duration-500 hover:bg-[var(--bg-subtle)] active:scale-95"
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
                initial={reduceMotion ? false : { opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.45, ease: premiumEase }}
                style={{ overflow: "hidden" }}
                className="relative z-10"
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
                      <LinkCard href={project.projectUrl} label="Live Project" sub="View production" icon={<ArrowUpRight size={18} className="text-[var(--text-muted)] transition-colors duration-300 group-hover/link:text-[var(--text-primary)]" />} />
                      <LinkCard href={project.githubUrl} label="Source Code" sub="View repository" icon={<SiGithub size={16} className="text-[var(--text-muted)] transition-colors duration-300 group-hover/link:text-[var(--text-primary)]" />} />
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

// ── Mobile Drawer (portaled to document.body) ──
const MobileDrawer = memo(function MobileDrawer({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.y > 120 || info.velocity.y > 600) onClose();
    },
    [onClose]
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] backdrop-blur-sm"
        style={{ background: "rgba(0,0,0,0.55)" }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={handleDragEnd}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.4, ease: premiumEase }}
        className="fixed bottom-0 left-0 right-0 z-[101] flex flex-col shadow-[0_-20px_40px_rgba(0,0,0,0.15)] touch-none"
        style={{
          background: "var(--bg-elevated)",
          borderRadius: "1.5rem 1.5rem 0 0",
          borderTop: "1px solid var(--border-strong)",
          maxHeight: "85dvh",
          willChange: "transform",
        }}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
      >
        <div className="flex justify-center pt-3 pb-2 shrink-0 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 rounded-full bg-[var(--border-strong)]" />
        </div>

        <div className="flex items-center gap-3 px-5 pb-4 shrink-0 border-b border-[var(--border-strong)]">
          <div
            className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0"
            style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-strong)" }}
          >
            <Image src={project.imageUrl} alt="" fill className="object-cover" sizes="56px" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Project details
            </p>
            <h3 className="text-lg font-bold tracking-tight text-[var(--text-primary)] truncate">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="ml-auto p-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-subtle)] text-[var(--text-primary)] transition-transform duration-300 active:scale-95 hover:bg-[var(--border-strong)] shrink-0"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto overscroll-contain touch-pan-y px-5 py-5 flex flex-col gap-6"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex flex-col gap-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">About</h4>
            <p className="text-[14px] leading-[1.7] text-[var(--text-secondary)]">{project.longDescription}</p>
          </div>
          <div className="flex flex-col gap-2 pb-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Stack</h4>
            <TagList tags={project.tags} full />
          </div>
        </div>

        <div
          className="shrink-0 flex items-center gap-3 px-5 py-4 border-t"
          style={{
            borderColor: "var(--border-strong)",
            background: "var(--bg-elevated)",
            paddingBottom: "calc(1rem + env(safe-area-inset-bottom))",
          }}
        >
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 text-[13px] font-semibold px-4 py-3 rounded-full active:scale-95 transition-transform duration-300"
            style={{ background: "var(--text-primary)", color: "var(--bg)" }}
          >
            Live Project <ArrowUpRight size={14} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-[13px] font-semibold px-4 py-3 rounded-full active:scale-95 transition-transform duration-300"
            style={{ background: "var(--bg-subtle)", color: "var(--text-primary)", border: "1px solid var(--border-strong)" }}
          >
            <SiGithub size={14} /> Source
          </a>
        </div>
      </motion.div>
    </>
  );
});

const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const projectRefs = useRef<Record<number, HTMLElement | null>>({});
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia("(max-width: 1023px)");
    const check = () => setIsMobile(mql.matches);
    check();
    mql.addEventListener("change", check);
    return () => mql.removeEventListener("change", check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobile && expandedId !== null ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
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

  const toggle = useCallback((id: number) => {
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
  }, []);

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
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
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
          </div>
          <span
            className="text-[12px] font-medium tracking-wide pb-1 shrink-0"
            style={{ color: "var(--text-muted)" }}
          >
            {String(projects.length).padStart(2, "0")} projects shipped
          </span>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 group/list">
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

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMobile && expandedId !== null && selectedProject && (
              <MobileDrawer project={selectedProject} onClose={() => setExpandedId(null)} />
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

export default Projects;