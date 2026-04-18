"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/professional";
import { content } from "@/data/content";

const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (selectedId) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => modalRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedId) setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <section
      id="projects"
      className="w-full animated-x-pattern dark:animated-x-pattern py-12 sm:py-20 transition-colors duration-300"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <h2
            id="projects-heading"
            className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-center animate-gradient-text mb-4 sm:mb-6"
          >
            {content.sections.projects.title}
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-500 dark:text-zinc-400">
            {content.sections.projects.description}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          role="list"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              role="listitem"
              className="group cursor-pointer h-full"
            >
              <button
                onClick={() => setSelectedId(project.id)}
                className="w-full h-full text-left"
                aria-label={`View details for ${project.title}`}
              >
                <div className="bg-white dark:bg-zinc-900 h-full rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-700/60 shadow-sm dark:shadow-black/30 hover:shadow-lg dark:hover:shadow-black/50 hover:-translate-y-1.5 transition-all duration-300 will-change-transform flex flex-col">

                  {/* Card Image */}
                  <div className="relative w-full h-40 sm:h-48 overflow-hidden bg-slate-100 dark:bg-zinc-800">
                    <Image
                      src={project.imageUrl}
                      alt={`${project.title} project screenshot`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 dark:bg-zinc-900/90 rounded-full shadow text-[10px] font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      View Details
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 leading-snug">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-slate-300 dark:text-zinc-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 mt-0.5" />
                    </div>
                    <p className="mt-2 text-slate-500 dark:text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold px-2 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 rounded-md uppercase tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-slate-900/70 dark:bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedId(null)}
              aria-hidden="true"
            />

            {/* Modal Card */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl dark:shadow-black/60 z-10 flex flex-col max-h-[90vh] ring-1 ring-inset ring-white/5 dark:ring-white/10"
              tabIndex={-1}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100 rounded-full shadow-md backdrop-blur-md transition-all duration-200 hover:scale-105"
                aria-label="Close project details"
              >
                <X size={18} />
              </button>

              {/* Modal Image */}
              <div className="relative w-full h-56 sm:h-72 shrink-0 bg-slate-100 dark:bg-zinc-800">
                <Image
                  src={selectedProject.imageUrl}
                  alt={`${selectedProject.title} detailed view`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Title overlaid on image */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3
                    id="modal-title"
                    className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md leading-tight"
                  >
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div
                className="flex flex-col overflow-y-auto"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* Tags Row */}
                <div className="flex flex-wrap gap-2 px-6 pt-5">
                  {selectedProject.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-100 dark:border-indigo-800/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="mt-4 px-6 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 px-6 py-6 mt-2 border-t border-slate-100 dark:border-zinc-800">
                  <a
                    href={selectedProject.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-center items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5"
                    aria-label={`View ${selectedProject.title} live project`}
                  >
                    View Project <ArrowUpRight size={16} />
                  </a>

                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-center items-center gap-2 px-5 py-3 bg-slate-900 dark:bg-zinc-700 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 dark:hover:bg-zinc-600 transition-all duration-200 shadow-md dark:shadow-black/30 hover:shadow-lg hover:-translate-y-0.5"
                    aria-label={`View ${selectedProject.title} source code on GitHub`}
                  >
                    <SiGithub size={16} /> Source Code
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Projects;