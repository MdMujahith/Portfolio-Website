"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <div className="w-14 h-8" aria-hidden="true" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="relative flex items-center w-14 h-8 rounded-full p-1 transition-colors duration-500 focus:outline-none"
      style={{ 
        // The Track: Keeps the stealthy look to let the thumb pop
        background: isDark ? "#111111" : "#e5e5e5", 
        border: isDark ? "1px solid #2a2a2a" : "1px solid #d4d4d4",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
      }}
    >
      {/* =======================================
        * THE TRACK ICONS 
        * ======================================= */}
      <div className="absolute inset-0 w-full flex items-center justify-between px-2.5 pointer-events-none">
        <Sun 
          size={12} 
          strokeWidth={2.5}
          className="transition-opacity duration-300" 
          style={{ color: "#888", opacity: isDark ? 0.5 : 0 }} 
        />
        <Moon 
          size={12} 
          strokeWidth={2.5}
          className="transition-opacity duration-300" 
          style={{ color: "#888", opacity: isDark ? 0 : 0.5 }} 
        />
      </div>

      {/* =======================================
        * THE HIGH-CONTRAST THUMB
        * ======================================= */}
      <div
        className="z-10 flex items-center justify-center w-6 h-6 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ 
          // 👇 THE FLIP: Pure white in Dark Mode, Carbon Black in Light Mode
          background: isDark ? "#ffffff" : "#18181b",
          
          // Shadows dynamically flip so the black thumb has an inner Apple-glow, and white thumb drops a shadow
          boxShadow: isDark 
            ? "0 2px 6px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.05)" 
            : "inset 0 1px 1px rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.3)",
            
          border: isDark ? "1px solid #e5e5e5" : "1px solid #27272a",
          transform: `translateX(${isDark ? '24px' : '0px'})`
        }}
      >
        {/* 👇 THE ICONS FLIP TOO: Dark icon on White thumb, White icon on Dark thumb */}
        {isDark ? (
          <Moon size={12} strokeWidth={2.5} style={{ color: "#18181b", fill: "#18181b" }} />
        ) : (
          <Sun size={12} strokeWidth={2.5} style={{ color: "#ffffff", fill: "#ffffff" }} />
        )}
      </div>
    </button>
  );
}