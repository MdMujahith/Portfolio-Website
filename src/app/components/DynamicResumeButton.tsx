"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Code, Cpu, Download, ChevronDown } from "lucide-react";

export default function DynamicResumeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. EDIT THIS: Add your actual PDF paths here
  const resumeVersions = [
    { id: "full", label: "Full Resume", icon: <FileText size={16} />, file: "/pdf/Mujahith_Resume.pdf" },
    { id: "frontend", label: "Frontend Dev", icon: <Code size={16} />, file: "/pdf/Mujahith_Frontend.pdf" },
    { id: "backend", label: "Backend/AI", icon: <Cpu size={16} />, file: "/pdf/Mujahith_Backend.pdf" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownload = (fileUrl: string) => {
    setIsOpen(false);
    // Trigger download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop() || 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full sm:w-auto z-50" ref={containerRef}>
      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 
        bg-zinc-800 text-white rounded-full font-semibold text-base md:text-lg 
        hover:bg-zinc-700 transition-all shadow-lg active:scale-95
        ${isOpen ? "ring-2 ring-white/20 bg-zinc-700" : ""}`}
        whileTap={{ scale: 0.98 }}
      >
        <Download size={20} />
        <span>Download CV</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="opacity-60" />
        </motion.span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 12, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full sm:w-64 p-2 
            bg-zinc-900/90 backdrop-blur-xl border border-white/10 
            rounded-2xl shadow-2xl flex flex-col gap-1 overflow-hidden"
          >
            <div className="px-3 py-2 text-xs font-bold text-white/40 uppercase tracking-wider">
              Select Version
            </div>
            
            {resumeVersions.map((version) => (
              <button
                key={version.id}
                onClick={() => handleDownload(version.file)}
                className="flex items-center gap-3 w-full p-3 rounded-xl 
                hover:bg-white/10 text-white text-left transition-colors group"
              >
                <div className="p-2 bg-zinc-800 rounded-lg text-white/70 group-hover:text-white group-hover:bg-zinc-700 transition-colors">
                  {version.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{version.label}</span>
                  <span className="text-[10px] text-white/40">PDF • 1.2MB</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}