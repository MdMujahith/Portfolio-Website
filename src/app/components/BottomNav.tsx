"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from "framer-motion";

// --- Animation Variants for Mobile Menu ---
const menuBackgroundVariants: Variants = {
    hidden: { 
        clipPath: `circle(30px at calc(100% - 44px) calc(100% - 44px))`,
        transition: { type: "spring", stiffness: 400, damping: 40 }
    },
    visible: { 
        clipPath: `circle(150% at calc(100% - 44px) calc(100% - 44px))`,
        transition: { type: "spring", stiffness: 80, damping: 20 }
    },
};

const linkContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const linkItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut" } }
};

// 1. Add 'onContactClick' to the component's props
interface BottomNavProps {
  onContactClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onContactClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* --- Desktop Navigation --- */}
            <nav 
                className="hidden md:flex fixed bottom-6 left-1/2 transform -translate-x-1/2 w-auto h-16 rounded-full p-2 justify-between items-center bg-[#222222cc] text-sm text-white z-50 bottom-nav"
            >
                <a href="#home" className="flex items-center justify-center w-14 h-full rounded-full hover:bg-white/10 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                </a>
                
                <div className="flex gap-2 h-full font-semibold px-2">
                    <a href="#about" className="h-full rounded-full px-4 flex items-center hover:bg-white/10 transition">About</a>
                    <a href="#projects" className="h-full rounded-full px-4 flex items-center hover:bg-white/10 transition">Projects</a>
                    <a href="#skills" className="h-full rounded-full px-4 flex items-center hover:bg-white/10 transition">Skills</a>
                    <a href="#experience" className="h-full rounded-full px-4 flex items-center hover:bg-white/10 transition">Experience</a>
                    <a href="#testimonials" className="h-full rounded-full px-4 flex items-center hover:bg-white/10 transition">Testimonials</a>
                </div>

                {/* 2. Changed <a> to <button> and added onContactClick */}
                <button 
                    onClick={onContactClick}
                    className="bg-black/80 hover:bg-black h-full rounded-full flex items-center px-6 gap-1.5 transition font-semibold"
                >
                    {"Let's talk"} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l14 0"></path><path d="M13 18l6-6"></path><path d="M13 6l6 6"></path></svg>
                </button>
            </nav>

            {/* --- Mobile Navigation --- */}
            <div className="md:hidden fixed bottom-6 right-6 z-50">
                <motion.button 
                    onClick={toggleMenu}
                    className="w-16 h-16 bg-zinc-800 rounded-full flex flex-col items-center justify-center gap-1.5 shadow-lg"
                    animate={isOpen ? "open" : "closed"}
                >
                    <motion.span className="w-8 h-0.5 bg-white" variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 7 } }}></motion.span>
                    <motion.span className="w-8 h-0.5 bg-white" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}></motion.span>
                    <motion.span className="w-8 h-0.5 bg-white" variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -7 } }}></motion.span>
                </motion.button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="md:hidden fixed inset-0 bg-zinc-900 flex flex-col items-center justify-center z-40"
                        variants={menuBackgroundVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <motion.div 
                            className="flex flex-col items-center gap-8 text-white text-3xl font-semibold"
                            variants={linkContainerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            <motion.a href="#home" onClick={toggleMenu} variants={linkItemVariants}>Home</motion.a>
                            <motion.a href="#about" onClick={toggleMenu} variants={linkItemVariants}>About</motion.a>
                            <motion.a href="#projects" onClick={toggleMenu} variants={linkItemVariants}>Projects</motion.a>
                            <motion.a href="#skills" onClick={toggleMenu} variants={linkItemVariants}>Skills</motion.a>
                            <motion.a href="#experience" onClick={toggleMenu} variants={linkItemVariants}>Experience</motion.a>
                            <motion.a href="#testimonials" onClick={toggleMenu} variants={linkItemVariants}>Testimonials</motion.a>
                            {/* 3. Changed <a> to <button> and connected onContactClick for mobile menu */}
                            <motion.button 
                                onClick={() => {
                                    toggleMenu();
                                    onContactClick();
                                }} 
                                variants={linkItemVariants} 
                                className="mt-8 flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full text-xl"
                            >
                                {"Let's talk"} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l14 0"></path><path d="M13 18l6-6"></path><path d="M13 6l6 6"></path></svg>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default BottomNav;
