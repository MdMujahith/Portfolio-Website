"use client";

import React, { useEffect, useState } from "react";
import {
  SiC,
  SiCplusplus,
  SiLinux,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGit,
  SiPython,
  SiMysql,
  SiFigma,
  SiGoogleappsscript,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { IconType } from "react-icons";

interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

// Data moved outside component for performance
const skillsData: Skill[] = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "C", icon: SiC, color: "#00599C" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Java", icon: FaJava, color: "#007396" },
  { name: "AppScript", icon: SiGoogleappsscript, color: "#4285F4" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

const Skills: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      id="skills"
      className="w-full flex flex-col items-center py-20 sm:py-28 pattern-bg-project relative z-10"
    >
      {/* Header */}
      <div
        className={`transition-all duration-700 ease-out transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-center animate-gradient-text mb-12 sm:mb-16">
          Skills & Expertise
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl px-4 w-full">
        {skillsData.map((skill, index) => (
          <div
            key={skill.name}
            className={`transform transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {/* ✅ UPDATED CARD STYLES BELOW */}
            <div className="group flex items-center gap-5 p-5 bg-white rounded-full border border-slate-300 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-400 hover:-translate-y-0.5 cursor-default">
              <div
                className="p-3 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors"
                style={{ color: skill.color }}
              >
                <skill.icon size={32} />
              </div>
              <p className="text-lg sm:text-xl font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                {skill.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
