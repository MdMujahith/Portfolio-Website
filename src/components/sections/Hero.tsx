"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Terminal from "@/components/ui/Terminal";
import { siteConfig } from "@/data/site.config";
import { content } from "@/data/content";

interface HeroProps {
  onContactClick: () => void;
}

const premiumEase = [0.16, 1, 0.3, 1] as const;

const SocialLinks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const links = [
    { href: siteConfig.social.twitter,  label: "Twitter",  path: "M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" },
    { href: siteConfig.social.github,   label: "GitHub",   path: "M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" },
    { href: siteConfig.social.linkedin, label: "LinkedIn", path: "M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z M8 11l0 5 M8 8l0 .01 M12 16l0 -5 M16 16v-3a2 2 0 0 0 -4 0" },
  ];
  return (
    <div className="flex items-center gap-3">
      {links.map((social, idx) => (
        <div key={idx} className="relative flex items-center justify-center"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <motion.a href={social.href} target="_blank" rel="noopener noreferrer"
            aria-label={social.label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="group flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-300"
            style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
            onMouseEnter={e => { e.currentTarget.style.background="var(--text-primary)"; e.currentTarget.style.borderColor="var(--text-primary)"; const s=e.currentTarget.querySelector("svg"); if(s)(s as HTMLElement).style.color="var(--bg)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="var(--bg-subtle)"; e.currentTarget.style.borderColor="var(--border)"; const s=e.currentTarget.querySelector("svg"); if(s)(s as HTMLElement).style.color="var(--text-secondary)"; }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-[22px] h-[22px] transition-colors duration-300"
              style={{ color: "var(--text-secondary)" }} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d={social.path} />
            </svg>
          </motion.a>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div initial={{ opacity:0,y:5,scale:.95 }} animate={{ opacity:1,y:0,scale:1 }}
                exit={{ opacity:0,y:2,scale:.95 }} transition={{ duration:.15,ease:"easeOut" }}
                className="absolute top-full mt-2 px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide whitespace-nowrap pointer-events-none shadow-lg border"
                style={{ background:"var(--bg-elevated)", borderColor:"var(--border-strong)", color:"var(--text-primary)" }}>
                {social.label}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const Divider = () => <div className="w-px h-4 bg-[var(--border-strong)]" />;

const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const [time, setTime]             = useState<Date | null>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [langIndex, setLangIndex]   = useState(0);
  const { titles, cta }             = content.hero as any;

  const cycleLanguage = () => setLangIndex(p => (p + 1) % content.hero.languages.length);

  useEffect(() => {
    const id = setInterval(() => setTitleIndex(i => (i + 1) % titles.length), 3500);
    return () => clearInterval(id);
  }, [titles.length]);

  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const formattedTime = time ? (() => {
    const ts = time.toLocaleTimeString("en-US", { timeZone: siteConfig.owner.location.timezone, hour: "2-digit", minute: "2-digit", hour12: true });
    const [timeValue, ampm] = ts.split(" ");
    const dateString = time.toLocaleDateString("en-US", { timeZone: siteConfig.owner.location.timezone, month: "long", day: "numeric" });
    return { timeValue, ampm, dateString };
  })() : null;

  return (
    <section id="home"
      className="w-full min-h-screen flex flex-col relative isolate transition-colors duration-300 px-4 sm:px-12 md:px-20 lg:px-32 overflow-hidden"
      style={{ background: "var(--bg)" }}>

      <div className="absolute inset-0 -z-10 grid-bg animate-custom-pulse" />
      <div className="absolute inset-0 -z-10 opacity-40 dark:opacity-20"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% -20%, var(--border-strong), transparent)" }} />

      {/* Nav */}
      <nav className="flex justify-between items-center py-6 md:py-8 w-full z-10">
        <div className="flex items-center gap-2.5">
          <Image src="/image/Waving_Hand.png" alt="Waving Hand" width={36} height={36} priority
            className="w-8 h-8 md:w-9 md:h-9 transition-transform duration-300 hover:rotate-12" />
          <span className="text-xl md:text-2xl font-semibold tracking-wider text-[#FBC138]">{content.hero.greeting}</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <SocialLinks /><Divider /><ThemeToggle />
          {formattedTime && (
            <><Divider />
              <div className="flex items-center gap-2">
                <span className="text-3xl font-semibold tabular-nums leading-none text-[var(--text-primary)]">{formattedTime.timeValue}</span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] font-semibold text-[var(--text-secondary)]">{formattedTime.ampm.toLowerCase()}</span>
                  <span className="text-[11px] font-medium text-[var(--text-muted)]">{formattedTime.dateString}</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex md:hidden items-center gap-3">
          <SocialLinks /><Divider /><ThemeToggle />
        </div>
      </nav>

      {/* Grid */}
      <div className="flex-grow w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 lg:py-0">

        {/* LEFT */}
        <motion.div className="lg:col-span-6 flex flex-col items-start text-left z-10 -mt-15"
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, ease:premiumEase }}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tighter leading-[1.05] text-[var(--text-primary)] mb-4 select-none">
            <span className="whitespace-nowrap">Hi, I&apos;m{" "}
              <motion.span key={langIndex}
                initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-10 }}
                transition={{ duration:0.3, ease:premiumEase }}
                onClick={cycleLanguage}
                className="cursor-pointer inline-block transition-colors duration-200 hover:text-cyan-500 dark:hover:text-cyan-400 active:scale-95"
                title="Click to change language">
                {content.hero.languages[langIndex].name}
              </motion.span>.
            </span><br />
            <span className="text-[var(--text-muted)]">I am a</span>
          </h1>

          <div className="h-14 sm:h-16 md:h-20 overflow-hidden relative w-full mb-6">
            <AnimatePresence mode="popLayout">
              <motion.span key={titleIndex}
                initial={{ y:40,opacity:0 }} animate={{ y:0,opacity:1 }} exit={{ y:-40,opacity:0 }}
                transition={{ duration:0.5, ease:premiumEase }}
                className="absolute inset-0 flex items-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-[var(--text-primary)]">
                {titles[titleIndex]}.
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)] max-w-lg mb-2">
            {content.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button onClick={onContactClick}
              className="md:hidden group flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-[14px] border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all duration-300 whitespace-nowrap">
              <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
              {cta.secondary}
            </button>
          </div>
        </motion.div>

        {/* RIGHT 
        <div className="hidden lg:flex lg:col-span-6 items-center justify-center h-[520px] w-full">
          <Terminal />
        </div>*/}

      </div>
    </section>
  );
};

export default Hero;