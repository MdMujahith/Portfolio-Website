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

  const sidebarVariants: Variants = {
    open: {
      clipPath: `circle(150% at calc(100% - 40px) calc(100% - 40px))`,
      transition: { type: "tween", ease: "circOut", duration: 0.4 },
    },
    closed: {
      clipPath: `circle(0px at calc(100% - 40px) calc(100% - 40px))`,
      transition: { type: "tween", ease: "circIn", duration: 0.3, delay: 0.1 },
    },
  };

  const itemVariants: Variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { y: { stiffness: 1000, velocity: -100 } },
    },
    closed: {
      y: 20,
      opacity: 0,
      transition: { y: { stiffness: 1000 } },
    },
  };

  const listVariants: Variants = {
    open: {
      transition: { staggerChildren: 0.04, delayChildren: 0.1 },
    },
    closed: {
      transition: { staggerChildren: 0.02, staggerDirection: -1 },
    },
  };

  return (
    <>
      {/* --- Desktop Navigation --- */}
      <nav
        aria-label="Desktop Primary Navigation"
        className="hidden md:flex fixed bottom-6 left-1/2 transform -translate-x-1/2 w-auto h-16 rounded-full p-2 justify-between items-center bg-black/80 dark:bg-zinc-900/90 backdrop-blur-xl border border-white/10 dark:border-white/5 text-base text-white z-50 shadow-2xl bottom-nav"
      >
        <a
          href="#home"
          aria-label="Go to Home"
          className="flex items-center justify-center w-14 h-full rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
        >
          <Home size={20} aria-hidden="true" />
        </a>

        <div className="flex gap-2 h-full font-semibold px-2">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="h-full rounded-full px-4 flex items-center hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={onContactClick}
          className="bg-white text-black h-full rounded-full flex items-center px-6 gap-2 transition hover:scale-105 active:scale-95 font-semibold ml-1 whitespace-nowrap hover:bg-zinc-100"
        >
          <span>Let&apos;s talk</span>
          <ArrowRight size={16} aria-hidden="true" className="shrink-0" />
        </button>
      </nav>

      {/* --- Mobile Navigation --- */}
      <div className="md:hidden">
        {/* The Overlay */}
        <motion.nav
          aria-label="Mobile Primary Navigation"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={sidebarVariants}
          aria-hidden={!isOpen}
          className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col justify-end items-end px-8 pb-32"
        >
          {/* Background Texture */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
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
                className="text-5xl font-semibold text-white/50 hover:text-white transition-colors tracking-tight text-right block"
              >
                Home
              </a>
            </motion.li>

            {NAV_LINKS.map((item) => (
              <motion.li key={item.label} variants={itemVariants}>
                <a
                  href={item.href}
                  onClick={toggleMenu}
                  className="text-5xl font-semibold text-white/50 hover:text-white transition-colors tracking-tight text-right block"
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
                className="flex items-center gap-3 text-xl font-semibold text-white hover:text-blue-400 transition-colors whitespace-nowrap"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight size={24} aria-hidden="true" className="shrink-0" />
              </button>
            </motion.li>
          </motion.ul>
        </motion.nav>

        {/* Toggle Button */}
        <button
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-200 ${
            isOpen
              ? "bg-white text-black"
              : "bg-zinc-900 text-white border border-white/10 dark:bg-zinc-800 dark:border-white/5"
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
                <X size={28} aria-hidden="true" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={28} aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </>
  );
};

export default BottomNav;