"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

const testimonialsData: Testimonial[] = [
  {
    quote: "Working with Mohamed was an absolute pleasure. His technical expertise and commitment to quality are second to none. He delivered a product that exceeded all our expectations on time and on budget.",
    author: "Jane Doe",
    title: "Project Manager, TechCorp"
  },

  {
    quote: "Mujahith has a unique ability to understand complex requirements and translate them into clean, efficient, and scalable code. His problem-solving skills are exceptional.",
    author: "John Smith",
    title: "Lead Engineer, Innovate LLC"
  },
  {
    quote: "The strategic insights Mohamed brought to the table, thanks to his business background, were invaluable. He doesn't just build features; he builds products that are set up for success.",
    author: "Emily White",
    title: "Product Owner, Solutions Inc."
  }
];

const testimonialVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);

  const handleNext = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  }, []);

  const handlePrev = () => {
    setUserInteracted(true);
    setIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleDotClick = (dotIndex: number) => {
    setUserInteracted(true);
    setIndex(dotIndex);
  };

  // FIXED: useEffect for automatic cycling
  useEffect(() => {
    // If the user has clicked any button, stop the automatic transition
    if (userInteracted) return;

    // Set up a timer that calls the 'next' function every 5 seconds
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    // Clean up the timer when the component is unmounted or dependencies change
    return () => clearInterval(interval);
  }, [userInteracted, handleNext]);


  return (
    <section id="testimonials" className="w-full bg-slate-50 py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative text-center">
        
        <h2 className="text-5xl sm:text-7xl font-bold text-center animate-gradient-text mb-16">
            Testimonials
        </h2>

        <div className="absolute top-24 left-8 text-blue-500 z-0 opacity-80">
          <svg width="60" height="50" viewBox="0 0 120 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M47.46 100C35.26 100 24.58 95.96 15.42 87.88C6.26 79.8 -0.00012207 69.16 -0.00012207 55.96C-0.00012207 42.4 4.57988 29.32 13.7399 16.72C22.8999 4.12 34.6999 0 49.1399 0V19.48C41.1799 20.2 35.8199 22.84 33.0599 27.4C30.2999 31.96 28.9199 37.84 28.9199 45.04H47.4599V100H47.46ZM119.46 100C107.26 100 96.58 95.96 87.42 87.88C78.26 79.8 71.9999 69.16 71.9999 55.96C71.9999 42.4 76.58 29.32 85.74 16.72C94.9 4.12 106.7 0 121.14 0V19.48C113.18 20.2 107.82 22.84 105.06 27.4C102.3 31.96 100.92 37.84 100.92 45.04H119.46V100Z" fill="currentColor"/>
          </svg>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px]">
          <AnimatePresence>
            <motion.div
              key={index}
              className="w-full absolute"
              variants={testimonialVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <p className="text-2xl md:text-3xl font-light text-slate-700 leading-relaxed max-w-3xl mx-auto pt-8">
                    "{testimonialsData[index].quote}"
                </p>
                <div className="mt-8">
                    <p className="font-bold text-slate-900 text-xl">{testimonialsData[index].author}</p>
                    <p className="text-slate-500 mt-1">{testimonialsData[index].title}</p>
                </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button 
            onClick={handlePrev} 
            className="p-3 rounded-full bg-white/60 hover:bg-white border border-slate-200/80 transition-colors shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} className="text-slate-600" />
          </button>
          
          <div className="flex items-center gap-2">
            {testimonialsData.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => handleDotClick(dotIndex)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  dotIndex === index ? 'bg-blue-500 scale-125' : 'bg-slate-300'
                }`}
                aria-label={`Go to testimonial ${dotIndex + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={() => {
                setUserInteracted(true);
                handleNext();
            }}
            className="p-3 rounded-full bg-white/60 hover:bg-white border border-slate-200/80 transition-colors shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} className="text-slate-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;