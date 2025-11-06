"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ExperienceItem {
    role: string;
    company: string;
    tenure: string;
    description: string;
    bgImageUrl: string; // URL for the large background image
}

const experienceData: ExperienceItem[] = [
    { 
        company: 'IBM',
        role: 'Frontend Developer Intern', 
        tenure: 'Oct 2024 - Nov 2024', 
        description: 'Leading Front-end development for a Gaming Website.',
        bgImageUrl: '/image/front-end-developer.jpg' // Replace with a relevant image
    },
    { 
        company: 'Techno Hacks',
        role: 'Cyber Security Intern', 
        tenure: 'Oct 2023 - Nov 2023 ', 
        description: 'Assisted in cybersecurity projects and learned about security tools.',
        bgImageUrl: '/image/cyber security.jpg' // Replace with a relevant image
    },
    { 
        company: 'Crescent Data Science Club',
        role: 'Social Media Team Lead', 
        tenure: '2024 - 2025', 
        description: 'Managed social media presence, led campaigns, and grew community engagement.',
        bgImageUrl: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjAzNTV8MHwxfGFsbHx8fHx8fHx8fDE3MjY5NzE1MDB8&ixlib=rb-4.0.3&q=80&w=1080' // Replace with a relevant image
    },
    { 
        company: 'Open Source Projects',
        role: 'Contributor',
        tenure: '03/2023 - 01/2024',
        description: 'Learned and contributed to open-source projects while improving coding and collaboration skills.',
        bgImageUrl: '/image/open-source.png' // Replace with a relevant image
    },
];

const Experience: React.FC = () => {
    return (
        <section id="experience" className="w-full bg-slate-100 py-28">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-center animate-gradient-text mb-20">
                        Professional Experience
                    </h2>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ staggerChildren: 0.2 }}
                >
                    {experienceData.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="relative rounded-2xl overflow-hidden group"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                            }}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        >
                            {/* Background Image */}
                            <Image
                                src={exp.bgImageUrl} 
                                alt={exp.company} 
                                fill
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                            
                            {/* Text Content */}
                            <div className="relative p-8 flex flex-col justify-end h-80">
                                <h3 className="text-3xl font-bold text-white">{exp.company}</h3>
                                <p className="text-lg font-semibold text-sky-300 mt-1">{exp.role}</p>
                                <p className="text-sm font-medium text-slate-300 mt-2">{exp.tenure}</p>
                                <p className="text-slate-200 mt-4 text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {exp.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;