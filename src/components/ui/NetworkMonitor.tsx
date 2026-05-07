"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, Wifi, Loader2 } from "lucide-react";

export default function NetworkMonitor() {
  const [isOnline, setIsOnline] = useState(true);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    // Check initial status
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
    }

    const handleOffline = () => {
      setIsOnline(false);
      setShowRestored(false);
    };

    const handleOnline = () => {
      setIsOnline(true);
      setShowRestored(true);
      
      // Hide the "Restored" success message after 3 seconds
      setTimeout(() => {
        setShowRestored(false);
      }, 3000);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  // Don't render anything if we're online and not showing the success state
  if (isOnline && !showRestored) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none px-4">
      <AnimatePresence mode="wait">
        {!isOnline ? (
          /* =======================================
           * OFFLINE STATE (Amber Warning)
           * ======================================= */
          <motion.div
            key="offline"
            initial={{ y: -50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center gap-3 px-5 py-3 rounded-full border shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl"
            style={{ 
              background: "rgba(20, 20, 20, 0.8)", // Deep dark glass
              borderColor: "rgba(245, 158, 11, 0.2)", // Subtle amber border
            }}
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10">
              <WifiOff size={16} className="text-amber-500" />
              {/* Ping animation behind the icon */}
              <span className="absolute inset-0 rounded-full border border-amber-500/30 animate-ping" style={{ animationDuration: '2s' }}></span>
            </div>
            
            <div className="flex flex-col pr-2">
              <span className="text-[13px] font-semibold text-white tracking-wide">
                Signal Lost
              </span>
              <span className="text-[11px] text-amber-500/80 flex items-center gap-1.5 mt-0.5 font-mono uppercase tracking-wider">
                <Loader2 size={10} className="animate-spin" />
                Awaiting Connection...
              </span>
            </div>
          </motion.div>
        ) : showRestored ? (
          /* =======================================
           * RESTORED STATE (Emerald Success)
           * ======================================= */
          <motion.div
            key="online"
            initial={{ y: -20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center gap-3 px-5 py-3 rounded-full border shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl"
            style={{ 
              background: "rgba(20, 20, 20, 0.8)",
              borderColor: "rgba(16, 185, 129, 0.2)",
            }}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10">
              <Wifi size={16} className="text-emerald-500" />
            </div>
            
            <div className="flex flex-col pr-2">
              <span className="text-[13px] font-semibold text-white tracking-wide">
                Connection Restored
              </span>
              <span className="text-[11px] text-emerald-500/80 mt-0.5 font-mono uppercase tracking-wider">
                Systems Online
              </span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}