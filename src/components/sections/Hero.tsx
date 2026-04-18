"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";
import DynamicResumeButton from "@/components/ui/DynamicResumeButton";
import { siteConfig } from "@/data/site.config";
import { content } from "@/data/content";

interface HeroProps {
  onContactClick: () => void;
}

const getStatusColors = (state: string) => {
  switch (state?.toLowerCase()) {
    case "available":
    case "open to work":
      return { ping: "bg-green-400", dot: "bg-green-500" };
    case "busy":
    case "employed":
      return { ping: "bg-red-400", dot: "bg-red-500" };
    case "away":
    case "learning":
      return { ping: "bg-yellow-400", dot: "bg-yellow-500" };
    default:
      return { ping: "bg-blue-400", dot: "bg-blue-500" };
  }
};

const SocialLinks = () => (
  <>
    <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-1 text-zinc-600 hover:text-black hover:stroke-2 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    </a>
    <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-1 text-zinc-600 hover:text-black hover:stroke-2 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
      </svg>
    </a>
    <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-1 text-zinc-600 hover:text-blue-600 hover:stroke-2 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
        <path d="M8 11l0 5" />
        <path d="M8 8l0 .01" />
        <path d="M12 16l0 -5" />
        <path d="M16 16v-3a2 2 0 0 0 -4 0" />
      </svg>
    </a>
  </>
);

const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const [time, setTime] = useState<Date | null>(null);
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);

  const { firstName } = siteConfig.owner;
  const { languages, titles, cta, status = { text: "Open to work", state: "available", emoji: "👨‍💻" } } = content.hero as any;

  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentLanguageIndex((i) => (i + 1) % languages.length);
    }, 4000);
    return () => clearInterval(id);
  }, [languages.length]);

  useEffect(() => {
    const id = setInterval(() => {
      setTitleIndex((i) => (i + 1) % titles.length);
    }, 3000);
    return () => clearInterval(id);
  }, [titles.length]);

  const formattedTime = time
    ? (() => {
        const timeStr = time.toLocaleTimeString("en-US", {
          timeZone: siteConfig.owner.location.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        const [timeValue, ampm] = timeStr.split(" ");
        const dateString = time.toLocaleDateString("en-US", {
          timeZone: siteConfig.owner.location.timezone,
          month: "long",
          day: "numeric",
        });
        return { timeValue, ampm, dateString };
      })()
    : null;

  const badgeColors = getStatusColors(status.state);

  return (
    <section
      id="home"
      className="w-full min-h-screen flex flex-col items-center relative isolate overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 grid-bg animate-custom-pulse" />

      <nav className="flex justify-between p-4 items-center sm:px-16 sm:py-12 w-full">
        <div className="flex items-center group cursor-default gap-2 relative">
          <Image
            src="/image/Waving_Hand.png"
            alt="Waving Hand Emoji"
            width={48}
            height={48}
            className="w-9 h-9 sm:w-12 sm:h-12 group-hover:scale-90 transition-all ease-in-out duration-300 group-hover:rotate-12"
            priority
          />
          <div className="text-2xl font-semibold tracking-wider text-[#FBC138] group-hover:tracking-widest transition-all ease-in-out duration-300 flex">
            {content.hero.greeting}
            <p className="w-0 overflow-hidden group-hover:w-[7.5rem] transition-all ease-in-out duration-300">
              ooooooo
            </p>
            !
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-8">
          <div className="flex items-center gap-6">
            <SocialLinks />
          </div>
          {formattedTime && (
            <div className="flex items-center justify-end gap-1.5">
              <span className="text-3xl font-semibold">{formattedTime.timeValue}</span>
              <div className="text-left text-xs font-semibold">
                <span className="block">{formattedTime.ampm.toLowerCase()}</span>
                <span className="block text-zinc-700">{formattedTime.dateString}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex sm:hidden items-center gap-6">
          <SocialLinks />
        </div>
      </nav>

      <div className="flex-grow w-full grid grid-cols-1 md:grid-cols-2 items-center px-4 sm:px-16 md:-mt-16">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="font-semibold tracking-tight uppercase select-none cursor-default">
            <div className="flex text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-black transition-all duration-300 hover:tracking-widest">
              {firstName.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {letter}
                </motion.span>
              ))}
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
                  {languages[currentLanguageIndex].name}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>

          <div className="text-xl md:text-2xl leading-8 text-slate-700 mt-4 flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-2 overflow-hidden">
            <span className="inline">I am a</span>
            <div className="relative h-8 w-64 sm:w-72 text-center md:text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center md:justify-start font-semibold text-indigo-600 whitespace-nowrap leading-8"
                >
                  {titles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 relative">
            <DynamicResumeButton />
            <button
              onClick={onContactClick}
              className="w-full sm:w-auto flex sm:hidden items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-base hover:bg-blue-700 transition-colors shadow-lg"
            >
              <Mail size={18} />
              {cta.secondary}
            </button>
          </div>
        </div>

        <div className="hidden md:flex justify-center items-center">
          <motion.div
            className="relative p-1.5 bg-[conic-gradient(from_90deg,#4285F4_0_25%,#EA4335_25%_50%,#FBBC05_50%_75%,#34A853_75%_100%)] rounded-full shadow-2xl -translate-y-12 translate-x-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Image
              src="/image/ProfilePicture.jpeg"
              alt={`${firstName} ${siteConfig.owner.lastName} - Profile Picture`}
              width={500}
              height={500}
              className="rounded-full object-cover object-[50%_20%] border-4 border-white relative z-0"
              priority
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              className="absolute bottom-2 right-4 px-5 py-3 rounded-full bg-white shadow-xl border border-zinc-100 z-10"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${badgeColors.ping}`} />
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${badgeColors.dot}`} />
                </span>
                <span className="text-sm font-bold text-zinc-800 tracking-wide select-none flex items-center gap-1.5">
                  {status.emoji && <span className="text-base leading-none">{status.emoji}</span>}
                  {status.text}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;