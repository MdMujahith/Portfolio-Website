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

  /* ============================================
   * ACCESSIBILITY: Lock Body Scroll & Focus Management
   * ============================================
   */
  useEffect(() => {
    if (selectedId) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => modalRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedId]);

  /* ============================================
   * ACCESSIBILITY: Keyboard Navigation
   * ============================================
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedId) {
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <section
      id="projects"
      className="w-full animated-x-pattern py-12 sm:py-20"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2
            id="projects-heading"
            className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-center animate-gradient-text mb-12 sm:mb-16"
          >
            {content.sections.projects.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 text-center">
            {content.sections.projects.description}
          </p>
        </div>

        {/* Projects Grid */}
        <div
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          role="list"
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`block group cursor-pointer h-full transition-all duration-700 ease-out transform ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              role="listitem"
            >
              <button
                onClick={() => setSelectedId(project.id)}
                className="w-full h-full text-left"
                aria-label={`View details for ${project.title}`}
              >
                <div className="bg-white h-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                  {/* Card Image */}
                  <div className="relative w-full h-40 sm:h-48 overflow-hidden bg-slate-100">
                    <Image
                      src={project.imageUrl}
                      alt={`${project.title} project screenshot`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Card Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5 mt-auto pt-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold px-2 py-1 bg-slate-100 text-slate-500 rounded-md uppercase tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* REFACTORED: Framer Motion Modal for native mount/unmount animations */}
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
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedId(null)}
              aria-hidden="true"
            />

            {/* Modal Card */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh]"
              tabIndex={-1}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
                aria-label="Close project details"
              >
                <X size={20} />
              </button>

              {/* Modal Image */}
              <div className="relative w-full h-48 sm:h-80 shrink-0 bg-slate-100 z-0">
                <Image
                  src={selectedProject.imageUrl}
                  alt={`${selectedProject.title} detailed view`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>

              {/* Modal Body */}
              <div
                className="p-6 sm:p-8 overflow-y-auto flex flex-col z-10 bg-white no-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <h3
                  id="modal-title"
                  className="text-2xl sm:text-3xl font-semibold text-slate-900"
                >
                  {selectedProject.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2" role="list">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100"
                      role="listitem"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                <div className="mt-8 pt-6 border-t border-slate-100 mt-auto">
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                      href={selectedProject.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5"
                      aria-label={`View ${selectedProject.title} live project`}
                    >
                      View Project <ArrowUpRight size={18} />
                    </a>

                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      aria-label={`View ${selectedProject.title} source code on GitHub`}
                    >
                      <SiGithub size={18} /> Source Code
                    </a>
                  </div>
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