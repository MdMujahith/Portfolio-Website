"use client";

import React, { useState, useEffect } from 'react';

// Type definitions
interface Language {
  name: string;
  lang: string;
}

const languages: Language[] = [
  { name: 'Mujahith', lang: 'en' }, { name: 'முஜாஹித்', lang: 'ta' },
  { name: 'ムジャヒス', lang: 'ja' }, { name: 'مجاهد', lang: 'ar' },
  { name: 'Mujahid', lang: 'es' }, { name: 'Moudjahid', lang: 'fr' },
  { name: 'Mudschahed', lang: 'de' }, { name: 'Муджахид', lang: 'ru' },
  { name: '穆贾希德', lang: 'zh' }, { name: 'मुजाहिद', lang: 'hi' },
  { name: '무자히드', lang: 'ko' }, { name: 'Mujahid', lang: 'pt' },
];

const name = "Mohamed";
const nameLetters = name.split('');

// Define an array of color classes for the letters
const letterColors = [
  "hover:text-red-500", "hover:text-blue-500", "hover:text-green-500", "hover:text-purple-500",
  "hover:text-yellow-500", "hover:text-pink-500", "hover:text-indigo-500", "hover:text-teal-500",
];

const Hero: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState<number>(0);
  const [crossedOut, setCrossedOut] = useState<Record<number, boolean>>({});
  
  // This state tracks the animation class for each letter
  const [animationClass, setAnimationClass] = useState<Record<number, string>>({});

  const handleLetterClick = (index: number) => {
    const isCrossed = crossedOut[index];
    // Apply the correct animation class
    setAnimationClass(prev => ({ ...prev, [index]: isCrossed ? 'animate-swap-out' : 'animate-swap-in' }));
    // Toggle the state
    setCrossedOut(prev => ({ ...prev, [index]: !isCrossed }));
  };
  
  useEffect(() => {
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
    const intervalId = setInterval(() => {
      setCurrentLanguageIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="home" className="w-full min-h-screen flex flex-col items-center relative">
        <div className="absolute inset-0 -z-10 grid-bg animate-custom-pulse"></div>
        <nav className="flex justify-between p-4 items-center sm:px-16 sm:py-12 w-full">
            <div className="flex items-baseline group cursor-default gap-2 relative">
                <p className="text-3xl sm:text-5xl group-hover:scale-90 transition-all ease-in-out duration-300 group-hover:rotate-12">👋</p>
                <div className="text-2xl font-bold tracking-wider text-[#FBC138] group-hover:tracking-widest transition-all ease-in-out duration-300 hidden sm:flex">
                    Hello<p className="w-0 overflow-hidden group-hover:w-[7.5rem] transition-all ease-in-out duration-300">ooooooo</p>!
                </div>
            </div>
            <div className="hidden sm-flex items-center gap-8">
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
                <span className="flex text-7xl md:text-9xl text-black transition-all duration-300 hover:tracking-widest">
                  {nameLetters.map((letter, index) => (
                    <span 
                      key={index}
                      onClick={() => handleLetterClick(index)}
                      // By re-assigning the key, we force React to re-mount the span and re-trigger the animation
                      // We use the animationClass state to ensure the correct animation is played
                      className={`relative transition-all duration-300 ease-in-out hover:-translate-y-3 ${letterColors[index % letterColors.length]}`}
                    >
                      <span 
                        key={`${crossedOut[index]}`} // This key changes when the state changes, triggering re-animation
                        className={`inline-block ${animationClass[index]}`}
                      >
                        {crossedOut[index] ? 'X' : letter}
                      </span>
                    </span>
                  ))}
                </span>
                <span className="block text-6xl md:text-8xl text-zinc-500 relative h-32 transition-all duration-300 hover:tracking-widest">
                    <span className="lang-name-fade">
                        {languages[currentLanguageIndex].name}
                    </span>
                </span>
            </h1>
        </div>

        <div className="w-[100vw] h-full sm:w-full absolute top-1/2 -translate-y-1/2 -z-10 overflow-x-clip">
            <svg className="w-full h-full" viewBox="0 0 2530 740">
                <path id="start" stroke="currentColor" strokeWidth="0" fill="none" d="M0.29 193.68 C244.36 193.68 298.61 497.83 539.27 489.34 704.88 464.85 736.35 221.77 1038.78 221.77 1282.85 221.77 1347.1 542.91 1589.76 516.62 1780.25 496.03 1833.21 282.54 2003.81 253.25 2246.97 208.68 2312.12 574.4 2554.78 548.11 "></path>
                <text className="text-2xl font-semibold opacity-20" fill="currentColor">
                    <textPath xlinkHref="#start" className="animate-slide-in-left">
                         — JavaScript — CSS — Java — HTML — Markdown — Lua — Next.js — React.js — Svelte — Tailwind CSS — Framer Motion — Bootstrap — Material UI — PostCSS — SASS — Firebase — MongoDB — Vercel KV — SQL — Redis — MobX — Redux — React Query — Zustand — Next.js — Node.js — Express.js — Prisma — Circle CI — GitHub Actions — Jenkins — Vercel — Git — GitHub — NPM — Yarn —
                    </textPath>
                </text>
                 <text className="text-2xl font-semibold opacity-20" fill="currentColor">
                    <textPath xlinkHref="#start" className="animate-slide-in-right">
                         — JavaScript — CSS — Java — HTML — Markdown — Lua — Next.js — React.js — Svelte — Tailwind CSS — Framer Motion — Bootstrap — Material UI — PostCSS — SASS — Firebase — MongoDB — Vercel KV — SQL — Redis — MobX — Redux — React Query — Zustand — Next.js — Node.js — Express.js — Prisma — Circle CI — GitHub Actions — Jenkins — Vercel — Git — GitHub — NPM — Yarn —
                    </textPath>
                </text>
            </svg>
        </div>
    </section>
  );
};

export default Hero;