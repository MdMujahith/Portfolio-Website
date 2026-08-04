"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { springSmooth } from "@/lib/motion";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full overflow-hidden bg-[var(--bg)] px-6 select-none font-sans">
      {/* =======================================
       * MASSIVE 404 WATERMARK (Google Sans Flex Variable Font Weight 900)
       * ======================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span
          className="text-[16rem] sm:text-[24rem] md:text-[34rem] lg:text-[44rem] tracking-tighter text-[var(--text-primary)] opacity-[0.03] dark:opacity-[0.04] select-none leading-none flex items-center justify-center"
          style={{ fontVariationSettings: "'wght' 900, 'opsz' 144" }}
        >
          404
        </span>
      </div>

      {/* =======================================
       * ULTRA-MINIMALIST FOREGROUND MESSAGE & CTA
       * ======================================= */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springSmooth}
        className="relative z-10 flex flex-col items-center gap-6 max-w-lg text-center"
      >
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text-primary)] drop-shadow-sm"
          style={{ fontVariationSettings: "'wght' 650" }}
        >
          This page is lost in the void.
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
          The link you followed may be corrupted, or this destination has evaporated into deep space.
        </p>

        <div className="pt-4">
          <Link href="/" tabIndex={-1}>
            <MagneticButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg)] font-medium text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              Return Home
            </MagneticButton>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}