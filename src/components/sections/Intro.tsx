"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Briefcase, Zap, ArrowUpRight, LucideIcon } from "lucide-react";
import { content } from "@/data/content";

interface IntroProps {
  onContactClick: () => void;
}

const iconMap: Record<string, LucideIcon> = { Code, Briefcase, Zap };

const Intro: React.FC<IntroProps> = ({ onContactClick }) => {
  return (
    <section
      id="about"
      className="w-full py-20 overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg)" }}
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          <div className="lg:sticky top-0 lg:h-screen flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full"
            >
              <h2
                id="about-heading"
                className="text-5xl sm:text-6xl md:text-8xl font-semibold tracking-tighter leading-none text-center lg:text-left"
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

          <motion.div
            className="flex flex-col gap-12 lg:pt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div
              className="text-left"
              variants={{
                hidden:  { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
              }}
            >
              <h3
                className="text-xl sm:text-2xl font-semibold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                {content.intro.subheadline}
              </h3>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {content.intro.description}
              </p>
              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-2 text-base sm:text-lg font-semibold mt-6 transition-colors group"
                style={{ color: "var(--accent-text)" }}
                aria-label="Open contact form"
              >
                {content.intro.cta}
                <ArrowUpRight
                  size={20}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </button>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4"
              variants={{
                hidden:  { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
              }}
              role="list"
            >
              {content.intro.cards.map((card, index) => {
                const IconComponent = iconMap[card.icon] || Zap;
                return (
                  <article
                    key={index}
                    className="flex items-start gap-4 sm:gap-6 p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200"
                    style={{
                      background:   "var(--bg-elevated)",
                      borderColor:  "var(--border)",
                    }}
                    role="listitem"
                  >
                    <IconComponent
                      size={36}
                      className="mt-1 flex-shrink-0"
                      style={{ color: "var(--accent)" }}
                      aria-hidden="true"
                    />
                    <div>
                      <h4
                        className="text-lg sm:text-xl font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {card.title}
                      </h4>
                      <p
                        className="mt-1 text-sm sm:text-base"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {card.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Intro;