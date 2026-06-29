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
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

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
      y: 15,
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
        * DESKTOP NAVIGATION
        * ======================================= */}
      <nav
        aria-label="Desktop Primary Navigation"
        /* Reverted to 64px for better proportions, fixed alignment */
        className="hidden md:flex fixed bottom-8 left-1/2 transform -translate-x-1/2 w-auto h-[64px] rounded-full p-2 justify-between items-center z-50 overflow-hidden transition-all duration-300
        bg-black/70 backdrop-blur-2xl
        border border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
      >
        <div
          className="absolute inset-0 pointer-events-none -z-10 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />

        <a
          href="#home"
          aria-label="Go to Home"
          /* Replaced h-full with strict w/h dimensions for perfect centering */
          className="flex items-center justify-center w-[44px] h-[44px] rounded-full transition-colors duration-300 
          text-white/60 hover:text-white hover:bg-white/10"
        >
          <Home size={20} aria-hidden="true" strokeWidth={2} />
        </a>

        {/* Replaced h-full with proper flex alignment */}
        <div className="flex items-center gap-1 px-3">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              /* Added explicit py-2 px-4 instead of h-full */
              className="rounded-full py-2 px-4 flex items-center justify-center transition-colors duration-300
              text-[14px] font-medium tracking-wide text-white/60 hover:text-white hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button: Added py-2.5 and items-center/justify-center to guarantee internal alignment */}
        <button
          onClick={onContactClick}
          className="rounded-full flex items-center justify-center py-2.5 px-6 gap-2 transition-transform duration-300 hover:scale-[1.02] active:scale-95 font-semibold text-[14px] ml-2 whitespace-nowrap
          bg-white text-black shadow-sm"
        >
          <span>Let&apos;s talk</span>
          <ArrowRight size={16} aria-hidden="true" className="shrink-0" strokeWidth={2} />
        </button>
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
          className="fixed inset-0 z-40 flex flex-col justify-end items-end px-8 pb-32 transition-colors duration-300 bg-black/80 backdrop-blur-2xl"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1.5px, transparent 1.5px)",
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
                className="text-4xl sm:text-5xl font-medium tracking-tight text-right block transition-colors duration-300
                text-white/50 hover:text-white"
              >
                Home
              </a>
            </motion.li>

            {NAV_LINKS.map((item) => (
              <motion.li key={item.label} variants={itemVariants}>
                <a
                  href={item.href}
                  onClick={toggleMenu}
                  className="text-4xl sm:text-5xl font-medium tracking-tight text-right block transition-colors duration-300
                  text-white/50 hover:text-white"
                >
                  {item.label}
                </a>
              </motion.li>
            ))}

            <motion.li variants={itemVariants} className="pt-6">
              <button
                onClick={() => {
                  toggleMenu();
                  onContactClick();
                }}
                className="group flex items-center gap-3 text-2xl font-semibold tracking-wide transition-colors whitespace-nowrap pb-1 border-b-2
                text-white border-white"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight size={24} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2} />
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
          className={`fixed bottom-6 right-6 z-50 w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border ${
            isOpen 
              ? "bg-white text-black border-transparent shadow-md" 
              : "bg-black/70 backdrop-blur-2xl border-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
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
                <X size={28} aria-hidden="true" strokeWidth={2} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
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