"use client";

import React, { useMemo } from "react";
import { m } from "framer-motion";

export interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
}

const ExperienceSection: React.FC = () => {
  const experiences: Experience[] = useMemo(
    () => [
      {
        id: 1,
        company: "Tech Solutions Inc.",
        role: "Frontend Developer",
        duration: "Jan 2022 - Present",
        description:
          "Developed responsive web applications using React, Next.js, and Tailwind CSS. Collaborated with designers and backend developers to implement dynamic user interfaces and optimize performance.",
      },
      {
        id: 2,
        company: "Creative Studio",
        role: "UI/UX Designer",
        duration: "Jun 2020 - Dec 2021",
        description:
          "Designed intuitive interfaces and interactive prototypes. Improved user experience by conducting usability testing and implementing feedback-driven changes.",
      },
      {
        id: 3,
        company: "Startup Hub",
        role: "Intern Developer",
        duration: "Jan 2020 - May 2020",
        description:
          "Assisted in building web apps with React and Firebase, optimized website performance, and maintained documentation for onboarding new developers.",
      },
    ],
    []
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section id="experience" className="w-full bg-gray-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 text-center">
            Experience
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600 text-center">
            A brief overview of my professional journey and roles I've held.
          </p>
        </m.div>

        {/* Timeline / Cards */}
        <div className="mt-12 flex flex-col md:grid md:grid-cols-2 md:gap-8">
          {experiences.map((exp, index) => (
            <m.div
              key={exp.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className={`mb-8 md:mb-0 p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow`}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                {exp.role}
              </h3>
              <p className="text-sm sm:text-base text-gray-500">{exp.company}</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">{exp.duration}</p>
              <p className="mt-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                {exp.description}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
