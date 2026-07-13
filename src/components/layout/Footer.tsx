"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Mail, Twitter, Github, Linkedin } from "lucide-react";
import { content } from "@/data/content";
import { siteConfig } from "@/data/site.config";

interface FooterProps {
  onContactClick: () => void;
}

const premiumEase = [0.16, 1, 0.3, 1] as const;

// 1. Extracted and memoized to prevent unnecessary re-renders
const MarqueeLine = memo(({ text, direction }: { text: string; direction: "left" | "right" }) => (
  <div className="flex overflow-hidden w-full" aria-hidden="true">
    <div className={`flex w-max ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}>
      {[...Array(6)].map((_, i) => (
        <span
          key={`${direction}-${i}`}
          className="mx-6 text-2xl sm:text-3xl md:text-4xl font-bold whitespace-nowrap opacity-30 uppercase tracking-widest text-[var(--text-disabled)]"
        >
          {text}
        </span>
      ))}
    </div>
  </div>
));
MarqueeLine.displayName = "MarqueeLine";

// 2. Data structure to keep JSX DRY and maintainable
const SOCIAL_LINKS = [
  { id: "twitter", icon: Twitter, href: siteConfig.social.twitter, label: "Follow me on X (Twitter)" },
  { id: "github", icon: Github, href: siteConfig.social.github, label: "View my GitHub profile" },
  { id: "linkedin", icon: Linkedin, href: siteConfig.social.linkedin, label: "Connect with me on LinkedIn" },
] as const;

const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-12 relative z-10 overflow-hidden transition-colors duration-300 bg-[var(--bg)]">
      {/* Top border gradient */}
      <div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }}
      />

      {/* Marquee */}
      <div className="w-full mb-10 flex flex-col gap-3 pointer-events-none select-none">
        <p className="sr-only">
          {content.footer.marquee.line1}. {content.footer.marquee.line2}
        </p>
        <MarqueeLine text={content.footer.marquee.line1} direction="left" />
        <MarqueeLine text={content.footer.marquee.line2} direction="right" />
      </div>

      {/* Main Footer Content */}
      <motion.div
        className="max-w-4xl mx-auto flex flex-col items-center text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: premiumEase }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3 text-[var(--text-primary)]">
          {content.footer.headline}
        </h2>
        
        <p className="max-w-md text-[14px] sm:text-[15px] leading-relaxed mb-6 text-[var(--text-secondary)]">
          {content.footer.description}
        </p>

        {/* Social Links */}
        <nav className="flex items-center gap-6 mb-8" aria-label="Social links">
          {SOCIAL_LINKS.map(({ id, icon: Icon, href, label }) => (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              // 3. Removed inline JS style mutation in favor of pure CSS/Tailwind classes
              className="transition-all duration-300 hover:scale-110 hover:-translate-y-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <button
          onClick={onContactClick}
          className="group flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-medium text-[14px] sm:text-[15px] transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] mb-6 bg-[var(--text-primary)] text-[var(--bg)]"
        >
          <Mail size={16} className="transition-transform group-hover:scale-110" />
          {content.footer.cta}
        </button>

        {/* Inspired By */}
        <p className="text-[12px] sm:text-[13px] text-[var(--text-secondary)] mb-6">
          {content.footer.copyright.inspiration.text}{" "}
          <a
            href={content.footer.copyright.inspiration.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition-colors duration-300 hover:underline text-[var(--text-primary)]"
          >
            {content.footer.copyright.inspiration.name}
          </a>
        </p>
      </motion.div>

      {/* Copyright Bar */}
      {/* 4. Moved outside the max-w-4xl wrapper so the border-t stretches correctly across the layout */}
      <div className="w-full border-t border-[var(--border)] mt-6 pt-5 pb-4 px-6 flex items-center justify-center">
        <p className="text-[11px] sm:text-[12px] tracking-wide text-[var(--text-muted)] text-center">
          &copy; {currentYear} {siteConfig.owner.firstName} {siteConfig.owner.lastName}.{" "}
          {content.footer.copyright.text}
        </p>
      </div>

      {/* Global Spacer for Floating BottomNav */}
      <div
        className="w-full pointer-events-none"
        style={{ height: "calc(6rem + env(safe-area-inset-bottom))" }}
        aria-hidden="true"
      />
    </footer>
  );
};

export default Footer;