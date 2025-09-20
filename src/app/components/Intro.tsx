"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const keywords: string[] = [
  'performance',
  'accessibility',
  'trends',
  'ui/ux'
];

const Intro: React.FC = () => {
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState<number>(0);
  const terminalRef = useRef<HTMLDivElement | null>(null);

  // Effect for cycling through the keywords
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentKeywordIndex((prevIndex) => (prevIndex + 1) % keywords.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  // Effect for making the terminal draggable
  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;

    const handle = terminal.querySelector('.handle') as HTMLElement;
    if (!handle) return;
    
    let isDragging = false;
    let offsetX: number, offsetY: number;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      const rect = terminal.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      document.body.style.userSelect = 'none';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;
      terminal.style.position = 'absolute';
      terminal.style.left = `${newX}px`;
      terminal.style.top = `${newY}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      document.body.style.userSelect = 'auto';
    };

    handle.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      handle.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <section id="intro" className="w-full flex flex-col items-center gap-16 px-6 py-20 text-center relative">
      <motion.div 
        className="max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-lg sm:text-xl md:text-2xl text-zinc-500">👋 Hey, I'm Mohamed Mujahith, I code and craft products, and I'm a...</p>
        <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-800 py-4">Front-end focused Software Developer,</p>
        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-700">
          specialized in building scalable, user-centric web apps that prioritizes
          <span className="intro-keywords-container ml-2">
            requirements.
            <span className={`keyword-tag bg-fuchsia-100 text-fuchsia-700 ring-2 ring-fuchsia-700 ${currentKeywordIndex === 0 ? 'active' : 'inactive'}`}>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                performance
            </span>
            <span className={`keyword-tag bg-yellow-100 text-yellow-700 ring-2 ring-yellow-700 ${currentKeywordIndex === 1 ? 'active' : 'inactive'}`}>
               <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75z" /></svg>
                accessibility
            </span>
            <span className={`keyword-tag bg-lime-100 text-lime-700 ring-2 ring-lime-700 ${currentKeywordIndex === 2 ? 'active' : 'inactive'}`}>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 00-4.425 0" /></svg>
                trends
            </span>
            <span className={`keyword-tag bg-pink-100 text-pink-700 ring-2 ring-pink-700 ${currentKeywordIndex === 3 ? 'active' : 'inactive'}`}>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18 12.75a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z" /></svg>
                UI / UX
            </span>
          </span>
        </p>
      </motion.div>
      <motion.div 
        ref={terminalRef} 
        id="terminal-draggable-container" 
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="terminal-window rounded-lg border border-zinc-200 font-mono">
          <div className="handle cursor-move bg-gray-200 px-4 py-2 flex items-center justify-between border-b border-gray-300">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm font-medium text-gray-600">Terminal</div>
            <div className="w-4"></div>
          </div>
          <div className="p-4 bg-zinc-800 text-white text-sm text-left">
            <p><span className="text-green-400">itsvg@portfolio</span>:<span className="text-blue-400">~</span>$ whoami</p>
            <p className="text-gray-300">&gt; Mohamed Mujahith // Software Developer</p>
            <p><span className="text-green-400">itsvg@portfolio</span>:<span className="text-blue-400">~</span>$ </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Intro;