"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Mail } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/data/site.config";
import { content } from "@/data/content";
import { springSmooth, springSnappy } from "@/lib/motion";

// Dynamically split 3D Spline scene from initial JS execution bundle to safeguard INP (< 200ms)
const SplineScene = dynamic(() => import("@/components/ui/SplineScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] lg:min-h-[550px] flex items-center justify-center pointer-events-none">
      <div className="w-8 h-8 rounded-full border-2 border-[var(--border-strong)] border-t-cyan-400 animate-spin" />
    </div>
  ),
});

const SocialLinks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const links = [
    {
      href: siteConfig.social.twitter,
      label: "Twitter",
      path: "M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772",
    },
    {
      href: siteConfig.social.github,
      label: "GitHub",
      path: "M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5",
    },
    {
      href: siteConfig.social.linkedin,
      label: "LinkedIn",
      path: "M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z M8 11l0 5 M8 8l0 .01 M12 16l0 -5 M16 16v-3a2 2 0 0 0 -4 0",
    },
  ];
  return (
    <div className="flex items-center gap-2 md:gap-3">
      {links.map((social, idx) => (
        <div
          key={idx}
          className="relative flex items-center justify-center"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={springSnappy}
            className="group relative flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] transition-colors duration-300 hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)] hover:text-[var(--bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px] lg:w-[22px] lg:h-[22px] transition-colors duration-300 stroke-current"
              viewBox="0 0 24 24"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d={social.path} />
            </svg>
          </motion.a>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 2, scale: 0.95 }}
                transition={springSnappy}
                className="hidden lg:block absolute top-full mt-2 px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide whitespace-nowrap pointer-events-none shadow-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] z-20"
              >
                {social.label}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const Divider = () => <div className="w-px h-6 bg-[var(--border-strong)] mx-1" />;

// Helper to format browser IANA timezone strings into recognizable region/country names
const getUserLocationLabel = (tz: string): string => {
  if (!tz) return "Local Time";
  const lower = tz.toLowerCase();
  if (lower.includes("kolkata") || lower.includes("calcutta")) return "India";
  if (lower.includes("dubai") || lower.includes("abu_dhabi") || lower.includes("muscat")) return "Abu Dhabi / UAE";
  if (lower.includes("london") || lower.includes("belfast") || lower.includes("cardiff") || lower.includes("edinburgh")) return "UK";
  if (lower.includes("new_york") || lower.includes("los_angeles") || lower.includes("chicago") || lower.includes("denver") || lower.includes("phoenix") || lower.includes("detroit")) return "USA";
  if (lower.includes("toronto") || lower.includes("vancouver") || lower.includes("montreal")) return "Canada";
  if (lower.includes("singapore")) return "Singapore";
  if (lower.includes("tokyo")) return "Japan";
  if (lower.includes("sydney") || lower.includes("melbourne") || lower.includes("perth") || lower.includes("brisbane")) return "Australia";
  if (lower.includes("paris")) return "France";
  if (lower.includes("berlin") || lower.includes("frankfurt")) return "Germany";
  if (lower.includes("riyadh")) return "Saudi Arabia";
  if (lower.includes("doha") || lower.includes("qatar")) return "Qatar";
  if (lower.includes("karachi")) return "Pakistan";
  if (lower.includes("colombo")) return "Sri Lanka";
  if (lower.includes("dhaka")) return "Bangladesh";

  // Smart Fallback: extract city name after slash and replace underscores with spaces
  const parts = tz.split("/");
  const city = parts[parts.length - 1]?.replace(/_/g, " ");
  return city || "Local";
};

// Isolated client clock component prevents hydration mismatches while allowing SSR for main Hero markup
const ClientClock: React.FC = () => {
  const [time, setTime] = useState<Date | null>(null);
  const [userTz, setUserTz] = useState<string>("");

  useEffect(() => {
    setTime(new Date());
    try {
      const detectedTz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      setUserTz(detectedTz);
    } catch {
      setUserTz("");
    }
    const id = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  // Format time strictly in visitor's detected local timezone
  const ts = time.toLocaleTimeString("en-US", {
    ...(userTz ? { timeZone: userTz } : {}),
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  // Safely split across normal and non-breaking Unicode spaces (\u202F)
  const [timeValue, ampm = ""] = ts.split(/\s+/);
  
  const dateString = time.toLocaleDateString("en-US", {
    ...(userTz ? { timeZone: userTz } : {}),
    month: "long",
    day: "numeric",
  });

  const locationLabel = getUserLocationLabel(userTz);

  return (
    <div className="flex items-center gap-2.5 animate-fadeIn select-none lg:ml-2">
      <span
        className="text-2xl md:text-3xl font-bold tabular-nums leading-none text-[var(--text-primary)] font-jetbrains tracking-tight"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontVariationSettings: "normal" }}
      >
        {timeValue}
      </span>
      <div className="flex flex-col leading-tight text-left">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--accent)]">
            {ampm.toLowerCase()}
          </span>
          <span className="w-1 h-1 rounded-full bg-[var(--border-strong)]" />
          <span className="text-[11px] font-semibold text-[var(--text-secondary)] truncate max-w-[130px]" title={`Local Timezone: ${userTz || "Default"}`}>
            {locationLabel}
          </span>
        </div>
        <span className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">
          {dateString}
        </span>
      </div>
    </div>
  );
};

interface HeroProps {
  onContactClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [langIndex, setLangIndex] = useState(0);
  const { titles } = content.hero;
  const prefersReducedMotion = useReducedMotion();

  const cycleLanguage = () =>
    setLangIndex((p) => (p + 1) % content.hero.languages.length);

  useEffect(() => {
    const id = setInterval(
      () => setTitleIndex((i) => (i + 1) % titles.length),
      3500,
    );
    return () => clearInterval(id);
  }, [titles.length]);

  return (
    <section
      id="home"
      className="w-full min-h-screen min-h-[100dvh] flex flex-col relative isolate transition-colors duration-300 px-4 sm:px-12 md:px-20 lg:px-32 overflow-hidden bg-[var(--bg)]"
    >
      <div className="absolute inset-0 -z-10 grid-bg animate-custom-pulse" />
      <div
        className="absolute inset-0 -z-10 opacity-40 dark:opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, var(--border-strong), transparent)",
        }}
      />

      {/* Nav */}
      <nav className="flex justify-between items-center py-6 md:py-8 w-full relative z-40">
        <div className="flex items-center gap-3">
          <Image
            src="/image/Waving_Hand.png"
            alt="Waving Hand"
            width={36}
            height={36}
            priority
            fetchPriority="high"
            className="w-8 h-8 md:w-9 md:h-9 transition-transform duration-300 hover:rotate-12"
          />
          <span className="text-xl md:text-2xl font-semibold tracking-wider text-[#FBC138]">
            {content.hero.greeting}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-3 md:gap-4 lg:-mr-16 xl:-mr-24 2xl:-mr-28">
          <SocialLinks />
          <Divider />
          <ThemeToggle />
          <Divider />
          <ClientClock />
        </div>
        <div className="flex md:hidden items-center gap-2">
          <SocialLinks />
          <Divider />
          <ThemeToggle />
        </div>
      </nav>

      {/* Flex Layout: Polished Typography left, Spline 3D Scene right */}
      <div className="flex-grow w-full flex flex-col lg:flex-row items-start lg:items-center justify-center lg:justify-between gap-8 lg:gap-12 py-12 lg:py-0">
        {/* LEFT: Highly Polished Typography (Pulled strictly from data) */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-start text-left z-10 my-auto lg:my-0 lg:-mt-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : springSmooth}
          style={{ willChange: "transform, opacity" }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tighter leading-[1.1] text-[var(--text-primary)] mb-2 sm:mb-3 select-none">
            <span className="whitespace-nowrap">
              Hi, I&apos;m{" "}
              <motion.span
                key={langIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={prefersReducedMotion ? { duration: 0 } : springSnappy}
                onClick={cycleLanguage}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    cycleLanguage();
                  }
                }}
                aria-label={`Change display language, currently ${content.hero.languages[langIndex].name}`}
                className="cursor-pointer inline-block transition-colors duration-200 hover:text-cyan-500 dark:hover:text-cyan-400 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-md px-1 -mx-1"
                title="Click to change language"
              >
                {content.hero.languages[langIndex].name}
              </motion.span>
              .
            </span>
          </h1>

          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-[var(--text-muted)] mb-1 sm:mb-2 select-none">
            I am a
          </div>

          <div className="h-12 sm:h-14 md:h-16 lg:h-20 overflow-hidden relative w-full mb-4 sm:mb-5 flex justify-start">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={titleIndex}
                initial={{ y: 36, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -36, opacity: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : springSmooth}
                className="absolute inset-0 flex items-center justify-start text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-[var(--text-primary)]"
              >
                {titles[titleIndex]}.
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] max-w-lg">
            {content.hero.description}
          </p>

          {/* Mobile-Only Full-Width Contact Me Button */}
          <div className="flex lg:hidden mt-8 w-full">
            <button
              type="button"
              onClick={onContactClick}
              className="w-full flex items-center justify-center gap-2.5 min-h-[54px] py-3.5 px-6 rounded-[1.25rem] font-medium text-[15px] tracking-wide bg-[#18181B] dark:bg-white/[0.07] border border-black/10 dark:border-white/10 text-[var(--text-primary)] shadow-sm active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]"
            >
              <Mail className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
              <span>{content.hero.cta.secondary}</span>
            </button>
          </div>
        </motion.div>

        {/* RIGHT: Spline 3D Scene (Strictly removed from DOM on mobile & small tablets to protect battery & scroll fps) */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative w-full h-full min-h-[560px] lg:min-h-[640px] xl:min-h-[700px] lg:-ml-10 lg:-mt-24 z-0">

          <motion.div
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { ...springSmooth, delay: 0.2 }}
          >
            <SplineScene url={content.hero.splineUrl} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
