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
      className="w-full bg-slate-100 dark:bg-[#0a0a0a] transition-colors duration-300 py-28 relative isolate overflow-hidden"
      aria-labelledby="experience-heading"
    >
      {/* Warm amber/sky bloom — echoes the sky-400 role text accent in the cards */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(56,189,248,0.06),transparent)] dark:bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(56,189,248,0.09),transparent)]" />

      {/* Top edge fade */}
      <div className="absolute top-0 inset-x-0 h-24 -z-10 bg-gradient-to-b from-white dark:from-[#0a0a0a] to-transparent" />

      {/* Bottom edge fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 -z-10 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent" />

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
              className="relative rounded-2xl overflow-hidden group h-80 shadow-md hover:shadow-xl dark:shadow-black/40 dark:hover:shadow-black/70 transition-shadow duration-300"
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
              {/* Background Image */}
              <Image
                src={exp.bgImageUrl}
                alt={`${exp.company} office or background`}
                fill
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 dark:from-black/95 dark:via-black/50 dark:to-black/20 transition-opacity duration-300 group-hover:from-black/95 dark:group-hover:from-black/[0.98]" />

              {/* Border ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 dark:ring-white/10" />

              {/* Text Content */}
              <div className="relative p-8 flex flex-col justify-end h-full z-10">
                <h3 className="text-3xl font-semibold text-white dark:text-zinc-100 tracking-tight">
                  {exp.company}
                </h3>
                <p className="text-lg font-semibold text-sky-400 dark:text-sky-300 mt-1">
                  {exp.role}
                </p>
                <p className="text-sm font-medium text-slate-300 dark:text-zinc-400 mt-2">
                  {exp.tenure}
                </p>
                <p className="text-slate-200 dark:text-zinc-300 mt-4 text-base opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
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