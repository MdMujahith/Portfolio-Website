"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";
import DynamicResumeButton from "@/components/ui/DynamicResumeButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/data/site.config";
import { content } from "@/data/content";

interface HeroProps {
  onContactClick: () => void;
}

const premiumEase = [0.16, 1, 0.3, 1] as const;

const SocialLinks = () => (
  <div className="flex items-center gap-3">
    {[
      { href: siteConfig.social.twitter, label: "Twitter", path: "M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" },
      { href: siteConfig.social.github, label: "GitHub", path: "M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" },
      { href: siteConfig.social.linkedin, label: "LinkedIn", path: "M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z M8 11l0 5 M8 8l0 .01 M12 16l0 -5 M16 16v-3a2 2 0 0 0 -4 0" },
    ].map((social, idx) => (
      <a
        key={idx}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.label}
        className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px] stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d={social.path} />
        </svg>
      </a>
    ))}
  </div>
);

const Divider = () => (
  <div className="w-px h-4 bg-[var(--border-strong)]" />
);

const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const [time, setTime] = useState<Date | null>(null);
  const [titleIndex, setTitleIndex] = useState(0);

  const { lastName } = siteConfig.owner;
  const { titles, cta } = content.hero as any;
  // Language cycle state
  const [langIndex, setLangIndex] = useState(0);

  const cycleLanguage = () => {
    setLangIndex((prev) => (prev + 1) % content.hero.languages.length);
  };

  useEffect(() => {
    const id = setInterval(() => setTitleIndex((i) => (i + 1) % titles.length), 3500);
    return () => clearInterval(id);
  }, [titles.length]);

  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const formattedTime = time ? (() => {
    const timeStr = time.toLocaleTimeString("en-US", {
      timeZone: siteConfig.owner.location.timezone,
      hour: "2-digit", minute: "2-digit", hour12: true,
    });
    const [timeValue, ampm] = timeStr.split(" ");
    const dateString = time.toLocaleDateString("en-US", {
      timeZone: siteConfig.owner.location.timezone,
      month: "long", day: "numeric",
    });
    return { timeValue, ampm, dateString };
  })() : null;

  return (
    <section
      id="home"
      className="w-full min-h-screen flex flex-col relative isolate transition-colors duration-300 px-4 sm:px-12 md:px-20 lg:px-32 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 grid-bg animate-custom-pulse" />
      <div
        className="absolute inset-0 -z-10 opacity-40 dark:opacity-20"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% -20%, var(--border-strong), transparent)" }}
      />

      {/* ── NAVIGATION ── */}
      <nav className="flex justify-between items-center py-6 md:py-8 w-full z-10">

        {/* Left: Greeting */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/image/Waving_Hand.png"
            alt="Waving Hand"
            width={36} height={36} priority
            className="w-8 h-8 md:w-9 md:h-9 transition-transform duration-300 hover:rotate-12"
          />
          <span className="text-xl md:text-2xl font-semibold tracking-wider text-[#FBC138]">
            {content.hero.greeting}
          </span>
        </div>

        {/* Right: Desktop — SocialLinks | ThemeToggle | Clock (rightmost) */}
        <div className="hidden md:flex items-center gap-4">
          <SocialLinks />
          <Divider />
          <ThemeToggle />
          {formattedTime && (
            <>
              <Divider />
              <div className="flex items-center gap-2">
                <span className="text-3xl font-semibold tabular-nums leading-none text-[var(--text-primary)]">
                  {formattedTime.timeValue}
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] font-semibold text-[var(--text-secondary)]">{formattedTime.ampm.toLowerCase()}</span>
                  <span className="text-[11px] font-medium text-[var(--text-muted)]">{formattedTime.dateString}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right: Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <SocialLinks />
          <Divider />
          <ThemeToggle />
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-grow w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12 lg:py-0">

        {/* LEFT COLUMN */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: premiumEase }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tighter leading-[1.05] text-[var(--text-primary)] mb-4 select-none">
  <span className="whitespace-nowrap">
    Hi, I&apos;m{" "}
    <motion.span
      key={langIndex}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: premiumEase }}
      onClick={cycleLanguage}
      /* 👇 FLAT TECH HOVER 👇 */
      className="cursor-pointer inline-block transition-colors duration-200 
                 hover:text-cyan-500 dark:hover:text-cyan-400 
                 active:scale-95"
      title="Click to change language"
    >
      {content.hero.languages[langIndex].name}
    </motion.span>.
  </span>
  <br />
  <span className="text-[var(--text-muted)]">I am a</span>
</h1>
          {/* Carousel */}
          <div className="h-14 sm:h-16 md:h-20 overflow-hidden relative w-full mb-6">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={titleIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: premiumEase }}
                className="absolute inset-0 flex items-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-[var(--text-primary)]"
              >
                {titles[titleIndex]}.
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)] max-w-lg mb-2">
            A software engineer specializing in building exceptional, high-performance digital experiences. Currently focused on mastering modern web architectures.
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {/* Scaled down on desktop only */}
            <div className="md:scale-[0.82] md:origin-left">
              <DynamicResumeButton />
            </div>
            <button
              onClick={onContactClick}
              className="md:hidden group flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-[14px] border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all duration-300 whitespace-nowrap"
            >
              <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
              {cta.secondary}
            </button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Profile */}
        <motion.div
          className="hidden md:flex lg:col-span-5 justify-center lg:justify-end translate-x-4 lg:translate-x-8 -translate-y-10 z-10"
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 1, ease: premiumEase, delay: 0.1 }}
        >
          <div className="relative w-[280px] h-[280px] lg:w-[460px] lg:h-[460px]">
            <div className="absolute inset-0 rounded-full border border-[var(--border-strong)] shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-105" />
            <Image
              src="/image/ProfilePicture.jpeg"
              alt={`${lastName} - Profile`}
              fill
              priority
              className="rounded-full object-cover object-[50%_20%] shadow-inner"
              sizes="(max-width: 1024px) 280px, 460px"
            />
            <div className="absolute inset-0 rounded-full bg-[var(--text-primary)] opacity-[0.02] blur-xl -z-10" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
