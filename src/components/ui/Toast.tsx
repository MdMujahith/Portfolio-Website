"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info"; // Matches the type="success" you passed
  onClose: () => void;                 // Matches the onClose={() => setShowToast(false)}
}

const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose }) => {
  // Automatically close the toast after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Cleanup the timer if the component unmounts early
    return () => clearTimeout(timer);
  }, [onClose]);

  // Optional: Change the background color dynamically based on the 'type' prop
  const bgColor = 
    type === "error" ? "bg-red-600" : 
    type === "info" ? "bg-blue-600" : 
    "bg-green-600"; // default success color

  return (
    <motion.div
      className={`fixed top-6 left-1/2 -translate-x-1/2 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-[60]`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-center space-x-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {/* Change icon slightly if it's an error, otherwise show the checkmark */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={type === "error" ? "M6 18L18 6M6 6l12 12" : "M5 13l4 4L19 7"}
          />
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    </motion.div>
  );
};

export default Toast;