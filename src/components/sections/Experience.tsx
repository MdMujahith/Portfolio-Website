"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { experience } from "@/data/professional";
import { content } from "@/data/content";

const Experience: React.FC = () => {
  return (
    <section 
      id="experience" 
      className="w-full bg-slate-100 py-28"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 
            id="experience-heading"
            className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-center animate-gradient-text mb-20"
          >
            {content.sections.experience.title}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.2 }}
          role="list"
        >
          {experience.map((exp) => (
            <motion.article
              key={exp.id}
              className="relative rounded-2xl overflow-hidden group h-80 shadow-md hover:shadow-xl transition-shadow duration-300"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              role="listitem"
            >
              {/* Background Image: Optimized with 'sizes' for mobile performance */}
              <Image
                src={exp.bgImageUrl}
                alt={`${exp.company} office or background`}
                fill
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:from-black/95"></div>

              {/* Text Content */}
              <div className="relative p-8 flex flex-col justify-end h-full z-10">
                <h3 className="text-3xl font-semibold text-white tracking-tight">
                  {exp.company}
                </h3>
                <p className="text-lg font-semibold text-sky-400 mt-1">
                  {exp.role}
                </p>
                <p className="text-sm font-medium text-slate-300 mt-2">
                  {exp.tenure}
                </p>
                
                {/* Description: Added translate-y for a smoother premium reveal */}
                <p className="text-slate-200 mt-4 text-base opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  {exp.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;