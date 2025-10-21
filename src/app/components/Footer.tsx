"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

// Define the props the component will receive
interface FooterProps {
  onContactClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
    const marqueeText = (text: string) => (
        <span className="mx-8 text-3xl sm:text-4xl md:text-5xl font-bold whitespace-nowrap text-zinc-600">
          {text}
        </span>
    );

    return (
        <footer className="w-full bg-zinc-800 text-white pt-12 sm:pt-16 relative z-10 overflow-hidden">
            {/* --- Marquee Section --- */}
            <div className="w-full mb-12 sm:mb-16">
              <div className="flex animate-marquee-left">
                {marqueeText("Thank You For Visiting My Portfolio")}
                {marqueeText("Thank You For Visiting My Portfolio")}
                {marqueeText("Thank You For Visiting My Portfolio")}
                {marqueeText("Thank You For Visiting My Portfolio")}
              </div>
              <div className="flex animate-marquee-right mt-4">
                {marqueeText("Coded and Crafted With ❤️ by Mohamed Mujahith")}
                {marqueeText("Coded and Crafted With ❤️ by Mohamed Mujahith")}
                {marqueeText("Coded and Crafted With ❤️ by Mohamed Mujahith")}
                {marqueeText("Coded and Crafted With ❤️ by Mohamed Mujahith")}
              </div>
            </div>

            {/* --- Main Footer Content --- */}
            <motion.div 
                className="max-w-7xl mx-auto flex flex-col items-center text-center px-6 pb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Stay Connected</h2>
                <p className="max-w-md text-zinc-400 mb-8">
                    {"Feel free to reach out. I'm always open to new ideas, collaborations, or just a friendly chat."}
                </p>

                <div className="flex items-center gap-8 mb-8">
                    <a href="https://twitter.com/VishwaGauravIn" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-zinc-400 hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                        </svg>
                    </a>
                    <a href="https://github.com/MdMujahith" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-zinc-400 hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                        </svg>
                    </a>
                    <a href="https://linkedin.com/in/mohamedmujahith03" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-zinc-400 hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                            <path d="M8 11l0 5"></path><path d="M8 8l0 .01"></path><path d="M12 16l0 -5"></path><path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
                        </svg>
                    </a>
                </div>
                
                {/* UPDATED: This is now a button that opens the contact modal */}
                <button 
                  onClick={onContactClick}
                  className="flex items-center gap-3 px-6 py-3 bg-white text-zinc-800 rounded-full font-semibold text-md hover:bg-zinc-200 transition-colors shadow-lg mb-8"
                >
                  <Mail size={18} />
                  Get in Touch
                </button>

                <hr className="w-full max-w-lg border-t border-zinc-700 mb-3" />
                
                <p className="text-zinc-600 text-sm sm:text-base mt-4">
                    Inspired by{" "}
                    <a 
                        href="https://itsvg.in" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-semibold text-zinc-500 hover:text-white transition-colors"
                    >
                        Vishwa Gaurav
                    </a>
                </p>
                
                <p className="text-zinc-500 text-xs sm:text-sm mt-1 mb-1">
                    &copy; {new Date().getFullYear()} Mohamed Mujahith. All Rights Reserved.
                </p>
            </motion.div>
            
            <div className="h-20 hidden md:block"></div>
        </footer>
    );
};

export default Footer;