"use client"; // Needed for Framer Motion in Next.js App Router

import { motion } from "framer-motion";

interface MotionBoxProps {
  label: string;
  color: string;
}

export default function MotionBox({ label, color }: MotionBoxProps) {
  return (
    <motion.div
      className={`w-32 h-32 rounded-lg flex items-center justify-center text-white font-bold ${color}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.2 }}
    >
      {label}
    </motion.div>
  );
}