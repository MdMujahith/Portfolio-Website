"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Briefcase, Zap, ArrowUpRight, LucideIcon } from "lucide-react";
import { content } from "@/data/content";

// Define the props the component will receive
interface IntroProps {
  onContactClick: () => void;
}

// Map the string icon names from our CMS to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  Code,
  Briefcase,
  Zap,
};

const Intro: React.FC<IntroProps> = ({ onContactClick }) => {
  return (
    <section 
      id="about" 
      className="w-full bg-[#f5f5f7] py-20 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Headline */}
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
                className="text-5xl sm:text-6xl md:text-8xl font-semibold text-[#1d1d1f] tracking-tighter leading-none text-center lg:text-left"
              >
                {/* Dynamically split the string by \n to insert line breaks */}
                {content.intro.headline.split('\n').map((line, index, array) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < array.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>
            </motion.div>
          </div>

          {/* Right Column: Bio and Cards */}
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
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                {content.intro.subheadline}
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-regular">
                {content.intro.description}
              </p>
              
              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-2 text-base sm:text-lg text-blue-600 hover:text-blue-500 font-semibold mt-6 transition-colors group"
                aria-label="Open contact form"
              >
                {content.intro.cta} 
                <ArrowUpRight 
                  size={20} 
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" 
                />
              </button>
            </motion.div>

            {/* Value Proposition Cards */}
            <motion.div
              className="flex flex-col gap-6"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
                },
              }}
              role="list"
            >
              {content.intro.cards.map((card, index) => {
                // Safely get the icon from the map, fallback to Zap if name is wrong
                const IconComponent = iconMap[card.icon] || Zap;

                return (
                  <article 
                    key={index} 
                    className="flex items-start gap-4 sm:gap-6 p-6 bg-white/60 rounded-xl border border-black/5 shadow-sm hover:shadow-md transition-shadow"
                    role="listitem"
                  >
                    <IconComponent size={36} className="text-blue-600 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-[#1d1d1f]">
                        {card.title}
                      </h4>
                      <p className="text-gray-600 mt-1 text-sm sm:text-base font-regular">
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