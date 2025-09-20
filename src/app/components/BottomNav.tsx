import React from 'react';

const BottomNavReplica = () => {
  return (
    <nav 
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-11/12 max-w-4xl h-16 rounded-full flex items-center justify-between px-4 shadow-lg z-50"
      style={{
        backgroundColor: 'rgba(60, 60, 60, 0.85)',
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 0)',
        backgroundSize: '6px 6px',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)', // Safari support
      }}
    >
      {/* Left side - Home Icon */}
      <div className="flex">
        <a
          href="#home"
          className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9,22 9,12 15,12 15,22"></polyline>
          </svg>
        </a>
      </div>

      {/* Center Links */}
      <div className="flex items-center gap-2 font-medium text-white text-sm">
        <a 
          href="#skills" 
          className="px-4 py-2 rounded-full hover:bg-white/10 transition-colors duration-200"
        >
          Skills
        </a>
        <a 
          href="#projects" 
          className="px-4 py-2 rounded-full hover:bg-white/10 transition-colors duration-200"
        >
          Projects
        </a>
        <a 
          href="#experience" 
          className="px-4 py-2 rounded-full hover:bg-white/10 transition-colors duration-200"
        >
          Experience
        </a>
        <a 
          href="#testimonials" 
          className="px-4 py-2 rounded-full hover:bg-white/10 transition-colors duration-200"
        >
          Testimonials
        </a>
        <a 
          href="#support" 
          className="px-4 py-2 rounded-full hover:bg-white/10 transition-colors duration-200"
        >
          Buy Coffee
        </a>
      </div>

      {/* Right side - CTA Button */}
      <div className="flex">
        <a
          href="#contact"
          className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 font-medium text-sm hover:bg-gray-900 transition-colors duration-200"
        >
          Let's talk
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M13 18l6-6"></path>
            <path d="M13 6l6 6"></path>
          </svg>
        </a>
      </div>
    </nav>
  );
};

export default BottomNavReplica;
