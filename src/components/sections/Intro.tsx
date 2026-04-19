"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Briefcase, Zap, ArrowUpRight, LucideIcon } from "lucide-react";
import { content } from "@/data/content";

interface IntroProps {
  onContactClick: () => void;
}

const iconMap: Record<string, LucideIcon> = { Code, Briefcase, Zap };

// Fortune 500 easing: deliberate, smooth, no bounce.
const premiumEase = [0.16, 1, 0.3, 1] as const;

const Intro: React.FC<IntroProps> = ({ onContactClick }) => {
  return (
    <section
      id="about"
      /* Tightened spacing: 
         Mobile gets pt-12, Tablet gets pt-20, Desktop gets pt-24. 
         This eliminates the massive dead space at the top. */
      className="w-full pt-12 pb-20 md:pt-20 md:pb-32 lg:pt-24 lg:pb-40 overflow-hidden transition-colors duration-300 relative z-10"
      style={{ background: "var(--bg)" }}
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
        {/* Responsive Grid Gap: 40px on mobile, 64px on tablet, 80px on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-20 items-start">

          {/* =======================================
            * LEFT COLUMN: Editorial Sticky Headline
            * ======================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: premiumEase }}
            >
              <p className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-[var(--text-muted)] mb-4 md:mb-6 lg:mb-8">
                01 // Introduction
              </p>
              
              <h2
                id="about-heading"
                className="text-6xl sm:text-6xl md:text-7xl font-semibold tracking-tighter leading-[1.1]"
                style={{ color: "var(--text-primary)" }}
              >
                {content.intro.headline.split('\n').map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>
            </motion.div>
          </div>

          {/* =======================================
            * RIGHT COLUMN: Flowing Content & Soft Cards
            * ======================================= */}
          <div className="lg:col-span-7 flex flex-col gap-12 md:gap-16 lg:pt-2">
            
            {/* Bio Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: premiumEase, delay: 0.1 }}
              className="text-left"
            >
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight mb-4 md:mb-5 text-[var(--text-primary)]">
                {content.intro.subheadline}
              </h3>
              <p className="text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed text-[var(--text-secondary)] mb-6 md:mb-8">
                {content.intro.description}
              </p>
              
              <button
                onClick={onContactClick}
                className="group inline-flex items-center gap-2 text-[14px] md:text-[15px] font-medium transition-colors border-b border-[var(--border-strong)] hover:border-[var(--text-primary)] pb-1"
                style={{ color: "var(--text-primary)" }}
                aria-label="Open contact form"
              >
                {content.intro.cta}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </motion.div>

            {/* Apple-Style Soft Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1, 
                  transition: { staggerChildren: 0.15, ease: premiumEase } 
                },
              }}
              role="list"
            >
              {content.intro.cards.map((card, index) => {
                const IconComponent = iconMap[card.icon] || Zap;
                
                // First card spans full width if odd number of cards
                const isFullWidth = content.intro.cards.length % 2 !== 0 && index === 0;

                return (
                  <motion.article
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEase } },
                    }}
                    /* Responsive padding: p-6 on mobile, p-8 on tablet/desktop */
                    className={`group relative flex flex-col items-start p-6 md:p-8 rounded-[1.5rem] bg-[var(--bg-elevated)] border border-[var(--border-strong)] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden ${isFullWidth ? 'sm:col-span-2 sm:flex-row sm:items-center sm:gap-6 md:gap-8' : ''}`}
                    role="listitem"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--text-primary)] to-transparent opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none" />

                    {/* Responsive icon sizing */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-[var(--bg-subtle)] border border-[var(--border-strong)] mb-4 sm:mb-0 sm:shrink-0 group-hover:scale-110 transition-transform duration-500 ease-out">
                      <IconComponent
                        size={18}
                        className="text-[var(--text-primary)] md:w-5 md:h-5"
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <h4 className="text-[16px] md:text-[17px] font-semibold tracking-tight text-[var(--text-primary)] mb-1.5 md:mb-2">
                        {card.title}
                      </h4>
                      <p className="text-[13px] md:text-[14px] leading-relaxed text-[var(--text-secondary)]">
                        {card.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;