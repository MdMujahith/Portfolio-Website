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

  // Auto-play logic with Pause on Hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <section
      id="testimonials"
      className="w-full bg-slate-50 py-20 sm:py-24 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 relative text-center">
        {/* Header */}
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-center animate-gradient-text mb-12 sm:mb-16">
          {content.sections.testimonials.title}
        </h2>

        {/* Large Quote Icon Background */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 text-slate-200 z-0">
          <Quote size={120} fill="currentColor" className="opacity-40" />
        </div>

        {/* Carousel Container */}
        <div
          className="relative z-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* THE GRID STACK TRICK:
               We put all items in a 1x1 grid. They stack on top of each other.
               The container grows to fit the tallest one.
               We use Opacity to show/hide them.
               Zero Layout Shift.
            */}
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
                <p className="text-xl sm:text-2xl md:text-3xl font-light text-slate-700 leading-relaxed max-w-3xl mx-auto">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-8">
                  <p className="font-semibold text-slate-900 text-lg sm:text-xl">
                    {testimonial.author}
                  </p>
                  <p className="text-slate-500 mt-1 text-sm sm:text-base">
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
            className="p-3 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 transition-all shadow-sm hover:shadow-md"
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
                    ? "w-8 bg-slate-800"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 transition-all shadow-sm hover:shadow-md"
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