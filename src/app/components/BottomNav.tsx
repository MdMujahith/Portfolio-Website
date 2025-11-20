"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Home, 
  User, 
  Code, 
  FolderGit2, 
  Briefcase, 
  MessageSquare, 
  ArrowRight 
} from 'lucide-react'; // Ensure you have lucide-react installed

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
            {/* --- Desktop Navigation (Glassmorphic) --- */}
            <nav 
                className="hidden md:flex fixed bottom-6 left-1/2 transform -translate-x-1/2 w-auto h-16 rounded-full p-2 justify-between items-center 
                bg-black/50 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 
                text-sm text-white z-50 shadow-2xl shadow-black/50 bottom-nav"
            >
                <a href="#home" className="flex items-center justify-center w-14 h-full rounded-full hover:bg-white/20 transition-colors">
                    <Home size={20} />
                </a>
                
                <div className="flex gap-2 h-full font-semibold px-2">
                    <a href="#about" className="h-full rounded-full px-4 flex items-center hover:bg-white/20 transition-colors">About</a>
                    <a href="#skills" className="h-full rounded-full px-4 flex items-center hover:bg-white/20 transition-colors">Skills</a>
                    <a href="#projects" className="h-full rounded-full px-4 flex items-center hover:bg-white/20 transition-colors">Projects</a>
                    <a href="#experience" className="h-full rounded-full px-4 flex items-center hover:bg-white/20 transition-colors">Experience</a>
                    <a href="#testimonials" className="h-full rounded-full px-4 flex items-center hover:bg-white/20 transition-colors">Testimonials</a>
                </div>

                <button 
                    onClick={onContactClick}
                    className="bg-white text-black h-full rounded-full flex items-center px-6 gap-2 transition hover:scale-105 active:scale-95 font-bold ml-1"
                >
                    Let's talk <ArrowRight size={16} />
                </button>
            </nav>

            {/* --- Mobile Navigation --- */}
            <div className="md:hidden fixed bottom-6 right-6 z-50">
                <motion.button 
                    onClick={toggleMenu}
                    className="w-16 h-16 bg-zinc-900 text-white rounded-full flex flex-col items-center justify-center gap-1.5 shadow-2xl shadow-black/50 border border-white/10"
                    animate={isOpen ? "open" : "closed"}
                >
                    {/* Hamburger Icon - Dark Mode Style */}
                    <motion.span className="w-8 h-0.5 bg-white" variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 7 } }}></motion.span>
                    <motion.span className="w-8 h-0.5 bg-white" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}></motion.span>
                    <motion.span className="w-8 h-0.5 bg-white" variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -7 } }}></motion.span>
                </motion.button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="md:hidden fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center z-40"
                        variants={menuBackgroundVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        // Optional: Add texture to mobile menu background if desired
                        style={{
                             backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                             backgroundSize: '20px 20px'
                        }}
                    >
                        <motion.div 
                            className="flex flex-col items-center gap-8 text-white text-3xl font-semibold"
                            variants={linkContainerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            <motion.a href="#home" onClick={toggleMenu} variants={linkItemVariants} className="flex items-center gap-3"><Home /> Home</motion.a>
                            <motion.a href="#about" onClick={toggleMenu} variants={linkItemVariants} className="flex items-center gap-3"><User /> About</motion.a>
                            <motion.a href="#skills" onClick={toggleMenu} variants={linkItemVariants} className="flex items-center gap-3"><Code /> Skills</motion.a>
                            <motion.a href="#projects" onClick={toggleMenu} variants={linkItemVariants} className="flex items-center gap-3"><FolderGit2 /> Projects</motion.a>
                            <motion.a href="#experience" onClick={toggleMenu} variants={linkItemVariants} className="flex items-center gap-3"><Briefcase /> Experience</motion.a>
                            <motion.a href="#testimonials" onClick={toggleMenu} variants={linkItemVariants} className="flex items-center gap-3"><MessageSquare /> Testimonials</motion.a>
                            
                            <motion.button 
                                onClick={() => {
                                    toggleMenu();
                                    onContactClick();
                                }} 
                                variants={linkItemVariants} 
                                className="mt-8 flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-xl font-bold hover:bg-zinc-200 active:scale-95 transition-all"
                            >
                                Let's talk <ArrowRight size={24} />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default BottomNav;