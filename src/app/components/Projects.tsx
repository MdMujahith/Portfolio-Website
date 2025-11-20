"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Image from "next/image";

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
  const [isLoaded, setIsLoaded] = useState(false);
  
  // NEW: State to track if we are currently animating out
  const [isClosing, setIsClosing] = useState(false);

  // Trigger initial animation on mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Lock Body Scroll when Modal is Open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedId]);

  // NEW: Handle Closing Logic (The "Smooth Exit")
  const handleClose = () => {
    setIsClosing(true); // 1. Trigger Exit Animation
    setTimeout(() => {
      setSelectedId(null); // 2. Wait 300ms, then unmount
      setIsClosing(false); // 3. Reset closing state
    }, 300); // Match this to CSS animation duration
  };

  // Handle Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose(); // Use new close handler
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const projectsData: Project[] = useMemo(
    () => [
      {
        id: 1,
        title: "SignBridge",
        description: "Real-time ISL & ASL translation using Computer Vision.",
        longDescription: "A real-time system translating Indian (ISL) and American (ASL) Sign Language into English using Python and YOLO. It facilitates instant communication for the hearing-impaired by mapping gestures to text output.",
        imageUrl: "/image/signbridge.png",
        projectUrl: "https://github.com/MdMujahith/RTSLDS",
        githubUrl: "https://github.com/MdMujahith/RTSLDS",
        tags: ["Python", "YOLO", "Flask", "CV"]
      },
      {
        id: 2,
        title: "Task Management App",
        description: "Collaborative task app with real-time updates.",
        longDescription:
          "A real-time, collaborative task management application built using React and Firebase. Features a drag-and-drop interface, live database listeners, and secure user authentication for seamless team workflows.",
        imageUrl: "/image/taskmanager.png",
        projectUrl: "https://github.com/MdMujahith/Seyalio",
        githubUrl: "https://github.com/MdMujahith/Seyalio",
        tags: ["React", "Firebase", "Tailwind"],
      },
      {
        id: 3,
        title: "Portfolio Website",
        description: "Sleek personal portfolio with interactive animations.",
        longDescription:
          "Built with Next.js, Tailwind CSS, and Framer Motion. This site features high-performance animations, responsive layouts, and accessibility optimizations to showcase projects elegantly.",
        imageUrl: "/image/portweb.png",
        projectUrl: "https://mdmujahith.vercel.app",
        githubUrl: "https://mdmujahith.vercel.app",
        tags: ["Next.js", "Framer Motion", "Tailwind"],
      },
      {
        id: 4,
        title: "Blog Platform",
        description: "Markdown-based blogging site with SEO optimization.",
        longDescription:
          "A high-performance blogging platform featuring Markdown support, syntax highlighting, and static rendering. Designed for developers to share technical articles with optimal SEO performance.",
        imageUrl: "/image/blogweb.png",
        projectUrl: "#",
        githubUrl: "#",
        tags: ["Next.js", "Markdown", "SEO"],
      },
    ],
    []
  );

  const selectedProject = projectsData.find((p) => p.id === selectedId);

  return (
    <section id="projects" className="w-full animated-x-pattern py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className={`transition-all duration-700 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-center animate-gradient-text mb-12 sm:mb-16">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 text-center">
            A selection of my work, showcasing my skills in creating modern,
            responsive, and user-friendly web applications.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              className={`block group cursor-pointer h-full transition-all duration-700 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white h-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                {/* Card Image */}
                <div className="relative w-full h-40 sm:h-48 overflow-hidden bg-slate-100">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                  {/* Card Text */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
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
                        className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-md uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal - Rendered Conditionally */}
      {selectedId && selectedProject && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop with Conditional Animation */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm ${
              isClosing 
                ? 'animate-[fadeOut_0.3s_ease-in_forwards]' 
                : 'animate-[fadeIn_0.3s_ease-out_forwards]'
            }`}
            onClick={handleClose}
          />

          {/* Modal Card with Conditional Animation */}
          <div 
            className={`relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh] ${
              isClosing 
                ? 'animate-[scaleOut_0.3s_ease-in_forwards]' 
                : 'animate-[scaleIn_0.3s_ease-out_forwards]'
            }`}
          >
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-48 sm:h-80 shrink-0 bg-slate-100 z-0">
              <Image
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
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
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {selectedProject.title}
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100"
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
                  >
                    View Project <ArrowUpRight size={18} />
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <SiGithub size={18} /> Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Global Styles with Exit Animations */}
       <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* ENTRANCE ANIMATIONS */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        /* EXIT ANIMATIONS */
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes scaleOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.95); }
        }
      `}</style>
    </section>
  );
};

export default Projects;