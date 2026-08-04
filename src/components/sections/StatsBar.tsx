"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { siteConfig } from "@/data/site.config";
import { content } from "@/data/content";
import BackgroundFX from "@/components/ui/BackgroundFX";
import { fadeInUp, staggerContainer, springSnappy } from "@/lib/motion";

interface GithubStats {
  publicRepos: number;
  followers: number;
}
interface LeetcodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}
type FetchState = "loading" | "success" | "partial" | "error";

const EMPTY_GITHUB: GithubStats = { publicRepos: 0, followers: 0 };
const EMPTY_LEETCODE: LeetcodeStats = {
  totalSolved: 0,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
};

// ---------- Animated number ----------
const AnimatedNumber = ({
  value,
  className,
  play,
}: {
  value: number;
  className?: string;
  play: boolean;
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 90, damping: 20 });
  const rounded = useTransform(springValue, (l) => Math.round(l));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!play) return;
    if (reduceMotion) return setDisplay(value);
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value, play, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [rounded, reduceMotion]);

  return (
    <span
      ref={ref}
      aria-label={String(value)}
      className={`${className} font-orbitron tabular-nums`}
      style={{ fontFamily: "'Orbitron', sans-serif", fontVariationSettings: "normal", letterSpacing: "0.02em" }}
    >
      {display}
    </span>
  );
};

const Skeleton = ({ className = "" }: { className?: string }) => (
  <span
    className={`inline-block rounded-md bg-[var(--bg-subtle)] animate-pulse ${className}`}
    aria-hidden="true"
  />
);

// ---------- Difficulty distribution bar ----------
const DifficultyBar = ({ stats }: { stats: LeetcodeStats }) => {
  const total = Math.max(stats.totalSolved, 1);
  const segments = [
    {
      key: "easy",
      value: stats.easySolved,
      color: "var(--success)",
      label: "Easy",
    },
    {
      key: "medium",
      value: stats.mediumSolved,
      color: "var(--warning)",
      label: "Medium",
    },
    {
      key: "hard",
      value: stats.hardSolved,
      color: "var(--error)",
      label: "Hard",
    },
  ];

  return (
    <div
      className="mt-4 flex h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-subtle)]"
      role="img"
      aria-label={`${stats.easySolved} easy, ${stats.mediumSolved} medium, ${stats.hardSolved} hard problems solved`}
    >
      {segments.map((seg) => (
        <motion.div
          key={seg.key}
          title={`${seg.label}: ${seg.value}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="origin-left cursor-default"
          style={{
            width: `${(seg.value / total) * 100}%`,
            backgroundColor: seg.color,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
};

const formatRelativeTime = (date: Date | null): string => {
  if (!date) return "";
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
};

const cardGlass =
  "bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-[border-color,box-shadow,transform] duration-300 hover:border-black/10 dark:hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]";

const StatsBar: React.FC = () => {
  const [github, setGithub] = useState<GithubStats>(EMPTY_GITHUB);
  const [leetcode, setLeetcode] = useState<LeetcodeStats>(EMPTY_LEETCODE);
  const [state, setState] = useState<FetchState>("loading");
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [, forceTick] = useState(0);

  const loadStats = useCallback(async () => {
    setState("loading");
    try {
      const [githubRes, leetcodeRes] = await Promise.all([
        fetch("/api/github-stats").catch(() => null),
        fetch("/api/leetcode-stats").catch(() => null),
      ]);
      const ghOk = !!githubRes?.ok;
      const lcOk = !!leetcodeRes?.ok;
      const ghData = ghOk ? await githubRes!.json() : EMPTY_GITHUB;
      const lcData = lcOk ? await leetcodeRes!.json() : EMPTY_LEETCODE;

      setGithub({
        publicRepos: ghData.publicRepos ?? 0,
        followers: ghData.followers ?? 0,
      });
      setLeetcode({
        totalSolved: lcData.totalSolved ?? 0,
        easySolved: lcData.easySolved ?? 0,
        mediumSolved: lcData.mediumSolved ?? 0,
        hardSolved: lcData.hardSolved ?? 0,
      });

      if (!ghOk && !lcOk) setState("error");
      else if (!ghOk || !lcOk) setState("partial");
      else setState("success");
      setLastSynced(new Date());
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadStats();
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
  }, [loadStats]);

  useEffect(() => {
    const id = setInterval(() => forceTick((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  const yearsCoding = Number(siteConfig.yearsCoding || 4);
  const isLoading = state === "loading";
  const hasError = state === "error";

  return (
    <section
      className="w-full py-8 md:py-12 relative z-10 overflow-hidden transition-colors duration-300 bg-[var(--bg)]"
      aria-labelledby="stats-heading"
    >
      <BackgroundFX
        bloomColor="accent"
        bloomPosition="top-[20%] right-[-10%] w-[70%] h-[60%]"
        pattern="grid"
        textureOpacity="light"
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-20">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-12 md:mb-16 lg:mb-20 text-left"
        >
          <p
            id="stats-heading"
            className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-[var(--text-muted)] mb-4 md:mb-6 flex items-center gap-3"
          >
            <span
              className={`w-2 h-2 rounded-full shadow-[0_0_8px_var(--accent)] ${
                hasError
                  ? "bg-[var(--error)]"
                  : "bg-[var(--accent)] animate-custom-pulse"
              }`}
              aria-hidden="true"
            />
            {content.sections.statsBar.sectionLabel}
          </p>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter leading-[1.1] text-[var(--text-primary)]"
            >
              {content.sections.statsBar.title}
            </h2>

            <div
              className="flex items-center gap-3"
              role="status"
              aria-live="polite"
            >
              {!isLoading && lastSynced && !hasError && (
                <span className="text-[10px] uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  Synced {formatRelativeTime(lastSynced)}
                </span>
              )}
              {state === "partial" && (
                <span className="badge badge-warning text-[10px]">
                  PARTIAL DATA
                </span>
              )}
              {hasError && (
                <>
                  <span className="badge badge-error text-[10px]">
                    API DEGRADED
                  </span>
                  <button
                    onClick={loadStats}
                    className="text-[10px] font-semibold uppercase tracking-widest text-[var(--accent-text)] underline underline-offset-2 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded-sm min-h-[44px] px-2 flex items-center"
                  >
                    Retry
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
        >
          {/* GitHub Panel */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={springSnappy}
            className={`p-6 md:col-span-5 rounded-[1.5rem] flex flex-col justify-between group relative overflow-hidden ${cardGlass}`}
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
              <svg
                className="w-32 h-32 text-[var(--text-primary)] -translate-y-4 translate-x-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>

            <h3 className="text-xs font-semibold tracking-widest text-[var(--text-secondary)] uppercase mb-8">
              {content.sections.statsBar.github.cardTitle}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                {isLoading ? (
                  <Skeleton className="h-9 w-16 mb-1" />
                ) : (
                  <AnimatedNumber
                    value={github.publicRepos}
                    play={!isLoading}
                    className="text-3xl lg:text-4xl text-[var(--text-primary)] block mb-1 font-semibold"
                  />
                )}
                <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">
                  Repos
                </span>
              </div>
              <div>
                {isLoading ? (
                  <Skeleton className="h-9 w-16 mb-1" />
                ) : (
                  <AnimatedNumber
                    value={github.followers}
                    play={!isLoading}
                    className="text-3xl lg:text-4xl text-[var(--text-primary)] block mb-1 font-semibold"
                  />
                )}
                <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">
                  Followers
                </span>
              </div>
            </div>
          </motion.div>

          {/* LeetCode Panel */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={springSnappy}
            className={`p-6 md:col-span-7 rounded-[1.5rem] flex flex-col justify-between ${cardGlass}`}
          >
            <h3 className="text-xs font-semibold tracking-widest text-[var(--text-secondary)] uppercase mb-8 flex items-center justify-between">
              {content.sections.statsBar.leetcode.cardTitle}
              <svg
                className="w-5 h-5 text-[#FFA116]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.939 5.939 0 0 0 1.271 1.541l5.967 5.68c.8.761 2.077.761 2.877 0a1.913 1.913 0 0 0 .56-.867 1.922 1.922 0 0 0-.008-1.127 1.93 1.93 0 0 0-.498-.946l-5.694-5.419a.952.952 0 0 1-.294-.486.974.974 0 0 1 .054-.64.982.982 0 0 1 .374-.467.994.994 0 0 1 .586-.144l4.904-.002h4.947c.535-.002 1.033-.231 1.375-.624a1.868 1.868 0 0 0 .428-1.326 1.849 1.849 0 0 0-.586-1.204 1.854 1.854 0 0 0-1.258-.521h-8.77l5.358-5.733a1.385 1.385 0 0 0 .044-1.895 1.401 1.401 0 0 0-1.92-.01z" />
              </svg>
            </h3>

            <div>
              <div className="grid grid-cols-4 gap-2 text-center sm:text-left">
                <div>
                  {isLoading ? (
                    <Skeleton className="h-8 w-12 mb-1" />
                  ) : (
                    <AnimatedNumber
                      value={leetcode.totalSolved}
                      play={!isLoading}
                      className="text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] block mb-1 font-semibold"
                    />
                  )}
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">
                    Total
                  </span>
                </div>
                <div>
                  {isLoading ? (
                    <Skeleton className="h-8 w-12 mb-1" />
                  ) : (
                    <AnimatedNumber
                      value={leetcode.easySolved}
                      play={!isLoading}
                      className="text-2xl sm:text-3xl lg:text-4xl text-[var(--success)] block mb-1 drop-shadow-[0_0_8px_var(--success-subtle)] font-semibold"
                    />
                  )}
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">
                    Easy
                  </span>
                </div>
                <div>
                  {isLoading ? (
                    <Skeleton className="h-8 w-12 mb-1" />
                  ) : (
                    <AnimatedNumber
                      value={leetcode.mediumSolved}
                      play={!isLoading}
                      className="text-2xl sm:text-3xl lg:text-4xl text-[var(--warning)] block mb-1 drop-shadow-[0_0_8px_var(--warning-subtle)] font-semibold"
                    />
                  )}
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">
                    Medium
                  </span>
                </div>
                <div>
                  {isLoading ? (
                    <Skeleton className="h-8 w-12 mb-1" />
                  ) : (
                    <AnimatedNumber
                      value={leetcode.hardSolved}
                      play={!isLoading}
                      className="text-2xl sm:text-3xl lg:text-4xl text-[var(--error)] block mb-1 drop-shadow-[0_0_8px_var(--error-subtle)] font-semibold"
                    />
                  )}
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">
                    Hard
                  </span>
                </div>
              </div>

              {!isLoading && leetcode.totalSolved > 0 && (
                <DifficultyBar stats={leetcode} />
              )}
            </div>
          </motion.div>

          {/* Years Coding Panel */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -3, scale: 1.01 }}
            transition={springSnappy}
            className={`rounded-[1.5rem] p-6 md:col-span-12 flex items-center justify-between ${cardGlass}`}
          >
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] pl-2">
              {content.sections.statsBar.yearsActive.label}
            </span>
            <div className="flex items-center gap-3 pr-2">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-medium">
                {content.sections.statsBar.yearsActive.valueLabel}
              </span>
              <AnimatedNumber
                value={yearsCoding}
                play={true}
                className="text-2xl sm:text-3xl text-cyan-400 dark:text-cyan-300 font-semibold"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBar;
