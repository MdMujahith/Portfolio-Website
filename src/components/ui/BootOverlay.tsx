"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { springSmooth } from "@/lib/motion";

const KeyCap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center justify-center min-w-[38px] h-10 px-3.5 mx-1.5 text-base font-semibold font-sans text-[#F5F5F7] bg-[#2C2C2E] rounded-lg border border-white/15 shadow-[0_4px_10px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-2px_2px_rgba(0,0,0,0.7)] align-middle select-none">
    {children}
  </span>
);

export const BootOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modifierKey, setModifierKey] = useState("Ctrl / ⌘");

  useEffect(() => {
    // Detect user OS after hydration to present accurate platform keyboard shortcut (Ctrl vs ⌘)
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(
      navigator.platform || navigator.userAgent || ""
    );
    setModifierKey(isMac ? "⌘" : "Ctrl");

    // Mount after hydration on initial site boot
    setIsVisible(true);

    // Hold visible for exactly 2.5 seconds, then gracefully transition out
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="boot-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-lg pointer-events-none p-6"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: -12 }}
            transition={springSmooth}
            className="text-center font-sans"
          >
            <p className="text-base sm:text-lg md:text-xl font-medium tracking-tight text-[#F5F5F7] drop-shadow-md select-none">
              Press <KeyCap>{modifierKey}</KeyCap> + <KeyCap>K</KeyCap> to open command palette
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootOverlay;
