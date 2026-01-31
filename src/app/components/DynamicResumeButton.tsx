"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Code, Cpu, Download, ChevronRight, X } from "lucide-react";

export default function DynamicResumeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Resume Configurations
  const resumeVersions = [
    {
      id: "full",
      label: "Full Resume",
      sub: "For general roles",
      icon: <FileText size={18} />,
      file: "/pdf/Mujahith_Resume.pdf",
    },
    {
      id: "frontend",
      label: "Frontend Developer",
      sub: "React, Next.js, UI/UX",
      icon: <Code size={18} />,
      file: "/pdf/Mujahith_Frontend.pdf",
    },
    {
      id: "backend",
      label: "Backend & AI",
      sub: "Python, Node, ML",
      icon: <Cpu size={18} />,
      file: "/pdf/Mujahith_Backend.pdf",
    },
  ];

  // Handle Resize & Click Outside
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
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
      /* ✅ FIX: Only apply high z-index when the menu is actually OPEN. 
         Otherwise, use z-10 so the Main Mobile Menu can cover it. */
      className={`relative ${isOpen ? "z-50" : "z-10"}`}
    >
      {/* --- Main Trigger Button --- */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 
        bg-zinc-800 text-white rounded-full font-semibold text-base md:text-lg 
        hover:bg-zinc-700 transition-all shadow-lg active:scale-95 border border-transparent
        ${isOpen ? "sm:ring-2 sm:ring-white/20 sm:bg-zinc-700 relative" : ""}`}
        whileTap={{ scale: 0.98 }}
      >
        <Download size={20} />
        <span>Download CV</span>
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={16} className="opacity-60 hidden sm:block" />
        </motion.span>
      </motion.button>

      {/* --- Dropdown / Modal Area --- */}
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
            />

            {/* Content Container */}
            <motion.div
              initial={
                isMobile
                  ? { opacity: 0, scale: 0.9, y: 20 }
                  : { opacity: 0, x: -10 }
              }
              animate={
                isMobile ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, x: 0 }
              }
              exit={
                isMobile
                  ? { opacity: 0, scale: 0.95, y: 20 }
                  : { opacity: 0, x: -10 }
              }
              transition={{ duration: 0.2, ease: "easeOut" }}
              // CSS Positioning
              className="
                fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-0
                sm:absolute sm:inset-auto 
                sm:bottom-0              /* ALIGNS BOTTOM EDGE */
                sm:left-full sm:ml-4 sm:flex sm:items-start
              "
            >
              <div
                className="
                w-full max-w-xs sm:w-72 
                bg-zinc-900 border border-white/10 
                rounded-3xl sm:rounded-2xl shadow-2xl overflow-hidden
              "
              >
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5 sm:hidden">
                  <span className="text-sm font-bold text-white/60 uppercase tracking-wider">
                    Select Resume
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 bg-white/10 rounded-full"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>

                {/* Desktop Header */}
                <div className="hidden sm:block px-4 py-3 border-b border-white/5 bg-zinc-800/50">
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                    Select Version
                  </span>
                </div>

                {/* Options List */}
                <div className="p-2 flex flex-col gap-1">
                  {resumeVersions.map((version) => (
                    <button
                      key={version.id}
                      onClick={() => handleDownload(version.file)}
                      className="group flex items-center gap-4 w-full p-3 rounded-xl 
                      hover:bg-zinc-800 text-white text-left transition-colors active:scale-98"
                    >
                      <div className="p-3 bg-zinc-800 rounded-xl text-white/70 group-hover:text-white group-hover:bg-zinc-700 transition-colors">
                        {version.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold group-hover:text-white transition-colors">
                          {version.label}
                        </span>
                        <span className="text-xs text-zinc-500 group-hover:text-zinc-400">
                          {version.sub}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
