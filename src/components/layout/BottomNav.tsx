"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Home, ArrowRight, Menu, X } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { siteConfig } from "@/data/site.config";
import { content } from "@/data/content";
import { springSmooth, springSnappy } from "@/lib/motion";

interface BottomNavProps {
  onContactClick: () => void;
  onOpenCommandPalette?: () => void; // Kept optional for interface backwards compatibility without search icon rendering
}

const BottomNav: React.FC<BottomNavProps> = ({
  onContactClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const sidebarVariants: Variants = {
    open: {
      clipPath: `circle(150% at calc(100% - 40px) calc(100% - 40px))`,
      transition: { type: "spring", stiffness: 200, damping: 25 },
    },
    closed: {
      clipPath: `circle(0px at calc(100% - 40px) calc(100% - 40px))`,
      transition: { type: "spring", stiffness: 300, damping: 30, delay: 0.1 },
    },
  };

  const itemVariants: Variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: springSmooth,
    },
    closed: {
      y: 15,
      opacity: 0,
      transition: springSnappy,
    },
  };

  const listVariants: Variants = {
    open: {
      transition: { staggerChildren: 0.05, delayChildren: 0.15 },
    },
    closed: {
      transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
  };

  return (
    <>
      {/* =======================================
       * DESKTOP NAVIGATION (Elite Glassmorphism)
       * ======================================= */}
      <nav
        aria-label="Desktop Primary Navigation"
        className="hidden md:flex fixed bottom-8 left-1/2 transform -translate-x-1/2 w-auto max-w-[96vw] h-[68px] rounded-full p-2 justify-between items-center z-50 overflow-x-auto transition-all duration-300 bg-white/70 dark:bg-white/10 backdrop-blur-2xl border border-[var(--border-strong)] shadow-[0_12px_36px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div
          className="absolute inset-0 pointer-events-none -z-10 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(var(--text-primary) 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />

        <a
          href="#home"
          aria-label="Go to Home"
          className="flex items-center justify-center min-w-[44px] min-h-[44px] w-[44px] h-[44px] shrink-0 rounded-full transition-colors duration-200 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <Home size={21} aria-hidden="true" strokeWidth={2.3} />
        </a>

        <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 shrink-0">
          {siteConfig.navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{ fontVariationSettings: "'wght' 600, 'opsz' 20" }}
              className="rounded-full min-h-[42px] py-2 px-3 lg:px-3.5 flex items-center justify-center whitespace-nowrap shrink-0 transition-all duration-200 text-[15px] lg:text-[16px] font-semibold tracking-tight font-sans text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              {item.label}
            </a>
          ))}
        </div>

        <MagneticButton
          onClick={onContactClick}
          style={{ fontVariationSettings: "'wght' 700, 'opsz' 20" }}
          className="rounded-full min-h-[44px] shrink-0 flex items-center justify-center py-2.5 px-6 lg:px-7 gap-2 transition-transform duration-300 hover:scale-[1.02] active:scale-95 font-bold font-sans text-[15px] tracking-tight ml-1 lg:ml-2 whitespace-nowrap bg-[var(--text-primary)] text-[var(--bg)] shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <span>{content.intro.cta}</span>
          <ArrowRight
            size={17}
            aria-hidden="true"
            className="shrink-0"
            strokeWidth={2.5}
          />
        </MagneticButton>
      </nav>

      {/* =======================================
       * MOBILE NAVIGATION OVERLAY
       * ======================================= */}
      <div className="md:hidden">
        <motion.nav
          aria-label="Mobile Primary Navigation"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={sidebarVariants}
          aria-hidden={!isOpen}
          className="fixed inset-0 z-40 flex flex-col justify-end items-end px-8 pb-32 transition-colors duration-300 bg-[var(--bg)]/90 backdrop-blur-2xl"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(var(--text-primary) 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }}
          />

          <motion.ul
            variants={listVariants}
            className="flex flex-col gap-5 relative z-10 items-end"
          >
            <motion.li variants={itemVariants}>
              <a
                href="#home"
                onClick={toggleMenu}
                className="text-4xl sm:text-5xl font-medium tracking-tight text-right block transition-colors duration-300 text-[var(--text-secondary)] hover:text-[var(--text-primary)] min-h-[44px] flex items-center justify-end"
              >
                Home
              </a>
            </motion.li>

            {siteConfig.navLinks.map((item) => (
              <motion.li key={item.label} variants={itemVariants}>
                <a
                  href={item.href}
                  onClick={toggleMenu}
                  className="text-4xl sm:text-5xl font-medium tracking-tight text-right block transition-colors duration-300 text-[var(--text-secondary)] hover:text-[var(--text-primary)] min-h-[44px] flex items-center justify-end"
                >
                  {item.label}
                </a>
              </motion.li>
            ))}

            <motion.li
              variants={itemVariants}
              className="pt-4 flex flex-col items-end gap-3"
            >
              <button
                onClick={() => {
                  toggleMenu();
                  onContactClick();
                }}
                className="group flex items-center gap-3 text-2xl font-semibold tracking-wide transition-colors whitespace-nowrap py-2 min-h-[44px] border-b-2 text-[var(--text-primary)] border-[var(--text-primary)]"
              >
                <span>{content.intro.cta}</span>
                <ArrowRight
                  size={24}
                  aria-hidden="true"
                  className="shrink-0 transition-transform group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </button>
            </motion.li>
          </motion.ul>
        </motion.nav>

        {/* =======================================
         * MOBILE TOGGLE BUTTON
         * ======================================= */}
        <button
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className={`fixed bottom-6 right-6 z-50 w-[56px] h-[56px] min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
            isOpen
              ? "bg-[var(--text-primary)] text-[var(--bg)] border-transparent shadow-md"
              : "bg-white/40 dark:bg-white/5 backdrop-blur-xl border-black/5 dark:border-white/10 text-[var(--text-primary)] shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={springSnappy}
              >
                <X size={28} aria-hidden="true" strokeWidth={2} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={springSnappy}
              >
                <Menu size={28} aria-hidden="true" strokeWidth={2} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </>
  );
};

export default BottomNav;
