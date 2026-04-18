"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Code, Cpu, Download, ChevronRight, X, LucideIcon } from "lucide-react";
import { resumeVersions } from "@/data/professional";

const iconMap: Record<string, LucideIcon> = { FileText, Code, Cpu };

export default function DynamicResumeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", checkMobile);
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
      {/* Trigger Button — dark on light, light on dark */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        whileTap={{ scale: 0.98 }}
        className={`
          w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 
          rounded-full font-semibold text-base md:text-lg shadow-lg
          transition-all duration-200 active:scale-95 border
          bg-zinc-900 text-white border-zinc-900
          hover:bg-zinc-700 hover:border-zinc-700
          dark:bg-white dark:text-zinc-900 dark:border-white
          dark:hover:bg-zinc-100 dark:hover:border-zinc-100
          ${isOpen ? "sm:ring-2 sm:ring-zinc-900/20 dark:sm:ring-white/20" : ""}
        `}
      >
        <Download size={20} aria-hidden="true" />
        <span>Download CV</span>
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={16} className="opacity-60 hidden sm:block" aria-hidden="true" />
        </motion.span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] sm:hidden"
              aria-hidden="true"
            />

            {/* Dropdown Panel */}
            <motion.div
              initial={isMobile ? { opacity: 0, scale: 0.9, y: 20 } : { opacity: 0, x: -10 }}
              animate={isMobile ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, x: 0 }}
              exit={isMobile ? { opacity: 0, scale: 0.95, y: 20 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              role="menu"
              className="
                fixed inset-0 z-[70] flex items-center justify-center p-4
                sm:p-0 sm:absolute sm:inset-auto
                sm:bottom-0 sm:left-full sm:ml-4 sm:flex sm:items-start
              "
            >
              <div className="
                w-full max-w-xs sm:w-72
                bg-white dark:bg-zinc-900
                border border-zinc-200 dark:border-white/10
                rounded-3xl sm:rounded-2xl shadow-2xl overflow-hidden
              ">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-white/5 sm:hidden">
                  <span className="text-sm font-bold text-zinc-400 dark:text-white/60 uppercase tracking-wider">
                    Select Resume
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 bg-zinc-100 dark:bg-white/10 rounded-full hover:bg-zinc-200 dark:hover:bg-white/20 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={16} className="text-zinc-700 dark:text-white" />
                  </button>
                </div>

                {/* Desktop Header */}
                <div className="hidden sm:block px-4 py-3 border-b border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-zinc-800/50">
                  <span className="text-[10px] font-bold text-zinc-400 dark:text-white/50 uppercase tracking-widest">
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
                        className="
                          group flex items-center gap-4 w-full p-3 rounded-xl text-left
                          hover:bg-zinc-100 dark:hover:bg-zinc-800
                          text-zinc-900 dark:text-white
                          transition-colors duration-150
                        "
                      >
                        <div className="
                          p-3 rounded-xl transition-colors duration-150
                          bg-zinc-100 dark:bg-zinc-800
                          text-zinc-500 dark:text-white/70
                          group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700
                          group-hover:text-zinc-900 dark:group-hover:text-white
                        ">
                          <IconComponent size={18} aria-hidden="true" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">
                            {version.label}
                          </span>
                          <span className="text-xs text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-500 dark:group-hover:text-zinc-400">
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