"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Type definitions
interface Language {
  name: string;
  lang: string;
}

// Corrected and reduced language list
const languages: Language[] = [
    { name: 'Mujahith', lang: 'en' }, // English
    { name: 'முஜாஹித்', lang: 'ta' }, // Tamil
    { name: 'مجاهد', lang: 'ar' },      // Arabic
    { name: 'ムジャヒス', lang: 'ja' }, // Japanese
    { name: '무자히드', lang: 'ko' },      // Korean
    { name: '穆贾希德', lang: 'zh' }, // Chinese
];

const name = "Mohamed";
const nameLetters = name.split('');

const letterColors = [
  "hover:text-red-500", "hover:text-blue-500", "hover:text-green-500", "hover:text-purple-500",
  "hover:text-yellow-500", "hover:text-pink-500", "hover:text-indigo-500", "hover:text-teal-500",
];

// A "fade and scale" animation for the letter swap
const letterSwapVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
};

const Hero: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState<number>(0);
  const [crossedOut, setCrossedOut] = useState<Record<string, boolean>>({});

  const handleLetterClick = (letterKey: string) => {
    setCrossedOut(prev => ({ ...prev, [letterKey]: !prev[letterKey] }));
  };
  
  useEffect(() => {
    // Clock logic
    const updateTime = () => {
      const now = new Date();
      const optionsTime: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true };
      const optionsDate: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Kolkata', month: 'long', day: 'numeric' };
      const timeString = now.toLocaleTimeString('en-US', optionsTime);
      const dateString = now.toLocaleDateString('en-US', optionsDate);
      const [timeValue, ampm] = timeString.split(' ');
      
      setTime(`
        <div class="flex items-center justify-end gap-1.5">
            <span class="text-3xl font-bold">${timeValue}</span>
            <div class="text-left text-xs font-bold">
                <span class="block">${ampm.toLowerCase()}</span>
                <span class="block text-zinc-700">${dateString}</span>
            </div>
        </div>
      `);
    };
    updateTime();
    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    // Language cycling logic
    const intervalId = setInterval(() => {
      setCurrentLanguageIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const currentLanguageName = languages[currentLanguageIndex].name;

  return (
    <section id="home" className="w-full min-h-screen flex flex-col items-center relative">
        <motion.div 
          className="absolute inset-0 -z-10 grid-bg"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <nav className="flex justify-between p-4 items-center sm:px-16 sm:py-12 w-full">
            <div className="flex items-baseline group cursor-default gap-2 relative">
                <p className="text-3xl sm:text-5xl group-hover:scale-90 transition-all ease-in-out duration-300 group-hover:rotate-12">👋</p>
                <div className="text-2xl font-bold tracking-wider text-[#FBC138] group-hover:tracking-widest transition-all ease-in-out duration-300 hidden sm:flex">
                    Hello<p className="w-0 overflow-hidden group-hover:w-[7.5rem] transition-all ease-in-out duration-300">ooooooo</p>!
                </div>
            </div>
            <div className="hidden sm:flex items-center gap-8">
                <div className="flex items-center gap-6">
                    <a href="https://twitter.com/VishwaGauravIn" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-1 text-zinc-600 hover:text-black hover:stroke-2 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg></a>
                    <a href="https://github.com/VishwaGauravIn" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-1 text-zinc-600 hover:text-black hover:stroke-2 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path></svg></a>
                    <a href="https://linkedin.com/in/VishwaGauravIn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-1 text-zinc-600 hover:text-blue-600 hover:stroke-2 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M8 11l0 5"></path><path d="M8 8l0 .01"></path><path d="M12 16l0 -5"></path><path d="M16 16v-3a2 2 0 0 0 -4 0"></path></svg></a>
                </div>
                <div id="time-container-desktop" dangerouslySetInnerHTML={{ __html: time }}></div>
            </div>
        </nav>
        
        <div className="flex-grow w-full flex flex-col justify-start items-center text-center px-4 relative pt-20">
            <h1 className="font-extrabold tracking-tight uppercase select-none cursor-default">
                <div className="flex text-7xl md:text-9xl text-black transition-all duration-300 hover:tracking-widest">
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

                <div className="text-6xl md:text-8xl text-zinc-500 h-32 relative flex justify-center items-center transition-all duration-300 hover:tracking-widest">
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
        </div>
    </section>
  );
};

export default Hero;