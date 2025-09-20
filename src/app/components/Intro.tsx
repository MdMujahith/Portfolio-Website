"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Briefcase, Zap, ArrowUpRight } from 'lucide-react';

const Intro: React.FC = () => {
  return (
    // UPDATED: Changed py-24 to py-20 for a shorter gap
    <section id="about" className="w-full bg-[#f5f5f7] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Sticky Headline */}
          <div className="sticky top-0 h-screen flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-6xl md:text-8xl font-extrabold text-[#1d1d1f] tracking-tighter leading-none">
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
            className="flex flex-col gap-12 pt-8" // Adjusted padding to match
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
              <p className="text-2xl font-semibold text-gray-800 mb-4">
                Hi, I'm Mohamed Mujahith.
              </p>
              <p className="text-[#6e6e73] text-lg leading-relaxed">
                As a recent B.Tech in Computer Science graduate and a current MBA candidate, I'm passionate about the intersection of technology and business. I am building a unique skill set to not only engineer powerful software but also to understand the market dynamics that make a product successful.
              </p>
              <a 
                href="mailto:your-email@example.com"
                className="inline-flex items-center gap-2 text-lg text-blue-600 hover:text-blue-500 font-semibold mt-6 transition-colors"
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
              <div className="flex items-start gap-6 p-6 bg-white/60 rounded-xl border border-black/5 shadow-sm">
                <Code size={80} className="text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-[#1d1d1f]">Technical Skills</h3>
                  <p className="text-[#6e6e73] mt-1">Equipped with a strong foundation in modern web development, including hands-on experience with React, Next.js, and TypeScript to build responsive and efficient applications.</p>
                </div>
              </div>
              {/* Card 2: Strategist */}
              <div className="flex items-start gap-6 p-6 bg-white/60 rounded-xl border border-black/5 shadow-sm">
                <Briefcase size={80} className="text-blue-600 mb-1" />
                <div>
                  <h3 className="text-xl font-bold text-[#1d1d1f]">Strategic Mindset</h3>
                  <p className="text-[#6e6e73] mt-1">My MBA studies are providing me with a robust framework for market analysis, product management, and strategic decision-making, ensuring technology aligns with business goals.</p>
                </div>
              </div>
               {/* Card 3: Innovator */}
              <div className="flex items-start gap-6 p-6 bg-white/60 rounded-xl border border-black/5 shadow-sm">
                <Zap size={80} className="text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-[#1d1d1f]">Eager to Innovate</h3>
                  <p className="text-[#6e6e73] mt-1">I am driven to apply my combined skills to create innovative products. I am actively seeking opportunities to contribute to challenging projects and grow within a forward-thinking team.</p>
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