"use client";

import React, { useState, useEffect } from 'react';
// ✅ 1. Added 'Variants' to the import list
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Home, 
  User, 
  Code, 
  FolderGit2, 
  Briefcase, 
  MessageSquare, 
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

interface BottomNavProps {
  onContactClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onContactClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    // --- Fast & Snappy Animation Variants (Now Typed Correctly) ---
    
    // ✅ 2. Added ': Variants' type here
    const sidebarVariants: Variants = {
        open: {
            clipPath: `circle(150% at calc(100% - 40px) calc(100% - 40px))`,
            transition: {
                type: "tween",
                ease: "circOut", // Fast expansion
                duration: 0.4
            }
        },
        closed: {
            clipPath: `circle(0px at calc(100% - 40px) calc(100% - 40px))`,
            transition: {
                type: "tween",
                ease: "circIn", // Fast close
                duration: 0.3,
                delay: 0.1
            }
        }
    };

    // ✅ 3. Added ': Variants' type here
    const itemVariants: Variants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        closed: {
            y: 20,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    };

    // ✅ 4. Added ': Variants' type here
    const listVariants: Variants = {
        open: {
            transition: { staggerChildren: 0.04, delayChildren: 0.1 }
        },
        closed: {
            transition: { staggerChildren: 0.02, staggerDirection: -1 }
        }
    };

    return (
        <>
            {/* --- Desktop Navigation (UNTOUCHED) --- */}
            <nav 
                className="hidden md:flex fixed bottom-6 left-1/2 transform -translate-x-1/2 w-auto h-16 rounded-full p-2 justify-between items-center 
                bg-black/80 backdrop-blur-xl border border-white/10 
                text-base text-white z-50 shadow-2xl bottom-nav"
            >
                <a href="#home" className="flex items-center justify-center w-14 h-full rounded-full hover:bg-white/20 transition-colors">
                    <Home size={20} />
                </a>
                
                <div className="flex gap-2 h-full font-semibold px-2">
                    {['About', 'Skills', 'Projects', 'Experience', 'Testimonials'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="h-full rounded-full px-4 flex items-center hover:bg-white/20 transition-colors">
                            {item}
                        </a>
                    ))}
                </div>

                <button 
                    onClick={onContactClick}
                    className="bg-white text-black h-full rounded-full flex items-center px-6 gap-2 transition hover:scale-105 active:scale-95 font-semibold ml-1"
                >
                    Let&apos;s talk <ArrowRight size={16} />
                </button>
            </nav>

            {/* --- Mobile Navigation (Right Aligned) --- */}
            <div className="md:hidden">
                
                {/* 1. The Overlay (Controls the Spread) */}
                <motion.div
                    initial="closed"
                    animate={isOpen ? "open" : "closed"}
                    variants={sidebarVariants}
                    className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col justify-end items-end px-8 pb-32" 
                >
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-[0.05]" 
                         style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
                    />

                    {/* 2. The Links (Right Aligned) */}
                    <motion.ul variants={listVariants} className="flex flex-col gap-6 relative z-10 items-end">
                        {['Home', 'About', 'Skills', 'Projects', 'Experience'].map((item) => (
                            <motion.li key={item} variants={itemVariants}>
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    onClick={toggleMenu}
                                    className="text-5xl font-semibold text-white/50 hover:text-white transition-colors tracking-tight text-right block"
                                >
                                    {item}
                                </a>
                            </motion.li>
                        ))}
                        
                        {/* CTA Button */}
                        <motion.li variants={itemVariants} className="pt-6">
                            <button 
                                onClick={() => { toggleMenu(); onContactClick(); }}
                                className="flex items-center gap-3 text-xl font-semibold text-white hover:text-blue-400 transition-colors"
                            >
                                Let&apos;s Talk <ArrowRight size={24} />
                            </button>
                        </motion.li>
                    </motion.ul>
                </motion.div>

                {/* 3. The Toggle Button (Always on Top) */}
                <button 
                    onClick={toggleMenu}
                    className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-200
                    ${isOpen ? "bg-white text-black" : "bg-zinc-900 text-white border border-white/10"}`}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={28} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu size={28} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </>
    );
};

export default BottomNav;