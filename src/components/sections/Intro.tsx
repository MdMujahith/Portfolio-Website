"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { content } from "@/data/content";
import BackgroundFX from "@/components/ui/BackgroundFX";

interface IntroProps {
  onContactClick: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const Intro: React.FC<IntroProps> = ({ onContactClick }) => {
  const { headline, headlineHighlight, headlineSuffix, description, cta, specSheet } = content.intro;

  return (
    <section
      id="about"
      className="w-full py-20 md:py-28 relative z-10 overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg)" }}
      aria-labelledby="about-heading"
    >
      <BackgroundFX 
        bloomColor="primary" 
        bloomPosition="top-[-10%] left-[-10%] w-[50%] h-[50%]"
        pattern="grid"
        textureOpacity="medium"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
        <motion.p
          className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          01 // About
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          
          {/* LEFT: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 id="about-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.08] text-[var(--text-primary)] mb-6">
              {headline}<br />
              <span className="text-[var(--text-muted)]">{headlineHighlight}</span><br />
              {headlineSuffix}
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.8] text-[var(--text-secondary)] mb-10 max-w-lg">
              {description}
            </p>
            <button
              onClick={onContactClick}
              className="group inline-flex items-center gap-2 text-[14px] font-medium bg-[var(--text-primary)] text-[var(--bg)] rounded-full px-6 py-3 hover:opacity-80 transition-opacity"
            >
              {cta} 
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* RIGHT: Compacted Glass Spec Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            /* SHRUNK: Removed max-width and adjusted padding for a tighter fit */
            className="relative w-full lg:max-w-[450px] rounded-[1.25rem] border border-[var(--border-strong)] overflow-hidden shadow-lg bg-[var(--bg-elevated)]/30 backdrop-blur-3xl"
          >
            <div className="absolute inset-0 border-t border-white/20 rounded-[1.25rem] pointer-events-none" />
            
            {/* TIGHTENED: Reduced py-2 to py-1 and py-[20px] to py-4 */}
            <div className="flex flex-col px-6 py-2 divide-y divide-[var(--border-strong)]">
              {specSheet.map(({ label, value, sub, badge }, i) => (
                <div key={i} className="flex justify-between items-start py-4">
                  <span className="text-[12px] font-semibold text-[var(--text-muted)] tracking-widest uppercase mt-0.5 shrink-0">
                    {label}
                  </span>
                  
                  <div className="text-right pl-4">
                    <p className="text-[14px] font-semibold text-[var(--text-primary)]">
                      {value}
                    </p>
                    {sub && <p className="text-[12px] text-[var(--text-muted)] mt-1">{sub}</p>}
                    {badge && (
                      <span className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {badge.text}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Intro;