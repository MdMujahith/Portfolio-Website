"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SiC, SiTypescript, SiCplusplus, 
 SiLinux, SiJavascript, SiHtml5, SiCss3,
  SiGit, SiPython, SiMysql,SiFigma,SiGoogleappsscript 
} from 'react-icons/si';
import { IconType } from 'react-icons';
import { BadgePlus } from 'lucide-react';

interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

const skillsData: Skill[] = [
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'C', icon: SiC, color: '#4169E1' },
  { name: 'C++', icon: SiCplusplus, color: '#06B6D4' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'AppScript', icon: SiGoogleappsscript,color: '#3178C6' },
  { name: 'Linux', icon: SiLinux, color: '#000000ff' },
  { name: 'Java', icon: SiJavascript, color: '#339933' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
  { name: 'MySQL', icon: SiMysql, color: '#4169E1' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const Skills: React.FC = () => {
    const [skillsToShow, setSkillsToShow] = useState(9);

    const handleLoadMore = () => {
        setSkillsToShow(prev => prev + 3);
    };

    return (
        <section id="skills" className="w-full flex flex-col items-center py-20 pattern-bg-project relative z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-center animate-gradient-text mb-12 sm:mb-16">
                Skills & Expertise
            </h2>
            {/* The parent grid no longer controls the animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-16 max-w-7xl px-4">
                {skillsData.slice(0, skillsToShow).map((skill) => (
                    // FIXED: Animation is now controlled by each individual card
                    <motion.div 
                        key={skill.name} 
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <div className="project-card-wrapper relative group">
                            <div className="card-main flex items-center gap-4 py-6 px-8 rounded-3xl h-32 bg-white ring-1 ring-black/10 shadow-sm relative top-0 left-0 z-10 group-hover:border-2 group-hover:border-black">
                                <skill.icon size={48} style={{ color: skill.color }} />
                                <p className="text-xl font-semibold text-zinc-800">{skill.name}</p>
                            </div>
                            <div className="card-shadow-1 absolute h-full w-full left-0 top-0 bg-white ring-1 ring-black/10 -z-0 rounded-3xl transition-all ease-in-out"></div>
                            <div className="card-shadow-2 absolute h-full w-full left-1.5 top-1.5 bg-zinc-400 ring-1 ring-zinc-400/20 -z-10 rounded-3xl transition-all ease-in-out"></div>
                        </div>
                    </motion.div>
                ))}
            </div>
            {skillsToShow < skillsData.length && (
                <button 
                    onClick={handleLoadMore} 
                    className="mt-12 flex items-center gap-2 bg-zinc-800 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-zinc-700 transition-all"
                >
                    <BadgePlus size={20} />
                    Load More
                </button>
            )}
        </section>
    );
};

export default Skills;