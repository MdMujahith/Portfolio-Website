"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { content } from "@/data/content";
import { siteConfig } from "@/data/site.config";

interface FooterProps {
  onContactClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const MarqueeLine = ({ text, direction }: { text: string; direction: "left" | "right" }) => (
    <div className="flex overflow-hidden w-full" aria-hidden="true">
      <div className={`flex w-max ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}>
        {[...Array(6)].map((_, i) => (
          <span
            key={`${direction}-${i}`}
            className="mx-8 text-3xl sm:text-4xl md:text-5xl font-semibold whitespace-nowrap text-zinc-400 dark:text-zinc-600"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <footer className="w-full bg-zinc-800 dark:bg-zinc-950 text-white pt-12 sm:pt-16 relative z-10 overflow-hidden transition-colors duration-300">

      {/* Marquee Section */}
      <div className="w-full mb-12 sm:mb-16 flex flex-col gap-4">
        <p className="sr-only">
          {content.footer.marquee.line1}. {content.footer.marquee.line2}
        </p>
        <MarqueeLine text={content.footer.marquee.line1} direction="left" />
        <MarqueeLine text={content.footer.marquee.line2} direction="right" />
      </div>

      {/* Main Footer Content */}
      <motion.div
        className="max-w-7xl mx-auto flex flex-col items-center text-center px-6 pb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
          {content.footer.headline}
        </h2>
        <p className="max-w-md text-zinc-400 dark:text-zinc-500 mb-8">
          {content.footer.description}
        </p>

        {/* Social Navigation */}
        <nav className="flex items-center gap-8 mb-8" aria-label="Social links">
          <a
            href={siteConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow me on X (Twitter)"
            className="text-zinc-400 hover:text-white dark:hover:text-zinc-200 transition-all hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
            </svg>
          </a>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View my GitHub profile"
            className="text-zinc-400 hover:text-white dark:hover:text-zinc-200 transition-all hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
            </svg>
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with me on LinkedIn"
            className="text-zinc-400 hover:text-white dark:hover:text-zinc-200 transition-all hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M8 11l0 5"></path>
              <path d="M8 8l0 .01"></path>
              <path d="M12 16l0 -5"></path>
              <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
            </svg>
          </a>
        </nav>

        {/* Action Button */}
        <button
          onClick={onContactClick}
          className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-zinc-100 text-zinc-800 dark:text-zinc-900 rounded-full font-semibold text-md hover:bg-zinc-200 dark:hover:bg-white transition-all hover:shadow-xl active:scale-95 mb-8"
        >
          <Mail size={18} />
          {content.footer.cta}
        </button>

        <hr className="w-full max-w-lg border-t border-zinc-700 dark:border-zinc-800 mb-3" />

        <p className="text-zinc-600 dark:text-zinc-500 text-sm sm:text-base mt-4">
          {content.footer.copyright.inspiration.text}{" "}
          <a
            href={content.footer.copyright.inspiration.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-zinc-500 dark:text-zinc-400 hover:text-white dark:hover:text-zinc-200 transition-colors"
          >
            {content.footer.copyright.inspiration.name}
          </a>
        </p>

        <p className="text-zinc-500 dark:text-zinc-600 text-xs sm:text-sm mt-1 mb-1">
          &copy; {new Date().getFullYear()} {siteConfig.owner.firstName} {siteConfig.owner.lastName}. {content.footer.copyright.text}
        </p>
      </motion.div>

      {/* Spacing for desktop nav */}
      <div className="h-20 hidden md:block"></div>
    </footer>
  );
};

export default Footer;