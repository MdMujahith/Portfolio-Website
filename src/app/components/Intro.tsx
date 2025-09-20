"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data for Animated Tags ---
interface DynamicTag {
  id: string;
  text: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  rotation: number;
  initialY: number;
  hoverY: number;
}

const dynamicTags: DynamicTag[] = [
  { id: 'performance', text: 'performance', emoji: '🚀', color: 'text-purple-700', bgColor: 'bg-purple-100', borderColor: 'border-purple-200', rotation: 8, initialY: -10, hoverY: -20 },
  { id: 'accessibility', text: 'accessibility', emoji: '♿', color: 'text-amber-700', bgColor: 'bg-amber-100', borderColor: 'border-amber-200', rotation: -12, initialY: 0, hoverY: -15 },
  { id: 'uiux', text: 'UI/UX', emoji: '✨', color: 'text-pink-700', bgColor: 'bg-pink-100', borderColor: 'border-pink-200', rotation: 10, initialY: 5, hoverY: -10 },
  { id: 'trends', text: 'trends', emoji: '📈', color: 'text-emerald-700', bgColor: 'bg-emerald-100', borderColor: 'border-emerald-200', rotation: -8, initialY: 10, hoverY: -5 },
];

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.5,
    },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: dynamicTags[i].rotation,
    y: dynamicTags[i].initialY,
    transition: {
      delay: 0.8 + (i * 0.1),
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  }),
  hover: (i: number) => ({
    y: dynamicTags[i].hoverY,
    scale: 1.05,
    rotate: dynamicTags[i].rotation + (dynamicTags[i].rotation > 0 ? 3 : -3),
    transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
    }
  })
};


const Intro: React.FC = () => {
  return (
    <section id="intro" className="w-full relative py-24 flex justify-center items-center min-h-[60vh]">
      {/* Background Texture */}
      <div className="grid-bg"></div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Animated Greeting */}
        <motion.div
          className="flex items-center justify-center gap-3 text-lg md:text-xl text-slate-600 mb-6"
          variants={itemVariants}
        >
          <motion.span
            className="text-3xl"
            animate={{ rotate: [0, 14, -8, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            👋
          </motion.span>
          Hey, I'm Mohamed Mujahith, coding and crafting products and I'm a...
        </motion.div>

        {/* Main Heading with Embedded Tags */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-slate-900 leading-tight tracking-tighter relative"
          variants={itemVariants}
        >
          <span className="relative inline-block">
            <span className="z-10 relative">Front-end</span>
            {dynamicTags.map((tag, index) => (
              tag.id === 'performance' && (
                <motion.div
                  key={tag.id}
                  className={`absolute left-[-10%] top-[-15%] md:left-[25%] md:top-[-30%] px-4 py-2 rounded-xl text-base md:text-xl font-semibold border-2 shadow-md whitespace-nowrap ${tag.color} ${tag.bgColor} ${tag.borderColor}`}
                  custom={index}
                  variants={tagVariants}
                  whileHover="hover"
                >
                  {tag.emoji} {tag.text}
                </motion.div>
              )
            ))}
          </span>{' '}
          <span className="relative inline-block">
            <span className="z-10 relative">focused</span>
             {dynamicTags.map((tag, index) => (
              tag.id === 'accessibility' && (
                <motion.div
                  key={tag.id}
                  className={`absolute right-[-10%] top-[20%] md:right-[-20%] md:top-[-5%] px-4 py-2 rounded-xl text-base md:text-xl font-semibold border-2 shadow-md whitespace-nowrap ${tag.color} ${tag.bgColor} ${tag.borderColor}`}
                  custom={index}
                  variants={tagVariants}
                  whileHover="hover"
                >
                  {tag.emoji} {tag.text}
                </motion.div>
              )
            ))}
          </span>{' '}
          Software Developer,
        </motion.h1>

        {/* Subtitle / Description */}
        <motion.p
          className="mt-8 text-2xl md:text-3xl text-slate-700 max-w-4xl leading-relaxed"
          variants={itemVariants}
        >
          specialized in building{' '}
          <span className="relative inline-block font-semibold">
            <span className="relative z-10">scalable</span>
             {dynamicTags.map((tag, index) => (
              tag.id === 'trends' && (
                <motion.div
                  key={tag.id}
                  className={`absolute left-[-15%] bottom-[-5%] md:left-[-25%] md:bottom-[-20%] px-4 py-2 rounded-xl text-base md:text-xl font-semibold border-2 shadow-md whitespace-nowrap ${tag.color} ${tag.bgColor} ${tag.borderColor}`}
                  custom={index}
                  variants={tagVariants}
                  whileHover="hover"
                >
                  {tag.emoji} {tag.text}
                </motion.div>
              )
            ))}
          </span>
          {' '}user-centric web apps that prioritize{' '}
           <span className="relative inline-block font-semibold">
            <span className="relative z-10">great design</span>
             {dynamicTags.map((tag, index) => (
              tag.id === 'uiux' && (
                <motion.div
                  key={tag.id}
                  className={`absolute right-[-10%] top-[-10%] md:right-[-20%] md:top-[-20%] px-4 py-2 rounded-xl text-base md:text-xl font-semibold border-2 shadow-md whitespace-nowrap ${tag.color} ${tag.bgColor} ${tag.borderColor}`}
                  custom={index}
                  variants={tagVariants}
                  whileHover="hover"
                >
                  {tag.emoji} {tag.text}
                </motion.div>
              )
            ))}
          </span>.
        </motion.p>

        {/* Optional: Add your "sticker" profile image here if it's meant to float independently */}
        {/* <motion.img
          src="/your-profile-image.jpg" // Replace with your image
          alt="Mohamed Mujahith"
          className="absolute w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white"
          style={{ top: '10%', right: '5%' }} // Adjust position as needed
          initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
        /> */}

      </motion.div>
    </section>
  );
};

export default Intro;