"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  
  // Maintain the exact dimensions of the toggle to prevent layout shift during load
  if (!mounted) return <div className="w-14 h-8" aria-hidden="true" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="relative flex items-center w-14 h-8 rounded-full p-1 transition-all duration-300 border shadow-inner active:scale-95"
      style={{ 
        background: "var(--bg-elevated)", 
        borderColor: "var(--border-strong)" 
      }}
    >
      {/* Background Track Icons (Subtle) */}
      <div className="absolute inset-0 w-full flex items-center justify-between px-2 pointer-events-none">
        <Sun size={12} className="opacity-40" style={{ color: "var(--text-primary)" }} />
        <Moon size={12} className="opacity-40" style={{ color: "var(--text-primary)" }} />
      </div>

      {/* The Sliding Thumb */}
      <motion.div
        layout
        // High-end spring physics: fast but heavily damped so it doesn't bounce wildly
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="z-10 flex items-center justify-center w-6 h-6 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
        style={{ background: "var(--text-primary)" }}
        // Moves exactly 24px to the right when dark mode is active
        animate={{ x: isDark ? 24 : 0 }}
      >
        {/* Active Icon inside the thumb */}
        <motion.div
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon size={12} style={{ color: "var(--bg)", fill: "var(--bg)" }} />
          ) : (
            <Sun size={12} style={{ color: "var(--bg)", fill: "var(--bg)" }} />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}