"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Home, ArrowRight, Menu, X } from "lucide-react";

interface BottomNavProps {
  onContactClick: () => void;
}

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
] as const;

// Fortune 500 easing
const premiumEase = [0.16, 1, 0.3, 1] as const;

const BottomNav: React.FC<BottomNavProps> = ({ onContactClick }) => {
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

  // Circular reveal for the mobile menu background
  const sidebarVariants: Variants = {
    open: {
      clipPath: `circle(150% at calc(100% - 40px) calc(100% - 40px))`,
      transition: { type: "tween", ease: "circOut", duration: 0.5 },
    },
    closed: {
      clipPath: `circle(0px at calc(100% - 40px) calc(100% - 40px))`,
      transition: { type: "tween", ease: "circIn", duration: 0.4, delay: 0.1 },
    },
  };

  const itemVariants: Variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: premiumEase },
    },
    closed: {
      y: 20,
      opacity: 0,
      transition: { duration: 0.4, ease: premiumEase },
    },
  };

  const listVariants: Variants = {
    open: {
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
  };

  return (
    <>
      {/* =======================================
        * DESKTOP NAVIGATION: Universal Dark Glass
        * ======================================= */}
      <nav
        aria-label="Desktop Primary Navigation"
        className="hidden md:flex fixed bottom-8 left-1/2 transform -translate-x-1/2 w-auto h-[68px] rounded-full p-2 justify-between items-center z-50 overflow-hidden transition-all duration-300
        /* Universal Dark Transparent Glass */
        bg-black/70 backdrop-blur-2xl
        /* Bright specular edge highlight */
        border border-white/10
        /* Deep floating shadow */
        shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      >
        {/* TEXTURE: Subtle White Dots (Ghosted opacity) */}
        <div
          className="absolute inset-0 pointer-events-none -z-10 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />

        <a
          href="#home"
          aria-label="Go to Home"
          className="flex items-center justify-center w-[52px] h-full rounded-full transition-all duration-300 
          text-zinc-400 hover:text-white hover:bg-white/10"
        >
          <Home size={22} aria-hidden="true" strokeWidth={2.5} />
        </a>

        {/* Bigger, Bolder Links */}
        <div className="flex gap-1 h-full font-semibold px-3 text-[16px] tracking-tight">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="h-full rounded-full px-5 flex items-center transition-all duration-300
              text-zinc-400 hover:text-white hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button: Solid white for high contrast, bold text */}
        <button
          onClick={onContactClick}
          className="h-full rounded-full flex items-center px-7 gap-2 transition-transform duration-300 hover:scale-[1.02] active:scale-95 font-bold text-[16px] ml-2 whitespace-nowrap shadow-md
          bg-white text-black"
        >
          <span>Let&apos;s talk</span>
          <ArrowRight size={18} aria-hidden="true" className="shrink-0" strokeWidth={2.5} />
        </button>
      </nav>

      {/* =======================================
        * MOBILE NAVIGATION OVERLAY
        * ======================================= */}
      <div className="md:hidden">
        
        {/* The Overlay */}
        <motion.nav
          aria-label="Mobile Primary Navigation"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={sidebarVariants}
          aria-hidden={!isOpen}
          /* Universal Dark Transparent Background */
          className="fixed inset-0 z-40 flex flex-col justify-end items-end px-8 pb-32 transition-colors duration-300 bg-black/80 backdrop-blur-2xl"
        >
          {/* TEXTURE: Subtle White Dots for Full Screen */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* The Links */}
          <motion.ul
            variants={listVariants}
            className="flex flex-col gap-6 relative z-10 items-end"
          >
            <motion.li variants={itemVariants}>
              <a
                href="#home"
                onClick={toggleMenu}
                /* Bigger, Bolder Mobile Links */
                className="text-6xl sm:text-7xl font-bold tracking-tighter text-right block transition-colors duration-300
                text-zinc-500 hover:text-white"
              >
                Home
              </a>
            </motion.li>

            {NAV_LINKS.map((item) => (
              <motion.li key={item.label} variants={itemVariants}>
                <a
                  href={item.href}
                  onClick={toggleMenu}
                  /* Bigger, Bolder Mobile Links */
                  className="text-6xl sm:text-7xl font-bold tracking-tighter text-right block transition-colors duration-300
                  text-zinc-500 hover:text-white"
                >
                  {item.label}
                </a>
              </motion.li>
            ))}

            {/* Mobile Contact Button */}
            <motion.li variants={itemVariants} className="pt-8">
              <button
                onClick={() => {
                  toggleMenu();
                  onContactClick();
                }}
                className="group flex items-center gap-3 text-3xl font-bold tracking-tight transition-colors whitespace-nowrap pb-1 border-b-[3px]
                text-white border-white"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight size={28} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
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
          className={`fixed bottom-6 right-6 z-50 w-[64px] h-[64px] rounded-full flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 border ${
            isOpen 
              /* Open: High contrast solid white */
              ? "bg-white text-black border-transparent" 
              /* Closed: Universal Dark Transparent Glass */
              : "bg-black/70 backdrop-blur-2xl border-white/15 text-white"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={32} aria-hidden="true" strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={32} aria-hidden="true" strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

      </div>
    </>
  );
};

export default BottomNav;