"use client";

import React, { useState, useMemo } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  LayoutGroup,
  easeOut,
  easeIn,
} from "framer-motion"; // <-- import easing functions
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  tags: string[];
}

const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const projectsData: Project[] = useMemo(
    () => [
      {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-featured e-commerce site with Stripe integration.",
        longDescription:
          "This project is a complete, full-featured e-commerce platform built with Next.js and TypeScript. It features a modern, clean UI, secure payment processing via Stripe, and a comprehensive admin dashboard for managing products, orders, and customers.",
        imageUrl: "/image/ecomweb.png",
        projectUrl: "#",
        githubUrl: "#",
        tags: ["Next.js", "React", "TypeScript", "Stripe"],
      },
      {
        id: 2,
        title: "Task Management App",
        description: "A collaborative task app with real-time updates.",
        longDescription:
          "A real-time, collaborative task management application built using React and Firebase. The app features a clean drag-and-drop interface, real-time database listeners, and user authentication.",
        imageUrl: "/image/taskmanager.png",
        projectUrl: "#",
        githubUrl: "#",
        tags: ["React", "Firebase", "Tailwind CSS"],
      },
      {
        id: 3,
        title: "Portfolio Website",
        description: "A sleek personal portfolio with animations.",
        longDescription:
          "Built with Next.js, Tailwind CSS, and Framer Motion to showcase my work in an elegant and interactive way.",
        imageUrl: "/image/portweb.png",
        projectUrl: "#",
        githubUrl: "#",
        tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
      },
      {
        id: 4,
        title: "Blog Platform",
        description: "A markdown-based blogging site.",
        longDescription:
          "A blogging platform with markdown support, syntax highlighting, SEO optimization, and a fast static rendering system.",
        imageUrl: "/image/blogweb.png",
        projectUrl: "#",
        githubUrl: "#",
        tags: ["Next.js", "Markdown", "SEO"],
      },
    ],
    []
  );

  const selectedProject = projectsData.find((p) => p.id === selectedId);

  // --- Fixed variants ---
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }, // <-- replaced string
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: easeOut }, // <-- replaced string
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.25, ease: easeIn }, // <-- replaced string
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <LayoutGroup>
        <section id="projects" className="w-full animated-x-pattern py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: easeOut }} // <-- replaced string
            >
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-center animate-gradient-text mb-12 sm:mb-16">
                Featured Projects
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 text-center">
                A selection of my work, showcasing my skills in creating modern,
                responsive, and user-friendly web applications.
              </p>
            </m.div>

            {/* Grid for 4 projects */}
            <m.div
              className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ staggerChildren: 0.2 }}
            >
              {projectsData.map((project) => (
                <m.div
                  key={project.id}
                  layoutId={`project-card-${project.id}`}
                  onClick={() => setSelectedId(project.id)}
                  className="block group cursor-pointer"
                  variants={cardVariants}
                >
                  <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200/50 group-hover:shadow-xl transition-shadow duration-300">
                    <m.img
                      layoutId={`project-image-${project.id}`}
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 sm:h-52 object-cover"
                    />
                    <div className="p-4 sm:p-6">
                      <m.h3
                        layoutId={`project-title-${project.id}`}
                        className="text-lg sm:text-xl font-bold text-slate-800"
                      >
                        {project.title}
                      </m.h3>
                      <m.p
                        layoutId={`project-description-${project.id}`}
                        className="mt-2 text-slate-600 text-sm sm:text-base"
                      >
                        {project.description}
                      </m.p>
                    </div>
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        {/* Modal */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <m.div
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <m.div
                layoutId={`project-card-${selectedId}`}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-xl bg-slate-50 rounded-xl overflow-hidden flex flex-col shadow-2xl"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Header Image */}
                <m.img
                  layoutId={`project-image-${selectedId}`}
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-48 sm:h-64 object-cover"
                />

                {/* Content */}
                <div className="p-5 sm:p-6 overflow-y-auto max-h-[60vh]">
                  <m.h3
                    layoutId={`project-title-${selectedId}`}
                    className="text-xl sm:text-2xl font-bold text-slate-800"
                  >
                    {selectedProject.title}
                  </m.h3>
                  <m.p
                    layoutId={`project-description-${selectedId}`}
                    className="mt-2 text-slate-600 text-sm sm:text-base"
                  >
                    {selectedProject.description}
                  </m.p>
                  <hr className="my-4 border-slate-200" />
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {selectedProject.longDescription}
                  </p>

                  {/* Tags */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium bg-slate-200 text-slate-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-5 mt-4">
                    {/* View Project */}
                    <a
                      href={selectedProject.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-full text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors"
                    >
                      View Project <ArrowUpRight size={18} />
                    </a>

                    {/* GitHub Capsule */}
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full text-sm sm:text-base font-semibold hover:bg-gray-800 transition-colors"
                    >
                      <SiGithub size={18} /> Visit GitHub
                    </a>
                  </div>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </LazyMotion>
  );
};

export default Projects;
