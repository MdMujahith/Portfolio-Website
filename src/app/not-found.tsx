"use client";

import React, { useEffect, useState, useRef, memo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle, ChevronRight, Fingerprint } from "lucide-react";

/* =======================================
 * ISOLATED TERMINAL (Unchanged)
 * ======================================= */
const FakeTerminal = memo(() => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const errorMessages = [
      "[CRITICAL] ERR_ROUTER_MISSING // TRACE: 0x00A1B2",
      "MEMORY_SEGFAULT: ATTEMPTING TO READ NULL POINTER",
      "WARN: COMPONENT_TREE_UNRESPONSIVE",
      "[FATAL] DOM_STRUCTURE_COLLAPSE_DETECTED",
      "INITIATING_FAILSAFE_PROTOCOL...",
      "AWAITING_MANUAL_OVERRIDE...",
      "ERR: CONNECTION_TO_MAIN_SERVER_SEVERED",
      "SYS_HALT: 0x00000004_0x00000000",
    ];

    let count = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLogs = [...prev, errorMessages[Math.floor(Math.random() * errorMessages.length)]];
        if (newLogs.length > 20) newLogs.shift();
        return newLogs;
      });
      count++;
      if (count > 40) clearInterval(interval);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden p-4 sm:p-8 flex flex-col justify-end">
      <div className="font-mono text-[10px] sm:text-xs text-red-500 leading-tight">
        {logs.map((log, i) => (
          <div key={i} className="mb-1 animate-fade-in-fast">
            <span className="text-red-700">{">"}</span> {log}
          </div>
        ))}
      </div>
    </div>
  );
});
FakeTerminal.displayName = "FakeTerminal";

export default function NotFound() {
  const router = useRouter();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [isRebooting, setIsRebooting] = useState(false);
  const [dragDistance, setDragDistance] = useState(0); 

  // 👉 DYNAMIC RESPONSIVE MATH: Calculates exact slider distance based on the actual screen 
  useEffect(() => {
    const calculateDistance = () => {
      if (trackRef.current) {
        // Track width minus the handle width (approx 64px + padding)
        setDragDistance(trackRef.current.offsetWidth - 75);
      }
    };
    
    calculateDistance();
    window.addEventListener("resize", calculateDistance, { passive: true });
    return () => window.removeEventListener("resize", calculateDistance);
  }, []);

  const handleReboot = (event: any, info: any) => {
    // Triggers if they drag it 80% of the way across, no matter the screen size
    if (info.offset.x > dragDistance * 0.8) {
      setIsRebooting(true);
      setTimeout(() => router.push("/"), 600);
    }
  };

  return (
    <div 
      ref={constraintsRef}
      className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full overflow-hidden bg-[#050505] selection:bg-red-500/30 px-4"
    >
      <FakeTerminal />

      <div 
        className="absolute inset-0 z-0 bg-red-500/10 mix-blend-overlay pointer-events-none animate-pulse" 
        style={{ animationDuration: '3s' }}
      />

      {/* =======================================
        * DRAGGABLE 404 BLOCKS (Mobile Optimized & Hydration Safe)
        * ======================================= */}
      <div className="relative z-10 flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-6 md:gap-8 mt-[-8vh]">
        {["4", "0", "4"].map((digit, index) => {
          // 👉 NEW: Hardcoded rotations instead of Math.random() so SSR matches Client perfectly
          const initialRotations = [-8, 12, -5]; 

          return (
            <motion.div
              key={index}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.4}
              dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
              /* 👉 NEW: Hardcoded hover/drag rotations based on index */
              whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 50, rotate: index === 1 ? -5 : 5 }}
              whileHover={{ scale: 1.05 }}
              initial={{ y: -100, opacity: 0, rotate: initialRotations[index] }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.1 }}
              className="flex items-center justify-center w-[28vw] h-[35vw] sm:w-[160px] sm:h-[220px] md:w-[220px] md:h-[280px] max-w-[220px] rounded-2xl sm:rounded-3xl border border-red-500/20 shadow-2xl cursor-grab touch-none"
              style={{ 
                background: "linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.8)"
              }}
            >
              <span 
                className="text-[22vw] sm:text-[140px] md:text-[180px] font-black tracking-tighter"
                style={{
                  background: "linear-gradient(to bottom, #ffffff, #666666)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {digit}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* CONTEXT CLUE */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 flex items-center gap-2 sm:gap-3 mt-10 mb-8 bg-red-500/10 border border-red-500/20 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-red-400 max-w-full"
      >
        <AlertTriangle size={16} className="animate-pulse shrink-0" />
        <span className="text-[10px] sm:text-sm font-mono tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
          SYSTEM INTEGRITY COMPROMISED
        </span>
      </motion.div>

      {/* =======================================
        * EMERGENCY OVERRIDE SLIDING SWITCH
        * ======================================= */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
        className="relative z-10 w-full max-w-[400px] px-2 sm:px-0"
      >
        <div 
          ref={trackRef} // 👉 NEW: Ref to dynamically measure track width
          className="relative flex items-center h-16 sm:h-20 w-full rounded-full border shadow-inner overflow-hidden"
          style={{ background: "#111", borderColor: "#333" }}
        >
          <div className="absolute w-full text-center flex items-center justify-center pl-12 sm:pl-16 pointer-events-none">
            <span 
              className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.2em] font-mono"
              style={{ color: isRebooting ? "#10b981" : "#666" }}
            >
              {isRebooting ? "REBOOTING..." : "SLIDE TO REBOOT"}
            </span>
          </div>

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: dragDistance }} 
            dragElastic={0.05}
            onDragEnd={handleReboot}
            animate={{ x: isRebooting ? dragDistance : 0 }} 
            className="absolute left-1.5 sm:left-2 flex items-center justify-center w-13 h-13 sm:w-16 sm:h-16 rounded-full cursor-grab active:cursor-grabbing border z-20 touch-none"
            style={{ 
              width: "calc(100% - 10px)", // Fallback if height fails
              maxWidth: "52px",
              height: "52px",
              background: isRebooting ? "#10b981" : "#fff",
              borderColor: "rgba(0,0,0,0.1)",
            }}
          >
            {isRebooting ? (
              <Fingerprint size={20} className="text-white animate-pulse" />
            ) : (
              <ChevronRight size={24} className="text-black ml-0.5" strokeWidth={3} />
            )}
          </motion.div>

          <motion.div 
            className="absolute left-0 h-full bg-emerald-500/20 z-10 pointer-events-none"
            animate={{ width: isRebooting ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  );
}