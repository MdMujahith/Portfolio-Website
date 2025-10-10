"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SiC,SiCplusplus, 
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
  { name: 'Java', icon: SiJavascript, color: '#f89820' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
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
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-center animate-gradient-text mb-12 sm-mb-16">
                Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl px-4">
                {skillsData.slice(0, skillsToShow).map((skill) => (
                    <motion.div 
                        key={skill.name} 
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        // ✅ CHANGED: Replaced the standard transition with a spring animation
                        transition={{ type: "spring", stiffness: 120, damping: 10 }}
                    >
                        <div className="group flex items-center gap-6 p-6 bg-white rounded-full border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:-translate-y-1">
                            <skill.icon size={48} style={{ color: skill.color }} />
                            <p className="text-xl font-semibold text-zinc-800">{skill.name}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {skillsToShow < skillsData.length && (
                <button 
                    onClick={handleLoadMore} 
                    className="mt-16 flex items-center gap-2 bg-zinc-800 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-zinc-700 transition-all"
                >
                    <BadgePlus size={20} />
                    Load More
                </button>
            )}
        </section>
    );
};

export default Skills;