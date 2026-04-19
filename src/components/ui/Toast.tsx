//Toast.tsx
"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

const BG: Record<NonNullable<ToastProps["type"]>, string> = {
  success: "var(--success)",
  error:   "var(--error)",
  info:    "var(--accent)",
};

const ICON: Record<NonNullable<ToastProps["type"]>, string> = {
  success: "M5 13l4 4L19 7",
  error:   "M6 18L18 6M6 6l12 12",
  info:    "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 px-5 py-3 rounded-full shadow-lg"
      style={{ background: BG[type], color: "#ffffff" }}
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      role="status"
      aria-live="polite"
    >
      <svg width="16" height="16" fill="none" stroke="currentColor"
        viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}>
        <path d={ICON[type]} />
      </svg>
      <span className="text-sm font-medium">{message}</span>
    </motion.div>
  );
};

export default Toast;