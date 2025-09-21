"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Briefcase, Zap, ArrowUpRight } from 'lucide-react';

const Intro: React.FC = () => {
  return (
    <section id="about" className="w-full bg-[#f5f5f7] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky on Desktop */}
          <div className="lg:sticky top-0 lg:h-screen flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full"
            >
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-[#1d1d1f] tracking-tighter leading-none text-center lg:text-left">
                Developer.
                <br />
                Strategist.
                <br />
                Innovator.
              </h2>
            </motion.div>
          </div>

          {/* Right Column: Scrolling Content */}
          <motion.div 
            className="flex flex-col gap-12 lg:pt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {/* About Me Text */}
            <motion.div 
              className="text-left"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Hi, I'm Mohamed Mujahith.
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                As a recent B.Tech in Computer Science graduate and a current MBA candidate, I'm passionate about the intersection of technology and business. I am building a unique skill set to not only engineer powerful software but also to understand the market dynamics that make a product successful.
              </p>
              <a 
                href="mailto:your-email@example.com"
                className="inline-flex items-center gap-2 text-base sm:text-lg text-blue-600 hover:text-blue-500 font-semibold mt-6 transition-colors"
              >
                Get in Touch <ArrowUpRight size={20} />
              </a>
            </motion.div>
            
            {/* Feature Cards */}
            <motion.div 
              className="flex flex-col gap-6"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
              }}
            >
              {/* Card 1: Developer */}
              <div className="flex items-start gap-4 sm:gap-6 p-6 bg-white/60 rounded-xl border border-black/5 shadow-sm">
                <Code size={36} className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f]">Technical Skills</h3>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">Equipped with a strong foundation in modern web development, including hands-on experience with React, Next.js, and TypeScript to build responsive and efficient applications.</p>
                </div>
              </div>
              {/* Card 2: Strategist */}
              <div className="flex items-start gap-4 sm:gap-6 p-6 bg-white/60 rounded-xl border border-black/5 shadow-sm">
                <Briefcase size={36} className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f]">Strategic Mindset</h3>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">My MBA studies are providing me with a robust framework for market analysis, product management, and strategic decision-making, ensuring technology aligns with business goals.</p>
                </div>
              </div>
               {/* Card 3: Innovator */}
              <div className="flex items-start gap-4 sm:gap-6 p-6 bg-white/60 rounded-xl border border-black/5 shadow-sm">
                <Zap size={36} className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f]">Eager to Innovate</h3>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">I am driven to apply my combined skills to create innovative products. I am actively seeking opportunities to contribute to challenging projects and grow within a forward-thinking team.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Intro;