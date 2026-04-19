"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Code, Cpu, Download, ChevronRight, X, LucideIcon } from "lucide-react";
import { resumeVersions } from "@/data/professional";

const iconMap: Record<string, LucideIcon> = { FileText, Code, Cpu };

// Fortune 500 easing
const premiumEase = [0.16, 1, 0.3, 1] as const;

export default function DynamicResumeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click Outside Handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDownload = (fileUrl: string) => {
    setIsOpen(false);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop() || "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${isOpen ? "z-50" : "z-10"}`}
    >
      {/* =======================================
        * TRIGGER BUTTON: Inverted Theme Pill
        * ======================================= */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        whileTap={{ scale: 0.96 }}
        className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-semibold text-[15px] md:text-[16px] shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-transparent"
        style={{ 
          background: "var(--text-primary)", 
          color: "var(--bg)",
          /* Subtle glow when open */
          boxShadow: isOpen ? "0 0 0 4px var(--border)" : ""
        }}
      >
        <Download size={18} aria-hidden="true" />
        <span>Download CV</span>
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2, ease: premiumEase }}
        >
          <ChevronRight size={16} className="opacity-70 hidden sm:block" aria-hidden="true" />
        </motion.span>
      </motion.button>

      {/* =======================================
        * DROPDOWN MENU
        * ======================================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop (CSS handles visibility) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] sm:hidden backdrop-blur-sm"
              style={{ background: "rgba(0,0,0,0.5)" }}
              aria-hidden="true"
            />

            {/* Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: -15 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -15 }}
              transition={{ duration: 0.2, ease: premiumEase }}
              role="menu"
              className="
                fixed inset-0 z-[70] flex items-center justify-center p-6
                sm:p-0 sm:absolute sm:inset-auto 
                sm:left-full sm:ml-5 sm:flex sm:items-start
                /* 👇 CHANGED: Shifts the menu higher up 👇 */
                sm:top-1/4 sm:-translate-y-[80%] 
              "
            >
              <div 
                className="w-full max-w-xs sm:w-72 rounded-[1.5rem] shadow-[0_12px_40px_rgba(0,0,0,0.15)] overflow-hidden border"
                style={{ 
                  background: "var(--bg-elevated)", 
                  borderColor: "var(--border-strong)" 
                }}
              >
                
                {/* Mobile Header */}
                <div 
                  className="flex items-center justify-between p-5 border-b sm:hidden"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    Select Resume
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full transition-colors active:scale-95"
                    style={{ background: "var(--bg-subtle)", color: "var(--text-primary)" }}
                    aria-label="Close menu"
                  >
                    <X size={16} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Desktop Header */}
                <div 
                  className="hidden sm:block px-5 py-3.5 border-b"
                  style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                    Select Version
                  </span>
                </div>

                {/* Options */}
                <div className="p-2 flex flex-col gap-1">
                  {resumeVersions.map((version) => {
                    const IconComponent = iconMap[version.icon] || FileText;
                    return (
                      <button
                        key={version.id}
                        role="menuitem"
                        onClick={() => handleDownload(version.file)}
                        className="group flex items-center gap-4 w-full p-3.5 rounded-[1rem] text-left transition-all duration-200"
                        /* Hover uses CSS pseudo-classes combined with CSS variables */
                        style={{ color: "var(--text-primary)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-subtle)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                      >
                        {/* Icon Wrapper */}
                        <div 
                          className="p-3 rounded-[0.85rem] transition-colors duration-200 border"
                          style={{ 
                            background: "var(--bg)", 
                            borderColor: "var(--border)",
                            color: "var(--text-secondary)" 
                          }}
                        >
                          <IconComponent size={18} aria-hidden="true" className="group-hover:text-[var(--text-primary)] transition-colors" />
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-[14px] font-semibold tracking-tight">
                            {version.label}
                          </span>
                          <span className="text-[12px] mt-0.5 transition-colors" style={{ color: "var(--text-muted)" }}>
                            {version.sub}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}