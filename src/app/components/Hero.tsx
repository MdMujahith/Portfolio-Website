"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import Image from "next/image";
import DynamicResumeButton from "./DynamicResumeButton";


interface HeroProps {
  onContactClick: () => void;
}

interface Language {
  name: string;
  lang: string;
}

const languages: Language[] = [
    { name: 'Mujahith', lang: 'en' }, { name: 'முஜாஹித்', lang: 'ta' },
    { name: 'مجاهد', lang: 'ar' }, { name: 'ムジャヒス', lang: 'ja' },
    { name: '무자히드', lang: 'ko' }, { name: '穆贾希德', lang: 'zh' },
];

const name = "Mohamed";
const nameLetters = name.split('');

const letterColors = [
  "hover:text-red-500", "hover:text-blue-500", "hover:text-green-500", "hover:text-purple-500",
  "hover:text-yellow-500", "hover:text-pink-500", "hover:text-indigo-500", "hover:text-teal-500",
];

const letterSwapVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
};

// 1. DEFINE YOUR TITLES HERE
const titles = ["Python Developer", "Open Source Enthusiast", "Full Stack Engineer"];

const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<Date | null>(null);
  
  // 2. STATE FOR LANGUAGE SWITCHER (Keep this)
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState<number>(0);
  
  // 3. STATE FOR TITLE SLIDER (New, simple state)
  const [titleIndex, setTitleIndex] = useState(0);
  
  const [crossedOut, setCrossedOut] = useState<Record<string, boolean>>({});

  const handleLetterClick = (letterKey: string) => {
    setCrossedOut(prev => ({ ...prev, [letterKey]: !prev[letterKey] }));
  };
  
  // EFFECT 1: MOUNT & CLOCK (Optimized to run every minute instead of second)
  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    // Update every minute (60000ms) to stop the stressful "ticking"
    const timerId = setInterval(() => setTime(new Date()), 60000); 
    return () => clearInterval(timerId);
  }, []);

  // EFFECT 2: LANGUAGE ROTATION (Slower: 4s)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLanguageIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  // EFFECT 3: TITLE SLIDER (New - Vertical Slide Logic)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000); // Change title every 3 seconds
    return () => clearInterval(intervalId);
  }, []);

  const currentLanguageName = languages[currentLanguageIndex].name;

  const formatTime = (date: Date) => {
    const timeStr = date.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true });
    const [timeValue, ampm] = timeStr.split(' ');
    const dateString = date.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', month: 'long', day: 'numeric' });
    return { timeValue, ampm, dateString };
  };

  // --- NEW FEATURE: Reusable Social Links Component ---
  const SocialLinks = () => (
    <>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-1 text-zinc-600 hover:text-black hover:stroke-2 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
        </a>
        <a href="https://github.com/MdMujahith" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-1 text-zinc-600 hover:text-black hover:stroke-2 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path></svg>
        </a>
        <a href="https://linkedin.com/in/mohamedmujahith03" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-1 text-zinc-600 hover:text-blue-600 hover:stroke-2 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M8 11l0 5"></path><path d="M8 8l0 .01"></path><path d="M12 16l0 -5"></path><path d="M16 16v-3a2 2 0 0 0 -4 0"></path></svg>
        </a>
    </>
  );

  return (
    <section id="home" className="w-full min-h-screen flex flex-col items-center relative">
        <div className="absolute inset-0 -z-10 grid-bg animate-custom-pulse"></div>
        
        <nav className="flex justify-between p-4 items-center sm:px-16 sm:py-12 w-full">
            <div className="flex items-center group cursor-default gap-2 relative">
                  <img 
                    src="image/Waving_Hand.png" 
                    alt="Waving Hand" 
                    className="w-9 h-9 sm:w-12 sm:h-12 group-hover:scale-90 transition-all ease-in-out duration-300 group-hover:rotate-12"/>
                  <div className="text-2xl font-semibold tracking-wider text-[#FBC138] group-hover:tracking-widest transition-all ease-in-out duration-300 flex">
                        Hello
                        <p className="w-0 overflow-hidden group-hover:w-[7.5rem] transition-all ease-in-out duration-300">ooooooo</p>!          
                  </div>
             </div>

            {/* --- Desktop Nav --- */}
            <div className="hidden sm:flex items-center gap-8">
                <div className="flex items-center gap-6">
                    <SocialLinks />
                </div>
                
                {mounted && time && (
                    <div className="flex items-center justify-end gap-1.5">
                        <span className="text-3xl font-semibold">{formatTime(time).timeValue}</span>
                        <div className="text-left text-xs font-semibold">
                            <span className="block">{formatTime(time).ampm.toLowerCase()}</span>
                            <span className="block text-zinc-700">{formatTime(time).dateString}</span>
                        </div>
                    </div>
                )}
            </div>
            
            {/* --- Mobile Social Links --- */}
            <div className="flex sm:hidden items-center gap-6">
                <SocialLinks />
            </div>
        </nav>
        
        <div className="flex-grow w-full grid grid-cols-1 md:grid-cols-2 items-center px-4 sm:px-16 md:-mt-16">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h1 className="font-semibold tracking-tight uppercase select-none cursor-default">
                    <div className="flex text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-black transition-all duration-300 hover:tracking-widest">
                      {nameLetters.map((letter, index) => {
                        const letterKey = `mohamed-${index}`;
                        return (
                            <motion.div 
                              key={letterKey}
                              onClick={() => handleLetterClick(letterKey)}
                              className={`relative cursor-pointer ${letterColors[index % letterColors.length]}`}
                              whileHover={{ y: -12 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                              <AnimatePresence mode="wait">
                                <motion.span
                                  key={crossedOut[letterKey] ? 'X' : letter}
                                  className="inline-block"
                                  variants={letterSwapVariants}
                                  initial="initial"
                                  animate="animate"
                                  exit="exit"
                                  transition={{ duration: 0.2, ease: "easeInOut" }}
                                >
                                  {crossedOut[letterKey] ? 'X' : letter}
                                </motion.span>
                              </AnimatePresence>
                            </motion.div>
                        )
                      })}
                    </div>

                    <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-zinc-500 h-28 sm:h-32 relative flex justify-center md:justify-start items-center transition-all duration-300 hover:tracking-widest">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentLanguageIndex}
                                className="absolute"
                                initial={{ opacity: 0, filter: "blur(5px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, filter: "blur(5px)" }}
                                transition={{ duration: 0.5 }}
                            >
                              {currentLanguageName}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </h1>
                
                {/* --- FIX START: Perfect Vertical Alignment --- */}
<div className="text-xl md:text-2xl leading-8 text-slate-700 mt-4 h-8 flex items-center justify-center md:justify-start gap-2 overflow-hidden w-full pl-12 md:pl-0">
    {/* Added 'leading-8' above. 
       This forces the text line-height to be exactly 32px (matching the h-8 container).
       Now both the static text and absolute text will sit at the exact same vertical position.
    */}

    <span className="inline">I am a</span>
    
    <div className="relative h-8 w-64 sm:w-72 text-left">
        <AnimatePresence mode="wait">
            <motion.span
                key={titleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute left-0 font-semibold text-indigo-600 block whitespace-nowrap leading-8"
            >
                {titles[titleIndex]}
            </motion.span>
        </AnimatePresence>
    </div>
</div>
{/* --- FIX END --- */}

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 relative">
    
    {/* 2. Replaced the <a> tag with this component */}
    <DynamicResumeButton />

    {/* 3. Your Contact Button (kept exactly as it was) */}
    <button
      onClick={onContactClick}
      className="w-full sm:w-auto flex sm:hidden items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-base hover:bg-blue-700 transition-colors shadow-lg"
    >
      <Mail size={18} />
      Contact Me
    </button>
</div>
            </div>
            
            <div className="hidden md:flex justify-center items-center">
                <motion.div 
                    className="p-1.5 bg-white rounded-full shadow-2xl -translate-y-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <Image
                        src="/image/Profile_Picture.jpg"
                        alt="Mohamed Mujahith"
                        width={384}      
                        height={384}    
                        className="rounded-full object-cover border-4 border-slate-200 lg:w-120 lg:h-120"
                       />
                </motion.div>
            </div>
        </div>

        <div className="w-full absolute top-1/2 -translate-y-1/2 -z-10 overflow-x-clip">
            {/* SVG marquee content */}
        </div>
    </section>
  );
};

export default Hero;