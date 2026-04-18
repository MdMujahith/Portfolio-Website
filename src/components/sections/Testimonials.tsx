"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { content } from "@/data/content";

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <section
      id="testimonials"
      className="w-full bg-slate-50 dark:bg-[#0f0f0f] py-20 sm:py-24 overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-6 relative text-center">
        {/* Header */}
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-center animate-gradient-text dark:animate-gradient-text-dark mb-12 sm:mb-16">
          {content.sections.testimonials.title}
        </h2>

        {/* Large Quote Icon Background */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 text-slate-200 dark:text-zinc-800 z-0">
          <Quote size={120} fill="currentColor" className="opacity-40" />
        </div>

        {/* Carousel Container */}
        <div
          className="relative z-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out flex flex-col items-center justify-center ${
                  index === currentIndex
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <p className="text-xl sm:text-2xl md:text-3xl font-light text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto transition-colors duration-300">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-8">
                  <p className="font-semibold text-slate-900 dark:text-white text-lg sm:text-xl transition-colors duration-300">
                    {testimonial.author}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm sm:text-base transition-colors duration-300">
                    {testimonial.title}
                    {testimonial.company ? `, ${testimonial.company}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-6 mt-12 z-20 relative">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-300 transition-all duration-200 shadow-sm hover:shadow-md dark:shadow-black/30"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-slate-800 dark:bg-white"
                    : "w-2 bg-slate-300 dark:bg-zinc-600 hover:bg-slate-400 dark:hover:bg-zinc-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-300 transition-all duration-200 shadow-sm hover:shadow-md dark:shadow-black/30"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;