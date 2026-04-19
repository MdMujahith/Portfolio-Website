"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { content } from "@/data/content";
import { siteConfig } from "@/data/site.config";

interface FooterProps {
  onContactClick: () => void;
}

const premiumEase = [0.16, 1, 0.3, 1] as const;

const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const MarqueeLine = ({ text, direction }: { text: string; direction: "left" | "right" }) => (
    <div className="flex overflow-hidden w-full" aria-hidden="true">
      <div className={`flex w-max ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}>
        {[...Array(6)].map((_, i) => (
          <span
            key={`${direction}-${i}`}
            /* Scaled down text size to feel more like a footer accent */
            className="mx-6 text-2xl sm:text-3xl md:text-4xl font-bold whitespace-nowrap opacity-30 uppercase tracking-widest"
            style={{ color: "var(--text-disabled)" }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <footer
      /* Shrunk top padding from pt-24 to pt-12 */
      className="w-full pt-12 relative z-10 overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg)" }}
    >
      {/* Top border gradient */}
      <div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-strong), transparent)" }}
      />

      {/* Marquee - Reduced bottom margin and gap */}
      <div className="w-full mb-10 flex flex-col gap-3 pointer-events-none select-none">
        <p className="sr-only">
          {content.footer.marquee.line1}. {content.footer.marquee.line2}
        </p>
        <MarqueeLine text={content.footer.marquee.line1} direction="left" />
        <MarqueeLine text={content.footer.marquee.line2} direction="right" />
      </div>

      {/* Main Footer Content */}
      <motion.div
        /* Reduced bottom padding */
        className="max-w-4xl mx-auto flex flex-col items-center text-center px-6 pb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: premiumEase }}
      >
        <h2
          /* Slightly smaller headline */
          className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          {content.footer.headline}
        </h2>
        <p
          /* Tighter description margin */
          className="max-w-md text-[14px] sm:text-[15px] leading-relaxed mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          {content.footer.description}
        </p>

        {/* Social Links - Tighter gaps */}
        <nav className="flex items-center gap-6 mb-8" aria-label="Social links">
          <a
            href={siteConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow me on X (Twitter)"
            className="transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </svg>
          </a>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View my GitHub profile"
            className="transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with me on LinkedIn"
            className="transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
              <path d="M8 11l0 5" />
              <path d="M8 8l0 .01" />
              <path d="M12 16l0 -5" />
              <path d="M16 16v-3a2 2 0 0 0 -4 0" />
            </svg>
          </a>
        </nav>

        {/* CTA Button */}
        <button
          onClick={onContactClick}
          className="group flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-medium text-[14px] sm:text-[15px] transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] mb-4"
          style={{ background: "var(--text-primary)", color: "var(--bg)" }}
        >
          <Mail size={16} className="transition-transform group-hover:scale-110" />
          {content.footer.cta}
        </button>

        {/* Inspired By */}
        <p className="text-[12px] sm:text-[13px]" style={{ color: "var(--text-secondary)" }}>
          {content.footer.copyright.inspiration.text}{" "}
          <a
            href={content.footer.copyright.inspiration.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition-colors duration-300 hover:underline"
            style={{ color: "var(--text-primary)" }}
          >
            {content.footer.copyright.inspiration.name}
          </a>
        </p>
        
       {/* =======================================
          * COPYRIGHT BAR 
          * ======================================= */}
        <div 
          className="w-full mt-12 pt-5 pb-4 border-t flex items-center justify-center" 
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-[11px] sm:text-[12px] tracking-wide" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} {siteConfig.owner.firstName} {siteConfig.owner.lastName}.{" "}
            {content.footer.copyright.text}
          </p>
        </div>

      </motion.div>

      {/* * GLOBAL SPACER 
        * This pushes the absolute bottom of the page down, allowing the user 
        * to scroll past the floating BottomNav so the copyright is fully visible.
      */}
      <div
        className="w-full"
        style={{ height: "calc(6rem + env(safe-area-inset-bottom))" }}
      />
    </footer>
  );
};

export default Footer;