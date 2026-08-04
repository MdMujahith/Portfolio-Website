"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-[3px] w-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.08)" }}
    >
      <motion.div
        className="h-full w-full"
        style={{
          transformOrigin: "0% 50%",
          scaleX,
          background:
            "linear-gradient(90deg, var(--text-primary), rgba(255,255,255,0.95))",
          boxShadow: "0 0 18px rgba(255,255,255,0.22)",
        }}
      />
    </div>
  );
}
