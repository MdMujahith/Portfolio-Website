"use client";

import React, { useState, useRef, useCallback, memo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ChevronRight } from "lucide-react";
import { experience, type Experience } from "@/data/experience";
import { content } from "@/data/content";
import BackgroundFX from "@/components/ui/BackgroundFX";
import { springSmooth, springSnappy, fadeInUp } from "@/lib/motion";

// Single source of truth for the rail column
const RAIL_COL = "w-8 md:w-16";
const RAIL_CENTER = "left-4 md:left-8";

// ── Magnetic Node ──
const MagneticNode = memo(function MagneticNode({
  isActive,
  isMobile,
  reduceMotion,
}: {
  isActive: boolean;
  isMobile: boolean;
  reduceMotion: boolean;
}) {
  const hitRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 140, damping: 18, mass: 0.15 });
  const springY = useSpring(y, { stiffness: 140, damping: 18, mass: 0.15 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !hitRef.current) return;
    const { height, width, left, top } = hitRef.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * 0.3);
    y.set((e.clientY - (top + height / 2)) * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={hitRef}
      onMouseMove={isMobile ? undefined : handleMouse}
      onMouseLeave={isMobile ? undefined : reset}
      className="relative w-8 h-8 flex items-center justify-center cursor-pointer shrink-0"
    >
      {!reduceMotion && (
        <AnimatePresence>
          {isActive && (
            <motion.div
              key="pulse"
              className="absolute w-3 h-3 rounded-full pointer-events-none"
              style={{ border: "1px solid var(--text-primary)" }}
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      )}

      <motion.div style={{ x: springX, y: springY }}>
        <motion.div
          animate={{
            scale: isActive ? 1.2 : 1,
            background: isActive ? "var(--text-primary)" : "var(--bg-subtle)",
            borderColor: isActive
              ? "var(--text-primary)"
              : "var(--border-strong)",
            boxShadow: isActive
              ? "0 0 4px 1px rgba(255,255,255,0.7), 0 0 20px 5px rgba(255,255,255,0.45)"
              : "0 1px 2px rgba(0,0,0,0.15)",
          }}
          transition={springSmooth}
          className="w-3 h-3 rounded-full border-2"
        />
      </motion.div>
    </div>
  );
});

// ── Tag Component ──
const TagList = memo(function TagList({
  tags,
  reduceMotion,
}: {
  tags: string[];
  reduceMotion?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-6 relative z-20">
      {tags.map((tag, i) => (
        <motion.span
          key={tag}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion ? { duration: 0 } : { ...springSnappy, delay: 0.03 * i }
          }
          className="text-xs rounded-full bg-black/5 dark:bg-white/10 px-3 py-1 font-medium text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)] cursor-default"
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
});

// ── Experience Row ──
const ExperienceRow = memo(function ExperienceRow({
  exp,
  index,
  isActive,
  onToggle,
  isMobile,
}: {
  exp: Experience;
  index: number;
  isActive: boolean;
  onToggle: (id: string) => void;
  isMobile: boolean;
}) {
  const panelId = `experience-panel-${exp.id}`;
  const reduceMotion = !!useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY],
  );

  const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.04), transparent 50%)`;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { ...springSmooth, delay: Math.min(index * 0.08, 0.3) }
      }
      className="relative flex gap-4 md:gap-8 py-3 md:py-4 transition-all duration-500 hover:!opacity-100 hover:-translate-y-1 group/item group-hover/list:opacity-40"
    >
      {/* Rail column — perfectly aligned with the inner padding of the card */}
      <div
        className={`relative flex flex-col items-center shrink-0 mt-5 md:mt-8 ${RAIL_COL}`}
      >
        <MagneticNode
          isActive={isActive}
          isMobile={isMobile}
          reduceMotion={reduceMotion}
        />
      </div>

      <div
        onMouseMove={isMobile ? undefined : handleMouseMove}
        className="relative flex-1 min-w-0 rounded-3xl transition-all duration-300 ease-out hover:-translate-y-1 group/card"
      >
        <div
          aria-hidden="true"
          className={`absolute inset-x-6 top-0 h-[2px] origin-left transition-transform duration-500 z-20 pointer-events-none ${
            isActive ? "scale-x-100" : "scale-x-0"
          }`}
          style={{
            background:
              "linear-gradient(to right, var(--text-primary), var(--text-primary) 40%, transparent 90%)",
          }}
        />

        <div
          className="relative w-full rounded-3xl p-6 md:p-8 overflow-hidden bg-[var(--card-bg)] border border-[var(--border)] shadow-[inset_0_1px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-xl hover:shadow-[inset_0_1px_0_rgba(0,0,0,0.1)] dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 ease-out"
        >
          {!isMobile && (
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover/card:opacity-100"
              style={{ background: spotlightBackground }}
            />
          )}

          <button
            type="button"
            onClick={() => onToggle(exp.id)}
            aria-expanded={isActive}
            aria-controls={panelId}
            className="w-full text-left outline-none cursor-pointer group/btn relative z-10 rounded-3xl focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          >
            <div className="flex items-start justify-between gap-4 md:gap-8">
              <div className="flex gap-4 sm:gap-6 min-w-0 items-start">
                <span
                  className="text-lg sm:text-xl md:text-2xl font-mono tracking-wider mt-0.5 transition-colors duration-300"
                  style={{
                    color: isActive
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
                    opacity: isActive ? 0.9 : 0.5,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-col gap-2 min-w-0">
                  <h3
                    className="text-xl sm:text-2xl md:text-3xl font-bold font-sans tracking-tight text-[var(--text-primary)] transition-colors duration-300"
                    style={{ fontVariationSettings: "'wght' 700" }}
                  >
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="text-[15px] font-semibold text-[var(--text-primary)]">
                      {exp.company}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[var(--border-strong)] hidden sm:block" />
                    <span className="text-xs font-medium text-[var(--text-muted)] tracking-wide bg-[var(--bg-subtle)] px-2.5 py-1 rounded-md border border-[var(--border)]">
                      {exp.tenure}
                    </span>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{
                  background: isActive
                    ? "var(--text-primary)"
                    : "var(--bg-subtle)",
                  color: isActive ? "var(--bg)" : "var(--text-primary)",
                  rotate: isActive ? 90 : 0,
                }}
                transition={springSmooth}
                className="flex items-center justify-center min-w-[36px] min-h-[36px] w-9 h-9 md:w-10 md:h-10 rounded-full shrink-0 shadow-sm border mt-1"
                style={{
                  borderColor: isActive
                    ? "transparent"
                    : "var(--border-strong)",
                }}
              >
                <ChevronRight className="w-4 h-4 md:w-[18px] md:h-[18px]" />
              </motion.div>
            </div>

            <div
              id={panelId}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className="pt-6 md:pt-8 mt-6 md:mt-8 border-t border-[var(--border-strong)] cursor-default relative z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.p
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={reduceMotion ? { duration: 0 } : springSmooth}
                    className="text-sm sm:text-base leading-relaxed max-w-3xl font-normal text-[var(--text-secondary)]"
                  >
                    {exp.description}
                  </motion.p>
                  {exp.tags && exp.tags.length > 0 && (
                    <TagList tags={exp.tags} reduceMotion={reduceMotion} />
                  )}
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
});

const Experience: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = !!useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(springScroll, [0, 1], ["0%", "100%"]);

  React.useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    const check = () => setIsMobile(mql.matches);
    check();
    mql.addEventListener("change", check);
    return () => mql.removeEventListener("change", check);
  }, []);

  const handleToggle = useCallback((id: string) => {
    setActiveId((current) => (current === id ? null : id));
  }, []);

  return (
    <section
      id="experience"
      className="w-full py-12 md:py-16 lg:py-20 relative z-10 overflow-hidden transition-colors duration-300 bg-[var(--bg)]"
      aria-labelledby="experience-heading"
    >
      <BackgroundFX
        bloomColor="primary"
        bloomPosition="top-1/2 left-[-10%] -translate-y-1/2 w-[50%] h-[80%]"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeInUp}
          className="mb-12 md:mb-16 text-left"
        >
          <p className="text-[12px] md:text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3 sm:mb-4">
            {content.sections.experience.label}
          </p>
          <h2
            id="experience-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-[var(--text-primary)]"
          >
            {content.sections.experience.title}
          </h2>
        </motion.div>
      </div>

      <div
        ref={containerRef}
        className="max-w-5xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10 mt-8 md:mt-12"
      >
        <div className="relative group/list">
          <div
            className={`absolute ${RAIL_CENTER} top-10 md:top-14 bottom-10 md:bottom-14 w-px bg-[var(--border-strong)] opacity-40`}
          />
          <motion.div
            className={`absolute ${RAIL_CENTER} top-10 md:top-14 bottom-10 md:bottom-14 w-px origin-top`}
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--text-primary) 15%, var(--text-primary) 85%, transparent)",
              scaleY: reduceMotion ? 1 : lineHeight,
              boxShadow: "0 0 8px 0 rgba(255,255,255,0.15)",
            }}
          />

          <div className="flex flex-col gap-4">
            {experience.map((exp, i) => (
              <ExperienceRow
                key={exp.id}
                exp={exp}
                index={i}
                isActive={activeId === exp.id}
                onToggle={handleToggle}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
