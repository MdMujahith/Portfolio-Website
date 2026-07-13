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

const premiumEase = [0.16, 1, 0.3, 1] as const;

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
            borderColor: isActive ? "var(--text-primary)" : "var(--border-strong)",
            boxShadow: isActive
              ? "0 0 4px 1px rgba(255,255,255,0.7), 0 0 20px 5px rgba(255,255,255,0.45)"
              : "0 1px 2px rgba(0,0,0,0.15)",
          }}
          transition={{ duration: 0.4, ease: premiumEase }}
          className="w-3 h-3 rounded-full border-2"
        />
      </motion.div>
    </div>
  );
});

// ── Tag Component ──
const TagList = memo(function TagList({ tags, reduceMotion }: { tags: string[]; reduceMotion?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2 mt-6 relative z-20">
      {tags.map((tag, i) => (
        <motion.span
          key={tag}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.05 * i, ease: premiumEase }}
          className="text-[11px] sm:text-[12px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-full transition-all duration-300 hover:text-white hover:bg-white/10 cursor-default"
          style={{
            background: "var(--bg-subtle)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border-strong)",
          }}
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
  exp: ExperienceItem;
  index: number;
  isActive: boolean;
  onToggle: (id: number | string) => void;
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
    [mouseX, mouseY]
  );

  const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.04), transparent 50%)`;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.3), ease: premiumEase }}
      className="relative flex gap-4 md:gap-8 py-3 md:py-4 transition-opacity duration-500 hover:!opacity-100 group/item group-hover/list:opacity-40"
    >
      {/* Rail column — perfectly aligned with the inner padding of the card */}
      <div className={`relative flex flex-col items-center shrink-0 mt-5 md:mt-8 ${RAIL_COL}`}>
        <MagneticNode isActive={isActive} isMobile={isMobile} reduceMotion={reduceMotion} />
      </div>

      <motion.div
        onMouseMove={isMobile ? undefined : handleMouseMove}
        animate={{ x: isActive && !isMobile ? 8 : 0 }}
        transition={{ duration: 0.5, ease: premiumEase }}
        className="relative flex-1 min-w-0 rounded-2xl group/card"
      >
        <div
          aria-hidden="true"
          className={`absolute inset-x-4 top-0 h-[2px] origin-left transition-transform duration-500 ${
            isActive ? "scale-x-100" : "scale-x-0"
          }`}
          style={{ background: "linear-gradient(to right, var(--text-primary), var(--text-primary) 40%, transparent 90%)" }}
        />

        <div
          className="relative w-full rounded-2xl overflow-hidden transition-[background-color,box-shadow] duration-500"
          style={{
            background: isActive ? "var(--bg-elevated)" : "var(--bg-subtle)",
            boxShadow: isActive
              ? "inset 0 1px 0 rgba(255,255,255,0.14), 0 0 0 1px rgba(255,255,255,0.06), 0 24px 48px -12px rgba(0,0,0,0.4)"
              : "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl border pointer-events-none transition-colors duration-300"
            style={{
              borderColor: isActive ? "var(--text-primary)" : "var(--border-strong)",
              opacity: isActive ? 0.5 : 0.7,
            }}
          />
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
            className="w-full text-left p-5 md:p-8 outline-none cursor-pointer group/btn relative z-10 rounded-2xl focus-visible:ring-2 focus-visible:ring-white/20"
          >
            <div className="flex items-start justify-between gap-4 md:gap-8 transition-transform duration-500 ease-out group-hover/btn:translate-x-1">
              
              {/* Flex Container for Number & Role Title */}
              <div className="flex gap-4 sm:gap-6 min-w-0 items-start">
                
                {/* ── MOVED NUMBERS: Now positioned cleanly inside the card next to the title ── */}
                <span 
                  className="text-lg sm:text-xl md:text-2xl font-mono tracking-wider mt-0.5 transition-colors duration-300"
                  style={{ 
                    color: isActive ? "var(--text-primary)" : "var(--text-muted)", 
                    opacity: isActive ? 0.9 : 0.5 
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-col gap-2 min-w-0">
                  <h3
                    className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-300"
                    style={{ color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}
                  >
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="text-[15px] font-medium text-[var(--text-primary)]">
                      {exp.company}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[var(--border-strong)] hidden sm:block" />
                    <span className="text-[13px] font-medium text-[var(--text-muted)] tracking-wide bg-[var(--bg-subtle)] px-2.5 py-1 rounded-md border border-[var(--border-strong)]">
                      {exp.tenure}
                    </span>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{
                  background: isActive ? "var(--text-primary)" : "var(--bg-subtle)",
                  color: isActive ? "var(--bg)" : "var(--text-primary)",
                  rotate: isActive ? 90 : 0,
                }}
                transition={{ duration: 0.5, ease: premiumEase }}
                className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full shrink-0 shadow-sm border mt-1"
                style={{ borderColor: isActive ? "transparent" : "var(--border-strong)" }}
              >
                <ChevronRight className="w-4 h-4 md:w-[18px] md:h-[18px]" />
              </motion.div>
            </div>

            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  id={panelId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: premiumEase }}
                  className="overflow-hidden"
                >
                  <div
                    className="pt-6 md:pt-8 mt-6 md:mt-8 border-t border-[var(--border-strong)] cursor-default relative z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <motion.p
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.1, ease: premiumEase }}
                      className="text-[15px] sm:text-[16px] leading-relaxed max-w-3xl font-normal"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {exp.description}
                    </motion.p>
                    {exp.tags && exp.tags.length > 0 && <TagList tags={exp.tags} reduceMotion={reduceMotion} />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
});

const Experience: React.FC = () => {
  const [activeId, setActiveId] = useState<number | string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = !!useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // ── BUG FIX: Smooth the scroll calculation ──
  // By running scrollYProgress through a spring, it absorbs the sudden 
  // container height changes caused by opening/closing accordion items. 
  // The scroll line now glides smoothly to its new position instead of jump-glitching.
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

  const handleToggle = useCallback((id: number | string) => {
    setActiveId((current) => (current === id ? null : id));
  }, []);

  return (
    <section
      id="experience"
      className="w-full py-16 md:py-24 lg:py-32 relative z-10 overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg)" }}
      aria-labelledby="experience-heading"
    >
      <BackgroundFX
        bloomColor="primary"
        bloomPosition="top-1/2 left-[-10%] -translate-y-1/2 w-[50%] h-[80%]"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="mb-12 md:mb-16 text-left"
        >
          <p className="text-[12px] md:text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3 sm:mb-4">
            04 // Professional Timeline
          </p>
          <h2
            id="experience-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
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
          <div className={`absolute ${RAIL_CENTER} top-10 md:top-14 bottom-10 md:bottom-14 w-px bg-[var(--border-strong)] opacity-40`} />
          <motion.div
            className={`absolute ${RAIL_CENTER} top-10 md:top-14 bottom-10 md:bottom-14 w-px origin-top`}
            style={{
              background: "linear-gradient(to bottom, transparent, var(--text-primary) 15%, var(--text-primary) 85%, transparent)",
              scaleY: reduceMotion ? 1 : lineHeight,
              boxShadow: "0 0 8px 0 rgba(255,255,255,0.15)",
            }}
          />

          <div className="flex flex-col gap-3">
            {(experience as ExperienceItem[]).map((exp, i) => (
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